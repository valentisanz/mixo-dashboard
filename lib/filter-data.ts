export default function filterData(data: any[], searchTerm: string): any[] {
  if (!data) return [];

  const searchLower = searchTerm.toLowerCase();

  const matchesSearch = (value: any): boolean => {
    if (typeof value === "object" && value !== null) {
      return Object.values(value).some((subValue) => matchesSearch(subValue));
    }
    if (typeof value === "string" || typeof value === "number") {
      return value.toString().toLowerCase().includes(searchLower);
    }
    return false;
  };

  return data.filter((item) =>
    Object.values(item).some((value) => matchesSearch(value))
  );
}
