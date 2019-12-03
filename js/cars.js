var gameDiv = document.getElementById('game');
var gameDiv1 = document.getElementById('game1');
var road = document.getElementById('road');
var CAR_HEIGHT = 284;
var CAR_WIDTH = 130;
var counter = 0;
var enemySpeed = 5;
var backgroundHeight = 800;
var ammoHeight = 100;

//only whole number
var randomNumber = function(max, min) {
  return Math.floor(Math.random() * (max - min));
};

function Ammo(parentElement){
  this.mainElement = parentElement;
  var ammoDiv = document.createElement('div');
  this.y = -ammoHeight;
  var lane = randomNumber(3,0);
  if(lane==0)
    this.x = 35;
  else if(lane==1)
    this.x = 183;
  else 
    this.x = 331;

  this.create = function(){
    this.mainElement.appendChild(ammoDiv);
    ammoDiv.style.top = this.y+'px';
    ammoDiv.style.left = this.x+'px';
    ammoDiv.style.position = 'absolute';
    ammoDiv.style.zIndex = '10';
    ammoDiv.style.height = ammoHeight+'px';
    ammoDiv.style.width = CAR_WIDTH+9+'px';

    var ammoImage = document.createElement('img');
    ammoDiv.appendChild(ammoImage);
    ammoImage.style.height = '100%';
    ammoImage.style.width = '100%';
    ammoImage.setAttribute('src','images/ammo.png');

  }

  this.update = function(){
    this.y += 15;
    ammoDiv.style.top = this.y+'px';
  }

  this.deleteAmmo = function(){
    this.mainElement.removeChild(ammoDiv);
  }
}  

function Background(parentElement) {
  this.frame = '';
  this.backgroundY = 0;
  this.mainElement = parentElement;

  var that = this;

  this.create = function() {
    this.frame = document.createElement('div');
    this.frame.style.height = '800px';
    this.frame.style.width = '500px';
    this.frame.setAttribute('id', 'road');
    this.frame.style.background = 'url(images/road1.png)';
    this.frame.style.position = 'relative';
    this.frame.style.overflow = 'hidden';
    this.mainElement.appendChild(this.frame);
  };

  this.update = function() {
    this.backgroundY += 20;
    this.frame.style.backgroundPositionY = this.backgroundY + 'px';

  };
}

function Car(parentElement) {
  this.y = 800-CAR_HEIGHT;
  this.x = 183;
  this.carDiv = '';
  this.height = CAR_HEIGHT;
  this.carPosition = this.x;
  this.width = CAR_WIDTH + 9;
  this.mainElement = parentElement;
  var that = this;

  this.create = function() {
    this.carDiv = document.createElement('div');
    this.carDiv.style.height = this.height + 'px';
    this.carDiv.style.width = this.width + 'px';
    this.carDiv.style.position = 'absolute';
    this.carDiv.style.zIndex = '20';
    this.carDiv.style.bottom = '0px';
    this.carDiv.style.left = this.x + 'px';

    this.carDiv.setAttribute('id', 'car-div');
    this.mainElement.appendChild(this.carDiv);

    var carImage = document.createElement('img');

    carImage.setAttribute('src', 'images/lambo1.png');
    carImage.style.height = '100%';
    carImage.style.width = '100%';
    this.carDiv.appendChild(carImage);
  };

  this.update = function(direction) {
    var changeCarPosition = function() {
      that.carPosition = that.carPosition + (148) * direction;
      that.carDiv.style.left = that.carPosition + 'px';
    };

    if (this.carPosition <= 35 && direction === -1) {
      this.carDiv.style.left = this.carPosition + 'px';
    } else if (this.carPosition >= 331 && direction === 1) {
      this.carDiv.style.left = this.carPosition + 'px';
    } else {
      changeCarPosition();
    }
    this.x = this.carPosition;
  }

};

