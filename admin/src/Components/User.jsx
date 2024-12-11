import { useUser } from "../Context/UserContext";
import Modal from "./Modal";
// import data from "../data";
function User({ user, isBlocked }) {
  const { handleCurrModal, handleCurrUser } = useUser();
  return (
    <div className="flex justify-between px-6 max-md:px-0 max-md:gap-2 max-md:text-sm py-3 items-center border-b border-gray-800">
      <p>{user.first_name}</p>
      <p>{`@${user.username}`}</p>
      <div className="flex gap-6 items-center text-base">
        <button
          className="rounded-xl border-2 text-sm border-[#ec871b7d] text-[#ec6e1bb4] px-3 py-1.5 hover:bg-[#ec871b7c] hover:text-black"
          onClick={() => {
            isBlocked ? handleCurrModal("unblock") : handleCurrModal("block");
            handleCurrUser(user);
          }}
        >
          {isBlocked ? "Unblock" : "Block"}
        </button>
        <button
          className="rounded-xl border-2 text-sm border-[#ec1b1b6f] text-[#ec1b1bb6] px-3 py-1.5 hover:bg-[#7e2323d0] hover:text-black"
          onClick={() => {
            handleCurrModal("delete");
            handleCurrUser(user);
          }}
        >
          Delete
        </button>
      </div>
      <Modal user={user} />
    </div>
  );
}

export default User;
