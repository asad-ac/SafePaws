import {pool} from "../config/database.js"

const getSanctuary = async (req, res) => {
    try {
        // req.user and not req.body bc user comes from passport and body comes from post patch
        const user_id = req.user.user_id
        const results = await pool.query('SELECT * FROM sanctuary WHERE user_id = $1', [user_id])
        res.status(200).json(results.rows[0])
    }
    catch (error) {
        res.status(409).json({error: error.message})
    }
};

const updateSanctuary = async (req, res) => {
    try {
        const user_id = req.user.user_id
        const {name, address, phone, email, capacity} = req.body;

        const results = await pool.query(`UPDATE sanctuary SET name = $1, address = $2, phone = $3, email = $4, capacity = $5 WHERE user_id = $6 RETURNING *`,
            [name, address, phone, email, capacity, user_id]);
        
        if (results.rows.length === 0) {
            res.status(404),json({error: "Sanctuary not found"})
        }
        
        res.status(200).json(results.rows[0]);
    } 
    catch (error) {
        res.status(409).json({error: error.message});
    }
};

export default {
    getSanctuary,
    updateSanctuary
}