const express = require('express');
const router = express.Router();

router.get('/', (req,res) => {
    res.send('Server side')
});

module.exports = router;