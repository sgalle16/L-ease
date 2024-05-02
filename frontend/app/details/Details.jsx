import { BiMedal, BiBookOpen } from 'react-icons/bi'
import { FiCalendar } from 'react-icons/fi'

const Details = ({ apartment }) => {
  return (
    <div className="py-5 border-b-2 border-b-slate-200 space-y-4">
      <h1 className="text-xl font-semibold">Descripción</h1>
      <p className="text-slate-500 text-lg w-full sm:w-4/5">{apartment.description}</p>

      <div className=" flex space-x-4 ">
        <BiBookOpen className="text-4xl" />
        <div>
          <h1 className="text-xl font-semibold">Location</h1>
          <p className="cursor-pointer">{apartment.location}</p>
        </div>
      </div>
      <div className=" flex space-x-4">
        <BiMedal className="text-4xl" />
        <div>
          <h1 className="text-xl font-semibold capitalize">{apartment.owner} - Arrendador</h1>
          <p className="font-bold">
            Información de contacto
          </p>
          <p>
              <strong>Correo electrónico:</strong> {apartment.email}
          </p>
          <p>
              <strong>Teléfono:</strong> (+57) {apartment.phone}
          </p>
        </div>
      </div>
      <div className=" flex space-x-4">
        <FiCalendar className="text-4xl" />
        <div>
          <h1 className="text-xl font-semibold">Pago mensual anticipado.</h1>
          <p className="cursor-pointer">{`$${apartment.price.toLocaleString('es-CO')}`}</p>
        </div>
        
      </div>
      <button
            type="submit"
            className={`flex flex-row justify-center items-center
            w-full text-white text-md bg-[#000000]
            py-2 px-5 rounded-full drop-shadow-xl hover:bg-white
            border-transparent border
            hover:hover:text-[#000000]
            hover:border-[#000000]
            mt-5 transition-all duration-500 ease-in-out `}
          >
            Contact Owner
          </button>
    </div>
  )
}

export default Details
