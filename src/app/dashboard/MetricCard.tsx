interface MetricCardProps {
    title: string;
    value: number;
    icon: React.ReactNode;
    color: string;
}

const MetricCard = ({ title, value, icon, color }: MetricCardProps) => {
    const formatValue = (title: string, value: number) => {
        if (typeof value !== "number" || isNaN(value)) return "N/A";

        const currencyKeywords = ["sales", "purchases", "expenses", "profit", "revenue"];
        const normalized = title.toLowerCase();

        const isCurrency = currencyKeywords.some(keyword =>
            normalized.includes(keyword)
        );

        return isCurrency
            ? value.toLocaleString("en-US", { style: "currency", currency: "USD" })
            : value.toLocaleString();
    };

    const getValueColor = (title: string, value: number): string => {
        const t = title.toLowerCase();

        if (t.includes("net profit") || t.includes("profit margin")) {
            return value >= 0 ? "text-green-600" : "text-red-600";
        }

        if (t.includes("sales") || t.includes("monthly sales")) {
            return "text-green-600";
        }

        if (t.includes("purchases")) {
            return "text-red-600";
        }

        if (t.includes("expenses")) {
            return "text-blue-600";
        }

        if (t.includes("low stock count")) {
            return "text-yellow-600";
        }

        return "text-gray-900";
    };

    return (
        <div className="bg-white p-6 rounded-2xl shadow-md flex flex-col gap-2">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
                <div className={`p-2 rounded-full bg-${color}-100 text-${color}-600`}>
                    {icon}
                </div>
            </div>
            <p className={`text-2xl font-bold ${getValueColor(title, value)}`}>
                {formatValue(title, value)}
            </p>
        </div>
    );
};

export default MetricCard;