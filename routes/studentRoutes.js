const express = require('express');
const { verifyToken, verifyAdmin } = require('../middlewares/verifyMiddleware');
const {deleteStudent, getStudentByEmail, updateStudentByEmail, getAllStudents, getStudentCount, addStudent} = require('../controllers/studentController')
const router = express.Router();

router.get('/studentCount', verifyToken, verifyAdmin,getStudentCount);
router.get('/students', verifyToken, verifyAdmin,getAllStudents);
router.get('/students/:email', verifyToken, getStudentByEmail);
router.put('/students/:email', verifyToken, updateStudentByEmail);
router.post('/students',addStudent);
router.delete('/students/:id', verifyToken, verifyAdmin, deleteStudent
);

module.exports = router;
