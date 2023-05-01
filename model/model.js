var {connection}=require('../config/connection');
var {generate}=require('shortid');

module.exports.Db=class Db{
    /* insert to database */
    static uploadMusic(admin,musicName,singerName,date,musicID,musicCover,musicText){
        var sql=`insert into music(admin,musicName,singerName,date,musicID,musicCover,musicText) values 
        ("${admin}","${musicName}","${singerName}","${date}","${musicID}","${musicCover}","${musicText}")`;

        connection.query(sql,(err,result)=>{
            if(err) throw err;
        })
    }
    
    /* query from database */
    static login(res,username,password){
        var sql=`select*from admin where username="${username}" 
        and password="${password}"`;

        connection.query(sql,(err,result)=>{
            if(result.length){
                res.send('1');
            }else{
                res.send('0');
            }
        })
    }
    static posts(res,username){
        var sql=`select musicName,singerName,date,musicID,musicCover from 
        music where admin="${username}"`;

        connection.query(sql,(err,result)=>{
            if(err) throw err;
            res.json(result);
        })
    }
    static searchFront(res,searchText){
        var sql=`select musicName,singerName,musicID from music where match (singerName,musicName,date,musicText) against ("${searchText}") limit 5`;

        connection.query(sql,(err,result)=>{
            if(err) throw err;
            res.json(result)
        })
    }
    static musicInformation(res,musicID){
        var sql=`select musicName,singerName,date,musicID,musicCover from music 
        where musicID="${musicID}"`;

        connection.query(sql,(err,result)=>{
            if(err) throw err;
            res.json(result[0]);
        })
    }
    static randomMusic(res){
        var sql=`select musicName,singerName,date,musicID,musicCover 
        from music order by rand() limit 6`;

        connection.query(sql,(err,result)=>{
            if(err) throw err;
            res.json(result);
        })
    }
    /* update database */
    static updateMusicCover(musicID,musicCover){
        var sql=`update music set musicCover="${musicCover}" where 
        musicID="${musicID}"`;

        connection.query(sql,(err,result)=>{
            if(err) throw err;
        })
    }

    static updateSingerName(res,musicID,singerName){
        var sql=`update music set singerName="${singerName}" where 
        musicID="${musicID}"`;

        connection.query(sql,(err,result)=>{
            if(err) throw err;
            res.json(singerName);
        })
    }

    static updateMusicName(res,musicID,musicName){
        var sql=`update music set musicName="${musicName}" where 
        musicID="${musicID}"`;

        connection.query(sql,(err,result)=>{
            if(err) throw err;
            res.json(musicName);
        })
    }

    static updateDate(res,musicID,date){
        var sql=`update music set date="${date}" where 
        musicID="${musicID}"`;

        connection.query(sql,(err,result)=>{
            if(err) throw err;
            res.json(date);
        })
    }

    /* delete from database */
    static deleteMusic(fs,res,musicID){
        var sql=`select musicCover from music where musicID="${musicID}"`;

        connection.query(sql,(err,result)=>{
            fs.unlink(`./uploads/${result[0].musicCover}`,err=>{
                if(err) throw err;
                fs.unlink(`./uploads/${musicID}`,err=>{
                    if(err) throw err;

                    var sql=`delete from music where musicID="${musicID}"`;

                    connection.query(sql,(err,result)=>{
                        if(err) throw err;
                        res.send("1");
                    })
                })
            })
        })
    }
}