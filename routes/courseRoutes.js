const express = require('express');
const { deleteCourse, getAllCourses, getCourseCount, addCourse } = require('../controllers/courseController');
const router = express.Router();
const { verifyToken, verifyAdmin } = require('../middlewares/verifyMiddleware');
router.get('/courseCount', verifyToken, verifyAdmin, getCourseCount);
router.get('/courses',getAllCourses);
router.post('/addCourse', addCourse);
router.delete('/courses/:id', verifyToken, verifyAdmin,deleteCourse);

module.exports = router;
