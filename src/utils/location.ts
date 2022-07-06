export function getValueFromUrlParams(searchParams, fieldName) {
  const urlParams = new URLSearchParams(searchParams);

  return urlParams.get(fieldName) || undefined;
}
