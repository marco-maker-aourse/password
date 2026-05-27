export function generatePassword(length = 14) {
  const lowercase = "abcdefghijklmnopqrstuvwxyz";
  const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const digits = "0123456789";
  const symbols = "!@#$%^&*()-_=+[]{};:,.?";

  const pool = lowercase + uppercase + digits + symbols;
  const values = new Uint32Array(length);

  if (typeof crypto !== "undefined" && crypto.getRandomValues) {
    crypto.getRandomValues(values);
  } else {
    for (let i = 0; i < length; i += 1) {
      values[i] = Math.floor(Math.random() * pool.length);
    }
  }

  return Array.from(values, (value) => pool[value % pool.length]).join("");
}
