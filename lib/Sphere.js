export default class Sphere {
  constructor(center, radius, material) {
    this.center = center;
    this.radius = radius;
    this.material = material;
  }

  intersectionTest(ray) {
    const cp = ray.origin.sub(this.center);
    const a = ray.direction.dot(ray.direction);
    const b = 2 * cp.dot(ray.direction);
    const c = cp.dot(cp) - this.radius * this.radius;
    const b2sub4ac = b * b - 4 * a * c;

    if (b2sub4ac < 0) {
      // no intersection
      return null;
    }

    const ts = [];
    const sqrt = Math.sqrt(b2sub4ac);
    const t1 = (-b + sqrt) / (2 * a);

    if (t1 >= 0) ts.push(t1);

    const t2 = (-b - sqrt) / (2 * a);

    if (t2 >= 0) ts.push(t2);

    // no intersection
    if (ts.length === 0) return null;

    const t = Math.min.apply(null, ts);

    return t;
  }
}
