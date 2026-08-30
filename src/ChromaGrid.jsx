import { useEffect, useRef } from "react";
import { gsap } from "gsap";

import "./ChromaGrid.css";

export default function ChromaGrid({
  items,
  className = "",
  radius = 300,
  damping = 0.45,
  fadeOut = 0.6,
  ease = "power3.out",
}) {
  const rootRef = useRef(null);
  const fadeRef = useRef(null);
  const setX = useRef(null);
  const setY = useRef(null);
  const position = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const element = rootRef.current;
    if (!element) return undefined;

    setX.current = gsap.quickSetter(element, "--x", "px");
    setY.current = gsap.quickSetter(element, "--y", "px");
    const { width, height } = element.getBoundingClientRect();
    position.current = { x: width / 2, y: height / 2 };
    setX.current(position.current.x);
    setY.current(position.current.y);

    return () => gsap.killTweensOf(position.current);
  }, []);

  const moveTo = (x, y) => {
    gsap.to(position.current, {
      x,
      y,
      duration: damping,
      ease,
      overwrite: true,
      onUpdate: () => {
        setX.current?.(position.current.x);
        setY.current?.(position.current.y);
      },
    });
  };

  const handleMove = (event) => {
    const rect = rootRef.current.getBoundingClientRect();
    moveTo(event.clientX - rect.left, event.clientY - rect.top);
    gsap.to(fadeRef.current, { opacity: 0, duration: 0.25, overwrite: true });
  };

  const handleLeave = () => {
    gsap.to(fadeRef.current, { opacity: 1, duration: fadeOut, overwrite: true });
  };

  const handleCardMove = (event) => {
    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--mouse-x", `${event.clientX - rect.left}px`);
    card.style.setProperty("--mouse-y", `${event.clientY - rect.top}px`);
  };

  return (
    <div
      ref={rootRef}
      className={`practice-chroma-grid ${className}`}
      style={{ "--r": `${radius}px` }}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
    >
      {items.map((item, index) => (
        <article
          className="practice-chroma-card"
          key={item.title}
          onPointerMove={handleCardMove}
          style={{
            "--card-border": item.borderColor,
            "--card-gradient": item.gradient,
          }}
        >
          <span className="practice-chroma-number">{String(index + 1).padStart(2, "0")}</span>
          <div className="practice-chroma-copy">
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </div>
        </article>
      ))}
      <div className="practice-chroma-overlay" aria-hidden="true" />
      <div ref={fadeRef} className="practice-chroma-fade" aria-hidden="true" />
    </div>
  );
}
