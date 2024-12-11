# Telegram Bot

A Telegram bot built with Node.js and the Telegraf library.

## Installation

1. Clone the repository: `git clone https://github.com/sastaa/telegram-bot.git`
2. Install the dependencies: `npm install`
3. Create a `.env` file with the following variables:
   - `BOT_TOKEN`: Your bot's token from the Telegram BotFather
   - `API_KEY`: The api key of open weather map api
4. Run the bot: `npm start`

## Commands

The bot currently supports the following commands:

- `/start`: Start the bot
- `/help`: Show a list of available commands
- `/weather <city_name>`: To know the weather details of the city

## Development

The bot uses the Telegraf library, which provides a simple and intuitive API for building Telegram bots. The bot uses a JSON file to store its data.
