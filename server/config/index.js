require('dotenv').config()

exports.modules =  {
    APP_DB: process.env.APP_DB,
    APP_PORT: process.env.PORT,
    APP_SECRET: process.env.SECRET
}

