import { Recycle, Users, Package, TreePine } from "lucide-react"

const stats = [
  {
    icon: Package,
    value: "12,847",
    label: "Items Shared",
    description: "Successfully given to new homes"
  },
  {
    icon: Users,
    value: "3,421",
    label: "Community Members",
    description: "Active in your area"
  },
  {
    icon: Recycle,
    value: "8.2 tons",
    label: "Waste Diverted",
    description: "From landfills this year"
  },
  {
    icon: TreePine,
    value: "156",
    label: "Trees Saved",
    description: "Equivalent environmental impact"
  }
]

export function ImpactStats() {
  return (
    <section className="py-16 md:py-24 bg-primary text-primary-foreground relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-primary opacity-90"></div>
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Our Community Impact
          </h2>
          <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
            Together, we're creating a more sustainable future, one shared item at a time
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={stat.label} className="text-center group">
              <div className="w-16 h-16 mx-auto mb-4 bg-primary-foreground/10 rounded-2xl flex items-center justify-center group-hover:bg-primary-foreground/20 transition-colors">
                <stat.icon className="h-8 w-8 text-primary-foreground" />
              </div>
              <div className="text-3xl md:text-4xl font-bold mb-2">{stat.value}</div>
              <div className="text-lg font-semibold mb-1">{stat.label}</div>
              <div className="text-sm text-primary-foreground/70">{stat.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}