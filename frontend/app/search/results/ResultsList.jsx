"use client";
import InfoCard from "../components/InfoCard";
import { useSearchStore } from "../../../store";
import data1 from "../../listingsData.json";

export const ResultsList = ({ }) => {
  const searchLocation = useSearchStore((state) => state.location);

  const filteredListings =
    searchLocation === ""
      ? data1
      : data1.filter((listing) =>
          listing.name.toLowerCase().includes(searchLocation)
        );

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
      {filteredListings.map((listing) => (
        <InfoCard listing={listing} key={listing.id} />
      ))}
    </div>
  );
};
