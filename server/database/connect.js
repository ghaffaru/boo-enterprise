const mongoose = require('mongoose');
const MongoMemoryServer = require('mongodb-memory-server').MongoMemoryServer;

let connectToDb = async () => {

    const mongod = await MongoMemoryServer.create();

    let dbUrl = process.env.DB_URL || mongod.getUri();

    try {
        await mongoose.connect(dbUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log('Db connected')
    } catch (e) {
        console.log(e.message);
    }
}

connectToDb();

mongoose.Promise = global.Promise;