
// New and improved animation module. Uses JSON files generated by Aseprite (pixel art program) to generate animations and colliders.
// If you don't use Aseprite, that's totally fine! Simply hand me whatever you made and I will export it appropriately! :)
// Made by your project lead, yours truly, Remy L.

// Do note that:
// - Animations go hand in hand with the State Machine pattern. Characters have state machines that look at anims to determine their behaviours.
// - Animations contain hitbox and hurtbox data, which are drawn in Aseprite and included in the JSON data. This is only for size and position; the details (like, if it's a punch or a kick) are handled elsewhere (dunno where yet haha)
// - There is no Spritesheet class; it's all in the JSON data as well

// As will all the modules in Arcaninjadroid, don't hesitate to contact me if you need help or want a walkthrough of the implementation! :)

function Animation (parent, image, data, config) {

    this.isActive = true; //left public for simplicity of get/set

    var parent = parent;

    var currentFrameNum = 0; // index of the frame to be drawn
    var timeCounter = 0; //keeps track of time passage and updates current frame

    if (!config) {config = {};} //needed so that config doesn't stay undefined
    var loop = config.loop || false; //take from config, or set default value

    // holdLastFrame is for example, an uppercut where the character stays at the final frame until he hits the ground
    var holdLastFrame = config.holdLastFrame || false; // if true, we will need to change player state with something other than the end of the anim (like a ground check)
    var holding = false; //are we currently holding the last frame?

    // I'm still unsure as to whether we will support anims with no data, or if data will be required even for single sprites
    if (data) {
        var frameCount = data.frames.length;
        var nextTimeStamp = data.frames[currentFrameNum].duration/1000; //original duration in MS
    }

    else {
        var frameCount = 1; //we assume it's just single sprite
    }

    // we want to hold the last frame because there's only one frame
    if (frameCount === 1){
        holdLastFrame = true;
        holding = true;
    };

    // Save clip values and update when we change frame
    var clipStartX = 0;
    var clipStartY = 0;
    
    if (data) {
        var clipWidth = data.frames[currentFrameNum].frame.w;
        var clipHeight = data.frames[currentFrameNum].frame.h;
    }

    // 2D array: all frames, each with an array of all boxes
    var hitboxes = [];
    var hurtboxes = [];


    // Call this every frame, updates the current frame of animation
    this.update = function () {

        if (this.isActive === false || holding) {
            return;
        }

        timeCounter += dt; //in seconds just like everything else that includes dt

        // Check if our anim is over, and either reset it or terminate it if needed
        if (timeCounter > nextTimeStamp) {

            //Switch to next frame
            if (currentFrameNum < frameCount-1) {
                
                currentFrameNum++;
                timeCounter = 0;
                nextTimeStamp = data.frames[currentFrameNum].duration/1000; // converted in seconds

                clipStartX = data.frames[currentFrameNum].frame.x;
                clipStartY = data.frames[currentFrameNum].frame.y;
                
            }

            // We have no more frames; handle animation end
            else {
                if (loop){                   
                    this.loop();
                }
                else if (holdLastFrame) {
                    holding = true;
                }
                else {
                    this.isActive = false;
                }
            }
        }
    }

    this.draw = function () {

        if (this.isActive === false) {
            console.log("Tried to draw inactive animation!");
            return;
        }
        if (data) {
            var clipWidth = data.frames[currentFrameNum].frame.w;
            var clipHeight = data.frames[currentFrameNum].frame.h;

        } else {
            var clipWidth = image.width; //image.width or height cannot be read at init, since image isn't loaded and the values are 0! (hence why their are read here and not above)
            var clipHeight = image.height;
        }       
        var x = parent.x;
        var y = parent.y;
        var flipped = parent.flipped;

        // Remember that x,y is center of the object in the game's coord system
        /*canvasContext.drawImage(image,
                                clipStartX,clipStartY, clipWidth, clipHeight, 
                                x-clipWidth/2,y-clipHeight/2, clipWidth, clipHeight);*/
        drawBitmapClippedWithRotationAndFlip(image, x,y, clipStartX,clipStartY, clipWidth,clipHeight, 0, parent.flipped);
    }

    // Used for debug (and training mode maybe? :D)
    // Simple loop over all boxes and draw
    this.drawColliders = function () {
        if (this.isActive === false) {
            return;
        }
        for (var j = 0, k = hurtboxes[currentFrameNum].length; j < k; j++){
            hurtboxes[currentFrameNum][j].draw();
        }
        for (var j = 0, k = hitboxes[currentFrameNum].length; j < k; j++){
            hitboxes[currentFrameNum][j].draw();
        }
    }

    // Reset all values
    this.loop = function () {
        currentFrameNum = 0;
        timeCounter = 0;
        if (data){
            nextTimeStamp = data.frames[currentFrameNum].duration/1000;
            clipStartX = data.frames[currentFrameNum].frame.x;
            clipStartY = data.frames[currentFrameNum].frame.y;
        }

        this.isActive = true;
        holding = false;
    }

    this.getcurrentFrameNumNumber = function () {
        return currentFrameNum;
    }

    // Generates the hitbox/hurtbox colliders by reading the JSON animation data. Called once, at init.
    this.loadColliders = function () {

        if (!data) {return;} //to change

        var slices = data.meta.slices;

        //Fill with empty arrays so we can push
        for (var i = 0, l = frameCount; i < l; i++) {
            hitboxes[i] = [];
            hurtboxes[i] = [];
        }
        // Loop over all slices
        for (var i = 0, l = slices.length; i < l; i++) {

            // loop over all frames of a given slice
            for (var j = 0, k = slices[i].keys.length; j < k; j++){

                var sliceKey = slices[i].keys[j];
                var frame = slices[i].keys[j].frame;

                var config = {
                    offsetX: sliceKey.bounds.x - (data.frames[frame].sourceSize.w - sliceKey.bounds.w)/2, // drawing out this logic is left as an exercise to the reader
                    offsetY: sliceKey.bounds.y - (data.frames[frame].sourceSize.h - sliceKey.bounds.h)/2,
                    isTrigger: true,
                    color: slices[i].color
                }

                if (slices[i].name === "Hit"){
                    hitboxes[frame].push(new RectCollider(parent, sliceKey.bounds.w,sliceKey.bounds.h, config));

                } else if (slices[i].name === "Hurt"){
                    hurtboxes[frame].push(new RectCollider(parent, sliceKey.bounds.w,sliceKey.bounds.h, config));
                } else {
                    console.log("Collider data not named Hit or Hurt, ignored...");
                }
            } // end loop over all frames of a given slice

        } // end loop over all slice
    }
    
    this.getHitboxes = function () {
        return hitboxes[currentFrameNum];
    }
    this.getHurtboxes = function () {
        return hurtboxes[currentFrameNum];
    }

    this.loadColliders(); //init at the end
}