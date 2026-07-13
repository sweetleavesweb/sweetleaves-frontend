import type { Reward, Wallet } from "@/lib/alpineiq/wallet";

interface Props {
  wallet: Wallet;
  onReset: () => void;
}

function formatExpiration(expiration: number): string | null {
  if (!expiration) return null;
  const date = new Date(expiration * 1000);
  if (date.getTime() < Date.now()) return null;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function RewardCard({ reward, points }: { reward: Reward; points: number }) {
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

export default function WalletView({ wallet, onReset }: Props) {
  const points = Math.floor(wallet.points);
  const nextReward = wallet.rewards.find((r) => !r.available && r.pointsCost > points);
  const progress = nextReward ? Math.min(100, (points / nextReward.pointsCost) * 100) : 0;

  return (
    <div className="flex flex-col gap-5">
      {!wallet.hidePoints && (
        <section className="bg-dark-green rounded-[40px] flex flex-col items-center px-6 py-10 md:px-10 gap-4">
          <h2 className="font-poppins-semibold uppercase text-base text-white tracking-wide">
            Your Balance
          </h2>
          <p className="font-poppins-bold text-6xl md:text-7xl text-light-gold leading-none">
            {points.toLocaleString()}
          </p>
          <p className="font-poppins-regular text-lg text-white">points</p>
          {nextReward && (
            <div className="w-full max-w-md flex flex-col gap-2">
              <div className="h-3 bg-white/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-light-gold rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="font-poppins-regular text-base text-white text-center">
                {nextReward.pointsCost - points} points until {nextReward.name}
              </p>
            </div>
          )}
        </section>
      )}

      <section className="bg-parchment border border-sage rounded-[50px] px-6 py-8 md:px-10 md:py-10 flex flex-col gap-5">
        <h2 className="font-poppins-bold text-3xl text-dark-green text-center">
          Your Rewards
        </h2>
        {wallet.rewards.length > 0 ? (
          <div className="flex flex-col gap-2.5">
            {wallet.rewards.map((reward) => (
              <RewardCard key={reward.id} reward={reward} points={points} />
            ))}
          </div>
        ) : (
          <p className="font-poppins-regular text-lg text-dark-green text-center">
            No rewards available yet — keep earning points with every visit!
          </p>
        )}
        <p className="font-poppins-regular text-base text-dark-green text-center">
          To redeem, just give your phone number at checkout and ask your
          budtender to apply a reward.
        </p>
        <button
          type="button"
          onClick={onReset}
          className="self-center font-poppins-semibold text-base text-dark-green underline hover:opacity-70"
        >
          Check a different account
        </button>
      </section>
    </div>
  );
}
