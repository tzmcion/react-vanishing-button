import React, {useState,useRef,useEffect} from 'react';
import {RenderedStyles as ButtonProps,get_all_styles_from_button} from './CreatePropsObject';
import Canvas_Management from './Ctx';


interface Object_props{
  title:string
  className?:string,
  id?:string,
  duration?:number,
  row_quantity?:number,
  col_quantity?:number
  onClick?:any
}

/**
 * Primary UI component for user interaction
 */
export const Button = ({title,className,id,duration,row_quantity,col_quantity,onClick,...props}:Object_props) => {

  const [clicked,setClicked] = useState<boolean>(false);
  const [artist,setArtist] = useState<Canvas_Management>();
  const [size_data,set_size_data] = useState<any>(null);
  const [_props,setProps] = useState<ButtonProps>();
  const Canvas = useRef<HTMLCanvasElement>(null);
  const button = useRef<HTMLButtonElement>(null);

  const _onClick = ():void =>{
    const size = {
      top:button.current?.getBoundingClientRect().top,
      left:button.current?.getBoundingClientRect().left,
      width:button.current?.offsetWidth,
      height:button.current?.offsetHeight,
      padding:parseFloat(window.getComputedStyle(button.current!).padding.replace('px',''))
    }
    const _props:ButtonProps = get_all_styles_from_button(window.getComputedStyle(button.current!));
    setProps(_props);
    set_size_data(size);
    setClicked(true);
    if(onClick){
    onClick();
    }
  }

  useEffect(()=>{
    if(clicked && size_data){
      setArtist(new Canvas_Management(Canvas,size_data,_props!,title,duration? duration:500,row_quantity ? row_quantity: 15, col_quantity ? col_quantity : 5));
    }
  },[clicked]);


  return (<>
    {!clicked &&<button
      ref={button}
      id={id} 
      className={`rc_bt ${className}`}
      onClickCapture={_onClick}
      >{title}</button>}
    <canvas
      ref={Canvas} 
      width={size_data ? size_data.width:100}
      height={size_data ? size_data.height:100}
      style={{
        top:size_data ? size_data.top : 0,
        left:size_data ? size_data.left : 0,
        pointerEvents:'none',
        position:'absolute'
      }}
    />
      </>
  );
};
