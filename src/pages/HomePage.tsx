
import { useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { AnnouncementList } from "@/components/AnnouncementList";
import { StatsSummary } from "@/components/StatsSummary";
import { announcements } from "@/data/announcements";
import { Announcement, AnnouncementType } from "@/types";

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<AnnouncementType | 'all'>('all');
  
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
          
          <AnnouncementList announcements={filteredAnnouncements.slice(0, 6)} />
          
          {filteredAnnouncements.length > 6 && (
            <div className="mt-8 text-center">
              <Link to="/recherche">
                <Button variant="outline">Voir plus d'annonces</Button>
              </Link>
            </div>
          )}
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
