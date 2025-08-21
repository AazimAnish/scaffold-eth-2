import Link from "next/link";
import { Button } from "~~/components/ui/button";

export default function NotFound() {
  return (
    <div className="section-padding">
      <div className="container-custom">
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
          <div className="space-y-6 max-w-md">
            <div className="space-y-2">
              <h1 className="text-8xl font-bold text-muted-foreground/20">404</h1>
              <h2 className="text-3xl font-semibold">Page Not Found</h2>
            </div>
            <p className="text-lg text-muted-foreground">
              The page you&apos;re looking for doesn&apos;t exist or has been moved.
            </p>
            <Button asChild size="lg">
              <Link href="/">Go Home</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
