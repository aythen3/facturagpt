const cheerio = require('cheerio');
const axios = require('axios');

const { connectDB } = require('./utils')

const nano = require('nano')('http://admin:1234@127.0.0.1:5984') // Cambia las credenciales y la URL según tu configuración


const twilio = require('twilio');
// => Excel de scraping de empresas (1000 empresas), pasarlas por el GPT
// y crear un excel que vaya al dashboard de winpay






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
    const twilioPhoneNumber = '+34900759890'; // Número de Twilio
    const toPhoneNumber = '+34667283537'; // Número al que quieres llamar
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




const fetchLeads = async (req, res) => {
    try {
        const { query, category } = req.query;
        const db = await connectDB('db_leads');

        console.log('··')
        let selector = {};

        // Build selector for search query
        if (query) {
            selector.$or = [
                { phone: { $regex: `(?i).*${query}.*` } },
                { web: { $regex: `(?i).*${query}.*` } },
                { location: { $regex: `(?i).*${query}.*` } },
                { keyword: { $regex: `(?i).*${query}.*` } },
                { address: { $regex: `(?i).*${query}.*` } },
                { state: { $regex: `(?i).*${query}.*` } },
                { city: { $regex: `(?i).*${query}.*` } }
            ];
        }

        // Add category filter if provided
        if (category) {
            selector.category = { $regex: `(?i)^${category}$` };
        }

        // Perform the query
        const leads = await db.find({
            selector: selector
        });

        console.log('··', leads)

        return res.status(200).json(leads);
    } catch (error) {
        console.error('Error fetching leads:', error);
        return res.status(500).json({ error: 'Error fetching leads' });
    }
}

const saveLeads = async (req, res) => {
    try {
        console.log('!!!!!')
        const { leads } = req.body

        const db = await connectDB(`db_leads`)

        for (const lead of leads) {
            await db.insert(lead);
        }


        return res.status(200).send(leads)

    } catch (error) {
        console.error('Error fetching leads:', error);
        return res.status(500).json({ error: 'Error fetching leads' });
    }
}


const gptLeads = async (req, res) => {
    try {
        console.log('!!!!! leads')
        const { leads } = req.body


        const db = await connectDB('db_leads')

        for (let j = 0; j < leads.length; j++) {
            const id = leads[j]
            console.log('lead', id)

            let lead = await db.get(id)

            // console.log('___lead', lead)

            const resp = await extractGPT(lead)
            console.log('resp', resp)

            if(resp == 404){
                return res.status(200).send('Not results')
            }

            await db.insert({
                _id: lead._id,
                _rev: lead._rev,
                gpt: true,
                ...lead,
                ...resp
            })
        }


    } catch (error) {
        console.error('Error fetching leads:', error);
        return res.status(500).json({ error: 'Error fetching leads' });
    }
}


const deleteLeads = async (req, res) => {
    try {
        const dell = await nano.db.destroy('db_leads')
        return res.status(200).json({ message: 'All leads deleted successfully' });
    } catch (error) {
        console.error('Error destroying database:', error);
        return res.status(500).json({ error: 'Error destroying database' });
    }
}



module.exports = {
    testTwilio: testTwilio,

    gptLeads: gptLeads,
    deleteLeads: deleteLeads,
    fetchLeads: fetchLeads,
    saveLeads: saveLeads
}




