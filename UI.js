export class UI {
    constructor(game) {
        this.game = game;
        this.fontSize = 30;
        this.fontFamily = 'Black Ops One';
        this.livesImage = document.getElementById('lives');
    }
    draw(context) {
        context.save();
        context.shadowOffsetX = 2;
        context.shadowOffsetY = 2;
        context.shadowColor = 'white';
        context.shadowBlur = 0;
        context.font = this.fontSize + 'px ' + this.fontFamily;
        context.textAlign = 'left';
        context.fillStyle = this.game.fontColor;

        context.fillText('Score:' + this.game.score, 20, 50);
        //timer
        context.font = this.fontsize * 0.8 + 'px ' + this.fontFamily;
        context.fillText('Time: ' + (this.game.time * 0.001).toFixed(1), 20, 80);
        //lives
        for (let i = 0; i < this.game.lives; i++) {
            context.drawImage(this.livesImage, 30 * i + 20, 95, 25, 25)
        }

        //gameOver msg
        if (this.game.gameOver) {





            context.textAlign = 'center';
            context.font = this.fontSize * 2 + 'px ' + this.fontFamily;

            document.getElementById('retry').style.visibility = 'visible';

            if (this.game.score > this.game.winningScore) {
                context.fillText('Boo-yah', this.game.width * 0.5, this.game.height * 0.5 - 20);
                context.font = this.fontSize * 0.7 + 'px ' + this.fontFamily;
                context.fillText('Lets Conquore the mankind!!!', this.game.width * 0.5, this.game.height * 0.5 + 20);
            } else {
                context.fillText('Mission Failed', this.game.width * 0.5, this.game.height * 0.5 - 20);
                context.font = this.fontSize * 0.7 + 'px ' + this.fontFamily;
                context.fillText('Lets get them next time!!!', this.game.width * 0.5, this.game.height * 0.5 + 20);

            }



        }
        context.restore();
    }
}