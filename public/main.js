var game = new Phaser.Game(800, 600, Phaser.AUTO, '', {preload:preload, create:create, update:update});

function preload(){
  game.load.image('sky', '/img/assets/sky.png');
  game.load.image('ground', '/img/assets/platform.png');
  game.load.image('star', '/img/assets/star.png');
  game.load.spritesheet('dude', '/img/assets/dude.png', 32, 48);
};

var platforms, player, cursors, stars, score, scoreText;
var score = 0;


function create(){
  //initialize physics engine
  game.physics.startSystem(Phaser.Physics.ARCADE);

  //add a background
  game.add.sprite(0, 0, 'sky');

  //make a new group called platforms
  platforms = game.add.group();
  //enable physics
  platforms.enableBody = true;

  //make the ground, add it to the group, scale it, make it immovable
  var ground = platforms.create(0, game.world.height - 64, 'ground');
  ground.scale.setTo(2, 2);
  ground.body.immovable = true;

  //make two ledges
  var ledge = platforms.create(400, 400, 'ground');
  ledge.body.immovable = true;
  ledge = platforms.create(-150, 250, 'ground');
  ledge.body.immovable = true;

  player = game.add.sprite(32, game.world.height - 150, 'dude');
  game.physics.arcade.enable(player);
  player.body.bounce.y = 0.4;
  player.body.gravity.y = 300;
  player.body.collideWorldBounds = true;

  player.animations.add('left', [0, 1, 2, 3], 10, true);
  player.animations.add('right', [5, 6, 7, 8], 10, true);

  cursors = game.input.keyboard.createCursorKeys();

  stars = game.add.group();
  stars.enableBody = true;

  //create 12 stars
  for(var i = 0; i < 102; i++){
    var star = stars.create(i * 7, 0, 'star');
    star.body.gravity.y = 600;
    star.body.bounce.y = 1 + Math.random() * 0.2;
  }

  scoreText = game.add.text(16, 16, 'score: 0', {fontSize:'32px', fill:'#000'})
};

function update(){
  game.physics.arcade.collide(player, platforms);
  game.physics.arcade.collide(stars, platforms);

  player.body.velocity.x = 0;
  if(cursors.left.isDown){
    player.body.velocity.x = -150;
    player.animations.play('left');
  }else if(cursors.right.isDown){
    player.body.velocity.x = 150;
    player.animations.play('right');
  }else{
    player.animations.stop();
    player.frame = 4;
  }

  if(cursors.up.isDown && player.body.touching.down){
    player.body.velocity.y = -350;
  }

  game.physics.arcade.overlap(player, stars, collectStar, null, this);

  function collectStar(player, star){
    star.kill();
    score += 10;
    scoreText.text = 'Score: ' + score;
  };
};
