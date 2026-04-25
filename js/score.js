import { ctx } from './canvas.js'

export let score = 0

export function resetScore() {
  score = 0
}

export function increaseScore() {
  score++
}

export function drawScore() {
  ctx.font = '32px VT323'
  ctx.fillStyle = '#00ff00'
  ctx.fillText(`Score: ${score}`, 20, 40)
}
