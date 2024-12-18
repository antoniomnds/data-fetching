export async function fetchAvailablePlaces() {
  const response = await fetch('http://localhost:3000/places');

  if (!response.ok) {
    // noinspection ExceptionCaughtLocallyJS
    throw new Error('Failed to fetch places.')
  }
  const responseData = await response.json();
  return responseData.places;
}