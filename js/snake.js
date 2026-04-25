import { ctx, canvas, grid } from './canvas.js'
import { walls, generateMaze } from './maze.js'
import { food } from './food.js'

export let snake = [{
  x: 200,
  y: 200
}]

export let dx = grid
export let dy = 0

function getSafeFoodPosition() {
  let x, y, valid
  do {
    valid = true
    x = Math.floor(Math.random() * (canvas.width / grid)) * grid
    y = Math.floor(Math.random() * (canvas.height / grid)) * grid

    for (const w of walls) {
      if (
        x < w.x + w.w &&
        x + grid > w.x &&
        y < w.y + w.h &&
        y + grid > w.y
      ) {
        valid = false
        break
      }
    }

    if (valid) {
      for (const part of snake) {
        if (part.x === x && part.y === y) {
          valid = false
          break
        }
      }
    }
  } while (!valid)

  return { x, y }
}

export function resetGame() {
  snake = [{
    x: grid * 5,
    y: grid * 5
  }]
  dx = grid
  dy = 0
  generateMaze()
  const newFood = getSafeFoodPosition()
  food.x = newFood.x
  food.y = newFood.y
}

export function drawSnake() {
  ctx.fillStyle = '#4caf50'
  snake.forEach(
    part => ctx.fillRect(
      part.x,
      part.y,
      grid,
      grid
    )
  )
}

export function updateSnake() {
  const head = {
    x: snake[0].x + dx,
    y: snake[0].y + dy
  }
  
  head.x = (head.x + canvas.width) % canvas.width
  head.y = (head.y + canvas.height) % canvas.height

  for (const w of walls) {
    if (
      head.x < w.x + w.w &&
      head.x + grid > w.x &&
      head.y < w.y + w.h &&
      head.y + grid > w.y
    ) {
      alert('You are dead')
      resetGame()
      return
    }
  }

  snake.unshift(head)

  if (
    head.x < food.x + grid &&
    head.x + grid > food.x &&
    head.y < food.y + grid &&
    head.y + grid > food.y
  ) {
    const newFood = getSafeFoodPosition()
    food.x = newFood.x
    food.y = newFood.y
  } else {
    snake.pop()
  }
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowUp' && dy === 0) {
    dx = 0
    dy = -grid
  }
  if (e.key === 'ArrowDown' && dy === 0) {
    dx = 0
    dy = grid
  }
  if (e.key === 'ArrowLeft' && dx === 0) {
    dx = -grid
    dy = 0
  }
  if (e.key === 'ArrowRight' && dx === 0) {
    dx = grid
    dy = 0
  }
})



