export class Person {
  constructor(private name: string) {}
  greet(name: string) {
    return `Hello, ${name}. My name is ${this.name}.`;
  }
}
