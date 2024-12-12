const mysql = require('mysql')


// You need to open your XAmpp to use the database using the configuration 


const dbConfig = {
    connectionLimit: 10, 
    host: 'localhost',       // 127.0.0.1 use this if the connection is using mysql in remote linux ubuntu server
    user: 'root',            // username of your linux server
    password: '',            // password of your linux server
    database: 'user'        
};

const pool = mysql.createPool(dbConfig);


function executeQuery(sql, values = []) {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                reject(err);
                return;
            }
            connection.query(sql, values, (error, results) => {
                connection.release(); 
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
    });        
}



function insertQuery(sql, values = []) {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                reject(err);
                return;
            }
            connection.query(sql, values, (error, results) => {
                connection.release(); 
                if (error) {
                    reject(error);
                } else {
                    resolve({ id: results.insertId });
                }
            });
        });
    });
}

module.exports = {
    executeQuery,
    insertQuery
};