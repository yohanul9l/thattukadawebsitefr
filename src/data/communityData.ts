import { PhotoItem, DiscordChannel, CommunityRule, FAQItem } from '../types';

import vallamBannerImg from '../assets/images/thathukada_empty_vallam_1791527466776.jpg';
import rainCourtyardImg from '../assets/images/thattukada_rain_courtyard_1791527646451.jpg';
import iconNightImg from '../assets/images/thattukada_icon_night_1791527633830.jpg';
import teaStallImg from '../assets/images/thattukada_tea_stall_1791525496722.jpg';
import cafeVibesImg from '../assets/images/thattukada_cafe_vibes_1791525507717.jpg';
import monsoonNightImg from '../assets/images/thattukada_monsoon_night_1791525519320.jpg';

export const COMMUNITY_PHOTOS: PhotoItem[] = [
  {
    id: 'thattukada-banner',
    title: 'The Official Thattukada Banner',
    malayalamTitle: 'ഔദ്യോഗിക തട്ടുകട ബാനർ',
    category: 'banner',
    src: vallamBannerImg,
    aspectRatio: '16:9',
    description: 'The iconic Discord server banner featuring the traditional Kerala vallam canoe resting on the rain-dappled backwaters under the white calligraphy "തട്ടുകട".',
    tags: ['Official Banner', 'Vallam', 'Rain', 'Backwaters'],
    featured: true,
  },
  {
    id: 'thattukada-courtyard',
    title: 'Rainy Courtyard & Bucket',
    malayalamTitle: 'മഴയത്തെ മുറ്റവും തൊട്ടിയും',
    category: 'nature',
    src: rainCourtyardImg,
    aspectRatio: '16:9',
    description: 'Studio Ghibli style rain scene featuring a rustic metal bucket, water basin, wet river cobblestones, and delicate blue flowers in the pouring rain with "തട്ടുകട" lettering.',
    tags: ['Official Art', 'Courtyard', 'Raindrops', 'Ghibli'],
    featured: true,
  },
  {
    id: 'thattukada-icon',
    title: 'The Discord Server Icon (Avatar)',
    malayalamTitle: 'ഔദ്യോഗിക സെർവർ ഐക്കൺ',
    category: 'banner',
    src: iconNightImg,
    aspectRatio: '4:3',
    description: 'The square Discord server profile icon featuring dark stormy skies, bamboo leaves swaying in the monsoon wind, and the signature white "തട്ടുകട" emblem.',
    tags: ['Official Icon', 'Night Sky', 'Bamboo', 'Storm'],
    featured: true,
  },
  {
    id: 'thattukada-tea-stall',
    title: 'Late Night Chayakada & Samovar',
    malayalamTitle: 'രാത്രി ചായക്കടയും സമോവറും',
    category: 'tea-stall',
    src: teaStallImg,
    aspectRatio: '4:3',
    description: 'Steaming glass tumblers of piping hot chai, freshly fried pazhampori and vadas on display under warm amber tungsten lanterns during evening drizzle.',
    tags: ['Chai', 'Pazhampori', 'Kerala Street', 'Nostalgia'],
    featured: true,
  },
  {
    id: 'thattukada-hangout',
    title: 'Veranda Banter & Friendship',
    malayalamTitle: 'വരാന്തയിലെ കൂട്ടായ്മയും സംഭാഷണങ്ങളും',
    category: 'hangout',
    src: cafeVibesImg,
    aspectRatio: '4:3',
    description: 'Friends sharing stories and hearty laughs on an ancestral rain-soaked veranda with glasses of tea and string lights overhead.',
    tags: ['Friends', 'Community', 'Monsoon', 'Chaya Charcha'],
    featured: true,
  },
  {
    id: 'thattukada-night-jetty',
    title: 'Twilight Reflections at the Jetty',
    malayalamTitle: 'കായൽവക്കത്തെ സന്ധ്യാദീപങ്ങൾ',
    category: 'nature',
    src: monsoonNightImg,
    aspectRatio: '16:9',
    description: 'Luminous paper lanterns casting golden ripples across quiet Kerala backwaters while raindrops tap gently on the wooden planks.',
    tags: ['Backwaters', 'Lanterns', 'Quiet Hours', 'Lo-fi'],
    featured: true,
  },
];

