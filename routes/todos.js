//Required Packages
const express = require('express')
const path = require('path')

//Require Models and its related functions
const { Todos, todoValidation } = require('../models/todos')

//Require Middleware
const router = express.Router()

//All API's
router.route('/')
    .get(async(req,res)=>{
        const todos=await Todos.findAll();
        res.render('index',{todos:todos});
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
        res.redirect('/todos');
    });


router.get('/:id', async (req, res) => {
    const todo = await Todos.findByPk(req.params.id);
    if (isNaN(parseInt(req.params.id))) {
        return res.status(400).send({error: 'todo id must be an integer'});
    }

    if (!todo) {
        return res.status(404).send({error:'No todo found with id = ' + req.params.id})
    }
    res.render('taskEdit', { todo });
})


module.exports = router