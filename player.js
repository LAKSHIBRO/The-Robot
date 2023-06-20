import { Idle, Run, Jump, Fall, Rolling , Diving , Hit} from "./states.js";
import { CollisionAnnimation } from "./collisionAnnimation.js";

export class Player{
    constructor(game){
        this.game = game;
        this.width = 142;
        this.height = 95;
        this.x = 0;
        this.y = this.game.height - this.height - this.game.groundMargin;
        this.vy = 0;
        this.weight = 1;
        this.image = document.getElementById('player');
        this.frameX = 0;
        this.frameY = 0;
        this.maxFrame = 5;
        this.fps = 30;
        this.frameInterval = 1000/this.fps;
        this.frameTimer = 0;
        this.speed = 0;
        this.maxSpeed = 10;
        this.states = [new Idle(this.game), new Run(this.game), new Jump(this.game), new Fall(this.game), new Rolling(this.game), new Diving(this.game), new Hit(this.game)];
        
    }
    update(input, deltaTime){
        this.checkCollision();
        this.currentState.hanle(input);
        //hor move
        this.x +=this.speed;
        if (input.includes('ArrowRight') && this.currentState !== this.states[6]) this.speed = this.maxSpeed;
        else if (input.includes('ArrowLeft')) this.speed = -this.maxSpeed;
        else this.speed = 0;
        //hor bound
        if (this.x < 0) this.x = 0;
        if (this.x > this.game.width - this.width) this.x = this.game.width - this.width;
        //ver move
        this.y += this.vy;
        if (!this.onGround()) this.vy += this.weight;
        else this.vy = 0;
        //ver bound
        if (this.y > this.game.height - this.height -this.game.groundMargin) this.y = 
        this.game.height - this.height - this.game.groundMargin;
        //animation
        if (this.frameTimer > this.frameInterval){
            this.frameTimer = 0;
            if (this.frameX < this.maxFrame) this.frameX++;
            else this.frameX = 0;
        } else {
            this.frameTimer += deltaTime;
        }
    }
    draw(context){
        if(this.game.debug) context.strokeRect(this.x, this.y, this.width, this.height);
        context.drawImage(this.image, this.width*this.frameX, this.height*this.frameY, this.width, this.height, this.x, this.y, this.width, this.height);

    }
    onGround(){
        return this.y >= this.game.height - this.height - this.game.groundMargin; 
    }
    setState(state, speed){
        this.currentState = this.states[state];
        this.game.speed = this.game.maxSpeed * speed;
        this.currentState.enter();
    }
    checkCollision(){
        this.game.enemies.forEach(enemy => {
            if (
                enemy.x < this.x + this.width &&
                enemy.x + enemy.width > this.x &&
                enemy.y < this.y + this.height &&
                enemy.y + enemy.height > this.y
            ){
                enemy.markedForDeletion = true;
                this.game.collisions.push(new CollisionAnnimation(this.game, enemy.x +
                    enemy.width * 0.5, enemy.y + enemy.height * 0.5));
                if (this.currentState === this.states[4] || this.currentState === this.states[5]) {
                    this.game.score++;
                } else {
                    this.setState(6, 0);
                }
                
            } 
        });
        }
    
}