import type { Product } from "@/lib/types";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="flex gap-4 rounded-xl border bg-white p-4 shadow-sm">
      <img
        src={product.image || "/placeholder.svg"}
        alt={product.title}
        className="h-24 w-24 rounded-lg object-cover"
      />
      <div className="flex-1">
        <h3 className="font-medium text-gray-900">{product.title}</h3>
        <p className="mt-1 text-xs text-gray-500">{product.marketplace}</p>
        <p className="mt-1 text-lg font-bold text-primary-600">
          Rp{product.price.toLocaleString("id-ID")}
        </p>
      </div>
    </div>
  );
}
