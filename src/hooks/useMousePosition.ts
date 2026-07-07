"use client";

import { useEffect, useRef } from "react";

export function useMousePosition() {
  const mouse = useRef({ x: 0, y: 0, normalX: 0, normalY: 0 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      mouse.current.normalX = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.normalY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return mouse;
}
