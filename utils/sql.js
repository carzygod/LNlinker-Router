
var mysql      = require('mysql');
const { exit } = require('process');

require('dotenv').config()
const pool = mysql.createPool({
    host     : process.env.SQLHOST ,
    user     : process.env.SQLUNAME ,
    password : process.env.SQLPWD ,
    database : process.env.SQLDBNAME ,

    
    connectionLimit: 1000,
    connectTimeout: 60 * 60 * 1000,
    acquireTimeout: 60 * 60 * 1000,
    timeout: 60 * 60 * 1000,
})
var num = 0 ;
let query = function( sql, values ) {
    return new Promise(( resolve, reject ) => {
      pool.getConnection(function(err, connection) {
        if (err) {
          reject( err )
        } else {
          connection.query(sql, values, ( err, rows) => {
  
            if ( err ) {
              reject( err )
            } else {
              resolve( rows )
            }
            connection.release()
          })
        }
      })
    })
  }

 async function getRecord(uname){
  const results = await query('SELECT * FROM ln WHERE `uname` = "'+uname+'";')
  return results;
}
 async function newRecord(data){
  var  insertSql = 'INSERT INTO ln (`timestamp`,`uname`,`link`,`rawData`) VALUES("'+Date.now()+'","'+data.uanme+'","'+data.link+'","'+data.raw+'")';
  var results= await query(insertSql)
  return results;
  }

  async function getNip05(uname){
    const results = await query('SELECT * FROM nip05 WHERE `uname` = "'+uname+'";')
    return results;
  }
   async function newNip05(data){
    var  insertSql = 'INSERT INTO nip05 (`timestamp`,`uname`,`link`,`rawData`) VALUES("'+Date.now()+'","'+data.uanme+'","'+data.link+'","'+data.raw+'")';
    var results= await query(insertSql)
    return results;
    }

module.exports = {
    newRecord,
    getRecord,
    getNip05,
    newNip05
}

