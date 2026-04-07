const chatContainer = document.getElementById("chatContainer");
const chatBox = document.getElementById("chatBox");
const input = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");

function toggleChat(){
chatContainer.classList.toggle("active");
}

sendBtn.onclick = sendMessage;

input.addEventListener("keydown",function(e){
if(e.key==="Enter"){
sendMessage();
}
});

function sendMessage(){

let msg = input.value.trim();
if(msg==="") return;

addMessage(msg,"user");
input.value="";

fetch("http://localhost:5005/webhooks/rest/webhook",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
sender:"user",
message:msg
})
})
.then(res=>res.json())
.then(data=>{

if(!data || data.length===0){
addMessage("No response from assistant","bot");
return;
}

data.forEach(d=>{
if(d.text){
addMessage(d.text,"bot");
}
});

})
.catch(()=>{
addMessage("Server not responding","bot");
});

}

function addMessage(text,type){

let div=document.createElement("div");
div.className=type;
div.innerText=text;

chatBox.appendChild(div);

chatBox.scrollTop=chatBox.scrollHeight;

}
