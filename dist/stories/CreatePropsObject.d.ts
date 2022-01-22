interface RenderedStyles {
    backgroundColor: string;
    paddingTop: number;
    paddingLeft: number;
    paddingRight: number;
    paddingBottom: number;
    borderWidth: number;
    borderColor: string;
    borderStyle: string;
    borderRadius: number;
    fontSize: number;
    fontColor: string;
    fontWeight: string;
    fontFamily: string;
    textTransform: string;
    boxShadow: string;
}
declare const get_all_styles_from_button: (element: CSSStyleDeclaration) => RenderedStyles;
export { get_all_styles_from_button, RenderedStyles };
