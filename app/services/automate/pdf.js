
const sharp = require('sharp')
const { default: axios } = require("axios");


const {
  // getProductsGPT,
  // documentGPT
} = require('./gpt.js')

const { 
  extractCodeBlocks 
} = require('./utils')

const documentGPT = async ({
  token,
  image,
  isDocument = false, 
  searchCif = false,
  searchNif = false,
  imageSize = "1536x2048",
  recheckProducts = false,
}) => {
  let systemPrompt;

  let document = isDocument ? ini_document : false

  if (searchNif && searchCif) {
    systemPrompt = `Busca ambos atributos: el CIF y el NIF del cliente.
    
    - **CIF**: Puede aparecer como "CIF", "C.I.F.", o variantes similares. 
      - Representado por 1 letra seguida de 8 números, separados opcionalmente por guiones o espacios (por ejemplo, "A-53466839").
      - Si encuentras el valor con la letra "A" y el número "58861311", descártalo, ya que corresponde al vendedor.
      - Puede aparecer sin estar precedido por ninguna etiqueta que haga referencia al CIF. (por ejemplo, "A53466839").
      - Si encuentras el CIF, devuélvelo como un objeto con la propiedad "clientCif" y ese valor. Si no encuentras ninguno, usa {"clientCif": "NOT FOUND"}.
  
    - **NIF**: Puede aparecer como "NIF", "N.I.F." o variantes similares.
      - Para ciudadanos con DNI: 8 números seguidos de una letra (por ejemplo, "12345678Z").
      - Para otros: 1 letra, 7 números, y otra letra (por ejemplo, "X1234567L").
      - Si encuentras el NIF, devuélvelo como un objeto con la propiedad "clientNif" y ese valor. Si no encuentras ninguno, usa {"clientNif": "NOT FOUND"}.
  
  Devuelve los resultados como un JSON válido, incluyendo ambos atributos.`;
  } else if (searchNif) {
    systemPrompt = `Busca el NIF del cliente (puede aparecer como "NIF", "N.I.F." o variantes similares).
    
    - **Formato del NIF**:
      - Para ciudadanos con DNI: 8 números seguidos de una letra (por ejemplo, "12345678Z").
      - Para otros: 1 letra, 7 números, y otra letra (por ejemplo, "X1234567L").
    
    - Si encuentras el NIF, devuélvelo como un objeto con la propiedad "clientNif" y ese valor.
    - Si no encuentras ningún NIF del cliente, devuelve {"clientNif": "NOT FOUND"}.`;
  } else if (searchCif) {
    systemPrompt = `Busca el CIF del cliente (puede aparecer como "CIF", "C.I.F." o variantes similares).
    
    - **Formato del CIF**:
      - Representado por 1 letra seguida de 8 números, separados opcionalmente por guiones o espacios (por ejemplo, "A-53466839").
      - Puede incluir un prefijo "ES" (por ejemplo, "ES A53466839").
    
    - **Validaciones**:
      - Si encuentras el valor con la letra "A" y el número "58861311", descártalo, ya que corresponde al vendedor.
    
    - **Respuesta**:
      - Si encuentras el CIF, devuélvelo como un objeto con la propiedad "clientCif" y ese valor.
      - Si no encuentras ninguno, devuelve {"clientCif": "NOT FOUND"}.`;
  } else if (recheckProducts) {
    systemPrompt = `Tu objetivo es verificar los productos que se encuentran en el objeto proporcionado 
    y determinar si son correctos o incorrectos. Analiza profundamente la imagen. 
    Manten el mismo formato exacto para la respuesta. Haz las correcciones necesarias, 
    puede que algunos productRef no existan en la imagen, debes eliminarlos.`;
  } else {
    systemPrompt = `Tu objetivo es detectar atributos y devolver un bloque de código. 
    
    - **Formato de la Respuesta**:
      Si no encuentras ningún atributo, devuelve {"error": true}.
      Devuelve en formato JSON correcto:
      {
        "param1": "valor encontrado",
        "param2": "valor encontrado",
        ...
      }
    
    - **Atributos a detectar**:
      ${document?.prompt || "Sin especificar"}
    `;
  }

  const agents = searchCif || searchNif ? [] : document?.agents;

  if (agents && agents.length > 0) {
    systemPrompt += `\n\nTodas las condiciones extras añádelas en una clave "agent" que es un objeto con clave del id de la condición extra y valor booleano.
        Pon true si es verdadero, false si no es correcto, y si no hay información posible para contestar, pon null.\n`;

    agents.forEach((agent) => {
      systemPrompt += `\nCondición extra ${agent.id}: ${agent.prompt}\n`;
    });
  }

  const conversation = [
    {
      role: "user",
      content: [
        {
          type: "image_url",
          image_url: {
            url: image,
            detail: "high",
            size: imageSize,
          },
        },
        {
          type: "text",
          text: systemPrompt,
        },
      ],
    },
  ];

  try {
    const body = {
      model: "gpt-4o-mini",
      temperature: 0.7,
      max_tokens: 12096,
      messages: conversation,
    };

    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      body,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const result = response.data.choices[0].message.content;
    // console.log("result", result);

    // Calculate token usage for text (input + output)
    const inputTokens = systemPrompt.split(/\s+/).length;
    const outputTokens = result.split(/\s+/).length;
    const totalTokens = inputTokens + outputTokens;

    // Token pricing
    // $0.150 per 1M input tokens = $0.00000015 per input token
    // $0.600 per 1M output tokens = $0.0000006 per output token
    const pricePerToken = {
      input: 0.00000015,
      output: 0.0000006,
    };

    // Text token-based cost
    const totalPriceTokens =
      inputTokens * pricePerToken.input + outputTokens * pricePerToken.output;

    // Calculate image cost based on size
    // Baseline: 2048x2048 = 4,194,304 pixels → $0.003825 total
    const [widthStr, heightStr] = imageSize.split("x");
    const imageWidth = parseInt(widthStr, 10);
    const imageHeight = parseInt(heightStr, 10);

    const baselineWidth = 1536;
    const baselineHeight = 2048;
    const baselinePixels = baselineWidth * baselineHeight;
    const baselineCost = 0.003825; // cost for 1536x2048 image

    // Cost per pixel
    const costPerPixel = baselineCost / baselinePixels;

    // Calculate the cost for the given image size
    const pixels = imageWidth * imageHeight;
    const imageCost = pixels * costPerPixel;

    // Final price = token text cost + image cost
    const finalPrice = totalPriceTokens + imageCost;

    let [codeType, cleanedCode] = await extractCodeBlocks(result);

    let parsedResponse;
    try {
      parsedResponse = JSON.parse(cleanedCode);
    } catch (parseError) {
      // console.error('JSON parse error:', parseError);
      // return { error: 'Failed to parse JSON response', totalTokens, totalPrice: finalPrice };
    }

    // console.log(
    //   "TOTAL TOKENS CONSUMED:",
    //   totalTokens,
    //   "FINAL REQUEST PRICE:",
    //   finalPrice,
    //   "IMG SIZE:",
    //   imageSize
    // );
    if (parsedResponse.error) {
      return {
        error: parsedResponse?.error,
        totalTokens,
        totalPrice: finalPrice,
      };
    }

    return { ...parsedResponse, totalTokens, totalPrice: finalPrice };
  } catch (e) {
    console.error("Error in documentGPT:", e);
    return {
      error: e.message || "An error occurred in documentGPT",
      totalTokens: 0,
      totalPrice: 0,
    };
  }
};


