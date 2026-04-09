document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("game");
  const ctx = canvas.getContext("2d");
  const startBtn = document.getElementById("startBtn");

  const box = 20;
  let snake = [];
  let direction = "RIGHT";
  let food = {};
  let score = 0;
  let game = null;

  // tombol start
  startBtn.addEventListener("click", startGame);

  // keyboard
  window.addEventListener("keydown", changeDirection);

  function startGame() {
    snake = [{ x: 10 * box, y: 10 * box }];
    direction = "RIGHT";
    score = 0;
    document.getElementById("score").innerText = "Score: 0";

    food = {
      x: Math.floor(Math.random() * 20) * box,
      y: Math.floor(Math.random() * 20) * box
    };

    if (game) clearInterval(game);
    game = setInterval(draw, 100);
  }

  function changeDirection(event) {
    if (event.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
    else if (event.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
    else if (event.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
    else if (event.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
  }

  function draw() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, 400, 400);

    // ular
    for (let i = 0; i < snake.length; i++) {
      ctx.fillStyle = i === 0 ? "#00ffcc" : "#00aa88";
      ctx.fillRect(snake[i].x, snake[i].y, box, box);
    }

    // makanan
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, box, box);

    let headX = snake[0].x;
    let headY = snake[0].y;

    if (direction === "LEFT") headX -= box;
    if (direction === "UP") headY -= box;
    if (direction === "RIGHT") headX += box;
    if (direction === "DOWN") headY += box;

    // makan
    if (headX === food.x && headY === food.y) {
      score++;
      document.getElementById("score").innerText = "Score: " + score;

      food = {
        x: Math.floor(Math.random() * 20) * box,
        y: Math.floor(Math.random() * 20) * box
      };
    } else {
      snake.pop();
    }

    const newHead = { x: headX, y: headY };

    // tabrakan
    if (
      headX < 0 || headY < 0 ||
      headX >= 400 || headY >= 400 ||
      collision(newHead, snake)
    ) {
      clearInterval(game);

      ctx.fillStyle = "white";
      ctx.font = "20px Arial";
      ctx.fillText("GAME OVER", 130, 200);
      ctx.fillText("Klik START lagi", 120, 230);
      return;
    }

    snake.unshift(newHead);
  }

  function collision(head, array) {
    return array.some(segment => segment.x === head.x && segment.y === head.y);
  }
});
