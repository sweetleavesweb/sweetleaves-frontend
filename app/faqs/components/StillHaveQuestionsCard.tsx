import Image from "next/image";
import Link from "next/link";

export default function StillHaveQuestionsCard() {
  return (
    <div className="bg-parchment border border-sage rounded-[40px] flex flex-col md:flex-row gap-[30px] md:gap-[60px] items-center justify-end p-[20px]">
      <div className="flex flex-col gap-[20px] items-start px-[22px] py-[10px] md:px-0 md:py-0">
        <h2 className="font-poppins-bold text-[30px] md:text-[45px] text-dark-green leading-[0.9]">
          Still Have Questions?
        </h2>
        <p className="font-poppins-regular text-[18px] text-dark-green">
          Stop by, call us at 612-688-9333, or{" "}
          <a
            href={(process.env.NEXT_PUBLIC_SITE_URL ?? "https://sweetleaves.co") + "contact/"}
            className="underline"
          >
            send us a message
          </a>
          . We&apos;re here to help.
        </p>
        <Link
          href={(process.env.NEXT_PUBLIC_SITE_URL ?? "https://sweetleaves.co") + "contact/"}
          className="bg-light-gold rounded-full px-[25px] py-[14px] font-poppins-semibold text-[16px] text-dark-green uppercase text-center"
        >
          Contact Us
        </Link>
      </div>
      <Image
        src="/faq/questions.png"
        alt="Sweetleaves store interior"
        width={625}
        height={330}
        className="rounded-[20px] w-full md:w-[625px] h-auto object-cover"
      />
    </div>
  );
}
