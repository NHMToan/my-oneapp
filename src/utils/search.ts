import unidecode from "unidecode";

export function searchVietnameseName(name, searchValue) {
  // Convert the Vietnamese name to ASCII without diacritical marks
  const asciiName = unidecode(name);

  // Convert the search value to lowercase and remove diacritical marks
  const asciiSearchValue = unidecode(searchValue.toLowerCase());

  // Perform a case-insensitive search on the ASCII name
  return asciiName.toLowerCase().includes(asciiSearchValue);
}
