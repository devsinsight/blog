import { useRef, useSyncExternalStore } from "react";

/**
 * Returns true after first client commit without triggering setState in effects.
 * Useful to gate hydration-sensitive rendering.
 */
export function useMounted(): boolean {
  const mountedRef = useRef(false);

  return useSyncExternalStore(
    (onStoreChange) => {
      mountedRef.current = true;
      onStoreChange();
      return () => {
        mountedRef.current = false;
      };
    },
    () => mountedRef.current,
    () => false
  );
}
