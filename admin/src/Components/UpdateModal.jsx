import React, { useState } from "react";
import { useUser } from "../Context/UserContext";
import EditInput from "./EditInput";

function UpdateModal() {
  const { botSettings, handleBotSettingChange, toggleUpdateModal } = useUser();
  const [settings, setSettings] = useState(botSettings);

  const handleSettingChange = (field) => (value) => {
    setSettings({ ...settings, [field]: value });
  };
  return (
    <div className="h-screen w-full fixed top-0 left-0 bg-[#1d1d2580] flex justify-center items-center ">
      <div className="p-4 rounded-3xl flex flex-col gap-6 w-2/5 max-md:w-4/5 bg-slate-950 border-2 border-slate-800">
        <EditInput
          label="API Key"
          value={botSettings.apiKey}
          handleChange={handleSettingChange("apiKey")}
        />
        <EditInput
          label="Bot Token"
          value={botSettings.botToken}
          handleChange={handleSettingChange("botToken")}
        />
        <EditInput
          label="Bot Name"
          value={botSettings.botName}
          handleChange={handleSettingChange("botName")}
        />
        <EditInput
          label="Bot Username"
          value={botSettings.botUsername}
          handleChange={handleSettingChange("botUsername")}
        />
        <div className="flex gap-4">
          <button
            className="px-3 py-2 text-base text-slate-950 bg-green-700 rounded-xl"
            onClick={() => {
              handleBotSettingChange(settings);
              toggleUpdateModal();
            }}
          >
            Update
          </button>
          <button
            className="px-3 py-1 text-base text-slate-950 bg-red-700 rounded-xl"
            onClick={() => {
              toggleUpdateModal();
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default UpdateModal;
