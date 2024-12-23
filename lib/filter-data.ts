export default function filterData<
  T extends Record<
    string,
    string | number | { aclohol: string } | { bib: string }
  >
>(data: T[], searchTerm: string): T[] {
  if (!data) return [];

  const searchLower = searchTerm.toLowerCase();

  const matchesSearch = (value: unknown): boolean => {
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
