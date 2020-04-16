export default class Material {
  constructor(
    ambientConstant,
    diffuseConstant,
    specularConstant,
    shininessFactor,
    reflectivity
  ) {
    this.ambientConstant = ambientConstant;
    this.diffuseConstant = diffuseConstant;
    this.specularConstant = specularConstant;
    this.shininessFactor = shininessFactor;
    this.reflectivity = reflectivity;
  }
}
