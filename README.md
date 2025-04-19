# GraphQL Backend Server
- Building backend **GraphQL Server**
- Setting up Node.js Express framework with **Express-GraphQL** module to send & receive data through GraphQL
- Creating **schema file** with **queries** and **mutations**
- Implementing **JSON-Server** (fake REST API) to act as database
- Testing **CRUD** functionality of the Customer Management Database

## What is GraphQL?
- **Application layer query language**
- Open sourced by **Facebook** in 2015
- Can be used with any type of database: 
    - SQL is a language built for querying and getting data from an SQL database or Relational database like MySQL.
    - SQL is a data-level language, you query the database directly.
    - With GraphQL we query the **application layer (server)** which allows us to use any kind of database we want. 
    - We can even use hard-coded data, SQL database, NoSQL like MongoDB, etc.
- Ability to ask for exactly what you need and nothing more
    - GraphQL provides almost a blue-print of your data in your API
    - Unlike REST APIs, you do not have to fetch all user data wasting bandwidth and other resources just to get the user's name.
- Get multiple resources in a single request which saves even more resources

## Simple GraphQL Query
- The GraphQL query looks very similar to the data.
- The `user` data on the server is in the JSON format.
- The query asks for just the `name` and the `email` of the user with the id of `100`
- In a standard REST API, if there were hundreds of fields in the data you will have to fetch all of them.
- GraphQL allows us to fetch just the name and email.

### The Query
```
{
    user(id: "100"){
        name,
        email
    }
}
```

### The Data
```
{
    "user":{
        "id": "100",
        "name": "John Doe",
        "email": "john@gmail.com"
    }
}
```

## Fetching Multiple Resources
- Fetch user's `name`, `email` and only the `title` of user's `posts`
- We can specifically request the fields we want from the `posts` array

### The Query
```
{
    user(id: "100"){
        name,
        email,
        posts{
            title
        }
    }
}
```

### The Data
```
{
    "user":{
        "id":"100",
        "name":"John Doe",
        "email":"john@gmail.com",
        "posts":[
             { "title": "Post 1" },   
             { "title": "Post 2" },   
        ]
    }
}
```

## GraphQL Types
- GraphQL APIs are organized in terms of types and fields.
- We have a `user` with a type of `User`:
    ```
    Type Query {
        user: User
    }
    ```
- Defining `User` type:
    ```
    Type User {
        name: String
        age: Int
        friends: [User]
    }
    ```
    - `User` is an object
    - `name` is a string
    - `age` is an integer
    - `friends` is an array of users

## Supported Languages
- C# / .NET
- **JavaScript / Node / Express**
- Clojure
- PHP
- Elixir
- Python
- Erlang
- Scala
- Go 
- Ruby
- Java 

## Who uses GraphQL?
- Many huge companies use GraphQL.
- GraphQL is popular for mobile apps because we can send much lighter requests without getting giant payloads back.
- **Facebook** mobile apps have been powered by GraphQL since 2012.

## Getting Started
1. Open project folder in VSCode terminal and run `npm init -y`
2. Ensure `package.json `is created
3. Install dependencies: `npm i express express-graphql graphql nodemon`
4. Create `server.js` file
5. In `package.json` file, 
    1. Set `"main": "server.js",`
    2. Update `scripts`:
        ```
        "scripts": {
                    "dev:server": "nodemon server.js"
                }
        ```
6. Run the server: `npm run dev:server`