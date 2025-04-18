
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { AnnouncementList } from "@/components/AnnouncementList";
import { StatsSummary } from "@/components/StatsSummary";
import { Announcement, AnnouncementType } from "@/types";
import { useAnnouncements } from "@/hooks/use-announcements";
import { useToast } from "@/hooks/use-toast";

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<AnnouncementType | 'all'>('all');
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { getAnnouncements } = useAnnouncements();
  const { toast } = useToast();
  
  // Fetch announcements from Supabase
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
  
  // Filter announcements by tab
  const filteredAnnouncements = announcements.filter((announcement) => {
    if (activeTab === 'all') return !announcement.isResolved;
    return announcement.type === activeTab && !announcement.isResolved;
  }).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1">
        <section className="bg-retrouve-blue py-12 md:py-16">
          <div className="container text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Retrouv'Moi
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Plateforme de pertes et retrouvailles de l'établissement. Signalez un objet perdu ou trouvé pour faciliter les retrouvailles.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/publier?type=lost">
                <Button size="lg" variant="outline" className="border-white bg-white/10 text-white hover:bg-white/20">
                  J'ai perdu quelque chose
                </Button>
              </Link>
              <Link to="/publier?type=found">
                <Button size="lg" variant="outline" className="border-white bg-white/10 text-white hover:bg-white/20">
                  J'ai trouvé quelque chose
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="container py-8 md:py-12">
          <div className="mb-8">
            <StatsSummary announcements={announcements} />
          </div>
          
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Annonces récentes</h2>
              <Link to="/recherche" className="text-retrouve-blue hover:underline">
                Voir toutes les annonces →
              </Link>
            </div>
            
            <div className="flex overflow-x-auto py-4 gap-2 border-b mb-6">
              <Button 
                variant={activeTab === 'all' ? "default" : "ghost"}
                className={activeTab === 'all' ? "bg-retrouve-blue hover:bg-retrouve-blue-dark" : ""}
                onClick={() => setActiveTab('all')}
              >
                Toutes
              </Button>
              <Button 
                variant={activeTab === 'lost' ? "default" : "ghost"}
                className={activeTab === 'lost' ? "bg-retrouve-red hover:bg-retrouve-red-dark" : ""}
                onClick={() => setActiveTab('lost')}
              >
                Perdus
              </Button>
              <Button 
                variant={activeTab === 'found' ? "default" : "ghost"}
                className={activeTab === 'found' ? "bg-retrouve-green hover:bg-retrouve-green-dark" : ""}
                onClick={() => setActiveTab('found')}
              >
                Trouvés
              </Button>
            </div>
          </div>
          
          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">Chargement des annonces...</p>
            </div>
          ) : (
            <>
              <AnnouncementList announcements={filteredAnnouncements.slice(0, 6)} />
              
              {filteredAnnouncements.length > 6 && (
                <div className="mt-8 text-center">
                  <Link to="/recherche">
                    <Button variant="outline">Voir plus d'annonces</Button>
                  </Link>
                </div>
              )}
            </>
          )}
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
