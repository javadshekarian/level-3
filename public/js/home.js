var z=0;
window.onload=()=>{
    var http=new XMLHttpRequest();
    http.onloadend=e=>{
        var res=JSON.parse(e.target.responseText);
        fetchTrendMusic(res,z);
    }
    http.open('post','/rendMusic');
    http.send();
}

createTrendBox=async(musicCover,musicID,singerName,musicName,date)=>{
    var musicTrendBox=await document.createElement('div');
    await musicTrendBox.classList.add('musicTrendBox');

    var musicTrendBox1=await document.createElement('div');
    await musicTrendBox1.classList.add('musicTrendBox1');

    var musicTrendPicture=await document.createElement('div');
    await musicTrendPicture.classList.add('musicTrendPicture');
    await musicTrendPicture.classList.add('pr');
    await musicTrendPicture.classList.add('frc');
    await musicTrendPicture.classList.add('aic');

    musicTrendPicture.style.backgroundImage=`url(${musicCover})`;
    
    var i=await document.createElement('i');
    await i.classList.add('fa');
    await i.classList.add('fa-play');
    await i.classList.add('trend-play');

    i.addEventListener('click',()=>{
        playSpesalMusic(musicID,musicCover,singerName,musicName,date);
    })

    await musicTrendPicture.appendChild(i);
    await musicTrendBox1.appendChild(musicTrendPicture);
    await musicTrendBox.appendChild(musicTrendBox1);

    var trendContainer=await document.querySelectorAll('.trendContainer');

    if(z<3){
        await trendContainer[0].appendChild(musicTrendBox);
    }else{
        await trendContainer[1].appendChild(musicTrendBox);
    }
}

playSpesalMusic=(srcMusic,musicCover,singerName,musicName,date)=>{
    if(playOrPause.classList.contains('vi')){
        new Visualizer(audio,canvas).createVisualizer();
        playOrPause.classList.remove('vi');
    }
    audio.src=srcMusic;
    audio.play();
    playOrPause.classList.remove('fa-play');
    playOrPause.classList.add('fa-pause');
    musicPictureInAbout.style.backgroundImage=`url(${musicCover})`;

    musicInfoAbout.innerHTML='';
    var div1=document.createElement('div');
    div1.classList.add('ml5');
    div1.innerHTML=singerName;

    var div2=document.createElement('div');
    div2.classList.add('ml5');
    div2.innerHTML=musicName;

    var div3=document.createElement('div');
    div3.classList.add('ml5');
    div3.innerHTML=date;

    musicInfoAbout.appendChild(div1);
    musicInfoAbout.appendChild(div2);
    musicInfoAbout.appendChild(div3);
}

fetchTrendMusic=(array)=>{
    new Promise(async(resolve)=>{
        await createTrendBox(array[0].musicCover,array[0].musicID,array[0].singerName,array[0].musicName,array[0].date);
        await array.shift();
        resolve(array);
        ++z;
    }).then(arr=>{
        if(0<arr.length){
            fetchTrendMusic(array);
        }
    })
}

var rightText=document.querySelectorAll('.rightText');
var audio=null;
var canvas=null;

var playOrPause=document.querySelector('.musicPlayerPlay');
var musicInfoAbout=document.getElementById('musicInfoAbout');

var h=document.getElementById('main').scrollHeight;

restartEl=()=>{
    rightText.forEach(elem=>{
        elem.classList.remove('cwi');
    })
}

document.body.onscroll=()=>{
    var elem=document.documentElement.scrollTop+(h/7);
    if((0<elem)&&(elem<h/7)){
        restartEl();
        rightText[0].classList.add('cwi');
    }
    if(((h/7)<elem)&&(elem<((2*h)/7))){
        restartEl();
        rightText[1].classList.add('cwi');
    }
    if((((2*h)/7)<elem)&&(elem<((3*h)/7))){
        restartEl();
        rightText[2].classList.add('cwi');
    }
    if((((3*h)/7)<elem)&&(elem<((4*h)/7))){
        restartEl();
        rightText[3].classList.add('cwi');
    }
    if((((4*h)/7)<elem)&&(elem<((5*h)/7))){
        restartEl();
        rightText[4].classList.add('cwi');
    }
    if((((5*h)/7)<elem)&&(elem<((6*h)/7))){
        restartEl();
        rightText[5].classList.add('cwi');
    }
    if((((6*h)/7)<elem)&&(elem<h)){
        restartEl();
        rightText[6].classList.add('cwi');
    }
}

