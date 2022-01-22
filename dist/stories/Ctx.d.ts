import { RefObject } from "react";
import { RenderedStyles } from './CreatePropsObject';
declare class Ctx_Management {
    private options;
    private ctx;
    private width;
    private height;
    private imageData;
    private squares;
    private title;
    private row_quantity;
    private col_quantity;
    private duration;
    constructor(CanvasRef: RefObject<HTMLCanvasElement>, size_data: any, options: RenderedStyles, title: string, duration: number, row_quantity: number, col_quantity: number);
    private CanvasRoundRect;
    private CanvasText;
    private get_image_from_canvas;
    private create_squares;
    private render_squares;
    private Draw_until_end;
}
export default Ctx_Management;
