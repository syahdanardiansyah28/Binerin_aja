import React, { Children, cloneElement, forwardRef, isValidElement, useEffect, useMemo, useState } from 'react';

export const Card = forwardRef(({ customClass = '', className = '', style, ...rest }, ref) => (
  <div
    ref={ref}
    {...rest}
    className={`absolute left-1/2 top-1/2 rounded-xl border border-linear-border/70 bg-linear-surface shadow-primary [backface-visibility:hidden] [transform-style:preserve-3d] [will-change:transform] ${customClass} ${className}`.trim()}
    style={style}
  />
));
Card.displayName = 'Card';

const makeSlot = (i, distX, distY, total) => ({
  x: i * distX,
  y: -i * distY,
  z: -i * distX * 1.5,
  zIndex: total - i,
});

export default function CardSwap({
  width = 500,
  height = 400,
  cardDistance = 60,
  verticalDistance = 70,
  delay = 5000,
  pauseOnHover = false,
  onCardClick,
  skewAmount = 6,
  children,
}) {
  const childArr = useMemo(() => Children.toArray(children), [children]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || childArr.length < 2) return undefined;

    const interval = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % childArr.length);
    }, delay);

    return () => window.clearInterval(interval);
  }, [childArr.length, delay, paused]);

  const rendered = childArr.map((child, index) => {
    if (!isValidElement(child)) return child;

    const slotIndex = (index - activeIndex + childArr.length) % childArr.length;
    const slot = makeSlot(slotIndex, cardDistance, verticalDistance, childArr.length);
    const transform = `translate3d(calc(-50% + ${slot.x}px), calc(-50% + ${slot.y}px), ${slot.z}px) skewY(${skewAmount}deg)`;

    return cloneElement(child, {
      key: index,
      onClick: (event) => {
        child.props.onClick?.(event);
        onCardClick?.(index);
      },
      style: {
        width,
        height,
        zIndex: slot.zIndex,
        transform,
        transition: 'transform 720ms ease, z-index 720ms ease, border-color 180ms ease, background-color 180ms ease',
        ...(child.props.style ?? {}),
      },
    });
  });

  return (
    <div
      className="absolute bottom-0 right-0 origin-bottom-right translate-x-[5%] translate-y-[16%] overflow-visible [perspective:900px] max-[768px]:translate-x-[22%] max-[768px]:translate-y-[22%] max-[768px]:scale-[0.75] max-[480px]:translate-x-[24%] max-[480px]:translate-y-[20%] max-[480px]:scale-[0.58]"
      style={{ width, height }}
      onMouseEnter={() => pauseOnHover && setPaused(true)}
      onMouseLeave={() => pauseOnHover && setPaused(false)}
    >
      {rendered}
    </div>
  );
}
