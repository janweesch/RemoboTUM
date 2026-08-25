import './BottomBar.css'

interface BottomBarProps {
  children: React.ReactNode;
}

export default function BottomBar({children}: BottomBarProps) {
  return (<header className="bottom-bar"> {children} </header>);
}