/* eslint-disable no-use-before-define */
/* eslint-disable no-alert */
/* eslint-disable default-case */
/* eslint-disable no-console */
const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

canvas.width = 625;
canvas.height = 625;
const tileSize = 25;
const scoreText = document.querySelector('#score');
let score = 0;

const field = { // field
  width: canvas.width / tileSize, // 25
  height: canvas.height / tileSize, // 25

  regenerate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  },
};

const snake = { // snake
  body: [
    {
      x: Math.floor(Math.floor(field.width / 2) * tileSize),
      y: Math.floor(Math.floor(field.height / 2) * tileSize),
    },
  ],

  move: {
    up: true,
    down: false,
    left: false,
    right: false,
  },

  drawSnake() {
    snake.body.forEach((el, index) => {
      if (index === 0) {
        ctx.fillStyle = '#5db042';
      } else {
        ctx.fillStyle = '#6bcc52';
      }
      ctx.fillRect(el.x, el.y, tileSize, tileSize);
    });
  },

  moveSnake() {
    if (snake.move.up) {
      const headPosition = {
        x: snake.body[0].x,
        y: snake.body[0].y - tileSize,
      };
      for (let i = snake.body.length - 1; i >= 1; i -= 1) {
        snake.body[i].x = snake.body[i - 1].x;
        snake.body[i].y = snake.body[i - 1].y;
      }
      snake.body[0].x = headPosition.x;
      snake.body[0].y = headPosition.y;
    }

    if (snake.move.down) {
      const headPosition = {
        x: snake.body[0].x,
        y: snake.body[0].y + tileSize,
      };
      for (let i = snake.body.length - 1; i >= 1; i -= 1) {
        snake.body[i].x = snake.body[i - 1].x;
        snake.body[i].y = snake.body[i - 1].y;
      }
      snake.body[0].x = headPosition.x;
      snake.body[0].y = headPosition.y;
    }

    if (snake.move.left) {
      const headPosition = {
        x: snake.body[0].x - tileSize,
        y: snake.body[0].y,
      };
      for (let i = snake.body.length - 1; i >= 1; i -= 1) {
        snake.body[i].x = snake.body[i - 1].x;
        snake.body[i].y = snake.body[i - 1].y;
      }
      snake.body[0].x = headPosition.x;
      snake.body[0].y = headPosition.y;
    }

    if (snake.move.right) {
      const headPosition = {
        x: snake.body[0].x + tileSize,
        y: snake.body[0].y,
      };
      for (let i = snake.body.length - 1; i >= 1; i -= 1) {
        snake.body[i].x = snake.body[i - 1].x;
        snake.body[i].y = snake.body[i - 1].y;
      }
      snake.body[0].x = headPosition.x;
      snake.body[0].y = headPosition.y;
    }
  },

  isDead() {
    if (snake.body[0].x < 0 || snake.body[0].y < 0
      || snake.body[0].x > canvas.width - tileSize || snake.body[0].y > canvas.height - tileSize) {
      alert('you lost');
    }

    for (let i = 1; i < snake.body.length - 1; i += 1) {
      if (snake.body[0].x === snake.body[i].x && snake.body[0].y === snake.body[i].y) {
        alert('you lost');
      }
    }
  },

  isEating() {
    if (snake.body[0].x === apple.cords.x && snake.body[0].y === apple.cords.y) {
      score += 1;
      scoreText.innerHTML = `score: ${score}`;
      apple.isEaten = true;
      const newSnakeTile = {
        x: snake.body[snake.body.length - 1].x,
        y: snake.body[snake.body.length - 1].y,
      };
      snake.body.push(newSnakeTile);
    }
  },
};

const apple = { // apple
  cords: {
    x: null,
    y: null,
  },

  isEaten: true,

  generateApple() {
    apple.cords.x = (Math.round(Math.random() * (tileSize) - 0.5)) * tileSize;
    apple.cords.y = (Math.round(Math.random() * (tileSize) - 0.5)) * tileSize;
    snake.body.forEach((el) => {
      if (apple.cords.x !== el.x && apple.cords.y !== el.y) {
        apple.isEaten = false;
      } else {
        apple.generateApple();
      }
    });
  },

  drawApple() {
    ctx.fillStyle = '#ff4545';
    ctx.fillRect(apple.cords.x, apple.cords.y, tileSize, tileSize);
  },
};

function keyboard() { // keyboard
  window.addEventListener('keydown', (e) => {
    switch (e.code) {
      case 'KeyW':
        if (!snake.move.down) {
          snake.move.up = true;
          snake.move.down = false;
          snake.move.left = false;
          snake.move.right = false;
        }
        break;
      case 'KeyS':
        if (!snake.move.up) {
          snake.move.up = false;
          snake.move.down = true;
          snake.move.left = false;
          snake.move.right = false;
        } break;
      case 'KeyA':
        if (!snake.move.right) {
          snake.move.up = false;
          snake.move.down = false;
          snake.move.left = true;
          snake.move.right = false;
        }
        break;
      case 'KeyD':
        if (!snake.move.left) {
          snake.move.up = false;
          snake.move.down = false;
          snake.move.left = false;
          snake.move.right = true;
        } break;
    }
  });
}

function move() {
  snake.moveSnake();
}

function check() {
  snake.isDead();
  snake.isEating();
  if (apple.isEaten) {
    apple.generateApple();
  }
}

function render() {
  field.regenerate();
  snake.drawSnake();
  apple.drawApple();
}

function runGame() {
  setInterval(() => {
    keyboard();
    move();
    check();
    render();
  }, 75);
}

runGame();
