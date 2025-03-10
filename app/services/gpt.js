const { default: axios } = require("axios");



const ini_document = {
    prompt: `**INSTRUCCIONES**
    Tu tarea es analizar el contenido del documento proporcionado para extraer información relevante. Debes seguir estas reglas estrictamente:
    
    1. **Identificar el Tipo de Documento**
       - Determina si el documento es una **factura** o un **albarán**. En los casos en los que se encuentre la palabra "factura" en el documento, considera que es una factura. De caso contrario, considera que es un albarán. ESTA PROPIEDAD TIENE QUE TENER UNO DE LOS DOS VALORES OBLIGATORIOS: "factura" o "albarán".
       - Devuelve una propiedad llamada "documentType" con los valores "factura" o "albarán" según corresponda.
    
    2. **Valores Comunes para Ambos Tipos de Documento**
        - **Número de Pedido (numberOrder)**: Busca el número de pedido (puede aparecer como "Número de pedido:", "Pedido:", "Ped: " o variantes similares).
         - *Nota*: Este número no debe confundirse con el número de factura o albarán.
         - Si no encuentras este dato, devuelve "numberOrder": "NOT FOUND".
  
      - **Número de Cliente**: Este dato es confidencial. Siempre devuelve "clientNumber": "PRIVATE".
  
  - **CIF del Cliente**: Busca y extrae el CIF del cliente siguiendo estas reglas:
  
  El CIF puede aparecer precedido de etiquetas como "CIF", "C.I.F.", "CF" (o variantes similares). Estas etiquetas pueden estar en mayúsculas, minúsculas o una combinación de ambas.
  Formato esperado:
  Un CIF válido está compuesto de:
  1 letra inicial (puede ser A, B, C, etc.).
  8 números consecutivos.
  Pueden estar separados por guiones o espacios (por ejemplo, "A-12345678", "A 12345678").
  Puede incluir el prefijo "ES" antes del valor (por ejemplo, "ES A12345678").
  Validaciones:
  Si el valor encontrado tiene la letra A y los números 58861311, descártalo porque corresponde al vendedor, no al cliente.
  Si encuentras más de un CIF posible, selecciona el primero que cumpla con las reglas anteriores y que no sea del vendedor.
  Respuesta en caso de no encontrar un CIF válido:
  Si no encuentras ningún CIF del cliente, devuelve: {"clientCif": "NOT FOUND"}.
  NIF del Cliente: Busca y extrae el NIF del cliente siguiendo estas reglas:
  
  - **NIF del Cliente**:
  El NIF puede aparecer precedido de etiquetas como "NIF", "N.I.F." o variantes similares. Estas etiquetas pueden estar en mayúsculas, minúsculas o una combinación de ambas.
  Formato esperado:
  Un NIF válido está compuesto de:
  Para ciudadanos españoles con DNI: 8 números consecutivos + 1 letra de control (por ejemplo, "12345678Z").
  Para otros casos: 1 letra inicial + 7 números consecutivos + 1 letra de control (por ejemplo, "X1234567L").
  Los números y letras pueden estar separados por guiones o espacios.
  Validaciones:
  Asegúrate de que el valor encontrado cumple estrictamente con el formato descrito.
  Si encuentras múltiples valores posibles, selecciona el primero que cumpla con las reglas.
  Respuesta en caso de no encontrar un NIF válido:
  Si no encuentras ningún NIF del cliente, devuelve: {"clientNif": "NOT FOUND"}.
    
    3. **Reglas Generales**
       - Si no encuentras un valor esperado, asignale "NOT FOUND".
    
    4. **Datos Específicos por Tipo de Documento**
  
       - Extrae los siguientes datos:
         - "documentType": Si es un albaran o factura
         - "invoiceDate": Fecha de la factura
       - "invoiceIssueDate": Fecha de emisión de la factura en formato YYYY-MM-DD.
         - "expirationDateYear": Año de vencimiento de la factura.
         - "expirationDateMonth": Mes de vencimiento de la factura.
         - "expirationDateDay": Día de vencimiento de la factura.
         - "numberDocument": Número de la factura / albaran.
         - "clientCif": CIF del cliente.
         - "clientNif": NIF del cliente.
       - "clientPhoneNumber": Número de telefono del cliente.
       - "clientEmail": Correo electrónico del cliente.
         - "clientName": Nombre del cliente.
         - "clientAddress": Dirección completa del cliente.
       - "clientAddressNumber": Número de la dirección del cliente.
       - "clientAddressStreet": Calle de la dirección del cliente.
       - "clientAddressFloor": Piso de la dirección del cliente.
         - "clientCity": Ciudad del cliente.
       - "clientProvince": Provincia del cliente.
         - "clientZip": Código postal del cliente.
       - "companyPhoneNumber": Número de telefono de la empresa.
       - "companyEmail": Correo electrónico de la empresa.
         - "companyName": Nombre de la empresa.
         - "companyAddress": Dirección completa de la empresa.
         - "companyCity": Ciudad de la empresa.
       - "companyProvince": Provincia de la empresa.
         - "companyZip": Código postal de la empresa.
         - "conditionPay": Condición de pago.
         - Totales:
           - "totalAmount": Importe total de la factura.
           - "partialAmount": Importe parcial de la factura.
           - "discountAmount": Descuento aplicado en la factura.
    
    5. **Formato de Respuesta Ejemplo**
  
    {
      "documentType": "factura",
      "invoiceDate": "DD/MM/YYYY",
      "numberDocument": "404302292",
      "clientCif": "B12345678",
      "clientNif": "12345678B",
      "clientName": "APOLO SOLIS, JOSE LUIS",
    ...
    }
    
    Consideraciones Finales:
    Intentar buscar clientAddress, clientCity, clientProvince, clientZip, companyAddress, companyCity, companyProvince, companyZip. (Los del cliente suelen estar en la parte inferior del documento, mientras que los de la empresa en la parte superior).
    Convierte TODOS los numeros a numeros con 2 decimales, por mas que sea entero. Eliminar tipo de moneda y simbolo. (2,000.24€ -> 2000.24, 20€ -> 20.00)
    Evita confusiones entre el número de pedido, número de factura, y número de albarán.
    No incluyas datos confidenciales, como el número de cliente, más allá de lo especificado.
    `,
    agents: [],
  };
  


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







  function processItems(obj, gpt) {
    let forLines = {};
    function getDateComponent(dateString, opt) {
      const dateParts = dateString.split("/");
      let date;
  
      if (dateParts.length === 3) {
        const [day, month, year] = dateParts;
        date = new Date(`${year}-${month}-${day}`);
      } else {
        date = new Date(dateString);
      }
  
      if (isNaN(date)) {
        return "";
      }
  
      switch (opt) {
        case "day":
          return String(date.getDate());
        case "month":
          return String(date.getMonth() + 1);
        case "year":
          return String(date.getFullYear());
        default:
          return "";
      }
    }
  
    function replaceRecursive(variableName, innerGpt, gptTotal) {
      let gpt = innerGpt;
      let opt = variableName.split("::")[1];
      let name = variableName.split("::")[0];
  
      if (!gpt[name] && name === "invoiceDate") {
        gpt = gptTotal;
  
        if (gpt[name] && typeof gpt[name] === "string") {
          let dateResponse = getDateComponent(gpt[name], opt);
          return dateResponse;
        }
      }
  
      let updatedGPT = gpt[name];
  
      let replacementValue = "";
  
      // Handle number values
      if (typeof updatedGPT === "string") {
        let dateResponse = getDateComponent(updatedGPT, opt);
        return dateResponse;
      }
      if (typeof updatedGPT === "number" && Number.isFinite(updatedGPT)) {
        let operator = opt.charAt(0);
        let value = opt.slice(1);
  
        if (typeof value === "string" && gpt[value]) {
          value = parseFloat(gpt[value]);
        } else {
          value = parseFloat(value);
        }
  
        if (operator === "+") {
          replacementValue = (updatedGPT + value).toFixed(3);
        } else if (operator === "-") {
          replacementValue = (updatedGPT - value).toFixed(3);
        } else if (operator === "*" || operator === "x") {
          replacementValue = (updatedGPT * value).toFixed(3);
        } else if (operator === "/" || operator === ":" || operator === "%") {
          replacementValue = (updatedGPT / value).toFixed(3);
        } else {
          console.log("Operador no válido");
        }
      } else if (updatedGPT instanceof Date && !isNaN(updatedGPT.getTime())) {
        const year = updatedGPT.getFullYear();
        const month = updatedGPT.getMonth() + 1;
        const day = updatedGPT.getDate();
  
        if (opt === "quarter") {
          replacementValue = Math.floor((month - 1) / 3) + 1;
        } else if (opt === "year") {
          replacementValue = year;
        } else if (opt === "month") {
          replacementValue = month;
        } else if (opt === "day") {
          replacementValue = day;
        }
      }
  
      return replacementValue;
    }
  
    function searchRecursive(currentObj, parentKey = null, parentData = null) {
      let modifiedObj = { ...currentObj };
  
      function isNumericKeyedObject(obj) {
        return (
          Object.keys(obj).length > 0 &&
          Object.keys(obj).every((key) => !isNaN(key))
        );
      }
  
      for (let key in modifiedObj) {
        if (
          modifiedObj[key] &&
          modifiedObj[key]._attributes &&
          modifiedObj[key]._attributes["for-data"]
        ) {
          // console.log("key===", key);
          const variable = modifiedObj[key]._attributes["for-data"];
          // console.log("VARIABLE===", variable);
  
          if (!forLines[variable]) {
            forLines[variable] = { n: 0 };
          }
  
          delete modifiedObj[key]._attributes;
          let updatedArray = [];
  
          if (gpt[variable] && Array.isArray(gpt[variable])) {
            for (let i = 0; i < gpt[variable].length; i++) {
              let clonedItem = JSON.parse(JSON.stringify(modifiedObj[key]));
              clonedItem = searchRecursive(clonedItem, key, variable);
  
              clonedItem._attributes = { id: i + 1 };
              updatedArray.push(clonedItem);
              forLines[variable].n++;
            }
          }
  
          modifiedObj[key] = updatedArray;
        } else if (
          typeof modifiedObj[key] === "object" &&
          modifiedObj[key] !== null
        ) {
          if (isNumericKeyedObject(modifiedObj[key])) {
            let updatedArray = [];
            for (let i = 0; i < modifiedObj[key].length; i++) {
              let clonedItem = JSON.parse(JSON.stringify(modifiedObj[key][i]));
              clonedItem = searchRecursive(clonedItem, key, parentData);
              updatedArray.push(clonedItem);
            }
  
            modifiedObj[key] = updatedArray;
          } else {
            modifiedObj[key] = searchRecursive(modifiedObj[key], key, parentData);
          }
        } else if (
          typeof modifiedObj[key] === "string" &&
          modifiedObj[key].match(/^\%.*\%$/)
        ) {
          let variableName = modifiedObj[key].slice(1, -1);
          let replacementValue = "";
          let valueGPT = gpt;
  
          if (!gpt[variableName] && parentData && forLines[parentData]) {
            const n = forLines[parentData].n;
            valueGPT = {
              ...gpt[parentData][n],
              n: n + 1,
            };
          }
  
          replacementValue = valueGPT.hasOwnProperty(variableName)
            ? valueGPT[variableName]
            : "";
          // : 'notfound'
  
          if (variableName.includes("::")) {
            replacementValue = replaceRecursive(variableName, valueGPT, gpt);
            // console.log('::', variableName, replacementValue)
          }
          // console.log('key to replace', key, 'object',modifiedObj,'replacement value', replacementValue)
          modifiedObj[key] = replacementValue;
        }
      }
  
      return modifiedObj;
    }
  
    return searchRecursive(obj);
  }

  



  module.exports = {
    documentGPT,
    getProductsGPT,
    processItems
  };



