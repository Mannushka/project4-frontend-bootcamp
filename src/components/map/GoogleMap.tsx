import axios from "axios";
import { useState, useEffect } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
} from "@vis.gl/react-google-maps";

import { Box } from "@chakra-ui/react";

interface GoogleMapProps {
  address: string;
}
interface GeoLocation {
  lat: number;
  lng: number;
}

const GoogleMap = ({ address }: GoogleMapProps): JSX.Element => {
  const [open, setOpen] = useState<boolean>(false);
  const [latitude, setLatitude] = useState<number>(22.28100746317362);
  const [longitude, setLongitude] = useState<number>(114.15245889816494);
  // const position = { lat: 22.28100746317362, lng: 114.15245889816494 }; // Hong Kong
  const newAddress = address + ", Hong Kong";

  useEffect(() => {
    const geocodeAddress = async () => {
      if (!newAddress || typeof newAddress !== "string") {
        throw new Error("Address is missing or invalid.");
      }
      try {
        const response = await axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
            newAddress
          )}&key=${import.meta.env.VITE_GOOGLE_API_KEY}`
        );
        const data = response.data;
        if (data.results.length) {
          const result = data.results[0];
          const { lat, lng }: GeoLocation = result.geometry.location;
          setLatitude(lat);
          setLongitude(lng);
        } else {
          throw new Error("Geocoding failed");
        }
      } catch (error) {
        console.log(error);
        throw new Error("Geocoding failed");
      }
    };
    geocodeAddress();
  }, [newAddress, latitude, longitude]);

  return (
    <Box>
      <APIProvider apiKey={import.meta.env.VITE_GOOGLE_API_KEY}>
        <Map
          style={{ width: "100%", height: "203px" }}
          center={{ lat: latitude, lng: longitude }}
          defaultZoom={15}
          gestureHandling={"greedy"}
          disableDefaultUI={true}
          mapId={import.meta.env.VITE_MAP_ID}
          zoomControl={true}
          maxZoom={20}
          minZoom={8}
        />
        {latitude && longitude && (
          <AdvancedMarker
            position={{ lat: latitude, lng: longitude }}
            // position={position}
            onClick={() => setOpen(true)}
          >
            <Pin
              background={"red"}
              borderColor={"black"}
              glyphColor={"white"}
            />
          </AdvancedMarker>
        )}
        {open && (
          <InfoWindow
            position={{ lat: latitude, lng: longitude }}
            onCloseClick={() => setOpen(false)}
          >
            <p style={{ color: "black" }}>It's here!</p>
          </InfoWindow>
        )}
      </APIProvider>
    </Box>
  );
};

export default GoogleMap;
