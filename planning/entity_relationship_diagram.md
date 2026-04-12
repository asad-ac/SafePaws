# Entity Relationship Diagram

Reference the Creating an Entity Relationship Diagram final project guide in the course portal for more information about how to complete this deliverable.

## Create the List of Tables

* Sanctuary Table
* Volunteer Table
* Sponsor Table
* Animal Table
* Animal and Tag JOIN Table
* Tag Table

## Add the Entity Relationship Diagram

![Entity Relationship Diagram](./er_diagram/er_diagram_safepaws.png)

| Column Name | Type | Description |
|-------------|------|-------------|
| id | integer | primary key |
| name | text | name of the shoe model |
| ... | ... | ... |

### sanctuary

| Column        | Type         | Description        |
|---------------|-------------|--------------------|
| sanctuary_id  | SERIAL      | PRIMARY KEY        |
| name          | VARCHAR(50) |                    |
| address       | VARCHAR(255)|                    |
| phone         | VARCHAR(20) |                    |
| email         | VARCHAR(50) |                    |
| capacity      | INT         |                    |

### animal

| Column          | Type          | Description        |
|-----------------|--------------|--------------------|
| animal_id       | SERIAL       | PRIMARY KEY        |
| sanctuary_id    | INT          | FOREIGN KEY        |
| name            | VARCHAR(50)  |                    |
| description     | VARCHAR(255) |                    |
| age             | INT          |                    |
| weight          | DECIMAL      |                    |
| height          | DECIMAL      |                    |
| image_url       | VARCHAR(255) |                    |
| date_intake     | DATE         |                    |
| species         | VARCHAR(50)  |                    |
| cleaning_status | BOOLEAN      |                    |
| care_status     | BOOLEAN      |                    |
| feeding_status  | BOOLEAN      |                    |

### tag

| Column     | Type         | Description |
|------------|-------------|-------------|
| tag_id     | INT         | PRIMARY KEY |
| name       | VARCHAR(25) |             |
| description| VARCHAR(50) |             |

### animal_tag (Join Table)

| Column    | Type | Description                |
|-----------|------|----------------------------|
| animal_id | INT  | FOREIGN KEY                |
| tag_id    | INT  | FOREIGN KEY                |
| (PK)      |      | (animal_id, tag_id)        |

### sponsor

| Column         | Type         | Description        |
|----------------|-------------|--------------------|
| sponsorship_id | SERIAL      | PRIMARY KEY        |
| animal_id      | INT         | FOREIGN KEY        |
| name           | VARCHAR(50) |                    |
| amount         | DECIMAL     |                    |
| address        | VARCHAR(255)|                    |
| phone          | VARCHAR(20) |                    |
| email          | VARCHAR(50) |                    |

### volunteer 

| Column        | Type         | Description        |
|---------------|-------------|--------------------|
| volunteer_id  | SERIAL      | PRIMARY KEY        |
| sanctuary_id  | INT         | FOREIGN KEY        |
| name          | VARCHAR(50) |                    |
| address       | VARCHAR(255)|                    |
| phone         | VARCHAR(20) |                    |
| email         | VARCHAR(50) |                    |
| assigned_duty | VARCHAR(50) |                    |

### Relationships

sanctuary (One) ──> (Many) animal  
sanctuary (One) ──> (Many) volunteer  
animal (One) ──> (Many) sponsor  
animal (Many) ──> (Many) tag (via animal_tag)