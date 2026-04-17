import { pool } from "../config/database.js"

const getSponsors = async (req, res) => {
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
        const {name, amount, address, phone, email, sanctuary_id} = req.body
        const results = await pool.query(`INSERT INTO sponsor (name, amount, address, phone, email, sanctuary_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
            [name, amount, address, phone, email, sanctuary_id]);
        res.status(201).json(results.rows[0]);
    } 
    catch (error) {
        res.status(409).json({error: error.message});
    }
};

// TODO: try coalesce keyword for all update functions to make it patch testing?

const updateSponsor = async (req, res) => {
    try {
        const sponsor_id = parseInt(req.params.sponsor_id);
        const {name, amount, address, phone, email, sanctuary_id} = req.body;

        const results = await pool.query(`UPDATE sponsor SET name = $1, amount = $2, address = $3, phone = $4, email = $5, sanctuary_id = $6 WHERE sponsor_id = $7 RETURNING *`,
            [name, amount, address, phone, email, sanctuary_id, sponsor_id]);
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

        if (results.rows.length === 0) {
            return res.status(404).json({ error: "Sponsor not found" })
          }

        res.status(200).json(results.rows[0]);
    } 
    catch (error) {
        res.status(409).json({error: error.message});
    }
};

export default {
    getSponsors,
    createSponsor,
    updateSponsor,
    deleteSponsor
}