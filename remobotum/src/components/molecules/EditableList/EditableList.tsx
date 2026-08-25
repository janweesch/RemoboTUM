
import { type JSX } from "react";
import { CancelButton } from "../../atoms/IconButton/IconButton";

interface EditItem {
  id: number;
  name: string;
}

interface EditableListProps {
  items: EditItem[];
  onDelete: (id: number) => void;
}

export function EditableList({ items, onDelete }: EditableListProps): JSX.Element {
  return (
    <div className="editable-list">
      {items.map(item => (
        <div key={item.id} className="editable-item">
          <span className="item-name">{item.name}</span>
          <CancelButton position="relative" onClick={() => onDelete(item.id)} />
        </div>
      ))}
    </div>
  );
}