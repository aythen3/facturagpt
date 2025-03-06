const { catchedAsync } = require("../../../utils/err");


const { getImapConfig, connectToImap } = require('./gmail')


const gmailFilter = async ({
    email,
    password,
    query,
    userId,
    logs,
    // ftpData
    tokenGPT
  }) => {
    try {
      ///
      //
      ///
      const imapConfig = getImapConfig(email, password);
      const imap = await connectToImap(imapConfig);
      await openInbox(imap);
  
      const emails = await searchEmails(imap, query, userId);
  
      const filteredEmails = [];
      const processedAttachments = [];
  
      for (const email of emails) {
        if (email.attachments && email.attachments.length > 0) {
          filteredEmails.push(email);
  
          for (const attachment of email.attachments) {
            let processedData = await getGPTData({
              attach: attachment,
              token: tokenGPT
            });
            let newProcessedData = await calculateTaxesAndDiscounts(processedData.productList);
  
            processedData.partialAmount = convertToNumber(processedData.partialAmount);
            processedData.productList = newProcessedData;
  
            processedData.taxesFromPartialAmount = processedData.partialAmount * 0.21;
  
            processedData = replaceNotFoundWithEmptyString(processedData);
            processedData.clientCif = extractCIF(processedData.clientCif);
            processedData.clientNif = extractNIF(processedData.clientNif);
  
            console.log("EMAIL", email);
            processedAttachments.push({
              email: {
                subject: email.subject,
                fromEmail: email.fromEmail,
                toEmail: email.toEmail,
                date: email.attrs.date,
                subject: attachment.subject,
              },
              attachment: {
                filename: attachment.filename,
                mimeType: attachment.mimeType,
                size: attachment.size,
                emailId: attachment.emailId,
              },
              processedData,
              xmlContent: obj,
            });
          }
        }
      }
  
      imap.end();
  
      ///
      //
      ///
  
      let dataByEmails = processEmailsDetailedData(processedAttachments);
      console.log('66666666666666666666666666666666666666666')
      console.log("dataByEmails:", dataByEmails);
      // updateClientService({
      //   clientId: userId,
      //   toUpdate: { detailedTokenConsumption: dataByEmails },
      // });
  
  
  
      let totalTokensConsumed = 0
      let totalTokensPrice = 0
  
      processedAttachments.forEach((attach) => {
        totalTokensConsumed += attach?.processedData?.totalTokens || 0
        totalTokensPrice += attach?.processedData?.totalPrice || 0
      });
  
  
  
      console.log('update account!!!')
  
      // processedAttachments.forEach((attach) => {
      //   updateClientService({
      //     clientId: userId,
      //     toUpdate: {
      //       tokensConsumed: attach?.processedData?.totalTokens || 0,
      //       totalTokensPrice: attach?.processedData?.totalPrice || 0,
      //     },
      //   });
      // });
  
  
      // AUTOMATES
  
      // const filteredEmailsProcessed = await processDataAndAppend(
      //   "1Qq_YHkphBhmLzZt4Nyyi4FvIOeEYq75zujj2DIMDg9I",
      //   processedAttachments
      // );
  
      return {
        filteredEmails,
        processedAttachments,
      };
    } catch (err) {
      console.error("Error fetching emails:", err);
      return {
        message: "Failed to fetch emails",
        error: err.message
      };
    }
  }

  

module.exports = {
    gmailFilter: catchedAsync(gmailFilter)
}






const processEmailsDetailedData = (emailData) => {
    return emailData.reduce((result, emailItem) => {
      console.log("===EMAIL ITEM===", emailItem);
      const fromEmail = emailItem.email.fromEmail;
      const toEmail = emailItem.email.toEmail;
      const emailId = emailItem.attachment.emailId;
      const attachFileName = emailItem.attachment.filename;
      const attachTokens = emailItem.processedData.totalTokens;
      const attachTokensPrice = emailItem.processedData.totalPrice;
      const totalData = emailItem.processedData;
  
      if (!result[emailId]) {
        result[emailId] = {
          processedAt: new Date(),
          totalTokens: 0,
          totalTokensPrice: 0,
          attachments: {},
        };
      }
  
      result[emailId].totalTokens += attachTokens;
      result[emailId].totalTokensPrice += attachTokensPrice;
      result[emailId].totalData = totalData;
      result[emailId].fromEmail = fromEmail;
      result[emailId].toEmail = toEmail;
      result[emailId].attachments[attachFileName] = {
        totalTokens: attachTokens,
        totalTokensPrice: attachTokensPrice,
      };
  
      return result;
    }, {});
  };

