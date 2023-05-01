var mysql=require('mysql');

var connection=mysql.createConnection({
    host:       'localhost',
    user:       'root',
    database:   'musicLand',
    password:   '9601371893Jm'
})

connection.connect(err=>{
    if(err) throw err;
})

module.exports.connection=connection;