
import { Announcement } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StatsSummaryProps {
  announcements: Announcement[];
}

export function StatsSummary({ announcements }: StatsSummaryProps) {
  const lostCount = announcements.filter(a => a.type === 'lost' && !a.isResolved).length;
  const foundCount = announcements.filter(a => a.type === 'found' && !a.isResolved).length;
  const resolvedCount = announcements.filter(a => a.isResolved).length;

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Objets perdus</CardTitle>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="h-4 w-4 text-retrouve-red"
          >
            <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
          </svg>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-retrouve-red">{lostCount}</div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Objets trouvés</CardTitle>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="h-4 w-4 text-retrouve-green"
          >
            <path d="m9 12 2 2 4-4" />
            <circle cx="12" cy="12" r="10" />
          </svg>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-retrouve-green">{foundCount}</div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Retrouvailles</CardTitle>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="h-4 w-4 text-retrouve-blue"
          >
            <path d="M18 6 7 17l-5-5" />
            <path d="m22 10-7.5 7.5L13 16" />
          </svg>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-retrouve-blue">{resolvedCount}</div>
        </CardContent>
      </Card>
    </div>
  );
}
