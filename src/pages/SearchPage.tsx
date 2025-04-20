import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AnnouncementList } from "@/components/AnnouncementList";
import { useAnnouncements } from "@/hooks/use-announcements";
import { Announcement, AnnouncementType , ItemType } from "@/types";
import { useToast } from "@/hooks/use-toast";

export default function SearchPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { getAnnouncements } = useAnnouncements();
  const { toast } = useToast();
  
  useEffect(() => {
    const fetchAnnouncements = async () => {
      const data = await getAnnouncements();
      if (data) {
        const formattedAnnouncements: Announcement[] = data.map((item: {
          id: string;
          type: string;
          item_type: string;
          title: string;
          description: string;
          location: string;
          date: string;
          contact_info: string;
          created_at: string;
          image_url?: string;
          is_resolved?: boolean;
        }) => ({
          id: item.id,
          type: item.type as AnnouncementType,
          itemType: item.item_type as ItemType,
          title: item.title,
          description: item.description,
          location: item.location,
          date: item.date,
          contactInfo: item.contact_info,
          createdAt: item.created_at,
          imageUrl: item.image_url,
          isResolved: item.is_resolved || false,
        }));
        setAnnouncements(formattedAnnouncements);
      }
    };
  
    fetchAnnouncements();
  }, [getAnnouncements]);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 bg-retrouve-gray">
        <div className="container py-8 md:py-12">
          <h1 className="text-2xl md:text-3xl font-bold mb-6">Recherche d'annonces</h1>

          <AnnouncementList announcements={announcements} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
