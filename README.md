# Challenge

- Add new employee.
- Soft deleted an employee.
- Update an employee.
- Get paginated list of employees.
- Get list of deleted employees.
- Integrate swagger.

# Pre-Requisite

- mongodb-memory-server: 8.8.0
- mongoose: 6.5.1
- await-of: 3.1.1
- swagger: 6.0.5
- class-validator: 0.13.2
- class-transformer: 0.5.1

# My Solution

- Integrated swagger for API documentation which is available at http://localhost:3000/swagger
- Created CRUD endpoints for managing the employees.
- Used mongoose for interacting with the MongoDB database.

# Setup Steps

Install dependencies

- `npm i`

Update env file to update the MONOGODB_URI

- `MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.8p1qcg5.mongodb.net/?retryWrites=true&w=majority"`

Start the Server

- `npm run start:dev`

# Test

Run Unit Test:

- `npm run test`

Run Test Coverage:

- `npm run test:cov`

# Usage

- [Postman Collection](/Employee-Management-System.postman_collection.json)

## Create Employee

```
POST http://localhost:3000/employees

Body
{
    "name": <employeename>,
    "email": <email@xyz.com>,
    "phoneNumber": xxxxxxxxxx,
    "dateOfBirth": <YYYY-MM-DDTHH:MM:SS>,
    "dateOfEmployement": <YYYY-MM-DDTHH:MM:SS>,
    "address": {
        "city": <city>,
        "zipCode": xxxxxx,
        "line1": <address line 1>,
        "line2": <address line 2>
    }
}

```

## Get Employee

```
GET http://localhost:3000/employees/{id}

```

## Update Employee

```
PATCH http://localhost:3000/employees/{id}

Body
{
    "name": <updatedEmployeeName>
}


```

## Delete Employee

```
DELETE http://localhost:3000/employees/{id}

```

## Get all Employees

```
GET http://localhost:3000/employees?page=1

```

## Get all Deleted Employees

```
GET http://localhost:3000/employees/deleted?page=1

```
