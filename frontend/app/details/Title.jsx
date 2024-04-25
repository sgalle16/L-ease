import InfoCard from "../search/components/InfoCard";
import Link from 'next/link';

const Title = ({ apartment }) => {
  return (
    <div>
      <h1 className="text-3xl font-semibold capitalize">{apartment.name}</h1>
      <div className="flex justify-between">
        <div className="flex items-center mt-2 space-x-2 text-lg text-slate-500">
          rooms
        </div>
      </div>
      <div className="w-1/3 h-1/3 overflow-hidden relative">
            <img
                src={apartment.image}
                alt={apartment.name}
                className="w-full h-48 object-cover transition-transform duration-300 transform hover:scale-110"

            />
      </div>


    </div>
  );
};

export default Title;
