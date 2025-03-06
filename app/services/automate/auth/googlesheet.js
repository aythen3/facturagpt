

const { google } = require("googleapis");

const keys = require("../emailManagerRelated/service-account.json");



const client = new google.auth.JWT(keys.client_email, null, keys.private_key, [
    "https://www.googleapis.com/auth/spreadsheets",
  ]);
  


const prepareValuesForGoogleSheet = (data) => {
    const { productList, ...rest } = data;
    const productListLength = productList?.length;

    return [
        rest.documentType,
        rest.invoiceDate,
        `${rest.expirationDateYear}-${rest.expirationDateMonth}-${rest.expirationDateDay}`,
        rest.numberDocument,
        rest.clientCif,
        rest.clientNif,
        rest.clientName,
        rest.clientAddress,
        rest.clientCity,
        rest.clientZip,
        rest.conditionPay,
        rest.partialAmount,
        rest.discountAmount,
        rest.totalAmount,
        productListLength,
        rest.attachFileName,
    ];
};

const appendDataToGoogleSheet = async (spreadsheetId, data) => {
    // console.log("spreadsheetId =============", spreadsheetId);
    // console.log("data =============", data);
    const headers = [
        "Document Type",
        "Invoice Date",
        "Expiration Date",
        "Document Number",
        "Client CIF",
        "Client NIF",
        "Client Name",
        "Client Address",
        "Client City",
        "Client Zip",
        "Payment Condition",
        "Partial Amount",
        "Discount Amount",
        "Total Amount",
        "Product Count",
        "Attachment File Name",
    ];
    const sheetsInstance = google.sheets({ version: "v4", auth: client });

    try {
        const readResponse = await sheetsInstance.spreadsheets.values.get({
            spreadsheetId: spreadsheetId,
            range: "Hoja 1!A1:Z1",
        });

        if (!readResponse.data.values || readResponse.data.values.length === 0) {
            await sheetsInstance.spreadsheets.values.append({
                spreadsheetId,
                range: "Hoja 1!A1",
                valueInputOption: "RAW",
                resource: { values: [headers] },
            });
        }
    } catch (err) {
        console.error(
            "Read operation failed, assuming need for headers:",
            err.message
        );

        await sheetsInstance.spreadsheets.values.update({
            spreadsheetId,
            range: "Hoja 1!A1",
            valueInputOption: "RAW",
            resource: { values: [headers] },
        });
    }

    const resource = { values: [data] };
    const request = {
        spreadsheetId,
        range: "Hoja 1",
        valueInputOption: "RAW",
        resource,
    };

    try {
        const response = await sheetsInstance.spreadsheets.values.append(request);
        // console.log("Data appended:", response.data);
    } catch (err) {
        console.error("API returned an error during append:", err);
    }
};



module.exports = {
    prepareValuesForGoogleSheet,
    appendDataToGoogleSheet
}