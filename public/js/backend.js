var i=0;

window.onload=()=>{
    var http=new XMLHttpRequest();
    http.onloadend=e=>{
        var res=JSON.parse(e.target.responseText);
        
        createMusicBoxFunction(res);
        menuContent.classList.remove('dsn');
        settingContent.classList.remove('dsn');
    }
    http.open('post','/login');
    http.send();
}

var littleInf=document.querySelectorAll('.littleInf');

littleInf[0].addEventListener('click',()=>{
    littleInf[0].innerHTML='';
})

var uploadMenu=document.getElementById('uploadMenu');
var settingMenu=document.getElementById('settingMenu');

var uploadMusicBox=document.getElementById('uploadMusicBox');
var settingContent=document.getElementById('settingContent');
var menuContent=document.getElementById('menuContent');

uploadMenu.addEventListener('click',()=>{
    uploadMusicBox.classList.remove('dsn');
    settingContent.classList.add('dsn');
})

settingMenu.addEventListener('click',()=>{
    uploadMusicBox.classList.add('dsn');
    settingContent.classList.remove('dsn');
})

createIndex=async(index,i)=>{
    var form=await document.createElement('form');
    await form.classList.add('mt20');

    var audio=await document.createElement('audio');
    audio.src=index.musicID;

    var musicBox=await document.createElement('div');
    await musicBox.classList.add('musicBox');
    await musicBox.classList.add('frs');
    await musicBox.classList.add('aic');

    var pic=await document.createElement('input');
    await pic.classList.add('dsn');
    pic.type='file';
    pic.id=`pic${i}`;

    var singerPicture=await document.createElement('label');
    await singerPicture.classList.add('cp');
    await singerPicture.classList.add('singerPicture');
    await singerPicture.classList.add('frc');
    await singerPicture.classList.add('aic');
    singerPicture.htmlFor=`pic${i}`;

    pic.addEventListener('change',()=>{
        var file=pic.files[0];

        var imgSrc=URL.createObjectURL(file);
        singerPicture.style.backgroundImage=`url(${imgSrc})`;

        var formdata=new FormData();
        formdata.append('imgFile',file);
        formdata.append('beforeIMG',index.musicCover);
        formdata.append('musicID',index.musicID);

        var http=new XMLHttpRequest();
        http.onloadend=e=>{
            index.musicCover=JSON.parse(e.target.responseText);
        }
        http.open('post','/changePicture');
        http.send(formdata);
    })

    var plus=await document.createElement('i');
    await plus.classList.add('fa');
    await plus.classList.add('fa-plus');
    await plus.classList.add('cblue');

    await singerPicture.appendChild(plus);
    singerPicture.style.backgroundImage=`url(${index.musicCover})`;

    var fcs=await document.createElement('div');
    await fcs.classList.add('fcs');

    var singerName=await document.createElement('input');
    await singerName.classList.add('singerName');
    await singerName.classList.add('cp');
    await singerName.classList.add('fft');
    await singerName.classList.add('mt5');
    await singerName.classList.add('littleInf');
    singerName.placeholder=index.singerName;
    singerName.spellcheck=false;

    singerName.addEventListener('blur',()=>{
        if(singerName.value!==""){
            var formdata=new FormData();
            formdata.append('singerName',singerName.value);
            formdata.append('musicID',index.musicID);

            var http=new XMLHttpRequest();
            http.onloadend=e=>{
                index.singerName=JSON.parse(e.target.responseText);
                singerName.placeholder=JSON.parse(e.target.responseText);
            }
            http.open('post','/changeSingerName');
            http.send(formdata);
        }
    })

    var musicName=await document.createElement('input');
    await musicName.classList.add('musicName');
    await musicName.classList.add('cp');
    await musicName.classList.add('fft');
    await musicName.classList.add('mt5');
    await musicName.classList.add('littleInf');
    musicName.placeholder=index.musicName;
    musicName.spellcheck=false;

    musicName.addEventListener('blur',()=>{
        if(musicName.value!==""){
            var formdata=new FormData();
            formdata.append('musicName',musicName.value);
            formdata.append('musicID',index.musicID);

            var http=new XMLHttpRequest();
            http.onloadend=e=>{
                index.musicName=JSON.parse(e.target.responseText);
                musicName.placeholder=JSON.parse(e.target.responseText);
            }
            http.open('post','/changeMusicName');
            http.send(formdata);
        }
    })

    var publicTime=await document.createElement('input');
    await publicTime.classList.add('publicTime');
    await publicTime.classList.add('cp');
    await publicTime.classList.add('fft');
    await publicTime.classList.add('mt5');
    await publicTime.classList.add('littleInf');
    publicTime.placeholder=index.date;
    publicTime.spellcheck=false;

    publicTime.addEventListener('blur',()=>{
        if(publicTime.value!==""){
            var formdata=new FormData();
            formdata.append('date',publicTime.value);
            formdata.append('musicID',index.musicID);

            var http=new XMLHttpRequest();
            http.onloadend=e=>{
                index.date=JSON.parse(e.target.responseText);
                publicTime.placeholder=JSON.parse(e.target.responseText);
            }
            http.open('post','/changeDate');
            http.send(formdata);
        }
    })

    var btnBoxBackend=await document.createElement('div');
    await btnBoxBackend.classList.add('btnBoxBackend');
    await btnBoxBackend.classList.add('fcs');
    await btnBoxBackend.classList.add('aic');

    var playBtn=await document.createElement('i');
    await playBtn.classList.add('fa');
    await playBtn.classList.add('fa-play');
    await playBtn.classList.add('cp');

    playBtn.addEventListener('click',()=>{
        if(playBtn.classList.contains('fa-play')){
            audio.play();
            playBtn.classList.remove('fa-play');
            playBtn.classList.add('fa-pause');
        }else{
            audio.pause();
            playBtn.classList.add('fa-play');
            playBtn.classList.remove('fa-pause');
        }
    })

    var trash=await document.createElement('i');
    await trash.classList.add('fa');
    await trash.classList.add('fa-trash');
    await trash.classList.add('cp');
    await trash.classList.add('fs20');

    trash.addEventListener('click',()=>{
        var formdata=new FormData();
        formdata.append('musicID',index.musicID);
        
        var http=new XMLHttpRequest();
        http.onloadend=e=>{
            if(JSON.parse(e.target.responseText)){
                form.remove();
            }
        }
        http.open('post','/deleteMusic');
        http.send(formdata)
    })

    await btnBoxBackend.appendChild(playBtn);
    await btnBoxBackend.appendChild(trash);

    await fcs.appendChild(singerName);
    await fcs.appendChild(musicName);
    await fcs.appendChild(publicTime);

    await musicBox.appendChild(pic);
    await musicBox.appendChild(singerPicture);
    await musicBox.appendChild(fcs);
    await musicBox.appendChild(btnBoxBackend);

    await form.appendChild(musicBox);
    await document.querySelector('.musicsBoxContent').appendChild(form);
}

