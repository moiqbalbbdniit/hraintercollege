"use client";
import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  const handleAddDummyStudents = async () => {
    setLoading(true);
    setError(null);
    setMessage("");

    try {
      const response = await axios.post("/api/dummyData");
      setMessage(response.data.message);  // Success message
    } catch (err) {
      setError("Failed to add dummy students");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Button
        onClick={handleAddDummyStudents}
        className="bg-teal-700 text-white hover:bg-teal-800"
        disabled={loading}
      >
        {loading ? "Adding students..." : "Add Dummy Students"}
      </Button>

      {message && <p className="mt-4 text-green-600">{message}</p>}
      {error && <p className="mt-4 text-red-600">{error}</p>}
    </div>
  );
}
