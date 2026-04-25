import { ctx, grid } from './canvas.js'

export let food = { x: 0, y: 0 }

export function drawFood() {
  ctx.fillStyle = '#ff4500'
  ctx.fillRect(food.x, food.y, grid, grid)
}

