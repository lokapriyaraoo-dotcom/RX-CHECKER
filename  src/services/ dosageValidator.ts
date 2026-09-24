export function validateDose(
  dose:number,
  unit:string
) {

  if (
    unit === "mg" &&
    dose > 5000
  ) {
    return false;
  }

  return true;
}
