'use client';

import Image from 'next/image';
import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

/**
 * THE SIGNATURE ELEMENT
 *
 * A draggable reveal between the empty flat and the finished room.
 *
 * Chosen over the alternative (a materials-swatch motif in section dividers)
 * for three reasons:
 *   1. Transformation is literally the product. The interaction IS the pitch.
 *   2. Neither national competitor does this on their Ranchi pages.
 *   3. It is the one thing a visitor will describe to their spouse afterwards.
 *
 * It is the only signature interaction on the site. Everything else stays quiet.
 *
 * Accessibility: this is a real slider, not a mouse toy. It is keyboard
 * operable via arrow keys, exposes role="slider" with proper ARIA values, and
 * both images carry their own alt text so the content survives with no
 * interaction at all.
 *
 * Performance: no layout shift. The aspect ratio is fixed by the wrapper, both
 * images are sized with explicit `sizes`, and only the "after" image is eager
 * when the component is marked as priority.
 */

type Props = {
  before: { src: string; alt: string };
  after: { src: string; alt: string };
  /** Caption below the frame. */
  label?: string;
  priority?: boolean;
  className?: string;
};

export function BeforeAfterSlider({ before, after, label, priority = false, className }: Props) {
  const [position, setPosition] = useState(50);
  const [dragging, setDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const labelId = useId();

  const updateFromClientX = useCallback((clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect || rect.width === 0) return;
    const ratio = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(100, Math.max(0, ratio)));
  }, []);

  useEffect(() => {
    if (!dragging) return;

    const onMove = (event: PointerEvent) => {
      event.preventDefault();
      updateFromClientX(event.clientX);
    };
    const onUp = () => setDragging(false);

    window.addEventListener('pointermove', onMove, { passive: false });
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointercancel', onUp);

    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('pointercancel', onUp);
    };
  }, [dragging, updateFromClientX]);

  const onKeyDown = (event: React.KeyboardEvent) => {
    const step = event.shiftKey ? 10 : 2;
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      setPosition((p) => Math.max(0, p - step));
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      setPosition((p) => Math.min(100, p + step));
    } else if (event.key === 'Home') {
      event.preventDefault();
      setPosition(0);
    } else if (event.key === 'End') {
      event.preventDefault();
      setPosition(100);
    }
  };

  return (
    <figure className={cn('w-full', className)}>
      <div
        ref={containerRef}
        onPointerDown={(e) => {
          setDragging(true);
          updateFromClientX(e.clientX);
        }}
        className={cn(
          'relative aspect-[4/3] w-full select-none overflow-hidden rounded-card bg-ink-50 sm:aspect-[3/2]',
          dragging ? 'cursor-grabbing' : 'cursor-grab',
        )}
        // Vertical scrolling still works; only horizontal drag is captured.
        style={{ touchAction: 'pan-y' }}
      >
        {/* After, the finished room. Sits underneath as the base layer. */}
        <Image
          src={after.src}
          alt={after.alt}
          fill
          priority={priority}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 640px"
          className="object-cover"
        />

        {/* Before, the empty flat. Clipped to the slider position. */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          <Image
            src={before.src}
            alt={before.alt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 640px"
            className="object-cover"
          />
        </div>

        <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-ink-950/70 px-2.5 py-1 text-caption font-medium text-white backdrop-blur-sm">
          Before
        </span>
        <span className="pointer-events-none absolute right-3 top-3 rounded-full bg-accent-600/90 px-2.5 py-1 text-caption font-medium text-white backdrop-blur-sm">
          After
        </span>

        {/* The divider line. */}
        <div
          className="pointer-events-none absolute inset-y-0 w-0.5 bg-white/90 shadow-[0_0_12px_rgba(0,0,0,0.35)]"
          style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
          aria-hidden="true"
        />

        {/* The handle. Focusable, 44px, and the actual slider control. */}
        <div
          role="slider"
          tabIndex={0}
          aria-label="Drag to reveal the finished room"
          aria-labelledby={label ? labelId : undefined}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(position)}
          aria-valuetext={`${Math.round(position)} percent before, ${100 - Math.round(position)} percent after`}
          aria-orientation="horizontal"
          onKeyDown={onKeyDown}
          /* Solid white on ink, not a translucent wash: the handle has to stay
             visible over a pale empty flat as well as a dark finished room. */
          className="absolute top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-[0_2px_10px_rgba(0,0,0,0.35)] transition-transform focus-visible:ring-2 focus-visible:ring-accent-600 focus-visible:ring-offset-2 active:scale-95"
          style={{ left: `${position}%` }}
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5 text-ink-900" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
            <path d="m9 6-5 6 5 6M15 6l5 6-5 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      {label ? (
        <figcaption id={labelId} className="mt-3 text-body-sm text-ink-600">
          {label}
        </figcaption>
      ) : null}
    </figure>
  );
}
