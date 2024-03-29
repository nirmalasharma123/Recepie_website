let express = require('express');
let app = express();
let route =  require ('./Router/router')
let mongoose = require('mongoose');
require('dotenv').config();


app.use(express.json());
let uri = process.env.mongo_dv

mongoose.connect(uri,{useNewUrlParser:true})
.then(() => console.log('MongoDB Connected'))
.catch((err)=>console.log(err));

app.use('/',route)
app.listen(process.env.port,()=> console.log(`App is live on port  ${process.env.port} `))