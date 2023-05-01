var fs=require('fs');

var {Router}=require('express');
var {Db}=require('../model/model');
var {generate}=require('shortid');
const { encoding } = require('../config/security');

var app=new Router();

app.post('/login',(req,res)=>{
    Db.posts(
        res,
        req.signedCookies.username
    )
})

app.post('/register',(req,res)=>{
    var body=req.body;

    res.cookie('username',body.username,
        {
            maxAge:1000*60*60*24*7,
            httpOnly:true,
            signed:true
        }
    )

    Db.login(
        res,
        body.username,
        body.password
    )
})

app.post('/music',(req,res)=>{
    /* files */
    var imgFile=req.files.musicPictureFile;
    var musicFile=req.files.musicFile;

    /* create uniq name for music */
    var musicID=`${generate()}.mp3`;

    /* body information */
    var admin=req.signedCookies.username;
    var musicName=req.body.musicName;
    var singerName=req.body.singerName;
    var date=req.body.date;
    var musicText=req.body.musicText;
    
    /* create uniq name for image */
    var imgFileTemp=imgFile.name.split('.').reverse()[0];
    var musicCover=`${generate()}.${imgFileTemp}`;
  
    /* uploading file */
    imgFile.mv(`./uploads/${musicCover}`,(err)=>{
        if(err){
            throw err;
        }else{
            musicFile.mv(`./uploads/${musicID}`,async(err)=>{
                if(err){
                    throw err;
                }else{
                    await Db.uploadMusic(
                        admin,
                        musicName,
                        singerName,
                        date,
                        musicID,
                        musicCover,
                        musicText
                    );
                    var obj=new Object();
                    obj.musicName=musicName;
                    obj.singerName=singerName;
                    obj.musicID=musicID;
                    obj.musicCover=musicCover;
                    obj.date=date;

                    res.json(obj);
                }
            })
        }
    })
})

app.post('/changePicture',(req,res)=>{
    var imgFile=req.files.imgFile;
    var beforeIMG=req.body.beforeIMG;
    var musicID=req.body.musicID;

    var imgTemp=imgFile.name.split('.').reverse()[0];
    var musicCover=`${generate()}.${imgTemp}`;

    fs.unlink(`./uploads/${beforeIMG}`,err=>{
        if(err) throw err;
        imgFile.mv(`./uploads/${musicCover}`,err=>{
            if(err) throw err;

            Db.updateMusicCover(
                musicID,
                musicCover
            )

            res.json(musicCover);
        })
    })
})

app.post('/changeSingerName',async(req,res)=>{
    var singerName=req.body.singerName;
    var musicID=req.body.musicID;

    Db.updateSingerName(
        res,
        musicID,
        singerName
    )
})

app.post('/changeMusicName',async(req,res)=>{
    var musicName=req.body.musicName;
    var musicID=req.body.musicID;

    Db.updateMusicName(
        res,
        musicID,
        musicName
    )
})

app.post('/changeDate',async(req,res)=>{
    var date=req.body.date;
    var musicID=req.body.musicID;

    Db.updateDate(
        res,
        musicID,
        date
    )
})

app.post('/deleteMusic',(req,res)=>{
    var musicID=req.body.musicID;
    
    Db.deleteMusic(
        fs,
        res,
        musicID
    )
})

app.post('/searchMusic',(req,res)=>{
    var searchText=req.body.searchText;

    Db.searchFront(
        res,
        searchText
    )
})

app.post('/musicInformation',(req,res)=>{
    var musicID=req.body.musicID;

    Db.musicInformation(
        res,
        musicID
    )
})

app.post('/rendMusic',(req,res)=>{
    Db.randomMusic(res);
})

module.exports.app=app;
