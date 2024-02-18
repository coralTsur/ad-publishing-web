const db = require("../models");
const Sequelize = require('sequelize');
db.sequelize.sync({ force: true }).then(() => {
    console.log('Database Synced');
    return db.User.build([
        { userName: 'admin', password: 'admin' },
        { userName: 'admin2', password: 'admin2' }
    ]);
}).then(() => {
    console.log('Data Seeded Successfully');
}).catch((err) => {
    console.log('Error syncing database');
    console.log(err);
});