//   const extractCodeBlocks = async (fullCode) => {
//     const regexTripleQuotes = /```(\w+)[\s\S]+?```/g;
//     let matchesTripleQuotes = [...fullCode.matchAll(regexTripleQuotes)];
  
//     if (matchesTripleQuotes.length > 0) {
//       const codeBlock = matchesTripleQuotes[0][0];
//       const codeType = matchesTripleQuotes[0][1].toLowerCase();
  
//       const cleanedCodeBlock = codeBlock.replace(/```(\w+)/, '').replace(/```$/, '').trim();
  
//       const cleanedCodeWithoutComments = cleanedCodeBlock.split('\n').filter(line => !line.trim().startsWith('//')).join('\n');
  
//       return [codeType, cleanedCodeWithoutComments];
//     } else {
//       const regexComments = /^\/\/.*$/gm;
//       const cleanedCodeWithoutComments = fullCode.replace(regexComments, '').trim();
  
//       return ["plaintext", cleanedCodeWithoutComments];
//     }
//   }


async function extractCodeBlocks(fullCode) {
	// Expresión regular para detectar bloques de código con triple comillas invertidas
	const regexTripleQuotes = /```(\w+)[\s\S]+?```/g
	let matchesTripleQuotes = [...fullCode.matchAll(regexTripleQuotes)]

	// Si encontramos bloques de código con triple comillas invertidas
	if (matchesTripleQuotes.length > 0) {
		const codeBlock = matchesTripleQuotes[0][0]
		const codeType = matchesTripleQuotes[0][1].toLowerCase()

		// Eliminar las triple comillas invertidas del principio y del final
		const cleanedCodeBlock = codeBlock
			.replace(/```(\w+)/, '')
			.replace(/```$/, '')
			.trim()

		// Eliminar líneas que comienzan con "//"
		const cleanedCodeWithoutComments = cleanedCodeBlock
			.split('\n')
			.filter((line) => !line.trim().startsWith('//'))
			.join('\n')

		return [codeType, cleanedCodeWithoutComments]
	} else {
		// Si no se encuentra un bloque de código con triple comillas invertidas
		// Expresión regular para detectar bloques de código en líneas que comienzan con "//"
		const regexComments = /^\/\/.*$/gm
		const cleanedCodeWithoutComments = fullCode
			.replace(regexComments, '')
			.trim()

		return ['plaintext', cleanedCodeWithoutComments]
	}
}
  

  
  
