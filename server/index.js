import express from 'express'
import mongoose from 'mongoose'
import bd from 'body-parser'
import cors from 'cors'
import userRouter from './routes/users'
//const {APP_DB, PORT} = require('./config/index')

import {createServer} from 'http'


const PORT = 3000

//const { send } = require('process');
const app = express();

app.use(bd.json());
app.use(cors());
app.use(userRouter);

mongoose.connect('mongodb+srv://admin:admin@cluster0-trptm.mongodb.net/coursework?retryWrites=true&w=majority', {
    useNewUrlParser: true,
   useUnifiedTopology: true
})
.then(() => console.log('Mongo connect'))
.catch((err) => console.log(err))

/*if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'))
}*/


const server = createServer(app);
server.listen(PORT, () => console.log(`server is up port ${PORT}`));
