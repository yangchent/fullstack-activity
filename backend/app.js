const express = require('express');
const bodyParser = require('body-parser');
const mongoose= require("mongoose");

const Product = require('./models/product')
const app = express();

const dotenv = require("dotenv");

dotenv.config({
  path: "./config.env",
});

app.use(express.json());

mongoose
  .connect(process.env.DB, {useUnifiedTopology: true, useNewUrlParser: true})
  .then(() => {
    console.log('Successfully connected to MongoDB Atlas!');
  })
  .catch((error) => {
    console.log('Unable to connect to MongoDB Atlas!');
    console.error(error);
  });


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use(bodyParser.json());

app.post('/api/products', (req, res, next) => {
  const product = new Product({
    ...req.body
  });
  product.save()
    .then(() => res.status(201).json({ product }))
    .catch(error => res.status(400).json({ error }));
});

//   GET /api/products
app.get('/api/products', (req, res, next) => {
    Product.find()
    .then(products => res.status(200).json({ products }))
    .catch(error => res.status(400).json({ error }))
});

// GET: /api/products/:id

app.get('/api/products/:id', (req, res, next) => {//res, req sequences got wrong
    Product.findOne({ _id: req.params.id })
    .then(product => res.status(200).json({ product })) //mistyped statusCode
    .catch(error => res.status(400).json({ error })
    )
});

//PUT: /api/products/:id
app.put('/api/products/:id', (req, res, next) =>{
    const product = new Product({
        _id: req.params.id,
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        inStock: req.body.inStock
    });
    Product.updateOne({_id: req.params.id}, product)
    .then(()=> res.status(201).json({message: 'modified!'}))
    .catch(error => res.status(400).json({ error }));
});

//DELETE: /api/products/:id
app.delete('/api/products/:id', (req, res, next) => {
    Product.deleteOne({_id: req.params.id})
    .then(()=> res.status(200).json({ message: 'Deleted'}))
    .catch(error => res.status(404).json({ error }));
});

module.exports = app;