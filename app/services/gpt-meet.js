const axios  = require("axios");
// const { OpenAIStream, StreamingTextResponse } = require("ai");
const tiktoken = require("tiktoken");

const meetGPT = async (res, prompt) => {
    let systemPrompt =
  `Cuentame un cuento de 1000 palabras`

//   const token = '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'
  const token = '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'
  
    const conversation = [{
        role: 'user',
        content: [{
            type: 'text',
            text: systemPrompt
        }],
    }];
  
    try {

        const inputTokenPricePerThousand = 0.15 // $0.15 por 1,000,000 tokens
        const outputTokenPricePerThousand = 0.6 // $0.60 por 1,000,000 tokens
    
        const enc = tiktoken.encoding_for_model('gpt-4o-mini')
    
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
						break // Se ha completado la transmisión
					}
					try {
                        // console.log('message', message)
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

							// result += textChunk;
						}
					} catch (error) {
						console.log('Error parsing stream data', error)
					}
				}
			})


            response.data.on('end', () => {
                console.log('end', value)
                return {
                    success: true,
                    value: value
                }
            })


            // res.write(
            //     `data: ${JSON.stringify({
            //       type: "action",
            //       data: {
            //         transcription: response.transcription,
            //         action: response.action,
            //         response: response.response,
            //         type: response.type,
            //       },
            //       // stamp: Array.from({ length: 30000 }, () => 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'.charAt(Math.floor(Math.random() * 62))).join('')
            //     })}\n\n`
            //   );
              
            
            //   res.write(
            //     JSON.stringify({
            //       type: "image",
            //       data: image,
            //     }) + "\n"
            //   );
            
            //   res.end();
            
  
  
            // const result = await resp.json();
            // const assistantResponse = result.choices[0].message.content;
  
            // let response = await extractCodeBlocks(assistantResponse)
            // if (typeof response[1] == 'string') {
            //     response = JSON.parse(response[1])
            // } else {
            //     response = response[1]
            // }
  
            // if (response.error) {
            //     return { error: 'e' }
            // }
  
            // return {
            //     success: true,
            //     value: value
            // }
        }
  
    } catch (e) {
        console.log('error', e);
        return { error: e }
    }
  }


  const validateToken = async (token) => {
    try{

      const response = await axios.get("https://api.openai.com/v1/models", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
  
      console.log('response', response.data)
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
  