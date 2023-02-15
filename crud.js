// const exp = require('express')(); 
const express = require('express');
const app = express();

app.use(express.json());

const courses = [
    { id: 1, name: 'PHP' },
    { id: 2, name: 'Java' },
    { id: 3, name: 'C' }
];


// handling post requests - adding/creating a new data on the server
app.post('/api/courses', (req, res) => {
    if(req.body.name === ' ') return res.status(400).send('Bad request. Please provide an id and id should be a number');
    
    const newCourse = {
        id: courses.length + 1,
        name: req.body.name
    };
    
    courses.push(newCourse);
    res.send(newCourse);
});


// handling get requests - reading data from the server
app.get('/api/courses/', (req, res) => {
    res.send(courses);
});


// handling put requests - updating data on the server
app.put('/api/courses/:id', (req, res) => {
    const course = courses.find(course => course.id === parseInt(req.params.id));
    console.log(course);

    if(!course) return res.status(400).send('Bad request. The course does not exist in the resource');

    if(!req.body.name) return res.status(400).send('Bad request. Name is required');

    course.name = req.body.name;
    res.send(course);
})


// handling delete requests - delete data from the server
app.delete('/api/courses/:id', (req, res) => {
    const result = courses.find(course => course.id === parseInt(req.params.id)); 

    if(!result) return res.status(400).send('Bad request. Couldn\'t find the resource you tried to access');

    const indexResult = courses.indexOf(result);
    courses.splice(indexResult, 1);

    res.send(result);
});

// using environmental variables - this is the recommended way of assigning port number
const port = process.env.PORT || 3000;

app.listen(3000, () => console.log(`Listening on port ${port}...`));