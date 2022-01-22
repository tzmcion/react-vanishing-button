

interface RenderedStyles{
    backgroundColor:string,
    paddingTop:number,
    paddingLeft:number,
    paddingRight:number,
    paddingBottom:number,
    borderWidth:number,
    borderColor:string,
    borderStyle:string,
    borderRadius:number,
    fontSize:number,
    fontColor:string,
    fontWeight:string,
    fontFamily:string,
    textTransform:string,
    boxShadow:string
}

const get_all_styles_from_button = (element:CSSStyleDeclaration):RenderedStyles =>{
    const styles:RenderedStyles = {
    backgroundColor:element.backgroundColor,
    paddingTop: parseFloat(element.paddingTop.replace('px','')),
    paddingRight: parseFloat(element.paddingRight.replace('px','')),
    paddingLeft: parseFloat(element.paddingLeft.replace('px','')),
    paddingBottom: parseFloat(element.paddingBottom.replace('px','')),
    borderWidth: parseFloat(element.borderWidth.replace('px','')),
    borderColor: element.borderColor,
    borderStyle: element.borderStyle,
    borderRadius: parseFloat(element.borderRadius.replace('px','')),
    fontSize: parseFloat(element.fontSize.replace('px','')),
    fontColor: element.color,
    fontWeight: element.fontWeight,
    fontFamily: element.fontFamily,
    textTransform: element.textTransform,
    boxShadow: element.boxShadow
    }
    return styles;
}

export {get_all_styles_from_button,RenderedStyles};
