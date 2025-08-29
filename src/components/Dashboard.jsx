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

  // Save to localStorage whenever subscriptions change
  useEffect(() => {
    localStorage.setItem("subscriptions", JSON.stringify(subscriptions));
  }, [subscriptions]);

  const handleAddSubscription = (sub) => {
    if (editIndex !== null) {
      const updated = [...subscriptions];
      updated[editIndex] = sub;
      setSubscriptions(updated);
      setEditIndex(null);
    } else {
      setSubscriptions([...subscriptions, sub]);
    }
  };

  const handleDelete = (index) => {
    setSubscriptions(subscriptions.filter((_, i) => i !== index));
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

  return (
    <div className="p-6">
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
