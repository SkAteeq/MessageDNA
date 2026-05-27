import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-16 flex items-center border-b border-border/40 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <Link className="flex items-center justify-center" href="/">
          <span className="font-bold text-xl tracking-tight">MessageDNA</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
          <Link className="text-sm font-medium hover:text-primary transition-colors" href="/features">
            Features
          </Link>
          <Link className="text-sm font-medium hover:text-primary transition-colors" href="/pricing">
            Pricing
          </Link>
          <Link href="/dashboard">
            <Button size="sm">Get Started</Button>
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 flex items-center justify-center">
          <div className="container px-4 md:px-6 flex flex-col items-center text-center space-y-8">
            <div className="space-y-4 max-w-3xl">
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                Conversion Intelligence for Modern Teams
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Analyze messaging, persuasion patterns, and buyer psychology to increase conversions.
                Stop guessing. Start converting.
              </p>
            </div>
            <div className="space-x-4">
              <Link href="/dashboard">
                <Button size="lg" className="h-12 px-8 text-base">
                  Analyze Copy Now
                </Button>
              </Link>
              <Link href="#how-it-works">
                <Button variant="outline" size="lg" className="h-12 px-8 text-base">
                  See how it works
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} MessageDNA. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4 text-muted-foreground" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4 text-muted-foreground" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
