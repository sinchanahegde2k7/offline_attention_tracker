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