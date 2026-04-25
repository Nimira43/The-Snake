import { ctx, canvas, grid } from './canvas.js'

export let walls = []

export function generateMaze(count = 40) {
  walls = []
  for (let i = 0; i < count; i++) {
    const wx = Math.floor(
      Math.random() * (canvas.width / grid)
    ) * grid
    
    const wy = Math.floor(
      Math.random() * (canvas.height / grid)
    ) * grid
    
    const wWidth = grid * (
      1 + Math.floor(Math.random() * 4)
    )
    
    const wHeight = grid * (
      1 + Math.floor(Math.random() * 4)
    )
    
    walls.push({
      x: wx,
      y: wy,
      w: wWidth,
      h: wHeight
    })
  }
}

export function drawMaze() {
  ctx.fillStyle = '#0f0'
  walls.forEach(
    w => ctx.fillRect(w.x, w.y, w.w, w.h))
}

generateMaze()
