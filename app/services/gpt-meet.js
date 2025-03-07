const axios = require("axios");
// const { OpenAIStream, StreamingTextResponse } = require("ai");
const tiktoken = require("tiktoken");

const { extractCodeBlocks } = require("./automate/utils");
const { connectDB } = require("../controllers/utils");

const meetGPT = async (res, prompt, token, userId) => {
  return new Promise(async (resolve, reject) => {

    const inputTokenPricePerThousand = 0.15 // $0.15 por 1,000,000 tokens
    const outputTokenPricePerThousand = 0.6 // $0.60 por 1,000,000 tokens
    const enc = tiktoken.encoding_for_model('gpt-4o-mini')


    let systemPrompt =
      `Eres un agente devuelveme la siguiente respuesta en JSON de la siguiente
    pregunta: ${prompt}
    

    Type puede ser:
    - products: Si está buscando productos
    - clients: Si está buscando clientes
    - docs: Si está buscando documentos
    - other: Si no está buscando nada en especifico


    SQL es un objeto con la siguiente estructura:
    que permite usar la base de datos couchdb con las funciones
    find. Entonces necesito que me devuelvas el selector para la consulta.
    
    No pongas el sql.selector.type

    {
      "type": "products" | "clients" | "docs" | "other,
      "response": "respuesta del prompt",
      "sql": {}
    }
    `



    const pre_response = await axios.post("https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4o-mini",
        temperature: 0.7,
        max_tokens: 2096,
        messages: [{
          role: 'user',
          content: [{
            type: 'text',
            text: systemPrompt
          }],
        }],
      }, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });


    const value_response = extractCodeBlocks(pre_response.data.choices[0].message.content)
    const json_response = JSON.parse(value_response[1])
    console.log('pre_response', json_response)

    if (json_response.type === 'other') {
      const text = json_response.response

      const tokenInput = enc.encode(systemPrompt).length
      const tokenInputCost = (tokenInput / 1000000) * inputTokenPricePerThousand

      const tokenOutput = enc.encode(text).length
      const tokenOutputCost = (tokenOutput / 1000000) * outputTokenPricePerThousand
      console.log('data ABCDF')

      for (let i = 0; i < 2; i++) {
        res.write(
          JSON.stringify({
            type: 'info',
            // timestamp: '',
            timestamp: 'ABC123DEF4567890XYZ'.repeat(100000),
            data: {
              id: '123',
              input: {
                token: tokenInput,
                price: tokenInputCost,
              },
              output: {
                token: tokenOutput,
                price: tokenOutputCost,
              },
              text: text,
            },
          }) + '\n'
        )
      }

      resolve({
        success: true,
        text: text
      })

      return false
    } else if (json_response.type !== 'other' && json_response.sql) {
      const db = await connectDB(`db_${userId}_${json_response.type}`)


      console.log(`db_${userId}_${json_response.type}`)
      let selector = json_response.sql.selector
      delete selector.type
      
      console.log('selector', selector)

      const result = await db.find({
        selector: {}
        // selector: selector
      })

      console.log('result result', result)
      systemPrompt =
        `Actua como un asesor fiscal y contesta la siguiente pregunta:
      ${prompt}
      `

      if(result.docs.length > 0){
        systemPrompt += `
        Ten en cuenta el siguiente contexto:
        ${JSON.stringify(result.docs)}
        `
        // ${result.docs.map(doc => doc.response).join('\n')}
      }

      const conversation = [{
        role: 'user',
        content: [{
          type: 'text',
          text: systemPrompt
        }],
      }];

      try {
        const tokenInput = enc.encode(systemPrompt).length
        const tokenInputCost = (tokenInput / 1000000) * inputTokenPricePerThousand


        for (const [index, userMessage] of conversation.entries()) {
          const body = {
            model: "gpt-4o-mini",
            temperature: 0.7,
            max_tokens: 2096,
            messages: [userMessage],
            stream: true,
          }


          const response = await axios.post("https://api.openai.com/v1/chat/completions",
            body,
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
              responseType: 'stream',
            });


          // console.log('response', response.data)
          let value = ''
          response.data.on('data', (chunk) => {
            const lines = chunk
              .toString()
              .split('\n')
              .filter((line) => line.trim() !== '')
            for (const line of lines) {
              const message = line.replace(/^data: /, '')
              if (message === '[DONE]') {
                break
              }
              try {
                const parsed = JSON.parse(message)
                if (parsed.choices && parsed.choices.length > 0) {
                  let textChunk = parsed.choices[0].delta.content || ''
                  let tokenOutput = enc.encode(textChunk).length
                  const tokenOutputCost =
                    (tokenOutput / 1000000) * outputTokenPricePerThousand

                  // console.log('textChunk', textChunk)

                  value += textChunk
                  res.write(
                    JSON.stringify({
                      type: 'info',
                      // timestamp: '',
                      timestamp: 'ABC123DEF4567890XYZ'.repeat(1000),
                      data: {
                        id: '123',
                        input: {
                          token: tokenInput,
                          price: tokenInputCost,
                        },
                        output: {
                          token: tokenOutput,
                          price: tokenOutputCost,
                        },
                        text: textChunk,
                      },
                    }) + '\n'
                  )
                }
              } catch (error) {
                console.log('Error parsing stream data', error)
              }
            }
          })


          response.data.on('end', () => {
            console.log('end', value)

            resolve({
              success: true,
              text: value
            });
          })

        }

      } catch (e) {
        console.log('error', e);
      }
    }
  })




  ///////////////////////////////
  ///////////////////////////////

}





