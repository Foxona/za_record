import { makeAutoObservable } from "mobx";
import { observer } from "mobx-react";

type TimerProps = {
  timer: Timer;
};

class Timer {
  secondsPassed = 0;

  constructor() {
    makeAutoObservable(this);
  }

  increase() {
    this.secondsPassed += 1;
  }

  reset() {
    this.secondsPassed = 0;
  }
}

export const myTimer = new Timer();

// Build a "user interface" that uses the observable state.
const TimerView = observer(({ timer }: TimerProps) => {
  return <button>Секунд прошло: {timer.secondsPassed}</button>;
});

export const TimerEl = () => <TimerView timer={myTimer} />;
