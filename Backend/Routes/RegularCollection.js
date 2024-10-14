const express = require('express');
const router = express.Router();
const regularCollectionController = require('./RegularCollectionController');

router.get('/regular-collection', regularCollectionController.getAllRegularCollection);
router.post('/regular-collection', regularCollectionController.addRegularCollection);
router.get('/regular-collection/:id', regularCollectionController.getById);
router.put('/regular-collection/:id', regularCollectionController.updateRegularCollection);
router.delete('/regular-collection/:id', regularCollectionController.deleteRegularCollection);

module.exports = router;