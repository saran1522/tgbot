import { RiSettings3Line } from "react-icons/ri";
import Api from "./Api";
import { useUser } from "../Context/UserContext";
import UpdateModal from "./UpdateModal";

function ApiSettings() {
  const { botSettings, isUpdateModalOpen, toggleUpdateModal } = useUser();

  return (
    <div className="lg:w-3/5 max-md:mt-10">
      <div className="flex gap-3 text-2xl items-center">
        <h2 className="pl-1 font-semibold text-indigo-800">API Settings</h2>
        <RiSettings3Line
          className="cursor-pointer"
          onClick={toggleUpdateModal}
        />
        {isUpdateModalOpen && <UpdateModal />}
      </div>
      <div>
        <div className="flex flex-col gap-3 mt-10 max-md:mt-2">
          <Api title="Open Weather API Key" apiKey={botSettings.apiKey} />
          <Api title="Telegram BOT Token" apiKey={botSettings.botToken} />
        </div>
      </div>
    </div>
  );
}

export default ApiSettings;
