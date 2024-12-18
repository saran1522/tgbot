import { createContext, useContext, useEffect, useState } from "react";
import { getUsers, userOperations } from "../endpoints";

const UserContext = createContext();

export default function UserProvider({ children }) {
  const [allUsers, setAllUsers] = useState(null);
  const [users, setUsers] = useState(allUsers ? allUsers.users : []);
  const [blockedUsers, setBlockedUsers] = useState(
    allUsers ? allUsers.blocked : []
  );
  const [currModal, setCurrModal] = useState("none");
  const [currUser, setCurrUser] = useState({});
  const [botSettings, setBotSettings] = useState({
    apiKey: "this-is-api-key",
    botToken: "this-is-bot-token",
    botName: "Weather Bot",
    botUsername: "boss_weather_bot",
  });
  const [isOpen, setIsOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  function handleBotSettingChange(newSettings) {
    setBotSettings(newSettings);
  }

  function toggleModal() {
    setIsOpen(!isOpen);
  }

  function toggleUpdateModal() {
    setIsUpdateModalOpen(!isUpdateModalOpen);
  }

  function handleCurrModal(modal) {
    setCurrModal(modal);
  }
  function handleCurrUser(user) {
    setCurrUser(user);
  }

  const handleDeleteUser = async (id) => {
    console.log("deleting user", id);
    // setUsers((users) => users.filter((u) => u.id !== id));
    setAllUsers((allUsers) => allUsers.users.filter((u) => u.id !== id));
  };

  const handleBlockUser = async (user) => {
    console.log("blocking user", user);
    // setBlockedUsers((blockedUsers) => [...blockedUsers, user]);
    setAllUsers((allUsers) => allUsers.blocked.push(user));
  };

  const handleUnblockUser = async (user) => {
    console.log("unblocking user", user);
    setAllUsers((allUsers) => allUsers.blocked.filter((u) => u.id !== user.id));
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await getUsers();
      console.log("initial user fetch", users);
      setAllUsers(users);
      setUsers(users.users);
      setBlockedUsers(users.blocked);
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    async function updateUsers() {
      console.log("updating users");
      await userOperations(allUsers);
    }
    updateUsers();
  }, [allUsers]);

  return (
    <UserContext.Provider
      value={{
        botSettings,
        handleBotSettingChange,
        isOpen,
        toggleModal,
        currModal,
        handleCurrModal,
        isUpdateModalOpen,
        toggleUpdateModal,
        users,
        handleDeleteUser,
        blockedUsers,
        handleBlockUser,
        currUser,
        handleCurrUser,
        handleUnblockUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within a UserProvider");
  return context;
}