//   async function extractCodeBlocks(fullCode) {
//     try {
//       const regexTripleQuotes = /```(\w+)[\s\S]*?```/g;
//       let matchesTripleQuotes = [...fullCode.matchAll(regexTripleQuotes)];
  
//       if (matchesTripleQuotes.length > 0) {
//         const codeBlock = matchesTripleQuotes[0][0];
//         const codeType = matchesTripleQuotes[0][1].toLowerCase();
  
//         const cleanedCodeBlock = codeBlock
//           .replace(/```(\w+)/, "")
//           .replace(/```$/, "")
//           .trim();
  
//         const cleanedCodeWithoutComments = cleanedCodeBlock
//           .split("\n")
//           .filter((line) => !line.trim().startsWith("//"))
//           .join("\n");
  
//         return [codeType, cleanedCodeWithoutComments];
//       } else {
//         const regexComments = /^\/\/.*$/gm;
//         const cleanedCodeWithoutComments = fullCode
//           .replace(regexComments, "")
//           .trim();
  
//         return ["plaintext", cleanedCodeWithoutComments];
//       }
//     } catch (error) {
//       console.error("Error in extractCodeBlocks:", error);
//       return [
//         "error",
//         { error: error.message || "Error extracting code blocks" },
//       ];
//     }
//   }
  