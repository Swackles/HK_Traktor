const mysql = require('mysql');
const settings = require('./settings');

const connection = mysql.createConnection({
    host: settings.mysql.host,
    user: settings.mysql.user,
    password: settings.mysql.password,
    database: settings.mysql.database
});

exports.confirmUser = (data, callback) => {
    connection.query(`SELECT * FROM user WHERE user.username = ? AND user.password = ?;`, [data.username, data.password], (err, result) => {
        if (err) return connection.rollback(() => { callback(Callback(result, err)); });            
        else {
            callback(Callback(result));
        }
    });
}

function Callback(result, err) {
    if (err) {
        console.log(err);
        return null;
    } else {
        return result;
    }    
}