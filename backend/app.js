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

// POST: /api/products
app.post('/api/products', (res, req , next) => {
    const product= new Product({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      inStock: req.body.inStock
    })
    product.save().then(
      () => {
        res.status(201).json({ product ,
       message : 'Product saved successfully'
      })
    }
    ).catch(
      (error) => {
        res.status(400).json({ 
          error: error });
        }
    );
})

// //   GET /api/products
// app.get('/api/products', (res, req, next) => {
//     Product.find().then(
//         (products) => {
//             res.statusCode(200).json(products);
//         }
//     ).catch(
//         (error) => {
//             res.status(400).json({
//               error: error
//             });
//           }
//     )
// });

// // GET: /api/products/:id

// app.get('/api/products/:id', (res, req, next) => {
//     Product.findOne({_id: req.params.id}).then(
//         (product) => {
//             res.statusCode(200).json(product);
//         }
//     ).catch(
//         (error) => {
//             res.status(400).json({
//                 error: error
//             })
//         }
//     )
// })

// //PUT: /api/products/:id
// app.put('/api/products/:id', (res, req, next) =>{
//     const product = new Product({
//         _id: req.params.id,
//         name: req.body.name,
//         description: req.body.description,
//         price: req.body.price,
//         inStock: req.body.inStock
//     });
//     Product.updateOne({_id: req.params.id}, product).then(
//         ()=> {
//             res.status(201).json({
//                 message: 'modified!'
//             });
//         }
//     ).catch(
//         (error) => {
//             res.status(400).json({
//                 error: error
//             });
//         }
//     )
// })

// //DELETE: /api/products/:id
// app.delete('/api/products/:id', (res, req, next) => {
//     Product.deleteOne({_id: req.params.id}).then(
//         ()=> {
//             res.status(200).json({
//                 message: 'Deleted'
//             });
//         }
//     ).catch(
//         (error) => {
//             res.status(404).json({
//                  error:error
//             });
//         }
//     )
// });

module.exports = app;