
import { Announcement } from "@/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface AnnouncementCardProps {
  announcement: Announcement;
}

export function AnnouncementCard({ announcement }: AnnouncementCardProps) {
  const { id, type, itemType, title, description, location, date, imageUrl } = announcement;
  
  const typeColorClass = type === 'lost' 
    ? 'bg-retrouve-red text-white hover:bg-retrouve-red-dark' 
    : 'bg-retrouve-green text-white hover:bg-retrouve-green-dark';

  const itemTypeLabel = {
    'object': 'Objet',
    'animal': 'Animal',
    'person': 'Personne'
  }[itemType];

  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <div className={cn(
        "h-2",
        type === 'lost' ? 'bg-retrouve-red' : 'bg-retrouve-green'
      )} />
      
      <CardHeader className="p-4">
        <div className="flex justify-between items-center mb-2">
          <Badge className={typeColorClass}>
            {type === 'lost' ? 'Perdu' : 'Trouvé'}
          </Badge>
          <Badge variant="outline">{itemTypeLabel}</Badge>
        </div>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      
      {imageUrl && (
        <div className="px-4">
          <div className="aspect-video overflow-hidden rounded-md bg-muted">
            <img 
              src={imageUrl} 
              alt={title} 
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      )}
      
      <CardContent className="p-4 flex-grow">
        <CardDescription className="line-clamp-3 mb-4">{description}</CardDescription>
        <div className="flex flex-col gap-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span>{location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>{new Date(date).toLocaleDateString()}</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <Link 
          to={`/annonces/${id}`} 
          className="text-retrouve-blue hover:text-retrouve-blue-dark font-medium text-sm w-full text-center"
        >
          Voir les détails
        </Link>
      </CardFooter>
    </Card>
  );
}
