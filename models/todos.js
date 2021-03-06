const sequelize = require('sequelize');

const db = new sequelize({
    dialect: 'sqlite',
    storage: __dirname+'/todos.db'
})

const Todos = db.define('todo',{
    id: {
        type : sequelize.INTEGER,
        primaryKey: true,
        autoIncrement : true
    },
    title : {
        type: sequelize.STRING(100),
        allowNull : false
    },
    description : {
        type : sequelize.STRING(400),
    },
    due : {
        type : sequelize.DATE,
        allowNull : false,
    },
    status: {
        type: sequelize.STRING(),
        defaultValue : 'Incomplete'

    },
    priority: {
        type : sequelize.STRING(100),
        defaultValue : 'Medium',
        allowNull : false
    }
})

const Notes = db.define('note',{
    id: {
        type : sequelize.INTEGER,
        primaryKey: true,
        autoIncrement : true
    },
    taskId : {
        type: sequelize.INTEGER,
        allowNull : false
    },
    description : {
        type : sequelize.STRING(400),
    }
})

exports.db=db;
exports.Todos=Todos;
exports.Notes=Notes;
