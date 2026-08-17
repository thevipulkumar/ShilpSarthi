# Image assets to supply

Every file below is currently a generated placeholder. Drop the real file at the
exact same path and filename, then set the matching `assetsPending` /
`photoPending` / `pending` flag to false in the content file noted.

Do not caption a stock photograph as a real Ranchi project. That is what the
previous site did and it is a misrepresentation risk under both Google Ads and
Meta ad policy.

## Portfolio, content/projects.ts -> set assetsPending: false per project
- public/images/projects/bariatu-3bhk-full-home.jpg  (1200x900, 4:3)  3 BHK full home in Bariatu
- public/images/projects/harmu-2bhk-kitchen-wardrobes.jpg  (1200x900, 4:3)  2 BHK kitchen and wardrobes in Harmu
- public/images/projects/kanke-villa-full-home.jpg  (1200x900, 4:3)  Villa full home on Kanke Road
- public/images/projects/doranda-3bhk-full-home.jpg  (1200x900, 4:3)  3 BHK full home in Doranda
- public/images/projects/lalpur-2bhk-full-home.jpg  (1200x900, 4:3)  2 BHK full home in Lalpur
- public/images/projects/kanke-road-anytime-fitness.jpg  (1200x900, 4:3)  Anytime Fitness on Kanke Road

## Before and after pairs, needed for the reveal slider
Both files in a pair are required. If there is no genuine "before" shot, set
`before` and `after` to null in content/projects.ts and the card falls back to a
single static image. A slider with a faked before is worse than no slider.
- public/images/projects/bariatu-3bhk-before.jpg + bariatu-3bhk-after.jpg  (1400x933, 3:2)  3 BHK living room, Bariatu
- public/images/projects/harmu-2bhk-before.jpg + harmu-2bhk-after.jpg  (1400x933, 3:2)  2 BHK kitchen, Harmu
- public/images/projects/kanke-villa-before.jpg + kanke-villa-after.jpg  (1400x933, 3:2)  Villa living room, Kanke Road
- public/images/projects/lalpur-2bhk-before.jpg + lalpur-2bhk-after.jpg  (1400x933, 3:2)  2 BHK living and dining, Lalpur

## Service pages, content/services.ts
- public/images/services/full-home-interiors.jpg  (1200x900, 4:3)  Completed full home interior, Ranchi
- public/images/services/modular-kitchen.jpg  (1200x900, 4:3)  Completed modular kitchen, Ranchi
- public/images/services/bedroom-wardrobe.jpg  (1200x900, 4:3)  Completed bedroom and wardrobe, Ranchi
- public/images/services/living-room.jpg  (1200x900, 4:3)  Completed living room, Ranchi
- public/images/services/commercial-interiors.jpg  (1200x900, 4:3)  Completed commercial fit-out, Ranchi

## Studio and team
- public/images/studio/shilp-sarthi-studio-singh-more.jpg  (1200x900)  the actual studio interior
- public/images/studio/shilp-sarthi-team-ranchi.jpg  (1200x900)  the actual team
- public/images/team/project-manager.jpg  (1200x900)  REAL portrait. Never a stock face.

## Video
Nothing outstanding. All three homepage videos are real films from the studio's
own YouTube channel, and their poster frames are cropped from their own
thumbnails. To add another, see the "Work videos" section of the README.

## Share card and icons
- public/images/og/default.jpg  (1200x630)  Open Graph card
- public/icon-192.png, public/icon-512.png  generated from app/icon.svg, fine as is
