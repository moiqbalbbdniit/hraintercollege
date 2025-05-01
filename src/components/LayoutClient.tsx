"use client";

import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useLoadingStore } from "@/lib/loadingStore"; // import loading store

export default function LayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [routeLoading, setRouteLoading] = useState(true);
  const apiLoading = useLoadingStore((state) => state.loading); // api loading

  useEffect(() => {
    setRouteLoading(true);

    const timeout = setTimeout(() => {
      setRouteLoading(false);
    }, 500); // simulate route load delay

    return () => clearTimeout(timeout);
  }, [pathname]);

  // If either routeLoading OR apiLoading is true → show loader
  const isLoading = routeLoading || apiLoading;

  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
          <Loader className="h-10 w-10 animate-spin text-teal-800" />
        </div>
      )}
      {children}
    </>
  );
}
