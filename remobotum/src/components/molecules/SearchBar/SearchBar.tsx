import { type JSX } from "react";
import { CancelButton } from "../../atoms/IconButton/IconButton";
import "./SearchBar.css"

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onClose: () => void;
}

export default function SearchBar({value, onChange, onClose}:SearchBarProps): JSX.Element{
    return(
        <div className="search-bar">
            <input
            className="search-bar-input"
            type="text"
            value={value}
            onChange={(event) => onChange(event.target.value)}
            placeholder="Search..."
            autoFocus/>
            <CancelButton onClick={onClose}/>
        </div>
    );  
}