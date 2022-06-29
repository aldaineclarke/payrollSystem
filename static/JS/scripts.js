// setClockstate
// localStorage.setItem("clockStarted", "false");
// let clockState = 'JSON.stringify(<%= user.name %>'
// console.log(clockState);
// let startBtn = document.querySelector(".start");
// let stopBtn = document.querySelector(".stop");
// if(localStorage.getItem("clockStarted" == "false")){
//     stopBtn.style.display =  "none";
// }else(
//     startBtn.style.display = "none"
// )

window.onload = () =>{
    // let startBtn = document.querySelector(".start");
    // let stopBtn = document.querySelector(".stop");
    // if(!localStorage.getItem("clockStarted") || window.location.href == '/login'){
    //     localStorage.setItem("clockStarted", "false");
    // }
    // if(localStorage.getItem("clockStarted") == "true"){
    //     startBtn.classList.add("d-none");
    //     stopBtn.classList.remove("d-none")
    // }else if(localStorage.getItem("clockStarted") == "false"){
    //     startBtn.classList.remove("d-none");
    //     stopBtn.classList.add("d-none");   
    // }
    // localStorage.setItem("clockStarted", "false");
    // let clockState = 'JSON.stringify(<%= user.name %>'
    // console.log(clockState);
    // if(localStorage.getItem("clockStarted" == "false")){
    //     stopBtn.style.display =  "none";
    // }else(
    //     startBtn.style.display = "none"
    // )
}

function startClock(){
    window.localStorage.setItem("clockStarted", "true")
    return window.location.href = "/startClock";

}
function stopClock(){
    window.localStorage.setItem("clockStarted", "false")
    return window.location.href = "/stopClock";

}
function getToEditPage(event){
    console.log(event.target);
    let button = event.target;
    let recordId = button.getAttribute("data-id");
    window.location.href  = "/admin/updateTimecard/"+ recordId;
}

function disableFields(){
    console.log(document.querySelectorAll(".disabled"));
    document.querySelectorAll(".disabled").forEach((element)=>{
        element.setAttribute("disabled", "");
    })
}
function enableFields(){
    document.querySelectorAll(".disabled").forEach((element)=>{
        element.removeAttribute("disabled");
    })
}