function RocketNumber(parentElement){
  this.mainElement = parentElement;
  this.point;
  var rocketDiv = document.createElement('h1');
  this.mainElement.appendChild(rocketDiv);
  rocketDiv.style.position = 'absolute';
  rocketDiv.style.top = '0px';
  rocketDiv.style.right = '0px';
  rocketDiv.style.zIndex = '30';
  rocketDiv.style.background = 'grey';

  this.update = function(){
    rocketDiv.innerHTML = 'Rocket : '+this.point;
    console.log(this.point);
  }
};

function Score(parentElement){
  this.mainElement = parentElement;
  this.point;
  var scoreDiv = document.createElement('h1')
  this.mainElement.appendChild(scoreDiv);
  scoreDiv.style.position = 'absolute';
  scoreDiv.style.top = '0px';
  scoreDiv.style.left = '0px';
  scoreDiv.style.zIndex = '30';
  scoreDiv.style.background = 'grey';

  this.update = function(){
    scoreDiv.innerHTML = 'Score : '+this.point;
    console.log(this.point);
  }
};

function Enemy(parentElement) {
  this.y = -CAR_HEIGHT;
  this.x = 0;
  this.width = CAR_WIDTH+9;
  this.height = CAR_HEIGHT;
  this.mainElement = parentElement;
  this.enemyDiv = document.createElement('div');

  this.create = function() {
    var lane = randomNumber(3,0);
    var enemyImage = document.createElement('img');
    this.enemyDiv.style.zIndex = '20';
    this.enemyDiv.style.width = this.width + 'px';
    this.enemyDiv.style.height = this.height + 'px';
    this.enemyDiv.style.top = this.y + 'px';
    this.enemyDiv.style.position = 'absolute';
    enemyImage.style.width = '100%';
    enemyImage.style.height = '100%';
    enemyImage.setAttribute('src', 'images/ferraris.png');

    this.mainElement.appendChild(this.enemyDiv);
    this.enemyDiv.appendChild(enemyImage);

    if (lane === 0) {
      this.x = 35;
    } else if (lane === 1) {
      this.x = 183; 
    } else if (lane === 2) {
      this.x = 331;
    }
    this.enemyDiv.style.left = this.x + 'px';
    // console.log(this.x);
  };

  this.update = function() {
    this.y += enemySpeed;
    this.enemyDiv.style.top = this.y + 'px';
  };

  this.deleteEnemy = function() {
    this.mainElement.removeChild(this.enemyDiv);
  };
};

