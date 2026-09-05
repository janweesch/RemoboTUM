import { type JSX } from "react";
import "./IconButton.css"
import {Settings, ListFilter, ArrowBigLeft, Search, ChevronUp, ChevronDown, X, Play, Pause, Square, Mic, Plus, Pencil} from "lucide-react";


interface IconButtonProps {
  
    position?: string;
    onClick?: () => void;
    size?: string |number;
    color?: string;
    strokeWidth?: string | number;
}

export function SettingsButton({position='top-right-fixed', onClick, size=48, color="#3d4651", strokeWidth=2 }: IconButtonProps): JSX.Element
{
    return <button className={`icon-button icon-button-${position}`} onClick={onClick}> <Settings size={size} color={color} strokeWidth={strokeWidth}/> </button>
}

export function FilterButton({position='top-right-sticky', onClick, size=48, color="#3d4651", strokeWidth=2 }: IconButtonProps): JSX.Element
{
    return <button className={`icon-button icon-button-${position}`} onClick={onClick}> <ListFilter size={size} color={color} strokeWidth={strokeWidth}/> </button>
}

export function BackButton({position='top-left-fixed', onClick, size=48, color="#3d4651", strokeWidth=2 }: IconButtonProps): JSX.Element
{
    return <button className={`icon-button icon-button-${position}`} onClick={onClick}> <ArrowBigLeft size={size} color={color} strokeWidth={strokeWidth}/> </button>
}

export function SearchButton({position='top-right-fixed', onClick, size=48, color="#3d4651", strokeWidth=2 }: IconButtonProps): JSX.Element
{
    return <button className={`icon-button icon-button-${position}`} onClick={onClick}> <Search size={size} color={color} strokeWidth={strokeWidth}/> </button>
} 

export function PopUpButton({position='relative', onClick, size=48, color="#3d4651", strokeWidth=2 }: IconButtonProps): JSX.Element
{
    return <button className={`icon-button icon-button-${position}`} onClick={onClick}> <ChevronUp size={size} color={color} strokeWidth={strokeWidth}/> </button>
}

export function PopDownButton({position='relative', onClick, size=48, color="#3d4651", strokeWidth=2 }: IconButtonProps): JSX.Element
{
    return <button className={`icon-button icon-button-${position}`} onClick={onClick}> <ChevronDown size={size} color={color} strokeWidth={strokeWidth}/> </button>
}  

export function CancelButton({position='relative', onClick, size=48, color="#3d4651", strokeWidth=2 }: IconButtonProps): JSX.Element
{
    return <button className={`icon-button icon-button-${position}`} onClick={onClick}> <X size={size} color={color} strokeWidth={strokeWidth}/> </button>
}

export function PlayButton({position='relative', onClick, size=48, color="#3d4651", strokeWidth=2 }: IconButtonProps): JSX.Element
{
    return <button className={`icon-button icon-button-${position}`} onClick={onClick}> <Play size={size} color={color} strokeWidth={strokeWidth}/> </button>
}

export function PauseButton({position='relative', onClick, size=48, color="#3d4651", strokeWidth=2 }: IconButtonProps): JSX.Element
{
    return <button className={`icon-button icon-button-${position}`} onClick={onClick}> <Pause size={size} color={color} strokeWidth={strokeWidth}/> </button>
}

export function StopButton({position='relative', onClick, size=48, color="#3d4651", strokeWidth=2 }: IconButtonProps): JSX.Element
{
    return <button className={`icon-button icon-button-${position}`} onClick={onClick}> <Square size={size} color={color} strokeWidth={strokeWidth}/> </button>
} 

export function RecordButton({position='relative', onClick, size=48, color="#3d4651", strokeWidth=2 }: IconButtonProps): JSX.Element
{
    return <button className={`icon-button icon-button-${position}`} onClick={onClick}> <Mic size={size} color={color} strokeWidth={strokeWidth}/> </button>
}

export function PlusButton({position='relative', onClick, size=48, color="#3d4651", strokeWidth=2 }: IconButtonProps): JSX.Element
{
    return <button className={`icon-button icon-button-${position}`} onClick={onClick}> <Plus size={size} color={color} strokeWidth={strokeWidth}/> </button>
}

export function EditButton({position='relative', onClick, size=48, color="#3d4651", strokeWidth=2 }: IconButtonProps): JSX.Element
{
    return <button className={`icon-button icon-button-${position}`} onClick={onClick}> <Pencil size={size} color={color} strokeWidth={strokeWidth}/> </button>
}
