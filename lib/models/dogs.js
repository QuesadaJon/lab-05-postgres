const pool = require('../utils/pool');

module.exports = class Dogs {
    id;
    breed;
    description;
    url;

    constructor(row) {
        this.id = row.id;
        this.breed = row.breed;
        this.description = row.description;
        this.url = row.url;
    }

    //CRUD methods
    static async insert({ breed, description, url }) {
        const { rows } = await pool.query(
            'INSERT INTO dogs (breed, description, url) VALUES ($1, $2, $3) RETURNING *',
            [breed, description, url]
        );

        return new Dogs(rows[0]);
    }

    static async find() {
        const { rows } = await pool.query('SELECT * FROM dogs');

        return rows.map(row => new Dogs(row));
    }

    static async findById(id) {
        const { rows } = await pool.query(
            'SELECT * FROM dogs WHERE id=$1',
            [id]
        );

        if (!rows[0]) throw new Error(`no song with ${id}`)
        return new dogs(rows[0])
    }

    static async update(id, { breed, description, url }) {
        const { rows } = await pool.query(
            `UPDATE dogs
                SET breed=$1,
                    description=$2,
                    url=$3
            WHERE id=$4
            RETURNING *`,
            [breed, description, url, id]
        )

        return new Dogs(rows[0]);
    }

    static async delete(id) {
        const { rows } = await pool.query(
            'DELETE FROM dogs WHERE id=$1 RETURNING*',
            [id]
        );

        return new Dogs(rows[0])
    }
};
