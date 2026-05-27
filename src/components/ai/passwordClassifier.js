import { extractFeatures } from "./featureExtractor";

export function analyzePassword(password) {
  const features = extractFeatures(password);
  const {
    length,
    digits,
    lowercase,
    uppercase,
    special,
    hasCommonPattern,
    entropy,
  } = features;

  let score = 0;
  const suggestions = [];

  score += Math.min(length * 3, 30);
  score += digits > 0 ? 10 : 0;
  score += lowercase > 0 ? 8 : 0;
  score += uppercase > 0 ? 10 : 0;
  score += special > 0 ? 15 : 0;
  score += entropy > 35 ? 15 : entropy > 20 ? 8 : 0;

  if (length < 8) suggestions.push("Usa al menos 8 caracteres.");
  if (length < 12)
    suggestions.push("Agrega más longitud para subir la entropía.");
  if (digits === 0)
    suggestions.push("Agrega números para reforzar la seguridad.");
  if (lowercase === 0) suggestions.push("Incluye letras minúsculas.");
  if (uppercase === 0) suggestions.push("Incluye letras mayúsculas.");
  if (special === 0) suggestions.push("Agrega caracteres especiales.");
  if (hasCommonPattern) {
    score -= 25;
    suggestions.push("Evita patrones comunes como 1234, password o qwerty.");
  }

  if (entropy < 28)
    suggestions.push(
      "Mezcla letras, números y símbolos para aumentar la complejidad.",
    );

  score = Math.max(0, Math.min(score, 100));

  let level = "Débil";
  if (score >= 70) level = "Segura";
  else if (score >= 40) level = "Media";

  return {
    score: Math.round(score),
    level,
    suggestions,
    features,
  };
}
