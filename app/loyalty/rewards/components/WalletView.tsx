import { useState } from "react";
import type { Wallet } from "@/lib/alpineiq/wallet";
import AddToWalletRow from "./AddToWalletRow";
import OrderCard from "./OrderCard";
import ReferFriendPanel from "./ReferFriendPanel";
import RewardCard from "./RewardCard";
import TabButton from "./TabButton";

interface Props {
  wallet: Wallet;
  onReset: () => void;
}

type Tab = "rewards" | "orders";

export default function WalletView({ wallet, onReset }: Props) {
  const [tab, setTab] = useState<Tab>("rewards");
  const [referOpen, setReferOpen] = useState(false);
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
          {(wallet.passLinks.apple || wallet.passLinks.google) && (
            <AddToWalletRow passLinks={wallet.passLinks} />
          )}
        </section>
      )}

      <section className="bg-parchment border border-sage rounded-[50px] px-6 py-8 md:px-10 md:py-10 flex flex-col gap-5">
        <div className="self-center w-full max-w-xl flex flex-col sm:flex-row items-stretch justify-center gap-2.5">
          <div className="flex-1 bg-dark-green rounded-full p-1 flex">
            <TabButton active={tab === "rewards"} onClick={() => setTab("rewards")}>
              Rewards
            </TabButton>
            <TabButton active={tab === "orders"} onClick={() => setTab("orders")}>
              Past Orders
            </TabButton>
          </div>
          {wallet.referralUrl && (
            <button
              type="button"
              onClick={() => setReferOpen(true)}
              aria-haspopup="dialog"
              className="rounded-full px-6 py-3 font-poppins-semibold uppercase text-sm transition-opacity whitespace-nowrap bg-orange-glow text-white hover:opacity-90"
            >
              Refer a Friend
            </button>
          )}
        </div>
        {tab === "rewards" ? (
          <>
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
          </>
        ) : wallet.orders.length > 0 ? (
          <div className="flex flex-col gap-2.5">
            {wallet.orders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        ) : (
          <p className="font-poppins-regular text-lg text-dark-green text-center">
            No past orders yet — they&apos;ll show up here after your next visit.
          </p>
        )}
        <button
          type="button"
          onClick={onReset}
          className="self-center font-poppins-semibold text-base text-dark-green underline hover:opacity-70"
        >
          Check a different account
        </button>
      </section>

      {referOpen && wallet.referralUrl && (
        <ReferFriendPanel url={wallet.referralUrl} onClose={() => setReferOpen(false)} />
      )}
    </div>
  );
}
