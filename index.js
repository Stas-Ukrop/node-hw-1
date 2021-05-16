const myFunc = require('./module-function');
const path = require('path');
const fs = require('fs').promises;
const { Command } = require("commander");
const filePath1 = path.join(__dirname, './db/contacts.json');

const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");
program.parse(process.argv);

const argv = program.opts();
function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
        myFunc.listContacts().then(data => console.table(data));
      break;

    case 'get':
          myFunc.getContactById(id).then(data => console.log(data));
      break;

    case 'add':
        myFunc.addContact(name,email,phone).then(data=>fs.writeFile(filePath1, JSON.stringify(data)))
      break;

    case 'remove':
        myFunc.removeContactById(id).then(data => fs.writeFile(filePath1, JSON.stringify(data)));
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);