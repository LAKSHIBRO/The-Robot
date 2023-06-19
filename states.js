const states = {
    IDLE: 0,
    RUN: 1,
    JUMP: 2,
    FALL: 3,
    ROLLING: 4,
    DIVING: 5,
    HIT: 6
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
        this.player.frameX = 0;
        this.player.maxFrame = 10;
        this.player.frameY = 5;
        
    }
    hanle(input){
        if (input.includes('ArrowLeft') || input.includes('ArrowRight')) {
            this.player.setState(states.RUN, 1);
        } else if (input.includes('Enter')){
            this.player.setState(states.ROLLING, 2);
        }
    }
}

export class Run extends State {
    constructor(player){
        super('RUN');
        this.player = player;
    }
    enter(){
        this.player.frameX = 0;
        this.player.maxFrame = 12;
        this.player.frameY = 3;
        
    }
    hanle(input){
        if (input.includes('ArrowDown')) {
            this.player.setState(states.IDLE, 0);
        } else if (input.includes('ArrowUp')){
            this.player.setState(states.JUMP, 1);
        } else if (input.includes('Enter')){
            this.player.setState(states.ROLLING, 2);
        }
    }   
}
export class Jump extends State {
    constructor(player){
        super('JUMP');
        this.player = player;
    }
    enter(){
        if (this.player.onGround()) this.player.vy -= 27;
        this.player.frameX = 0;
        this.player.maxFrame = 10;
        this.player.frameY = 1;
    }
    hanle(input){
        if (this.player.vy > this.player.weight) {
            this.player.setState(states.FALL, 1);
        }else if (input.includes('Enter')){
            this.player.setState(states.ROLLING, 2);
        }
    }
}

export class Fall extends State {
    constructor(player){
        super('FALL');
        this.player = player;
    }
    enter(){
        this.player.frameX = 0;
        this.player.maxFrame = 10;
        this.player.frameY = 2;
    }
    hanle(input){
        if (this.player.onGround()) {
            this.player.setState(states.RUN, 1);
        }
    }
}

export class Rolling extends State {
    constructor(player){
        super('ROLLING');
        this.player = player;
    }
    enter(){
        this.player.frameX = 0;
        this.player.maxFrame = 8;
        this.player.frameY = 6;
    }
    hanle(input){
        if (!input.includes('Enter') && this.player.onGround()) {
            this.player.setState(states.RUN, 1);
        } else if (!input.includes('Enter') && !this.player.onGround()) {
            this.player.setState(states.FALL, 1);
        }else if (input.includes('Enter') && input.includes('ArrowUp') && this.player.onGround()) {
            this.player.vy -= 27;
        }
    }
}