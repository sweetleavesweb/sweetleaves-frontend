import { useState } from "react";
import QRCode from "react-qr-code";

interface Props {
  url: string;
}

export default function ReferFriendPanel({ url }: Props) {
  const [copied, setCopied] = useState(false);

  async function share() {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Join the Sweetleaves Garden Club",
          url,
        });
        return;
      } catch {
        // Fall through to clipboard if the user dismissed the share sheet.
      }
    }
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="bg-white rounded-[30px] px-6 py-8 flex flex-col items-center gap-4">
      <h3 className="font-poppins-bold text-2xl text-dark-green text-center">
        Refer Your Friends
      </h3>
      <p className="font-poppins-regular text-base text-dark text-center max-w-sm">
        Have a friend scan your personal code — you and your friend each earn
        50 points when they join the Garden Club.
      </p>
      <div className="border border-sage rounded-2xl p-4">
        <QRCode value={url} size={160} fgColor="#0F2D25" />
      </div>
      <button
        type="button"
        onClick={share}
        className="bg-orange-glow text-white rounded-full px-6 py-3 font-poppins-semibold uppercase text-sm hover:opacity-90 transition-opacity"
      >
        {copied ? "Link Copied!" : "Share My Link"}
      </button>
    </div>
  );
}
