// Particles emitters use config data when initialized. These define almost the entirety of the particle system. You can hard code some of these reusable config objects here.

// when dizzy and vulnerable to knockup uppercuts (health below a threshold)
dizzyParticlesConfig = {
    emissionRate: 20,
    size: 1,
    sizeVar: 1,
    xVar: 10,
    yVar: 10,
    color: [50, 200, 255, 0.5],
    colorVar: [150,150,150,0.1],
    endColor: [255, 255, 255, 0.0],
    endColorVar: [150,150,150,0],
    duration: 0.025,
    speed: 20,
    speedVar: 10,
    particleLife: 0.7,
    angle: 90,
    angleVar: 120,
    fadeSpeed: true,
    fadeAlpha: false,
    fadeSize: true,
    gravity: -1 // unimplemented?
}

// when stunned IN THE AIR
stunnedParticlesConfig = {
    emissionRate: 20,
    size: 1,
    sizeVar: 1,
    xVar: 4,
    yVar: 4,
    color: [255, 255, 50, 0.5],
    endColor: [255, 255, 255, 0.0],
    duration: 0.025,
    speed: 20,
    speedVar: 10,
    particleLife: 0.7,
    angle: 90,
    angleVar: 120,
    fadeSpeed: true,
    fadeAlpha: false,
    fadeSize: true,
    gravity: -1 // unimplemented?
}

gotHitParticlesConfig = {
    emissionRate: 150,
    size: 1.0,
    color: [255, 255, 100, 1.0],
    endColor: [255, 255, 100, 0.0],
    duration: 0.05,
    speed: 120,
    particleLife: 0.25,
    angle: 90,
    angleVar: 360,
    fadeSpeed: true
}

jumpDustParticlesConfig = {
    emissionRate: 200,
    size: 0.75,
    color: [170, 190, 210, 1.0],
    endColor: [150, 170, 180, 0.0],
    duration: 0.05,
    speed: 55,
    particleLife: 0.2,
    angle: 90,
    angleVar: 90,
    gravity: 2
}

landingDustParticlesConfig = {
    emissionRate: 250,
    size: 1.0,
    color: [32, 66, 88, 1.0],
    endColor: [12, 46, 68, 0.0],
    duration: 0.05,
    speed: 50,
    particleLife: 0.2,
    angle: -90,
    angleVar: 90,
    gravity: 2
}

fastFallParticlesConfig = {
    emissionRate: 200,
    size: 0.75,
    color: [255, 255, 179, 1],
    duration: 0.05,
    speed: 120,
    particleLife: 0.1
}


////////////////////////////    Arcane particles    ////////////////////////////
arcaneTrailParticlesConfig1 = {
    emissionRate: 250,
    size: 2.5,
    color: [88, 128, 204, 1],
    duration: 5,
    speed: 200,
    yVar:12,
    angle: 180,
    angleVar: 15,
    fadeSpeed: true,
    fadeSize: true,
    particleLifeVar: 0.1,
    particleLife: 0.25
}

arcaneTrailParticlesConfig2 = {
    emissionRate: 150,
    size: 2,
    color: [155, 240, 253, 1],
    duration: 5,
    speed: 100,
    xVar:8,
    yVar:8,
    angle: 0,
    angleVar: 180,
    fadeSpeed: true,
    fadeSize: true,
    particleLifeVar: 0.1,
    particleLife: 0.25
}
////////////////////////////    HP and Arcane meter effects    ////////////////////////////
hpMeterParticlesConfig = {
    emissionRate: 12,
    size: 2,
    //color: [88, 128, 204, 1],
    duration: 5,
    speed: 35,
    yVar:4,
    angle: Math.PI,
    angleVar: 1, //because 0 is interpreted as false and ignored in the particle system. Will fix when I do the system optimizations
    //fadeSpeed: true,
    fadeSize: true,
    speedVar: 15,
    sizeVar: 1,
    particleLifeVar: 0.1,
    particleLife: 0.25
}

//Same thing as hp but with blue color!!!
arcaneMeterParticlesConfig = {
    emissionRate: 12,
    size: 2,
    color: [98, 171, 212, 1],
    duration: 5,
    speed: 35,
    yVar:4,
    angle: Math.PI,
    angleVar: 1, //because 0 is interpreted as false and ignored in the particle system. Will fix when I do the system optimizations
    //fadeSpeed: true,
    fadeSize: true,
    speedVar: 15,
    sizeVar: 1,
    particleLifeVar: 0.1,
    particleLife: 0.25
}
////////////////////////////     Robot explosion     ////////////////////////////
robotExplosionParticlesConfig1 = {
    emissionRate: 200,
    size: 2.5,
    sizeVar: 1,
    color: [252, 244, 194, 1],
    endColor: [237, 70, 4, 1],
    duration: 0.1,
    speed: 175,
    speedVar: 125,
    fadeSpeed: true,
    particleLife: 0.4
}

robotExplosionParticlesConfig2 = {
    emissionRate: 50,
    texture: Images.getImage("screwParticle"),
    useTexture: true,
    duration: 0.1,
    speed: 150,
    speedVar: 75,
    fadeSpeed: true,
    particleLife: 0.4
}

robotExplosionParticlesConfig3 = {
    emissionRate: 200,
    size: 3,
    sizeVar: 0.5,
    color: [252, 244, 194, 1],
    endColor: [224, 68, 6, 0.75],
    duration: 0.35,
    speed: 55,
    speedVar: 25,
    fadeSpeed: true,
    particleLife: 0.4
}

var throughTheStarFissure = {
    "speed":400,
    "size":2.1,
    "angle":0,
    "emissionRate":2161.2,
    "duration":5,
    "immortal":false,
    "particleLife":2,
    "color":[249,
    247,
    221,
    1],
    "endColor":[253,
    244,
    87,
    1],
    "useGradient":true,
    "useTexture":false,
    "textureAdditive":false,
    "fadeAlpha":true,
    "fadeSpeed":true,
    "fadeSize":true,
    "gravity":0,
    "xVar":42.9,
    "yVar":43,
    "speedVar":150,
    "sizeVar":3.4,
    "angleVar":360,
    "particleLifeVar":0,
    "startColorVar":[0,
    0,
    0,
    0],
    "endColorVar":[0,
    0,
    0,
    0],
    "endColorToggle":true,
    "colorVarToggle":false
    }

var victoryParticle = {
    "speed":1270.4,
    "size":10,
    "angle":0,
    "emissionRate":200,
    "duration":5,
    "immortal":false,
    "particleLife":2,
    "color":[0,
    0,
    255,
    1],
    "endColor":[255,
    0,
    0,
    1],
    "useGradient":true,
    "useTexture":false,
    "textureAdditive":false,
    "fadeAlpha":true,
    "fadeSpeed":true,
    "fadeSize":true,
    "gravity":0,
    "xVar":25,
    "yVar":25,
    "speedVar":150,
    "sizeVar":2,
    "angleVar":360,
    "particleLifeVar":0,
    "startColorVar":[0,
    0,
    0,
    0],
    "endColorVar":[0,
    0,
    0,
    0],
    "endColorToggle":true,
    "colorVarToggle":false
    }

