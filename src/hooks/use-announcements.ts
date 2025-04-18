
import { createClient } from '@supabase/supabase-js';
import { Announcement } from '@/types';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

export const useAnnouncements = () => {
  const createAnnouncement = async (announcement: Omit<Announcement, 'id' | 'createdAt' | 'isResolved'>) => {
    const { data, error } = await supabase
      .from('announcements')
      .insert([
        {
          type: announcement.type,
          item_type: announcement.itemType,
          title: announcement.title,
          description: announcement.description,
          location: announcement.location,
          date: announcement.date,
          contact_info: announcement.contactInfo,
          image_url: announcement.imageUrl,
        }
      ])
      .select()
      .single();

    if (error) throw error;
    return data;
  };

  return {
    createAnnouncement,
  };
};
