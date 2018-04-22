// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x = 0;
    this.y = random() * 65; //randomly intitalize the enemy to one of the stone tiled rows
    this.speed = Math.trunc(Math.random() * 256 + 30); //random speed between 50 and 286
    this.sprite = 'images/enemy-bug.png';
};

var random = function() {
    //generate a random numner between 1 and 4 to place the enemy entities on the stone blocks
    var ran = Math.trunc(Math.random() * (4 - 1) + 1);
    return ran;
}
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed * dt;
    if (this.x >= 505) { //if the enemy moves off screen, bring back to x=0
        this.x = 0;
    }
};

var checkEachCollision = function(enemy) {
    //check if the player collides with any enemy instances
    if (range(player.x, player.x + 70, enemy.x, enemy.x + 70, player.y, player.y + 50, enemy.y, enemy.y + 48)) {
        player.x = 202;
        player.y = 380;
    }
}
//check if the player and the enemy overlap
var range = function(player_left, player_right, enemy_left, enemy_right, player_top, player_bottom, enemy_top, enemy_bottom) {
    if (((enemy_right >= player_left) && (player_right >= enemy_left)) && ((player_bottom >= enemy_top) && (enemy_bottom >= player_top))) {
        return true;
    }

}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y, 92, 160);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x = 202;
    this.y = 380;
    this.sprite = 'images/char-boy.png';
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y, 101, 171);
};

//Check if the player has won the match or has moved out of canvas at every iteration of the game loop
Player.prototype.update = function() {
    checkOutofCanvas(); //check if the player has moved out of canvas
    checkWin(); //check if the player has reached the water row and won the game
};
//check if the player is moving out of canvas
var checkOutofCanvas = function() {
    if (player.x > 405) { //if player moves out of right side of canvas
        player.x = 405;
    } else if (player.x < 0) {
        player.x = 0;
    } else if (player.y < 0) {
        player.y = 0;
    } else if (player.y > 415) {
        player.y = 415;
    }
}

//check if the player has won the game
var checkWin = function() {
    if (player.y === 0) {
        player.x = 202;
        player.y = 380;
        score++;
        $("#score").html(score);
    }
}
//function to move the player based on keypress
Player.prototype.handleInput = function(keypressed) {
    if (keypressed == 'left') {
        player.x -= 101;
    }
    if (keypressed == 'up') {
        player.y -= 83;
    }
    if (keypressed == 'right') {
        player.x += 101;
    }
    if (keypressed == 'down') {
        player.y += 83;
    }

}
var score = 0; //initialize the score at the beginning to 0
var allEnemies = [] //initialize an emoty enemy array
for (let i = 0; i <= 2; i++) { //create three enemy instances
    var ememy = new Enemy();
    allEnemies.push(ememy);
}
var player = new Player(); //create a new player
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player



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