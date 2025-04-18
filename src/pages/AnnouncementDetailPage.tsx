
import { useParams, Link, useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, MapPin, Mail, User } from "lucide-react";
import { announcements } from "@/data/announcements";

export default function AnnouncementDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const announcement = announcements.find((a) => a.id === id);

  if (!announcement) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 container py-12">
          <div className="flex flex-col items-center justify-center h-full">
            <h1 className="text-2xl font-bold mb-4">Annonce introuvable</h1>
            <p className="text-muted-foreground mb-8">L'annonce que vous recherchez n'existe pas ou a été supprimée.</p>
            <Button onClick={() => navigate('/')}>Retour à l'accueil</Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const { type, itemType, title, description, location, date, contactInfo, imageUrl, createdAt } = announcement;

  const typeColorClass = type === 'lost' 
    ? 'bg-retrouve-red text-white hover:bg-retrouve-red-dark' 
    : 'bg-retrouve-green text-white hover:bg-retrouve-green-dark';

  const itemTypeLabel = {
    'object': 'Objet',
    'animal': 'Animal',
    'person': 'Personne'
  }[itemType];

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1 bg-retrouve-gray">
        <div className="container py-8 md:py-12">
          <Button variant="ghost" className="mb-6" onClick={() => navigate(-1)}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour
          </Button>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
                <div className={type === 'lost' ? 'bg-retrouve-red' : 'bg-retrouve-green'} style={{ height: '8px' }} />
                
                <div className="p-6">
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge className={typeColorClass}>
                      {type === 'lost' ? 'Perdu' : 'Trouvé'}
                    </Badge>
                    <Badge variant="outline">{itemTypeLabel}</Badge>
                  </div>
                  
                  <h1 className="text-2xl font-bold mb-4">{title}</h1>
                  
                  {imageUrl && (
                    <div className="relative aspect-video mb-6 rounded-md overflow-hidden bg-muted">
                      <img 
                        src={imageUrl} 
                        alt={title} 
                        className="object-cover w-full h-full"
                      />
                    </div>
                  )}
                  
                  <div className="prose max-w-none">
                    <h2 className="text-lg font-medium mb-2">Description</h2>
                    <p className="text-muted-foreground whitespace-pre-line mb-6">{description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="text-sm text-muted-foreground">Lieu</p>
                          <p className="font-medium">{location}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="text-sm text-muted-foreground">Date</p>
                          <p className="font-medium">{new Date(date).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
                <h2 className="text-lg font-medium mb-4">Contact</h2>
                
                <div className="flex items-center gap-2 mb-4">
                  <User className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Publié par</p>
                    <p className="font-medium">Membre de l'établissement</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 mb-6">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Date de publication</p>
                    <p className="font-medium">{new Date(createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
                
                <div className="border-t pt-4">
                  <p className="mb-4 text-sm">Pour entrer en contact concernant cette annonce :</p>
                  
                  <Button className="w-full bg-retrouve-blue hover:bg-retrouve-blue-dark mb-2">
                    <Mail className="mr-2 h-4 w-4" />
                    Contacter
                  </Button>
                  
                  <p className="text-xs text-muted-foreground text-center">
                    Email: {contactInfo}
                  </p>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h2 className="text-lg font-medium mb-4">Signaler</h2>
                <p className="text-sm text-muted-foreground mb-4">
                  Vous avez trouvé cet objet ou avez des informations importantes à communiquer ?
                </p>
                <Button variant="outline" className="w-full">
                  Signaler un problème
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
