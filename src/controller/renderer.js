
import Player from 'models/player';
import Ball from 'models/ball';
import PlayField from 'models/playfield';
import AI from 'controller/ai';
import KeyboardInput from 'controller/keyboardinput';

export default class Renderer {
    constructor() {
        this._ctx = null;
        this._lastRenderTime = null;

        this.playField = new PlayField(800, 600);
        this.player1 = new Player(10, 270, 10, 60);
        this.player2 = new Player(780, 270, 10, 60);
        this.ball = new Ball(400, 300, 5);
        
        let player1KeyBoardInput = new KeyboardInput(this.player1);
        let player2AI = new AI(this.player2, this.ball);
        
        player1KeyBoardInput.apply();
        player2AI.apply();
    }

    appendToElement(aElement) {
        let canvas = this.playField.getCanvasElement();

        aElement.appendChild(canvas);

        this._ctx = canvas.getContext('2d');
    }

    render() {
        this.playField.render(this._ctx);
        this.ball.render(this._ctx);
        this.player1.render(this._ctx);
        this.player2.render(this._ctx);

        this._lastRenderTime = (new Date()).valueOf();
    }

    recalculateBall(aTimeSinceLastFrame) {
        let ball = this.ball;
        let player1 = this.player1;
        let player2 = this.player2;
        let playField = this.playField;

        let currentBallPosition = [ball.x, ball.y];
        let ballPositionTransformation = ball.direction.map(function (aDirection) {
            return aDirection * ball.speed * aTimeSinceLastFrame;
        });
        let nextEstimatedBallPosition = [
            currentBallPosition[0] + ballPositionTransformation[0],
            currentBallPosition[1] + ballPositionTransformation[1]
        ];
        let ballHitsPlayer = nextEstimatedBallPosition[0] < player1.x + player1.width ||
            nextEstimatedBallPosition[0] > player2.x;
        let ballHitsBorders = nextEstimatedBallPosition[1] < ball.radius ||
            nextEstimatedBallPosition[1] > playField.height - ball.radius;

        ball.speed = ball.speed + 0.000025 * aTimeSinceLastFrame;

        if (ballHitsPlayer) {
            let tmp = 0;

            if (nextEstimatedBallPosition[0] < player1.x + player1.width) {
                tmp = currentBallPosition[0] * ball.speed / (player1.x + player1.width);

                if (nextEstimatedBallPosition[1] < player1.y - ball.radius ||
                    nextEstimatedBallPosition[1] > player1.y + player1.height + ball.radius) {
                    ball.speed = 0.3;
                    ball.direction = [1, 0];
                    currentBallPosition = [400, 300];
                    tmp = 0;
                }
                else {
                    ball.direction[1] = ball.direction[1] + player1.speed * player1.direction[1];
                }
            }
            else {
                tmp = currentBallPosition[0] * ball.speed / player2.x;
                
                if (nextEstimatedBallPosition[1] < player2.y - ball.radius ||
                    nextEstimatedBallPosition[1] > player2.y + player2.height + ball.radius) {
                    ball.speed = 0.3;
                    ball.direction = [-1, 0];
                    currentBallPosition = [400, 300];
                    tmp = 0;
                }
                else {
                    ball.direction[1] = ball.direction[1] + player1.speed * player1.direction[1];
                }
            }

            ballPositionTransformation = ball.direction.map(function (aDirection) {
                return aDirection * ball.speed * tmp;
            });

            ball.direction[0] = -1 * ball.direction[0];
        }

        if (ballHitsBorders) {
            let tmp = 0;

            if (nextEstimatedBallPosition[1] < 0) {
                tmp = currentBallPosition[1] * ball.speed / ball.radius;
            }
            else {
                tmp = currentBallPosition[1] * ball.speed / (playField.height - ball.radius);
            }

            ballPositionTransformation = ball.direction.map(function (aDirection) {
                return aDirection * ball.speed * tmp;
            });

            ball.direction[1] = -1 * ball.direction[1];
        }

        ball.x = currentBallPosition[0] + ballPositionTransformation[0];
        ball.y = currentBallPosition[1] + ballPositionTransformation[1];
    }
    
    recalculatePlayer(aTimeSinceLastFrame, aPlayer) {
        let playField = this.playField;
        let currentPosition = [aPlayer.x, aPlayer.y];
        let playerTransformation = aPlayer.direction.map(function (aDirection) {
            return aDirection * aPlayer.speed * aTimeSinceLastFrame;
        });
        let nextPosition = [
            currentPosition[0] + playerTransformation[0],
            currentPosition[1] + playerTransformation[1]
        ];
        
        if (nextPosition[1] < 0) {
            nextPosition[1] = 0;
        }
        else if (nextPosition[1] + aPlayer.height > playField.height) {
            nextPosition[1] = playField.height - aPlayer.height;
        }
        
        aPlayer.x = nextPosition[0];
        aPlayer.y = nextPosition[1];
    }

    loop() {
        if (this._lastRenderTime === null) {
            this.render();
        }
        let timeSinceLastFrame = (new Date()).valueOf() - this._lastRenderTime;
        
        this.recalculatePlayer(timeSinceLastFrame, this.player1);
        this.recalculatePlayer(timeSinceLastFrame, this.player2);
        this.recalculateBall(timeSinceLastFrame);
        this.render();

        window.requestAnimationFrame(this.loop.bind(this));
    }

    start() {
        window.requestAnimationFrame(this.loop.bind(this));
    }
}