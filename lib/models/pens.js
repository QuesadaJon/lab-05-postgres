const pool = require('../utils/pool');

module.exports = class Pen {
    id;
    brand;
    description;
    ink;

    constructor(row) {
        this.id = row.id;
        this.brand = row.brand;
        this.description = row.description;
        this.ink = row.ink;
    }

    //CRUD methods
    static async insert({ brand, description, ink }) {
        const { rows } = await pool.query(
            'INSERT INTO pen (brand, description, ink) VALUES ($1, $2, $3) RETURNING *',
            [brand, description, ink]
        );

        return new Pen(rows[0]);
    }

    static async find() {
        const { rows } = await pool.query('SELECT * FROM pen');

        return rows.map(row => new Pen(row));
    }

    static async findById(id) {
        const { rows } = await pool.query(
            'SELECT * FROM pen WHERE id=$1',
            [id]
        );

        if (!rows[0]) throw new Error(`no song with ${id}`)
        return new Pen(rows[0])
    }

    static async update(id, { brand, description, ink }) {
        const { rows } = await pool.query(
            `UPDATE pen
                SET brand=$1,
                    description=$2,
                    ink=$3
            WHERE id=$4
            RETURNING *`,
            [brand, description, ink, id]
        )

        return new Pen(rows[0]);
    }

    static async delete(id) {
        const { rows } = await pool.query(
            'DELETE FROM pen WHERE id=$1 RETURNING*',
            [id]
        );

        return new Pen(rows[0])
    }
};
