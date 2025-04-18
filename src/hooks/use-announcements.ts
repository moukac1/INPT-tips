
import { supabase } from "@/integrations/supabase/client";
import { Announcement } from '@/types';

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

  const getAnnouncements = async () => {
    const { data, error } = await supabase
      .from('announcements')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  };

  return {
    createAnnouncement,
    getAnnouncements,
  };
};
