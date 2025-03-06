const { catchedAsync, response } = require("../../../utils/err");

const ftp = require("basic-ftp");

const ftpFilter = async ({
    email,
    password,
    query,
    userId,
    logs,
    ftpData
  }) => {
  
    try {
  
      const ftpClient = new ftp.Client();
      // ftpClient.ftp.verbose = true
      const host = ftpData.host || "46.183.119.66";
      const port = ftpData.port || "21";
      const user = ftpData.user || "Aythen";
      const pw = ftpData.password || "Cloud@24";
  
      await ftpClient.access({
        host,
        port,
        user,
        password: pw,
        secure: false,
        connTimeout: 120000,
        pasvTimeout: 120000,
        keepalive: 30000,
      });
  
      // console.log('ftpClient', ftpClient)
      await ftpClient.uploadFrom(
        tempFilePath,
        `${uploadType}/${file_xml}`
      );
  
      // fileData.Body, // Buffer del archivo
      // await fs.promises.unlink(localFilePath)
      await ftpClient.close();
    } catch (error) {
      console.log("ERROR ON FTP FILTER", error);
    }
  }


  module.exports = {
    ftpFilter: catchedAsync(ftpFilter),
  }