const { gql, ApolloServer } = require('apollo-server');
var mongoose = require('mongoose');
const { Schema } = require("mongoose");
const username = 'user_1'
const password = 'coursetools'
const dbName = 'UofT'
const uri = `mongodb+srv://${username}:${password}@coursetoolscluster-wjb51.mongodb.net/test?retryWrites=true&w=majority`;
const connection = mongoose.createConnection(uri, { useNewUrlParser: true, useUnifiedTopology: true })
const uoftDb = connection.useDb(dbName)
const typeDefs = gql`
    type Course {
        id: String, 
        code: String,
        name: String,
        description: String,
        division: String,
        department: String,
        prerequisites: String,
        exclusions: String, 
        level: Int,
        campus: String, 
        term: String,
        breadths: [Int],
        meetingSections: [MeetingSection]
     }
     type MeetingSection{
        code: String,
        instructors: [String],
        times: [Times],
        size: Int,
        enrolment: [Int]
     }
     type Times{
        day: String,
        start: Int,
        end: Int,
        duration: Int, 
        location: String
     }
     type Subject {
        name: String,
        degrees: [String],
        notes: [String],
        programs: [Program]
     }
     type Program{
         name: String,
         level: String,
         code: String,
         type: String,
         notes: [String]!,
         courses: [YearCourses]
     }
     type YearCourses {
         year: String,
         courses: [String]
     }
     type Query {
         courses: [Course],
         programs: [Subject]
     }
    `;



const CourseSchema = new Schema({
    id: String,
    code: String,
    name: String,
    description: String,
    division: String,
    department: String,
    prerequisites: String,
    exclusions: String,
    level: Number,
    campus: String,
    term: String,
    breadths: [Number],
    meetingSections:
        [
            {
                code: String, instructors: [String], times: [
                    { day: String, start: Number, end: Number, duration: Number, location: String }],
                size: Number, enrolment: Number
            }
        ]
});

const ProgramSchema = new Schema({
    name: String,
    degrees: [String],
    notes: [String],
    programs: [{ name: String, level: String, code: String, type: String, notes: String, courses: [{Number: [String]}] }],
});

const CoursesModel = uoftDb.model('Course', CourseSchema, "Courses");
const ProgramModel = uoftDb.model('Subject', ProgramSchema, "Subjects");


const resolvers = {
    Query: {
        courses: () => {
            return CoursesModel.find();
        },
        programs: () => {
            return ProgramModel.find();
        },
    },
};

/**
 * With our schema, resolvers, and mock data defined - we can now create our Apollo 
 * Server instance. To do so, we'll import and use the ApolloServer constructor
 * function from the apollo-server library.
 */
const server = new ApolloServer({ typeDefs, resolvers });

/**
 * With the Apollo server instance now available to us, we can start 
 * our web server by running the listen() function available as a 
 * property of the Apollo server. 
 * 
 * The server.listen() function is a promise that when resolved receives a 
 * serverInfo object which has the url of the running server. We'll log a 
 * message to the console with this url value.
 */
server.listen().then((serverInfo) => {
    console.log(`Server is running at ${serverInfo.url}`);
});

