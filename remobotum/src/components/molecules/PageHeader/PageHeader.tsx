import './PageHeader.css'

interface PageHeaderProps {
  children: React.ReactNode;
}

export default function PageHeader({children}: PageHeaderProps) {
  return (<header className="page-header"> {children} </header>);
}