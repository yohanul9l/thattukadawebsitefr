export interface PhotoItem {
  id: string;
  title: string;
  malayalamTitle: string;
  category: 'banner' | 'tea-stall' | 'nature' | 'hangout';
  src: string;
  aspectRatio: 'banner' | '16:9' | '4:3';
  description: string;
  tags: string[];
  featured?: boolean;
}

export interface DiscordChannel {
  id: string;
  name: string;
  category: string;
  type: 'text' | 'voice';
  description: string;
  sampleMessage?: {
    user: string;
    avatarBg: string;
    text: string;
    time: string;
  };
}

export interface CommunityRule {
  number: string;
  title: string;
  description: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}
