const prompt = require('prompt-sync')();
const { registrationSystem, loginSystem } = require('./auth');
const { adminRole, modRole, guestRole } = require('./roles');
const { lines, space } = require('./utils');

let users = [
    // username: createUsername,
    // passsword: createPassword,
    // role: assignedRole,
    //  isActive: true
];

function dashboardSystem(user){
    if (user.role === "admin") adminRole(user, users);
    else if (user.role === "mod") modRole(user, users);
    else guestRole(user, users);
}

function mainSystem(){
    let running = true;
    while(running){
        space(); lines(30,"="); console.log("=-- { DASHBOARD SYSTEM } --="); lines(30,"=");

        let options = ["Login","Registration","Exit"];
        options.forEach((o,i)=>console.log(`${i+1}. ${o}`));
        lines(30,"=");

        let choice = parseInt(prompt("Enter option: "));
        if (choice === 1){
            let user = loginSystem(users);
            if (user) dashboardSystem(user);
        } else if (choice === 2){
            registrationSystem(users);
        } else if (choice === 3){
            console.log("Exiting...");
            running = false;
        } else console.log("Invalid option.");
    }
}

module.exports = { mainSystem };
