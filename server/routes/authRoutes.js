const express = require('express');
const router = express.Router();
const { test, loginUser, getProfile, logoutUser, addWord, getWords, deleteWordDoc, updateWordDoc, getUsers, getTotalCounts, getWordsSortedByUsage, createMobUser, deleteMobUser, updateMobUser, adminLogs, getFeedbackForAdmin, addupdate, getUpdates,
deleteUpdate, forgotpassword, resetpassword, deleteFeedback } = require('../controllers/authController')
const checkAdminOrSuperAdmin = require('../middleware/checkAdminSu'); 

router.get('/', test)
router.post('/login', loginUser)
router.get('/profile', getProfile)
router.post('/logout', checkAdminOrSuperAdmin, logoutUser)
router.post('/addNewWord', checkAdminOrSuperAdmin, addWord)
router.get('/signWords', checkAdminOrSuperAdmin, getWords)
router.get('/getUsers', checkAdminOrSuperAdmin, getUsers)
router.delete('/deleteWord/:id', checkAdminOrSuperAdmin, deleteWordDoc);
router.put('/updateWord/:id', checkAdminOrSuperAdmin, updateWordDoc);
router.get('/getTotalCounts', checkAdminOrSuperAdmin, getTotalCounts)
router.get('/getWordsSortedByUsage', checkAdminOrSuperAdmin, getWordsSortedByUsage)
router.post('/createMobUser', checkAdminOrSuperAdmin, createMobUser)
router.delete('/deleteMobUser/:id', checkAdminOrSuperAdmin, deleteMobUser)
router.put('/updateMobUser/:id', checkAdminOrSuperAdmin, updateMobUser);
router.get('/adminLogs', checkAdminOrSuperAdmin, adminLogs)
router.get('/getFeedbackForAdmin', checkAdminOrSuperAdmin, getFeedbackForAdmin)
router.post('/addupdate', checkAdminOrSuperAdmin, addupdate)
router.get('/getUpdates', checkAdminOrSuperAdmin, getUpdates);
router.delete('/deleteUpdate/:id', checkAdminOrSuperAdmin, deleteUpdate);
router.delete('/deleteFeedback/:id', checkAdminOrSuperAdmin, deleteFeedback);

router.post('/forgotpassword', forgotpassword);
router.post('/resetpassword/:token', resetpassword);
module.exports = router