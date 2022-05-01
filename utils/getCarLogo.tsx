import carLogos from "../assets/car-logos.json";

export function getCarLogo(name: string) {
  var nameLower = name.toLocaleLowerCase();
  nameLower = nameLower.replace(" ", "-");
  const entry = carLogos.filter((car) => {
    return car.slug == nameLower;
  });

  return entry[0].image.optimized;
}
