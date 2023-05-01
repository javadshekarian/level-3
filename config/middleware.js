var {Router}=require('express');
var {connection}=require('../config/connection');

var app=new Router();

app.use('/backend',(req,res,next)=>{
    if(req.signedCookies.username!==undefined){
        var sql=`select username from admin where username="${req.signedCookies.username}"`;
        
        connection.query(sql,(err,result)=>{
            if(result.length){
                next();
            }else{
                res.redirect('/register')
            }
        })
    }else{
        res.redirect('/register')
    }
})

module.exports.app=app;