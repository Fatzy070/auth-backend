const mongoose = require('mongoose')


const ConnectDB = async()=> {
    try {
            const db = await mongoose.connect('mongodb://localhost:27017/demo')
            console.log('Connected successfully')
    }catch(error){
        console.error('failed to connect')
        process.exit(1)
    }
}

module.exports = ConnectDB