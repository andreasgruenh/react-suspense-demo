import { useEffect, useRef, useState } from "react";
import {
  unstable_scheduleCallback,
  unstable_UserBlockingPriority
} from "scheduler";

export function useDelayedValue<TValue>(
  value: TValue,
  ms = 250
): TValue {
  const [valueState, setValueState] = useState(value);
  const unmountedRef = useRef(false);

  useEffect(() => {
    return () => {
      unmountedRef.current = true;
    };
  }, []);

  useEffect(() => {
    setTimeout(() => {
      unstable_scheduleCallback(
        unstable_UserBlockingPriority,
        () => {
          if (unmountedRef.current) return;
          setValueState(value);
        }
      );
    }, ms);
  }, [value, ms]);

  return valueState;
}
