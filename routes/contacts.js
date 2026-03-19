const router = require('express').Router();
const contactsController = require('../controllers/contacts');

const validation = require('../middleware/validate');

router.get('/', contactsController.getAllContacts);
router.get('/:id', contactsController.getContactById);
router.post('/', validation.saveContact, contactsController.createContact);
router.put('/:id', validation.saveContact, contactsController.updateContact);
router.delete('/:id', contactsController.deleteContact);

module.exports = router;
