import type { Product } from "@/lib/types";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="flex gap-5 rounded-2xl border border-gray-100 bg-white p-5 shadow-soft transition-all hover:shadow-md">
      <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-xl border border-gray-100">
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.title}
          className="h-full w-full object-cover transition-transform hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col justify-center">
        <h3 className="line-clamp-2 text-base font-semibold text-gray-900 leading-snug">{product.title}</h3>
        <span className="mt-2 inline-flex items-center w-fit rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600">
          {product.marketplace}
        </span>
        <p className="mt-3 text-xl font-bold text-primary-600">
          Rp{product.price.toLocaleString("id-ID")}
        </p>
      </div>
    </div>
  );
}
