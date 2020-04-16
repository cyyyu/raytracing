export default class Color {
  constructor(r, g, b) {
    this.r = r;
    this.g = g;
    this.b = b;
  }

  to255() {
    return {
      r: Math.floor(this.r * 255),
      g: Math.floor(this.g * 255),
      b: Math.floor(this.b * 255)
    };
  }

  times(color) {
    return new Color(this.r * color.r, this.g * color.g, this.b * color.b);
  }

  add(color) {
    this.r += color.r;
    this.g += color.g;
    this.b += color.b;
  }

  scale(scalar) {
    return new Color(this.r * scalar, this.g * scalar, this.b * scalar);
  }

  clone() {
    return new Color(this.r, this.g, this.b);
  }

  clamp() {
    this.r = this.r < 0 ? 0 : this.r > 1 ? 1 : this.r;
    this.g = this.g < 0 ? 0 : this.g > 1 ? 1 : this.g;
    this.b = this.b < 0 ? 0 : this.b > 1 ? 1 : this.b;
  }
}
