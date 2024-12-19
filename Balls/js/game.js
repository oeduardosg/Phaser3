var config = {

    type: Phaser.AUTO,
    width: 800,
    height: 600,

    physics: {
        default: "arcade",
        arcade: {
            gravity: {x: 10, y: 300}
        }
    },

    scene: {

        preload: preload,
        create: create,
        update: update

    }

}

var game = new Phaser.Game(config)
var ground
var bar
var cursors
var blue_balls

function preload() {

    this.load.image("Background", "assets/background.png")
    this.load.image("Background2", "assets/background2.png")
    this.load.image("Background-site", "assets/background-site.png")
    this.load.image("Bar", "assets/bar.png")
    this.load.image("Blue-ball", "assets/blue-ball.png")
    this.load.image("Gameover", "assets/gameover.png")
    this.load.image("Ground", "assets/ground.png")
    this.load.image("Red-ball", "assets/red-ball.png")

}

function create() {
    
    background = this.physics.add.staticGroup()
    background.create(400, 300, "Background")

    ground = this.physics.add.staticGroup()
    ground.create(400, 585, "Ground")

    bar = this.physics.add.sprite(400, 540, "Bar")
    bar.setCollideWorldBounds(true);
    this.physics.add.collider(bar, ground)

    cursors = this.input.keyboard.createCursorKeys()

    blue_balls = this.physics.add.group( {
        key: "Blue-ball",
        repeat: Phaser.Math.Between(8, 12),
        setXY: {x: 12, y: 0, stepX: 70}
    } )

    blue_balls.children.iterate(function (child) {
        child.setBounce(1)
        child.setCollideWorldBounds(true)
        child.setVelocityY(Phaser.Math.Between(-160, -30))
    } )

    this.physics.add.collider(bar, blue_balls)
    this.physics.add.overlap(blue_balls, ground, disable_balls, null, this)

}

function update() {

    if(cursors.left.isDown) bar.setVelocityX(-500)
    else if(cursors.right.isDown) bar.setVelocityX(500)
    else bar.setVelocityX(0)

}

function disable_balls(ball) {
    ball.disableBody(true, true)
}