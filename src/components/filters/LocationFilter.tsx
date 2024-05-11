import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../../constants";
import FilterButtonGroup from "./FilterButtonGroup";
interface FilterProps {
  selectedItems: string[];
  setSelectedItems: React.Dispatch<React.SetStateAction<string[]>>;
}

const LocationFilter = ({ selectedItems, setSelectedItems }: FilterProps) => {
  const [locations, setLocations] = useState<string[]>([]);

  useEffect(() => {
    const getLocationsInfo = async (): Promise<void> => {
      try {
        const response = await axios.get(`${BACKEND_URL}/locations`);
        const locations = response.data;
        setLocations(
          locations.map((location: Location) => location.location_name)
        );
      } catch (error) {
        console.log(error);
      }
    };
    getLocationsInfo();
  }, []);
  return (
    <div>
      <p>Location:</p>
      <FilterButtonGroup
        filterItems={locations}
        selectedItems={selectedItems}
        setSelectedItems={setSelectedItems}
      />
    </div>
  );
};

export default LocationFilter;
