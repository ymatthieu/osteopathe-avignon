"use client";

import { cn } from "@/lib/utils";
import {
  createContext,
  ElementType,
  useContext,
  useEffect,
  useRef,
  useState,
  ReactNode,
  MouseEvent,
} from "react";

/**
 * Aceternity 3D Card Effect.
 * Cards that tilt subtly under mouse for a tactile, premium feel.
 */
const MouseEnterContext = createContext<
  [boolean, (v: boolean) => void] | undefined
>(undefined);

export function CardContainer({
  children,
  className,
  containerClassName,
}: {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isMouseEntered, setIsMouseEntered] = useState(false);

  const onMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / 16;
    const y = (e.clientY - top - height / 2) / 16;
    ref.current.style.transform = `rotateY(${x}deg) rotateX(${-y}deg)`;
  };

  const onMouseLeave = () => {
    if (!ref.current) return;
    ref.current.style.transform = "rotateY(0deg) rotateX(0deg)";
    setIsMouseEntered(false);
  };

  return (
    <MouseEnterContext.Provider value={[isMouseEntered, setIsMouseEntered]}>
      <div
        className={cn("flex items-center justify-center py-2", containerClassName)}
        style={{ perspective: "1000px" }}
      >
        <div
          ref={ref}
          onMouseEnter={() => setIsMouseEntered(true)}
          onMouseMove={onMouseMove}
          onMouseLeave={onMouseLeave}
          className={cn(
            "flex items-center justify-center relative transition-all duration-200 ease-linear",
            className
          )}
          style={{ transformStyle: "preserve-3d" }}
        >
          {children}
        </div>
      </div>
    </MouseEnterContext.Provider>
  );
}

export function CardBody({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "h-full w-full [transform-style:preserve-3d] [&>*]:[transform-style:preserve-3d]",
        className
      )}
    >
      {children}
    </div>
  );
}

interface CardItemProps {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  translateX?: number | string;
  translateY?: number | string;
  translateZ?: number | string;
  rotateX?: number | string;
  rotateY?: number | string;
  rotateZ?: number | string;
}

export function CardItem({
  as: Tag = "div",
  children,
  className,
  translateX = 0,
  translateY = 0,
  translateZ = 0,
  rotateX = 0,
  rotateY = 0,
  rotateZ = 0,
}: CardItemProps) {
  const ref = useRef<HTMLElement>(null);
  const ctx = useContext(MouseEnterContext);
  const isMouseEntered = ctx?.[0] ?? false;

  useEffect(() => {
    if (!ref.current) return;
    if (isMouseEntered) {
      ref.current.style.transform = `translateX(${translateX}px) translateY(${translateY}px) translateZ(${translateZ}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`;
    } else {
      ref.current.style.transform = `translateX(0) translateY(0) translateZ(0) rotateX(0) rotateY(0) rotateZ(0)`;
    }
  }, [isMouseEntered, translateX, translateY, translateZ, rotateX, rotateY, rotateZ]);

  return (
    <Tag
      ref={ref}
      className={cn("w-fit transition duration-200 ease-linear", className)}
    >
      {children}
    </Tag>
  );
}
