const axios = require("axios");
require("dotenv").config();
const { Telegraf } = require("telegraf");
const { getUsers, getBlockedUsers, addUser } = require("./endpoints");
const bot = new Telegraf(process.env.BOT_TOKEN);
const API_KEY = process.env.API_KEY;
const express = require("express");
const app = express();

app.listen(3000, () => {
  console.log("Server started on port 3000");
});

app.get("/", (req, res) => {
  res.send(
    "<h1>Hello, go to <a href = 'https://t.me/boss_weather_bot'>https://t.me/boss_weather_bot</a> to use the bot</h1>"
  );
});

let allUsers;
let blockedUsers;

async function fetchUsers() {
  allUsers = await getUsers();
  blockedUsers = await getBlockedUsers();
}

fetchUsers();

const getFormattedDate = (dt) => {
  const date = new Date(dt * 1000);
  const pad = (num) => String(num).padStart(2, "0");
  const day = pad(date.getDate());
  const month = pad(date.getMonth() + 1);
  const year = String(date.getFullYear()).slice(-2);
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());

  return `${day}/${month}/${year}, ${hours}:${minutes}`;
};

async function checkBlockedUser(id) {
  const isBlocked = Boolean(
    blockedUsers.find((user) => Number(user.id) === id)
  );
  return isBlocked;
}

bot.command("start", async (ctx) => {
  const isBlocked = await checkBlockedUser(ctx.from.id);
  if (isBlocked) {
    bot.telegram.sendMessage(
      ctx.chat.id,
      "You are blocked from using this bot",
      {}
    );
    return;
  } else {
    allUsers.push(ctx.from);
    const updatedUsers = {
      users: allUsers,
      blocked: blockedUsers,
    };
    await addUser(updatedUsers);
    bot.telegram.sendMessage(
      ctx.chat.id,
      "Hello there! Welcome to the Weather updates telegram bot! \nYou can use following commands: \n \n /weather <city> : to know the current weather of the city with single word \n \n /weather <city_name> : to know the current weather of the city with multiple words \n \n /help : to know more about the bot",
      {}
    );
  }
});

bot.command("weather", async (ctx) => {
  const isBlocked = await checkBlockedUser(ctx.from.id);
  if (isBlocked) {
    bot.telegram.sendMessage(
      ctx.chat.id,
      "You are blocked from using this bot",
      {}
    );
    return;
  } else {
    let cityName = ctx.message.text.split(" ")[1]; // Get the city name from user input
    if (cityName.includes("_")) cityName = cityName.split("_").join(" ");

    if (!cityName) {
      return ctx.reply(
        "Please provide a city name after the command, e.g., /weather delhi"
      );
    }

    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`
      )
      .then((response) => {
        const weatherData = response.data;
        const temperature = Math.round(weatherData.main.temp - 273);
        const description = weatherData.weather[0].description;
        const city = weatherData.name;
        const country = weatherData.sys.country;
        const formattedDate = getFormattedDate(response.data.dt);
        if (weatherData) {
          const message = `The weather detials are: \n \n Name: ${city} \n \n Date: ${formattedDate} \n \n Country: ${country}\n \n Temperature: ${temperature} °C \n \n Description: ${description}`;
          ctx.reply(message);
        } else {
          ctx.reply(
            `Sorry, I couldn't find the price for "${coinName}". Please check the spelling or try another coin.`
          );
        }
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
        if (error.response.status === 404)
          ctx.reply("City not found. Please check the city name.");
        else
          ctx.reply(
            "There was an error fetching the weather. Please try again later."
          );
      });
  }
});

bot.command("help", async (ctx) => {
  const isBlocked = await checkBlockedUser(ctx.from.id);
  if (isBlocked) {
    bot.telegram.sendMessage(
      ctx.chat.id,
      "You are blocked from using this bot",
      {}
    );
    return;
  } else {
    ctx.reply(
      "Hello there! Welcome to the Weather updates telegram bot! \nYou can use following commands: \n \n /weather <city_name> : to know the current weather of a city",
      {}
    );
  }
});

bot.launch();