createMusicBoxFunction=(array)=>{
    new Promise(async(resolve)=>{
        await createIndex(array[0],i);
        await array.shift();
        resolve(array);
        ++i
    }).then(arr=>{
        if(array.length){
            createMusicBoxFunction(arr);
        }
    })
}

/* upload music codes */
var uploads=document.getElementById('uplods');
var uploadMusic=document.getElementById('uploadMusic');
var uploadMusicPicture=document.getElementById('uploadMusicPicture');
var musicName=document.getElementById('musicName');
var singerName=document.getElementById('singerName');
var myAlert=document.querySelectorAll('.alert');
var musicText=document.querySelector('textarea');

uploadMusicPicture.addEventListener('change',()=>{
    if(uploadMusicPicture.files[0]===undefined){
        myAlert[1].innerHTML='you must select a file!';
        myAlert[1].classList.remove('dsn');
    }else{
        var pictureTempName=uploadMusicPicture.files[0].name.split('.').reverse()[0];
        if(!((pictureTempName==='jpg')||(pictureTempName==='jpeg')||(pictureTempName==='png'))){
            myAlert[1].innerHTML='just jpg,jpeg or png is valid!';
            myAlert[1].classList.remove('dsn');
        }else{
            myAlert[1].innerHTML='';
            myAlert[1].classList.add('dsn');

            var file=uploadMusicPicture.files[0];
            var imgSrc=URL.createObjectURL(file);
            document.querySelector('#uploadMusicPictureL').style.backgroundImage=`url(${imgSrc})`;
        }
    }
})

