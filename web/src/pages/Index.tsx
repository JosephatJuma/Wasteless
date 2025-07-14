import { Navigation } from "@/components/navigation";
import { HeroSection } from "@/components/hero-section";
import { HowItWorks } from "@/components/how-it-works";
import { FeaturedItems } from "@/components/featured-items";
import { ImpactStats } from "@/components/impact-stats";
import { Footer } from "@/components/footer";
import { LocationProvider } from "@/context/LocationProvider";
const Index = () => {
  return (
    <LocationProvider>
      <div className="min-h-screen bg-background">
        <Navigation />
        <HeroSection />
        <HowItWorks />
        <FeaturedItems />
        <ImpactStats />
        <Footer />
      </div>
    </LocationProvider>
  );
};

export default Index;
