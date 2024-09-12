const express = require('express');
const router = express.Router();
const cors = require('cors')
const { test, loginUser, getProfile, logoutUser, addWord, getWords, deleteWordDoc, updateWordDoc, getUsers, getTotalCounts, getWordsSortedByUsage, createMobUser, deleteMobUser, updateMobUser } = require('../controllers/authController')
const checkAdminOrSuperAdmin = require('../middleware/checkAdminSu'); 
router.use(
    cors({
        credentials: true,
        origin: 'http://localhost:5173'
    })
)

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
module.exports = router