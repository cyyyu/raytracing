export default class Vector {
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  add(v) {
    return new Vector(this.x + v.x, this.y + v.y, this.z + v.z);
  }

  sub(v) {
    return new Vector(this.x - v.x, this.y - v.y, this.z - v.z);
  }

  scale(scalar) {
    return new Vector(this.x * scalar, this.y * scalar, this.z * scalar);
  }

  dot(v) {
    return this.x * v.x + this.y * v.y + this.z * v.z;
  }

  len() {
    return Math.sqrt(this.dot(this));
  }

  normalize() {
    const length = this.len();
    return new Vector(this.x / length, this.y / length, this.z / length);
  }
}
