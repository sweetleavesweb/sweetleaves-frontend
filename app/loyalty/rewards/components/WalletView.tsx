import { useState } from "react";
import Image from "next/image";
import QRCode from "react-qr-code";
import type { Order, PassLinks, Reward, Wallet } from "@/lib/alpineiq/wallet";

interface Props {
  wallet: Wallet;
  onReset: () => void;
}

type Tab = "rewards" | "orders";

function formatDate(seconds: number): string {
  return new Date(seconds * 1000).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatExpiration(expiration: number): string | null {
  if (!expiration) return null;
  const date = new Date(expiration * 1000);
  if (date.getTime() < Date.now()) return null;
  return formatDate(expiration);
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

function OrderCard({ order }: { order: Order }) {
  return (
    <div className="bg-white rounded-[30px] px-6 py-5 flex flex-col gap-2">
      <div className="flex items-center justify-between gap-4">
        <span className="font-poppins-bold text-lg text-dark-green">
          {order.date ? formatDate(order.date) : "Order"}
        </span>
        <span className="font-poppins-semibold text-lg text-orange-glow whitespace-nowrap">
          ${order.total.toFixed(2)}
        </span>
      </div>
      <ul className="flex flex-col gap-1">
        {order.items.map((item, index) => (
          <li
            key={index}
            className="font-poppins-regular text-base text-dark flex justify-between gap-4"
          >
            <span>
              {item.quantity > 1 ? `${item.quantity}× ` : ""}
              {item.name}
              {item.brand ? ` — ${item.brand}` : ""}
            </span>
            <span className="whitespace-nowrap">${item.price.toFixed(2)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex-1 rounded-full px-6 py-2.5 font-poppins-semibold uppercase text-sm transition-colors ${
        active ? "bg-light-gold text-dark-green" : "text-white hover:bg-white/10"
      }`}
    >
      {children}
    </button>
  );
}

function AddToWalletRow({ passLinks }: { passLinks: PassLinks }) {
  return (
    <div className="w-full max-w-md border-t border-white/15 pt-5 mt-1 flex flex-col items-center gap-3">
      <p className="font-poppins-regular text-sm text-white">Add to Wallet</p>
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

function ReferFriendPanel({ url }: { url: string }) {
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
              onClick={() => setReferOpen(!referOpen)}
              aria-expanded={referOpen}
              className={`rounded-full px-6 py-3 font-poppins-semibold uppercase text-sm transition-opacity whitespace-nowrap ${
                referOpen
                  ? "bg-dark-green text-white"
                  : "bg-orange-glow text-white hover:opacity-90"
              }`}
            >
              {referOpen ? "Close" : "Refer a Friend"}
            </button>
          )}
        </div>
        {referOpen && wallet.referralUrl && <ReferFriendPanel url={wallet.referralUrl} />}
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
    </div>
  );
}
