const express = require('express');
const router = express.Router();
const cors = require('cors')
const { test, loginUser, getProfile, logoutUser, addWord, getWords, deleteWordDoc, updateWordDoc, getUsers } = require('../controllers/authController')

router.use(
    cors({
        credentials: true,
        origin: 'http://localhost:5173'
    })
)

router.get('/', test)
router.post('/login', loginUser)
router.get('/profile', getProfile)
router.post('/logout', logoutUser)
router.post('/addNewWord', addWord)
router.get('/signWords', getWords)
router.get('/getUsers', getUsers)
router.delete('/deleteWord/:id', deleteWordDoc);
router.put('/updateWord/:id', updateWordDoc);


module.exports = router