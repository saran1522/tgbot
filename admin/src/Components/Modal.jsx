import { useUser } from "../Context/UserContext";

function Modal({ user }) {
  const {
    currModal,
    handleCurrModal,
    currUser,
    handleBlockUser,
    handleDeleteUser,
    handleUnblockUser,
  } = useUser();
  if (currModal === "none") return;
  const isDelete = currModal === "delete";
  const isBlock = currModal === "block";

  return (
    <div
      className="h-screen w-full fixed top-0 left-0 flex justify-center items-center bg-[#1d1d253f] "
      onClick={() => handleCurrModal("none")}
    >
      <div className="p-4 rounded-2xl flex flex-col gap-6 bg-slate-950 border-2 border-gray-800">
        <p>
          {isDelete
            ? "Are you sure you want to delete the user?"
            : "Are you sure you want to block the user?"}
        </p>
        <div className="flex justify-end gap-4">
          <button
            className="rounded-lg px-3 py-1 bg-red-700 text-slate-950 text-sm"
            onClick={() =>
              isDelete
                ? handleDeleteUser(currUser.id)
                : isBlock
                ? handleBlockUser(currUser)
                : handleUnblockUser(currUser.id)
            }
          >
            Yes
          </button>
          <button className="rounded-lg px-3 py-1 bg-green-700 text-slate-950 text-sm">
            No
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