audio=document.querySelector('audio');
canvas=document.querySelector('canvas');
var rn=null;

if(document.body.scrollWidth<427){
    rn=104;
}else{
    rn=138;
}

$(`#round`).roundSlider({
    svgMode: true,
    radius: rn,
    width: 2,
    handleSize: "+16",
    sliderType: "min-range",
    value: 0,
    pathColor:"gray",
    rangeColor:"rgb(0, 102, 255)",
    borderColor:"rgb(0,0,0,0)",
    tooltipColor:"black",
    update:e=>{
        var val=e.value;
        audio.currentTime=(val/100)*audio.duration;
    },
    showTooltip:false
});

audio.addEventListener('timeupdate',(e)=>{
    var percent=e.target.currentTime/e.target.duration;
    percent*=100;
    $(`#round`).roundSlider({
        value:percent
    })
})

playOrPause.addEventListener('click',()=>{
    if(playOrPause.classList.contains('vi')){
        new Visualizer(audio,canvas).createVisualizer();
        playOrPause.classList.remove('vi');
    }
    if(playOrPause.classList.contains('fa-play')){
        playOrPause.classList.remove('fa-play');
        playOrPause.classList.add('fa-pause');
        audio.play();
    }else{
        playOrPause.classList.add('fa-play');
        playOrPause.classList.remove('fa-pause');
        audio.pause();
    }
})

var searchInput=document.getElementById('searchInput');
var searchResultBox=document.getElementById('searchResultBox');
var musicPictureInAbout=document.getElementById('musicPictureInAbout');

createResultBox=async(singerName,musicName,musicID)=>{
    var searchResult=await document.createElement('div');
    await searchResult.classList.add('searchResult');
    await searchResult.classList.add('fcc');
    await searchResult.classList.add('fs12');

    searchResult.addEventListener('click',()=>{
        var formdara=new FormData();
        formdara.append('musicID',musicID);

        var http=new XMLHttpRequest();
        http.onloadend=e=>{
            var res=JSON.parse(e.target.responseText);
            searchResultBox.innerHTML='';
            // searchInput.value="";
            
            playSpesalMusic(res.musicID,res.musicCover,res.singerName,res.musicName,res.date);
        }
        http.open('post','/musicInformation');
        http.send(formdara);
    })

    var ffr=await document.createElement('div');
    await ffr.classList.add('ffr');
    await ffr.classList.add('ml10');
    ffr.innerHTML=musicName;

    var cg=await document.createElement('div');
    await cg.classList.add('ffr');
    await cg.classList.add('ml10');
    await cg.classList.add('fs12');
    await cg.classList.add('mt5');
    cg.innerHTML=singerName;

    await searchResult.appendChild(ffr);
    await searchResult.appendChild(cg);
    await searchResultBox.appendChild(searchResult);
}

fetchSearchResult=(array)=>{
    new Promise(async(resolve)=>{
        await createResultBox(array[0].singerName,array[0].musicName,array[0].musicID);
        await array.shift();
        resolve(array);
    }).then(arr=>{
        if(0<arr.length){
            fetchSearchResult(arr);
        }
    })
}

searchInput.onkeyup=()=>{
    searchResultBox.innerHTML='';

    var formdara=new FormData();
    formdara.append('searchText',searchInput.value);

    var http=new XMLHttpRequest();
    http.onloadend=e=>{
        var res=JSON.parse(e.target.responseText);
        if(0<res.length){
            fetchSearchResult(res);
        }
    }
    http.open('post','/searchMusic');
    http.send(formdara);
}

var menu=document.getElementById('menu');
var MenuContainer=document.getElementById('MenuContainer');

menu.addEventListener('click',()=>{
    if(MenuContainer.classList.contains('activeMenu')){
        MenuContainer.classList.remove('activeMenu');
    }else{
        MenuContainer.classList.add('activeMenu');
    }
})