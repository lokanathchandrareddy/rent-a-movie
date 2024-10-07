# Web Application for Renting Movies Online - Rent A Movie

A web-based movie rental application built with **Nuxt 3**, **Vue.js**, **Vuetify**, **Pinia**, and **Supabase**. This application allows users to browse movies, rent them, and return rented movies. It features a user-friendly interface with a smooth experience.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
- [Usage](#usage)
  - [Running the Development Server](#running-the-development-server)
- [Project Structure](#project-structure)
- [Next Iterations](#next-iterations)
- [Supabase Setup](#supabase-setup)
- [License](#license)

## Features

- **REST API**: Implements REST functionality in Nuxt backend (server/api).
- **User Authentication**: login using Supabase Auth.
- **Movie List**: View a list of movies with details like genre, director, and release year.
- **Cart**: Add movies to a cart for renting or returning - reusable.
- **Rent Movies**: Rent movies and update stock availability.
- **Return Movies**: Return rented movies and maintain rental history (not implemented).
- **State Management**: Manage application state with Pinia store.

## Technologies Used

- **Nuxt 3**: Server-side rendering and powerful features for Vue.js applications.
- **Vue.js 3**: Progressive JavaScript framework for building user interfaces.
- **Vuetify 3**: Material Design component framework for Vue.js.
- **Pinia**: Intuitive state management library for Vue.js.
- **Supabase**: Backend as a Service (BaaS) providing database and authentication.
- **Vite**: Fast build tool for modern web projects.
- **Nuxt Nitro**: Nuxt 3's server engine that enables serverless deployment and API routes.
- **TypeScript**: Typed superset of JavaScript for improved code quality (not implemented everywhere - will be done in upcoming iterations).

## Getting Started

### Prerequisites

- **Node.js**: Ensure you have Node.js (version 20 or above) installed. Use NVM for installation ([Node.js on Windows](https://learn.microsoft.com/en-us/windows/dev-environment/javascript/nodejs-on-windows)) https://learn.microsoft.com/en-us/windows/dev-environment/javascript/nodejs-on-windows)
- **NPM or Yarn**: Package manager for installing dependencies.
- **Supabase Account**: Sign up for a free account at [Supabase](https://supabase.io/).

### Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/lokanathchandrareddy/rent-a-movie.git
   cd rent-a-movie
   ```

2. **Install Dependencies**
   Make sure Node v20 is installed. If not, please refer to the document.

   ```bash
   # Using npm
   npm install
   ```

3. **Set Up Supabase (if you want to use your own; else use my keys provided in email)**

   - Create a new project in Supabase (will explain in detail later).
   - Create the necessary tables (`movies`, `rented_movies`, etc.) and define their schemas.
   - Enable authentication providers as needed.

### Environment Variables

Create a `.env` file in the root directory and add the following environment variables:
You can use my keys here. 

```env
SUPABASE_URL=your_supabase_url  # I will share mine on email 
SUPABASE_KEY=your_supabase_anon_key  # I will share mine on email 
```

Replace `your_supabase_url` and `your_supabase_anon_key` with your Supabase project's URL and anonymous API key.

## Usage

### Running the Development Server

```bash
# Using npm
npm run dev
```

The application will be available at `http://localhost:3000`.

Login credentials for two users will be shared via email.

## Project Structure

```
movie-rental-app/
├── components/         # Vue components
│   ├── Sidebar         # Sidebar Component to show cart
│   ├── Login           # Login Component
├── layouts/            # Layouts for pages
├── pages/              # Nuxt pages (routes)
│   ├── movies          # Movies list page
│   ├── return          # Return Movies page
│   └── index           # Landing page
├── plugins/            # Nuxt plugins (e.g., Vuetify)
├── public/             # Static assets
├── server/             # Server-side API routes (Nuxt Nitro)
│   └── api/            # API endpoints
│       ├── movies/
│       │   ├── index.get.ts       # Handle GET requests to fetch all movies
│       │   ├── index.post.ts      # Handle POST requests to add a new movie
│       │   └── [id].get.ts        # Handle GET requests to fetch a movie by ID
│       └── return-movies/
│           ├── index.get.ts       # Handle GET requests to fetch movie rental records
│           ├── index.post.ts      # Handle POST requests to log a new movie rent
│           ├── index.put.ts       # Handle PUT requests to update a return record
│           └── [id].get.ts        # Handle GET requests to fetch a rented-movie by ID
├── stores/             # Pinia stores for state management
│   └── movieCart.js    # Store for state management specifically for cart
├── nuxt.config.ts      # Nuxt configuration file
├── package.json        # Project dependencies and scripts
└── README.md           # Project documentation
```

## Next Iterations

The following are the upcoming iterations for the project:

- **Unit Testing**: Implement unit tests using Vitest (similar to Jest) and testing-library.
- **User Signup**: Implement user signup to avoid creating users in Supabase.
- **Search and Filtering**: Add functionality to search and filter movies based on genre, language, director, release year, etc., to improve user experience.
- **Rental History**: Display users' complete rental history, including past rentals and returns, without additional tables.
- **Complete TypeScript Support**: Fully integrate with TypeScript for better type safety and code quality.
- **Movie Detail Pages**: Detailed pages for each movie, including rich information, high-quality images, trailers, and related content.
- **Reviews and Ratings**: Allow users to leave reviews and ratings for movies after renting.
- **Movie Recommendations**: Implement a recommendation system to suggest movies to users based on their viewing history and ratings.
- **User Profile Management**: Enable users to update their profiles, manage preferences, and view account details.
- **Responsive Design Enhancements**: Optimize the UI for various devices and screen sizes to ensure a seamless experience across all platforms.
- **Performance Optimization**: Optimize loading times and overall performance, possibly by implementing lazy loading and code splitting.
- **Internationalization (i18n)**: Using locale for multiple languages.
- **Integration with Payment Gateway**: If planning to handle real transactions, integrate a secure payment gateway for renting movies.

## Supabase Setup

###### `Refer to this only if you want to set up your own database`

### **Setting Up Supabase Project**

**References** 
1. [Supabase Nuxt.js Guide](https://supabase.nuxtjs.org/get-started) : https://supabase.nuxtjs.org/get-started
2. [Supabase Getting Started](https://supabase.com/docs/guides/getting-started/tutorials/with-nuxt-3) : https://supabase.com/docs/guides/getting-started/tutorials/with-nuxt-3
3. [Supabase JavaScript Introduction](https://supabase.com/docs/reference/javascript/introduction) : https://supabase.com/docs/reference/javascript/introduction

#### **1. Create a Supabase Account**
1. Go to [supabase.com](https://supabase.com) and sign up for a free account.
2. Click on *New Project* to create a new Supabase project.
3. Fill in the project details:
   - **Project Name:** (e.g., `rent-a-movie`).
   - **Database Password:** Password for PostgreSQL database.
   - **Region:** (e.g. Virginia).
4. Click on **"Create New Project"** to start the Supabase instance.

Once the project is created, you will be taken to the project dashboard.

#### **2. Configure Database**
1. **Navigate to the Database Section:**
   - On the dashboard, click on *Database* from the left sidebar.
2. **Create Tables:**
   - **Movies Table**
   - **RentedMovies Table**

#### **3. Create the Movies Table**
In the **Database** section, click on **"Table Editor"**.
Click **"New Table"** and create the `movies` table with the following columns:
| Column Name      | Data Type  | Constraints              |
|------------------|------------|--------------------------|
| `id`             | integer    | Primary key, auto-increment |
| `title`          | text       | Not null                 |
| `genre`          | text       | Not null                 |
| `language`       | text       | Not null                 |
| `director`       | text       | Not null                 |
| `year_of_release`| integer    | Not null                 |
| `price`          | numeric    | Not null                 |
| `stock`          | integer    | Not null                 |

Click Save.

#### **4. Create the RentedMovies Table**
Click on **"New Table"** again and create the `rented_movies` table with the following columns:

| Column Name     | Data Type  | Constraints                     |
|-----------------|------------|---------------------------------|
| `id`            | integer    | Primary key, auto-increment     |
| `movie_id`      | integer    | Foreign key (references movies - movies.id) |
| `user_id`       | integer    | (Optional)                     |
| `rented_at`     | timestamp  | Default to now()                |
| `returned_at`   | timestamp  | Nullable                        |

Click Save.

#### **5. Create the Rented_Movies View**
We can query the view instead of joining and manipulating the data each time from the UI.
Create a view in the Supabase SQL editor in the sidebar:

```sql
CREATE VIEW
  rented_movies_flat AS
SELECT
  rented_movies.rented_at,
  rented_movies.user_id,
  rented_movies.returned_at,
  movies.id,
  movies.title,
  movies.genre,
  movies.price,
  movies.stock,
  movies.director,
  movies.language,
  movies.year_of_release
FROM
  rented_movies
  JOIN movies ON rented_movies.movie_id = movies.id
WHERE rented_movies.returned_at IS NULL;
```

#### **6. Authentication**
Supabase provides built-in authentication.
- On the dashboard, click on *Authentication* from the left sidebar.
- Click on *Providers*, select Email, deselect *confirm email*, and enable/save (other types of authentications can be set up here).
- Click on *Users*, now we can add/manage users.
- To add: Click on *Add User* and *Create New User*.
- Enter *Email address* and *Password* and save.
- Now we can use this user to log in after configuration in the app.

#### **7. Get the Supabase Project URL and API Keys**
To integrate Supabase with your Nuxt app, you’ll need the project URL and API keys.

1. In your Supabase project dashboard, go to **"Settings" > "API"**.
2. Copy the **Project URL** and **Anon Key** (for unauthenticated access) and store them for later use in your Nuxt project.
3. Add a `.env` file and copy-paste the below code with the keys and save it:

```env
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_anon_key 
```

You should be all set now!

## License

This project is licensed under the [MIT License](LICENSE).