import Image from "next/image";
import { Reveal, RevealItem, RevealStagger } from "@/components/motion/Reveal";
import { BatteryCharging, Cpu, Navigation, Activity } from "lucide-react";

export default function TechRealWorldSection() {
  return (
    <section className="py-24 bg-gray-50 dark:bg-slate-950 overflow-hidden relative">
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 pointer-events-none" />
      <div className="absolute top-0 right-20 w-[30rem] h-[30rem] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container relative mx-auto px-4 max-w-7xl z-10">
        <Reveal className="mb-16 text-center">
          <div className="text-sm font-bold text-primary uppercase tracking-[0.2em] mb-3">Tech in the real world</div>
          <h2 className="text-4xl md:text-6xl font-black text-foreground mb-6 leading-tight">
            Built for the streets.
          </h2>
          <p className="text-muted text-xl max-w-2xl mx-auto">
            Our technology doesn't just live on screens. It's embedded into the infrastructure that powers thousands of deliveries every day.
          </p>
        </Reveal>

        <RevealStagger className="grid grid-cols-1 md:grid-cols-12 gap-6" stagger={0.1}>
          {/* Main Large Feature */}
          <RevealItem className="md:col-span-8 relative h-[450px] md:h-[550px] rounded-[2.5rem] overflow-hidden group">
            <Image 
              src="/media/ev-charging.jpg" 
              alt="Zypp EV Charging Infrastructure" 
              fill 
              className="object-cover transition-transform duration-[1.5s] group-hover:scale-110" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500" />
            
            <div className="absolute bottom-6 left-6 right-6 md:bottom-8 md:left-8 md:right-8">
              <div className="bg-black/30 backdrop-blur-2xl border border-white/20 p-6 md:p-8 rounded-[2rem] translate-y-4 group-hover:translate-y-0 transition-transform duration-500 shadow-2xl">
                <div className="flex flex-col md:flex-row md:items-center gap-4 mb-3">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.3)] shrink-0">
                    <BatteryCharging size={24} />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-black text-white">Smart Charging Hubs</h3>
                </div>
                <p className="text-white/80 text-lg md:pr-12 leading-relaxed">Real-time load balancing, battery health monitoring, and automated swap protocols ensuring 99.9% uptime for the fleet.</p>
              </div>
            </div>
          </RevealItem>

          {/* Top Right Small Feature */}
          <RevealItem className="md:col-span-4 relative h-[400px] md:h-[550px] rounded-[2.5rem] overflow-hidden group">
            <Image 
              src="/media/zypp-hub-real.jpg" 
              alt="Zypp Delivery Hub" 
              fill 
              className="object-cover transition-transform duration-[1.5s] group-hover:scale-110" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="absolute bottom-6 left-6 right-6">
              <div className="bg-black/30 backdrop-blur-2xl border border-white/20 p-6 rounded-[2rem] translate-y-4 group-hover:translate-y-0 transition-transform duration-500 shadow-2xl">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 mb-4 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                  <Cpu size={20} />
                </div>
                <h3 className="text-xl font-black text-white mb-2">Hub Operations</h3>
                <p className="text-white/80 text-sm leading-relaxed">Automated dispatch, smart queueing, and predictive vehicle allocation.</p>
              </div>
            </div>
          </RevealItem>

          {/* Bottom Left Small Feature */}
          <RevealItem className="md:col-span-5 relative h-[350px] md:h-[400px] rounded-[2.5rem] overflow-hidden group">
            <Image 
              src="/media/zypp-fleet-street.jpg" 
              alt="Zypp Fleet on Street" 
              fill 
              className="object-cover transition-transform duration-[1.5s] group-hover:scale-110" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="absolute bottom-6 left-6 right-6">
              <div className="bg-black/30 backdrop-blur-2xl border border-white/20 p-6 rounded-[2rem] translate-y-4 group-hover:translate-y-0 transition-transform duration-500 shadow-2xl">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30 mb-4 shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                  <Navigation size={20} />
                </div>
                <h3 className="text-xl font-black text-white mb-2">Connected Vehicles</h3>
                <p className="text-white/80 text-sm leading-relaxed">Every scooter streams live telematics for unprecedented urban visibility.</p>
              </div>
            </div>
          </RevealItem>

          {/* Bottom Right Wide Feature */}
          <RevealItem className="md:col-span-7 relative h-[350px] md:h-[400px] rounded-[2.5rem] overflow-hidden group">
            <Image 
              src="/media/fleet-control.webp" 
              alt="Zypp Control Center" 
              fill 
              className="object-cover transition-transform duration-[1.5s] group-hover:scale-110 object-[center_30%]" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="absolute bottom-6 left-6 right-6 md:bottom-8 md:left-8 md:right-8">
              <div className="bg-black/30 backdrop-blur-2xl border border-white/20 p-6 md:p-8 rounded-[2rem] translate-y-4 group-hover:translate-y-0 transition-transform duration-500 shadow-2xl flex flex-col md:flex-row md:items-center gap-6">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-purple-500/20 text-purple-400 border border-purple-500/30 shrink-0 shadow-[0_0_15px_rgba(168,85,247,0.3)]">
                  <Activity size={24} />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-white mb-2">Centralized Command</h3>
                  <p className="text-white/80 leading-relaxed">Nationwide visibility of fleet performance, anomaly detection, and predictive maintenance triggers.</p>
                </div>
              </div>
            </div>
          </RevealItem>
        </RevealStagger>
      </div>
    </section>
  );
}
