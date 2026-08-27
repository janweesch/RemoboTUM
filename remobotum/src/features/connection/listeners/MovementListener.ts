export interface RobotAction{
    id: number | null;
    name: string;
    kind: "preset" | "custom";
}

export type MovementListenerCallback = (actions: RobotAction[]) => void;

export class MovementListener {

    private listener: MovementListenerCallback | null = null; 

    onMovements(listener: MovementListenerCallback){
        this.listener = listener;
    }

    removeListener(){
        this.listener = null;
    }

    handle(actions: RobotAction[]){
        this.listener?.(actions)
    }
}