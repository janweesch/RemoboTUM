export interface QueueItem {
queueId: string;
movementId: number;
name: string;
}

export type QueueListenerCallback = (items: QueueItem[]) => void;

class QueueListener {

private listener: QueueListenerCallback | null = null;

onQueue(listener: QueueListenerCallback) {
this.listener = listener;
}

removeListener() {
this.listener = null;
}

handle(items: QueueItem[]) {
this.listener?.(items);
}
}

export default QueueListener;