const getProductsGPT = async ({
  token,
  image,
  imageSize = "1536x2048",
  previousData = null,
}) => {
  let systemPrompt;

  if (previousData) {
    systemPrompt = `Obtuve esta informacion en la iteracion anterior: ${JSON.stringify(previousData)}. Por favor, revisa estos datos, REALIZA UNA BUSQUEDA INTENSIVA PARA ASEGURAR DE QUE NO HAYA MAS PRODUCTOS. Mejora la precisión de los campos si ves inconsistencias, este es el prompt anterior: 
    
Analiza el contenido del documento e identifica las filas que correspondan a productos individuales. Un producto se caracteriza por tener al menos:
- Una descripción que no contenga la palabra "albaran".
- Una cantidad (un valor numérico).
- Un precio unitario o parcial.
- Una referencia del producto (Se muestra en una columna o campo separado de la descripción, hay casos en los que puede no aparecer).
- Un importe final.
  
Pueden existir cabeceras o filas con información que no corresponde a productos (como líneas que contienen la palabra "albaran" o encabezados de columnas). Ignora esas líneas que no representen un producto individual.

Propiedades a extraer para cada producto:
- "productRef": Referencia del producto (Ejemplos: "ABC123", 'REF. XXX', '66200', '180.180','625').
- "productDescription": Descripción del producto (texto que identifica el producto, sin incluir la palabra "albaran").
- "productQuantity": Cantidad del producto (un valor numérico).
- "productUnit": Unidad de medida (si aplica, si no se encuentra dejar "UN").
- "productPartial": Importe parcial o precio unitario antes de descuento (si se identifica, en caso contrario "").
- "productDiscountRate": Porcentaje de descuento aplicado, (Ej: 50, 10%, 35.00) (si aparece, por ejemplo en una columna 'Dto.'), de lo contrario "".
- "productDiscount": Valor absoluto del descuento (si puede inferirse o se muestra, en caso contrario "").
- "productImport": Importe final del producto tras aplicar descuentos (si se identifica, caso contrario "").
- "productAlbaranDate": Fecha del albarán (si existe alguna referencia previa a un albarán con fecha arriba de los productos, extraer esa fecha; si no se encuentra, dejar "").
- "productAlbaran": Numero del albarán (si existe alguna referencia previa del tipo "R-XXXXXXXXXX" u "OBRA XXX" u otra en la fila de cabecera del bloque al que pertenece el producto (PRIORIZAR EL NUMERO DEL ALBARAN), si no se encuentra, dejar "").
- "productAlbaranRef": Referencia del albarán, suele estar a la derecha del numero del albarán (si existe alguna referencia previa del tipo "OBRA XXX" u otra en la fila de cabecera del bloque al que pertenece el producto, si no se encuentra, dejar "").
Reglas:
- Todas las referencias deberian aparecer en la misma columna en cada producto. Si encontramos una, la referencia del producto siguiente, debe estar justo debajo de la anterior.
- No confundir productRef con productPartial o productImport o productDiscountRate o productDiscount.
- No devuelvas texto adicional ni explicaciones, solo un array JSON con los productos.
- Si no encuentras una propiedad, déjala como una cadena vacía ("").
- Si existen líneas que sirven como título o contienen la palabra "albaran" y no corresponden a un producto, ignóralas. No las incluyas como producto.
- Puede haber casos donde no haya referencia a un albarán ni fecha asociada, en ese caso "productAlbaranDate" , "productAlbaran" y "productAlbaranRef"  serán "".
- Puede haber casos en que el producto aparezca sin descuento, entonces "productDiscountRate" y "productDiscount" serán "".
- Puede haber casos en que solo haya productos sin ningún encabezado, simplemente extrae la información de cada fila que parezca un producto.

Devuelve la respuesta en el siguiente formato (ejemplo con posibles datos, pero tú debes usar los datos reales extraídos):
[
  {
    "productRef": "ABC123",
    "productDescription": "Bombilla LED 60W",
    "productQuantity": "10",
    "productUnit": "UN",
    "productPartial": "2.50",
    "productDiscountRate": "10",
    "productDiscount": "2.50",
    "productImport": "22.50",
    "productAlbaranDate": "16/12/2024",
    "productAlbaran": "R-12345678",
    "productAlbaranRef": "OBRA XXX"
  }
]
* IMPORTANTE *
Si hay 10 filas con cantidad/unidades deben haber 10 productos en el array. Las propiedades que no se encuentren en la fila, deben ser "".
Agregar TODOS los productos, sin importar si no se encuentra alguna referencia, si esta la cantidad y la descripcion, esa fila debe ser agregada al array de productos.
Convierte TODOS los numeros a numeros con 2 decimales, por mas que sea entero. Eliminar tipo de moneda y simbolo. (2,000.24€ -> 2000.24, 12.770 -> 12.77)
No incluyas explicación ni texto adicional afuera del array.
`;
  } else {
    systemPrompt = `Analiza el contenido del documento e identifica las filas que correspondan a productos individuales. Un producto se caracteriza por tener al menos:
    - Una descripción que no contenga la palabra "albaran".
    - Una cantidad (un valor numérico).
    - Un precio unitario o parcial.
    - Una referencia del producto (Se muestra en una columna o campo separado de la descripción, hay casos en los que puede no aparecer).
    - Un importe final.
      
    Pueden existir cabeceras o filas con información que no corresponde a productos (como líneas que contienen la palabra "albaran" o encabezados de columnas). Ignora esas líneas que no representen un producto individual.
    
    Propiedades a extraer para cada producto:
    - "productRef": Referencia del producto (Ejemplos: "ABC123", 'REF. XXX', '66200', '180.180','625').
    - "productDescription": Descripción del producto (texto que identifica el producto, sin incluir la palabra "albaran").
    - "productQuantity": Cantidad del producto (un valor numérico).
    - "productUnit": Unidad de medida (si aplica, si no se encuentra dejar "UN").
    - "productPartial": Importe parcial o precio unitario antes de descuento (si se identifica, en caso contrario "").
    - "productDiscountRate": Porcentaje de descuento aplicado, (Ej: 50, 10%, 35.00) (si aparece, por ejemplo en una columna 'Dto.'), de lo contrario "".
    - "productDiscount": Valor absoluto del descuento (si puede inferirse o se muestra, en caso contrario "").
    - "productImport": Importe final del producto tras aplicar descuentos (si se identifica, caso contrario "").
    - "productAlbaranDate": Fecha del albarán (si existe alguna referencia previa a un albarán con fecha arriba de los productos, extraer esa fecha; si no se encuentra, dejar "").
    - "productAlbaran": Numero del albarán (si existe alguna referencia previa del tipo "R-XXXXXXXXXX" u "OBRA XXX" u otra en la fila de cabecera del bloque al que pertenece el producto (PRIORIZAR EL NUMERO DEL ALBARAN), si no se encuentra, dejar "").
    - "productAlbaranRef": Referencia del albarán (si existe alguna referencia previa del tipo "OBRA XXX" u otra en la fila de cabecera del bloque al que pertenece el producto, si no se encuentra, dejar "").
    
    Reglas:
    - Todas las referencias deberian aparecer en la misma columna en cada producto. Si encontramos una, la referencia del producto siguiente, debe estar justo debajo de la anterior.
    - No confundir productRef con productPartial o productImport o productDiscountRate o productDiscount.
    - No devuelvas texto adicional ni explicaciones, solo un array JSON con los productos.
    - Si no encuentras una propiedad, déjala como una cadena vacía ("").
    - Si existen líneas que sirven como título o contienen la palabra "albaran" y no corresponden a un producto, ignóralas. No las incluyas como producto.
    - Puede haber casos donde no haya referencia a un albarán ni fecha asociada, en ese caso "productAlbaranDate" , "productAlbaran" y "productAlbaranRef"  serán "".
    - Puede haber casos en que el producto aparezca sin descuento, entonces "productDiscountRate" y "productDiscount" serán "".
    - Puede haber casos en que solo haya productos sin ningún encabezado, simplemente extrae la información de cada fila que parezca un producto.
    
    Devuelve la respuesta en el siguiente formato (ejemplo con posibles datos, pero tú debes usar los datos reales extraídos):
    [
      {
        "productRef": "ABC123",
        "productDescription": "Bombilla LED 60W",
        "productQuantity": "10",
        "productUnit": "UN",
        "productPartial": "2.50",
        "productDiscountRate": "10",
        "productDiscount": "2.50",
        "productImport": "22.50",
        "productAlbaranDate": "16/12/2024",
        "productAlbaran": "R-12345678"
        "productAlbaranRef": "OBRA XXX"
      }
    ]
    
    * IMPORTANTE *
    Si hay 10 filas con cantidad/unidades deben haber 10 productos en el array. Las propiedades que no se encuentren en la fila, deben ser "".
    Agregar TODOS los productos, sin importar si no se encuentra alguna referencia, si esta la cantidad y la descripcion, esa fila debe ser agregada al array de productos.
    No incluyas explicación ni texto adicional afuera del array.
    `;
  }

  const conversation = [
    {
      role: "user",
      content: [
        {
          type: "image_url",
          image_url: {
            url: image,
            detail: "high",
            size: imageSize,
          },
        },
        {
          type: "text",
          text: systemPrompt,
        },
      ],
    },
  ];

  try {
    const body = {
      model: "gpt-4o-mini",
      temperature: 0.7,
      max_tokens: 12096,
      messages: conversation,
    };

    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      body,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    let [codeType, cleanedCode] =  await extractCodeBlocks(response.data.choices[0].message.content);
    // console.log("result", result);
    return cleanedCode;
  } catch (e) {
    console.error("Error in documentGPT:", e);
    return {
      error: e.message || "An error occurred in documentGPT",
      totalTokens: 0,
      totalPrice: 0,
    };
  }
};

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
          
          console.log('sectionImageUrl', documentGPT)
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