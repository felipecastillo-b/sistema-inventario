import Image from "next/image"

interface TopProduct {
    productId: string;
    name: string;
    image_url: string | null;
    totalSold: number;
}

const TopProducts = ({ products }: { products: TopProduct[] }) => (
    <div className="bg-white p-6 rounded-2xl shadow-md">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Most Sale Products</h3>
        <ul className="space-y-4">
            {products.map((product) => (
                <li key={product.productId} className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        {product.image_url ? (
                            <Image
                                src={product.image_url}
                                alt={product.name}
                                width={40}
                                height={40}
                                className="rounded-md object-cover"
                            />
                        ) : (
                            <div className="w-10 h-10 bg-gray-200 rounded-md flex items-center justify-center text-gray-500 text-sm">
                                N/A
                            </div>
                        )}
                        <span className="font-medium text-gray-800">{product.name}</span>
                    </div>
                    <span className="text-sm text-gray-600">{product.totalSold} vendidos</span>
                </li>
            ))}
        </ul>
    </div>
)

export default TopProducts