import {pool} from "../config/database.js"

const getUserSanctuaryId = async (clientOrPool, user_id) => {
    const results = await clientOrPool.query(
      "SELECT sanctuary_id FROM sanctuary WHERE user_id = $1",
      [user_id]
    );
  
    if (results.rows.length === 0) {
      throw new Error("Sanctuary not found for user");
    }
  
    return results.rows[0].sanctuary_id;
  };

const getVolunteers = async (req, res) => {
    try {
        const user_id = req.user.user_id
        const results = await pool.query('SELECT v.* FROM volunteer v JOIN sanctuary s ON v.sanctuary_id = s.sanctuary_id WHERE s.user_id = $1 ORDER BY v.volunteer_id DESC', [user_id])
        res.status(200).json(results.rows)
    }
    catch (error) {
        res.status(409).json({error: error.message})
    }
};

const createVolunteer = async (req, res) => {
    try {
        const user_id = req.user.user_id
        const {name, address, phone, email, assigned_duty} = req.body
        const sanctuary_id = await getUserSanctuaryId(pool, user_id)
        const results = await pool.query(`INSERT INTO volunteer (name, address, phone, email, assigned_duty, sanctuary_id) VALUES ($1, $2, $3, $4, $5, $6)  RETURNING *`,
            [name, address, phone, email, assigned_duty, sanctuary_id]);
        res.status(201).json(results.rows[0]);
    } 
    catch (error) {
        res.status(409).json({error: error.message});
    }
};

const updateVolunteer = async (req, res) => {
    try {
        const user_id = req.user.user_id
        const volunteer_id = parseInt(req.params.volunteer_id);
        
        const {name, address, phone, email, assigned_duty} = req.body;

        const sanctuary_id = await getUserSanctuaryId(pool, user_id)

        const results = await pool.query(`UPDATE volunteer SET name = $1, address = $2, phone = $3, email = $4, assigned_duty = $5 WHERE volunteer_id = $6 AND sanctuary_id = $7 RETURNING *`,
            [name, address, phone, email, assigned_duty, volunteer_id, sanctuary_id]);
        
        if (results.rows.length === 0) {
            return res.status(404).json({error: "Volunteer not found"})
        }
        res.status(200).json(results.rows[0]);
    } 
    catch (error) {
        res.status(409).json({error: error.message});
    }
};

const deleteVolunteer = async (req, res) => {
    try {
        const user_id = req.user.user_id
        const volunteer_id = parseInt(req.params.volunteer_id);
        const sanctuary_id = await getUserSanctuaryId(pool, user_id)
        const results = await pool.query(`DELETE FROM volunteer WHERE volunteer_id = $1 AND sanctuary_id = $2 RETURNING *`, [volunteer_id, sanctuary_id]);

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