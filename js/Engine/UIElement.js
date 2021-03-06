
// Cannot be clicked, controlled with arrow keys
function Button(initX, initY, image, callback, config) {

    const UI_FLASH_INTERVAL = 200; // was 1000 but the flash felt too slow

    let x = initX;
    let y = initY;
    this.image = image;
    this.callback = callback; //define callback anonymously, or elsewhere if more complicated

    let width;
    let height;

    if (typeof config === "undefined") {
        config = {};
    }

    this.hasFocus = false;

    this.canHaveFocus = true;

    this.unavailable = config.unavailable || false; //true => greyed out, example load game when no save data


    this.draw = function () {

        width = this.image.width;
        height = this.image.height;
        if (width === 0 || height === 0) { return; } //something is horribly wrong here (I'm scared)

        if (this.unavailable === true) {
            tintCanvas.width = width;
            tintCanvas.height = height;

            tintContext.drawImage(this.image, 0, 0, width, height);
            tintContext.globalCompositeOperation = "source-atop";
            tintContext.fillStyle = "rgba(0,0,0,0.65)";
            tintContext.fillRect(0, 0, tintCanvas.width, tintCanvas.height);
            tintContext.globalCompositeOperation = "source-over";
            canvasContext.drawImage(tintCanvas, x - width / 2, y - height / 2, width, height);
        }

        else {
            if (this.hasFocus) {
                width *= 1.2;
                height *= 1.2;
                // This does the linking selection on start menu
                if (now % (2 * UI_FLASH_INTERVAL) <= (1 * UI_FLASH_INTERVAL)) {
                    canvasContext.drawImage(this.image, x - width / 2, y - height / 2, width, height);
                }
            } else {
                canvasContext.drawImage(this.image, x - width / 2, y - height / 2, width, height);
            }
        }

    }


    this.getX = function () {
        return x;
    }
    this.getY = function () {
        return y;
    }
    this.setX = function (newX) {
        x = newX;
    }
    this.setY = function (newY) {
        y = newY;
    }
};
////////////////////////////////////////////////////////////////////////////////////////////

// This is just like an image, except x,y is TOP LEFT CORNER!
function UITextImage(initX, initY, image) {

    let x = initX;
    let y = initY;
    let endX = x + 200;
    let endY = y + 200;
    let movementRate = 2;
    this.image = image;
    this.canHaveFocus = false;

    this.draw = function (alpha) {

        width = this.image.width;
        height = this.image.height;
        if (width === 0 || height === 0) { return; } //something is horribly wrong here (I'm scared)

        if (typeof alpha != "undefined") {
            drawImageAlpha(this.image, x, y, width, height, alpha);
        }
        else { canvasContext.drawImage(this.image, x, y, width, height); }

    }

    this.drawAlpha = function (alpha) {

    }

    this.updateTween = function () {
        if (x < endX && y < endY) {
            x += movementRate;
            y += movementRate;
        }
    }

    this.getX = function () {
        return x;
    }
    this.getY = function () {
        return y;
    }
    this.setX = function (newX) {
        x = newX;
    }
    this.setY = function (newY) {
        y = newY;
    }
}

