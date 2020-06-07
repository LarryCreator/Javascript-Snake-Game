var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
ctx.translate(0.5, 0.5);
var snake = {
  color: "red",
  outline_color: "darkred",
  speed: 10,
  facing: "l",
  body: [
    { x: 130, y: 100 },
    { x: 140, y: 100 },
    { x: 150, y: 100 },
  ],
  draw_snake: function (body) {
    //this function gets the parameter body which has the snake's body positions
    ctx.fillStyle = this.color; //and draw them on the screen.
    ctx.strokeStyle = this.outline_color;
    ctx.fillRect(body.x, body.y, 10.5, 5);
    ctx.strokeRect(body.x, body.y, 10.5, 5);
  },
  draw_on_screen: function () {
    //this functions iterates the function above through the body parts array.
    this.body.forEach(this.draw_snake.bind(snake));
  },
  advanceSnake: function () {
    //thos function gets which direction the snake is looking for and move it on that direction
    if (this.facing == "r") {
      var head = {
        x: this.body[0].x + this.speed,
        y: this.body[0].y,
      };
    } else if (this.facing == "l") {
      var head = {
        x: this.body[0].x - this.speed,
        y: this.body[0].y,
      };
    } else if (this.facing == "d") {
      var head = {
        x: this.body[0].x,
        y: this.body[0].y + (this.speed - 5),
      };
    } else {
      var head = {
        x: this.body[0].x,
        y: this.body[0].y - (this.speed - 5),
      };
    }
    this.body.unshift(head);
    this.body.pop();
  },
  keep_on_screen: function () {
    //this function makes it impossible to get out of the canvas.
    if (this.body[0].x >= 300) {
      this.body[0] = { x: 0, y: this.body[0].y };
    } else if (this.body[0].x <= -5) {
      this.body[0] = { x: 300, y: this.body[0].y };
    } else if (this.body[0].y <= -5) {
      this.body[0] = { x: this.body[0].x, y: 145 };
    } else if (this.body[0].y >= 150) {
      this.body[0] = { x: this.body[0].x, y: 0 };
    }
  },
  collision: function (body) {
    //this function checks if the snake collided with itself, and resets the game.
    for (i = 1; i < snake.body.length; i++) {
      if (
        this.body[i].x == this.body[0].x &&
        this.body[i].y == this.body[0].y
      ) {
        clearInterval();
        window.alert("You lost! Your length was " + this.body.length + "!");
        this.body = [
          { x: 130, y: 100 },
          { x: 140, y: 100 },
          { x: 150, y: 100 },
        ];
        this.facing = "l";
        food.appear();
        break;
      }
    }
  },
};

var food = {
  color: "lightgreen",
  outline: "darkgreen",
  position: { x: 50, y: 50 },
  appear: function () {
    //this function respawn the food when it is called.
    var p = {
      x: Math.round((Math.random() * 300) / 10) * 10,
      y: Math.round((Math.random() * 140) / 10) * 10,
    };
    this.position = p;
  },
  collision: function () {
    //this function checks if the snake ate the food and use the function above to
    //respawn it.
    if (
      snake.body[0].x == this.position.x &&
      snake.body[0].y == this.position.y
    ) {
      console.log("yay");
      this.appear();
      if (snake.facing == "r") {
        var head = { x: snake.body[0].x + snake.speed, y: snake.body[0].y };
      } else if (snake.facing == "l") {
        var head = { x: snake.body[0].x - snake.speed, y: snake.body[0].y };
      } else if (snake.facing == "u") {
        var head = {
          x: snake.body[0].x,
          y: snake.body[0].y - (snake.speed - 5),
        };
      } else {
        var head = {
          x: snake.body[0].x,
          y: snake.body[0].y + (snake.speed - 5),
        };
      }
      snake.body.unshift(head);
    }
  },
  draw_food: function () {
    //this function draw the food on the screen
    ctx.fillStyle = this.color;
    ctx.strokeStyle = this.outline;
    ctx.fillRect(this.position.x, this.position.y, 10.5, 5);
    ctx.strokeRect(this.position.x, this.position.y, 10.5, 5);
  },
};
function clear() {
  // this function clears the background so everything doesn't get duplicated on
  // the screen.
  ctx.fillStyle = "white";
  ctx.strokeStyle = "white";
  ctx.fillRect(0, 0, 600, 600);
  ctx.strokeRect(0, 0, 600, 600);
}
window.addEventListener("keydown", function (event) {
  //this function checks the key the user pressed and change the
  //snake direction.
  var x = event.key;
  if (x == "a" && snake.facing != "r") {
    snake.facing = "l";
  } else if (x == "d" && snake.facing != "l") {
    snake.facing = "r";
  } else if (x == "w" && snake.facing != "d") {
    snake.facing = "u";
  } else if (x == "s" && snake.facing != "u") {
    snake.facing = "d";
  }
});
window.setInterval(function () {
  //this function is the game's main loop
  clear();
  food.collision();
  snake.collision();
  food.draw_food();
  snake.body.forEach(snake.draw_on_screen.bind(snake));
  snake.advanceSnake();
  snake.keep_on_screen();
}, 60);
