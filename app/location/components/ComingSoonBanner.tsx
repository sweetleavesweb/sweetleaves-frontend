import Link from "next/link";

interface Props {
  name: string;
}

export default function ComingSoonBanner({ name }: Props) {
  return (
    <section className="bg-light-gold rounded-[40px] flex flex-col gap-4 items-center text-center px-6 py-8 md:py-10">
      <h2 className="font-poppins-bold text-3xl lg:text-display text-dark-green leading-[0.9]">
        Coming Soon
      </h2>
      <p className="font-poppins-regular text-lg text-dark-green max-w-[640px]">
        We&apos;re putting the finishing touches on Sweetleaves {name}. Join the
        Garden Club to hear the moment we open.
      </p>
      <Link
        href="/loyalty/#signup"
        className="bg-dark-green text-ivory font-poppins-semibold uppercase text-base px-6 py-3.5 rounded-full hover:opacity-90 transition-opacity"
      >
        Join the Garden Club
      </Link>
    </section>
  );
}
