const { catchedAsync, response } = require("../../utils/err");
const { connectDB } = require("../../controllers/utils");
const { v4: uuidv4 } = require('uuid');

const { mergeResults } = require('./utils')

const AWS = require("aws-sdk");

const s3 = new AWS.S3({
  accessKeyId: "SCW8EPCVF1YTQXK0AC7P",
  secretAccessKey: "cd4ea464-15e8-4baf-848d-8db28cd880cf",
  endpoint: "https://s3.fr-par.scw.cloud",
  s3ForcePathStyle: true,
});

const fs = require("fs");
const path = require("path");
const { fromPath } = require("pdf2pic");
const sharp = require("sharp");
const { PDFDocument } = require("pdf-lib");




// const { simpleParser } = require("mailparser");






const { ftpFilter } = require('./api/ftp')
const { gmailFilter } = require('./api/gmail')
const { xmlFilter } = require('./api/xml')


// const { updateClientService } = require("./emailManager");
// const tempDir = "./temp";
// const sheets = google.sheets("v4");
// const { mul } = require("@tensorflow/tfjs");


// const Imap = require("imap");



// const nano = require("nano")("http://admin:1234@127.0.0.1:5984");

const {
  // convertPDFToPNG
} = require("./utils")

const {
  // documentGPT,
  getGPTData
} = require("./gpt");




const saveAttachmentData = async ({
  userId,
  data
}) => {
  try {
    const dbClients = await connectDB(`db_${userId}_clients`)
    const dbDocs = await connectDB(`db_${userId}_docs`)
    const dbProducts = await connectDB(`db_${userId}_products`)

    if (data?.documentType == 'factura') {
      console.log('EXITO ES UNA FACTURA')
    } else {
      console.log('IS DIGITAL TRASH!!')
    }

    let clientId = uuidv4()
    let docId = uuidv4()

    let doc = {
      id: docId,
      clientId: clientId,
      date: data.invoiceDate,
      year: data.invoiceDate,
      month: data.invoiceDate,
      day: data.invoiceDate,
      number: data.numberDocument,
      total: data.totalAmount,
      discount: data.discountAmount,
      partial: data.partialAmount,
    }

    let client = {
      id: clientId,
      name: data.clientName,
      cif: data.clientCif,
      nif: data.clientCif,
      phone_number: data.clientPhoneNumber,
      address: data.clientAddress,
    }


    data.productList?.map((product, index) => {
      let productId = uuidv4()
      let productDoc = {
        id: productId,
        docId: docId,
        clientId: clientId,
        ref: product.productRef,
        description: product.productDescription,
        quantity: product.productQuantity,
        unit: product.productUnit,
        quantity: product.productPartial,
        import: product.productImport,
        discount: product.productDiscount,
        rate: product.productDiscountRate,
        partial: product.productPartial
      }

      dbProducts.insert(productDoc)
    })

    dbDocs.insert(doc)
    dbClients.insert(client)


  } catch (err) {
    console.log('err', err)
  }
}



