import type { Reward } from "@/lib/alpineiq/wallet";
import { formatExpiration } from "./format";

interface Props {
  reward: Reward;
  points: number;
}

export default function RewardCard({ reward, points }: Props) {
  const expires = formatExpiration(reward.expiration);
  const pointsShort = Math.max(0, Math.ceil(reward.pointsCost - points));

  return (
    <div
      className={`bg-white rounded-[30px] px-6 py-5 flex flex-col gap-1 ${reward.available ? "" : "opacity-60"}`}
    >
      <div className="flex items-center justify-between gap-4">
        <span className="font-poppins-bold text-xl text-dark-green">{reward.name}</span>
        {reward.pointsCost > 0 && (
          <span className="bg-light-gold rounded-full px-4 py-1.5 font-poppins-semibold text-sm text-dark-green whitespace-nowrap">
            {reward.pointsCost} pts
          </span>
        )}
      </div>
      <p
        className={`font-poppins-semibold text-base ${reward.available ? "text-orange-glow" : "text-sage"}`}
      >
        {reward.available
          ? "Ready to redeem"
          : pointsShort > 0
            ? `${pointsShort} more points to unlock`
            : "Not available right now"}
      </p>
      {expires && (
        <p className="font-poppins-regular text-sm text-sage">Expires {expires}</p>
      )}
    </div>
  );
}
