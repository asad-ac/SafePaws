# SafePaws

CodePath WEB103 Final Project

Designed and developed by: Rajiv Chevannes, Samantha Milo, Asad Chaudhry, Baire Diaz

## About

### Description and Purpose

SafePaws is a web application that allows animal sanctuary staff members to manage animals, sponsor relationships, and volunteer outreach. It also provides strong record management for animals that are rescued from neglect, abuse, or dangerous situations, ensuring they live out their lives in a safe, non-exploitative environment. This application will improve management for an animal sanctuary at a large scale, helping organizations with every animal's needs.

### Inspiration

We discovered we are all passionate about animals. Our pets are a large part of our lives and are close family whom we are excited to see when we come home. They provide comfort and joy. All animals deserve a good environment and should not have to go through abuse, dangerous situations, injuries, or neglect. Any organization that dedicates an ample amount of time to serving incredible wildlife deserves our help.

## Tech Stack

- **Frontend:**
  - **Languages:** JavaScript
  - **Frameworks:** React.js (Vite)
- **Backend:**
  - **Languages:** Node.js
  - **Frameworks:** Express
- **Database:** PostgreSQL

## Features

### ✅ Sorting Pet Attributes 
  Implement sorting by name, age, or weight so staff can quickly find and manage animals more efficiently.

   [![Watch the demo](https://cdn.loom.com/sessions/thumbnails/d96fef29bffc4ea799ab5fcb1d4e8e9b-87bb6542300468f8-full-play.gif)](https://www.loom.com/share/d96fef29bffc4ea799ab5fcb1d4e8e9bD)
### ✅ Animal Status
  Provide filtering by care status, feeding status, enclosure cleanliness, and tags to make it easier for staff to organize and monitor animals.

  [![Watch the demo](https://cdn.loom.com/sessions/thumbnails/d96fef29bffc4ea799ab5fcb1d4e8e9b-87bb6542300468f8-full-play.gif)](https://www.loom.com/share/d96fef29bffc4ea799ab5fcb1d4e8e9bD)

### Social Media Post Generation
  Enable post generation for individual animals to support donation campaigns and volunteer outreach.
### CRUD Workflow
  Use modal-based CRUD forms to streamline workflows and reduce unnecessary page navigation for staff.
### GitHub Authentication
  Implement GitHub authentication so staff users can securely manage their assigned sanctuary and its animals.
### Hot Toast Confirmations
  Integrate React Hot Toast notifications to provide immediate feedback when animals, sanctuaries, sponsors, or volunteers are added, updated, or deleted.
### Loading Skeletons
  Incorporate loading skeletons to improve performance and give users a preview of incoming content while data loads.
### ✅ Error Handling
  Handle errors gracefully to maintain a smooth user experience and strong data integrity.

  ![Demo](./milestones/demo/error-handling.gif)

## Installation Instructions

### 1. Clone Repository

```bash
git clone https://github.com/asad-ac/SafePaws.git
cd SafePaws
```

### 2. Create `.env` file in `server` folder

Environment Variables (Neon Database)

This project uses a PostgreSQL database hosted on Neon.

```bash
cd server
touch .env
```

Look at server/.env.example for guidance.

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

Server:

```bash
cd server
npm start
```

Client:

```bash
cd ..
cd client
npm run dev
```

Enjoy!