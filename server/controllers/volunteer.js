import { pool } from "../config/database.js"

const getVolunteer = async (req, res) => {
    try {
        const results = await pool.query('SELECT * FROM volunteer ORDER BY volunteer_id DESC')
        res.status(200).json(results.rows)
    }
    catch (error) {
        res.status(409).json({error: error.message})
    }
};

const createVolunteer = async (req, res) => {
    try {
        const {name, address, phone, email, assigned_duty} = req.body
        const results = await pool.query(`INSERT INTO volunteer (name, address, phone, email, assigned_duty) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [name, address, phone, email, assigned_duty]);
        res.status(201).json(results.rows[0]);
    } 
    catch (error) {
        res.status(409).json({error: error.message});
    }
};

const updateVolunteer = async (req, res) => {
    try {
        const volunteer_id = parseInt(req.params.volunteer_id);
        const {name, address, phone, email, assigned_duty} = req.body;

        const results = await pool.query(`UPDATE volunteer SET name = $1, address = $2, phone = $3, email = $4, assigned_duty = $5 WHERE volunteer_id = $6 RETURNING *`,
            [name, address, phone, email, assigned_duty, volunteer_id]);
        res.status(200).json(results.rows[0]);
    } 
    catch (error) {
        res.status(409).json({error: error.message});
    }
};

const deleteVolunteer = async (req, res) => {
    try {
        const volunteer_id = parseInt(req.params.volunteer_id);
        const results = await pool.query(`DELETE FROM volunteer WHERE volunteer_id = $1 RETURNING *`, [volunteer_id]);

        res.status(200).json(results.rows[0]);
    } 
    catch (error) {
        res.status(409).json({error: error.message});
    }
};

export default {
    getVolunteer,
    createVolunteer,
    updateVolunteer,
    deleteVolunteer
}