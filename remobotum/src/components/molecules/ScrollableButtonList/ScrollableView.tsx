import type { JSX, ReactNode } from "react";
import "./ScrollableView.css";

interface ScrollableViewProps {
    children: ReactNode;
    gap?: number;
}

export default function ScrollableView({children, gap = 10 }: ScrollableViewProps): JSX.Element 
{
  return (<div className="scrollable-view" style={{ gap: `${gap}px` }}> {children} </div>);
}