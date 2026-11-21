import type { GalleryPhoto, WeddingEvent } from '../types/wedding';

export const COUPLE_INFO = {
  groom: {
    name: { bn: 'মেহেবুব', en: 'Mehebub' },
    fullName: { bn: 'মেহেবুব হোসেন', en: 'Mehebub Hossain' },
    parents: {
      bn: 'জনাব মোজাম্মেল হোসেন ও মিসেস রোকেয়া বেগম-এর স্নেহের পুত্র',
      en: 'Beloved son of Mr. Mozammel Hossain & Mrs. Rokeya Begum',
    },
  },
  bride: {
    name: { bn: 'সারিকা', en: 'Sarika' },
    fullName: { bn: 'সারিকা তাসনিম', en: 'Sarika Tasnim' },
    parents: {
      bn: 'জনাব শফিকুল ইসলাম ও মিসেস নাসরিন আক্তার-এর আদরের কন্যা',
      en: 'Beloved daughter of Mr. Shafiqul Islam & Mrs. Nasrin Akter',
    },
  },
  weddingTargetIso: '2030-03-30T19:00:00+06:00',
  mainDateLabel: {
    bn: 'শনিবার, ৩০ মার্চ ২০৩০',
    en: 'Saturday, 30 March 2030',
  },
  shortDateLabel: {
    bn: '৩০ · ০৩ · ২০৩০',
    en: '30 · 03 · 2030',
  },
  mainCity: {
    bn: 'ঢাকা, বাংলাদেশ',
    en: 'Dhaka, Bangladesh',
  },
  mainVenueName: {
    bn: 'সেনামালঞ্চ কনভেনশন হল',
    en: 'Senamalancha Convention Hall',
  },
  mainVenueAddress: {
    bn: 'নেভি গেট সংলগ্ন, ঢাকা ক্যান্টনমেন্ট, ঢাকা ১২০৬',
    en: 'Near Navy Gate, Dhaka Cantonment, Dhaka 1206',
  },
  musicTrack: {
    title: 'Alfaaz',
    artist: 'Hamza Malik, Zain Zohaib',
    youtubeId: 'cQq6iLF66Gc',
    youtubeUrl: 'https://www.youtube.com/watch?v=cQq6iLF66Gc',
  },
};

export const WEDDING_EVENTS: WeddingEvent[] = [
  {
    id: 'holud',
    title: { bn: 'গায়ে হলুদ', en: 'Gaye Holud' },
    subtitle: {
      bn: 'হলুদ, গান আর হাসি-খুশি রঙের এক উজ্জ্বল বিকেল',
      en: 'An afternoon of turmeric, folk songs, and marigold blooms',
    },
    dateLabel: { bn: 'বৃহস্পতিবার · ২৮ মার্চ ২০৩০', en: 'Thursday · 28 March 2030' },
    timeLabel: { bn: 'বিকেল ৪:০০ ঘটিকা', en: '4:00 PM Onwards' },
    venueName: { bn: 'গুলশান লেকভিউ গার্ডেন', en: 'Gulshan Lakeview Garden' },
    venueAddress: { bn: 'রোড ৭১, গুলশান ২, ঢাকা ১২১২', en: 'Road 71, Gulshan 2, Dhaka 1212' },
    startIso: '2030-03-28T16:00:00+06:00',
    endIso: '2030-03-28T22:00:00+06:00',
    coordinates: { lat: 23.7949, lng: 90.4152 },
    theme: 'holud',
  },
  {
    id: 'biye',
    title: { bn: 'শুভ বিয়ে ও আকদ', en: 'Wedding Ceremony (Biye)' },
    subtitle: {
      bn: 'মেহেবুব ও সারিকার চিরবন্ধনে আবদ্ধ হওয়ার শুভক্ষণ',
      en: 'Celebrating the sacred union of Mehebub & Sarika',
    },
    dateLabel: { bn: 'শনিবার · ৩০ মার্চ ২০৩০', en: 'Saturday · 30 March 2030' },
    timeLabel: { bn: 'সন্ধ্যা ৭:০০ ঘটিকা', en: '7:00 PM Onwards' },
    venueName: { bn: 'সেনামালঞ্চ কনভেনশন হল', en: 'Senamalancha Convention Hall' },
    venueAddress: { bn: 'ঢাকা ক্যান্টনমেন্ট, ঢাকা ১২০৬', en: 'Dhaka Cantonment, Dhaka 1206' },
    startIso: '2030-03-30T19:00:00+06:00',
    endIso: '2030-03-30T23:30:00+06:00',
    coordinates: { lat: 23.8017, lng: 90.3987 },
    theme: 'biye',
  },
  {
    id: 'boubhat',
    title: { bn: 'বউভাত (ওলিমা)', en: 'Boubhat Reception' },
    subtitle: {
      bn: 'নতুন বধূকে বরণ, প্রীতিভোজ ও পারিবারিক মিলনমেলা',
      en: 'Welcoming the bride with dinner, blessings, and family warmth',
    },
    dateLabel: { bn: 'সোমবার · ১ এপ্রিল ২০৩০', en: 'Monday · 1 April 2030' },
    timeLabel: { bn: 'সন্ধ্যা ৭:৩০ ঘটিকা', en: '7:30 PM Onwards' },
    venueName: { bn: 'দ্য অলিভস রেসিডেন্স', en: 'The Olives Convention Lounge' },
    venueAddress: { bn: 'রোড ২, বনানী, ঢাকা ১২১৩', en: 'Road 2, Banani, Dhaka 1213' },
    startIso: '2030-04-01T19:30:00+06:00',
    endIso: '2030-04-01T23:30:00+06:00',
    coordinates: { lat: 23.7937, lng: 90.4066 },
    theme: 'boubhat',
  },
];

