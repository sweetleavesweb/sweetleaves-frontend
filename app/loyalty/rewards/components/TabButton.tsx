interface Props {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

export default function TabButton({ active, onClick, children }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex-1 rounded-full px-6 py-2.5 font-poppins-semibold uppercase text-sm transition-colors ${
        active ? "bg-light-gold text-dark-green" : "text-white"
      }`}
    >
      {children}
    </button>
  );
}
