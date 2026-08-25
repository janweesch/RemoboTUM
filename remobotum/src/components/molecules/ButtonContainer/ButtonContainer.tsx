import type { JSX, ReactNode } from "react";
import "./ButtonContainer.css";

interface ButtonContainerProps {
    container: 'button-container-vertical' | 'button_container-horizontal';
    children: ReactNode;
    gap?: number;
}

export function ButtonContainer({container='button-container-vertical', children, gap = 20 }: ButtonContainerProps): JSX.Element {
  return (<div className={container} style={{ gap: `${gap}px` }}> {children} </div>);}