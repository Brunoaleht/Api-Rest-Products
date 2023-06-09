const express = require('express')
const cors = require('cors')

const app = express()

//Config Json Response
app.use(express.json())

//Solve Cors
app.use(cors({credentials: true, origin: 'http://localhost:3000'}))

//Public folder for images
app.use(express.static('public'))

//Routes
const ProductRouter = require('./routes/ProductRouter')
app.use('/products', ProductRouter)

//Listen port
app.listen(5000)