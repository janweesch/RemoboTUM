export type BatteryListener = (percentage: number) => void;

export class BatteryHandler {

  private listener: BatteryListener | null = null;

  onBattery(listener: BatteryListener) {
    this.listener = listener;
  }

  removeListener() {
    this.listener = null;
  }

  handle(percentage: number) {
    this.listener?.(percentage);
  }
}