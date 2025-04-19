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
            resolve(parentValue, args){ 
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
            resolve(parentValue, args){
                return customers; // Return hardcoded customers array
            }
        }
    }
})

// Export Schema
module.exports = new GraphQLSchema({
    query: RootQuery // Tell GraphQL that API's root query is RootQuery
});