# SafePaws

CodePath WEB103 Final Project

Designed and developed by: Rajiv Chevannes, Samantha Milo, Asad Chaudhry, Baire Diaz

## About

### Description and Purpose

SafePaws is a web app that allows animal sanctuary staff members to manage animals, sponsor relationships, and volunteer outreach. It provides strong record management for animals that are rescued from neglect, abuse, or dangerous situations, ensuring they live out their lives in a safe, non-exploitative environment. This application will improve management for an animal sanctuary at a large scale, helping organizations with every animal's needs.

### Inspiration

Throughout the weeks collaborating on assignments and bonding, we discovered we all have a passion for animals. Our pets are a large part of our lives; they're close family whom we are excited to see when we come home. They provide comfort and joy, and we would love to give back. All animals deserve a good environment and should not have to go through abuse, dangerous situations, injuries, or neglect. Any organization that dedicates an ample amount of time to serving incredible wildlife deserves our help.

## Tech Stack

- **Frontend:**
  - **Languages:** JavaScript
  - **Frameworks:** React.js (Vite)
- **Backend:**
  - **Languages:** Node.js
  - **Frameworks:** Express
- **Database:** PostgreSQL

## Features

- **Sorting Pet Attributes:**
  - Implement sorting by intake date, name, or age so staff can quickly find and manage animals more efficiently.
  - [gif goes here]
- **Animal Status's**
  - Provide filtering by care status, feeding status, enclosure cleanliness, and tags to make it easier for staff to organize and monitor animals.
  - [gif goes here]
- **Social Media Post Generation:**
  - Enable post generation for individual animals to support donation campaigns and volunteer outreach.
  - [gif goes here]
- **CRUD Workflow:**
  - Use modal-based CRUD forms to streamline workflows and reduce unnecessary page navigation for staff.
  - [gif goes here]
- **GitHub Authentication:**
  - Implement GitHub authentication so staff users can securely manage their assigned sanctuary and its animals.
  - [gif goes here]
- **Hot Toast Confirmations:**
  - Integrate React Hot Toast notifications to provide immediate feedback when animals are added, updated, or deleted.
  - [gif goes here]
- **Loading Skeletons:**
  - Incorporate loading skeletons to improve performance and give users a preview of incoming content while data loads.
  - [gif goes here]

[ADDITIONAL FEATURES GO HERE - ADD ALL FEATURES HERE IN THE FORMAT ABOVE; you will check these off and add gifs as you complete them]

## Installation Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/asad-ac/SafePaws.git
cd SafePaws
```

### 2. Create a `.env` file in the `server` directory

Environment Variables (Neon Database)

This project uses a PostgreSQL database hosted on Neon.

```bash
cd server
touch .env
```

### 3. Install Dependencies

Server:

```bash
cd server
npm install
```

Client:

```bash
cd ..
cd client
npm install
```

### 4. Run Application

Start Server:

```bash
cd server
npm start
```

Start Client:

```bash
cd ..
cd client
npm run dev
```

Enjoy!