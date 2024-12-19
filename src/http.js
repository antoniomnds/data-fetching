export async function fetchAvailablePlaces() {
  const response = await fetch('http://localhost:3000/places');

  if (!response.ok) {
    throw new Error('Failed to fetch places.')
  }
  const responseData = await response.json();
  return responseData.places;
}

export async function updateUserPlaces(userPlaces) {
  const response = await fetch(
    'http://localhost:3000/user-places',
    {
      method: 'PUT',
      body: JSON.stringify({ places: userPlaces }),
      headers: {
        "Content-Type": "application/json"
      }
    });

  if (!response.ok) {
    throw new Error('Failed to update user data.')
  }

  const responseData = await response.json()
  return responseData.message;
}