async function extractGPT(lead) {
    try {

        console.log('`empresite.eleconomista: ${lead.name}, ${lead.address}`', `empresite eleconomista - ${lead.name}, ${lead.location}`)
        const resp = await googleSearch({
            query: `empresite.eleconomista: ${lead.name}, ${lead.category}, ${lead.phone}, ${lead.address}`
        })
        console.log('·····', resp)

        if(resp.length == 0) {
            return 404
        }



        const enterprise = {
            diexco: 'https://empresite.eleconomista.es/DISTRIBUCIONES-EXCLUSIVAS-COLL.html',
            // qdq: 'https://empresite.eleconomista.es/QDQ-QUIA.html',
            // qdq1: 'https://empresite.eleconomista.es/QDQ-MEDIA.html',
            // titus: 'https://empresite.eleconomista.es/TITUS.html',
        }

        const validLink = resp.find(result => 
            result.link && 
            result.link.includes('empresite.eleconomista.es/') && 
            result.link.endsWith('.html')
        );

        console.log('validLink', validLink)
        let info = {
            empresite: {
                url: validLink.link,
                data: {
                    cta: {
                        value: '#seeMoreContext',
                        response: 'text'
                    }
                }
            },
            // infoempresa: {
            //     url: 'https://www.infoempresa.com/es-es/es/empresa/distribuciones-exclusivas-coll-sl',
            //     data: {
            //         agents: {
            //             value: '#tab-directors > div > div:nth-child(3) > div.col.s12.m9 > ul',
            //             response: 'text'
            //         }
            //     }
            // }

        }
        const arr = {}

        // const keys = Object.keys(enterprise)

        // for (let j = 0; j < keys.length; j++) {
            // const key = keys[j]
            // info.empresite.url = enterprise[key]

            const data = await scrapeInfo(info);
            console.log('DATA:', data);
            

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

            // info.infoempresa.gpt = await readGPT(data.infoempresa, {
            //     agents: 'Array de objetos con .name: nombre de la persona, date: fecha del nombramiento',
            // })


            // arr[key] = {
            //     ...info.empresite.gpt,
            //     // ...info.infoempresa.gpt
            // }

        // }



        // const gpt = await readGPT(data.cta)
        console.log('DATA-GPT:', info.empresite.gpt);

        // console.log('eee', JSON.stringify(arr.diexco.agents))
        // console.log('DATA-GPT:', info.infoempresa.gpt);
        return info.empresite.gpt
        // return res.status(200).send(arr)
    } catch (error) {
        console.error('Error en la ejecución:', error);
    }
}




const googleSearch = async ({ query }) => {
    try {
        const encodedQuery = encodeURIComponent(query);
        const url = `https://html.duckduckgo.com/html/?q=${encodedQuery}`;

        // console.log('url: ', url)

        const response = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        });

        const $ = cheerio.load(response.data);
        const results = [];

        await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
            

        $('.result').each((i, element) => {
            const link = $(element).find('.result__url').attr('href');
            const title = $(element).find('.result__title').text().trim();
            
            if (title && link && link.includes('https://empresite.eleconomista.es')) {

                results.push({
                    title,
                    link: decodeURIComponent(link)
                });
            }
        });


        return results;
    } catch (error) {
        console.error('Error performing Google search:', error);
        return res.status(500).json({ error: 'Error performing Google search' });
    }
};




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
    const twilioPhoneNumber = '+34900759890'; // Número de Twilio
    const toPhoneNumber = '+34667283537'; // Número al que quieres llamar
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



const fetchLeads = async (req, res) => {
    try {
        const { query, category } = req.query;
        const db = await connectDB('db_leads');

        console.log('··')
        let selector = {};

        // Build selector for search query
        if (query) {
            selector.$or = [
                { phone: { $regex: `(?i).*${query}.*` } },
                { web: { $regex: `(?i).*${query}.*` } },
                { location: { $regex: `(?i).*${query}.*` } },
                { keyword: { $regex: `(?i).*${query}.*` } },
                { address: { $regex: `(?i).*${query}.*` } },
                { state: { $regex: `(?i).*${query}.*` } },
                { city: { $regex: `(?i).*${query}.*` } }
            ];
        }

        // Add category filter if provided
        if (category) {
            selector.category = { $regex: `(?i)^${category}$` };
        }

        // Perform the query
        const leads = await db.find({
            selector: selector
        });

        console.log('··', leads)

        return res.status(200).json(leads);
    } catch (error) {
        console.error('Error fetching leads:', error);
        return res.status(500).json({ error: 'Error fetching leads' });
    }
}

const saveLeads = async (req, res) => {
    console.log('!!!!!')
    const { leads } = req.body

    const db = await connectDB(`db_leads`)

    console.log('db', leads)
    for (const lead of leads) {
        await db.insert(lead);
    }

}



module.exports = {
    testReseller: testReseller,
    mainReseller: mainReseller,
    testTwilio: testTwilio,

    fetchLeads: fetchLeads,
    saveLeads: saveLeads
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