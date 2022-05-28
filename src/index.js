const core = require('@actions/core');
const github = require('@actions/github');
const fetch = require('node-fetch');

/**
 */
class Chatwork {
    constructor(room, token) {
        this.room = room;
        this.token = token;
    }

    async send(message) {
        const url = `https://api.chatwork.com/v2/rooms/${this.room}/messages?body=${message}`;
        const options = {
            method: 'POST', 
            headers: {
                Accept: 'application/json', 
                'X-ChatWorkToken': this.token
            }
        };
        const response = await fetch(encodeURI(url), options);
        console.log(await response.json());
    }
}

function to_message(title, body) {
    return `[info][title]${title}[/title]${body ?? ''}[/info]`;
}

async function run() {
    try {
        const chatwork = new Chatwork(core.getInput('room'), core.getInput('token'));
        var message = core.getInput('message');
        message += `[info][title]${core.getInput('title')}[/title]${core.getInput('body')}[/info]`;
        await chatwork.send(message);
    }
    catch(error) {
        core.setFailed(error.message);
    }
}

run();
