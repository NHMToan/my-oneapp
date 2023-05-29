import unidecode from "unidecode";

export function searchVietnameseName(name: string, searchValue: string): boolean {
  // Convert the Vietnamese name to ASCII without diacritical marks
  const asciiName: string = unidecode(name);

  // Convert the search value to lowercase and remove diacritical marks
  const asciiSearchValue: string = unidecode(searchValue.toLowerCase());

  // Perform a case-insensitive search on the ASCII name
  return asciiName.toLowerCase().includes(asciiSearchValue);
}
