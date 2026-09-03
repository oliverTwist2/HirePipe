import { useEffect } from "react";
import useCandidateStore from "../store/useCandidateStore";

export function useWebhook() {
  const addCandidate = useCandidateStore((state) => state.addCandidate);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:3001");

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
