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

export function startMusic() {
  if (currentTrack) {
    currentTrack.pause()
    currentTrack.currentTime = 0
  }

  currentTrack = getRandomTrack()
  currentTrack.currentTime = 0

  currentTrack.oncanplaythrough = () => {
    currentTrack.oncanplaythrough = null
    currentTrack.play().catch(() => { })
  }
}


export function stopMusic() {
  if (currentTrack) {
    currentTrack.pause()
    currentTrack.currentTime = 0
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
