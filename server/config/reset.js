import { pool } from "./database.js";

// TODO: seed sanctuary
// TODO: seed tag data
// TODO: seed animal data
// TODO: seed volunteer data
// TODO: seed sponsor data
// TODO: seed animal_tag data
// TODO: want (amount) field on sponsor table - yes or no.

// seed order:
// sanctuary
// tag
// animal
// volunteer
// sponsor
// animal_tag

const createSanctuaryTable = async () => {
    const create = `
    DROP TABLE IF EXISTS sanctuary CASCADE;
        
    CREATE TABLE IF NOT EXISTS sanctuary (
        sanctuary_id SERIAL PRIMARY KEY,
        name varchar(50) NOT NULL,
        address varchar(255) NOT NULL,
        phone varchar(50) NOT NULL,
        email varchar(50) NOT NULL,
        capacity INTEGER NOT NULL
        );
    `;

    try {
        await pool.query(create)
        console.log('✅ sanctuary table created successfully')
    }
    catch (err) {
        console.log('🛑 error creating sanctuary table', err)
    }
}

const createTagTable = async () => {
    const create = `
    DROP TABLE IF EXISTS tag CASCADE;
    
    CREATE TABLE IF NOT EXISTS tag (
        tag_id SERIAL PRIMARY KEY,
        name varchar(50) NOT NULL,
        description varchar(50)
        );
    `;

    try {
        await pool.query(create)
        console.log('✅ tag table created successfully')
    }
    catch (err) {
        console.log('🛑 error creating tag table', err)
    }
}

const createAnimalTable = async () => {
    const create = `
        DROP TABLE IF EXISTS animal CASCADE;
        
        CREATE TABLE IF NOT EXISTS animal (
            animal_id SERIAL PRIMARY KEY,
            name varchar(50) NOT NULL,
            description varchar(255) NOT NULL,
            age INTEGER NOT NULL,
            weight decimal NOT NULL,
            height decimal NOT NULL,
            image_url varchar(255),
            date_intake date NOT NULL,
            species varchar(50) NOT NULL,
            cleaning_status BOOLEAN NOT NULL,
            care_status BOOLEAN NOT NULL,
            feeding_status BOOLEAN NOT NULL,
            sanctuary_id INTEGER NOT NULL,
            FOREIGN KEY(sanctuary_id) REFERENCES sanctuary(sanctuary_id)
            );
        `;

        try {
            await pool.query(create)
            console.log('✅ animal table created successfully')
        }
        catch (err) {
            console.log('🛑 error creating animal table', err)
        }
}

const createVolunteerTable = async () => {
    const create = `
    DROP TABLE IF EXISTS volunteer CASCADE;
    
    CREATE TABLE IF NOT EXISTS volunteer (
        volunteer_id SERIAL PRIMARY KEY,
        name varchar(50) NOT NULL,
        address varchar(255) NOT NULL,
        phone varchar(50) NOT NULL,
        email varchar(50) NOT NULL,
        assigned_duty varchar(50) NOT NULL,
        sanctuary_id INTEGER NOT NULL,
        FOREIGN KEY(sanctuary_id) REFERENCES sanctuary(sanctuary_id)
        );
    `;

    try {
        await pool.query(create)
        console.log('✅ volunteer table created successfully')
    }
    catch (err) {
        console.log('🛑 error creating volunteer table', err)
    }
}

const createSponsorTable = async () => {
    const create = `
    DROP TABLE IF EXISTS sponsor CASCADE;

    CREATE TABLE IF NOT EXISTS sponsor (
        sponsor_id SERIAL PRIMARY KEY,
        name varchar(50) NOT NULL,
        address varchar(255) NOT NULL,
        phone varchar(50) NOT NULL,
        email varchar(50) NOT NULL,
        sanctuary_id INTEGER NOT NULL,
        FOREIGN KEY(sanctuary_id) REFERENCES sanctuary(sanctuary_id)
        );
    `;
    try {
        await pool.query(create)
        console.log('✅ sponsor table created successfully')
    }
    catch (err) {
        console.log('🛑 error creating sponsor table', err)
    }
}

const createAnimalTagTable = async () => {
    const create = `
    DROP TABLE IF EXISTS animal_tag CASCADE;
    
    CREATE TABLE IF NOT EXISTS animal_tag (
        animal_id INTEGER NOT NULL,
        tag_id INTEGER NOT NULL,
        PRIMARY KEY (animal_id, tag_id),
        FOREIGN KEY (animal_id) REFERENCES animal(animal_id),
        FOREIGN KEY (tag_id) REFERENCES tag(tag_id)
        );
    `;

    try {
        await pool.query(create)
        console.log('✅ animal_tag join table created successfully')
    }
    catch (err) {
        console.log('🛑 error creating animal_tag join table', err)
    }
}