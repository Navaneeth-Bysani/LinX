const express = require('express');
const router = express.Router();
const linkController = require('./../controllers/linkController');


router.post('/',linkController.createLink);
router.patch('/:id', linkController.updateLink);
router.patch('/clicked/:id', linkController.linkClicked);
router.delete('/:id', linkController.deleteLink);
router.get('/:id', linkController.getLink);


module.exports = router;