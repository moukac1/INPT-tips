
import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AnnouncementFilters } from "@/components/AnnouncementFilters";
import { AnnouncementList } from "@/components/AnnouncementList";
import { announcements as allAnnouncements } from "@/data/announcements";
import { Announcement, AnnouncementType, ItemType } from "@/types";

export default function SearchPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [filters, setFilters] = useState({
    search: '',
    type: 'all' as AnnouncementType | 'all',
    itemType: 'all' as ItemType | 'all'
  });

  useEffect(() => {
    // Apply filters
    const filteredAnnouncements = allAnnouncements.filter((announcement) => {
      // Filter by search term
      const matchesSearch = !filters.search || 
        announcement.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        announcement.description.toLowerCase().includes(filters.search.toLowerCase()) ||
        announcement.location.toLowerCase().includes(filters.search.toLowerCase());
      
      // Filter by announcement type
      const matchesType = filters.type === 'all' || announcement.type === filters.type;
      
      // Filter by item type
      const matchesItemType = filters.itemType === 'all' || announcement.itemType === filters.itemType;
      
      return matchesSearch && matchesType && matchesItemType && !announcement.isResolved;
    });

    // Sort by date, newest first
    const sortedAnnouncements = [...filteredAnnouncements].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    
    setAnnouncements(sortedAnnouncements);
  }, [filters]);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1 bg-retrouve-gray">
        <div className="container py-8 md:py-12">
          <h1 className="text-2xl md:text-3xl font-bold mb-8">Rechercher des annonces</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-1">
              <AnnouncementFilters onFilterChange={setFilters} />
            </div>
            
            <div className="lg:col-span-3">
              <div className="bg-white p-6 rounded-lg shadow-sm border mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-medium">Résultats de recherche</h2>
                  <span className="text-sm text-muted-foreground">
                    {announcements.length} {announcements.length > 1 ? 'annonces' : 'annonce'}
                  </span>
                </div>
                
                <AnnouncementList announcements={announcements} />
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
