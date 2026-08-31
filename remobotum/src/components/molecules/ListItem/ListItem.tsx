import { type JSX } from "react";
import { CancelButton } from "../../atoms/IconButton/IconButton";
import './ListItem.css'

interface ListItemProps{
    id: string;
    sequencenumber: number;
    name: string;
    onDelete: (id:string) => void 
}

export default function ListItem({id, sequencenumber, name, onDelete}:ListItemProps): JSX.Element{

    return(
        <div className="list-item"> 
            <span className="sequence-number">{sequencenumber}</span>
            <span className="item-name">{name}</span>
            <CancelButton position="relative" onClick={() => onDelete(id)}/>
        </div>
    )
}
