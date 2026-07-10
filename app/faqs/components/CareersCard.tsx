import Image from "next/image";
import Link from "next/link";

export default function CareersCard() {
  return (
    <div className="bg-sage rounded-[40px] flex flex-col md:flex-row gap-[15px] md:gap-[90px] items-center p-[20px]">
      <Image
        src="/faq/careers.png"
        alt="Sweetleaves team"
        width={625}
        height={330}
        className="rounded-[20px] w-full md:w-[625px] h-auto object-cover"
      />
      <div className="flex flex-col gap-[20px] items-start px-[18px] py-[7px] md:px-0 md:py-0">
        <h2 className="font-poppins-bold text-[30px] md:text-[45px] text-white leading-[0.9]">
          Is Sweetleaves currently hiring?
        </h2>
        <p className="font-poppins-regular text-[18px] text-white">
          Yes! Join our team of budtenders by filling out the form on our
          Careers page.
        </p>
        <Link
          href={(process.env.NEXT_PUBLIC_SITE_URL ?? "https://sweetleaves.co") + "/careers/"}
          className="bg-light-gold rounded-full px-[25px] py-[14px] font-poppins-semibold text-[16px] text-dark-green uppercase text-center"
        >
          See Open Positions
        </Link>
      </div>
    </div>
  );
}
