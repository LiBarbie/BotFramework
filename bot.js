// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

const { ActivityHandler } = require('botbuilder');
let moment = 0; // 0 : Started; 1: Wrote the first number; 2 : Wrote the second number
let n1, n2; //The 2 numbers of the operation
let result; //the result of the operation

class MyBot extends ActivityHandler {
    constructor() {
        super();
        // See https://aka.ms/about-bot-activity-message to learn more about the message and other activity types.
        this.onMessage(async (context, next) => {
            const message = context.activity.text;
            let number = Number(message);
            if(number == "NaN"){
                await context.sendActivity("You didn't write a number >:(\nWrite a number as I said");
            }//if
            else{
                switch(moment){
                    case 0: n1 = number; moment++; context.sendActivity("Write the second number"); break;
                    case 1: n2=number; moment++; result = n1+n2; context.sendActivity("The sum is "+result); break;
                    default : await context.sendActivity("Error");
                }//switch
            }//else
            // By calling next() you ensure that the next BotHandler is run.
            await next();
        });

        this.onMembersAdded(async (context, next) => {
            const membersAdded = context.activity.membersAdded;
            for (let cnt = 0; cnt < membersAdded.length; ++cnt) {
                if (membersAdded[cnt].id !== context.activity.recipient.id) {
                    await context.sendActivity("Hi, I\'m a bot, but also a Calculator! Try me!");
                    await context.sendActivity("Now, I'll ask you two numbers and then I will add them!");
                    await context.sendActivity("Write the first number");
                }
            }
            // By calling next() you ensure that the next BotHandler is run.
            await next();
        });
    }
}

module.exports.MyBot = MyBot;
