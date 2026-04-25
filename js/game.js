import { canvas, ctx } from './canvas.js'
import { drawMaze } from './maze.js'
import { drawSnake, updateSnake } from './snake.js'
import { drawFood } from './food.js'

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  drawMaze()
  drawSnake()
  drawFood()
}

function loop() {
  updateSnake()
  draw()
  setTimeout(loop, 100)
}

loop()

