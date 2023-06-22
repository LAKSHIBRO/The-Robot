import { Dust, Fire, Splash } from "./particles.js";

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
    constructor(state, game){
        this.state = state;
        this.game = game;
    }
}

export class Idle extends State {
    constructor(game){
        super('IDLE', game);
    }
    enter(){
        this.game.player.frameX = 0;
        this.game.player.maxFrame = 10;
        this.game.player.frameY = 5; 
    }
    hanle(input){
        if (input.includes('ArrowLeft') || input.includes('ArrowRight')) {
            this.game.player.setState(states.RUN, 1);
        } else if (input.includes('Enter') && this.game.rollable){
            this.game.player.setState(states.ROLLING, 2);
        }
    }
}

export class Run extends State {
    constructor(game){
        super('RUN', game);
    }
    enter(){
        this.game.player.frameX = 0;
        this.game.player.maxFrame = 12;
        this.game.player.frameY = 3;
        
    }
    hanle(input){
        this.game.particles.unshift(new Dust(this.game, this.game.player.x + this.game.player.width * 0.65, this.game.player.y + this.game.player.height));
        if (input.includes('ArrowDown')) {
            this.game.player.setState(states.IDLE, 0);
        } else if (input.includes('ArrowUp')){
            this.game.player.setState(states.JUMP, 1);
        } else if (input.includes('Enter') && this.game.rollable){
            this.game.player.setState(states.ROLLING, 2); 
        }
    }   
}
export class Jump extends State {
    constructor(game){
        super('JUMP', game);
    }
    enter(){
        if (this.game.player.onGround()) this.game.player.vy -= 27;
        this.game.player.frameX = 0;
        this.game.player.maxFrame = 10;
        this.game.player.frameY = 1;
    }
    hanle(input){
        if (this.game.player.vy > this.game.player.weight) {
            this.game.player.setState(states.FALL, 1);
        }else if (input.includes('Enter') && this.game.rollable){
            this.game.player.setState(states.ROLLING, 2);
        }else if (input.includes('ArrowDown')){
            this.game.player.setState(states.DIVING, 0);
        }
    }
}

export class Fall extends State {
    constructor(game){
        super('FALL', game);
    }
    enter(){
        this.game.player.frameX = 0;
        this.game.player.maxFrame = 10;
        this.game.player.frameY = 2;
    }
    hanle(input){
        if (this.game.player.onGround()) {
            this.game.player.setState(states.RUN, 1);
        }else if (input.includes('ArrowDown')){
            this.game.player.setState(states.DIVING, 0);
        }
    }
}

export class Rolling extends State {
    constructor(game){
        super('ROLLING', game);
    }
    enter(){
        this.game.player.frameX = 0;
        this.game.player.maxFrame = 8;
        this.game.player.frameY = 6;
    }
    hanle(input){
        this.game.particles.unshift(new Fire(this.game, this.game.player.x + this.game.player.width * 0.5, this.game.player.y + this.game.player.height * 0.5));
        if (!input.includes('Enter') && this.game.player.onGround()) {
            this.game.player.setState(states.RUN, 1);
        } else if (!input.includes('Enter') && !this.game.player.onGround()) {
            this.game.player.setState(states.FALL, 1);
        }else if (input.includes('Enter') && input.includes('ArrowUp') && this.game.player.onGround()) {
            this.game.player.vy -= 27;
        }else if (input.includes('ArrowDown') && !this.game.player.onGround()){
            this.game.player.setState(states.DIVING, 0);
        }
    }
}

export class Diving extends State {
    constructor(game){
        super('DIVING', game);
    }
    enter(){
        this.game.player.frameX = 0;
        this.game.player.maxFrame = 8;
        this.game.player.frameY = 6;
        this.game.player.vy = 15;
    }

    hanle(input){
        this.game.particles.unshift(new Fire(this.game, this.game.player.x + this.game.player.width * 0.5, this.game.player.y + this.game.player.height * 0.5));
        if (this.game.player.onGround()) {
            this.game.player.setState(states.RUN, 1);
            for (let i = 0; i < 30; i++) {
                this.game.particles.unshift(new Splash(this.game, this.game.player.x + this.game.player.width * 0.5, this.game.player.y + this.game.player.height * 0.5));            
            }    
        } else if (input.includes('Enter') && this.game.player.onGround() && this.game.rollable) {
            this.game.player.setState(states.ROLLING, 2);
        }
    }
}

export class Hit extends State {
    constructor(game){
        super('HIT', game);
    }
    enter(){
        this.game.player.frameX = 0;
        this.game.player.maxFrame = 19;
        this.game.player.frameY = 4;
    }
    hanle(input){
        if (this.game.player.frameX >= 10 && this.game.player.onGround()) {
            this.game.player.setState(states.RUN, 1);   
        } else if (this.game.player.frameX >= 10 && !this.game.player.onGround()) {
            this.game.player.setState(states.FALL, 1);
        }
    }
}