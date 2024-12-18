import Places from './Places.jsx';
import {useEffect, useState} from "react";
import ErrorPage from "./Error.jsx";
import {sortPlacesByDistance} from "../loc.js";
import {fetchAvailablePlaces} from "../http.js";

export default function AvailablePlaces({ onSelectPlace }) {
  const [isFetching, setIsFetching] = useState(false); // loading state
  const [availablePlaces, setAvailablePlaces] = useState([]); // data state
  const [error, setError] = useState(); // error state

  useEffect(() => {
    async function fetchPlaces() {
      setIsFetching(true);

      try {
        const places = await fetchAvailablePlaces();

        navigator.geolocation.getCurrentPosition(position => {
          const {latitude, longitude} = position.coords;
          const sortedPlaces = sortPlacesByDistance(places, latitude, longitude);
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
