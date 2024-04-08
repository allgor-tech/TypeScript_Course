abstract class Shape {
  readonly name: string;
  readonly color: string;

  constructor(name: string, color: string) {
    this.name = name;
    this.color = color;
  }

  public abstract calculateArea(): number;
}

class Circle extends Shape {
  radius: number;

  constructor(name: string, color: string, radius: number) {
    super(name, color);
    this.radius = radius;
  }

  public calculateArea(): number {
    return Math.PI * Math.pow(this.radius, 2);
  }
}

class Rectangle extends Shape {
  width: number;
  height: number;

  constructor(name: string, color: string, width: number, height: number) {
    super(name, color);
    this.width = width;
    this.height = height;
  }

  public calculateArea(): number {
    return this.width * this.height;
  }

  print(): void {
    console.log(`Area = width * height = ${this.calculateArea()}`);
  }
}

class Square extends Shape {
  side: number;

  constructor(name: string, color: string, side: number) {
    super(name, color);
    this.side = side;
  }

  public calculateArea(): number {
    return Math.pow(this.side, 2);
  }

  print(): void {
    console.log(`Area = side * side = ${this.calculateArea()}`);
  }
}

class Triangle extends Shape {
  base: number;
  height: number;

  constructor(name: string, color: string, base: number, height: number) {
    super(name, color);
    this.base = base;
    this.height = height;
  }

  public calculateArea(): number {
    return 0.5 * this.base * this.height;
  }
}
