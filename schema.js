/* GraphQL schema, including types and resolvers */
const axios = require('axios');
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull
} = require('graphql');

/* // Hardcoded Data - mock database
const customers = [
    { id: '1', name: 'John Doe', email: 'jdoe@gmail.com', age:35 },
    { id: '2', name: 'Steve Smith', email: 'steve@gmail.com', age:25 },
    { id: '3', name: 'Sara Williams', email: 'sara@gmail.com', age:32 }
] */

// Customer Type - define the shape of the data Customer object should return
const CustomerType = new GraphQLObjectType({
    name: 'Customer',
    fields:() => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        age: { type: GraphQLInt }
    })
});

// Root Query - the entry point of your GraphQL API
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        customer: { // Define customer field
            type: CustomerType,
            args: {
                id: { type: GraphQLString } // Expect an id argument
            },
            resolve(parentValue, args){ // Run when customer field is queried

                // Send a GET request to your json-server
                return axios.get('http://localhost:3000/customers/' + args.id)
                    .then(res => res.data); // Extract customer data from HTTP response

                /* // Look up a customer from the hardcoded array using the id
                for(let i = 0; i < customers.length; i++){
                    if(customers[i].id == args.id){
                        return customers[i];
                    }
                } */
               
            }
        },
        /* Define customers field that returns a list of all customers */
        customers: { 
            type: new GraphQLList(CustomerType), // GraphQLList indicates that this returns multiple items
            resolve(parentValue, args){          // Run when customers field is queried
                return axios.get('http://localhost:3000/customers/')
                    .then(res => res.data); 
            }
        }
    }
})

// Define Mutation type to add a new customer
const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields:{
        addCustomer:{
            type: CustomerType, // The type of data this mutation returns
            args:{ // the mutation expects 3 arguments (all required / GraphQLNonNull)
                name: {type: new GraphQLNonNull(GraphQLString)},
                email: {type: new GraphQLNonNull(GraphQLString)},
                age: {type: new GraphQLNonNull(GraphQLInt)}
            },
            resolve(parentValue, args){
                // Send new customer data to json-server
                return axios.post('http://localhost:3000/customers', {
                    name: args.name,
                    email: args.email,
                    age: args.age
                })
                .then(res => res.data); // Response data is returned to GraphQL &
                                        //  included in the mutation response
            }
        },
        deleteCustomer:{
            type: CustomerType,
            args:{  
                    id:{type: new GraphQLNonNull(GraphQLString)} // The customer ID is required
            },
            resolve(parentValue, args){
                return axios.delete('http://localhost:3000/customers/' + args.id) // REST Call
                .then(res => res.data); // Return deleted customer data
            }
        }
    }
})

// Export Schema
module.exports = new GraphQLSchema({
    query: RootQuery, // Tell GraphQL that API's root query is RootQuery
    mutation          // Export mutations
}); 