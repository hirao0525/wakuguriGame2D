enchant();
const HEIGHT= 320;
const WIDTH = 320;


// create random number
rand = function(num) {
	return Math.floor(Math.random() * num);
}

// add drow circle method to surface
Surface.prototype.drawCircle = function(x, y, r) {
        this.context.beginPath();
        this.context.strokeStyle = "blue";  // test
        this.context.arc(x, y, r, 0, Math.PI * 2, true);
        this.context.stroke();
};

// inheritance Sprite class
Plane = Class.create(Sprite, {
	initialize:function(x, y) {
		// call Sprite class constractor
		enchant.Sprite.call(this, 32, 32);
		this.image = game.assets['chara1.gif'];
		this.x = x;
		this.y = y;
		this.frame = 0;
		// define touch event
		this.addEventListener('touchstart', 
			function(e) { this.x = e.x - 16; this.y = e.y - 16; });
		this.addEventListener('touchend',
			function(e) { this.x = e.x - 16; this.y = e.y - 16; });
		this.addEventListener('touchmove', 
			function(e) { this.x = e.x - 16; this.y = e.y- 16; });
	}
});

// ScoreLabel class define
// inheritance label class
ScoreLabel = Class.create(Label, {
	initialize:function(x, y) {
	// call label class constractor
		enchant.Label.call(this, "SCORE: 0");
		this.x = x;
		this.y = y;
		this.score = 0;
	},
	// add score
	add:function(pts) {
		this.score += pts;
		// fix score label
		this.text = "SCORE: " + this.score;
	}
});

// DrowRing class define
// inheritance Sprite class
DrowRing = Class.create(Sprite, {
        initialize:function(x, y) {
                // call Sprite class constractor
                enchant.Sprite.call(this, 50, 50);
                this.surface = new Surface(50, 50);
                // ring color is red
                this.surface.drawCircle(25, 25, 10);
                this.image = this.surface;
                this.x = x;
                this.y = y;
                this.frame = 0;
        }
});

// initialize
window.onload = function() {
	game = new Game(WIDTH, HEIGHT);
	// load image droid
	game.preload('chara1.gif', 'background.jpg');
    game.tick = 0;
    game.fps = 16;
	game.onload = function() {
		// create background
		var bg = new Sprite(WIDTH, HEIGHT);
		bg.image = game.assets['background.jpg'];
		game.rootScene.addChild(bg);
		// print score label
		scoreLabel = new ScoreLabel(5, 5);
		game.rootScene.addChild(scoreLabel);
		// create plane
		var plane = new Plane( WIDTH/2, HEIGHT/2 );
		game.rootScene.addChild(plane);
        // create ring
        var ring = new DrowRing( 100, 100 );
        game.rootScene.addChild(ring);
	}
	
	game.start();
}
