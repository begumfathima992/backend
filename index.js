const bodyParser = require('body-parser');
const express = require('express');
const routes = require('./routes/index')
const mongoose = require('mongoose');
const db = require('./config/index').mongoURI;

const app = express();

app.use(bodyParser.json());

mongoose.connect(db,{useNewUrlParser:true, useUnifiedTopology:true})
.then(() => console.log('connected !'))
.catch(err => console.log(err.toString()))

const PORT = process.env.PORT || 8000;

app.get('/', routes.index)
app.get('/users', routes.users);
app.post('/register', routes.regsiter);
app.post('/user',routes.user);
app.post('/delete',routes.delete);
app.post('/update', routes.update)

app.listen(PORT, ()=> console.log(`Listening at port ${PORT}`))