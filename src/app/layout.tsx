import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: "L'Arbre Magique de l'Informatique - Cours Interactif Primaire",
  description: "Cours complet, visuel et interactif pour enfants de primaire pour découvrir l'ordinateur, son rôle, ses composants matériels et logiciels. Réalisé par le Club RED PHOENIX ENSAO.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-900 antialiased selection:bg-amber-300 selection:text-slate-950">
        {children}
      </body>
    </html>
  );
}