export const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: 'couple-veranda',
    src: '/src/assets/images/Photo4.jpeg',
    alt: {
      bn: 'ঐতিহ্যবাহী বিয়ের সাজে মেহেবুব ও সারিকা',
      en: 'Mehebub and Sarika in traditional Bangladeshi wedding attire',
    },
    caption: {
      bn: 'গোধূলি আলোয় ঐতিহ্যবাহী জামদানি ও শেরওয়ানিতে দুটি হৃদয়ের যুগলবন্দী',
      en: 'Golden hour portrait in handloom crimson Jamdani and embroidered sherwani',
    },
    category: { bn: 'যুগল পোর্ট্রেট', en: 'Couple Portrait' },
    dateLabel: { bn: 'প্রাক-বিবাহ স্মৃতি', en: 'Pre-Wedding Editorial' },
    spanClass: 'md:col-span-2 md:row-span-2',
  },
  {
    id: 'holud-courtyard',
    src: '/src/assets/images/Photo3.jpeg',
    alt: {
      bn: 'গাঁদা ফুল ও হলুদে সাজানো গায়ে হলুদের আসর',
      en: 'Marigold garlands and turmeric bowls at Gaye Holud ceremony',
    },
    caption: {
      bn: 'হলুদ-সন্ধ্যা ও গাঁদা ফুলের মালায় সাজানো আশীর্বাদের মুহূর্ত',
      en: 'Cascading marigold blooms and blessings of turmeric in afternoon sun',
    },
    category: { bn: 'গায়ে হলুদ', en: 'Gaye Holud' },
    dateLabel: { bn: '২৮ মার্চ ২০৩০', en: '28 March 2030' },
    spanClass: 'md:col-span-1 md:row-span-1',
  },
  {
    id: 'mehndi-jasmine',
    src: '/src/assets/images/Photo2.jpeg',
    alt: {
      bn: 'মেহেদি রাঙা হাতে বেলি ফুলের মালা ও সোনার বালা',
      en: 'Bridal mehndi hands holding fresh jasmine blossoms',
    },
    caption: {
      bn: 'মেহেদির আল্পনা ও বেলি ফুলের সুবাসে কনের সাজ',
      en: 'Intricate henna motifs paired with heirloom gold bangles and jasmine',
    },
    category: { bn: 'মেহেদি ও সাজ', en: 'Mehndi Details' },
    dateLabel: { bn: 'সাজসজ্জা', en: 'Bridal Craft' },
    spanClass: 'md:col-span-1 md:row-span-1',
  },
  {
    id: 'evening-pavilion',
    src: '/src/assets/images/Photo1.jpeg',
    alt: {
      bn: 'রাতের আলোকসজ্জায় সাজানো বিয়ের মণ্ডপ ও অতিথি আঙিনা',
      en: 'Evening wedding reception pavilion lit with fairy lights and floral arches',
    },
    caption: {
      bn: 'নক্ষত্রখচিত আকাশের নিচে আলো ও ফুলের মণ্ডপ — আপনাদের অপেক্ষায়',
      en: 'Jasmine arches and warm lantern glow awaiting your gracious presence',
    },
    category: { bn: 'বিয়ের আসর', en: 'Evening Venue' },
    dateLabel: { bn: '৩০ মার্চ ২০৩০', en: '30 March 2030' },
    spanClass: 'md:col-span-2 md:row-span-1',
  },
];
