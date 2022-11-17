export async function calcDateDiff({ start, end }) {
  const url = `/api/dates?start=${start}&end=${end}`;
  const response = await fetch(url);

  if (response.ok) {
    const amount = await response.json();
    return amount;
  } else {
    return false;
  }
}
