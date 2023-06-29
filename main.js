import { Player } from "./player.js";
import { InputHandler } from "./input.js";
import { Background } from "./background.js";
import { FlyingEnemy, GroundEnemy } from "./enemies.js";
import { UI } from "./UI.js";



document.getElementById('nextButton').addEventListener('click', comic);
window.addEventListener('keydown', e => {

    if (
        e.key === ' '
    ) {
        comic();
    }



});

const page = document.getElementById('page');
let pageNumber = 0;

function comic() {
    document.getElementById('nextButton').style.display = 'none';
    document.getElementById('h1').style.display = 'none';
    pageNumber++;
    document.getElementById('back').style.display = 'none';
    document.getElementById('screen').style.display = 'none';

    page.src = 'assets/page' + pageNumber + '.png';
    if (pageNumber == 10) {
        page.style.display = 'none';
        document.getElementById('h3').style.display = 'none';
        start();
    }
}



function start() {
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 900;
    canvas.height = 500;

    class Game {
        constructor(width, height) {
            this.width = width;
            this.height = height;
            this.groundMargin = 80;
            this.speed = 0;
            this.maxSpeed = 6;
            this.background = new Background(this);
            this.player = new Player(this);
            this.input = new InputHandler(this);
            this.UI = new UI(this);
            this.enemies = [];
            this.particles = [];
            this.collisions = [];
            this.messeges = [];
            this.maxParticles = 50;
            this.enemyTimer = 0;
            this.enemyInterval = 1000;
            this.debug = false;
            this.score = 0;
            this.winningScore = 30;
            this.fontColor = 'black';
            this.time = 0;
            this.maxTime = 60000;
            this.energy = 0;
            this.reqEnergy = 5000;
            this.rollable = true;
            this.gameOver = false;
            this.lives = 5;
            this.player.currentState = this.player.states[0];
            this.player.currentState.enter();
        }
        update(deltaTime) {
            this.time += deltaTime;
            if (this.time > this.maxTime) this.gameOver = true;

            // if (!this.rollable) this.energy += deltaTime;
            // if (this.energy >= this.reqEnergy) this.rollable = true;

            this.background.update();
            this.player.update(this.input.keys, deltaTime);
            //handleenemy
            if (this.enemyTimer > this.enemyInterval) {
                this.addEnemy();
                this.enemyTimer = 0;
            } else {
                this.enemyTimer += deltaTime;
            }
            this.enemies.forEach(enemy => {
                enemy.update(deltaTime);
            });
            //handleMesseges
            this.messeges.forEach(messege => {
                messege.update();
            });

            //handlepartocles
            this.particles.forEach((particle, index) => {
                particle.update();
            });

            if (this.particles.length > this.maxParticles) {
                this.particles.length = this.maxParticles;
            }
            //console.log(this.particles);
            //handle collisions
            this.collisions.forEach((collision, index) => {
                collision.update(deltaTime);
            });
            this.enemies = this.enemies.filter(enemy => !enemy.markedForDeletion);
            this.particles = this.particles.filter(particle => !particle.markedForDeletion);
            this.collisions = this.collisions.filter(collision => !collision.markedForDeletion);
            this.messeges = this.messeges.filter(messege => !messege.markedForDeletion);
        }
        draw(context) {
            this.background.draw(context);
            this.player.draw(context);
            this.enemies.forEach(enemy => {
                enemy.draw(context);
            });
            this.particles.forEach(particle => {
                particle.draw(context);
            });
            this.collisions.forEach(collision => {
                collision.draw(context);
            });
            this.messeges.forEach(messege => {
                messege.draw(context);
            });
            this.UI.draw(context);
        }

        addEnemy() {
            if (this.speed > 0 && Math.random() < 0.5) this.enemies.push(new GroundEnemy(this));
            this.enemies.push(new FlyingEnemy(this));
        }
    }
    const game = new Game(canvas.width, canvas.height);
    let lastTime = 0;

    function animate(timeStamp) {
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.update(deltaTime);
        game.draw(ctx);
        if (!game.gameOver) requestAnimationFrame(animate);
    }
    animate(0);
};

document.getElementById('retry').addEventListener('click', reload);

function reload() {
    location.reload();
}