export type BatteryListenerCallback =(percentage: number) => void;

class BatteryListener {

  private listener: BatteryListenerCallback | null = null;


  onBattery(listener: BatteryListenerCallback) {

    this.listener = listener;

  }


  removeListener() {

    this.listener = null;

  }


  handle(percentage: number) {

    this.listener?.(percentage);

  }

}


export default BatteryListener;