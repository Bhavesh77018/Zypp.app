import { MapPin } from "lucide-react";
import { getCities } from "@/lib/cms";
import { Reveal } from "@/components/motion/Reveal";

/** "We are present in" — operational city footprint, driven by the CMS cities
 *  registry so it stays in sync with the admin dashboard. Server component. */
export default function CitiesPresence({
  heading = "We Are Present In",
  subheading = "Our journey starts here, but our vision is worldwide. Don't see your city? It's coming soon.",
  className = "py-24 bg-white dark:bg-slate-950",
}: { heading?: string; subheading?: string; className?: string }) {
  const cities = getCities();

  return (
    <section className={className}>
      <div className="container mx-auto px-4 max-w-6xl">
        <Reveal className="text-center mb-14">
          <div className="text-sm font-bold text-primary uppercase tracking-[0.2em] mb-3">Our Footprint</div>
          <h2 className="text-3xl md:text-5xl font-black text-foreground">{heading}</h2>
          <p className="text-muted text-lg mt-4 max-w-2xl mx-auto">{subheading}</p>
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {cities.map((city) => {
            const live = city.status === "active";
            return (
              <div key={city.id}>
                <div className={`group h-full rounded-2xl border p-5 text-center transition-all duration-300 ${live ? "bg-gray-50 dark:bg-slate-900 border-border hover:border-primary/40 hover:shadow-lg" : "bg-transparent border-dashed border-border opacity-70"}`}>
                  <div className={`mx-auto w-11 h-11 rounded-xl flex items-center justify-center mb-3 ${live ? "bg-primary/10 text-primary" : "bg-gray-100 dark:bg-slate-800 text-muted"}`}>
                    <MapPin size={20} />
                  </div>
                  <div className="font-bold text-foreground">{city.name}</div>
                  <div className="text-[11px] text-muted">{city.state}</div>
                  {live ? (
                    <div className="mt-2 inline-flex items-center gap-1 text-[11px] font-bold text-primary">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" /> {city.riders} Riders
                    </div>
                  ) : (
                    <div className="mt-2 text-[11px] font-bold text-muted uppercase tracking-wide">Coming Soon</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
