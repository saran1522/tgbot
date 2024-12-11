import { TiWeatherPartlySunny } from "react-icons/ti";
import { IoCopyOutline, IoOpenOutline } from "react-icons/io5";
import { toast } from "sonner";
import { useUser } from "../Context/UserContext";

function BotInfo() {
  const { botSettings } = useUser();
  return (
    <div className="lg:w-2/5">
      <div className="flex lg:flex-col gap-2 max-md:gap-5 items-center max-md:items-end w-fit">
        <TiWeatherPartlySunny className="max-md:h-28 h-52 max-md:w-28 w-52" />
        <div className="max-md:mb-3">
          <a
            href={`https://t.me/${botSettings.botUsername}`}
            target="_blank"
            className="text-xl flex justify-center items-center gap-2 max-md:mb-3"
          >
            {botSettings.botName}
            <IoOpenOutline />
          </a>
          <div className="flex gap-2 items-center">
            <p>{`@${botSettings.botUsername}`}</p>
            <IoCopyOutline
              onClick={() => {
                navigator.clipboard.writeText(`@${botSettings.botUsername}`);
                toast("Bot Username Copied");
              }}
              className="cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default BotInfo;
