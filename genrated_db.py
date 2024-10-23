import random
import string
from datetime import datetime, timedelta

# SQL file to store generated data
output_file = "user_data.sql"

# Number of rows to generate
num_rows = 1000

# Random data generators
def random_string(length):
    return ''.join(random.choices(string.ascii_letters, k=length))

def random_phone():
    return f"{random.randint(100, 999)}-{random.randint(100, 999)}-{random.randint(100, 999)}"

def random_date():
    start_date = datetime(2000, 1, 1)
    end_date = datetime(2023, 1, 1)
    delta = end_date - start_date
    random_days = random.randint(0, delta.days)
    return (start_date + timedelta(days=random_days)).strftime('%Y-%m-%d %H:%M:%S')

# Create and open the SQL file for writing
with open(output_file, 'w') as f:
    # Write the CREATE TABLE statement
    f.write("""
    CREATE TABLE `user` (
        id INT PRIMARY KEY,
        firstName VARCHAR(50),
        lastName VARCHAR(50),
        gender VARCHAR(10),
        address TEXT,
        city VARCHAR(50),
        phone VARCHAR(15),
        email VARCHAR(100),
        status VARCHAR(20),
        createdDate DATETIME
    );
    """)
    
    # Write INSERT statements in batches for performance
    batch_size = 10000  # Adjust batch size if necessary
    f.write("INSERT INTO `user` (id, firstName, lastName, gender, address, city, phone, email, status, createdDate) VALUES\n")
    
    for i in range(1, num_rows + 1):
        # Generate random data for the row
        first_name = random_string(8)
        last_name = random_string(10)
        gender = random.choice(['male', 'female'])
        address = random_string(20)
        city = random_string(15)
        phone = random_phone()
        email = f"{random_string(5)}@{random.choice(['gmail.com', 'yahoo.com', 'hotmail.com'])}"
        status = random.choice(['Available', 'Busy', 'Do not disturb'])
        created_date = random_date()

        # Write the row data to the SQL file
        row = f"({i}, '{first_name}', '{last_name}', '{gender}', '{address}', '{city}', '{phone}', '{email}', '{status}', '{created_date}')"
        
        # Add a comma for all rows except the last one in the batch
        if i % batch_size == 0 or i == num_rows:
            f.write(row + ";\n")  # End batch with semicolon
            if i < num_rows:
                f.write("INSERT INTO `user` (id, firstName, lastName, gender, address, city, phone, email, status, createdDate) VALUES\n")
        else:
            f.write(row + ",\n")

print(f"SQL file '{output_file}' with {num_rows} rows generated successfully!")
