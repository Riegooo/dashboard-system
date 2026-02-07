const prompt = require('prompt-sync')();
const { mainSystem } = require('./main');
const { lines, space } = require('./utils')

function roleApproval(requestedRole, approvalCode, defaultRole = "guest") {
    if (requestedRole === defaultRole) return defaultRole;

    let attempts = 0;
    const maxAttempts = 3;
    let approved = false;

    while (attempts < maxAttempts && !approved) {
        console.log();
        let enterCode = prompt(`Enter approval code for <${requestedRole}> : `).trim();
        if (enterCode === "") {
            console.log("You must enter a code for role approval.");
        } else if (enterCode === approvalCode) {
            approved = true;
            return requestedRole;
        } else {
            attempts++;
            console.log(`Incorrect code, attempts left: ${maxAttempts - attempts}`);
        }
    }

    console.log("Role approval failed. You will be assigned as Guest.");
    return defaultRole;
}

function registrationSystem(users, defaultRole = "guest", approvalCode = "Secret") {
    const prompt = require('prompt-sync')();
    let usernameIsRunning = true;

    while(usernameIsRunning){
        console.log();
        lines(30, "=")
        console.log("REGISTRATION ACCOUNT");
        lines(30, "=")

        let createUsername = prompt("Create username: ").trim().toLowerCase();

        if (createUsername === "") console.log("You must create a username.");
        else if (users.some(u => u.username === createUsername)) console.log("Username already exists.");
        else if (/^[0-9]+$/.test(createUsername)) console.log("Username must contain letters.");
        else {
            usernameIsRunning = false;

            let passwordIsRunning = true;
            while(passwordIsRunning) {
                let createPassword = prompt("Create password (6-30 chars): ").trim();

                if (createPassword.length < 6) console.log("Password too short.");
                else if (createPassword.length > 30) console.log("Password too long.");
                else {
                    passwordIsRunning = false;
                    let confirmPassword = prompt("Confirm Password: ").trim();
                    if (confirmPassword !== createPassword) console.log("Passwords do not match.");
                    else {
                        let enterRole = prompt("Enter role (admin/mod/guest): ").trim().toLowerCase();
                        let assignedRole = roleApproval(enterRole, approvalCode);
                        users.push({
                            username: createUsername,
                            password: createPassword,
                            role: assignedRole,
                            isActive: true
                        });
                        console.log();
                        lines(30, "-")
                        console.log("Account created! You may now login.");
                        lines(30, "-")
                        return;
                    }
                }
            }
        }
    }
}

function loginSystem(users) {
    const prompt = require('prompt-sync')();
    let isRunning = true;

    while(isRunning){
        console.log();
        lines(30, "=")
        console.log("LOGIN ACCOUNT");
        lines(30, "=")

        let logUsername = prompt("Enter your username: ").trim().toLowerCase();
        let findUser = users.find(u => u.username === logUsername);

        if (!findUser) {
            console.log("Invalid username. Please register first.");
            return null;
        }

        let logpassIsRunning = true;
        while(logpassIsRunning) {
            let logPassword = prompt("Enter your password: ").trim();
            if (logPassword === findUser.password) {
                console.log("\nSUCCESSFUL LOGIN!\n");
                return findUser;
            } else console.log("Incorrect password, try again.");
        }
    }
}

module.exports = { registrationSystem, loginSystem, roleApproval };
