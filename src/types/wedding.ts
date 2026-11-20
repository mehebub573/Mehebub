export type Language = 'bn' | 'en';

export type EventId = 'holud' | 'biye' | 'boubhat';

export interface BilingualText {
  bn: string;
  en: string;
}

export interface WeddingEvent {
  id: EventId;
  title: BilingualText;
  subtitle: BilingualText;
  dateLabel: BilingualText;
  timeLabel: BilingualText;
  venueName: BilingualText;
  venueAddress: BilingualText;
  startIso: string;
  endIso: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  theme: 'holud' | 'biye' | 'boubhat';
}

export interface GalleryPhoto {
  id: string;
  src: string;
  alt: BilingualText;
  caption: BilingualText;
  category: BilingualText;
  dateLabel: BilingualText;
  spanClass: string;
}

export interface RsvpRecord {
  id: string;
  guestName: string;
  phone: string;
  attending: 'yes' | 'no';
  guestCount: number;
  events: EventId[];
  message: string;
  createdAt: string;
}

export interface RsvpSummary {
  totalResponses: number;
  attendingResponses: number;
  declinedResponses: number;
  totalConfirmedGuests: number;
}
