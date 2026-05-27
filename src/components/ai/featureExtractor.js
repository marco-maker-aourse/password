export function extractFeatures(password) {
  const length = password.length;
  const digits = (password.match(/[0-9]/g) || []).length;
  const lowercase = (password.match(/[a-z]/g) || []).length;
  const uppercase = (password.match(/[A-Z]/g) || []).length;
  const special = (password.match(/[!@#$%^&*(),.?":{}|<>]/g) || []).length;

  const commonPatterns = [
    "1234",
    "12345",
    "123456",
    "password",
    "qwerty",
    "admin",
    "abc",
    "1111",
    "0000",
    "letmein",
  ];

  const hasCommonPattern = commonPatterns.some((pattern) =>
    password.toLowerCase().includes(pattern),
  );

  const charsetSize =
    (lowercase > 0 ? 26 : 0) +
    (uppercase > 0 ? 26 : 0) +
    (digits > 0 ? 10 : 0) +
    (special > 0 ? 32 : 0);

  const entropy = charsetSize > 0 ? length * Math.log2(charsetSize) : 0;

  return {
    length,
    digits,
    lowercase,
    uppercase,
    special,
    hasCommonPattern,
    entropy,
    charsetSize,
  };
}
