import { type JSX } from "react";
import { CancelButton } from "../../atoms/IconButton/IconButton";
import './ListItem.css'

interface ListItemProps{
    id: number;
    sequencenumber: number;
    name: string;
    onDelete: (id:number) => void 
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
// import { type JSX } from "react";
// import { CancelButton } from "../../atoms/IconButton/IconButton";
// import "./ListItem.css";
// import { Button } from "../../atoms/Button/Button";

// interface ListItemProps {
//   id: number;
//   sequencenumber?: number;
//   name: string;

//   selectable?: boolean;
//   selected?: boolean;

//   onSelect?: (id: number) => void;
//   onDelete?: (id: number) => void;
//   onClick?: (id: number) => void;
// }

// export default function ListItem({
//   id,
//   sequencenumber,
//   name,
//   selectable = false,
//   selected = false,
//   onSelect,
//   onDelete,
//   onClick,
// }: ListItemProps): JSX.Element {

//   return (
//     <div className="list-item">

//       {selectable && (
//         <input
//           type="checkbox"
//           checked={selected}
//           onChange={() => onSelect?.(id)}
//         />
//       )}

//       {sequencenumber !== undefined && (
//         <span className="sequence-number">
//           {sequencenumber}
//         </span>
//       )}

//       <Button
//         label={name}
//         onClick={() => onClick?.(id)}
//       />
      
//       {onDelete && (
//         <CancelButton
//           position="relative"
//           onClick={() => onDelete(id)}
//         />
//       )}

//     </div>
//   );
// }