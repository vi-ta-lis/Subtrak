import { useState, useEffect } from "react";
import SubscriptionModal from "../components/SubscriptionModal";
import ActiveSubscribersCard from "../components/ActiveSubscribersCard";

export default function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [subscriptions, setSubscriptions] = useState(() => {
    try {
      const stored = localStorage.getItem("subscriptions");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });
  const [editIndex, setEditIndex] = useState(null);

  // Save to localStorage when subscriptions change
  useEffect(() => {
    localStorage.setItem("subscriptions", JSON.stringify(subscriptions));
  }, [subscriptions]);

  // Sync across browser tabs
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === "subscriptions") {
        try {
          setSubscriptions(e.newValue ? JSON.parse(e.newValue) : []);
        } catch {
          setSubscriptions([]);
        }
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  // Add or update subscription
  const handleAddSubscription = (sub) => {
    const normalized = {
      ...sub,
      amount: Number(sub.amount ?? sub.price ?? 0),
    };

    setSubscriptions((prev) => {
      if (editIndex !== null) {
        const copy = [...prev];
        copy[editIndex] = normalized;
        return copy;
      }
      return [...prev, normalized];
    });

    setEditIndex(null);
    setIsModalOpen(false);
  };

  const handleDelete = (index) => {
    setSubscriptions((prev) => prev.filter((_, i) => i !== index));
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setIsModalOpen(true);
  };

  const getRenewalStatus = (date) => {
    if (!date) return "Unknown";
    const today = new Date();
    const renewalDate = new Date(date);
    if (isNaN(renewalDate)) return "Unknown";

    const diffTime = renewalDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return "Overdue";
    if (diffDays <= 7) return "Due Soon";
    return "Active";
  };

  // Totals
  const totalCount = subscriptions.length;
  const totalCost = subscriptions.reduce(
    (sum, sub) => sum + (Number(sub.amount) || 0),
    0
  );

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Summary cards */}
      <div className="mb-6 grid grid-cols-2 gap-4 sm:flex sm:justify-center sm:gap-6">
        <div className="bg-white shadow-md rounded-2xl p-4 flex flex-col items-center justify-center w-full sm:w-40 transition transform hover:scale-105">
          <h3 className="text-gray-600 font-medium">Subscriptions</h3>
          <p className="text-2xl font-bold text-indigo-600">{totalCount}</p>
        </div>

        <div className="bg-white shadow-md rounded-2xl p-4 flex flex-col items-center justify-center w-full sm:w-48 transition transform hover:scale-105">
          <h3 className="text-gray-600 font-medium">Total Monthly</h3>
          <p className="text-2xl font-bold text-indigo-600">
            ${totalCost.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Add Subscription Button */}
      <div className="flex justify-center mb-6">
        <button
          onClick={() => {
            setEditIndex(null);
            setIsModalOpen(true);
          }}
          className="px-5 py-2 bg-indigo-600 text-white rounded-xl shadow-md hover:bg-indigo-700 hover:shadow-lg transition"
        >
          + Add Subscription
        </button>
      </div>

      {/* Active Subscriptions */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {subscriptions.length > 0 ? (
          subscriptions.map((sub, index) => (
            <ActiveSubscribersCard
              key={index}
              subscription={{ ...sub, status: getRenewalStatus(sub.date) }}
              onEdit={() => handleEdit(index)}
              onDelete={() => handleDelete(index)}
            />
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No subscriptions added yet.
          </p>
        )}
      </div>

      {/* Subscription Modal */}
      <SubscriptionModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditIndex(null);
        }}
        onSubmit={handleAddSubscription}
        initialData={editIndex !== null ? subscriptions[editIndex] : null}
      />
    </div>
  );
}
