
var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    physics: {
    default: 'arcade',
    arcade: {
    debug: false,
    gravity: { y: 0 }
    }
},
    scene: {
    preload: preload,
    create: create,
    update: update,
    audio: {
        disableWebAudio: true
    }
},

};

var game = new Phaser.Game(config);

function preload() {
this.load.image('ship', 'images/playerShip2_blue.png');
this.load.image('otherPlayer', 'images/spaceShips_001.png');
this.load.image('star', 'images/star_gold.png');
this.load.image('meteor', 'images/meteorGrey.png');
this.load.audio('space', ['audio/outerSpace.wav'])
this.load.audio('star_sound', ['audio/star.wav']);
this.load.audio('music', [
    'audio/game.mp3',
    'audio/game.ogg'
]);
}

function create() {
    var self = this;
    this.socket = io();
    var music = this.sound.add('music',{loop: false});
    music.play();
    this.meteor = this.physics.add.image(225, 550, 'meteor').setScale(2.5);
    this.meteor1 = this.physics.add.image(125, 250, 'meteor').setScale(2.3);
    this.meteor2 = this.physics.add.image(725, 450, 'meteor').setScale(2);
    this.otherPlayers = this.physics.add.group();
    this.socket.on('currentPlayers', function (players) {
    Object.keys(players).forEach(function (id) {
        if (players[id].playerId === self.socket.id) {
        addPlayer(self, players[id]);
        } else {
        addOtherPlayers(self, players[id]);
        }
    });
});

this.blueScoreText = this.add.text(16, 16, '', { font: '32px Courier', fill: '#00ff00' });
this.redScoreText =  this.add.text(546, 16, '', { font: '32px Courier', fill: '#00ff00' });

this.socket.on('scoreUpdate', function (scores) {
    self.blueScoreText.setText('Blue: ' + scores.blue);
    self.redScoreText.setText('Red: ' + scores.red);
});

this.socket.on('starLocation', function (starLocation) {
    if (self.star) self.star.destroy();
    self.star = self.physics.add.image(starLocation.x, starLocation.y, 'star');
    self.physics.add.overlap(self.ship, self.star, function () {
    this.socket.emit('starCollected');
    var star_sound = this.sound.add('star_sound');
    star_sound.play();
    }, null, self);
});
    this.socket.on('newPlayer', function (playerInfo) {
    addOtherPlayers(self, playerInfo);
});
    this.socket.on('disconnect', function (playerId) {
    self.otherPlayers.getChildren().forEach(function (otherPlayer) {
        if (playerId === otherPlayer.playerId) {
        otherPlayer.destroy();
        }
    });
});

this.cursors = this.input.keyboard.createCursorKeys();


this.socket.on('playerMoved', function (playerInfo) {
    self.otherPlayers.getChildren().forEach(function (otherPlayer) {
    if (playerInfo.playerId === otherPlayer.playerId) {
        otherPlayer.setRotation(playerInfo.rotation);
        otherPlayer.setPosition(playerInfo.x, playerInfo.y);
}
    });
});
}


function update() {
    if (this.ship) {
        if (this.cursors.left.isDown) {
        this.ship.setAngularVelocity(-150);
        } else if (this.cursors.right.isDown) {
        this.ship.setAngularVelocity(150);
        } else {
        this.ship.setAngularVelocity(0);
        }
        var x = this.ship.x;
        var y = this.ship.y;
        var r = this.ship.rotation;
        if (this.ship.oldPosition && (x !== this.ship.oldPosition.x || y !== this.ship.oldPosition.y || r !== this.ship.oldPosition.rotation)) {
        var space = this.sound.add('space', {
            volume: .013,
        });
        space.play();
        this.socket.emit('playerMovement', { x: this.ship.x, y: this.ship.y, rotation: this.ship.rotation });
    }



// save old position data
        this.ship.oldPosition = {
        x: this.ship.x,
        y: this.ship.y,
        rotation: this.ship.rotation
        };

        if (this.cursors.up.isDown) {
        this.physics.velocityFromRotation(this.ship.rotation + 1.5, 100, this.ship.body.acceleration);
        } else {
        this.ship.setAcceleration(0);
        }
    
        this.physics.world.wrap(this.ship, 5);
    }
}

function addPlayer(self, playerInfo) {
    self.ship = self.physics.add.image(playerInfo.x, playerInfo.y, 'ship').setOrigin(0.5, 0.5).setDisplaySize(53, 40);
    if (playerInfo.team === 'blue') {
    self.ship.setTint(0x0000ff);
    } else {
    self.ship.setTint(0xff0000);
    }
    self.ship.setDrag(100);
    self.ship.setAngularDrag(100);
    self.ship.setMaxVelocity(200);
}

function addOtherPlayers(self, playerInfo) {
    const otherPlayer = self.add.sprite(playerInfo.x, playerInfo.y, 'otherPlayer').setOrigin(0.5, 0.5).setDisplaySize(53, 40);
    if (playerInfo.team === 'blue') {
    otherPlayer.setTint(0x0000ff);
    } else {
    otherPlayer.setTint(0xff0000);
    }
    otherPlayer.playerId = playerInfo.playerId;
    self.otherPlayers.add(otherPlayer);
}

