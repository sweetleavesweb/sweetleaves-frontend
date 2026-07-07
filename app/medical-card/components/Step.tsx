export interface StepProps {
  num: number;
  title: string;
  description?: string;
  href?: string;
  dark?: boolean;
}

export default function Step({ num, title, description, href, dark }: StepProps) {
  const titleColor = dark ? "text-white" : "text-dark-green";
  return (
    <div className="flex gap-4 items-start">
      <span
        className={`shrink-0 ${dark ? "bg-light-gold text-dark-green" : "bg-orange-glow text-white"} rounded-full size-[42px] flex items-center justify-center font-poppins-bold text-xl leading-none`}
      >
        {num}
      </span>
      <div className="pt-1.5">
        {href ? (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={`font-poppins-bold text-lg ${titleColor} underline decoration-2 underline-offset-2 hover:text-orange-glow transition-colors leading-tight`}
          >
            {title}
          </a>
        ) : (
          <p className={`font-poppins-bold text-lg ${titleColor} leading-tight`}>{title}</p>
        )}
        {description && (
          <p className={`font-poppins-regular text-base ${dark ? "text-white/80" : "text-dark"} mt-1 leading-[1.45]`}>
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
