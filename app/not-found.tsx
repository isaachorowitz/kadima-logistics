import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-navy flex items-center justify-center">
      <Container narrow>
        <div className="text-center">
          <p className="font-display text-8xl font-extrabold text-emerald mb-4">404</p>
          <h1 className="font-display text-3xl font-bold text-white mb-4">
            Page Not Found
          </h1>
          <p className="text-white/60 text-lg mb-8 max-w-md mx-auto">
            The page you&apos;re looking for doesn&apos;t exist. Let&apos;s get you back to
            finding shipping savings.
          </p>
          <Button href="/" variant="primary" size="lg">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </Button>
        </div>
      </Container>
    </div>
  );
}
