const cheerio = require('cheerio');
const axios = require('axios');

const twilio = require('twilio');
// => Excel de scraping de empresas (1000 empresas), pasarlas por el GPT
// y crear un excel que vaya al dashboard de winpay


const scrapeInfo = async (resellerConfig) => {
    try {
        const keys = Object.keys(resellerConfig)
        const items = Object.values(resellerConfig)

        const arr = {}


        for (let j = 0; j < keys.length; j++) {
            const key = keys[j]
            const item = items[j]

            const response = await axios.get(item.url);
            const $ = cheerio.load(response.data);

            const results = {};

            Object.entries(item.data).forEach(([key, config]) => {
                if (config.value) {
                    const element = $(config.value);

                    results[key] = element.length ? element.text().trim() : null;
                }
            });

            arr[key] = results
        }

        return arr;

    } catch (error) {
        console.error('Error scraping infoempresa:', error);
        throw error;
    }
};



const readGPT = async (obj, arr) => {

    let text = obj
    if (typeof obj === 'object') {
        text = JSON.stringify(obj)
    }


    let systemPrompt =
        `Tu objetivo es detectar attributos y devolver un codeblock. 
Si no encuentras ningún atributo, devuelve {"error": true}. 

Devuelve un formato con los key y los datos que obtengas del texto JSON correcto:

${JSON.stringify(arr)}



De este texto encuentra los atributos y devuelve un codeblock con el formato correcto: 
${text}
`


    // console.log('systemPrompt', systemPrompt)


    let result = ''

    const conversation = [
        {
            role: 'user',
            content: [{
                type: 'text',
                text: systemPrompt
            }],
        },
    ];

    try {
        for (const [index, userMessage] of conversation.entries()) {
            const body = {
                model: "gpt-4o-mini",
                temperature: 0.7,
                max_tokens: 12096,
                messages: [userMessage]
            }

            let _token = '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'
            const response = await axios.post(
                'https://api.openai.com/v1/chat/completions',
                body,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${_token}`,
                    },
                }
            ).catch(err => {
                console.log('err', err)
                throw err
            })

            result = response.data.choices[0].message.content
            // console.log('result', result)
        }

        let response = await extractCodeBlocks(result)

        if (typeof response[1] == 'string') {
            response = JSON.parse(response[1])
        } else {
            response = response[1]
        }

        if (response.error) {
            return { error: 'e' }
        }

        return response
    } catch (e) {
        console.log('error', e);
        return { error: e }
    }
}


const mainReseller = async (req, res) => {
    try {
        const enterprise = {
            diexco: 'https://empresite.eleconomista.es/DISTRIBUCIONES-EXCLUSIVAS-COLL.html',
            qdq: 'https://empresite.eleconomista.es/QDQ-QUIA.html',
            qdq1: 'https://empresite.eleconomista.es/QDQ-MEDIA.html',
            titus: 'https://empresite.eleconomista.es/TITUS.html',
        }

        let info = {
            empresite: {
                url: 'https://empresite.eleconomista.es/ALLIED-SPAIN-DMC.html',
                data: {
                    cta: {
                        value: '#seeMoreContext',
                        response: 'text'
                    }
                }
            },
            infoempresa: {
                url: 'https://www.infoempresa.com/es-es/es/empresa/distribuciones-exclusivas-coll-sl',
                data: {
                    agents: {
                        value: '#tab-directors > div > div:nth-child(3) > div.col.s12.m9 > ul',
                        response: 'text'
                    }
                }
            }

        }
        const arr = {}

        const keys = Object.keys(enterprise)

        for (let j = 0; j < keys.length; j++) {
            const key = keys[j]
            info.empresite.url = enterprise[key]

            const data = await scrapeInfo(info);
            // console.log('DATA:', data);


            info.empresite.gpt = await readGPT(data.empresite, {
                name: 'Razon social',
                address: 'Dirección de la empresa',
                cif: 'CIF de la empresa',
                phone: 'Teléfono de la empresa',
                web: 'Texto de la web de la empresa',
                facturacion_total: 'Facturacón total de toda la industria con los datos de Informa..',
                facturacion: 'Facturacón de la empresa según el ranking',
                code_postal: 'Código postal de la empresa',
                province: 'Provincia de la empresa',
                country: 'País de la empresa',
                antiguedad: 'Antiguedad de la empresa en años',
                puestos: 'Cuantos puestos ha mejorado en total en numeros',
                puesto_actual: 'Puesto actual de la empresa en el ranking provincial',
                competencia: 'Un array de la competencia de la empresa []',
            })

            info.infoempresa.gpt = await readGPT(data.infoempresa, {
                agents: 'Array de objetos con .name: nombre de la persona, date: fecha del nombramiento',
            })


            arr[key] = {
                ...info.empresite.gpt,
                ...info.infoempresa.gpt
            }

        }



        // const gpt = await readGPT(data.cta)
        console.log('DATA-GPT:', arr);

        console.log('eee', JSON.stringify(arr.diexco.agents))
        // console.log('DATA-GPT:', info.infoempresa.gpt);

        return res.status(200).send(arr)
    } catch (error) {
        console.error('Error en la ejecución:', error);
    }
}

// Ejecutar la función principal
// main();



/*
Necesito 20 keywords de negocios que puedan >= 1M

Guardar en una base de datos

*/



const testTwilio = (req, res) => {

    

    // Configura las credenciales de Twilio
    const accountSid = 'TU_ACCOUNT_SID';
    const authToken = 'TU_AUTH_TOKEN';
    const client = twilio(accountSid, authToken);

    // Número de Twilio, número del receptor y la URL del webhook para registrar la llamada
    const twilioPhoneNumber = '+1234567890'; // Número de Twilio
    const toPhoneNumber = '+0987654321'; // Número al que quieres llamar
    const recordingUrl = 'https://your-domain.com/twilio/recording'; // Tu webhook

    // Realiza la llamada
    client.calls
        .create({
            twiml: `<Response>
              <Say voice="alice">Hola, esta es una llamada de prueba desde Twilio.</Say>
              <Record maxLength="30" action="${recordingUrl}" />
              <Say>Gracias por participar. Adiós.</Say>
            </Response>`,
            to: toPhoneNumber,
            from: twilioPhoneNumber,
        })
        .then(call => {
            console.log('Llamada iniciada. SID:', call.sid);
        })
        .catch(error => {
            console.error('Error al realizar la llamada:', error);
        });

    return res.status(200).send('Hello Twilio GPT')
}

const testReseller = (req, res) => {
    return res.status(200).send('Hello Reseller GPT')
}

module.exports = {
    testReseller: testReseller,
    mainReseller: mainReseller,
    testTwilio: testTwilio
}



async function extractCodeBlocks(fullCode) {
    const regexTripleQuotes = /```(\w+)[\s\S]+?```/g;
    let matchesTripleQuotes = [...fullCode.matchAll(regexTripleQuotes)];

    if (matchesTripleQuotes.length > 0) {
        const codeBlock = matchesTripleQuotes[0][0];
        const codeType = matchesTripleQuotes[0][1].toLowerCase();

        const cleanedCodeBlock = codeBlock.replace(/```(\w+)/, '').replace(/```$/, '').trim();

        const cleanedCodeWithoutComments = cleanedCodeBlock.split('\n').filter(line => !line.trim().startsWith('//')).join('\n');

        return [codeType, cleanedCodeWithoutComments];
    } else {
        const regexComments = /^\/\/.*$/gm;
        const cleanedCodeWithoutComments = fullCode.replace(regexComments, '').trim();

        return ["plaintext", cleanedCodeWithoutComments];
    }
}