export const DISCORD_CHANNELS: DiscordChannel[] = [
  {
    id: 'chat',
    name: '🍵 : Chat',
    category: '🧉 ഒ : ChatZ',
    type: 'text',
    description: 'The main open Malayalam & general chatroom. Grab a hot cup of tea, discuss your day, share memes, and hang out with friends.',
    sampleMessage: {
      user: 'kiran_vibes',
      avatarBg: 'bg-emerald-600',
      text: 'Mazha thudangi guys, time for hot black tea and good music 🌧️☕',
      time: 'Today at 9:42 PM',
    },
  },
  {
    id: 'english-chat',
    name: '🍜 : English-Chat',
    category: '🧉 ഒ : ChatZ',
    type: 'text',
    description: 'Dedicated English discussion channel for global friends, non-Malayalam speakers, and international discussions.',
    sampleMessage: {
      user: 'neha_plays',
      avatarBg: 'bg-amber-600',
      text: 'Welcome to the server everyone! Anyone up for games later tonight?',
      time: 'Today at 10:15 PM',
    },
  },
  {
    id: 'gallery',
    name: '📷 : Gallery',
    category: '🧉 ഒ : ChatZ',
    type: 'text',
    description: 'Photo gallery channel for member captures: sunsets, backwaters, food photography, aesthetic desk setups, and travels.',
    sampleMessage: {
      user: 'fayiz_cam',
      avatarBg: 'bg-rose-600',
      text: 'Captured this evening rain on my camera. The lighting was surreal ✨',
      time: 'Yesterday at 7:20 PM',
    },
  },
  {
    id: 'pets',
    name: '🐾 : Pets',
    category: '🧉 ഒ : ChatZ',
    type: 'text',
    description: 'A cozy spot to share photos, videos, and cute antics of your cats, dogs, birds, and animal companions.',
    sampleMessage: {
      user: 'sneha_pets',
      avatarBg: 'bg-purple-600',
      text: 'My cat decided to sit right on top of my headset during voice chat 😸',
      time: 'Today at 6:05 PM',
    },
  },
  {
    id: 'confessions',
    name: '🍭 : Confessions',
    category: '🧉 ഒ : ChatZ',
    type: 'text',
    description: 'Anonymous & lighthearted confessions, late-night musings, untold funny stories, and wholesome secrets.',
    sampleMessage: {
      user: 'anon_user',
      avatarBg: 'bg-pink-600',
      text: 'Confession: I log into Discord at 1 AM just to listen to the rain bot and read chat while falling asleep 🌙',
      time: 'Yesterday at 11:42 PM',
    },
  },
  {
    id: 'talents',
    name: '🪞 : Talents',
    category: '🧉 ഒ : ChatZ',
    type: 'text',
    description: 'Showcase your creative abilities: guitar and vocal covers, digital art, sketches, poetry, writing, and creative projects.',
    sampleMessage: {
      user: 'anand_tunes',
      avatarBg: 'bg-blue-600',
      text: 'Recorded an acoustic guitar cover of an old Malayalam melody 🎸',
      time: 'Today at 8:30 PM',
    },
  },
];

export const COMMUNITY_RULES: CommunityRule[] = [
  {
    number: '01',
    title: 'Respect the Table',
    description: 'Treat every member with fundamental dignity and warmth. No hate speech, discrimination, harassment, or personal attacks under any circumstance.',
  },
  {
    number: '02',
    title: 'Keep the Banter Warm & Safe',
    description: 'Humor and playful teasing are part of Kerala teashop culture, but keep it friendly and consensual. Know when to step back if someone is uncomfortable.',
  },
  {
    number: '03',
    title: 'No Spam or Unsolicited Promotion',
    description: 'Keep self-promotion and external links to dedicated channels (#showcase). Keep discussions focused on building genuine human connections.',
  },
  {
    number: '04',
    title: 'Language Inclusivity',
    description: 'Both Malayalam (Malayalam script or Manglish) and English are welcomed. Never mock anyone for their language proficiency, dialect, or background.',
  },
];

export const FAQS: FAQItem[] = [
  {
    question: 'What is the inspiration behind Thattukada Discord?',
    answer: 'In Kerala, a "Thattukada" is an informal roadside tea and food stall where friends and travelers gather at odd hours for steaming tea, hot snacks, and candid conversations. We built this digital sanctuary to recreate that comforting, judgment-free atmosphere online.',
  },
  {
    question: 'Do I need to speak fluent Malayalam to join?',
    answer: 'Not at all! While many members are Malayalis connecting across the globe, we have members from all backgrounds and the server is completely welcoming to English speakers as well.',
  },
  {
    question: 'How do I get custom roles on the server?',
    answer: 'Upon joining, head over to the #roles channel to pick your interest roles (Gaming, Music, Art, Tech, Anime) and notification preferences with simple reaction clicks.',
  },
  {
    question: 'Are there voice events and game nights?',
    answer: 'Yes! We host weekly community movie streams, Scribble/Gartic game nights, music jams, and casual gaming tourneys every weekend.',
  },
];
