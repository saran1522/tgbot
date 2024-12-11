import { IoCopyOutline } from "react-icons/io5";
import { toast } from "sonner";
function Api({ title, apiKey }) {
  const copyMessage = title + " Copied";
  return (
    <div className="flex flex-col gap-2 ">
      <p className="ml-1">{title}</p>
      <div className="border-2 h-fit flex items-center gap-4 border-slate-800 rounded-xl">
        <p className="h-full w-full p-3 bg-transparent">{apiKey}</p>
        <IoCopyOutline
          size={16}
          onClick={() => {
            navigator.clipboard.writeText(apiKey);
            toast(copyMessage);
          }}
          className="cursor-pointer mr-2"
        />
      </div>
    </div>
  );
}

export default Api;
