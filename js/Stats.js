const POINTS_PER_HIT = 5;
const POINTS_PER_KILL = 20;
const POINTS_PER_SLICE = 10;

//base class for HP and ATK
function StatsClass(LVL, HpMultiplier, DefMultiplier, AtkMultiplier) {
	/* the first chunk of lines are base stats for any character but they will be modified depending on the character's lvl and 
		the passed in decimal values for multiplier.
		very likely that numbers will need to be tweaked to achieve a decent balance
	*/
	this.baseHP = 300.0;
	this.hpMultiplier = HpMultiplier;
	this.maxHP = this.baseHP * this.HpMultiplier;
	this.baseDEF = 20.0;
	this.defMultiplier = DefMultiplier;
	this.baseATK = 30.0;
	this.atkMultiplier = AtkMultiplier;

	this.modifiedHP;
	this.modifiedDEF;
	this.modifiedATK;

	this.newHP;
	this.isCharacterDead = false;
	this.isThisHitTheFirstHit = false;

	this.lvl = LVL;
	this.score = 0; //note: in Arcaninjadroid, score is actually NUMBER OF KITTENS SAVED :D
	this.arcaneMeter = 50;
	this.maxArcane = 150;

	this.setStats = function () {
		this.setModifiedHP();
		this.newHP = this.modifiedHP;
		this.maxHP = this.baseHP * this.hpMultiplier;
		this.setATK();
		this.setDEF();
	}

	this.resetClass = function () {
		this.hpMultiplier = 1.0;
		this.defMultiplier = 1.0;
		this.atkMultiplier = 1.0;

		this.modifiedHP = 0;
		this.modifiedDEF = 0;
		this.modifiedATK = 0;

		this.newHP = 0;
		this.score = 0;

		this.isThisHitTheFirstHit = true;
		this.isCharacterDead = false;
	}

	//can be used with negative values too
	this.addArcanePoints = function(numPoints) {

		this.arcaneMeter += numPoints;
		if (this.arcaneMeter > this.maxArcane) {
			this.arcaneMeter = this.maxArcane;
		} else if (this.arcaneMeter < 0) {
			this.arcaneMeter = 0;
		}
	}

	//call this when the character is hit to update HP
	this.characterHasBeenHitSoCalculateNewHP = function (defenderDEF, attackerATK) {
		var netDamage = attackerATK - (defenderDEF * 0.5);
		if (this.isThisHitTheFirstHit) {
			this.newHP = this.modifiedHP - (netDamage);
			this.isThisHitTheFirstHit = false;
		}
		else {
			this.newHP -= netDamage;
		}

		if (this.newHP <= 0) {
			this.isCharacterDead = true;
			this.newHP = 0;
		}
		else {
			this.isCharacterDead = false;
		}
	}

	this.calculateModifiedStat = function (stat, multiplier) {
		return (this.lvl * stat * multiplier);
	}

	//this should get called constantly to check if the player is in a combo or not and reflect the appropriate ATK values
	this.setComboMultiplier = function (currentCombo) {
		//increases by 1/20th of the current combo value and adds it to the ATK multiplier
		var comboMultiplier = currentCombo * 0.05;
		if (currentCombo > 1) {
			this.atkMultiplier += comboMultiplier;
		}
	}

	this.getNewHP = function () {
		return this.newHP;
	}

	this.getMaxHP = function () {
		return this.baseHP * this.hpMultiplier;
	}

	this.hasModifiedHPBeenSet = false;
	this.setModifiedHP = function () {
		if (!this.hasModifiedHPBeenSet) {
			this.modifiedHP = this.calculateModifiedStat(this.baseHP, this.hpMultiplier);
			this.hasModifiedHPBeenSet = true;
		}
	}

	//this is mainly for the player to allow them to increase their HP as they level up
	this.characterGainedOrLossLvl = function () {
		this.hasModifiedHPBeenSet = false;
	}

	this.getModifiedHP = function () {
		return this.modifiedHP;
	}

	this.setDEF = function () {
		this.calculateModifiedStat(this.baseDEF, this.defMultiplier);
	}

	this.getDEF = function () {
		return this.modifiedDEF;
	}

	this.setATK = function () {
		this.calculateModifiedStat(this.baseATK, this.atkMultiplier);
	}

	this.getATK = function () {
		return this.modifiedATK;
	}
}