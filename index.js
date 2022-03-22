const express = require('express')

const app = express()

const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');
const fileupload = require('express-fileupload')

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(express.json())
app.use(fileupload());

let courses = [
    {
        id: "11",
        name: "learn React",
        price:199

    },
    {
        id: "13",
        name: "learn Angular",
        price:299

    },
    {
        id: "23",
        name: "learn Angular",
        price:599

    },
]

app.get("/", (req,res) =>{
    res.send("hellow from karthick");
});

app.get("/api/v1/lco", (req,res) =>{
    res.send("hellow from lco docs");
});

app.get("/api/v1/lcoobject", (req,res) =>{
    res.send({ id: "55", name: "Learn Backend", price: "999"});
});

app.get("/api/v1/courses", (req,res) =>{
    res.send(courses);
});

app.get("/api/v1/mycourse/:courseId", (req,res) =>{
     const mycourse = courses.find(course => course.id === req.params.courseId)
     res.send(mycourse);
});

app.post("/api/v1/addCourse", (req,res)=>{
    console.log(req.body);
    courses.push(req.body)
    res.send(true);
})

app.get("/api/v1/coursequery", (req,res) => {
    let location = req.query.location;
    let device = req.query.device;

    res.send({location, device});
});

app.post("/api/v1/courseupload", (req,res) => {

    console.log(req.headers);
    const file = req.files.file;
    console.log(file);
    let path = __dirname + "/images" + Date.now() + ".jpg"

    file.mv(path, (err) => {
        res.send(true);
    });
});


app.listen(4440, ()=> console.log('server is running @ 4440'));