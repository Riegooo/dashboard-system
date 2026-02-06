const prompt = require('prompt-sync')();
const { lines, space } = require('./utils');

// ----------------- ADMIN -----------------
function adminRole(user, users) {
    let running = true;
    while(running) {
        console.log(`\nAdmin Dashboard (${user.username})`);
        console.log("1. Manage Users");
        console.log("2. Change User Role");
        console.log("3. Toggle User Status");
        console.log("4. My Profile");
        console.log("5. Logout");
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
    console.log("\nUSERS LIST");
    users.forEach((u, i) => console.log(`${i+1}. ${u.username} | ${u.role} | ${u.isActive}`));
}

function toggleUserStatus(users) {
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
    console.log(`Username: ${user.username}\nRole: ${user.role}\nActive: ${user.isActive}`);
}

// ----------------- MOD -----------------
function modRole(user, users) {
    let running = true;
    while(running){
        console.log(`\nModerator Dashboard (${user.username})`);
        console.log("1. View Users");
        console.log("2. Toggle User Status");
        console.log("3. My Profile");
        console.log("4. Logout");

        let choice = parseInt(prompt("Choose: "));
        if (choice === 1) users.forEach((u,i)=> console.log(`${i+1}. ${u.username} | ${u.role} | ${u.isActive}`));
        else if (choice === 2) modToggleStatus(users);
        else if (choice === 3) console.log(`Username: ${user.username}\nRole: ${user.role}\nActive: ${user.isActive}`);
        else if (choice === 4) running = false;
        else console.log("Invalid option.");
    }
}

function modToggleStatus(users) {
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

// ----------------- GUEST -----------------
function guestRole(user, users) {
    let running = true;
    while(running){
        console.log(`\nGuest Dashboard (${user.username})`);
        console.log("1. View Profile");
        console.log("2. Change Password");
        console.log("3. Logout");

        let choice = parseInt(prompt("Choose: "));
        if (choice === 1) console.log(`Username: ${user.username}\nRole: ${user.role}\nActive: ${user.isActive}`);
        else if (choice === 2) changePassword(user);
        else if (choice === 3) running = false;
        else console.log("Invalid option.");
    }
}

function changePassword(user){
    let oldPass = prompt("Enter old password: ").trim();
    if (oldPass !== user.password) return console.log("Incorrect old password.");
    let newPass = prompt("Enter new password: ").trim();
    let confirm = prompt("Confirm new password: ").trim();
    if (newPass !== confirm) return console.log("Passwords do not match.");
    user.password = newPass;
    console.log("Password updated!");
}

module.exports = { adminRole, modRole, guestRole };
