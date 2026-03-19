const mongodb = require('../database/contacts');
console.log(mongodb);
const ObjectId = require('mongodb').ObjectId;

const getAllContacts = async (req, res) => {
    /* #swagger.description = 'Find all contacts' */
    const result = await mongodb.getDatabase().db().collection('contacts').find();
    result.toArray().then((contacts, err) => {
        if (err) {
            res.status(400).json({ message: err });
        }
        res.setHeader('Contact-Type', 'application/json');
        res.status(200).json(contacts);
    });
};

const getContactById = async (req, res) => {
    /* #swagger.description = 'Find contact by id' */
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid contact id to find contact.');
    }
    const contactId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('contacts').find({ _id: contactId });
    result.toArray().then((contacts, err) => {
        if (err) {
            res.status(400).json({ message: err });
        }
        res.setHeader('Contact-Type', 'application/json');
        res.status(200).json(contacts[0]);
    });
};

const createContact = async (req, res) => {
    /* #swagger.description = 'Add new contact' */
    /* #swagger.parameters['body'] = {
        in: 'body',
        schema: {
            $firstName: 'Jhon',
            $lastName: 'Doe',
            $email: 'jhondoe@email.com',
            favoriteColor: 'red',
            birthday: '01-31-2000'
        }
    } */
    const { firstName, lastName, email, favoriteColor, birthday } = req.body;
    const result = await mongodb.getDatabase().db().collection('contacts').insertOne({
        firstName: firstName,
        lastName: lastName,
        email: email,
        favoriteColor: favoriteColor,
        birthday: birthday
    });
    // res.setHeader('Content-Type', 'application/json');
    result.acknowledged
        ? res.status(201).json(result.insertedId)
        : res.status(500).json(result.error || 'An error occurred while creating contact.');
};

const updateContact = async (req, res) => {
    /* #swagger.description = 'Update contact by id' */
    /* #swagger.parameters['body'] = {
        in: 'body',
        schema: {
            firstName: 'Jhon',
            lastName: 'Doe',
            email: 'jhondoe@email.com',
            favoriteColor: 'red',
            birthday: '01-31-2000'
        }
    } */
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid contact id to update contact.');
    }
    const contactId = new ObjectId(req.params.id);
    const update = {
        ...(req.body.firstName && { firstName: req.body.firstName }),
        ...(req.body.lastName && { lastName: req.body.lastName }),
        ...(req.body.email && { email: req.body.email }),
        ...(req.body.favoriteColor && { favoriteColor: req.body.favoriteColor }),
        ...(req.body.birthday && { birthday: req.body.birthday })
    };
    const result = await mongodb
        .getDatabase()
        .db()
        .collection('contacts')
        .updateOne({ _id: contactId }, { $set: update });
    if (!result.modifiedCount) {
        res.setHeader('Content-Type', 'application/json');
        res.status(500).json('Update not successful');
    } else {
        res.setHeader('Content-Type', 'application/json');
        res.status(204).json('Update successful');
    }
};

const deleteContact = async (req, res) => {
    /* #swagger.description = 'Delete contact by id' */
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid contact id to delete contact.');
    }
    const contactId = new ObjectId(req.params.id);
    const result = await mongodb
        .getDatabase()
        .db()
        .collection('contacts')
        .deleteOne({ _id: contactId });
    res.setHeader('Content-Type', 'application/json');
    result.deletedCount !== 0
        ? res.status(204).json('Contact deleted successfully.')
        : res.status(500).json('No matching contact found.');
};

module.exports = {
    getAllContacts,
    getContactById,
    createContact,
    updateContact,
    deleteContact
};
