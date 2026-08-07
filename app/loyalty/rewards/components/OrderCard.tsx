import type { Order } from "@/lib/alpineiq/wallet";
import { formatDate } from "./format";

interface Props {
  order: Order;
}

export default function OrderCard({ order }: Props) {
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
