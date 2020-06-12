class Character {
	constructor (name, level) {
		this.name = name;
		this.level = level || 1;
	}
}

class Hero extends Character {
	constructor (props) {
		super(props);
	}
}

class Monster extends Character {
	constructor (props) {
		super(props);
	}
}
