export function pharmacySearchUrls(drug:string) {
  const q = encodeURIComponent(drug.trim());
  return {
    truemeds: `https://www.truemeds.in/search?query=${q}`,
    tata1mg: `https://www.1mg.com/search/all?name=${q}`
  };
}
