import { Idle, Run, Jump, Fall } from "./states.js";

export class Player{
    constructor(game){
        this.game = game;
        this.width = 100;
        this.height = 99; //91.3
        this.x = 0;
        this.y = this.game.height - this.height;
        this.vy = 0;
        this.weight = 1;
        this.image = document.getElementById('player');
        this.frameX = 0;
        this.framey = 0;
        this.maxFrame = 10;
        this.fps = 20;
        this.frameInterval = 1000/this.fps;
        this.frameTimer = 0;
        this.speed = 0;
        this.maxSpeed = 10;
        this.states = [new Idle(this), new Run(this), new Jump(this), new Fall(this)];
        this.currentState = this.states[0];
        this.currentState.enter();
    }
    update(input, deltaTime){

        this.currentState.hanle(input);

        this.x +=this.speed;
        if (input.includes('ArrowRight')) this.speed = this.maxSpeed;
        else if (input.includes('ArrowLeft')) this.speed = -this.maxSpeed;
        else this.speed = 0;
        if (this.x < 0) this.x = 0;
        if (this.x > this.game.width - this.width) this.x = this.game.width - this.width;

        this.y += this.vy;
        if (!this.onGround()) this.vy += this.weight;
        else this.vy = 0;
        //animation
        if (this.frameTimer > this.frameInterval){
            this.frameTimer = 0;
            if (this.frameX < this.maxFrame) this.frameX++;
            else this.frameX = 0;
        } else {
            this.frameTimer += deltaTime;
        }
    }
    draw(Context){
        Context.drawImage(this.image, this.width*this.frameX, this.height*this.framey, this.width, this.height, this.x, this.y, this.width, this.height);

    }
    onGround(){
        return this.y >= this.game.height - this.height; 
    }
    setState(state){
        this.currentState = this.states[state];
        this.currentState.enter();
    }
}