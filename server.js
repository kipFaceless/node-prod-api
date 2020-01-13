const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const requireDir = require('require-dir');

const path= require('path');



//Iniciando o App
const app = express();
app.use(express.json());
app.use(cors());


const port = 3000;
const host = 'localhost';


app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, 'public')));



app.listen(port, host, () => {
	console.log(`Server started at ${host} port ${port}`);
});



//Iniciando o DB
//mongoose.connect('mongodb://localhost:27017/nodeapi', {useNewUrlParser: true});
//mongodb+srv://<username>:<password>@cluster0-cfvkm.azure.mongodb.net/test?retryWrites=true&w=majority


mongoose.Promise=global.Promise;
const dbUrl ='mongodb+srv://kipface:lKRh9MZs2WYQC84d@cluster0-cfvkm.azure.mongodb.net/restapi?retryWrites=true&w=majority'
mongoose.connect(dbUrl, {useCreateIndex:true, useNewUrlParser: true})
.then(mongoose => console.log('Conectado'))
.catch(err => console.log(err));


requireDir("./src/models/");

app.use("/api", require("./src/routes"));

//Rotas
