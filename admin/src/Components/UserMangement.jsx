import User from "./User";
import { useUser } from "../Context/UserContext";

function UserMangagement() {
  // console.log("inside user management")
  const { users, blockedUsers } = useUser();
  console.log("rerendering the user mangement");
  return (
    <div className="flex flex-col px-10 max-md:px-0 gap-5 mt-20">
      <h2 className="text-2xl font-semibold text-indigo-800">
        Subscribed Users
      </h2>
      <div className="p-4 max-md:px-0 flex flex-col gap-4 text-xl">
        {users &&
          users?.map((user, ind) => {
            const isBlocked = Boolean(
              blockedUsers.find((blockedUser) => blockedUser.id === user.id)
            );
            console.log(user.id, isBlocked);
            return <User key={ind} user={user} isBlocked={isBlocked} />;
          })}
      </div>
    </div>
  );
}

export default UserMangagement;
