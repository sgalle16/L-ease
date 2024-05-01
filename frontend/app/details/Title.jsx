import InfoCard from "../search/components/InfoCard";
import Link from 'next/link';

const Title = ({ apartment }) => {
  return (
    <div>
      <h1 className="text-black text-3xl font-semibold capitalize">{apartment.name}</h1>
      <div className="flex justify-between mb-4">
        <div className="flex items-center mt-2 space-x-2 text-lg text-slate-500">
          Algunas imágenes
        </div>
      </div>
      <div className="flex space-x-4">
          <div className="w-1/2 h-1/2 shadow-md rounded-lg overflow-hidden relative">
              <img
                  src={apartment.image}
                  alt={apartment.name}
                  className="w-full h-96 object-cover transition-transform duration-300 transform hover:scale-110"
              />
          </div>

          <div className="w-1/4 h-1/4 shadow-md rounded-lg overflow-hidden relative space-y-5">
            <img
                src={apartment.image}
                alt={apartment.name}
                className="w-full h-44 object-cover transition-transform duration-300 transform hover:scale-110 rounded-lg"
            />
            <img
                src={apartment.image}
                alt={apartment.name}
                className="w-full h-44 object-cover transition-transform duration-300 transform hover:scale-110 rounded-lg"
            />
        </div>

        <div className="w-1/4 h-1/4 shadow-md rounded-lg overflow-hidden relative space-y-5">
            <img
                src={apartment.image}
                alt={apartment.name}
                className="w-full h-44 object-cover transition-transform duration-300 transform hover:scale-110 rounded-lg"
            />
            <img
                src={apartment.image}
                alt={apartment.name}
                className="w-full h-44 object-cover transition-transform duration-300 transform hover:scale-110 rounded-lg"
            />
        </div>
          
      </div>



    </div>
  );
};

export default Title;
