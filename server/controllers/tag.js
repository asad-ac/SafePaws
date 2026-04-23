import {pool} from "../config/database.js"

// to render checkboxes

const getTags = async (req, res) => {
    try {
        const results = await pool.query('SELECT * FROM tag ORDER BY tag_id ASC');
        res.status(200).json(results.rows);
    } 
    catch (error) {
        res.status(409).json({error: error.message});
    }
};

export default {
    getTags
}