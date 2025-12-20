import React, { Suspense } from "react";
import CardPreview from "./CardPreview";

export default function CardPreviewPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CardPreview />
    </Suspense>
  );
}

