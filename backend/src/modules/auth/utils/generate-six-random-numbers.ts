export function generateSixRandomNumbers(): string {
  return Array.from({ length: 6 }, () => Math.floor(Math.random() * 10)).join(
    ""
  );
}