const goAutomate = async (req, res) => {
  try {
    let automate = false
    console.log('33333333333333333333333333333333333333333')
    // const { userId, email, password, query, tokenGpt, logs, ftpData } =  req.body;
    // const { folder } = req.body

    const user = req.user
    const id = user._id.split('_').pop()

    console.log('id', user._id, id)

    const dbAccounts = await connectDB('db_accounts')
    const dbAutomations = await connectDB('db_automations')
    const dbAuth = await connectDB(`db_${id}_auth`)
    const dbNotifications = await connectDB(`db_${id}_notifications`)


    // sales
    // expenses
    // benefits

    // month [0..11]

    // accounts
    // -exceptional
    // -current_lost
    // -social_security
    // -compensations
    // -salary
    // -services
    // -supplies
    // -publicity
    // -banking


    const dataNotification = {
      title: "Titulo de la factura",
      email: "johndoe@email.com",
      icon: "https://aythen.com/logo.png",
      location: "Q1>Facturas",
    }

    const currentMonth = new Date().getMonth()
    const currentYear = new Date().getFullYear()

    const currentDate = new Date();
    const day = currentDate.getDate().toString().padStart(2, '0');
    const month = currentDate.toLocaleString('en-US', { month: 'short' });
    const year = currentDate.getFullYear();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const period = hours >= 12 ? 'PM' : 'AM';


    const notificationId = uuidv4()

    await dbNotifications.createIndex({
      index: {
        fields: ['createdAt']
      }
    });

    dbNotifications.insert({
      // id: 1,
      id: notificationId,
      title: "Document Title",
      date: `${day} ${month} ${year}`,
      time: `${hours}:${minutes} ${period}`,
      month: `${currentMonth}-${currentYear}`,
      icon: "https://aythen.com/logo.png",
      notifications: [
        dataNotification,
        dataNotification,
        dataNotification
      ],
      options: ["Compartir"], // Solo 2 opciones
      category: ["excepcional", "current_lost", "social_security", "compensations", "salary", "services", "supplies", "publicity", "banking"],
      type: 'pay',
      value: 1000,
      currency: 'EUR',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    })


    if (!automate) {
      try {
        const file = req.file
        const path = `${user._id}/`;
        const bucketName = "factura-gpt";

        const params = {
          Bucket: bucketName,
          // Key: `${path}${file.originalname}`,
          Key: `${path}FILE-${uuidv4()}_${file.originalname}`,
          Body: file.buffer,
          ContentType: file.mimetype,
        };

        await s3.upload(params).promise();


        if (!user.tokenGPT) {
          return res.status(200).json({ message: 'Token not authorizated' })
        }

        const attachmentData = await getGPTData({
          attach: file,
          token: user.tokenGPT
        })


        await saveAttachmentData({
          userId: id,
          data: attachmentData
        })

        console.log('file uploaded successfully', attachmentData)

        const response = await xmlFilter({
          user: user,
          attach: file,
          processedData: attachmentData,
        })

        return res.status(200).json({
          success: true,
          status: 201,
          message: "ok, but not automations"
        });
      } catch (error) {
        console.log('error', error)
        return res.status(200).json({ message: "error uploading file" });
      }
    }


    // AUTOMATES
    const account = await dbAccounts.get(user._id)
    console.log('account AUTOMATIONS', account)

    if (!account.tokenGPT) {
      return res.status(200).json({ message: 'Token not authorizated' })
    }

    if (!account.automations || account.automations.length === 0) {
      return res.status(200).json({ message: "Not found automations" });
    }

    let { automations } = account
    let docs = []
    console.log('automations', automations)

    for (const automation of automations) {
      console.log('automation', automation)
      const automationData = await dbAutomations.get(automation)
      console.log('automation / data', automationData)

      if (automationData.type === 'Gmail') {
        console.log('FILTER GMAIL')

        const token = await dbAuth.find({
          selector: {
            type: 'gmail'
          }
        })

        console.log('token', token)

        if (token.docs.length === 0) {
          return res.status(200).json({ message: "Not found token" });
        }

        const tokenData = token.docs[0]

        console.log('tokenData', tokenData)


        docs = await gmailFilter({
          userId: user._id,
          email: tokenData?.email,
          password: tokenData?.appPassword,
          query: tokenData?.query,
          logs: tokenData?.logs,
          tokenGPT: user.tokenGPT
          // ftpData: tokenData.ftpData
        });

      } else if (automationData.type === 'Outlook') {
        console.log('FILTER OUTLOOK')
      } else if (automationData.type === 'WhatsApp') {
        console.log('FILTER WHATSAPP')
      } else if (automationData.type === 'Telegram') {
        console.log('FILTER TELEGRAM')
      } else if (automationData.type === 'Discord') {
        console.log('FILTER DISCORD')
      } else if (automationData.type === 'Slack') {
        console.log('FILTER SLACK')
      } else {
        console.log('FILTER NOT FOUND')
      }
    }


    // const resp = await updateAccount({
    //   id: user._id,
    //   text: 'hello world'
    // });

    console.log('resp update account', resp)

    // updateAccount({
    //   id: userId,
    //   tokensConsumed: totalTokensConsumed,
    //   totalTokensPrice: totalTokensPrice,
    // }); 

  } catch (error) {
    console.log("ERRORRRRRRRRRRRR", error);
  }
};



module.exports = {
  goAutomate: catchedAsync(goAutomate),
};
