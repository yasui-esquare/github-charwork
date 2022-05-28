const core = require('@actions/core');
const github = require('@actions/github');
const fetch = require('node-fetch');

/**
 */
class Chatwork {
    constructor(room, token, alias) {
        this.room = room;
        this.token = token;
        this.alias = alias;
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

    create_message(mensions, text, title, body) {
        var message = mensions.map(mension => this.alias[mension] || mension).join(' ');
        message &&= message + "\n";
        if(text) {
            message += text + "\n";
        }
        message += `[info][title]${title || ' '}[/title]${body || ' '}[/info]`;
        return message;
    }
}

/**
 */
async function run() {
    try {
        const chatwork = new Chatwork(core.getInput('room'), 
                                      core.getInput('token'), 
                                      JSON.parse(core.getInput('alias')));
        const message = chatwork.create_message(JSON.parse(core.getInput('mensions')), 
                                                core.getInput('text'), 
                                                core.getInput('title'), 
                                                core.getInput('body'));
        await chatwork.send(message);
    }
    catch(error) {
        core.setFailed(error.message);
    }
}

run();
