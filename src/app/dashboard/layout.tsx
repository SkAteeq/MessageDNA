import Link from "next/link";


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-muted/20">
      <header className="px-4 lg:px-6 h-14 flex items-center border-b bg-background sticky top-0 z-50">
        <Link className="flex items-center justify-center" href="/">
          <span className="font-bold text-lg tracking-tight">MessageDNA</span>
        </Link>
        <nav className="ml-auto flex gap-4 items-center">
          <Link className="text-sm font-medium hover:text-primary transition-colors" href="/dashboard">
            Dashboard
          </Link>
          <Link className="text-sm font-medium hover:text-primary transition-colors text-muted-foreground" href="/dashboard/history">
            History
          </Link>
          <div className="w-8 h-8 rounded-full bg-muted border flex items-center justify-center ml-2">
            <span className="text-xs font-medium">JD</span>
          </div>
        </nav>
      </header>
      <div className="flex-1 container py-8 px-4 md:px-6 mx-auto max-w-6xl">
        {children}
      </div>
    </div>
  );
}
