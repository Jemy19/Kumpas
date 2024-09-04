const express = require('express');
const router = express.Router();
const cors = require('cors')
const { test, loginUser, getProfile, logoutUser, addWord, getWords, deleteWordDoc, updateWordDoc, getUsers } = require('../controllers/authController')
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


module.exports = router