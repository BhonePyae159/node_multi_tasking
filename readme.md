# Multi-threaded Node.js Application

## Overview

This is a multi-threaded Node.js application that processes data from a MySQL database using worker threads. It fetches rows from the database, assigns tasks to workers for processing, and checks for new data every 10 seconds. The application is designed to efficiently handle large datasets by leveraging the power of concurrent processing.

## Features

- **Multi-threading**: Utilizes worker threads for parallel processing of tasks.
- **Database Interaction**: Connects to a MySQL database and fetches data for processing.
- **Cron Job**: Periodically checks for new data in the database every 10 seconds.
- **Docker Support**: Can be run inside a Docker container.

## Prerequisites

- Node.js (version 14 or higher)
- MySQL database
- Docker (for containerization)

Here's a README section you can use for the running process of your `generated_db_table.py` file:

---

## Running the Random User Data Generator

This script generates a SQL file with random user data for your MySQL database. Follow these steps to set up and run the script:

### Prerequisites for setting up database

1. **Python 3.x** installed on your machine.
2. **MySQL** server running and accessible.
3. Create a database where the data will be imported.

### Steps

1. **Create the Database**:
   ```sql
   CREATE DATABASE your_database_name;
   ```

2. **Download the Script**:
   Save the `generated_db_table.py` file in your desired directory.

3. **Run the Script**:
   Open a terminal or command prompt, navigate to the directory where `generated_db_table.py` is located, and run the following command:
   ```bash
   python generated_db_table.py
   ```

   This will generate a file named `user_data.sql` in the same directory.

4. **Import the SQL File into the Database**:
   Use the following command to import the generated SQL file into your database:
   ```bash
   mysql -u your_username -p your_database_name < path_to_your_file/user_data.sql
   ```

   Replace `your_username` with your MySQL username, `your_database_name` with the name of the database you created, and `path_to_your_file` with the actual path to `user_data.sql`.

### Example

1. Create a database named `test_db`:
   ```sql
   CREATE DATABASE test_db;
   ```

2. Run the script:
   ```bash
   python generated_db_table.py
   ```

3. Import the generated SQL file:
   ```bash
   mysql -u root -p test_db < user_data.sql
   ```

Now your database should be populated with random user data!

### Notes
- Adjust the `num_rows` variable in the script to change the number of rows generated.
- Make sure to have the required permissions to create tables and insert data into the database.



