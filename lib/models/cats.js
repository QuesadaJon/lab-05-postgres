const pool = require('../utils/pool');

module.exports = class Cats {
    id;
    breed;
    description;
    color;

    constructor(row) {
        this.id = row.id;
        this.breed = row.breed;
        this.description = row.description;
        this.color = row.color;
    }

    //CRUD methods
    static async insert({ breed, description, color }) {
        const { rows } = await pool.query(
            'INSERT INTO cats (breed, description, color) VALUES ($1, $2, $3) RETURNING *',
            [breed, description, color]
        );

        return new Cats(rows[0]);
    }

    static async find() {
        const { rows } = await pool.query('SELECT * FROM cats');

        return rows.map(row => new Cats(row));
    }

    static async findById(id) {
        const { rows } = await pool.query(
            'SELECT * FROM cats WHERE id=$1',
            [id]
        );

        if (!rows[0]) throw new Error(`no song with ${id}`)
        return new Cats(rows[0])
    }

    static async update(id, { breed, description, color }) {
        const { rows } = await pool.query(
            `UPDATE cats
                SET breed=$1,
                    description=$2,
                    color=$3
            WHERE id=$4
            RETURNING *`,
            [breed, description, color, id]
        )

        return new Cats(rows[0]);
    }

    static async delete(id) {
        const { rows } = await pool.query(
            'DELETE FROM cats WHERE id=$1 RETURNING*',
            [id]
        );

        return new Cats(rows[0])
    }
};
