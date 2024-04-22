import { BiMedal, BiBookOpen } from 'react-icons/bi'
import { FiCalendar } from 'react-icons/fi'

const Details = ({ }) => {
  return (
    <div className="py-5 border-b-2 border-b-slate-200 space-y-4">
      <h1 className="text-xl font-semibold">Description</h1>
      <p className="text-slate-500 text-lg w-full sm:w-4/5">Lore Imsupm</p>

      <div className=" flex space-x-4 ">
        <BiBookOpen className="text-4xl" />
        <div>
          <h1 className="text-xl font-semibold">Location</h1>
          <p className="cursor-pointer">Location Impsum</p>
        </div>
      </div>
      <div className=" flex space-x-4">
        <BiMedal className="text-4xl" />
        <div>
          <h1 className="text-xl font-semibold">Juan Miguel Castro is a Superhost</h1>
          <p>
            Superhosts are experienced, highly rated hosts who are committed to providing great
            stays for guests.
          </p>
        </div>
      </div>
      <div className=" flex space-x-4">
        <FiCalendar className="text-4xl" />
        <div>
          <h1 className="text-xl font-semibold">Advance monthly payment.</h1>
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
