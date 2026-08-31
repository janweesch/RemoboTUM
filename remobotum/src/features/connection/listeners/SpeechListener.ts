export interface Speech {
    id: string;
    title: string;
    text: string;
}


export type SpeechListenerCallback = (actions: Speech[]) => void;

export class SpeechListener {

    private listener: SpeechListenerCallback | null = null; 

    onSpeeches(listener: SpeechListenerCallback){
        this.listener = listener;
    }

    removeListener(){
        this.listener = null;
    }

    handle(actions: Speech[]){
        this.listener?.(actions)
    }
}