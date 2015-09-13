
export default class PlayField {
    constructor(aWidth, aHeight) {
        this.width = aWidth;
        this.height = aHeight;
        
        this.color = '#aaaaaa';
    }
    
    getCanvasElement() {
        let canvasElement = document.createElement('canvas');
        
        canvasElement.setAttribute('height', this.height);
        canvasElement.setAttribute('width', this.width);
        
        return canvasElement;
    }
    
    render(aCtx) {
        if (!aCtx) {
            return;
        }
        
        aCtx.fillStyle = this.color;
        aCtx.fillRect(0, 0, this.width, this.height);
    }
}