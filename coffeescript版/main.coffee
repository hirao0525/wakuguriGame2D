
# create random number

# calculate coordinate langth
getLength = (x1, y1, x2, y2) ->
  Math.sqrt Math.pow(x2 - x1, 2.0) + Math.pow(y2 - y1, 2.0)
enchant()
HEIGHT = 320
WIDTH = 320
rand = (num) ->
  Math.floor Math.random() * num


# add drow circle method to surface
Surface::drawCircle = (x, y, r, color) ->
  @context.beginPath()
  @context.strokeStyle = color
  @context.arc x, y, r, 0, Math.PI * 2, true
  @context.stroke()


# inheritance Sprite class
Plane = Class.create(Sprite,
  initialize: (x, y, game) ->
    
    # call Sprite class constractor
    enchant.Sprite.call this, 32, 32
    @image = game.assets["chara1.gif"]
    @x = x
    @y = y
    @frame = 0
)

# ScoreLabel class define
# inheritance label class
ScoreLabel = Class.create(Label,
  initialize: (x, y, game) ->
    
    # call label class constractor
    enchant.Label.call this, "SCORE: 0"
    @x = x
    @y = y
    @score = 0

  
  # add score
  add: (pts) ->
    @score += pts
    
    # fix score label
    @text = "SCORE: " + @score
)

# game main 
window.onload = ->
  game = new Game(WIDTH, HEIGHT)
  
  # load image droid
  game.preload "chara1.gif", "background.jpg"
  game.tick = 0
  game.fps = 16
  createRings = 0
  deleteRings = 0
  game.onload = ->
    
    # create background
    bg = new Sprite(WIDTH, HEIGHT)
    bg.image = game.assets["background.jpg"]
    game.rootScene.addChild bg
    
    # print score label
    scoreLabel = new ScoreLabel(5, 5, game)
    game.rootScene.addChild scoreLabel
    
    # create plane
    plane = new Plane(WIDTH / 2, HEIGHT / 2, game)
    game.rootScene.addChild plane
    game.addSurface = (x, y, color) ->
      
      # create surface
      surface = new Surface(50, 50)
      surface.drawCircle 25, 25, 5, color
      sprite = new Sprite(50, 50)
      point = 50
      scalePace = 0.08
      addTick = 1
      sprite.image = surface
      sprite.x = x
      sprite.y = y
      game.rootScene.addChild sprite
      if color is "blue"
        point *= 3
        scalePace *= 2
        addTick *= 2
      else if color is "green"
        point *= 5
        scalePace *= 3
        addTick *= 3
      
      # sprite processing
      sprite.tick = 0
      sprite.addEventListener Event.ENTER_FRAME, ->
        sprite.tick += addTick
        sprite.scaleX += scalePace
        sprite.scaleY += scalePace
        if sprite.tick > 50
          scoreLabel.add point - Math.floor(getLength(sprite.x, sprite.y, plane.x, plane.y))  if getLength(sprite.x, sprite.y, plane.x, plane.y) < 50
          game.rootScene.removeChild sprite
          deleteRings++


    game.rootScene.addEventListener "touchstart", (e) ->
      if getLength(e.x, e.y, plane.x, plane.y) < 35
        plane.x = e.x - 16
        plane.y = e.y - 16

    game.rootScene.addEventListener "touchend", (e) ->
      if getLength(e.x, e.y, plane.x, plane.y) < 35
        plane.x = e.x - 16
        plane.y = e.y - 16

    game.rootScene.addEventListener "touchmove", (e) ->
      if getLength(e.x, e.y, plane.x, plane.y) < 35
        plane.x = e.x - 16
        plane.y = e.y - 16

    game.rootScene.addEventListener Event.ENTER_FRAME, ->
      
      # create ring
      game.tick++
      if game.tick % 32 is 0 and createRings < 30
        createRings++
        game.addSurface rand(220), rand(220), "red"
        if createRings % 5 is 0
          game.addSurface rand(200), rand(200), "blue"
        else game.addSurface rand(200), rand(200), "green"  if createRings % 12 is 0


  game.start()