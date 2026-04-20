import { pool } from "../config/database.js"

const getSanctuary = async (req, res) => {
    try {
        const sanctuary_id = parseInt(req.params.sanctuary_id)
        const results = await pool.query('SELECT * FROM sanctuary WHERE sanctuary_id = $1', [sanctuary_id])
        res.status(200).json(results.rows[0])
    }
    catch (error) {
        res.status(409).json({error: error.message})
    }
};

const updateSanctuary = async (req, res) => {
    try {
        const sanctuary_id = parseInt(req.params.sanctuary_id);
        const {name, address, phone, email, capacity} = req.body;

        const results = await pool.query(`UPDATE sanctuary SET name = $1, address = $2, phone = $3, email = $4, capacity = $5 WHERE sanctuary_id = $6 RETURNING *`,
            [name, address, phone, email, capacity, sanctuary_id]);
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