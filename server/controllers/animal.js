import { pool } from "../config/database.js";

//TODO: do all filtering and sorting logic in backend?

const getAllAnimals = async (req, res) => {
    try {
        const results = await pool.query(`SELECT * FROM animal ORDER BY animal_id DESC`)
        res.status(200).json(results.rows)
    }
    catch (error) {
        res.status(409).json({error: error.message})
    }
}

const getAnimalsByCategory = async (req, res) => {
    try {
        const {name} = req.query;
        const results = await pool.query(`SELECT * FROM animal JOIN category ON animal.category_id = category.category_id WHERE category.name = $1 ORDER BY animal.animal_id DESC`,[name]);
        res.status(200).json(results.rows);
    } catch (error) {
        res.status(409).json({error: error.message});
    }
};

const createAnimal = async (req, res) => {
    try {
        const {name, description, age, weight, image_url, date_intake, cleaning_status, care_status, feeding_status, category_id, sanctuary_id} = req.body
        const results = await pool.query(`INSERT INTO animal (name, description, age, weight, image_url, date_intake, cleaning_status, care_status, feeding_status, category_id, sanctuary_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *`,
            [name, description, age, weight, image_url, date_intake, cleaning_status, care_status, feeding_status, category_id, sanctuary_id]);
        res.status(201).json(results.rows[0]);
    } catch (error) {
        res.status(409).json({ error: error.message });
    }
};

// this wont work for patch request only put right now
const updateAnimal = async (req, res) => {
    try {
        const animal_id = parseInt(req.params.animal_id);
        const {name, description, age, weight, image_url, date_intake, cleaning_status, care_status, feeding_status, category_id, sanctuary_id} = req.body;

        const results = await pool.query(`UPDATE animal SET name = $1, description = $2, age = $3, weight = $4, image_url = $5, date_intake = $6, cleaning_status = $7, care_status = $8, feeding_status = $9, category_id = $10, sanctuary_id = $11 WHERE animal_id = $12 RETURNING *`,
            [name, description, age, weight, image_url, date_intake, cleaning_status, care_status, feeding_status, category_id, sanctuary_id, animal_id]);
        res.status(200).json(results.rows[0]);
    } catch (error) {
        res.status(409).json({ error: error.message });
    }
};

const deleteAnimal = async (req, res) => {
    try {
        const animal_id = parseInt(req.params.animal_id);
        const results = await pool.query(`DELETE FROM animal WHERE animal_id = $1 RETURNING *`, [animal_id]);

        res.status(200).json(results.rows[0]);
    } catch (error) {
        res.status(409).json({ error: error.message });
    }
};

export default {
    getAllAnimals,
    getAnimalsByCategory,
    createAnimal,
    updateAnimal,
    deleteAnimal
}




