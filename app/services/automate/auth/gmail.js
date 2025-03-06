const { simpleParser } = require("mailparser");
const Imap = require("imap");


const allowedExtensions = ["jpg", "png", "webp", "pdf"];

const connectToImap = (config) => {
    return new Promise((resolve, reject) => {
        const imap = new Imap(config);

        imap.once("ready", () => resolve(imap));
        imap.once("error", (err) => {
            console.error("IMAP Connection Error:", err);
            reject(err);
        });

        imap.connect();
    });
};

const openInbox = (imap) => {
    return new Promise((resolve, reject) => {
        imap.openBox("INBOX", true, (err, box) => {
            if (err) {
                console.error("Error opening INBOX:", err);
                reject(err);
            } else {
                resolve(box);
            }
        });
    });
};


const getImapConfig = (email, password) => {
    const domain = email.split("@")[1];

    let host, port;

    if (domain === "gmail.com") {
        host = "imap.gmail.com";
        port = 993;
    } else if (
        domain === "outlook.com" ||
        domain === "hotmail.com" ||
        domain === "live.com"
    ) {
        host = "imap-mail.outlook.com";
        port = 993;
    } else {
        host = "imap.gmail.com";
        port = 993;
    }

    return {
        user: email,
        password: password,
        host: host,
        port: port,
        tls: true,
        tlsOptions: {
            rejectUnauthorized: false,
        },
        authTimeout: 30000,
    };
};

const searchEmails = (imap, searchStrings, clientId) => {
    return new Promise((resolve, reject) => {
        const searchQuery = ["ALL"];

        if (Array.isArray(searchStrings) && searchStrings.length > 0) {
            let combinedConditions = [];
            searchStrings.forEach((searchString) => {
                combinedConditions.push(["SUBJECT", searchString]);
                combinedConditions.push(["TEXT", searchString]);
            });

            let query = combinedConditions.shift();
            while (combinedConditions.length > 0) {
                query = ["OR", query, combinedConditions.shift()];
            }

            searchQuery.push(query);
        }

        imap.search(searchQuery, (err, results) => {
            if (err) {
                console.error("Error searching emails:", err);
                reject(err);
                return;
            }

            if (!results || results.length === 0) {
                resolve([]);
                return;
            }

            const fetch = imap.fetch(results, { bodies: "", struct: true });
            const emails = [];
            const fetchPromises = [];

            fetch.on("message", (msg, seqno) => {
                const email = {
                    seqno,
                    attrs: null,
                    attachments: [],
                    subject: "",
                };

                const parserPromise = new Promise((resolveMessage, rejectMessage) => {
                    let rawMessage = "";

                    msg.on("body", (stream) => {
                        stream.on("data", (chunk) => {
                            rawMessage += chunk.toString("utf8");
                        });

                        stream.once("end", async () => {
                            try {
                                const parsed = await simpleParser(rawMessage);
                                email.ref = parsed.messageId
                                email.fromEmail = parsed.from.value || "";
                                email.toEmail = parsed.to.value || "";
                                email.subject = parsed.subject || "";
                                email.emailId = parsed.messageId;
                                email.url = `https://mail.google.com/mail/u/0/#search/rfc822msgid%3A${encodeURIComponent(
                                    parsed.messageId
                                )}`;


                                const response = {
                                    success: true,
                                    message: "Transaction added successfully",
                                }

                                // const response = await addTransaction({
                                //   id: clientId,
                                //   transaction: email,
                                // })

                                console.log('response 1234567', response)



                                email.attachments = parsed.attachments
                                    .filter((att) =>
                                        allowedExtensions.includes(
                                            att.filename.split(".").pop().toLowerCase()
                                        )
                                    )
                                    .map((att) => {
                                        return {
                                            mimeType: att.contentType,
                                            filename: att.filename,
                                            buffer: att.content,
                                            size: att.size,
                                            emailId: parsed.messageId,
                                        };
                                    });




                                resolveMessage();
                            } catch (error) {
                                console.error("Error parsing email:", error);
                                rejectMessage(error);
                            }
                        });
                    });

                    msg.on("attributes", (attrs) => {
                        email.attrs = attrs;
                    });

                    msg.once("end", () => {
                        emails.push(email);
                    });
                });

                fetchPromises.push(parserPromise);
            });

            fetch.once("error", (err) => {
                console.error("Error fetching emails:", err);
                reject(err);
            });

            fetch.once("end", () => {
                Promise.all(fetchPromises)
                    .then(() => resolve(emails))
                    .catch(reject);
            });
        });
    });
};


module.exports = {
    connectToImap,
    openInbox,
    getImapConfig,
    searchEmails
}