const validateToken = async (token) => {
  try {

    const response = await axios.get("https://api.openai.com/v1/models", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });


    // console.log('response', response.data)
    return true
  } catch (e) {
    // console.log('error', e)
    return false
  }
}


module.exports = {
  meetGPT,
  validateToken
}


const calculateTokens = async (token, text, model, type) => {
  try {
    const tokenizer = tiktoken.encoding_for_model(model);
    const maxWordsPerChunk = 8000;

    const chunks = splitTextIntoChunksByTokens(text, maxWordsPerChunk);

    let totalTokens = 0;
    let totalPrice = 0;
    const allEmbeddings = [];

    let n = 0;
    for (const chunk of chunks) {
      console.log("Processing chunk", n++);
      const tokens = tokenizer.encode(chunk).length;

      const response = await axios.post(
        "https://api.openai.com/v1/embeddings",
        {
          model: "text-embedding-3-small",
          input: chunk,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const tokensPerThousand = 1_000;
      let costPerThousandTokens = 0;

      if (type === "input") {
        switch (model) {
          case "gpt-4o":
            costPerThousandTokens = 0.0025;
            break;
          case "gpt-4o-mini":
            costPerThousandTokens = 0.00015;
            break;
          case "o1-preview":
            costPerThousandTokens = 0.015;
            break;
          case "o1-mini":
            costPerThousandTokens = 0.003;
            break;
          case "gpt-3.5-turbo":
            costPerThousandTokens = 0.003;
            break;
          case "gpt-3.5-turbo-16k":
            costPerThousandTokens = 0.003;
            break;
          case "gpt-4":
            costPerThousandTokens = 0.03;
            break;
          default:
            throw new Error("Unsupported model for input token pricing");
        }
      } else if (type === "output") {
        switch (model) {
          case "gpt-4o":
            costPerThousandTokens = 0.01;
            break;
          case "gpt-4o-mini":
            costPerThousandTokens = 0.0006;
            break;
          case "o1-preview":
            costPerThousandTokens = 0.06;
            break;
          case "o1-mini":
            costPerThousandTokens = 0.012;
            break;
          case "gpt-3.5-turbo":
            costPerThousandTokens = 0.006;
            break;
          case "gpt-3.5-turbo-16k":
            costPerThousandTokens = 0.004;
            break;
          case "gpt-4":
            costPerThousandTokens = 0.06;
            break;
          default:
            throw new Error("Unsupported model for output token pricing");
        }
      }

      const price = (tokens / tokensPerThousand) * costPerThousandTokens;

      totalTokens += tokens;
      totalPrice += price;

      allEmbeddings.push(...response.data.data.map((item) => item.embedding));
    }

    return {
      token: totalTokens,
      price: totalPrice.toFixed(10),
    };
  } catch (error) {
    console.log(
      "Error obtaining the embedding:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};
