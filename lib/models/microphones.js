const pool = require('../utils/pool');

module.exports = class Microphone {
    id;
    model;
    description;
    url;

    constructor(row) {
        this.id = row.id;
        this.model = row.model;
        this.description = row.description;
        this.url = row.url;
    }

    //CRUD methods
    static async insert({ model, description, url }) {
        const { rows } = await pool.query(
            'INSERT INTO microphone (model, description, url) VALUES ($1, $2, $3) RETURNING *',
            [model, description, url]
        );

        return new Microphone(rows[0]);
    }

    static async find() {
        const { rows } = await pool.query('SELECT * FROM microphone');

        return rows.map(row => new Microphone(row));
    }

    static async findById(id) {
        const { rows } = await pool.query(
            'SELECT * FROM microphone WHERE id=$1',
            [id]
        );

        if (!rows[0]) throw new Error(`no song with ${id}`)
        return new Microphone(rows[0])
    }

    static async update(id, { model, description, url }) {
        const { rows } = await pool.query(
            `UPDATE microphone
                SET model=$1,
                    description=$2,
                    url=$3
            WHERE id=$4
            RETURNING *`,
            [model, description, url, id]
        )

        return new Microphone(rows[0]);
    }

    static async delete(id) {
        const { rows } = await pool.query(
            'DELETE FROM microphone WHERE id=$1 RETURNING*',
            [id]
        );

        return new Mcrophone(rows[0])
    }
};
