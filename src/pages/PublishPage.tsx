import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AnnouncementType, ItemType } from "@/types";
import { useToast } from "@/hooks/use-toast";
import { useAnnouncements } from "@/hooks/use-announcements";

export default function PublishPage() {
  const { search } = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { createAnnouncement } = useAnnouncements();
  
  // Form state
  const [type, setType] = useState<AnnouncementType>('lost');
  const [itemType, setItemType] = useState<ItemType>('object');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Set initial type based on URL query parameter
  useEffect(() => {
    const params = new URLSearchParams(search);
    const typeParam = params.get('type');
    if (typeParam === 'lost' || typeParam === 'found') {
      setType(typeParam);
    }
  }, [search]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Form validation
    if (!title || !description || !location || !date || !contactInfo) {
      toast({
        title: "Formulaire incomplet",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await createAnnouncement({
        type,
        itemType,
        title,
        description,
        location,
        date,
        contactInfo,
        imageUrl: undefined, // We'll handle image upload later
      });

      toast({
        title: "Annonce publiée avec succès",
        description: "Votre annonce a été enregistrée et sera visible après validation.",
      });
      navigate("/");
    } catch (error) {
      toast({
        title: "Erreur lors de la publication",
        description: "Une erreur est survenue lors de la publication de l'annonce. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1 bg-retrouve-gray">
        <div className="container py-8 md:py-12">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-2xl md:text-3xl font-bold mb-8">Publier une annonce</h1>
            
            <div className="bg-white rounded-lg shadow-sm border p-6 md:p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="type">Type d'annonce</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <Button
                      type="button"
                      variant={type === 'lost' ? "default" : "outline"}
                      className={
                        type === 'lost' 
                          ? "bg-retrouve-red hover:bg-retrouve-red-dark" 
                          : ""
                      }
                      onClick={() => setType('lost')}
                    >
                      J'ai perdu quelque chose
                    </Button>
                    <Button
                      type="button"
                      variant={type === 'found' ? "default" : "outline"}
                      className={
                        type === 'found' 
                          ? "bg-retrouve-green hover:bg-retrouve-green-dark" 
                          : ""
                      }
                      onClick={() => setType('found')}
                    >
                      J'ai trouvé quelque chose
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="item-type">De quoi s'agit-il ?</Label>
                  <Select
                    value={itemType}
                    onValueChange={(value) => setItemType(value as ItemType)}
                  >
                    <SelectTrigger id="item-type">
                      <SelectValue placeholder="Sélectionnez un type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="object">Un objet</SelectItem>
                      <SelectItem value="animal">Un animal</SelectItem>
                      <SelectItem value="person">Une personne</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="title">Titre de l'annonce *</Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder={
                      type === 'lost' 
                        ? `${itemType === 'object' ? 'Objet' : itemType === 'animal' ? 'Animal' : 'Personne'} perdu(e)...` 
                        : `${itemType === 'object' ? 'Objet' : itemType === 'animal' ? 'Animal' : 'Personne'} trouvé(e)...`
                    }
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description détaillée *</Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={5}
                    placeholder="Décrivez l'objet avec précision (couleur, taille, marque, contenu, signes distinctifs...)"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="location">Lieu *</Label>
                    <Input
                      id="location"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="Où avez-vous perdu/trouvé ?"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="date">Date *</Label>
                    <Input
                      id="date"
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      max={new Date().toISOString().split('T')[0]}
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="contact">Contact *</Label>
                  <Input
                    id="contact"
                    value={contactInfo}
                    onChange={(e) => setContactInfo(e.target.value)}
                    placeholder="Email ou numéro de téléphone"
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    Ces informations ne seront visibles que par les personnes concernées.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="image">Image (facultatif)</Label>
                  <Input id="image" type="file" accept="image/*" />
                  <p className="text-xs text-muted-foreground">
                    Une photo peut aider à identifier l'objet perdu ou trouvé.
                  </p>
                </div>
                
                <div className="pt-4 border-t flex justify-end gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate(-1)}
                  >
                    Annuler
                  </Button>
                  <Button 
                    type="submit" 
                    className="bg-retrouve-blue hover:bg-retrouve-blue-dark"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Publication en cours..." : "Publier l'annonce"}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
