export default function HomeHero() {
  return (
    <section className="flex flex-col gap-1 items-center justify-center px-10 py-10 md:py-11 rounded-[30px] md:rounded-[40px]">
      <h1 className="font-poppins-regular text-[23px] md:text-[25px] text-dark-green text-center leading-[0.9]">
        Medical & Recreational Cannabis Dispensary in Minneapolis, Minnesota
      </h1>
      <h2 className="font-poppins-bold text-[35px] md:text-[55px] text-dark-green text-center leading-tight">
        You&apos;re not lazy, you&apos;re{" "}
        <span className="text-orange-glow">living.</span>
      </h2>
    </section>
  );
}
