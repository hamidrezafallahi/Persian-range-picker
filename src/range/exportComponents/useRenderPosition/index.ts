import { useEffect, useState } from "react";

interface Position {
  top: number;
  left: number;
}

interface UseRenderPositionOptions<T extends HTMLElement> {
  buttonRef: React.RefObject<T | null>; // ⬅ تغییر دادیم
  popupSize: { width: number; height: number };
  enabled: boolean;
  offset?: number;
}

export function useRenderPosition<T extends HTMLElement = HTMLElement>({
  buttonRef,
  popupSize,
  enabled,
  offset = 4,
}: UseRenderPositionOptions<T>): Position {
  const [position, setPosition] = useState<Position>({ top: 0, left: 0 });

  useEffect(() => {
    if (!enabled || !buttonRef.current) return;

    const button = buttonRef.current;
    const rect = button.getBoundingClientRect();
    const dir = getComputedStyle(button).direction as "ltr" | "rtl";

    const enoughSpaceBelow =
      rect.bottom + popupSize.height <= window.innerHeight;
    const enoughSpaceAbove = rect.top - popupSize.height >= 0;
    const placeAbove = !enoughSpaceBelow && enoughSpaceAbove;
    const top = placeAbove ? -popupSize.height - offset : rect.height + offset;

    const centerX = rect.left + rect.width / 2;
    const screenCenter = window.innerWidth / 2;
    const alignLeft = centerX <= screenCenter;
    const left = alignLeft ? 0 : rect.width - popupSize.width;

    setPosition((prev) =>
      prev.top !== top || prev.left !== left ? { top, left } : prev
    );
  }, [enabled, popupSize.height, popupSize.width, offset, buttonRef]);
  return position;
}
