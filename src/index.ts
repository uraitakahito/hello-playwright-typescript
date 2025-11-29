/**
 * Sample TypeScript file for ESLint verification
 */
export function greet(name: string): string {
  return `Hello, ${name}!`;
}

const message = greet('World');
console.log(message);
