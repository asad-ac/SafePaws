import { pool } from "./database.js";

const createCategoryTable = async () => {
    const create = `
    DROP TABLE IF EXISTS category CASCADE;
    
    CREATE TABLE IF NOT EXISTS category (
        category_id SERIAL PRIMARY KEY,
        name varchar(25) NOT NULL,
        description varchar(50)
        );
    `;

    try {
        await pool.query(create)
        console.log('✅ category table created successfully')
    }
    catch (err) {
        console.log('🛑 error creating category table', err)
    }
}

// TODO: seed individual tag data
// TODO: seed category data
// TODO: seed 4 - 5 animals for each category
// instead of booleans for animal table? seed different values for each?

const createSanctuaryTable = async () => {
    const create = `
    DROP TABLE IF EXISTS sanctuary CASCADE;
        
    CREATE TABLE IF NOT EXISTS sanctuary (
        sanctuary_id SERIAL PRIMARY KEY,
        name varchar(50) NOT NULL,
        address varchar(255) NOT NULL,
        phone varchar(50) NOT NULL,
        email varchar(50)
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
            age integer NOT NULL,
            weight decimal NOT NULL,
            image_url varchar(255),
            date_intake date NOT NULL,
            cleaning_status BOOLEAN,
            care_status BOOLEAN,
            feeding_status BOOLEAN,
            category_id INTEGER,
            sanctuary_id INTEGER,
            FOREIGN KEY(category_id) REFERENCES category(category_id),
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
        sanctuary_id INTEGER,
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

const createAnimalTagTable = async () => {
    const create = `
    DROP TABLE IF EXISTS animal_tag CASCADE;
    
    CREATE TABLE IF NOT EXISTS animal_tag (
        animal_id integer NOT NULL,
        tag_id integer NOT NULL,
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