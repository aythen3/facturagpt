const VERSION = 1
const http = require('http')
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

const api = require(`./routers/index`)

const app = express()
const server = http.createServer(app)

const fs = require('fs')
const https = require('https')

const { createSecureServer } = require('http2')






require('dotenv').config()

app.use(cors())
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, OPTIONS, PUT, PATCH, DELETE'
    )
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    )
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    res.setHeader('Access-Control-Allow-Credentials', 'true')

    if (req.method === 'OPTIONS') {
        return res.status(200).end()
    }
    next()
})


app.use(cookieParser())
app.use(bodyParser.urlencoded({ limit: '500mb', extended: true }))
app.use(bodyParser.json({ limit: '500mb' }))
app.use(bodyParser.raw({ type: 'application/octet-stream', limit: '500mb' }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use((req, res, next) => {
    res.setHeader('X-Frame-Options', 'DENY') // O 'SAMEORIGIN' si quieres permitirlo desde el mismo dominio
    next()
})


app.use('/api', api)




const PORT = 3006
server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
})
