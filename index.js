import express from 'express'
import Product from './models/product.js'

const app = express()
const hostname = '127.0.0.1'
const port = 3001

app.use(express.json())
app.use(express.urlencoded())
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    Product.findAll()
        .then((products) => {
            res.render('index', { products })
        })
        .catch((err) => {
            console.log(err)
            res.status(500).send('Internal Server Error')
        })
})

app.get('/create', (req, res) => {
    res.render('create')
})

app.post('/api/product', (req, res) => {
    Product.create({
        name: req.body.name,
        price: req.body.price
    })
        .then((result) => {
            res.status(201).send({
                status: 201,
                error: null,
                response: result
            })
        })
        .catch((error) => {
            res.status(502).send({
                status: 502,
                error
            })
        })
})

app.listen(port, () => {
    console.log(`Server running at http://${hostname}:${port}`)
})