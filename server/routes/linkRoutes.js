const express = require('express');
const router = express.Router();
const linkController = require('../controllers/linkController');
const authController = require('../controllers/authController');

router.patch('/clicked/:id', linkController.linkClicked);

router.use(authController.protect);
router.post('/',linkController.createLink);
router.patch('/:id', linkController.updateLink);
router.delete('/:id', linkController.deleteLink);
router.get('/:id',linkController.getLink);


module.exports = router;