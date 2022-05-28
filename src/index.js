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
        const url = `https://api.chatwork.com/v2/rooms/${this.room}/messages` + 
              `?body=${message}`;
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

    static create_message(message, mensions, title, body) {
        message ??= "";
        message += `[info][title]${title || ' '}[/title]${body || ' '}[/info]`;
        return message;
    }
}

/**
 */
async function run() {
    try {
        const chatwork = new Chatwork(core.getInput('room'), core.getInput('token'));
        const message = Chatwork.create_message(core.getInput('message'), 
                                                JSON.parse(core.getInput('mensions')), 
                                                core.getInput('title'), 
                                                core.getInput('body'));
        await chatwork.send(message);
    }
    catch(error) {
        core.setFailed(error.message);
    }
}

run();
