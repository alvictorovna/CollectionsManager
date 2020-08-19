const express = require('express');
const mongoose = require('mongoose');

const {createServer} = require('http');
const { send } = require('process');
const app = express();
const port = 3000;

mongoose.connect('mongodb+srv://admin:admin@cluster0-trptm.mongodb.net/coursework?retryWrites=true&w=majority', {
    useNewUrlParser: true
})//выносится в отдельный файл
.then(() => console.log('Mongo connect'))
.catch((err) => console.log(err))

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    }
})

const Users = mongoose.model('Users', UserSchema)

app.get('/', (req, res) => {
    /*Users.create({
        name: 'Alesia',
        email: 'liz@qq.ro'
    })*/
    Users.find()
    .then(user => res.send(user))
    .catch(err => res.send(err))
})

const server = createServer(app);
server.listen(port, () => console.log(`server is up port ${port}`));
