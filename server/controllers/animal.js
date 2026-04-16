import { pool } from "../config/database.js"
import testData from "../data/animals.js"

//TODO: do all filtering and sorting logic in backend?

const getAllAnimals = async (req, res) => {
    try {
        const results = await pool.query(`
            SELECT
                a.*,
                COALESCE(
                    json_agg(
                        json_build_object(
                            'tag_id', t.tag_id,
                            'name', t.name,
                            'description', t.description
                        )
                    ) FILTER (WHERE t.tag_id IS NOT NULL),
                    '[]'
                ) AS tags
            FROM animal a
            LEFT JOIN animal_tag at ON a.animal_id = at.animal_id
            LEFT JOIN tag t ON at.tag_id = t.tag_id
            GROUP BY a.animal_id
            ORDER BY a.animal_id DESC
        `)

        res.status(200).json(results.rows)
    }
    catch (error) {
        res.status(409).json({error: error.message})
    }
};

const getAnimalById = async (req, res) => {
    try {
        const {animal_id} = req.params

        const results = await pool.query(`
            SELECT
                a.*,
                COALESCE(
                    json_agg(
                        json_build_object(
                            'tag_id', t.tag_id,
                            'name', t.name,
                            'description', t.description
                        )
                    ) FILTER (WHERE t.tag_id IS NOT NULL),
                    '[]'
                ) AS tags
            FROM animal a
            LEFT JOIN animal_tag at ON a.animal_id = at.animal_id
            LEFT JOIN tag t ON at.tag_id = t.tag_id
            WHERE a.animal_id = $1
            GROUP BY a.animal_id
        `, [animal_id])

        res.status(200).json(results.rows[0])
    } catch (error) {
        res.status(409).json({error: error.message})
    }
}

const getAllTestAnimals = async (req, res) => {
    try {
        const results = testData
        res.status(200).json(results)
    }
    catch (error) {
        res.status(409).json({error: error.message})
    }
};

const createAnimal = async (req, res) => {
    const client = await pool.connect()

    try {
        const {name, description, age, weight, height, image_url, date_intake, species, cleaning_status, care_status, feeding_status, sanctuary_id,tag_ids = []} = req.body

        await client.query('BEGIN')

        const animalResult = await client.query(
            `INSERT INTO animal (name, description, age, weight, height, image_url, date_intake, species, cleaning_status, care_status, feeding_status, sanctuary_id) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
            RETURNING *`,
            [name, description, age, weight, height, image_url, date_intake, species, cleaning_status, care_status, feeding_status, sanctuary_id]
        )

        const newAnimal = animalResult.rows[0]

        for (const tag_id of tag_ids) {
            await client.query(`INSERT INTO animal_tag (animal_id, tag_id) VALUES ($1, $2)`, [newAnimal.animal_id, tag_id])
        }
        await client.query('COMMIT')
        res.status(201).json(newAnimal)
    } catch (error) {
        await client.query('ROLLBACK')
        res.status(409).json({error: error.message})
    } finally {
        client.release()
    }
};

// this wont work for patch request, only put right now!

const updateAnimal = async (req, res) => {
    const client = await pool.connect()
    try {
        const animal_id = parseInt(req.params.animal_id)

        const {name, description, age, weight, height, image_url, date_intake, species, cleaning_status, care_status, feeding_status, sanctuary_id, tag_ids = []} = req.body

        await client.query('BEGIN')

        const animalResult = await client.query(
            `UPDATE animal SET name = $1, description = $2, age = $3, weight = $4, height = $5, image_url = $6, date_intake = $7, species = $8, cleaning_status = $9, care_status = $10, feeding_status = $11,sanctuary_id = $12 WHERE animal_id = $13 RETURNING *`,
            [name, description, age, weight, height, image_url, date_intake, species, cleaning_status, care_status, feeding_status, sanctuary_id, animal_id])

        await client.query(
            `DELETE FROM animal_tag WHERE animal_id = $1`, [animal_id])

        for (const tag_id of tag_ids) {
            await client.query(`INSERT INTO animal_tag (animal_id, tag_id) VALUES ($1, $2)`, [animal_id, tag_id])
        }

        await client.query('COMMIT')
        res.status(200).json(animalResult.rows[0])
    } catch (error) {
        await client.query('ROLLBACK')
        res.status(409).json({error: error.message})
    } finally {
        client.release()
    }
};

const deleteAnimal = async (req, res) => {
    try {
        const animal_id = parseInt(req.params.animal_id);

        await pool.query(`DELETE FROM animal_tag WHERE animal_id = $1`, [animal_id]);
        const results = await pool.query(`DELETE FROM animal WHERE animal_id = $1 RETURNING *`, [animal_id]);

        res.status(200).json(results.rows[0]);
    } catch (error) {
        res.status(409).json({error: error.message});
    }
};

export default {
    getAllAnimals,
    getAnimalById,
    createAnimal,
    updateAnimal,
    deleteAnimal,
    getAllTestAnimals
}