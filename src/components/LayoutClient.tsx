"use client";

import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function LayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Trigger loader when path changes
    setLoading(true);

    const timeout = setTimeout(() => {
      setLoading(false);
    }, 500); // simulate load delay

    return () => clearTimeout(timeout);
  }, [pathname]);

  return (
    <>
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
          <Loader className="h-10 w-10 animate-spin text-teal-800" />
        </div>
      )}
      {children}
    </>
  );
}
