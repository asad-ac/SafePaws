import {pool} from "../config/database.js"

// pattern
// req.user.user_id
// find that user’s sanctuary_id
// use sanctuary_id in every SELECT/INSERT/UPDATE/DELETE

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

const getSponsors = async (req, res) => {
    try {
        const user_id = req.user.user_id
        const results = await pool.query('SELECT s.* FROM sponsor s JOIN sanctuary sc ON s.sanctuary_id = sc.sanctuary_id WHERE sc.user_id = $1 ORDER BY sponsor_id DESC', [user_id])
        res.status(200).json(results.rows)
    }
    catch (error) {
        res.status(409).json({error: error.message})
    }
};

const createSponsor = async (req, res) => {
    try {
        const user_id = req.user.user_id
        const {name, amount, address, phone, email} = req.body
        const sanctuary_id = await getUserSanctuaryId(pool, user_id)
        const results = await pool.query(`INSERT INTO sponsor (name, amount, address, phone, email, sanctuary_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
            [name, amount, address, phone, email, sanctuary_id]);
        res.status(201).json(results.rows[0]);
    } 
    catch (error) {
        res.status(409).json({error: error.message});
    }
};

const updateSponsor = async (req, res) => {
    try {
        const user_id = req.user.user_id
        const sponsor_id = parseInt(req.params.sponsor_id);
        const {name, amount, address, phone, email} = req.body;

        const sanctuary_id = await getUserSanctuaryId(pool, user_id)

        const results = await pool.query(`UPDATE sponsor SET name = $1, amount = $2, address = $3, phone = $4, email = $5 WHERE sponsor_id = $6 AND sanctuary_id = $7 RETURNING *`,
            [name, amount, address, phone, email, sponsor_id, sanctuary_id]);
        res.status(200).json(results.rows[0]);
    } 
    catch (error) {
        res.status(409).json({error: error.message});
    }
};

const deleteSponsor = async (req, res) => {
    try {
        const sponsor_id = parseInt(req.params.sponsor_id);
        const user_id = req.user.user_id

        const sanctuary_id = await getUserSanctuaryId(pool, user_id)
        const results = await pool.query(`DELETE FROM sponsor WHERE sponsor_id = $1 AND sanctuary_id = $2 RETURNING *`, [sponsor_id, sanctuary_id]);

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