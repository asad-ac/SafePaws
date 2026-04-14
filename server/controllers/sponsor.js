import { pool } from "../config/database.js"

const getSponsor = async (req, res) => {
    try {
        const results = await pool.query('SELECT * FROM sponsor ORDER BY sponsor_id DESC')
        res.status(200).json(results.rows)
    }
    catch (error) {
        res.status(409).json({error: error.message})
    }
};

const createSponsor = async (req, res) => {
    try {
        const {name, address, phone, email} = req.body
        const results = await pool.query(`INSERT INTO sponsor (name, address, phone, email) VALUES ($1, $2, $3, $4) RETURNING *`,
            [name, address, phone, email]);
        res.status(201).json(results.rows[0]);
    } 
    catch (error) {
        res.status(409).json({error: error.message});
    }
};

// TODO: try coalesce keyword for all update functions to make it patch testing?
// TODO: research if reset.js attributes for all fields should be not null since all the update functions 
      // are technically all best for puts

const updateSponsor = async (req, res) => {
    try {
        const sponsor_id = parseInt(req.params.sponsor_id);
        const {name, address, phone, email} = req.body;

        const results = await pool.query(`UPDATE sponsor SET name = $1, address = $2, phone = $3, email = $4, WHERE sponsor_id = $5 RETURNING *`,
            [name, address, phone, email, sponsor_id]);
        res.status(200).json(results.rows[0]);
    } 
    catch (error) {
        res.status(409).json({error: error.message});
    }
};

const deleteSponsor = async (req, res) => {
    try {
        const sponsor_id = parseInt(req.params.sponsor_id);
        const results = await pool.query(`DELETE FROM sponsor WHERE sponsor_id = $1 RETURNING *`, [sponsor_id]);

        res.status(200).json(results.rows[0]);
    } 
    catch (error) {
        res.status(409).json({error: error.message});
    }
};

export default {
    getSponsor,
    createSponsor,
    updateSponsor,
    deleteSponsor
}