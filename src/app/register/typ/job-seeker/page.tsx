"use client";

import { useEffect } from "react";

type TypeformWindow = Window & {
  tf?: {
    load?: () => void;
  };
};

export default function JobSeekerTypeformEmbedPage() {
  useEffect(() => {
    let cancelled = false;
    let raf = 0;
    const startedAt = performance.now();

    const tick = () => {
      if (cancelled) return;
      const w = window as TypeformWindow;
      if (w.tf?.load) {
        w.tf.load();
        return;
      }
      if (performance.now() - startedAt > 1200) return;
      raf = requestAnimationFrame(tick);
    };

    tick();
    return () => {
      cancelled = true;
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div
        data-tf-live="01KM0CD4821QK58739X18ET7QH"
        style={{ minHeight: "min(980px, 85vh)" }}
      />
    </>
  );
}

