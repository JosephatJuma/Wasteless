import { Button } from "@/components/ui/button"
import { Plus, Search, ArrowRight } from "lucide-react"
import heroImage from "@/assets/hero-community.jpg"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-subtle">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Share Useful Items,
                <span className="text-primary block">Build Community</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-lg">
                Give away items you no longer need and discover useful things from neighbors nearby. 
                Reduce waste, save money, and strengthen your community.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="lg" className="group">
                <Plus className="h-5 w-5" />
                Post an Item
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button variant="outline" size="lg">
                <Search className="h-5 w-5" />
                Browse Nearby
              </Button>
            </div>

            <div className="flex items-center space-x-8 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-primary rounded-full"></div>
                <span>100% Free</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-accent rounded-full"></div>
                <span>Local Community</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-primary-light rounded-full"></div>
                <span>Zero Waste</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl shadow-card">
              <img 
                src={heroImage} 
                alt="Community sharing items" 
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"></div>
            </div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-accent rounded-full animate-gentle-bounce opacity-80"></div>
            <div className="absolute -top-4 -left-4 w-16 h-16 bg-primary-glow rounded-full animate-gentle-bounce opacity-60" style={{animationDelay: '1s'}}></div>
          </div>
        </div>
      </div>
    </section>
  )
}