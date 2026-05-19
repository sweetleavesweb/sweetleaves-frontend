export default function SignUpSection() {
  return (
    <div
      id="signup"
      className="bg-dark-green rounded-[50px] flex flex-col items-center w-full h-full min-h-[1600px] sm:min-h-[1500px] md:min-h-[1450px] lg:min-h-0 overflow-hidden"
    >
      <h2 className="font-poppins-bold text-3xl md:text-display text-white text-center px-6 md:px-8 pt-10 md:pt-12 leading-tight">
        Sign Up
      </h2>
      <iframe
        src="https://lab.alpineiq.com/join/c/3585/7647"
        title="Garden Club Sign Up"
        className="flex-1 w-full rounded-b-[50px] min-h-[1450px]"
        loading="lazy"
        style={{ border: "none" }}
      />
    </div>
  );
}
