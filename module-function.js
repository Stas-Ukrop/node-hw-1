const fs = require('fs').promises;
const path = require('path');
const shortid = require('shortid');

console.log('start node module');

var filePath1 = path.join(__dirname, './db/contacts.json');
const listContacts = async ()  => {
    try{
        const data = await fs.readFile(filePath1, 'utf8')
        const date=JSON.parse(data)
        return date;
    } catch(err){
        console.log(err)
    }
}

const getContactById = async (contactId) => {
    try {        
        const contact = await listContacts(filePath1);
        const myContactId = await contact.find((elem) => {
            return elem.id.toString() === contactId.toString()
        })
        return myContactId;
    } catch (err) {
        console.log(err)
    }
}

const removeContactById = async (contactId) => {
    try {        
        const contact = await listContacts(filePath1);
        const myArray = await contact.filter((elem) => {
            return elem.id.toString() !== contactId.toString();
        })
        return myArray;      
    } catch (err) {
        console.log(err)
    }
}
const addContact = async ( name, email, phone ) => {
    try {
        let contacts= await listContacts(filePath1);
        let id = await shortid();
        let nameContact = await name.toString();
        let emailContact = await email.toString();
        let phoneContact = await phone.toString();
        contacts = [...contacts, { id:id, name:nameContact, email:emailContact, phone:phoneContact }];
        return contacts;
        return await fs.writeFile(filePath1, JSON.stringify(contacts));
    } catch (err) {
        console.log(err);
    }
}
module.exports = {
    addContact,
    removeContactById,
    getContactById,
    listContacts
}