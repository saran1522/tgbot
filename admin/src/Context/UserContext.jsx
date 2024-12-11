import { createContext, useContext, useEffect, useState } from "react";
import {
  getUsers,
  deleteUser,
  blockUser,
  getBlockedUsers,
  unblockUser,
} from "../endpoints";

const UserContext = createContext();

export default function UserProvider({ children }) {
  const [users, setUsers] = useState([]);
  const [blockedUsers, setBlockedUsers] = useState([]);
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
    await deleteUser(id);
    const allUsers = await getUsers(id);
    // console.log("after deleting ", allUsers);
    setUsers(allUsers);
  };

  const handleBlockUser = async (user) => {
    console.log("blocking user", user);
    await blockUser(user);
    const allUsers = await getBlockedUsers();
    setBlockedUsers(allUsers);
  };

  const handleUnblockUser = async (user) => {
    console.log("unblocking user", user);
    await unblockUser(user);
    const allUsers = await getBlockedUsers();
    setBlockedUsers(allUsers);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await getUsers();
      console.log("initial user fetch", users);
      setUsers(users);
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchBlockedUsers = async () => {
      const users = await getBlockedUsers();
      console.log("initial blocked user fetch", users);
      setBlockedUsers(users);
    };
    fetchBlockedUsers();
  }, []);

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
