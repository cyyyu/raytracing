import Vector from "./lib/Vector";
import Sphere from "./lib/Sphere";
import Color from "./lib/Color";
import Ray from "./lib/Ray";
import Light from "./lib/Light";
import Material from "./lib/Material";

const canvas = document.createElement("canvas");

const width = 400;
const height = 300;

canvas.setAttribute("width", width);
canvas.setAttribute("height", height);

const ctx = canvas.getContext("2d");
const imageData = ctx.getImageData(0, 0, width, height);
const pixels = imageData.data;

const scene = {
  imagePlane: {
    topLeft: new Vector(-1, 0.75, 0),
    topRight: new Vector(1, 0.75, 0),
    bottomLeft: new Vector(-1, -0.75, 0),
    bottomRight: new Vector(1, -0.75, 0)
  },
  camera: new Vector(0, 0, 20),
  spheres: [
    new Sphere(
      new Vector(-0.4, 0.4, -1),
      0.25,
      new Material(
        new Color(0.1, 0.1, 0.1),
        new Color(0.9, 0.1, 0.3),
        new Color(0.7, 0.7, 0.7),
        20,
        new Color(0.2, 0.1, 0.1)
      )
    ),
    new Sphere(
      new Vector(0.3, 0, -1),
      0.4,
      new Material(
        new Color(0.1, 0.1, 0.1),
        new Color(0.9, 0.8, 0.0),
        new Color(0.5, 0.5, 0.5),
        20,
        new Color(0.1, 0.1, 0.2)
      )
    ),
    new Sphere(
      new Vector(-0.25, -0.35, -1.5),
      0.3,
      new Material(
        new Color(0.1, 0.1, 0.1),
        new Color(0.4, 0.9, 0.9),
        new Color(0.7, 0.7, 0.7),
        40,
        new Color(0.2, 0.2, 0.1)
      )
    )
  ],
  lights: [
    new Light(
      new Vector(1.6, 1.5, -2),
      new Color(0.5, 0.5, 0.5),
      new Color(0.8, 0.8, 0.8)
    ),
    new Light(
      new Vector(-4, -2.65, 2.5),
      new Color(0.4, 0.4, 0.4),
      new Color(0.8, 0.8, 0.8)
    )
  ],
  ambientLightIntensity: new Color(0.6, 0.6, 0.6)
};

function setColor(offset, color) {
  const c = color.to255();
  pixels[offset] = c.r;
  pixels[offset + 1] = c.g;
  pixels[offset + 2] = c.b;
  pixels[offset + 3] = 255;
}

function buildRay(x, y) {
  // compute the ray
  const alpha = x / width;
  const beta = y / height;
  const xt = scene.imagePlane.topLeft
    .scale(1 - alpha)
    .add(scene.imagePlane.topRight.scale(alpha));
  const b = scene.imagePlane.bottomLeft
    .scale(1 - alpha)
    .add(scene.imagePlane.bottomRight.scale(alpha));
  const p = xt.scale(1 - beta).add(b.scale(beta));
  const ray = new Ray(scene.camera, p.sub(scene.camera));

  return ray;
}

for (let x = 0; x < width; x++)
  for (let y = 0; y < height; y++) {
    const ray = buildRay(x, y);
    const color = ray.intersectionTest(scene);
    const offset = (y * width + x) * 4;

    setColor(offset, color);
  }

ctx.putImageData(imageData, 0, 0);

document.body.appendChild(canvas);
