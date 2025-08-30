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

  // Persist to localStorage whenever subscriptions change
  useEffect(() => {
    localStorage.setItem("subscriptions", JSON.stringify(subscriptions));
    // Optional: helpful for debugging
    // console.log("subscriptions updated:", subscriptions);
  }, [subscriptions]);

  // Optional: keep in sync across browser tabs
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

  // Normalize and add/update subscription
  const handleAddSubscription = (sub) => {
    // Normalize shape: prefer `amount`, fallback to `price`
    const normalized = {
      ...sub,
      amount: Number(sub.amount ?? sub.price ?? 0),
    };

    if (editIndex !== null) {
      setSubscriptions((prev) => {
        const copy = [...prev];
        copy[editIndex] = normalized;
        return copy;
      });
      setEditIndex(null);
    } else {
      setSubscriptions((prev) => [...prev, normalized]);
    }

    // close modal after adding/updating
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
    const today = new Date();
    const renewalDate = new Date(date);
    if (isNaN(renewalDate)) return "Unknown";

    const diffTime = renewalDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return "Overdue";
    if (diffDays <= 7) return "Due Soon";
    return "Active";
  };

  // Live totals
  const totalCount = subscriptions.length;
  const totalCost = subscriptions.reduce(
    (sum, sub) => sum + (Number(sub.amount) || 0),
    0
  );

  return (
    <div className="p-6">
      {/* Small summary cards */}
      <div className="mb-6 flex justify-center gap-4 flex-wrap">
        <div className="bg-white shadow rounded-lg p-4 w-40 text-center">
          <h3 className="text-gray-600 font-medium">Subscriptions</h3>
          <p className="text-2xl font-bold text-indigo-600">{totalCount}</p>
        </div>

        <div className="bg-white shadow rounded-lg p-4 w-48 text-center">
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
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 cursor-pointer"
        >
          + Add Subscription
        </button>
      </div>

      {/* Active Subscriptions */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {subscriptions.map((sub, index) => (
          <ActiveSubscribersCard
            key={index}
            subscription={{ ...sub, status: getRenewalStatus(sub.date) }}
            onEdit={() => handleEdit(index)}
            onDelete={() => handleDelete(index)}
          />
        ))}
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
