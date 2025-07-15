import React from "react";
import { Loader2 } from "lucide-react";

function LoadingPage() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        textAlign: "center",
      }}
    >
      <Loader2 className="animate-spin" size={50} />
      <h4 className="text-2xl font-semibold">Loading, please wait...</h4>
    </div>
  );
}

export default LoadingPage;
