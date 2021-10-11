const axios = require('axios');  //imports axiois system defined module for REST API calls

const {          //schema definition
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLSchema
} = require('graphql');

const CountryType = new GraphQLObjectType({
  name: 'country',
  fields: () => ({
    name: { type: GraphQLString },
    native: { type: GraphQLString },
    emoji: { type: GraphQLString },
    currency: { type: GraphQLString },
    languages: { type: LanguageType }                       //user defined type
  })
});


const LanguageType = new GraphQLObjectType({
  name: 'languages',
  fields: () => ({
    code: { type: GraphQLString },
    nameL: { type: GraphQLString },
  })
});

//Define the Root Query which defines the user data and allows query creation
//GraphQL Query to get data for space craft launches from a live REST endpoint on the web

const RootQuery= new GraphQLObjectType({
  name:'RootQueryType',
  fields:{
    countries:{
      type: new GraphQLList(CountryType),
      resolve(parent,args){
        return axios
        .get(' http://localhost:3000/countries')
        .then(res=> res.data);
      }
    },
    country:{
      type: CountryType,
      arg:{name:{type: GraphQLString}},
      resolve(parent,arg){
        return axios
        .get(`http://localhost:3000/countries/${arg.name}`)
        .then(res=> res.data)
      }
    }
  }
})



// const RootQuery = new GraphQLObjectType({
//   name: 'RootQueryType',
//   fields: {
//     launches: {        //gets all the  space craft flight launches data
//       type: new GraphQLList(LaunchType),
//       resolve(parent, args) {                  //resolver function that handles the query. parentValue is populated by the system 
//         return axios                 
//           .get('https://api.spacexdata.com/v3/launches')  //axios to get data from the REST API. axios is a Promise based HTTP client
//           .then(res => res.data);               //receive response from REST API
//       }
//     },
//     launch: {      //gets the launch data for a cpecific flight number
//       type: LaunchType,
//       args: {
//         flight_number: { type: GraphQLInt }    // flight number for which launch data is to be retreived
//       },
//       resolve(parent, args) {                 //resolver function that handles the query. parentValue is populated by the system 
//         return axios
//           .get(`https://api.spacexdata.com/v3/launches/${args.flight_number}`) //axios to get data from the REST API for specific flight ID
//           .then(res => res.data);             //receive response from REST API
//       }
//     },
//     rockets: {    //gets data for all rockets 
//       type: new GraphQLList(RocketType),
//       resolve(parent, args) {                //resolver function that handles the query. parentValue is populated by the system 
//         return axios
//           .get('https://api.spacexdata.com/v3/rockets')  //axios to get data from the REST API
//           .then(res => res.data);            //receive response from REST API
//       }
//     },
//     rocket: {     //gets the rocket data for a cpecific flight number
//       type: RocketType,
//       args: {
//         id: { type: GraphQLInt }
//       },
//       resolve(parent, args) {               //resolver function that handles the query. parentValue is populated by the system  
//         return axios
//           .get(`https://api.spacexdata.com/v3/rockets/${args.id}`)  //axios to get data from the REST API for a specific rocket 
//           .then(res => res.data);            //receive response from REST API
//       }
//     }
//   }
// });

//defining an export object to export the root query in order to import it in the server.js file
module.exports = new GraphQLSchema({
  query: RootQuery
});
