
const sharp = require('sharp')

const {
  getProductsGPT,
  documentGPT
} = require('./gpt')

const processDataAndAppend = async (spreadsheetId, items) => {
    for (const item of items) {
      if (item?.processedData) {
        const data = prepareValuesForGoogleSheet(item?.processedData);
        await appendDataToGoogleSheet(spreadsheetId, data);
      }
    }
  };
  
  
  const processImageSections = async (
    imageBuffer,
    token,
    searchCif = false,
    searchNif = false
  ) => {
    try {
      if (!searchCif && !searchNif) {
        throw new Error("At least one of searchCif or searchNif must be true.");
      }
  
      const image = sharp(imageBuffer);
      const metadata = await image.metadata();
  
      if (!metadata.width || !metadata.height) {
        throw new Error("Invalid image dimensions.");
      }
  
      const { width, height } = metadata;
  
      // console.log("Image dimensions", width, height);
  
      const sections = [
        {
          name: "Left Side",
          left: 0,
          top: Math.round(height * 0.2),
          width: Math.round(width * 0.15),
          height: Math.round(height * 0.6),
          rotate: true,
        },
        {
          name: "Bottom",
          left: Math.round(width * 0.1),
          top: Math.round(height * 0.9),
          width: Math.round(width * 0.9),
          height: Math.round(height * 0.1 - 1),
          rotate: false,
        },
        {
          name: "Right Side",
          left: Math.round(width * 0.85 - 1),
          top: Math.round(height * 0.2),
          width: Math.round(width * 0.15),
          height: Math.round(height * 0.6),
          rotate: true,
        },
      ];
  
      for (const section of sections) {
        const sectionImage = sharp(imageBuffer);
  
        const validSection = {
          left: Math.max(0, Math.min(section.left, width)),
          top: Math.max(0, Math.min(section.top, height)),
          width: Math.max(1, Math.min(section.width, width - section.left)),
          height: Math.max(1, Math.min(section.height, height - section.top)),
        };
  
  
        if (validSection.width <= 0 || validSection.height <= 0) {
          console.warn(`Skipping invalid section: ${section.name}`);
          continue;
        }
  
        try {
          let sectionBuffer = await sectionImage.extract(validSection).toBuffer();
          if (section.rotate) {
            sectionBuffer = await sharp(sectionBuffer).rotate(90).toBuffer();
          }
          const sectionImageUrl = `data:image/png;base64,${sectionBuffer.toString("base64")}`;
  
          const imageSize = `${validSection.width}x${validSection.height}`;
  
          const result = await documentGPT({
            token,
            image: sectionImageUrl,
            searchCif,
            searchNif,
            imageSize,
          });
  
          if (result.error) {
            console.warn(
              `Error in documentGPT for section "${section.name}": ${result.error}`
            );
            continue;
          }
  
          if (searchCif && result.clientCif && result.clientCif !== "NOT FOUND") {
            console.log(
              `Client CIF found in section: ${section.name}, CIF: ${result.clientCif}`
            );
            return result;
          }
  
          if (searchNif && result.clientNif && result.clientNif !== "NOT FOUND") {
            console.log(
              `Client NIF found in section: ${section.name}, NIF: ${result.clientNif}`
            );
            return result;
          }
        } catch (sectionError) {
          console.error(
            `Error processing section "${section.name}":`,
            sectionError
          );
        }
      }
  
      console.warn("Client CIF or NIF not found in any image section.");
      return { error: "Client CIF or NIF not found in any image section" };
    } catch (error) {
      console.error("Error in processImageSections:", error);
      return { error: error.message || "Failed to process image sections" };
    }
  };

  
  const processProductsSection = async (imageBuffer, token) => {
    try {
      const image = sharp(imageBuffer);
      const metadata = await image.metadata();
  
      if (!metadata.width || !metadata.height) {
        throw new Error("Invalid image dimensions.");
      }
  
      const { width, height } = metadata;
      // console.log("Image dimensions", width, height);
  
      const sectionImage = sharp(imageBuffer);
      const validSection = {
        left: 50,
        top: Math.round(height * 0.2),
        width: Math.round(width - 50),
        height: Math.round(height * 0.6),
      };
  
      console.log(`Processing section "Products Section"`);
  
      try {
        const rawSectionBuffer = await sectionImage
          .extract(validSection)
          .toBuffer();
  
        const sectionBuffer = await sharp(rawSectionBuffer)
          .png({ quality: 100 })
          .toBuffer();
  
        // fs.writeFileSync("products_section.png", sectionBuffer);
        // console.log("Saved converted section as products_section.png");
  
        const sectionImageUrl = `data:image/png;base64,${sectionBuffer.toString("base64")}`;
        const imageSize = `${validSection.width}x${validSection.height}`;
  
        console.log("Calling getProductsGPT for FIRST pass");
        const firstPassResult = await getProductsGPT({
          token,
          image: sectionImageUrl,
          imageSize,
        });
        console.log(
          "First pass result:",
  
          firstPassResult
          // JSON.parse(firstPassResult).map((item) => item.productDescription)
        );
  
        let firstPassProducts = [];
        try {
          firstPassProducts = JSON.parse(firstPassResult);
        } catch (parseError) {
          console.error("Could not parse first pass JSON:", parseError);
          return firstPassResult;
        }
  
        console.log("Calling for SECOND pass with previous data");
        const secondPassResult = await getProductsGPT({
          token,
          image: sectionImageUrl,
          imageSize,
          previousData: firstPassProducts,
        });
        console.log('secondPassResult', secondPassResult)
        console.log(
          "RETURNING DATA FROM PRODUCTS SECTION (Refined):",
          JSON.parse(secondPassResult).map((item) => item.productDescription)
        );
        return secondPassResult;
      } catch (sectionError) {
        console.error("Error processing document:", sectionError);
        return { error: sectionError.message };
      }
    } catch (error) {
      console.error("Error in processProductsSection:", error);
      return { error: error.message || "Failed to process image sections" };
    }
  };
  


  module.exports = {
    processDataAndAppend,
    processImageSections,
    processProductsSection
  }