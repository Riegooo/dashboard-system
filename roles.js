const prompt = require('prompt-sync')();
const { lines, space } = require('./utils');

// ----------------- ADMIN -----------------
function adminRole(user, users) {
    let running = true;
    while(running) {
        space();
        lines(30, "=")
        console.log(`Admin Dashboard (${user.username})`);
        lines(30, "=")
        let options = ["View Users", "Change User Role", "Toggle User Status", "My Profile", "Logout"]
        options.forEach((i, index) => {
            console.log(`${1 + index}. ${i}`);
        })
        lines(30, "=")
        let choice = parseInt(prompt("Choose: "));

        if (choice === 1) manageUsers(users);
        else if (choice === 2) changeUserRole(users);
        else if (choice === 3) toggleUserStatus(users);
        else if (choice === 4) adminProfile(user);
        else if (choice === 5) running = false;
        else console.log("Invalid option.");
    }
}

function manageUsers(users) {
    space()
    lines(30, "=")
    console.log("USERS LIST username/role/status");
    lines(30, "=")
    users.forEach((u, i) => console.log(`${i+1}. ${u.username} | ${u.role} | ${u.isActive}`));
    lines(30, "=")
}

function toggleUserStatus(users) {
    space()
    lines(30, "=")
    console.log("USER STATUS");
    lines(30, "=")
    users.forEach(i => {console.log(`${i.username} | Status : ${i.isActive}`);})
    lines(30, "=")
    let username = prompt("Enter username to change status: ").trim().toLowerCase();
    let user = users.find(u => u.username === username);
    if (!user) console.log("User not found.");
    else {
        let newStatus = prompt("Enter new status (true/false): ").trim().toLowerCase();
        if (!["true", "false"].includes(newStatus)) console.log("Invalid status.");
        else user.isActive = newStatus;
    }
}

function changeUserRole(users) {
    space()
    lines(30, "=")
    console.log("USER ROLES");
    lines(30, "=")
    users.forEach(i => {console.log(`${i.username} | Role : ${i.role}`);})
    lines(30, "=")
    let username = prompt("Enter username to change role: ").trim().toLowerCase();
    let user = users.find(u => u.username === username);
    if (!user) console.log("User not found.");
    else {
        let newRole = prompt("Enter new role (admin/mod/guest): ").trim().toLowerCase();
        if (!["admin","mod","guest"].includes(newRole)) console.log("Invalid role.");
        else user.role = newRole;
    }
}

function adminProfile(user) {
    space();
    lines(30, "-");
    console.log("YOUR PROFILE");
    lines(30, "-");
    console.log(`Username: ${user.username}\nRole: ${user.role}\nActive: ${user.isActive}`);
    lines(30, "-");
    space();
}

// ----------------- MOD -----------------
function modRole(user, users) {
    let running = true;
    while(running){
        space();
        lines(30, "=")
        console.log(`moderator Dashboard (${user.username})`);
        lines(30, "=")
        let options = ["View Users", "Toggle User Status", "My Profile", "Logout"]
        options.forEach((i, index) => {
            console.log(`${1 + index}. ${i}`);
        })
        lines(30, "=")

        let choice = parseInt(prompt("Choose: "));
        if (choice === 1) viewUsers(users)
        else if (choice === 2) modToggleStatus(users);
        else if (choice === 3) modProfile(user);
        else if (choice === 4) running = false;
        else console.log("Invalid option.");
    }
}

function modToggleStatus(users) {
    space()
    lines(30, "=")
    console.log("USER STATUS");
    lines(30, "=")
    users.forEach(i => {console.log(`${i.username} | Status : ${i.isActive}`);})
    lines(30, "=")
    let username = prompt("Enter username to change status: ").trim().toLowerCase();
    let user = users.find(u => u.username === username);
    if (!user) console.log("User not found.");
    else if (user.role === "admin") console.log("Cannot modify admin status.");
    else {
        let newStatus = prompt("Enter new status (true/false): ").trim().toLowerCase();
        if (!["true","false"].includes(newStatus)) console.log("Invalid status.");
        else user.isActive = newStatus;
    }
}

function viewUsers(users){
    space();
    lines(30, "=")
    console.log("USERS LIST username/role/status");
    lines(30, "=")
    users.forEach((u, i) => console.log(`${i+1}. ${u.username} | ${u.role} | ${u.isActive}`));
    lines(30, "=")
    space();
}

function modProfile(user) {
    space();
    lines(30, "-");
    console.log("YOUR PROFILE");
    lines(30, "-");
    console.log(`Username: ${user.username}\nRole: ${user.role}\nActive: ${user.isActive}`);
    lines(30, "-");
    space();
}

// ----------------- GUEST -----------------
function guestRole(user, users) {
    let running = true;
    while(running){
        space();
        lines(30, "=")
        console.log(`Guest Dashboard (${user.username})`);
        lines(30, "=")
        let options = ["View Profile", "Change Password", "Logout"]
        options.forEach((i, index) => {
            console.log(`${1 + index}. ${i}`);
        })
        lines(30, "=")

        let choice = parseInt(prompt("Choose: "));
        if (choice === 1) guestProfile(user);
        else if (choice === 2) changePassword(user);
        else if (choice === 3) running = false;
        else console.log("Invalid option.");
    }
}

function changePassword(user){
    space();
    lines(30, "-")
    console.log("Change Password");
    lines(30, "-")
    let oldPass = prompt("Enter old password: ").trim();
    if (oldPass !== user.password) return console.log("Incorrect old password.");
    let newPass = prompt("Enter new password: ").trim();
    let confirm = prompt("Confirm new password: ").trim();
    if (newPass !== confirm) return console.log("Passwords do not match.");
    user.password = newPass;
    console.log("Password updated!");
}

function guestProfile(user) {
    space();
    lines(30, "-");
    console.log("YOUR PROFILE");
    lines(30, "-");
    console.log(`Username: ${user.username}\nRole: ${user.role}\nActive: ${user.isActive}`);
    lines(30, "-");
    space();
}

module.exports = { adminRole, modRole, guestRole };
