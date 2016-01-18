'use strict';

const users = require('../users').users
const logger = require('../logger')

module.exports = {
	command: 'whoami',
	handler(bot, args, msg) {
		let response = `*First Name:* ${msg.from.first_name}\n`
		response += `*Last Name:* ${msg.from.last_name || "n/a"}\n`
		response += `*Username* ${msg.from.username || "No username specified."}\n`
		response += `*ID:* ${msg.from.id}\n`

		if (msg.from.id in users) {
			let user = users[msg.from.id]
			response += `*Balance:* ${user.balance}\n`
			response += `_You ${user.banned?'are':'are not'} banned._`
		} else {
			response += 'You are not registered. Try `/register` to get started.'
		}

		logger.transaction(msg.from.id, 'ran whoami')

		bot.sendMessage(msg.chat.id, response, {parse_mode: "Markdown"})
	}
}