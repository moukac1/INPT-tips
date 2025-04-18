
import { Link } from "react-router-dom";

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="border-t bg-white">
      <div className="container py-6">
        <div className="flex flex-col items-center justify-center gap-2 md:flex-row md:justify-between">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Retrouv'Moi — Tous droits réservés
          </p>
          
          <div className="flex items-center gap-4">
            <Link to="/" className="text-sm text-muted-foreground hover:underline">
              À propos
            </Link>
            <Link to="/" className="text-sm text-muted-foreground hover:underline">
              Contact
            </Link>
            <Link to="/" className="text-sm text-muted-foreground hover:underline">
              Mentions légales
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
