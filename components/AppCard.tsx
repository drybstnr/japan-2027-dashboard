export type AppCardProps = {
  name: string;
  description: string;
  category: string;
  icon: string;
  iconColor: string;
  iconBackground: string;
};

export function AppCard({ name, description, category, icon, iconColor, iconBackground }: AppCardProps) {
  return (
    <article className="flex items-center gap-4 rounded-[24px] bg-white p-4 shadow-[0_10px_30px_rgba(56,59,50,.06)] transition-transform duration-200 hover:-translate-y-0.5">
      <div aria-hidden="true" className="grid h-16 w-16 shrink-0 place-items-center rounded-[18px] text-[21px] font-bold shadow-inner" style={{ backgroundColor: iconBackground, color: iconColor }}>{icon}</div>
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2"><div><span className="block text-[9px] font-bold uppercase tracking-[.14em] text-[#9a9f96]">{category}</span><h2 className="mt-1 font-[var(--font-manrope)] text-[15px] font-semibold tracking-[-.03em] text-[#252a24]">{name}</h2></div><span className="mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#f3f5f1] text-[#7a9278]" aria-hidden="true">+</span></div>
        <p className="mt-1.5 text-[11px] leading-[1.35] text-[#858a82]">{description}</p><span className="mt-2.5 block text-[9px] font-semibold text-[#b27b59]">Install before arrival</span>
      </div>
    </article>
  );
}