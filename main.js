enchant();
const HEIGHT= 320;
const WIDTH = 320;


// create random number
rand = function(num) {
	return Math.floor(Math.random() * num);
}

// calculate coordinate langth
function getLength(x1, y1, x2, y2 ) {
	return Math.sqrt(Math.pow(x2 - x1 , 2.0 ) + Math.pow(y2 - y1 , 2.0 )); 
}

// add drow circle method to surface
Surface.prototype.drawCircle = function(x, y, r, color) {
        this.context.beginPath();
        this.context.strokeStyle = color;
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

// initialize
window.onload = function() {
	game = new Game(WIDTH, HEIGHT);
	// load image droid
	game.preload('chara1.gif', 'background.jpg');	
 	game.tick = 0;
  	game.fps = 16;
	createRings = 0;
	deleteRings = 0;
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
		
		game.addSurface = function(x, y, color) {
			// create surface
			var surface = new Surface(50, 50);
			surface.drawCircle(25, 25, 5, color);

			var sprite = new Sprite(50, 50);
			var point = 50;
			var scalePace = 0.08;
			var addTick = 1;
			sprite.image = surface;
			sprite.x = x;
			sprite.y = y;
			game.rootScene.addChild(sprite);

			if(color == "blue") {
				point *= 3;
			        scalePace *= 2;
				addTick *= 2;
			} else if(color == "green") {
				point *= 5;
				scalePace *= 3;
				addTick *= 3;
			}

			// sprite processing
			sprite.tick = 0;
			sprite.addEventListener(Event.ENTER_FRAME, function() {
				sprite.tick += addTick;
				sprite.scaleX += scalePace;
				sprite.scaleY += scalePace;
				if(sprite.tick > 50) {
					if(getLength(sprite.x, sprite.y, plane.x, plane.y) < 50) {
						scoreLabel.add(point - Math.floor(getLength(sprite.x, sprite.y, plane.x, plane.y)));
					}	
					game.rootScene.removeChild(sprite);
					deleteRings++;
				}
			});
		};

		game.rootScene.addEventListener('touchstart', 
			function(e) { plane.x = e.x - 16; plane.y = e.y - 16; });
		game.rootScene.addEventListener('touchend',
			function(e) { plane.x = e.x - 16; plane.y = e.y - 16; });
		game.rootScene.addEventListener('touchmove', 
			function(e) { plane.x = e.x - 16; plane.y = e.y- 16; });

		game.rootScene.addEventListener(Event.ENTER_FRAME, function() {
			// create ring
			game.tick++;
			if( game.tick % 32 === 0 && createRings < 30) {
				createRings++;
        	                game.addSurface(rand(220), rand(220), "red");
				if( createRings % 5 == 0) {
					game.addSurface(rand(200), rand(200), "blue");
				} else if( createRings % 12 == 0) {
					game.addSurface(rand(200), rand(200), "green");
				}
			}
		}); 
	}
	
	game.start();
}
