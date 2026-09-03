import { useEffect } from "react";
import useCandidateStore from "../store/useCandidateStore";

export function useWebhook() {
  const addCandidate = useCandidateStore((state) => state.addCandidate);

  useEffect(() => {
    const wsUrl = import.meta.env.VITE_WEBHOOK_WS_URL || "ws://localhost:3001";
    const ws = new WebSocket(wsUrl);

    ws.onmessage = (event) => {
      const payload = JSON.parse(event.data);
      const incoming = Array.isArray(payload) ? payload : [payload];
      incoming.forEach(addCandidate);
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    return () => ws.close();
  }, [addCandidate]);
}