uploadMusic.addEventListener('change',()=>{
    if(uploadMusic.files[0]===undefined){
        myAlert[0].innerHTML='you must select a file!';
        myAlert[0].classList.remove('dsn');
        document.getElementById('uploadMusicL').style.backgroundImage="";
    }else{
        var musicTemp=uploadMusic.files[0].name.split('.').reverse()[0];
        if(musicTemp!=='mp3'){
            myAlert[0].innerHTML='just mp3 valid!';
            myAlert[0].classList.remove('dsn');
            document.getElementById('uploadMusicL').style.backgroundImage="";
        }else{
            myAlert[0].innerHTML='';
            myAlert[0].classList.add('dsn');

            document.getElementById('uploadMusicL').style.backgroundImage=`url(img/selectIMG.jpg)`;
        }
    }
})

uploads.addEventListener('submit',e=>{
    e.preventDefault();

    var formdata=new FormData();

    formdata.append('musicFile',uploadMusic.files[0]);
    formdata.append('musicPictureFile',uploadMusicPicture.files[0]);

    formdata.append('musicName',musicName.value);
    formdata.append('singerName',singerName.value);
    formdata.append('musicText',musicText.value)
    formdata.append('date',new Date().toISOString().slice(0,10));

    if((uploadMusic.files[0]!==undefined)&&(uploadMusicPicture.files[0]!==undefined)){
        var musicTemp=uploadMusic.files[0].name.split('.').reverse()[0];
        var pictureTempName=uploadMusicPicture.files[0].name.split('.').reverse()[0];

        if(((pictureTempName==='jpg')||(pictureTempName==='jpeg')||(pictureTempName==='png'))&&(musicTemp==='mp3')&&(singerName.value!=='')&&(musicName.value!=='')&&(musicText.value!=='')){
            var http=new XMLHttpRequest();
            http.onloadend=e=>{
                var res=JSON.parse(e.target.responseText);
                var arr=new Array();
                arr.push(res);
                
                createMusicBoxFunction(arr);
        
                document.querySelector('#uploadMusicPictureL').style.backgroundImage="";
                document.getElementById('uploadMusicL').style.backgroundImage="";
                uploadMusic.value="";
                uploadMusicPicture.value="";
                musicName.value="";
                musicText.value="";
                singerName.value="";
            }
            http.open('post','/music');
            http.send(formdata);
        }
    }

    if(musicName.value===''){
        musicName.setAttribute('style','border-bottom:1px solid red !important;')
    }

    if(singerName.value===''){
        singerName.setAttribute('style','border-bottom:1px solid red !important;')
    }

    if(musicText.value===''){
        musicText.setAttribute('style','border-bottom:1px solid red !important;')
    }

    if(uploadMusic.files[0]===undefined){
        myAlert[0].innerHTML='you must select a file!';
        myAlert[0].classList.remove('dsn');
    }else{
        var musicTemp=uploadMusic.files[0].name.split('.').reverse()[0];
        if(musicTemp!=='mp3'){
            myAlert[0].innerHTML='just mp3 valid!';
            myAlert[0].classList.remove('dsn');
        }else{
            myAlert[0].innerHTML='';
            myAlert[0].classList.add('dsn');
        }
    }

    if(uploadMusicPicture.files[0]===undefined){
        myAlert[1].innerHTML='you must select a file!';
        myAlert[1].classList.remove('dsn');
    }else{
        var pictureTempName=uploadMusicPicture.files[0].name.split('.').reverse()[0];
        if(!((pictureTempName==='jpg')||(pictureTempName==='jpeg')||(pictureTempName==='png'))){
            myAlert[1].innerHTML='just jpg,jpeg or png is valid!';
            myAlert[1].classList.remove('dsn');
        }else{
            myAlert[1].innerHTML='';
            myAlert[1].classList.add('dsn');
        }
    }
})

musicName.onkeyup=()=>{
    musicName.setAttribute('style','border-bottom:1px solid gray !important;')
}

singerName.onkeyup=()=>{
    singerName.setAttribute('style','border-bottom:1px solid gray !important;')
}

musicText.onkeyup=()=>{
    musicText.setAttribute('style','border-bottom:1px solid gray !important;')
}