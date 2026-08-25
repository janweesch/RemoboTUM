import type { JSX } from "react"
import "./Button.css"

 
interface ButtonProps{
    label: string;
    position?: string;
    onClick?: () => void;
}

export function Button({label="Click Me", position="relative", onClick} : ButtonProps): JSX.Element
{
    return (<button className={`button button-${position}`} onClick={onClick}> {label} </button>) 
}