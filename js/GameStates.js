
var baseState = new State();

function InGameState() {

    var justEntered; //hackity hack


    //this.background = Images.getImage("moonlitForest");
    let arrowImage = Images.getImage("sliceArrow");

    this.currentLevel;

    this.update = function () {

        this.currentLevel._tickAndSpawnIfNeeded();
        updateAllCharacters();
        updateAllEmitters();

        resolveAllCollisions();
        justEntered = false;

    };

    this.handleInput = function () {
        if (Input.getKeyDown("q")) {
            debug = !debug;
        }
        if (Input.getKeyDown("p")) {
            return GameStates.pauseState;
        }
    };

    this.draw = function () {

        if (justEntered) { return; }

        canvasContext.clearRect(0, 0, canvas.width, canvas.height);
        canvasContext.drawImage(this.currentLevel.background, 0, 0, canvas.width, canvas.height);
        
        drawAllCharacters();
        drawAllTerrain();
        ParticleRenderer.renderAll(canvasContext); //for now, we draw our particles on top. prob will be expanded later in the project
        this.drawSliceArrows();
    }

    this.enter = function () {
        justEntered = true;

        if (currentMusic.getPaused() === true) {
            startAudio();
        }


    };

    this.exit = function () {
    };

    this.drawSliceArrows = function () {

        let drawXMiddle = 120;
        let drawYMiddle = 36;
        let drawYUpper = 15;
        let drawXMiddleDist = 35; // absolute x distance from vertical arrow
        let drawYLower = 56;

        if (sliceEncoding[0] === -1) {

            drawBitmapWithRotation(arrowImage, drawXMiddle, drawYUpper, Math.PI / 2);

        } else if (sliceEncoding[0] === 1) {

            drawBitmapWithRotation(arrowImage, drawXMiddle, drawYLower, -Math.PI / 2);
        }

        if (sliceEncoding[1] === -1) {
            drawBitmapWithRotation(arrowImage, drawXMiddle - drawXMiddleDist, drawYMiddle, Math.PI);
        } else if (sliceEncoding[1] === 1) {
            drawBitmapWithRotation(arrowImage, drawXMiddle + drawXMiddleDist, drawYMiddle, 0);
        }

    }

};
InGameState.prototype = baseState;

function PauseState() {

    this.background = Images.getImage("moonlitForest");
    var gamePausedText = Images.getImage("gamePaused");

    this.update = function () {
    };

    this.handleInput = function () {
        if (Input.getKeyDown("p")) {
            return GameStates.inGameState;
        }
        if (Input.getKeyDown("escape")) {
            return GameStates.mainMenuState;
        }
    };

    this.draw = function () {
        canvasContext.clearRect(0, 0, canvas.width, canvas.height);
        canvasContext.drawImage(this.background, 0, 0, canvas.width, canvas.height);
        drawAllCharacters();
        drawAllTerrain();
        ParticleRenderer.renderAll(canvasContext);
        colorRectAlpha(0, 0, canvas.width, canvas.height, [0, 0, 0, 0.65]);
        canvasContext.drawImage(gamePausedText, 0, 35);
    };

    this.enter = function () {
        pauseAudio();
    };

    this.exit = function () {
        resumeAudio();
    };
}
PauseState.prototype = baseState;

/////////////////////////////////////////////////////////////////////////////////////////////////

