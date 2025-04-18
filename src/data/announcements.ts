
import { Announcement } from '@/types';

export const announcements: Announcement[] = [
  {
    id: '1',
    type: 'lost',
    itemType: 'object',
    title: 'Clé USB noire 64 Go',
    description: 'J\'ai perdu ma clé USB noire de marque SanDisk 64 Go. Elle contient des documents importants pour mes cours.',
    location: 'Salle informatique B-203',
    date: '2025-04-15',
    contactInfo: 'martin.dubois@email.edu',
    imageUrl: '/placeholder.svg',
    createdAt: '2025-04-16T10:30:00',
    isResolved: false
  },
  {
    id: '2',
    type: 'found',
    itemType: 'object',
    title: 'Cahier de mathématiques',
    description: 'Cahier à spirale bleu avec le nom "Sophie Martin" sur la couverture. Cours de mathématiques avancées.',
    location: 'Cafétéria',
    date: '2025-04-16',
    contactInfo: 'vie.scolaire@etablissement.edu',
    imageUrl: '/placeholder.svg',
    createdAt: '2025-04-16T14:15:00',
    isResolved: false
  },
  {
    id: '3',
    type: 'lost',
    itemType: 'animal',
    title: 'Chat gris et blanc',
    description: 'Mon chat Milo s\'est échappé pendant la récréation. C\'est un chat tigré gris et blanc avec un collier rouge.',
    location: 'Cour principale',
    date: '2025-04-17',
    contactInfo: 'emma.petit@email.edu',
    imageUrl: '/placeholder.svg',
    createdAt: '2025-04-17T09:45:00',
    isResolved: false
  },
  {
    id: '4',
    type: 'found',
    itemType: 'object',
    title: 'Lunettes de vue',
    description: 'Paire de lunettes noires dans un étui rouge. Verres rectangulaires, monture fine.',
    location: 'Bibliothèque',
    date: '2025-04-14',
    contactInfo: 'bibliotheque@etablissement.edu',
    imageUrl: '/placeholder.svg',
    createdAt: '2025-04-14T16:30:00',
    isResolved: false
  },
  {
    id: '5',
    type: 'lost',
    itemType: 'object',
    title: 'Calculatrice graphique',
    description: 'Calculatrice TI-84 avec mes initiales "LD" gravées au dos. Très importante pour mes cours de physique.',
    location: 'Salle de sciences S-102',
    date: '2025-04-15',
    contactInfo: 'lucas.dupont@email.edu',
    imageUrl: '/placeholder.svg',
    createdAt: '2025-04-15T13:20:00',
    isResolved: false
  },
  {
    id: '6',
    type: 'found',
    itemType: 'object',
    title: 'Porte-monnaie bleu',
    description: 'Petit porte-monnaie bleu contenant quelques pièces et un ticket de cantine. Pas de carte d\'identité.',
    location: 'Couloir du bâtiment A',
    date: '2025-04-16',
    contactInfo: 'accueil@etablissement.edu',
    imageUrl: '/placeholder.svg',
    createdAt: '2025-04-16T11:05:00',
    isResolved: false
  }
];
