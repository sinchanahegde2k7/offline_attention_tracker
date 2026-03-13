let tracking = false

let clickCount = 0
let keyCount = 0
let moveCount = 0
let idleCount = 0

document.getElementById("startBtn").addEventListener("click", function(){
tracking = true
alert("Session Started")
})

document.getElementById("stopBtn").addEventListener("click", function(){
tracking = false
alert("Session Stopped")
})

document.addEventListener("click", function(){

if(tracking){

clickCount++

document.getElementById("clickCount").innerText = clickCount

}

})
document.addEventListener("keydown", function(){

if(tracking){

keyCount++

document.getElementById("keyCount").innerText = keyCount

}

})
document.addEventListener("mousemove", function(){

if(tracking){

moveCount++

document.getElementById("moveCount").innerText = moveCount

}

})
let lastActivity = Date.now()

function updateActivity(){
lastActivity = Date.now()
}

document.addEventListener("mousemove", updateActivity)
document.addEventListener("click", updateActivity)
document.addEventListener("keydown", updateActivity)

setInterval(function(){

if(tracking){

let now = Date.now()

if(now - lastActivity > 5000){

idleCount++

document.getElementById("idleCount").innerText = idleCount

lastActivity = now

}

}

},1000)
let tabSwitchCount = 0

document.addEventListener("visibilitychange", function(){

if(document.hidden && tracking){

tabSwitchCount++

document.getElementById("tabSwitchCount").innerText = tabSwitchCount

}

})
let sessionSeconds = 0
let timer

document.getElementById("startBtn").addEventListener("click", function(){

tracking = true

timer = setInterval(function(){

sessionSeconds++

document.getElementById("sessionTime").innerText = sessionSeconds

},1000)

})

document.getElementById("stopBtn").addEventListener("click", function(){

tracking = false

clearInterval(timer)

})
function updateAttentionState(){

let activity = clickCount + keyCount + moveCount

let state = "Idle"

if(activity > 50){
state = "Focused"
}
else if(activity > 20){
state = "Active"
}
else if(activity > 0){
state = "Passive"
}

document.getElementById("attentionState").innerText = state

}

setInterval(updateAttentionState, 5000)

let activityHistory = []

setInterval(function(){
if(tracking){ 

let activity = clickCount + keyCount + moveCount

attentionChart.data.labels.push("")

attentionChart.data.datasets[0].data.push(activity)
if(attentionChart.data.labels.length > 10){
attentionChart.data.labels.shift()
attentionChart.data.datasets[0].data.shift()
}

attentionChart.update()
updateHeatmap(activity)

}

},5000)
let ctx = document.getElementById("attentionChart").getContext("2d")

let attentionChart = new Chart(ctx, {
type: "line",
data: {
labels: [],
datasets: [{
label: "Attention Activity",
data: [],
borderColor: "cyan",
backgroundColor: "rgba(0,225,225,0.2)",
borderWidth: 2,
fill: true
}]
},
options: {
responsive: true,
scales: {

x: {
ticks: {
color: "white"
},
grid: {
color: "rgba(255,255,255,0.2)"
}
},

y: {
beginAtZero: true,
ticks: {
color: "white"
},
grid: {
color: "rgba(255,255,255,0.2)"
}
}

}
}
})
function updateHeatmap(activity){
    const container = document.getElementById("heatmapContainer")
    
    // Create a new block for this 5-sec interval
    const block = document.createElement("div")
    
    // Size of the block
    block.style.width = "20px"
    block.style.height = "20px"
    block.style.margin = "2px"
    block.style.borderRadius = "3px"
    
    // Color based on activity (0 = blue, high = red)
    let red = Math.min(activity * 5, 255) // scale activity
    let green = 255 - red
    block.style.backgroundColor = `rgb(${red}, ${green}, 0)`
    
    // Add to container
    container.appendChild(block)
    
    // Optional: keep only last 20 blocks
    if(container.children.length > 20){
        container.removeChild(container.children[0])
    }
}
// Article popup controls

const readBtn = document.getElementById("readBtn");
const articlePopup = document.getElementById("articlePopup");
const closeArticle = document.getElementById("closeArticle");

readBtn.onclick = function() {
  articlePopup.style.display = "block";
};

closeArticle.onclick = function() {
  articlePopup.style.display = "none";
};
// Riddle popup

const riddleBtn = document.getElementById("riddleBtn");
const riddlePopup = document.getElementById("riddlePopup");
const closeRiddle = document.getElementById("closeRiddle");

riddleBtn.onclick = function() {
  riddlePopup.style.display = "block";
};

closeRiddle.onclick = function() {
  riddlePopup.style.display = "none";
};

// Riddle answer check

const submitRiddle = document.getElementById("submitRiddle");
const riddleAnswer = document.getElementById("riddleAnswer");
const riddleResult = document.getElementById("riddleResult");

submitRiddle.onclick = function() {

  if (riddleAnswer.value.toLowerCase() === "echo") {
    riddleResult.innerText = "Correct! 🎉";
  } else {
    riddleResult.innerText = "Try again!";
  }

};
// Quiz popup

const quizBtn = document.getElementById("quizBtn");
const quizPopup = document.getElementById("quizPopup");
const closeQuiz = document.getElementById("closeQuiz");

quizBtn.onclick = function() {
  quizPopup.style.display = "block";
};

closeQuiz.onclick = function() {
  quizPopup.style.display = "none";
};


// Quiz logic

const quizOptions = document.querySelectorAll(".quiz-option");
const quizResult = document.getElementById("quizResult");

quizOptions.forEach(option => {

  option.onclick = function() {

    if(option.innerText === "HTML"){
      quizResult.innerText = "Correct! 🎉";
    } else {
      quizResult.innerText = "Wrong answer!";
    }

  };

});

 // Memory game popup

const memoryBtn = document.getElementById("memoryBtn");
const memoryPopup = document.getElementById("memoryPopup");
const closeMemory = document.getElementById("closeMemory");

memoryBtn.onclick = function() {
  memoryPopup.style.display = "block";
};

closeMemory.onclick = function() {
  memoryPopup.style.display = "none";
};

// Memory answer check

const checkMemory = document.getElementById("checkMemory");
const memoryInput = document.getElementById("memoryInput");
const memoryResult = document.getElementById("memoryResult");

checkMemory.onclick = function() {

  if(memoryInput.value === "7294"){
    memoryResult.innerText = "Correct! 🎉";
  } else {
    memoryResult.innerText = "Not correct, try again.";
  }

};

// Data explore popup

const dataBtn = document.getElementById("dataBtn");
const dataPopup = document.getElementById("dataPopup");
const closeData = document.getElementById("closeData");

dataBtn.onclick = function() {
  dataPopup.style.display = "block";
};

closeData.onclick = function() {
  dataPopup.style.display = "none";
};


// Data interaction buttons

const showClicks = document.getElementById("showClicks");
const showKeys = document.getElementById("showKeys");
const showTabs = document.getElementById("showTabs");
const dataResult = document.getElementById("dataResult");

showClicks.onclick = function(){
  dataResult.innerText = "Total Clicks: " + clickCount;
};

showKeys.onclick = function(){
  dataResult.innerText = "Keyboard Activity: " + keyCount;
};

showTabs.onclick = function(){
  dataResult.innerText = "Tab Switches: " + tabSwitchCount;
};