import Image from "next/image";
import type { PassLinks } from "@/lib/alpineiq/wallet";

interface Props {
  passLinks: PassLinks;
}

export default function AddToWalletRow({ passLinks }: Props) {
  return (
    <div className="w-full max-w-md border-t border-white/15 pt-5 mt-1 flex flex-col items-center gap-3">
      <div className="flex flex-wrap items-center justify-center gap-2.5">
        {passLinks.apple && (
          <a href={passLinks.apple} className="hover:opacity-90 transition-opacity">
            <Image
              src="/wallet-badges/add-to-apple-wallet.svg"
              alt="Add to Apple Wallet"
              width={139}
              height={44}
            />
          </a>
        )}
        {passLinks.google && (
          <a
            href={passLinks.google}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-90 transition-opacity"
          >
            <Image
              src="/wallet-badges/add-to-google-wallet.svg"
              alt="Add to Google Wallet"
              width={159}
              height={44}
            />
          </a>
        )}
      </div>
    </div>
  );
}
