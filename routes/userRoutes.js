const express = require('express');
const { verifyToken, verifyAdmin } = require('../middlewares/verifyMiddleware');
const { createUser, getAllUsers, deleteUser, promoteToAdmin, countUsers, checkAdminStatus, getUserByEmail } = require('../controllers/userController');
const router = express.Router();

router.get('/users/admin/:email', verifyToken, checkAdminStatus);
router.get('/userCount', verifyToken, verifyAdmin, countUsers);
router.get('/users', getUserByEmail);
router.get('/allUsers', verifyToken, verifyAdmin, getAllUsers);
router.post('/users', createUser);
router.patch('/users/admin/:id', verifyToken, verifyAdmin,promoteToAdmin);
router.delete('/users/:id', verifyToken, verifyAdmin, deleteUser);

module.exports = router;
