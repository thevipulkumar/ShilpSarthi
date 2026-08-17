/**
 * WORK VIDEOS
 *
 * Every video here is from Shilp Sarthi's own YouTube channel, so this is the
 * one place on the site showing genuinely original footage of real work rather
 * than a placeholder.
 *
 * All four are vertical Shorts. Poster frames live in /public/images/video and
 * are taken from each video's own YouTube thumbnail, cropped back to the true
 * 9:16 frame, so nothing here is stock and nothing is borrowed.
 *
 * The Oak Forest poster is the one exception, and deliberately so. That upload
 * carries the franchisor's logo and wordmark burned into the top of the frame,
 * and the site is not permitted to render that mark (config/theme.ts,
 * HOMELANE_LOGO_PERMITTED = false). Its poster is therefore taken from the
 * native 1080x1920 walkthrough still of the same dining area instead: same flat,
 * same footage, sharper than the 405px-wide thumbnail strip, and no mark.
 * NOTE: pressing play still streams the logo from YouTube. Only a re-upload
 * without the overlay fixes that.
 *
 * To add another: put the video id in `youtubeId`, then save its poster to
 * public/images/video/<id>-poster.jpg at 720x1280. There is a one-liner for
 * that in the README.
 */

export type WorkVideo = {
  youtubeId: string;
  /** The video's real title on the channel. */
  title: string;
  /** Short caption shown under the frame. Plain description, no sales copy. */
  caption: string;
  /** What a viewer actually sees. Used as the poster's alt text. */
  posterAlt: string;
  poster: string;
  /** Vertical Shorts are 9:16. A landscape upload would be 16:9. */
  aspect: '9/16' | '16/9';
  /** Optional link to the matching portfolio project. */
  projectSlug?: string;
};

export const workVideos: WorkVideo[] = [
  /*
   * Leads the section: it is the only video that pairs with a project page built
   * from that same walkthrough, so it is the strongest thing to open on.
   */
  {
    youtubeId: 'Yc8F_qY-WOQ',
    title: 'Project at Oak Forest, Pundag, Ranchi',
    caption: 'A walkthrough of the finished 3 BHK, room by room.',
    posterAlt:
      'Dining table and chairs in the completed Oak Forest flat at Pundag, Ranchi, with the modular kitchen behind and cove lighting overhead',
    poster: '/images/video/Yc8F_qY-WOQ-poster.jpg',
    aspect: '9/16',
    projectSlug: 'oak-forest-pundag',
  },
  {
    youtubeId: 'WLXmepaZQbQ',
    title: 'Anytime Fitness, Kanke Road',
    caption: 'The client on working with our team, filmed at the finished gym.',
    posterAlt:
      'Client at Anytime Fitness on Kanke Road, Ranchi, speaking to camera about working with Shilp Sarthi',
    poster: '/images/video/WLXmepaZQbQ-poster.jpg',
    aspect: '9/16',
    projectSlug: 'kanke-road-anytime-fitness',
  },
  {
    youtubeId: 'B6hFt9uHg-o',
    title: 'Project walkthrough, Ranchi',
    caption: 'Wood panelling, cove lighting and fitted joinery in a finished home.',
    posterAlt:
      'Finished Ranchi interior with wood wall panelling, false ceiling cove lighting and a fitted mirror wardrobe',
    poster: '/images/video/B6hFt9uHg-o-poster.jpg',
    aspect: '9/16',
  },
  {
    youtubeId: 'QamwqOLk82c',
    title: 'Handover day, Ranchi',
    caption: 'Entrance detailing on a completed project.',
    posterAlt:
      'Brass urli bowl with marigold petals on a console at the entrance of a completed Ranchi project',
    poster: '/images/video/QamwqOLk82c-poster.jpg',
    aspect: '9/16',
  },
];

export function getVideoForProject(slug: string): WorkVideo | undefined {
  return workVideos.find((v) => v.projectSlug === slug);
}
