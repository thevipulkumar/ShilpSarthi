import { getImage, violatesSlotRule, type ImageSlot } from '@/content/images';
import { MediaFrame } from '@/components/ui/MediaFrame';

/**
 * The only way an image reaches a page.
 *
 * Components ask for a slot id. They never name a file, which is what keeps
 * every asset swappable from the manifest and keeps the provenance audit honest.
 *
 * It also enforces the rule that a licensed third-party photograph may not
 * occupy a slot that claims to show Shilp Sarthi's own work. In development that
 * throws, loudly, at the moment someone introduces it. In production it degrades
 * to the placeholder rather than taking the site down, because a missing image
 * is a smaller problem than a blank page, and a far smaller one than a HomeLane
 * metro photograph captioned "Bariatu, Ranchi | 3BHK" on a page carrying paid
 * traffic.
 */

type Props = {
  id: string;
  ratio?: '4/3' | '3/2' | '1/1' | '16/9';
  sizes: string;
  priority?: boolean;
  className?: string;
  /** Overrides the manifest alt where a page needs more specific wording. */
  alt?: string;
  /** Forces the placeholder, e.g. while a real photograph is still awaited. */
  pending?: boolean;
  pendingLabel?: string;
};

export function SiteImage({
  id,
  ratio = '4/3',
  sizes,
  priority,
  className,
  alt,
  pending,
  pendingLabel,
}: Props) {
  const slot: ImageSlot | undefined = getImage(id);

  if (!slot) {
    if (process.env.NODE_ENV === 'development') {
      throw new Error(`SiteImage: no slot "${id}" in content/images.ts`);
    }
    return null;
  }

  if (violatesSlotRule(slot)) {
    const message =
      `SiteImage: slot "${slot.id}" is kind "own-work" but its source is ` +
      `"${slot.source}". A licensed third-party photograph cannot stand in for ` +
      `Shilp Sarthi's own work: the caption around it makes a factual claim the ` +
      `licence does not make true. Supply an own photograph, or change the slot ` +
      `to kind "illustrative" and remove the claim from the surrounding copy.`;

    if (process.env.NODE_ENV === 'development') throw new Error(message);
    console.error(message);
    return (
      <MediaFrame
        src={slot.src}
        alt={alt ?? slot.alt}
        pending
        pendingLabel="Awaiting Shilp Sarthi's own photograph"
        ratio={ratio}
        sizes={sizes}
        className={className}
      />
    );
  }

  return (
    <MediaFrame
      src={slot.src}
      alt={alt ?? slot.alt}
      pending={pending ?? false}
      pendingLabel={pendingLabel}
      ratio={ratio}
      sizes={sizes}
      priority={priority}
      className={className}
    />
  );
}
