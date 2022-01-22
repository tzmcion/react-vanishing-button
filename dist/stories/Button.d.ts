/// <reference types="react" />
interface Object_props {
    title: string;
    className?: string;
    id?: string;
    duration?: number;
    row_quantity?: number;
    col_quantity?: number;
    onClick?: any;
}
/**
 * Primary UI component for user interaction
 */
export declare const Button: ({ title, className, id, duration, row_quantity, col_quantity, onClick, ...props }: Object_props) => JSX.Element;
export {};
