import React from "react";
import ApiSettings from "./ApiSettings";
import BotInfo from "./BotInfo";

function Hero() {
  return (
    <div className="p-5 max-md:p-1 rounded-xl lg:flex lg:justify-between">
      <BotInfo />
      <ApiSettings />
    </div>
  );
}

export default Hero;
