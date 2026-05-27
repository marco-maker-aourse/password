import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

import { analyzePassword } from "../components/ai/passwordClassifier";
import { generatePassword } from "../utils/passwordGenerator";

export default function HomeScreen() {
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);

  const result = analyzePassword(password);

  const handleGenerate = () => {
    setPassword(generatePassword(16));
    setVisible(true);
  };

  const getBarColor = () => {
    if (result.level === "Segura") return styles.barSafe;
    if (result.level === "Media") return styles.barMedium;
    return styles.barWeak;
  };

  const getTextColor = () => {
    if (result.level === "Segura") return styles.textSafe;
    if (result.level === "Media") return styles.textMedium;
    return styles.textWeak;
  };

  return (
    <LinearGradient
      colors={["#eef4ff", "#f5f3ff", "#ecfeff"]}
      style={styles.container}
    >
      <View style={styles.glow} />
      <View style={styles.card}>
        <Text style={styles.eyebrow}>SafePass AI</Text>
        <Text style={styles.title}>Clasifica tu contraseña en tiempo real</Text>
        <Text style={styles.subtitle}>
          Análisis local, visual moderno y consejos claros.
        </Text>

        <View style={styles.inputBox}>
          <TextInput
            style={styles.input}
            placeholder="Escribe tu contraseña"
            placeholderTextColor="#64748b"
            secureTextEntry={!visible}
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity
            style={styles.eyeButton}
            onPress={() => setVisible(!visible)}
          >
            <Text style={styles.toggleText}>{visible ? "Ocultar" : "Ver"}</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.generateButton}
          onPress={handleGenerate}
        >
          <Text style={styles.generateText}>Generar contraseña segura</Text>
        </TouchableOpacity>

        <View style={styles.metaRow}>
          <Text style={styles.metaChip}>
            Longitud: {result.features.length}
          </Text>
          <Text style={styles.metaChip}>
            Entropía: {Math.round(result.features.entropy)} bits
          </Text>
        </View>

        <View style={styles.scoreBox}>
          <View style={styles.scoreRow}>
            <Text style={styles.scoreLabel}>Puntaje IA</Text>
            <Text style={[styles.scoreValue, getTextColor()]}>
              {result.score}/100
            </Text>
          </View>
          <View style={styles.barContainer}>
            <View
              style={[
                styles.barFill,
                getBarColor(),
                { width: `${result.score}%` },
              ]}
            />
          </View>
          <Text style={[styles.levelText, getTextColor()]}>
            Nivel: {result.level}
          </Text>
        </View>

        <View style={styles.panel}>
          <Text style={styles.panelTitle}>Recomendaciones</Text>
          {result.suggestions.length === 0 ? (
            <Text style={styles.goodText}>
              Contraseña bastante segura. Mantén el patrón y añade más longitud
              si quieres.
            </Text>
          ) : (
            result.suggestions.map((tip, index) => (
              <Text key={index} style={styles.tipText}>
                • {tip}
              </Text>
            ))
          )}
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  glow: {
    position: "absolute",
    top: -80,
    right: -50,
    width: 180,
    height: 180,
    borderRadius: 100,
    backgroundColor: "rgba(129, 140, 248, 0.20)",
  },
  card: {
    backgroundColor: "rgba(255,255,255,0.78)",
    borderRadius: 28,
    padding: 18,
    shadowColor: "#8b5cf6",
    shadowOpacity: 0.18,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
    borderWidth: 1,
    borderColor: "rgba(148, 163, 184, 0.25)",
  },
  eyebrow: {
    color: "#6366f1",
    fontSize: 13,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 2,
    marginBottom: 6,
  },
  title: {
    fontSize: 30,
    fontWeight: "800",
    color: "#111827",
    marginBottom: 6,
  },
  subtitle: {
    color: "#475569",
    fontSize: 15,
    marginBottom: 18,
  },
  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderColor: "#cbd5e1",
    borderWidth: 1,
    borderRadius: 18,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 16,
  },
  input: {
    flex: 1,
    color: "#0f172a",
    fontSize: 16,
  },
  eyeButton: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: "#eff6ff",
  },
  toggleText: {
    color: "#4f46e5",
    fontWeight: "700",
  },
  generateButton: {
    backgroundColor: "#4f46e5",
    borderRadius: 16,
    paddingVertical: 12,
    alignItems: "center",
    marginBottom: 10,
  },
  generateText: {
    color: "#ffffff",
    fontWeight: "800",
    fontSize: 14,
  },
  metaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  metaChip: {
    flex: 1,
    backgroundColor: "#eef2ff",
    color: "#3730a3",
    borderRadius: 14,
    paddingVertical: 8,
    paddingHorizontal: 10,
    fontWeight: "700",
    textAlign: "center",
  },
  scoreBox: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#e5eefb",
  },
  scoreRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  scoreLabel: {
    color: "#475569",
    fontWeight: "700",
  },
  scoreValue: {
    fontWeight: "800",
    fontSize: 18,
  },
  barContainer: {
    height: 10,
    backgroundColor: "#e2e8f0",
    borderRadius: 999,
    overflow: "hidden",
    marginBottom: 8,
  },
  barFill: {
    height: "100%",
  },
  barSafe: { backgroundColor: "#22c55e" },
  barMedium: { backgroundColor: "#facc15" },
  barWeak: { backgroundColor: "#f97316" },
  levelText: {
    fontSize: 18,
    fontWeight: "800",
  },
  textSafe: { color: "#15803d" },
  textMedium: { color: "#b45309" },
  textWeak: { color: "#ea580c" },
  panel: {
    backgroundColor: "#ffffff",
    borderColor: "#e5eefb",
    borderWidth: 1,
    borderRadius: 22,
    padding: 14,
  },
  panelTitle: {
    color: "#111827",
    fontSize: 17,
    fontWeight: "800",
    marginBottom: 8,
  },
  goodText: {
    color: "#15803d",
    fontWeight: "600",
  },
  tipText: {
    color: "#334155",
    marginBottom: 6,
  },
});
