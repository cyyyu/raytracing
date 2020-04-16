import Vector from "./Vector";
import Color from "./Color";

export default class Ray {
  constructor(origin, direction) {
    this.origin = origin;
    this.direction = direction;
  }

  intersectionTest(scene, color = new Color(0, 0, 0), bounces = 3) {
    // perform intersection test
    let t = Number.MAX_VALUE;
    let closestSphere = null;
    let closestSphereIdx = null;
    for (let i = 0; i < scene.spheres.length; i++) {
      const sphere = scene.spheres[i];
      const intersection = sphere.intersectionTest(this);

      if (intersection && intersection < t) {
        t = intersection;
        closestSphere = sphere;
        closestSphereIdx = i;
      }
    }

    // the ray is not intersected with any sphere
    if (!closestSphere) return color;

    // intersected point on the sphere
    const p = this.origin.add(this.direction.scale(t));
    // normalized vector of that point
    const surfaceNormal = p.sub(closestSphere.center).normalize();
    const material = closestSphere.material;

    // phong illumination model

    for (let l = 0; l < scene.lights.length; l++) {
      const light = scene.lights[l];
      const lightPositionNormal = light.location.sub(p).normalize();
      const dotLightAndSurfaceNormal = surfaceNormal.dot(lightPositionNormal);

      // facing inside the sphere
      if (dotLightAndSurfaceNormal < 0) continue;

      // cast shadow
      const shadowRay = new Ray(p, light.location.sub(p));
      let hasShadow = false;

      for (let i = 0; i < scene.spheres.length; i++) {
        if (i === closestSphereIdx) continue;
        const shadowRayIntersection = scene.spheres[i].intersectionTest(
          shadowRay
        );
        if (
          shadowRayIntersection &&
          shadowRayIntersection > 0 &&
          shadowRayIntersection < 1
        ) {
          hasShadow = true;
          break;
        }
      }

      if (hasShadow) continue;

      // diffuse
      const diffuse = material.diffuseConstant
        .times(light.diffuseIntensity)
        .scale(dotLightAndSurfaceNormal);

      color.add(diffuse);

      // specular
      const reflectance = surfaceNormal
        .scale(2)
        .scale(dotLightAndSurfaceNormal)
        .sub(lightPositionNormal);
      const viewDireciton = p.sub(scene.camera).normalize();
      const specular = material.specularConstant
        .times(light.specularIntensity)
        .scale(
          Math.pow(viewDireciton.dot(reflectance), material.shininessFactor)
        );

      color.add(specular);
    }

    // ambient
    const ambient = scene.ambientLightIntensity.times(material.ambientConstant);
    color.add(ambient);

    if (bounces > 0) {
      const reversedRay = this.direction.scale(-1).normalize();
      const reflectance = surfaceNormal
        .scale(2)
        .scale(surfaceNormal.dot(reversedRay))
        .sub(reversedRay);
      const newRay = new Ray(p.add(surfaceNormal.scale(0.01)), reflectance);

      color.add(
        newRay
          .intersectionTest(scene, color, bounces - 1)
          .times(material.reflectivity)
      );
    }

    color.clamp();

    return color;
  }
}
