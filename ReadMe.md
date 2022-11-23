### After cloning the file 
cd backend and cd frontend in each
- npm init 
- npm install
To install all the dependencies
### create a env file with database address and port no.

DB=<mongodb address>

PORT=<eg : 3000>

## Terminal cd backend/ cd frontend

To run backend -----------
        npm start

To run front ------
        node node_modules/live-server/live-server --port=8081


## Stuck at fullstack activity:

### issue

tried posting with the help of post man 
{
    'name': 'stone',
    'description' : 'test product',
    'price' : 25,
    'inStock' : 'true'
}

gives error status 500 and TypeError: Cannot read properties of undefined (reading &#39;name&#39;)<br> &nbsp; &nbsp;at app.js:39:22

### Helpful sites 

https://openclassrooms.com/forum/sujet/passez-au-full-stack-avec-node-js-express-et


Reference: go fullstack project


### using mongodb compass on local host for now
username yangchen
mongodb: QtgW1D22MVuFOmQV