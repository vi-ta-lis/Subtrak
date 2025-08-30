import { Pencil, Trash2 } from "lucide-react";

export default function ActiveSubscribersCard({
  subscription,
  onEdit,
  onDelete,
}) {
  const { name, price, date, color, status } = subscription;

  const colorClasses = {
    red: "bg-red-500",
    blue: "bg-blue-500",
    green: "bg-green-500",
    yellow: "bg-yellow-500",
    purple: "bg-purple-500",
    gray: "bg-gray-500",
  };

  // Status color mapping
  const statusColors = {
    Overdue: "text-red-600 font-semibold",
    "Due Soon": "text-yellow-600 font-semibold",
    Active: "text-green-600 font-semibold",
    Unknown: "text-gray-600",
  };

  return (
    <div className="rounded-xl shadow-md overflow-hidden w-full max-w-sm mx-auto">
      <div
        className={`${
          colorClasses[color] || "bg-gray-500"
        } h-16 flex items-center justify-center relative`}
      >
        <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-xl font-bold text-gray-800">
          {name.charAt(0).toUpperCase()}
        </div>

        {/* Action buttons */}
        <div className="absolute top-2 right-2 flex gap-2">
          <button
            onClick={onEdit}
            className="bg-white p-1 rounded-full shadow hover:bg-gray-200"
          >
            <Pencil size={16} className="text-gray-600 cursor-pointer" />
          </button>
          <button
            onClick={onDelete}
            className="bg-white p-1 rounded-full shadow hover:bg-gray-200 cursor-pointer"
          >
            <Trash2 size={16} className="text-gray-600 cursor-pointer" />
          </button>
        </div>
      </div>

      <div className="bg-white p-4">
        <h3 className="text-lg font-semibold text-black">{name}</h3>
        <p className="text-gray-700">${price} / month</p>
        <p className="text-sm text-gray-500">Next payment: {date}</p>
        <p className={`mt-2 ${statusColors[status] || ""}`}>Status: {status}</p>
      </div>
    </div>
  );
}
