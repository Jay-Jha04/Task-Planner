const express = require('express')
const ejs = require('ejs')
 const { db } = require('./models/todos')


const app = express()
const todoRoute = require('./routes/todos')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.set("view engine","ejs");
app.use(express.static("public"));

app.use('/',todoRoute)

db.sync().then(() => {
    app.listen(3000)
}).catch((err) => {
    console.error(err)
})
