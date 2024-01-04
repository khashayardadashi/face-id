const video=document.getElementById('video');
const canavs=document.getElementById('canavs');
const nameinput=document.getElementById('name');

navigator.mediaDevices.getUserMedia({video:true})
.then(stream =>{
    video.srcObject=stream;
})
.catch(err =>{
    console.log(`error access webcam => ${err}`);
    alert(` cannot access your webcam`);
})

const capture =() =>{
    const context = canavs.getContext("2d");
    context.drawImage(video,0,0,canavs.width,canavs.height);
    canavs.style.display="block";
    video.style.display="none";
}

const register = () =>{
    const name= nameinput.value;
    const photo=dataURItoBlob(canavs.toDataURL())
    if (!name || !photo){
        alert('name and photo requiered');
        return;
    }
    const formdata= new FormData();
    formdata.append("name" , name)
    formdata.append("photo" , photo , `${name}.jpg`);
    fetch("/register" , {
        method:"POST",
        body:formdata,
    })
    .then(response=>response.json())
    .then(data=>{
        if(data.success){
            alert("data success register")
            window.location.href="/"
        }
        else{
            alert("sorry failed register")
        }
    })
    .catch(err=>{
        console.log(`error=>${err}`)
    })
}

const login =()=>{
    const context=canavs.getContext("2d");
    context.drawImage(video , 0, 0, canavs.width , canavs.height);
    const photo=dataURItoBlob(canavs.toDataURL())
    if (!photo){
        alert('photo requiered');
        return;
    }
    const formdata= new FormData();
    formdata.append("photo" , photo , "login.jpg")

    fetch("/login" , {
        method:"POST",
        body:formdata,
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        if(data.success){
            alert("login success")
            window.location.href=`/panel?username=${data.name}`;
        }
        else{
            alert("sorry failed login")
        }
    })
    .catch(err => {console.log("error" , err)});
}
const dataURItoBlob=(datauri)=>{
    const bytestring =atob(datauri.split(",")[1]);
    const mimestring = datauri.split(",")[0].split(":")[1].split(";")[0];

    const ab=new ArrayBuffer(bytestring.length);
    const ia = new Uint8Array(ab);
    for (let i =0 ; i<bytestring.length ; i++){
        ia[i]=bytestring.charCodeAt(i)
    }
    return new Blob([ab] , {type:mimestring})
}
