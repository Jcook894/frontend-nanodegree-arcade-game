

/*function ctxTest() {
    console.log(ctx);
}*/

var Score = function() {
    ctx.clearRect(1, 580, 600, 20);
    ctx.font = "italic bold 16px Futura";
    ctx.fillStyle = "Blue";
};




// Enemies our player must avoid
var Enemy = function(x,y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images

    this.x = x;
    this.y = y;
    this.width = 80;
    this.height = 50;
    this.speed = Math.floor(Math.random()* 500) + 15;
    this.sprite = 'images/enemy-bug.png';
};


// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {

    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    if(this.x < 505) {
      this.x = this.x +(this.speed * dt);

    }
    else {
      this.x = -2
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x,y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/char-boy.png';
    this.width = 100;
    this.height = 50;
    this.x =  200;
    this.y = 380;
    this.score = 0 ;
};

Player.prototype.reset = function (){
    this.x = 200;
    this.y = 380;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Player.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    for(var i = 0;i < allEnemies.length;i++){
        if(this.y <= 0) {
            this.x = 200;
            this.y = 380;
          }
      }

};

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/*Player.prototype.scoreData = function(){

  if(this.y === -20){
    this.score += 100;
    alert("you won!");
    console.log("scoreData");
  }
console.log("scoreData");
};*/




//Player movement and border for canvas


Player.prototype.handleInput = function(key) {
    switch(key) {
        case 'left':
            if(this.x === -2) {
                console.log("I will Not move any further");
            } else
            this.x -= 101;
            console.log(this.x);
           break;
        case 'right':
            if(this.x === 402) {
                console.log("I will Not move any further");
            } else
            this.x += 101;
            console.log(this.x);
            break;
        case 'up':
        if(this.y === -20) {
                console.log("I will Not move any further");
            } else
            this.y -= 80;
            console.log(this.y);
            break;
        case 'down': if(this.y >= 350) {
                console.log("I will Not move any further");
            } else
            this.y += 80;
            console.log(this.y);
            break;
       default:
      console.log("whats good!");
    }

        if (this.y === -20){
        this.score += 100; // Add 100 points to the player score
        ctx.clearRect(1, 580, 600, 20); // clear a rectangle over the score text
        ctx.fillText("Score: "+ player.score, 1, 600); // re-draw the score text
      }

        if(this.score >= 1000){
          alert("You win!");
        }

          if(this.y === gem.y && this.x === gem.x){
            gem.collision();

          }


};










var checkCollisions = function(targets){
  var target;
    if (Array.isArray(targets)){
        for (var i =0; i < targets.length; i++){
            target = targets[i];
            if (targets > allEnemies){
                target.width = 50;
                target.height = 40;
            }
            if (player.x < target.x + target.width && player.x + player.width  > target.x && player.y < target.y + target.height && player.y + player.height > target.y){
            	console.count('collision');
              player.score -= 20;
              player.reset();
              return true;
            }
        }
    }
    return false;

};







var Gem = function(x,y){
  this.x = x;
  this.y = y;
  this.width = 50;
  this.height = 40;
  this.sprite = 'images/gem-blue.png';

}

Gem.prototype.reset = function(){
  this.y = Math.floor(Math.random()*  3);
  this.x = Math.floor(Math.random() * 20);
}
Gem.prototype.update = function(){

    this.x = 200;
    this.y = 60;



};


Gem.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

};




Gem.prototype.collision = function() {

//  for(var i = 0; i < this.y; i++){

//    if(player.x < this.x + this.width &&
//    player.x + player.width > this.x &&
//    player.y < this.y + this.height &&
//    player.height + player.y > this.y);
//}
if (player.x == this.x && player.y == this.y) {
    console.log("got a gem!");
    console.count("Gem collision");

      player.score += 20;
      gem.reset();
}

};









// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player



var gem = new Gem();
var player = new Player();

var enemy1 = new Enemy(-150,55);
var enemy2 = new Enemy(-150,140);
var enemy3 = new Enemy(-150,225);
var allEnemies = [];

allEnemies.push(enemy1);
allEnemies.push(enemy2);
allEnemies.push(enemy3);




// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
