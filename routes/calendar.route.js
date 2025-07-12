const express = require('express');

const router = express.Router();

const Calendar = require('../models/calendar.model');

router.get('/', async (req, res) => {
    const {course, session} = req.query;
    if(!course || !session) {
        return res.status(400).json({ error: 'Course and session are required' });
    }

    try {
        const record = await Calendar.findOne({course});
        if (!record) {
            return res.status(404).json({ error: 'No academic calendar found for this course' });
        }

        const url = record.sessions.get(session);
        if(!url) {
            return res.status(404).json({ error: 'No calendar found for this session' });
        }

        res.status(200).json([{link: url}]);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;