import { useSearchStore } from "../../../store";

const CountIcon = ({ icon, onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={`border rounded-full w-5 h-5 flex justify-center items-center ${className}`}
    >
      <span className="text-white">{icon}</span>
    </button>
  );
};

export const Counter = ({ label }) => {
  const count = useSearchStore((state) => state.rooms);
  const increaseCount = useSearchStore((state) => state.increaseRooms);
  const decreaseCount = useSearchStore((state) => state.decreaseRooms);
 

  return (
    <div className="flex justify-between">
      <p className="font-bold">{label}</p>
      <div className="flex items-center gap-x-1">
        {count > 0 && <CountIcon className="text-white" icon="-" onClick={decreaseCount} />}
        <span>{count}</span>
        <CountIcon className="text-white"  icon="+" onClick={increaseCount} />
      </div>
    </div>
  );
};
