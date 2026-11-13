import Image from "next/image";

interface Props {
  about: string;
  highlights: string[];
}

export default function AboutLocation({ about, highlights }: Props) {
  return (
    <section className="bg-sage rounded-[40px] flex flex-col lg:flex-row gap-8 lg:gap-12 items-center p-5 lg:p-10">
      <div className="flex flex-col gap-4 text-white lg:flex-1 text-center lg:text-left">
        <h2 className="font-poppins-bold text-3xl lg:text-display">About This Location</h2>
        <p className="font-poppins-regular text-lg">{about}</p>
      </div>
      <div className="bg-white rounded-[30px] flex flex-col gap-5 p-6 lg:p-8 w-full lg:flex-1">
        <h3 className="font-poppins-bold text-2xl text-dark-green text-center">
          What makes this location special:
        </h3>
        <div className="flex gap-6 items-center">
          <Image
            src="/logos-and-icons/icon/Sweetleaves_Icon_Sage.svg"
            alt=""
            width={60}
            height={90}
            className="hidden sm:block shrink-0"
          />
          <ul className="font-poppins-regular text-lg text-dark-green list-disc pl-5 flex flex-col gap-1">
            {highlights.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
