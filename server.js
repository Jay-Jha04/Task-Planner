const express = require('express');
const ejs = require('ejs');
const methodOverride = require('method-override');
 
const { db } = require('./models/todos');
const todoRoute = require('./routes/todos');

const app = express();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(methodOverride('_method'));

app.use('/todos',todoRoute);

db.sync().then(() => {
    app.listen(5000)
}).catch((err) => {
    console.error(err)
})