function MainMenuState() {

    this.background = Images.getImage("mainMenu_ver2");

    this.uiElements = [
        new Button(180, 30, Images.getImage("startGame"), function () { return GameStates.inGameState; }),
        new Button(180, 50, Images.getImage("loadGame"), function () { console.log("load game") }, { unavailable: true }),
        new Button(180, 70, Images.getImage("options"), function () { console.log("load game") }, { unavailable: true }),
        new Button(180, 90, Images.getImage("credits"), function () { return GameStates.creditsState; }),
        new UITextImage(-200, -200, Images.getImage("arca")),
        new UITextImage(-200, -160, Images.getImage("ninja")),
        new UITextImage(-200, -110, Images.getImage("droid")),
        new UITextImage(-200, -80, Images.getImage("kitty"))
    ];

    let currentFocus = 0;
    this.uiElements[currentFocus].hasFocus = true;

    this.update = function () {
        for (var i = 4, l = this.uiElements.length; i < l; i++) {
            if (this.uiElements[i].updateTween) {
                this.uiElements[i].updateTween();
            }
        }
    };

    this.handleInput = function () {
        if (Input.getKeyDown("enter") ||
            Input.getKeyDown("space") ||    // allow an alternate input
            Input.getKeyDown("z")) {        // allow gamepads to use attack button

            if (this.uiElements[currentFocus].callback) {
                state = this.uiElements[currentFocus].callback();
                if (state) {
                    return state;
                }
            }
        }
        if (Input.getKeyDown("up")) {

            this.changeFocus("up");
        }
        else if (Input.getKeyDown("down")) {

            this.changeFocus("down");
        }
    };

    this.changeFocus = function (direction) {

        this.uiElements[currentFocus].hasFocus = false; //remove focus from current
        if (direction === "up") {
            currentFocus--;
            if (currentFocus < 0) {
                currentFocus = this.uiElements.length - 1;
            }
        } else if (direction === "down") {
            currentFocus++;
            if (currentFocus >= this.uiElements.length) {
                currentFocus = 0;
            }
        }
        if (this.uiElements[currentFocus].unavailable === true || this.uiElements[currentFocus].canHaveFocus === false) {
            this.changeFocus(direction); //endless loop if nothing is selectable, but won't happen...
        }
        else {
            this.uiElements[currentFocus].hasFocus = true; //give focus to new
        }
    }

    this.draw = function () {
        canvasContext.clearRect(0, 0, canvas.width, canvas.height);
        canvasContext.drawImage(this.background, 0, 0, canvas.width, canvas.height);
        for (var i = 0, l = this.uiElements.length; i < l; i++) {
            this.uiElements[i].draw();
        }
        ParticleRenderer.renderAll(canvasContext);
    };

    this.enter = function () {

        this.uiElements[currentFocus].hasFocus = true;
    };

    this.exit = function () {

    };
}
MainMenuState.prototype = baseState;

/////////////////////////////////////////////////////////////////////////////////////////////////

function CreditsState() {

    this.background = Images.getImage("creditsScreen");


    let lockonX = 5;
    let lockonY = 35;
    let nextDistance = ORIG_WORLD_W;


    let scrollSpeed = 1;
    let timer = 0;
    let scrollDuration = (nextDistance / scrollSpeed) / 60; // because we're at 60 FPS
    let scrollWait = 2;
    let waiting = true;
    let nameCounter = 0;

    this.uiElements = [];
    let names = ["remy", "christer", "jaime", "stebs", "misha", "baris", "ashleeTrenton", "gamkedo"];
    for (var i = 0, l = names.length; i < l; i++) {
        this.uiElements[i] = new UITextImage(lockonX + nextDistance * i, lockonY, Images.getImage(names[i]));
    }

    this.update = function () {

        if (!waiting) {
            let currentX;
            for (var i = 0, l = this.uiElements.length; i < l; i++) {
                currentX = this.uiElements[i].getX();
                this.uiElements[i].setX(currentX - scrollSpeed);
            }
        }

        timer += dt;

        if (waiting) {
            if (timer >= scrollWait) {
                timer = 0;
                waiting = false;
            }
        } else {
            if (timer >= scrollDuration) {
                timer = 0;
                waiting = true;
                nameCounter++;
            }
        }
        if (nameCounter === this.uiElements.length - 1) {
            waiting = true; //permalock in wait when we're done scrolling
        }

    };

    this.handleInput = function () {

        if (Input.getKeyDown("enter") || Input.getKeyDown("escape")) {
            return GameStates.mainMenuState;
        }

    };

    this.draw = function () {
        canvasContext.clearRect(0, 0, canvas.width, canvas.height);
        canvasContext.drawImage(this.background, 0, 0, canvas.width, canvas.height);
        for (var i = 0, l = this.uiElements.length; i < l; i++) {
            this.uiElements[i].draw();
        }
        //ParticleRenderer.renderAll(canvasContext);
    };

    this.resetText = function () {
        for (var i = 0, l = this.uiElements.length; i < l; i++) {
            this.uiElements[i].setX(lockonX + nextDistance * i);
            this.uiElements[i].setY(lockonY);
        }
    }

    this.enter = function () {
        timer = 0;
        nameCounter = 0;
        waiting = true;

    };

    this.exit = function () {
        this.resetText();
    };
}
CreditsState.prototype = baseState;


var GameStates = {
    inGameState: new InGameState(),
    mainMenuState: new MainMenuState(),
    creditsState: new CreditsState(),
    pauseState: new PauseState()
};

var GameStateMachine = new StateMachine(GameStates.mainMenuState);
