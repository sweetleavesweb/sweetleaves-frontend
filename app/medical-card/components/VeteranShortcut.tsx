interface Props {
  dark?: boolean;
  skipTo: string
}

export default function VeteranShortcut({ dark, skipTo }: Props) {
  return (
    <div className={`${dark ? "bg-dark-green" : "bg-dark-sage"} rounded-[30px] px-6 py-5 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4`}>
      <p className="font-poppins-bold text-lg text-light-gold shrink-0">Are You a Veteran?</p>
      <p className="font-poppins-regular text-base text-white/80 leading-[1.45]">
        You can{" "}
        <a
          href="https://cannabis.web.health.state.mn.us/enrollment/veteran/certify.xhtml"
          target="_blank"
          rel="noopener noreferrer"
          className="text-light-gold underline hover:opacity-80 transition-opacity"
        >
          self-certify for free
        </a>{" "}
        — no physician visit needed. Skip straight to {skipTo}
      </p>
    </div>
  );
}
