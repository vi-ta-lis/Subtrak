import { useState, useEffect } from "react";

export default function SubscriptionModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [date, setDate] = useState("");
  const [color, setColor] = useState("");

  // Tailwind-safe color mapping
  const colorClasses = {
    red: "bg-red-500",
    blue: "bg-blue-500",
    green: "bg-green-500",
    yellow: "bg-yellow-500",
    purple: "bg-purple-500",
    gray: "bg-gray-500",
  };

  // Prefill values when editing
  useEffect(() => {
    if (initialData) {
      setName(initialData.name || "");
      setPrice(initialData.price || "");
      setDate(initialData.date || "");
      setColor(initialData.color || "");
    } else {
      setName("");
      setPrice("");
      setDate("");
      setColor("");
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const newSub = { name, price, date, color };
    onSubmit(newSub);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50 px-4 sm:px-6">
      <div className="bg-gray-800 rounded-xl shadow-lg p-4 sm:p-6 w-full max-w-md sm:max-w-lg md:max-w-xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-white">
            {initialData ? "Edit Subscription" : "Add Subscription"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-200 text-lg sm:text-xl cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-white">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium mb-2">Name</label>
            <input
              type="text"
              placeholder="e.g. Netflix"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full border rounded-lg px-3 py-2 text-sm sm:text-base text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium mb-2">Price</label>
            <input
              type="number"
              placeholder="e.g. 9.99"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              className="w-full border rounded-lg px-3 py-2 text-sm sm:text-base text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Renewal Date */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Renewal Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="w-full border rounded-lg px-3 py-2 text-sm sm:text-base text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Color Theme */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Color Theme
            </label>
            <div className="flex gap-2 flex-wrap">
              {Object.keys(colorClasses).map((c) => (
                <span
                  key={c}
                  onClick={() => setColor(c)}
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full ${
                    colorClasses[c]
                  } cursor-pointer border-2 ${
                    color === c ? "border-white" : "border-transparent"
                  }`}
                ></span>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 sm:py-3 rounded-lg shadow-md hover:bg-indigo-700 transition text-sm sm:text-base cursor-pointer"
          >
            {initialData ? "Update Subscription" : "Add Subscription"}
          </button>
        </form>
      </div>
    </div>
  );
}
