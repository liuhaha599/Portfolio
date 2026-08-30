import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";

import "./Masonry.css";

const mediaQueries = [
  "(min-width: 1500px)",
  "(min-width: 1000px)",
  "(min-width: 600px)",
  "(min-width: 400px)",
];
const mediaValues = [4, 4, 3, 2];

function useMedia(defaultValue) {
  const getValue = () => mediaValues[mediaQueries.findIndex((query) => matchMedia(query).matches)] ?? defaultValue;
  const [value, setValue] = useState(getValue);

  useEffect(() => {
    const handler = () => setValue(getValue());
    const media = mediaQueries.map((query) => matchMedia(query));
    media.forEach((item) => item.addEventListener("change", handler));
    return () => media.forEach((item) => item.removeEventListener("change", handler));
  }, []);

  return value;
}

function useMeasure() {
  const ref = useRef(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    if (!ref.current) return undefined;
    const observer = new ResizeObserver(([entry]) => {
      setSize({ width: entry.contentRect.width, height: entry.contentRect.height });
    });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return [ref, size];
}

function DeferredImage({ src, style }) {
  const ref = useRef(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const image = ref.current;
    if (!image || !("IntersectionObserver" in window)) {
      setIsReady(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setIsReady(true);
        observer.disconnect();
      },
      { rootMargin: "600px 0px" },
    );

    observer.observe(image);
    return () => observer.disconnect();
  }, []);

  return (
    <img
      ref={ref}
      className="masonry-item-art masonry-item-image"
      src={isReady ? src : undefined}
      alt=""
      loading="lazy"
      decoding="async"
      style={style}
      aria-hidden="true"
    />
  );
}

export default function Masonry({
  items,
  onItemClick,
  ease = "power3.out",
  duration = 0.6,
  stagger = 0.05,
  animateFrom = "bottom",
  scaleOnHover = true,
  hoverScale = 0.95,
  blurToFocus = true,
  colorShiftOnHover = false,
}) {
  const columns = useMedia(1);
  const [containerRef, { width }] = useMeasure();
  const hasMounted = useRef(false);

  const layout = useMemo(() => {
    if (!width) return { grid: [], height: 0 };

    const gap = width < 600 ? 10 : 16;
    const columnWidth = (width - gap * (columns - 1)) / columns;
    const columnHeights = new Array(columns).fill(0);
    const grid = items.map((item) => {
      const column = columnHeights.indexOf(Math.min(...columnHeights));
      const aspectRatio = item.aspectRatio ?? 1;
      const height = columnWidth / aspectRatio;
      const x = (columnWidth + gap) * column;
      const y = columnHeights[column];
      columnHeights[column] += height + gap;
      return { ...item, x, y, w: columnWidth, h: height };
    });

    return { grid, height: Math.max(...columnHeights, 0) - gap };
  }, [columns, items, width]);

  const initialPosition = (item) => {
    const container = containerRef.current?.getBoundingClientRect();
    if (!container) return { x: item.x, y: item.y };
    const direction = animateFrom === "random"
      ? ["top", "bottom", "left", "right"][Math.floor(Math.random() * 4)]
      : animateFrom;

    if (direction === "top") return { x: item.x, y: -200 };
    if (direction === "left") return { x: -200, y: item.y };
    if (direction === "right") return { x: window.innerWidth + 200, y: item.y };
    if (direction === "center") {
      return { x: container.width / 2 - item.w / 2, y: container.height / 2 - item.h / 2 };
    }
    return { x: item.x, y: window.innerHeight + 200 };
  };

  useLayoutEffect(() => {
    if (!containerRef.current || layout.grid.length === 0) return;

    layout.grid.forEach((item, index) => {
      const element = containerRef.current.querySelector(`[data-key="${item.id}"]`);
      if (!element) return;
      const target = { x: item.x, y: item.y, width: item.w, height: item.h };

      if (!hasMounted.current) {
        const start = initialPosition(item);
        gsap.fromTo(
          element,
          {
            opacity: 0,
            x: start.x,
            y: start.y,
            width: item.w,
            height: item.h,
            ...(blurToFocus ? { filter: "blur(10px)" } : {}),
          },
          {
            opacity: 1,
            ...target,
            ...(blurToFocus ? { filter: "blur(0px)" } : {}),
            duration,
            ease,
            delay: 0.16 + index * stagger,
          },
        );
      } else {
        gsap.to(element, { ...target, duration, ease, overwrite: "auto" });
      }
    });

    hasMounted.current = true;
  }, [animateFrom, blurToFocus, duration, ease, layout, stagger]);

  const handleMouseEnter = (event) => {
    if (!scaleOnHover) return;
    gsap.to(event.currentTarget, { scale: hoverScale, duration: 0.3, ease: "power2.out" });
  };

  const handleMouseLeave = (event) => {
    if (!scaleOnHover) return;
    gsap.to(event.currentTarget, { scale: 1, duration: 0.3, ease: "power2.out" });
  };

  return (
    <div
      ref={containerRef}
      className="masonry-list"
      style={{ height: layout.height ? `${layout.height}px` : "70vh" }}
    >
      {layout.grid.map((item) => (
        <button
          key={item.id}
          data-key={item.id}
          className="masonry-item"
          type="button"
          aria-label={`放大查看${item.title}`}
          onClick={() => onItemClick?.(item.work)}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {item.work.image ? (
            <DeferredImage
              src={item.work.image}
              style={{ objectPosition: item.work.previewPosition ?? "center" }}
            />
          ) : (
            <span
              className={`masonry-item-art exploration-art ${item.cell ?? ""}`}
              aria-hidden="true"
            />
          )}
          <span className="masonry-item-copy">
            <small>{item.type}</small>
            <strong>{item.title}</strong>
          </span>
          {colorShiftOnHover && <span className="masonry-color-overlay" aria-hidden="true" />}
        </button>
      ))}
    </div>
  );
}
