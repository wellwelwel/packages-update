export const styles = {
  yellow: '\x1b[33m',
  green: '\x1b[32m',
  blue: '\x1b[34m',
  dim: '\x1b[2m',
  reset: '\x1b[0m',
  bold: '\x1b[1m',
};

export const logProgress = (count: number, total: number) => {
  process.stdout.write(
    count < total
      ? `\x1b[0G🔎 ${String(count++).padStart(String(total).length, ' ')}/${total}`
      : `\x1b[0G✅ ${String(count++).padStart(String(total).length, ' ')}/${total}\n`
  );
};
