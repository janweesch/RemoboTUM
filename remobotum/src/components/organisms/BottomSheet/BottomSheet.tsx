import { type JSX, type ReactNode } from "react";
import "./BottomSheet.css";

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function BottomSheet({isOpen, onClose, children,}: BottomSheetProps): JSX.Element {

  return (
    <>
      {isOpen && (
        <div
          className="bottom-sheet-backdrop"
          onClick={onClose}
        />
      )}

      <div className={`bottom-sheet ${isOpen ? "open" : ""}`}>
        {children}
      </div>
    </>
  );
}