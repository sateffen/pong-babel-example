
export default class Ball {
    constructor(aX, aY, aRadius) {
        this.x = aX;
        this.y = aY;
        this.radius = aRadius;

        this.color = '#0000ff';
        
        this.speed = 0.3;
        this.direction = [-1, 0];
    }

    render(aCtx) {
        if (!aCtx) {
            return;
        }

        aCtx.fillStyle = this.color;

        aCtx.beginPath();
        aCtx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        aCtx.fill();
    }
}