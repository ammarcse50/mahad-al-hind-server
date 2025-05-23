const express = require('express');
const router = express.Router();
const { verifyToken, verifyAdmin } = require('../middlewares/verifyMiddleware');
const {
  getAllCertificates,
  getCertificateCount,
  getCertificateByEmail,
  addCertificate,
  checkCertificate,
} = require('../controllers/certificateController');
router.get('/certificateCount', verifyToken, verifyAdmin, getCertificateCount);
router.get('/certificate/:email', verifyToken,getCertificateByEmail);
router.get('/certificate', verifyToken, verifyAdmin, getAllCertificates);
router.post('/certificate', verifyToken, verifyAdmin, addCertificate);
router.post('/checkCertificate', verifyToken, verifyAdmin, checkCertificate);

module.exports = router;
