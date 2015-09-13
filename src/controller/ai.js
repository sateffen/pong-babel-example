
export default class AI {
    constructor(aPlayer, aBall) {
        this.player = aPlayer;
        this.ball = aBall;
        this.intervalPointer = null;
    }
    
    apply() {
        this.intervalPointer = window.setInterval(() => {
            this.player.speed = 0.3;
            if (this.ball.y > this.player.y + this.player.height - this.ball.radius) {
                this.player.direction[1] = 1;
            }
            else if (this.ball.y < this.player.y - this.ball.radius) {
                this.player.direction[1] = -1;
            }
            else {
                this.player.direction[1] = 0;
            }
        }, 25);
    }
}