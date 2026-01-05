import pool from "../config/db.js";

/* ✅ CREATE */
const createCricketer = async (req, res) => {
  try {
    const {
      name, 
      date_of_birth,
      photo_url,
      birthplace,
      career,
      fifties,
      centuries,
      average
    } = req.body;

    const result = await pool.query(
      `INSERT INTO cricketers
      (name, date_of_birth, photo_url, birthplace, career, fifties, centuries, average)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
      RETURNING *`,
      [
        name,
        date_of_birth,
        photo_url,
        birthplace,
        career,
        fifties,
        centuries,
        average
      ]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* ✅ READ ALL / SEARCH */
const getCricketers = async (req, res) => {
  try {
    const search = req.query.search || "";

    const result = await pool.query(
      `SELECT id, name
       FROM cricketers
       WHERE name ILIKE $1
       ORDER BY name`,
      [`%${search}%`]
    );

    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* ✅ READ ONE */
const getCricketerById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "SELECT * FROM cricketers WHERE id = $1",
      [id]
    );

    if (!result.rows.length)
      return res.status(404).json({ message: "Cricketer not found" });

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* ✅ UPDATE */
const updateCricketer = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `UPDATE cricketers SET
        name=$1,
        date_of_birth=$2,
        photo_url=$3,
        birthplace=$4,
        career=$5,
        fifties=$6,
        centuries=$7,
        average=$8
      WHERE id=$9 RETURNING *`,
      [
        req.body.name,
        req.body.date_of_birth,
        req.body.photo_url,
        req.body.birthplace,
        req.body.career,
        req.body.fifties,
        req.body.centuries,
        req.body.average,
        id
      ]
    );

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* ✅ DELETE */
const deleteCricketer = async (req, res) => {
  try {
    await pool.query(
      "DELETE FROM cricketers WHERE id = $1",
      [req.params.id]
    );

    res.json({ message: "Cricketer deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export {
  createCricketer,
  getCricketers,
  getCricketerById,
  updateCricketer,
  deleteCricketer
}
