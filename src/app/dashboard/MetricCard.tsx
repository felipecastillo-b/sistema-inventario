interface MetricCardProps {
    title: string;
    value: number;
    icon: React.ReactNode;
    color: string;
}

const MetricCard = ({ title, value, icon, color }: MetricCardProps) => {
    const formatCurrency = (value: number) =>
        value.toLocaleString("en-US", { style: "currency", currency: "USD" })

    return (
        <div className="bg-white p-6 rounded-2xl shadow-md flex flex-col gap-2">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
                <div className={`p-2 rounded-full bg-${color}-100 text-${color}-600`}>
                    {icon}
                </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">{formatCurrency(value)}</p>
        </div>
    )
}

export default MetricCard