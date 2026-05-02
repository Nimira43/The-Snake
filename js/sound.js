function fadeOut(audio, duration = 600) {
  return new Promise(resolve => {
    const step = audio.volume / (duration / 50)
    const fade = setInterval(() => {
      audio.volume = Math.max(0, audio.volume - step)
      if (audio.volume <= 0) {
        clearInterval(fade)
        audio.pause()
        audio.currentTime = 0
        resolve()
      }
    }, 50)
  })
}

function fadeIn(audio, targetVolume = 0.4, duration = 600) {
  audio.volume = 0
  audio.play().catch(() => { })
  const step = targetVolume / (duration / 50)
  const fade = setInterval(() => {
    audio.volume = Math.min(targetVolume, audio.volume + step)
    if (audio.volume >= targetVolume) {
      clearInterval(fade)
    }
  }, 50)
}

export const musicTracks = [
  new Audio('../sounds/music-1.mp3'),
  new Audio('../sounds/music-2.ogg'),
  new Audio('../sounds/music-3.mp3'),
  new Audio('../sounds/music-4.mp3'),
  new Audio('../sounds/music-5.mp3'),
  new Audio('../sounds/music-6.mp3'),
]

musicTracks.forEach(track => {
  track.loop = true
  track.volume = 0.7
})

let currentTrack = null

export const sounds = {
  pickup: new Audio('../sounds/pickup.wav'),
  gameover: new Audio('../sounds/gameover.ogg')
}

function getRandomTrack() {
  const index = Math.floor(Math.random() * musicTracks.length)
  return musicTracks[index]
}

export async function startMusic() {
  if (currentTrack) {
    await fadeOut(currentTrack)
  }

  currentTrack = getRandomTrack()
  currentTrack.currentTime = 0

  currentTrack.oncanplaythrough = () => {
    currentTrack.oncanplaythrough = null
    fadeIn(currentTrack)
  }
}

export function stopMusic() {
  if (currentTrack) {
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
