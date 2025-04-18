
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AnnouncementType, ItemType } from "@/types";
import { Filter, Search } from "lucide-react";

interface AnnouncementFiltersProps {
  onFilterChange: (filters: {
    search: string;
    type: AnnouncementType | 'all';
    itemType: ItemType | 'all';
  }) => void;
}

export function AnnouncementFilters({ onFilterChange }: AnnouncementFiltersProps) {
  const [search, setSearch] = useState('');
  const [type, setType] = useState<AnnouncementType | 'all'>('all');
  const [itemType, setItemType] = useState<ItemType | 'all'>('all');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilterChange({ search, type, itemType });
  };
  
  const handleReset = () => {
    setSearch('');
    setType('all');
    setItemType('all');
    onFilterChange({ search: '', type: 'all', itemType: 'all' });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-sm border">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="h-5 w-5 text-muted-foreground" />
        <h3 className="text-lg font-medium">Filtres</h3>
      </div>
      
      <div className="space-y-4">
        <div>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Rechercher..."
              className="pl-9"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="type">Type d'annonce</Label>
            <Select 
              value={type} 
              onValueChange={(value) => setType(value as AnnouncementType | 'all')}
            >
              <SelectTrigger id="type">
                <SelectValue placeholder="Tous les types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les types</SelectItem>
                <SelectItem value="lost">Perdu</SelectItem>
                <SelectItem value="found">Trouvé</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="item-type">Type d'objet</Label>
            <Select 
              value={itemType} 
              onValueChange={(value) => setItemType(value as ItemType | 'all')}
            >
              <SelectTrigger id="item-type">
                <SelectValue placeholder="Tous les objets" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les objets</SelectItem>
                <SelectItem value="object">Objet</SelectItem>
                <SelectItem value="animal">Animal</SelectItem>
                <SelectItem value="person">Personne</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-2 pt-2">
          <Button type="submit" className="bg-retrouve-blue hover:bg-retrouve-blue-dark">
            Appliquer les filtres
          </Button>
          <Button type="button" variant="outline" onClick={handleReset}>
            Réinitialiser
          </Button>
        </div>
      </div>
    </form>
  );
}
