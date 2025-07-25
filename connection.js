const {createPool}=require('mysql');

const pool = createPool({
    host:"localhost",
    user:"root",
    password: "Aditya707",
    database: "estate",
    connectionLimit: 20
})

pool.query(`select * from property`,(err,result,fields)=>{
    if (err) {
        return console.log(err);
    }
    return console.log(result);
})

module.exports = pool;