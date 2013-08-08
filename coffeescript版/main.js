// Generated by CoffeeScript 1.6.3
(function() {
  var HEIGHT, Plane, ScoreLabel, WIDTH, getLength, rand;

  getLength = function(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2.0) + Math.pow(y2 - y1, 2.0));
  };

  enchant();

  HEIGHT = 320;

  WIDTH = 320;

  rand = function(num) {
    return Math.floor(Math.random() * num);
  };

  Surface.prototype.drawCircle = function(x, y, r, color) {
    this.context.beginPath();
    this.context.strokeStyle = color;
    this.context.arc(x, y, r, 0, Math.PI * 2, true);
    return this.context.stroke();
  };

  Plane = Class.create(Sprite, {
    initialize: function(x, y, game) {
      enchant.Sprite.call(this, 32, 32);
      this.image = game.assets["chara1.gif"];
      this.x = x;
      this.y = y;
      return this.frame = 0;
    }
  });

  ScoreLabel = Class.create(Label, {
    initialize: function(x, y, game) {
      enchant.Label.call(this, "SCORE: 0");
      this.x = x;
      this.y = y;
      return this.score = 0;
    },
    add: function(pts) {
      this.score += pts;
      return this.text = "SCORE: " + this.score;
    }
  });

  window.onload = function() {
    var createRings, deleteRings, game;
    game = new Game(WIDTH, HEIGHT);
    game.preload("chara1.gif", "background.jpg");
    game.tick = 0;
    game.fps = 16;
    createRings = 0;
    deleteRings = 0;
    game.onload = function() {
      var bg, plane, scoreLabel;
      bg = new Sprite(WIDTH, HEIGHT);
      bg.image = game.assets["background.jpg"];
      game.rootScene.addChild(bg);
      scoreLabel = new ScoreLabel(5, 5, game);
      game.rootScene.addChild(scoreLabel);
      plane = new Plane(WIDTH / 2, HEIGHT / 2, game);
      game.rootScene.addChild(plane);
      game.addSurface = function(x, y, color) {
        var addTick, point, scalePace, sprite, surface;
        surface = new Surface(50, 50);
        surface.drawCircle(25, 25, 5, color);
        sprite = new Sprite(50, 50);
        point = 50;
        scalePace = 0.08;
        addTick = 1;
        sprite.image = surface;
        sprite.x = x;
        sprite.y = y;
        game.rootScene.addChild(sprite);
        if (color === "blue") {
          point *= 3;
          scalePace *= 2;
          addTick *= 2;
        } else if (color === "green") {
          point *= 5;
          scalePace *= 3;
          addTick *= 3;
        }
        sprite.tick = 0;
        return sprite.addEventListener(Event.ENTER_FRAME, function() {
          sprite.tick += addTick;
          sprite.scaleX += scalePace;
          sprite.scaleY += scalePace;
          if (sprite.tick > 50) {
            if (getLength(sprite.x, sprite.y, plane.x, plane.y) < 50) {
              scoreLabel.add(point - Math.floor(getLength(sprite.x, sprite.y, plane.x, plane.y)));
            }
            game.rootScene.removeChild(sprite);
            return deleteRings++;
          }
        });
      };
      game.rootScene.addEventListener("touchstart", function(e) {
        if (getLength(e.x, e.y, plane.x, plane.y) < 35) {
          plane.x = e.x - 16;
          return plane.y = e.y - 16;
        }
      });
      game.rootScene.addEventListener("touchend", function(e) {
        if (getLength(e.x, e.y, plane.x, plane.y) < 35) {
          plane.x = e.x - 16;
          return plane.y = e.y - 16;
        }
      });
      game.rootScene.addEventListener("touchmove", function(e) {
        if (getLength(e.x, e.y, plane.x, plane.y) < 35) {
          plane.x = e.x - 16;
          return plane.y = e.y - 16;
        }
      });
      return game.rootScene.addEventListener(Event.ENTER_FRAME, function() {
        game.tick++;
        if (game.tick % 32 === 0 && createRings < 30) {
          createRings++;
          game.addSurface(rand(220), rand(220), "red");
          if (createRings % 5 === 0) {
            return game.addSurface(rand(200), rand(200), "blue");
          } else {
            if (createRings % 12 === 0) {
              return game.addSurface(rand(200), rand(200), "green");
            }
          }
        }
      });
    };
    return game.start();
  };

}).call(this);
