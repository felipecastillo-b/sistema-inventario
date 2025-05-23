import { AlertTriangle } from "lucide-react"

interface LowStockProduct {
    productId: string;
    name: string;
    stockQuantity: number;
    stockMinimum: number;
}

const LowStock = ({ products }: { products: LowStockProduct[] }) => (
    <div className="bg-white p-6 rounded-2xl shadow-md">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Low Stock Products</h3>
        <ul className="space-y-3">
            {products.map((product) => (
                <li
                    key={product.productId}
                    className="flex items-center justify-between text-sm text-gray-700"
                >
                    <div className="flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-yellow-500" />
                        <span>{product.name}</span>
                    </div>
                    <span className="text-red-600 font-medium">
                        {product.stockQuantity} / {product.stockMinimum}
                    </span>
                </li>
            ))}
        </ul>
    </div>
)

export default LowStock