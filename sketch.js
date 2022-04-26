// crio as variaveis
var trex,trexRun,trexCollide
var ground,groundImage,invisibleGround
var cloudImage
var cactu1,cactu2,cactu3,cactu4,cactu5,cactu6
var points = 0
var cactuGroup
var cloudGroup
var gameState = 'gameplay'
var gameover,gameoverImage
var restart,restartImage
var jump,checkPoint,die
var screenWidth = window.innerWidth 

function reset () {
console.log ("queroreiniciaaaaaaaaaaaaaar")

trex.changeAnimation  ("joao",trexRun)

points = 0

cactuGroup.destroyEach ()

cloudGroup.destroyEach ()

restart.visible  = false

gameover.visible  = false

gameState = "gameplay"
}


function drawClouds () {
    if (frameCount%100 === 0 ) {
        var cloud = createSprite (screenWidth+100,50,50,10)
        cloud.addImage (cloudImage)
        cloud.velocityX = -3
        cloud.y = Math.round(random(10,100))
        cloud.lifetime = screenWidth
        cloudGroup.add (cloud)

        trex.depth = cloud.depth
        trex.depth = trex.depth +1

        restart.depth = cloud.depth
        restart.depth = restart.depth +1
    }
}

function drawCactus () {
    if (frameCount%200 === 0) {
        var cactus = createSprite (screenWidth+100,165,30,50)
        cactus.velocityX = - (4+points/120)
        cactus.lifetime = screenWidth
        cactus.scale = 0.8
        var type = Math.round(random(1,6))
        switch (type) {
            case 1: cactus.addImage (cactu1)
                break;
            case 2: cactus.addImage (cactu2)
                break;
            case 3: cactus.addImage (cactu3)
                break;
            case 4: cactus.addImage (cactu4)
                break;
            case 5: cactus.addImage (cactu5)
                break;
            case 6: cactus.addImage (cactu6)
                break;
        
            default:
                break;
                
        }

        cactuGroup.add (cactus)
        console.log (type)
    }

    
}     

// serve para precarregar imagens/animacoes/sons
function preload() {
    trexRun = loadAnimation ("trex1.png","trex2.png","trex3.png") 
    trexCollide = loadAnimation ("trex_collided.png")
    restartImage = loadImage ("restart.png")
    gameoverImage = loadImage ("gameOver.png")

    groundImage = loadImage ("ground2.png","ground2.png")
    cloudImage = loadImage ("cloud.png")
    cactu1 = loadImage ("obstacle1.png")
    cactu2 = loadImage ("obstacle2.png")
    cactu3 = loadImage ("obstacle3.png")
    cactu4 = loadImage ("obstacle4.png")
    cactu5 = loadImage ("obstacle5.png")
    cactu6 = loadImage ("obstacle6.png")

    jump = loadSound ("jump.mp3") 
    checkPoint = loadSound ("checkPoint.mp3")
    die = loadSound ("die.mp3")
}

// serve pra fazer a configuracao inicial (só é executada 1 vez quando o jogo começar)
function setup() {
    createCanvas(screenWidth, 200)

    trex = createSprite (50,160,20,40)
    trex.addAnimation ("joao",trexRun)
    trex.addAnimation ("pedro",trexCollide)
    trex.scale = 0.7

    ground  =  createSprite (screenWidth/2,190,screenWidth,20)
    ground.addImage (groundImage)

    invisibleGround = createSprite (screenWidth/2,200,screenWidth,10)
    invisibleGround.visible = false

    cactuGroup = new Group ()
    cloudGroup = new Group ()

    restart = createSprite (screenWidth/2,100)
    restart.addImage (restartImage)
    restart.visible = false

    gameover = createSprite (screenWidth/2,50)
    gameover.addImage (gameoverImage)
    gameover.visible = false
}

// serve para fazer o jogo funcionar o tempo todo (é executada o tempo todo, infinitamente até parar o jogo)
function draw() {
    background('white')

    if (gameState === 'gameplay') {
        points = points + Math.round(frameRate()/60 )

        if (keyDown("space") && trex.y > 35 ) {
            trex.velocityY = -5
            jump.play ()
        }

        ground.velocityX  = - (4+points/120)

        if (ground.x < 0) {
            ground.x =  ground.width/2
        }

        if (trex.isTouching (cactuGroup)) {
            die.play ()
            gameState = 'gameover'
            trex.changeAnimation ("pedro")
        }   

        if (points%500 === 0) {
            checkPoint.play ()
        }

    } else if (gameState === 'gameover') {
        ground.velocityX = 0
        cactuGroup.setVelocityXEach (0)
        cloudGroup.setVelocityXEach (0)
        cactuGroup.setLifetimeEach (-1)
        cloudGroup.setLifetimeEach (-1)
        restart.visible =  true
        gameover.visible =  true

        if (mousePressedOver(restart)) {
            reset ()
        }
    }

    text ("POINTS: " + points ,screenWidth-200,30) 
    
    trex.collide (invisibleGround)
    trex.velocityY = trex.velocityY + 0.5 

       drawClouds ()
       drawCactus ()

    drawSprites()
}
