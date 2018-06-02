
function IdleEnemyState(parent,relatedStates) {
    var parent = parent;
    var states = relatedStates;

    this.animation = new Animation(parent, Images.getImage("PH_Android_Idle"), androidIdleData, {loop : true});
    
    this.update = function () {

        parent.x += parent.velocity.x;
        parent.y += parent.velocity.y;

        parent.velocity.y += 0.75;

        parent.velocity.x *= 0.85;
        parent.velocity.y *= 0.85;
        if (Math.abs(parent.velocity.x) < 0.1) parent.velocity.x = 0;
        if (Math.abs(parent.velocity.y) < 0.1) parent.velocity.y = 0;

    }

    this.handleInput = function () {

    }

    this.enter = function () {
    }
    this.exit = function () {
    }
}
IdleEnemyState.prototype = baseState;

// parent must be a Character
function EnemyStates(parent) {

    // Might refactor?
    this.idleState = new IdleEnemyState(parent,this);


    this.initial = this.idleState;
}