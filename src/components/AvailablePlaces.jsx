import Places from './Places.jsx';
import {useEffect, useState} from "react";
import ErrorPage from "./Error.jsx";
import {sortPlacesByDistance} from "../loc.js";

export default function AvailablePlaces({ onSelectPlace }) {
  const [isFetching, setIsFetching] = useState(false); // loading state
  const [availablePlaces, setAvailablePlaces] = useState([]); // data state
  const [error, setError] = useState(); // error state

  useEffect(() => {
    async function fetchPlaces() {
      setIsFetching(true);

      try {
        const response = await fetch('http://localhost:3000/places');

        if (!response.ok) {
          // noinspection ExceptionCaughtLocallyJS
          throw new Error('Failed to fetch places.')
        }
        const responseData = await response.json();

        navigator.geolocation.getCurrentPosition(position => {
          const {latitude, longitude} = position.coords;
          const sortedPlaces = sortPlacesByDistance(responseData.places, latitude, longitude);
          setAvailablePlaces(sortedPlaces);
          setIsFetching(false);
        })
      } catch (error) {
        setError({
          message: error.message || "Could not fetch places, please try again later."
        });
        setIsFetching(false);
      }
    }

    fetchPlaces();
  }, []);

  if (error) {
    return <ErrorPage title="An error occurred!" message={error.message} />
  }

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      loadingText="Fetching place data..."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
      isLoading={isFetching}
    />
  );
}
