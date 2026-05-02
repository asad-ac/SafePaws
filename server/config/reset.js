import {pool} from "./database.js";
import sanctuaryData from "../data/sanctuary.js";
import tagData from "../data/tag.js"
import animalData from "../data/animal.js";
import volunteerData from "../data/volunteer.js";
import sponsorData from "../data/sponsor.js";
import animalTagData from "../data/animal_tag.js";

const createStaffUserTable = async () => {
    const create = `
    DROP TABLE IF EXISTS staff_user CASCADE;
    
    CREATE TABLE IF NOT EXISTS staff_user (
        user_id SERIAL PRIMARY KEY,
        github_id VARCHAR(255) UNIQUE NOT NULL,
        username VARCHAR(255) NOT NULL,
        display_name VARCHAR(255), 
        avatar_url VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        `;

        try {
            await pool.query(create)
            console.log("✅ user table created successfully")
        }
        catch (error) {
            console.log("🛑 error creating user table", err)
        }
}

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
        console.log("✅ sanctuary table created successfully")
    }
    catch (err) {
        console.log("🛑 error creating sanctuary table", err)
    }
};

const seedSanctuary = async () => {
    try {
        for (const s of sanctuaryData) {
            await pool.query(`INSERT INTO sanctuary (name, address, phone, email, capacity) VALUES ($1, $2, $3, $4, $5)`,
                [s.name, s.address, s.phone, s.email, s.capacity]
            )
        }
        console.log("✅ sanctuary seeded")
    }
    catch (err) {
        console.log("🛑 error seeding sanctuary", err)
    }
};

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
        console.log("✅ tag table created successfully")
    }
    catch (err) {
        console.log("🛑 error creating tag table", err)
    }
};

const seedTags = async () => {
    try {
        for (const t of tagData) {
            await pool.query(`INSERT into tag (name, description) VALUES ($1, $2)`, [t.name, t.description]);
        }
        console.log("✅ tags seeded")
    }
    catch (err) {
        console.log("🛑 error seeding tags", err)
    }
};


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
            console.log("✅ animal table created successfully")
        }
        catch (err) {
            console.log("🛑 error creating animal table", err)
        }
};

const seedAnimals = async () => {
    try {
        for (const animal of animalData) {
            await pool.query(
                `INSERT INTO animal 
                (name, description, age, weight, height, image_url, date_intake, species, cleaning_status, care_status, feeding_status, sanctuary_id)
                VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)`,
                [animal.name, animal.description, animal.age, animal.weight, animal.height, animal.image_url, animal.date_intake, animal.species, animal.cleaning_status, animal.care_status, animal.feeding_status, animal.sanctuary_id]);
        }

        console.log("✅ animals seeded");
    } catch (err) {
        console.log("🛑 error seeding animals", err);
    }
};

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
        console.log("✅ volunteer table created successfully")
    }
    catch (err) {
        console.log("🛑 error creating volunteer table", err)
    }
};

const seedVolunteers = async () => {
    try {
        for (const v of volunteerData) {
            await pool.query(`INSERT INTO volunteer (name, address, phone, email, assigned_duty, sanctuary_id) VALUES ($1, $2, $3, $4, $5, $6)`, [v.name, v.address, v.phone, v.email, v.assigned_duty, v.sanctuary_id])
        }
        console.log("✅ volunteers seeded")
    }
    catch (err) {
        console.log("🛑 error seeding volunteers", err)
    }
};

const createSponsorTable = async () => {
    const create = `
    DROP TABLE IF EXISTS sponsor CASCADE;

    CREATE TABLE IF NOT EXISTS sponsor (
        sponsor_id SERIAL PRIMARY KEY,
        name varchar(50) NOT NULL,
        amount decimal NOT NULL,
        address varchar(255) NOT NULL,
        phone varchar(50) NOT NULL,
        email varchar(50) NOT NULL,
        sanctuary_id INTEGER NOT NULL,
        FOREIGN KEY(sanctuary_id) REFERENCES sanctuary(sanctuary_id)
        );
    `;
    try {
        await pool.query(create)
        console.log("✅ sponsor table created successfully")
    }
    catch (err) {
        console.log("🛑 error creating sponsor table", err)
    }
};

const seedSponsors = async () => {
    try {
        for (const s of sponsorData) {
            await pool.query(`INSERT INTO sponsor (name, amount, address, phone, email, sanctuary_id)
                VALUES ($1, $2, $3, $4, $5, $6)`, [s.name, s.amount, s.address, s.phone, s.email, s.sanctuary_id]);
        }

        console.log("✅ sponsors seeded")
    }
    catch (err) {
        console.log("🛑 error seeding sponsors", err)
    }
};

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
        console.log("✅ animal_tag join table created successfully")
    }
    catch (err) {
        console.log("🛑 error creating animal_tag join table", err)
    }
};

const seedAnimalTags = async () => {
    try {
        for (const at of animalTagData) {
            await pool.query(`INSERT INTO animal_tag (animal_id, tag_id) VALUES ($1, $2)`, [at.animal_id, at.tag_id])
        }

        console.log("✅ animal_tag seeded");
    }
    catch (err) {
        console.log("🛑 error seeding animal_tag", err)
    }
};

const resetDatabase = async () => {
    await createStaffUserTable()

    await createSanctuaryTable()
    await seedSanctuary()

    await createTagTable()
    await seedTags()

    await createAnimalTable()
    await seedAnimals()

    await createAnimalTagTable()
    await seedAnimalTags()

    await createVolunteerTable()
    await seedVolunteers()

    await createSponsorTable()
    await seedSponsors()
};

const run = async () => {
    try {
        await resetDatabase()
        console.log("✅ Database was reset")
    }
    catch (err) {
        console.log("🛑 Database reset failed", err)
    }
};

run()