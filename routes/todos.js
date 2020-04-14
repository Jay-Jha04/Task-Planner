//Required Packages
const express = require('express')
const path = require('path')

//Require Models and its related functions
const { Todos, todoValidation } = require('../models/todos')

//Require Middleware
const router = express.Router()

//All API's
router.get('/', async(req,res)=>{
    const todos=await Todos.findAll();
    res.render('index',{todos:todos})
});

router.route('/todos')
    .get((req,res)=>{
       res.render('todosRegister')
    })
    .post(async(req,res)=>{
        const {error}=todoValidation(req.body);
        if(error) return res.status(400).send(error.details[0].message);
        let todo= new Todos({
            title: req.body.title,
            description: req.body.description,
            due : req.body.due,
            status : req.body.status,
            priority: req.body.priority
        });
        await todo.save();
    });

    module.exports = router