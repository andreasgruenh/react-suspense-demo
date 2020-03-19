import React, {
  ReactNode,
  useEffect,
  useState
} from "react";
import {
  unstable_ImmediatePriority,
  unstable_scheduleCallback
} from "scheduler";

export function Deferred(props: {
  ms?: number;
  children: ReactNode;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let unmounted = false;
    setTimeout(() => {
      if (unmounted) return;
      unstable_scheduleCallback(
        unstable_ImmediatePriority,
        () => {
          setVisible(true);
        }
      );
    }, props.ms ?? 250);
    return () => {
      unmounted = true;
    };
  }, []);

  if (!visible) return null;
  return <>{props.children}</>;
}
