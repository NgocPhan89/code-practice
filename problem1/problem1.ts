/* Provide 3 unique implementations of the following function in JavaScript.
 * Input**: `n` - any integer
 * Assuming this input will always produce a result lesser than `Number.MAX_SAFE_INTEGER`*.
 * Output**: `return` - summation to `n`, i.e. `sum_to_n(5) === 1 + 2 + 3 + 4 + 5 === 15`.
 */

// Arithmetic Formula
const sum_to_n_a = (n: number): number => {
  if (!Number.isInteger(n) || n < 1) {
    throw new Error("Input must be a positive integer.");
  }
  return (n * (n + 1)) / 2;
};

// For Loop
const sum_to_n_b = (n: number): number => {
  if (!Number.isInteger(n) || n < 1) {
    throw new Error("Input must be a positive integer.");
  }

  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
};

// While Loop
const sum_to_n_c = (n: number): number => {
  if (!Number.isInteger(n) || n < 1) {
    throw new Error("Input must be a positive integer.");
  }

  let sum = 0;
  let i = 1;
  while (i <= n) {
    sum += i;
    i++;
  }
  return sum;
};
