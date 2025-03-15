const prew = document.querySelector("#prew")
const play = document.querySelector("#play")
const next = document.querySelector("#next")
const playBtn = document.querySelector("#play-btn")
const designSphere = document.querySelector(".design-item")
const audioName = document.querySelector("#audio-percent")
const audioProgress = document.querySelector(".audio-progress-bar")
const mute = document.querySelector("#mute")
const repeat = document.querySelector("#repeat")
const dropZone = document.querySelector(".upload-music-drop-zone")
const uploadFile = document.querySelector("#upload-file")
const uploadBtn = document.querySelector(".upload")
const uploadWindow = document.querySelector(".upload-music")
const playlistEl = document.querySelector(".playlist")
const playlistBtn = document.querySelector("#playlist-btn")

let musicList = [
    "../audio/audio-1.mp3",
    "../audio/audio-2.mp3",
    "../audio/audio-3.mp3",
    "../audio/audio-4.mp3",
    "../audio/audio-5.mp3"
]

let isPlayeng = false;
let currentMusicIndex = 0;
let currentmusic = new Audio(musicList[currentMusicIndex]);
let isVisible = false


function openPlaylist(){
    playlistEl.classList.toggle("active")
    playlistEl.innerHTML = ""
    musicList.forEach((item,index)=>{
        let card = document.createElement("div")
        let poster = document.createElement("img")
        poster.src = "../assets/playlistico.png"
        card.appendChild(poster)
        card.append(`Music:${index}`)
        card.dataset.audio = item
        card.classList.add("playlist-card")
        playlistEl.appendChild(card)
        card.addEventListener("click",()=>{
            currentmusic.src = item
            currentmusic.play()
        })
    })
}


const controls_data = {
    play:"../assets/controls/play.png",
    pause:"../assets/controls/pause.png"
}

function playMusic(url){


if(isPlayeng == false){
    isPlayeng = true
    playBtn.src = controls_data.pause
    currentmusic.play()
    designSphere.style.animation = "morph 4s infinite linear, rotateColors 8s infinite linear"
}else{
    isPlayeng = false
    playBtn.src = controls_data.play
    currentmusic.pause()
    designSphere.style.animation = "morph 15s infinite linear, rotateColors 8s infinite linear"

}
    
}

function handleNext(){
if(currentMusicIndex < musicList.length - 1){
    currentMusicIndex++
    currentmusic.src = musicList[currentMusicIndex]
    playMusic(currentmusic.src)
}else{
    currentMusicIndex = 0
    currentmusic.src = musicList[currentMusicIndex]
    playMusic(currentmusic.src)
}


}
function handlePrev(){
    if(currentMusicIndex > 0){
        currentMusicIndex--
        currentmusic.src = musicList[currentMusicIndex]
        playMusic(currentmusic.src)
    }else{
        currentMusicIndex = musicList,length - 1
        currentmusic.src = musicList[currentMusicIndex]
        playMusic(currentmusic.src)
    }
}



function openWindow(){
    if(isVisible == false){
        uploadWindow.style.display = "flex"
        isVisible = true
    }else{
        uploadWindow.style.display = "none"
        isVisible = false
    }
}



function handleMute(){
    currentmusic.muted = !currentmusic.muted
}
function handleRepeat(){
    currentmusic.loop = !currentmusic.loop
}

playlistBtn.addEventListener("click",openPlaylist)
mute.addEventListener("click",handleMute)
repeat.addEventListener("click",handleRepeat)
next.addEventListener("click",handleNext)
prew.addEventListener("click",handlePrev)
uploadBtn.addEventListener("click",openWindow)

play.addEventListener("click",function(){
    playMusic(musicList[currentMusicIndex])
})

dropZone.addEventListener("click",() => {
uploadFile.click()
})

uploadFile.addEventListener("change",()=>{
    let file = uploadFile.files[0]
    let reader = URL.createObjectURL(file)
    currentmusic,src = reader
    musicList.push(reader)
})


currentmusic.addEventListener("timeupdate",()=>{
        audioName.innerHTML = Math.round(currentmusic.currentTime / currentmusic.duration * 100 )+ "%"
        audioProgress.style.width = Math.round(currentmusic.currentTime / currentmusic.duration * 100 )+ "%"
})

