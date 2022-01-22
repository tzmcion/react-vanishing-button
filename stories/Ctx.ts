import { RefObject } from "react";
import {RenderedStyles} from './CreatePropsObject';

class Square{
    public size:number
    private y_size:number
    private x_pos:number
    private y_pos:number
    private start:{x:number,y:number,x_pos:number,y_pos:number,time:number}
    private last:{x:number,y:number}
    
    constructor(x:number,y:number,size:number,y_size:number){
        this.size = size;
        this.x_pos = x;
        this.y_pos = y;
        this.y_size = y_size
        this.start = {
            x:size,
            y:y_size,
            x_pos:x,
            y_pos:y,
            time:Date.now()
        }
        this.last = {
            x:this.size,
            y:this.y_size
        }
    }
    public render(ctx:CanvasRenderingContext2D,imageData:ImageData,color:string){
        ctx.putImageData(imageData,0,0,this.x_pos,this.y_pos,this.size,this.y_size);
    }

    public update(duration:number):void{
        const now = duration - (Date.now() - this.start.time);
        const data = {
            x_size:now * this.start.x / duration,
            y_size: now*this.start.y / duration,
            x_pos:now*this.start.x_pos / duration,
            y_pos:now * this.start.y_pos / duration
        }
        this.size = data.x_size;
        this.y_size = data.y_size;
        this.x_pos += (this.last.x - data.x_size) / 2;
        this.y_pos += (this.last.y - data.y_size) / 2;
        this.last = {x:data.x_size,y:data.y_size}
    }
}

class Ctx_Management{
    private options:RenderedStyles
    private ctx: CanvasRenderingContext2D
    private width:number
    private height:number
    private imageData:ImageData
    private squares:Array<Square>
    private title:string
    private row_quantity:number
    private col_quantity:number
    private duration:number
    constructor(CanvasRef:RefObject<HTMLCanvasElement>,size_data:any,options:RenderedStyles,title:string,duration:number,row_quantity:number,col_quantity:number){
        this.ctx = CanvasRef.current?.getContext('2d')!;
        this.options = options;
        this.width = size_data.width;
        this.height = size_data.height;
        this.title = title;
        this.duration = duration;
        this.row_quantity = row_quantity;
        this.col_quantity = col_quantity;
        this.CanvasRoundRect(options.backgroundColor,0,0,this.width,this.height,options.borderRadius!);
        this.CanvasText();
        this.imageData = this.get_image_from_canvas();
        this.squares = this.create_squares();
        this.render_squares();
        this.Draw_until_end = this.Draw_until_end.bind(this);
        this.Draw_until_end();
    }
    //DRAWING BUTTON BACKGROUND
    private CanvasRoundRect(color:string,x:number, y:number, w:number, h:number, r:number,stroke?:boolean):void {
        const ctx = this.ctx;
        if (w < 2 * r) r = w / 2;
        if (h < 2 * r) r = h / 2;
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.strokeStyle = color;
        ctx.moveTo(x+r, y);
        ctx.arcTo(x+w, y,   x+w, y+h, r);
        ctx.arcTo(x+w, y+h, x,   y+h, r);
        ctx.arcTo(x,   y+h, x,   y,   r);
        ctx.arcTo(x,   y,   x+w, y,   r);
        ctx.fill();
        stroke && ctx.stroke();
    }

    private CanvasText():void{
        const size = this.options.fontSize;
        const family = this.options.fontFamily;
        this.ctx.fillStyle = this.options.fontColor!;
        this.ctx.font = `${this.options.fontWeight} ${size}px ${family}`;
        this.ctx.fillText(this.title,this.options.paddingLeft,this.options.paddingTop + size! -1);
    }
    //Rendering and preparing Animation 
    private get_image_from_canvas():ImageData{
        const data = this.ctx.getImageData(0,0,this.width,this.height);
        this.ctx.clearRect(0,0,this.width,this.height);
        return data
    }

    private create_squares():Array<Square>{
        const row_quantity:number = this.row_quantity;
        const col_quantity:number = this.col_quantity;
        let squares:Array<Square> = [];
        for(let x = 0; x < row_quantity; x++){
            for(let y = 0; y < col_quantity; y++){
                const y_pos = (this.height / col_quantity) * y;
                const x_pos = (this.width / row_quantity) * x;
                const field = new Square(x_pos,y_pos ,this.width / row_quantity,this.height / col_quantity);
                squares.push(field);
            }
        }
        return squares;
    }

    private render_squares():void{
        this.ctx.clearRect(0,0,this.width,this.height);
        if(this.options.boxShadow !== 'none'){
            const shadow_data = this.options.boxShadow.split(' ');
            this.ctx.shadowColor= shadow_data[0] + shadow_data[1] + shadow_data[2];
            this.ctx.shadowOffsetX = parseFloat(shadow_data[3].replace('px',''));
            this.ctx.shadowOffsetY = parseFloat(shadow_data[4].replace('px',''));
            this.ctx.shadowBlur = parseFloat(shadow_data[5].replace('px',''));
        }
        this.squares.map(square =>{
            square.render(this.ctx,this.imageData,this.options.backgroundColor);
        })
    }

    //Animating
    private Draw_until_end():void{
        this.ctx.clearRect(0,0,this.width,this.height);
        this.squares.map(square =>{
            square.update(this.duration);
            square.render(this.ctx,this.imageData,this.options.backgroundColor);
        })
        if(this.squares[0].size > 0){
            window.requestAnimationFrame(this.Draw_until_end);
        }
    }
}

export default Ctx_Management;