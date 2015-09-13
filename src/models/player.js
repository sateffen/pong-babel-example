
export default class Player {
    constructor(aX, aY, aWidth, aHeight) {
        this.x = aX;
        this.y = aY;
        this.width = aWidth;
        this.height = aHeight;
        
        this.color = '#ff0000';
        
        this.speed = 0.2;
        this.direction = [0, 0];
    }
    
    render(aCtx) {
        if (!aCtx) {
            return;
        }
        
        aCtx.fillStyle = this.color;
        aCtx.fillRect(this.x, this.y, this.width, this.height);
    }
}