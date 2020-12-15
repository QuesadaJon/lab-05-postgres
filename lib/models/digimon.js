const pool = require('../utils/pool');

module.exports = class Digimon {
    id;
    name;
    description;
    url

    constructor(row) {
        this.id = row.id;
        this.name = row.name;
        this.description = row.description;
        this.url = row.url;
    }

    //CRUD methods
    static async insert({ name, description, url }) {
        const { rows } = await pool.query(
            'INSERT INTO digimon (name, description, url) VALUES($1, $2, $3) RETURNING *',
            [name, description, url]
        );

        return new Digimon(rows[0]);
    }

    static async find() {
        const { rows } = await pool.query('SELECT * FROM digimon');

        return rows.map(row => new Digimon(row));
    }

    static async findById(id) {
        const { rows } = await pool.query(
            'SELECT * FROM digimon WHERE id=$1',
            [id]
        );

        if (!rows[0]) throw new Error(`no song with ${id}`)
        return new Digimon(rows[0])
    }

    static async update(id, { name, description, url }) {
        const { rows } = await pool.query(
            `UPDATE digimon
                SET name=$1,
                    description=$2,
                    url=$3
            WHERE id=$4
            RETURNING *`,
            [name, description, url, id]
        )

        return new Digimon(rows[0]);
    }

    static async delete(id) {
        const { rows } = await pool.query(
            'DELETE FROM digimon WHERE id=$1 RETURNING*',
            [id]
        );

        return new Digimon(rows[0])
    }
};
