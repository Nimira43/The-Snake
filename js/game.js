import { canvas, ctx } from './canvas.js'
import { drawMaze } from './maze.js'
import { drawSnake, updateSnake, resetGame } from './snake.js'
import { drawFood } from './food.js'
import { drawScore, resetScore, score } from './score.js'
import { startMusic, stopMusic } from './sound.js'
import { playGameOver } from './sound.js'

const startModal = document.getElementById('startModal')
const gameOverModal = document.getElementById('gameOverModal')
const finalScore = document.getElementById('finalScore')
const startBtn = document.getElementById('startBtn')
const restartBtn = document.getElementById('restartBtn')

let gameRunning = false

startBtn.onclick = () => {
  startModal.style.display = 'none'
  resetScore()
  resetGame()
  startMusic()
  gameRunning = true
}

restartBtn.onclick = () => {
  gameOverModal.style.display = 'none'
  resetScore()
  resetGame()
  startMusic() 
  gameRunning = true
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  drawMaze()
  drawSnake()
  drawFood()
  drawScore()
}

function loop() {
  if (gameRunning) {
    updateSnake()
    draw()
  }
  setTimeout(loop, 100)
}

export function triggerGameOver() {
  gameRunning = false
  stopMusic()
  playGameOver()
  finalScore.textContent = `Final Score: ${score}`
  gameOverModal.style.display = 'flex'
}

loop()

function glitchBreak() {
  const g = document.getElementById('glitch-break')
  g.style.opacity = Math.random() * 0.6 + 0.3

  setTimeout(() => {
    g.style.opacity = 0
  }, 120)
}

setInterval(() => {
  glitchBreak()
}, Math.random() * 3000 + 3000)



