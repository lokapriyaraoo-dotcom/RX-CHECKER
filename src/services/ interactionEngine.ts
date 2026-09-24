export function findInteractions(
  drugs: string[]
) {

  const interactions = [];

  if (
    drugs.includes("Warfarin") &&
    drugs.includes("Aspirin")
  ) {
    interactions.push({
      severity: "Critical",
      message:
        "Potential bleeding risk"
    });
  }

  return interactions;
}
