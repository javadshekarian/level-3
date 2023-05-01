var username=document.getElementById('username');
var password=document.getElementById('password');
var register=document.getElementById('register');

register.addEventListener('submit',e=>{
    e.preventDefault();

    var formdata=new FormData();
    formdata.append('username',username.value);
    formdata.append('password',password.value);

    var http=new XMLHttpRequest();
    http.onloadend=(e)=>{
        var res=Number(JSON.parse(e.target.responseText));

        if(res){
            location.replace('/backend');
        }else{
            /* user not exist */
            username.setAttribute('style','border-bottom:1px solid red !important;');
            password.setAttribute('style','border-bottom:1px solid red !important;');
        }
    }
    http.open('post','/register');
    http.send(formdata);
})

username.onkeyup=()=>{
    username.setAttribute('style','border-bottom:1px solid gray !important;');
    password.setAttribute('style','border-bottom:1px solid gray !important;');
}

password.onkeyup=()=>{
    username.setAttribute('style','border-bottom:1px solid gray !important;');
    password.setAttribute('style','border-bottom:1px solid gray !important;');
}