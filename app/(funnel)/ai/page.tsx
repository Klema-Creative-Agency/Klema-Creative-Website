import { Suspense } from "react";
import FunnelPageClient from "./FunnelPageClient";

export default function AIFunnelPage() {
  return (
    <Suspense>
      <FunnelPageClient />
    </Suspense>
  );
}
