"use client";

import { useEffect } from "react";

export default function ConvocoreWidget() {
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const id = searchParams.get("id");

    if (!id) return;

    // Set VG_CONFIG
    (window as any).VG_CONFIG = {
      ID: id,
      region: "na",
      render: "bottom-right",
      stylesheets: [
        "https://vg-bunny-cdn.b-cdn.net/vg_live_build/styles.css",
      ],
    };

    // Create script element
    const script = document.createElement("script");
    script.src =
      "https://vg-bunny-cdn.b-cdn.net/vg_live_build/vg_bundle.js";
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup
      const existingScript = document.querySelector(
        'script[src*="vg_bundle.js"]'
      );
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  return null;
}