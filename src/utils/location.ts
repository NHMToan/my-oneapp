export function getValueFromUrlParams(searchParams: string, fieldName: string): string | undefined {
  const urlParams = new URLSearchParams(searchParams);

  return urlParams.get(fieldName) || undefined;
}
