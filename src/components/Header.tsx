
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PlusCircle, Search } from "lucide-react";

export function Header() {
  return (
    <header className="border-b bg-white">
      <div className="container py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-retrouve-blue text-xl font-bold">Retrouv'Moi</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-4">
          <Link to="/">
            <Button variant="ghost">Accueil</Button>
          </Link>
          <Link to="/recherche">
            <Button variant="ghost">
              <Search className="mr-2 h-4 w-4" />
              Rechercher
            </Button>
          </Link>
        </div>
        
        <Link to="/publier">
          <Button className="bg-retrouve-blue hover:bg-retrouve-blue-dark">
            <PlusCircle className="mr-2 h-4 w-4" />
            Publier
          </Button>
        </Link>
      </div>
    </header>
  );
}
