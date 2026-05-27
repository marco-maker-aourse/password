import { useEffect } from "react";
import { Platform } from "react-native";

import HomeScreen from "./src/screens/HomeScreen";

export default function App() {
  useEffect(() => {
    if (Platform.OS === "web" && "serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch((error) => {
        console.warn("PWA service worker registration failed", error);
      });
    }
  }, []);

  return <HomeScreen />;
}
