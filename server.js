const express = require('express'); // Import Express framework
const { graphqlHTTP } = require('express-graphql'); // Middleware to connect GraphQL with Express
const schema = require('./schema'); // Import GraphQL schema

// Initialize an Express app
const app = express();             

// Mount the GraphQL endpoint at /graphql
app.use('/graphql', graphqlHTTP({
    schema: schema, // GraphQL schema
    graphiql: true, // Enable the in-browser IDE for GraphQL queries (http://localhost:4000/graphql)
}));

// Start the server on port 4000
app.listen(4000, () => {            
    console.log('Server is running on port 4000...');
})