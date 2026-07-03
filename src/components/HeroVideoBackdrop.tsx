type HeroVideoBackdropProps = {
  image?: string;
  video?: string;
  accent?: "green" | "orange" | "blue" | "violet";
  videoOpacity?: number;
};

const TINTS = {
  green: "from-slate-950/55 via-emerald-950/40 to-slate-950/80",
  orange: "from-slate-950/60 via-orange-950/35 to-slate-950/85",
  blue: "from-slate-950/55 via-blue-950/35 to-slate-950/85",
  violet: "from-slate-950/55 via-violet-950/35 to-slate-950/85",
};

export default function HeroVideoBackdrop({ image, video, accent = "green", videoOpacity = 0.32 }: HeroVideoBackdropProps) {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
      {video && (
        <video
          className="h-full w-full scale-105 object-cover saturate-[0.8]"
          style={{ opacity: videoOpacity }}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        >
          <source src={video} type="video/mp4" />
        </video>
      )}
      {image && <div className="absolute inset-0 bg-cover bg-center opacity-[0.18] mix-blend-luminosity" style={{ backgroundImage: `url(${image})` }} />}
      <div className={`absolute inset-0 bg-gradient-to-br ${TINTS[accent]}`} />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(0,188,132,0.18),transparent_48%)]" />
    </div>
  );
}
