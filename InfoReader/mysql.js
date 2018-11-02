const mysql = require('mysql');
const settings = require('./settings');

const connection = mysql.createConnection({
    host: settings.mysql.host,
    user: settings.mysql.user,
    password: settings.mysql.password,
    database: settings.mysql.database
});

exports.getProducts = (callback) => {
    connection.query("SELECT `products`.name, `products`.image, `product_menu`.* FROM `products` INNER JOIN `product_menu` WHERE `products`.id = `product_menu`.id_menu;", (err, result) => {
        if (err) return connection.rollback(() => { callback(Callback(result, err)); });            
        else {
            toReturn = [];
            result.forEach(element => {
                let found = toReturn.find((found) => { return found.name == element.name });
                
                if (found == null) {
                    found = {
                        "name": result.name,
                        "image": result.image,
                        "menu": [ result.text ]
                    }

                    toReturn.push(found);
                } else {
                    found.menu.push(result.text);
                }                
            });
            callback(Callback(toReturn));
        }
    });
}

function Callback(result, err) {
    if (err) {
        message.errorInternal(message);
        console.log(err);
        return null;
    } else {
        return result;
    }    
}