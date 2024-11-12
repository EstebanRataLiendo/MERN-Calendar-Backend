const path = require('path')

const express = require('express');
const cors = require('cors')
require('dotenv').config();
const { dbConnection } = require('./database/config');

//creamos servidor de express
const app = express()

//base de datos
dbConnection();

//CORS
app.use(cors())

//directorio público
app.use( express.static('public') )

//lectura y parseo del body
app.use( express.json());

//rutas
app.use( '/api/auth', require('./routes/auth') )
app.use( '/api/events', require('./routes/events') )

app.use('*', (req, res)=> {
    res.sendFile(path.join(__dirname, 'public/index.html'))
});

//excuchar peticiones
app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en ${ process.env.PORT }`)
})