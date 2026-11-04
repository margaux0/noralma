import { useState, type ReactNode } from "react";

type MarqueeProps = {
  /** Tarjetas en orden. Se duplican una vez para que el bucle no tenga corte. */
  items: ReactNode[];
  /** Segundos que tarda en recorrer una vuelta completa. */
  duration?: number;
  /** true para que avance hacia la derecha. */
  reverse?: boolean;
  /** Pausa externa (por ejemplo, el botón de pausa). */
  paused?: boolean;
  className?: string;
};

/**
 * Carrusel continuo: las tarjetas se deslizan sin parar, como un vídeo.
 * Se detiene al pasar el ratón o al enfocar con el teclado, y respeta
 * la opción de "reducir movimiento" del sistema.
 */
export function Marquee({
  items,
  duration = 60,
  reverse = false,
  paused = false,
  className = "",
}: MarqueeProps) {
  const [interacting, setInteracting] = useState(false);
  const running = !paused && !interacting;

  return (
    <div
      className={`marquee${className ? ` ${className}` : ""}`}
      data-review-track
      onMouseEnter={() => setInteracting(true)}
      onMouseLeave={() => setInteracting(false)}
      onFocusCapture={() => setInteracting(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setInteracting(false);
      }}
    >
      <div
        className="marquee__track"
        style={{
          animationDuration: `${duration}s`,
          animationDirection: reverse ? "reverse" : "normal",
          animationPlayState: running ? "running" : "paused",
        }}
      >
        <div className="flex shrink-0">{items}</div>
        <div className="flex shrink-0" inert aria-hidden="true">
          {items}
        </div>
      </div>
    </div>
  );
}
