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

function pull_request_to_message() {
}

async function run() {
    try {
        const pull_request = github.payload.pull_request
        console.log(`pull_request = ${JSON.stringify(pull_request)}`);
        //const chatwork = new Chatwork(core.getInput('room'), core.getInput('token'));
        //await chatwork.send("Hello, world!");
    }
    catch(error) {
        core.setFailed(error.message);
    }
}

run();