function Rocket(parentElement){
  this.mainElement = parentElement;
  this.bulletHeight = 140;
  this.bulletwidth = 139;
  var that = this;
  this.x;
  this.y = 800-CAR_HEIGHT;
  this.rocketDiv = document.createElement('div');


  this.create = function(){
    this.rocketDiv.style.height = this.bulletHeight+'px';
    this.rocketDiv.style.width = this.bulletwidth+'px';
    this.rocketDiv.style.position = 'absolute';
    this.rocketDiv.style.top = this.y+'px';
    this.rocketDiv.style.left = this.x+'px';
    this.mainElement.appendChild(this.rocketDiv);
    this.rocketDiv.style.zIndex = 10;
    var rocketImage = document.createElement('img');
    this.rocketDiv.appendChild(rocketImage);
    rocketImage.setAttribute('src','images/rocket.png');
    rocketImage.style.height = '100%';
    rocketImage.style.width = 'auto';
  }

  this.update = function(){
    this.y -= 10;
    this.rocketDiv.style.top = this.y+'px';
  }

  this.deleteRocket = function(){
    this.mainElement.removeChild(this.rocketDiv);
  }

  // this.rocketCollision = function(){
  //   if(this.y < -this.bulletHeight){
  //     this.deleteRocket();
  //   }
  // }
};
function Game(elementId) {
  this.score = 0;
  this.highScore =0;
  this.car = '';
  this.enemy = '';
  this.enemyArray = [];
  this.resetButton = '';
  this.mainElement = elementId;
  this.rocket = '';
  this.rockets = [];
  this.initialRocketNumber = 5;
  this.ammo = '';

  var that = this;

  this.create = function() {
    this.mainElement.style.background = 'url(images/background.jpg)';
    this.mainElement.style.backgroundSize = 'cover';
    this.mainElement.style.height = '800px';
    this.mainElement.style.width = '500px';
    this.mainElement.style.backgroundPositionX = '-160px';
    this.mainElement.style.textAlign = 'center';

    var heading = document.createElement('h1');
    var startButton = document.createElement('button');

    this.mainElement.appendChild(heading);
    heading.innerHTML = "WELCOME TO";
    heading.setAttribute('style','font-size:72px;font-family:modak;font-weight:bold;text-align:center;color:#03b3de;text-shadow:5px 5px #101b2f;')

    this.mainElement.appendChild(startButton);
    startButton.innerHTML = "START";
    startButton.style.display = 'block';
    startButton.style.margin = '0px auto';
    startButton.style.marginTop = '65%';
    startButton.style.background = 'yellow';
    startButton.style.color = 'black';
    startButton.style.fontSize = '30px';
    startButton.style.height = '60px';
    startButton.style.width = '100px';
    startButton.style.fontFamily = 'courier';

    startButton.onclick = function() {
      that.mainElement.removeChild(startButton);
      that.mainElement.removeChild(heading);
      that.backgroundCreate();
    
    }
  };

  this.rocketCollision = function(){
    for(var i = 0; i<this.enemyArray.length;i++){
      if(this.rocket.x == this.enemyArray[i].x && this.rocket.y<=this.enemyArray[i].y+this.enemyArray[i].height){
        this.enemyArray[i].deleteEnemy();
        this.enemyArray.splice(i,1);
        this.rocket.deleteRocket();
        this.rocket = null;
      }
    }
  }

  this.backgroundCreate = function() {
    this.rocketNumber = this.initialRocketNumber;
    this.background = new Background(this.mainElement);
    this.background.create();
    that.carCreate();

    this.resetButton = document.createElement('button');
    this.resetButton.appendChild(document.createTextNode('Reset Game'));
    this.resetButton.style.float = 'right';
    this.resetButton.style.width = '100%';
    this.resetButton.style.height = '20px';
    this.resetButton.style.background = 'red';
    this.resetButton.style.color = 'white';
    this.mainElement.appendChild(this.resetButton); 

    that.scoreCreate();
    that.rocketDivCreate();

    backgroundMove = setInterval(function() {
      that.background.update();

      that.rocketDiv.point = that.rocketNumber;
      that.rocketDiv.update();

      that.scoreBoard.point = that.score;
      that.scoreBoard.update();

      counter++;

      if (counter%1000==0){
        enemySpeed+=5;
      }
      // for enemy movement
      for(var x=0; x<that.enemyArray.length;x++){
        that.enemyArray[x].update();
      }

      if(counter%300==0){
        var ammoCreate = randomNumber(5,0);
        if (ammoCreate==0){
          that.ammoCreate();
        }
      }

      if(that.ammo){
        that.ammo.update();
        that.ammoCollision();
        if(that.ammo){
          if(that.ammo.y>=backgroundHeight){
            that.ammo.deleteAmmo();
            that.ammo = '';
           // console.log(that.ammo);
          }
        }
      }

      if (that.enemyArray.length !== 0 && that.enemyArray[0].y >= 800) {
        that.enemyArray[0].deleteEnemy();//for div removal
        that.enemyArray.splice(0, 1);//for array removal
        that.score++;
      }

      //key-press
      document.onkeydown = function(event) {

        var key = event.keyCode;

        if (key===37||key===65){
          that.car.update(-1);
        }
        else if(key===39||key===68){
          that.car.update(1);
        }
        else if(key==32){
          if(that.rocket){}
            else{
              if(that.rocketNumber!=0){
                that.rocketCreate();
                that.rocketNumber--;
                console.log(that.rocketNumber);
                }
              }
        }
      };
      if(that.rocket){
        that.rocket.update();
        that.rocketCollision();
        if(that.rocket){
          if (that.rocket.y<-that.rocket.bulletHeight){
          console.log('this');
          that.rocket = null;
          }
        }
      }

      //enemy creation time as 30 is for setinterval and 60 is for the multiplication(30*60 = 1800ms which give 300px movement on enemy)
      if (counter % 60 == 0) {
        that.enemyCreate();
      }

      that.resetButton.onclick = function() {
        clearInterval(backgroundMove);

        //method of removing all child in mainElement
        while (that.mainElement.hasChildNodes()) {
          that.mainElement.removeChild(that.mainElement.lastChild);
        }

        that.enemyArray.length = 0;
        that.create();//creating game again
      }

       //car collision check
      that.carCollision();

    }, 30);
  };

  this.rocketDivCreate = function(){
    this.rocketDiv = new RocketNumber(this.background.frame);
  }

  this.scoreCreate = function(){
    this.scoreBoard = new Score(this.background.frame);
  }
  this.ammoCreate = function(){
    this.ammo = new Ammo(this.background.frame);
    this.ammo.create();
  };
  this.rocketCreate = function(){
    this.rocket = new Rocket(this.background.frame);
    this.rocket.x = this.car.x;
    // console.log(this.rocket.x);
    this.rocket.create();
  };

  this.carCreate = function() {
    this.car = new Car(this.background.frame);//frame mean another div in background object
    this.car.create();
  };

  this.enemyCreate = function() {
    // for 75% chance of creating enemy every interval
    var test = randomNumber(4,0);
    if (test != 1) {
      if(this.enemyArray.length<2){
        this.enemy = new Enemy(this.background.frame);
        this.enemyArray.push(this.enemy);
        this.enemy.create();
      }
    } 
  };

  this.ammoCollision= function(){
    if(this.ammo.x==this.car.x&&this.ammo.y+ammoHeight>=this.car.y){
      this.rocketNumber = that.initialRocketNumber;
      console.log(this.rocketNumber);
      this.ammo.deleteAmmo();
      this.ammo = '';
    }
  };

  //car collision
  this.carCollision = function() {

    for (var x = 0; x < this.enemyArray.length; x++) {
      if (this.car.x <= this.enemyArray[x].x + this.enemyArray[x].width &&
        this.car.x + this.car.width >= this.enemyArray[x].x &&
        this.car.y <= this.enemyArray[x].y + this.enemyArray[x].height &&
        this.car.height + this.car.y >= this.enemyArray[x].y) {

        clearInterval(backgroundMove);
        // console.log('car crash');

          while (that.mainElement.hasChildNodes()) {
            that.mainElement.removeChild(that.mainElement.lastChild);
          }

          if(that.score>that.highScore){
            that.highScore = that.score;
          }

          var restartButton = document.createElement('button');
          that.mainElement.appendChild(restartButton);
          restartButton.innerHTML = 'Restart Game';
          restartButton.style.height = '70px';
          restartButton.style.width = '200px';
          restartButton.style.margin = '0 auto';
          restartButton.style.display = 'block';

          var scoreBoard = document.createElement('h2');
          that.mainElement.appendChild(scoreBoard);
          scoreBoard.innerHTML = 'SCORE : '+that.score;
          scoreBoard.style.background = 'yellow';
          scoreBoard.style.margin = '20px 0';

          var highScoreBoard = document.createElement('h2');
          that.mainElement.appendChild(highScoreBoard);
          highScoreBoard.innerHTML = 'HIGHSCORE : '+that.highScore;
          highScoreBoard.style.background = 'green';
          highScoreBoard.style.margin = '20px 0';

          restartButton.onclick = function(){
            

            while (that.mainElement.hasChildNodes()) {
            that.mainElement.removeChild(that.mainElement.lastChild);
            }
            that.backgroundCreate();
            that.enemyArray = [];
            that.score = 0;
            enemySpeed = 5;
          }

      }
    }
  };


}

var game = new Game(gameDiv);
game.create();
// var game1 = new Game(gameDiv1);
// game1.create();