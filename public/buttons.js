var game = new Phaser.Game(800, 600, Phaser.AUTO, '', {preload:preload, create:create, update:update});

function preload(){
  game.load.spritesheet('button', '/img/button_sprite_sheet.png', 193, 71);
  game.load.image('background', '/img/starfield.png');

};

var button, background;

function create(){
  game.stage.backgroundColor = '#182d3b';

  background = game.add.tileSprite(0,0, 800, 600, 'background');

  button = game.add.button(game.world.centerX - 95, 400, 'button', actionOnClick, this, 2, 1, 0);

  button.onInputOver.add(over, this);
  button.onInputOut.add(out, this);
};

function over(){
  console.log('button over');
};
function out(){
  console.log('button out');
};

function actionOnClick(){
  background.visible =! background.visible;
};
function update(){
};
