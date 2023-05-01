const path=require('path');

const express=require('express');
const bodyParser=require('body-parser');
const upload=require('express-fileupload');
const dotenv=require('dotenv');
const cookieParser=require('cookie-parser');

dotenv.config({path:'./config/config.env'});

const app=express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(upload());
app.use(cookieParser("secret"));

app.use(express.static(path.join(__dirname,"public")));
app.use(express.static(path.join(__dirname,'uploads')));

app.set('view engine','ejs');

/* set middleware */
app.use(require('./config/middleware').app)
/* end of set */


/* set controller */
app.use(require('./controller/controller').app);
/* end of set */

app.get('/',(req,res)=>{
    res.render('home',{})
})

app.get('/backend',(req,res)=>{
    res.render('backend',{})
})

app.get('/register',(req,res)=>{
    res.render('register',{})
})

app.listen(process.env.PORT,()=>{
    console.log(`the app is listen to port ${process.env.PORT}`)
})