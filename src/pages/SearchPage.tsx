
import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AnnouncementList } from "@/components/AnnouncementList";
import { useAnnouncements } from "@/hooks/use-announcements";
import { Announcement, AnnouncementType } from "@/types";
import { useToast } from "@/hooks/use-toast";

export default function SearchPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { getAnnouncements } = useAnnouncements();
  const { toast } = useToast();
  
  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        setIsLoading(true);
        const data = await getAnnouncements();
        
        // Transform data to match the Announcement type
        const formattedAnnouncements: Announcement[] = data.map((item: any) => ({
          id: item.id,
          type: item.type as AnnouncementType,
          itemType: item.item_type,
          title: item.title,
          description: item.description,
          location: item.location,
          date: item.date,
          contactInfo: item.contact_info,
          imageUrl: item.image_url,
          createdAt: item.created_at,
          isResolved: item.is_resolved || false
        }));
        
        setAnnouncements(formattedAnnouncements);
      } catch (error) {
        console.error("Error fetching announcements:", error);
        toast({
          title: "Erreur",
          description: "Impossible de charger les annonces",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnnouncements();
  }, [getAnnouncements, toast]);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1 bg-retrouve-gray">
        <div className="container py-8 md:py-12">
          <h1 className="text-2xl md:text-3xl font-bold mb-6">Recherche d'annonces</h1>
          
          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">Chargement des annonces...</p>
            </div>
          ) : (
            <AnnouncementList announcements={announcements} />
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
