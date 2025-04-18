
export type ItemType = 'object' | 'animal' | 'person';
export type AnnouncementType = 'lost' | 'found';

export interface Announcement {
  id: string;
  type: AnnouncementType;
  itemType: ItemType;
  title: string;
  description: string;
  location: string;
  date: string;
  contactInfo: string;
  imageUrl?: string;
  createdAt: string;
  isResolved: boolean;
}
