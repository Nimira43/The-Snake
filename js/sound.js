function fadeOut(audio, duration = 800) {
  return new Promise(resolve => {
    if (!audio || audio.paused) {
      resolve()
      return
    }

    const start = audio.volume
    const step = start / (duration / 50)

    const fade = setInterval(() => {
      audio.volume = Math.max(0, audio.volume - step)

      if (audio.volume <= 0.01) {
        clearInterval(fade)
        audio.pause()
        audio.currentTime = 0
        audio.volume = start
        resolve()
      }
    }, 50)
  })
}

function fadeIn(audio, target = 0.7, duration = 800) {
  audio.volume = 0

  audio.play().then(() => {
    const step = target / (duration / 50)

    const fade = setInterval(() => {
      audio.volume = Math.min(target, audio.volume + step)
      if (audio.volume >= target) {
        clearInterval(fade)
      }
    }, 50)
  }).catch(() => { })
}

export const musicTracks = [
  '../sounds/music-1.mp3',
  '../sounds/music-2.ogg',
  '../sounds/music-3.mp3',
  '../sounds/music-4.mp3',
  '../sounds/music-5.mp3',
  '../sounds/music-6.mp3'
]

let currentTrack = null
let currentIndex = -1

export const sounds = {
  pickup: new Audio('../sounds/pickup.wav'),
  gameover: new Audio('../sounds/gameover.ogg')
}

function getRandomIndex() {
  let index = Math.floor(Math.random() * musicTracks.length)
  while (index === currentIndex) {
    index = Math.floor(Math.random() * musicTracks.length)
  }
  return index
}

async function handleTrackEnd() {
  await fadeOut(currentTrack)

  currentIndex = getRandomIndex()
  currentTrack = new Audio(musicTracks[currentIndex])
  currentTrack.preload = "auto"

  console.log("Next track:", musicTracks[currentIndex])

  currentTrack.addEventListener("ended", handleTrackEnd)

  fadeIn(currentTrack)
}

export async function startMusic() {
  if (currentTrack) {
    await fadeOut(currentTrack)
  }

  currentIndex = getRandomIndex()
  currentTrack = new Audio(musicTracks[currentIndex])
  currentTrack.preload = "auto"

  console.log("Playing:", musicTracks[currentIndex])

  currentTrack.addEventListener("ended", handleTrackEnd)

  fadeIn(currentTrack)
}

export function stopMusic() {
  if (currentTrack) {
    currentTrack.removeEventListener("ended", handleTrackEnd)
    fadeOut(currentTrack)
  }
}

export function playPickup() {
  sounds.pickup.currentTime = 0
  sounds.pickup.play()
}

export function playGameOver() {
  sounds.gameover.currentTime = 0
  sounds.gameover.play()
}

