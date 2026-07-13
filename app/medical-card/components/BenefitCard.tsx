import type { ReactNode } from "react";

export interface BenefitProps {
  title: string;
  description: ReactNode;
  icon: ReactNode;
  dark?: boolean;
}

export default function BenefitCard({ title, description, icon, dark }: BenefitProps) {
  return (
    <div className={dark ? "bg-white/10 rounded-[30px] p-5 flex gap-4 items-start" : "bg-white rounded-[30px] p-5 flex flex-col gap-3.5"}>
      <span className="shrink-0 bg-light-gold rounded-full size-12 flex items-center justify-center">
        {icon}
      </span>
      <div>
        <p className={`font-poppins-bold text-lg ${dark ? "text-white" : "text-dark-green"} leading-tight`}>
          {title}
        </p>
        <p className={`font-poppins-regular text-base ${dark ? "text-white/80" : "text-dark"} mt-1 leading-[1.45]`}>
          {description}
        </p>
      </div>
    </div>
  );
}
