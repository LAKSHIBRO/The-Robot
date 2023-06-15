const states = {
    IDLE: 0,
    RUN: 1,
    JUMP: 2,
    FALL: 3
}

class State {
    constructor(state){
        this.state = state;
    }
}

export class Idle extends State {
    constructor(player){
        super('IDLE');
        this.player = player;
    }
    enter(){
        this.player.framey = 5;
        this.maxFrame = 4;
    }
    hanle(input){
        if (input.includes('ArrowLeft') || input.includes('ArrowRight')) {
            this.player.setState(states.RUN);
        }
    }
}

export class Run extends State {
    constructor(player){
        super('RUN');
        this.player = player;
    }
    enter(){
        this.maxFrame = 10;
        this.player.framey = 3;
        
    }
    hanle(input){
        if (input.includes('ArrowDown')) {
            this.player.setState(states.IDLE);
        } else if (input.includes('ArrowUp'))
            this.player.setState(states.JUMP);
    }
}
export class Jump extends State {
    constructor(player){
        super('JUMP');
        this.player = player;
    }
    enter(){
        if (this.player.onGround()) this.player.vy -= 27;
        this.maxFrame = 10;
        this.player.framey = 1;
    }
    hanle(input){
        if (this.player.vy > this.player.weight) {
            this.player.setState(states.FALL);
        }
    }
}

export class Fall extends State {
    constructor(player){
        super('FALL');
        this.player = player;
    }
    enter(){
        this.maxFrame = 10;
        this.player.framey = 2;
    }
    hanle(input){
        if (this.player.onGround()) {
            this.player.setState(states.RUN);
        }
    }
}