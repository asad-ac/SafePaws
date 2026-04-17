import { pool } from "../config/database.js"

const getVolunteers = async (req, res) => {
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
        const {name, address, phone, email, assigned_duty, sanctuary_id} = req.body
        const results = await pool.query(`INSERT INTO volunteer (name, address, phone, email, assigned_duty, sanctuary_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
            [name, address, phone, email, assigned_duty, sanctuary_id]);
        res.status(201).json(results.rows[0]);
    } 
    catch (error) {
        res.status(409).json({error: error.message});
    }
};

const updateVolunteer = async (req, res) => {
    try {
        const volunteer_id = parseInt(req.params.volunteer_id);
        const {name, address, phone, email, assigned_duty, sanctuary_id} = req.body;

        const results = await pool.query(`UPDATE volunteer SET name = $1, address = $2, phone = $3, email = $4, assigned_duty = $5, sanctuary_id = $6 WHERE volunteer_id = $7 RETURNING *`,
            [name, address, phone, email, assigned_duty, sanctuary_id, volunteer_id]);
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

        if (results.rows.length === 0) {
            return res.status(404).json({ error: "Volunteer not found" })
          }

        res.status(200).json(results.rows[0]);
    } 
    catch (error) {
        res.status(409).json({error: error.message});
    }
};

export default {
    getVolunteers,
    createVolunteer,
    updateVolunteer,
    deleteVolunteer
}