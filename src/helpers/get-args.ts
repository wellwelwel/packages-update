import process from 'node:process';

const [, , ...processArgs] = process.argv;

/**
 * Gets the value of an argument.
 *
 * ---
 *
 * CLI arguments examples:
 *
 * ```sh
 * command --arg=some # 'some'
 * command --arg=""   # ''
 * command --arg      # undefined
 * ```
 */
export const getArg = <T = string>(
  arg: string,
  prefix = '--'
): T | undefined => {
  const mountArg = processArgs.find((a) => a.startsWith(`${prefix}${arg}=`));
  if (!mountArg) return undefined;

  return mountArg.split('=')?.[1].replace(/''|""/, '') as T;
};

/**
 * Checks if an argument exists.
 *
 * ---
 *
 * CLI arguments examples:
 *
 * ```sh
 * command --arg  # true
 * command        # false
 * ```
 */
export const hasArg = (arg: string, prefix = '--'): boolean =>
  processArgs.some((a) => a.startsWith(`${prefix}${arg}`));
