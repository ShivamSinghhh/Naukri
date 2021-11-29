
const express = require("express");
const mongoose = require("mongoose");

const app = express();
const port = 3000;

app.use(express.json())
function connect() {
    return mongoose.connect('mongodb://127.0.0.1:27017/evaluation')
}

// app.get(`/`, (req, res) => {
//     res.send("get method is working fine");
//     // res.end()
// })


// app.get("/about", (req, res) => {
//     res.send("get method is working fine");
//     // res.end()
// })

const companySchema = new mongoose.Schema(
    {
        company_name: { type: String, required: true,unique:true },
        discription : { type: String, required: false },
        city: { type: String, required: true },
        rating: { type: Number, required: true },
        vaccancy: { type: Number, required: true },
        work_from_home: { type: Boolean, required: true },
        notice_period : { type : Number, required : true}
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

const Company = mongoose.model("company", companySchema); 




//  
app.post('/company', async (req, res) => {
    const company = await Company.create(req.body);
    return res.send(company)
})
app.get('/company/type', async (req, res) => {
    const company = await Company.find({work_from_home:"true"}).lean().exec();
    return res.send(company)
})
app.get('/company/notice_period', async (req, res) => {
    const com = await Company.find({ notice_period: 2 }).lean().exec();
    return res.send(company)
})
app.get('/company/rating', async (req, res) => {
    const company = await Company.find().sort({ rating: -1 }).lean().exec();
    return res.send(company)
})
app.get('/company/vaccancies', async (req, res) => {
    const company = await Company.find().sort({ vaccancy: -1 }).lean().exec();
    return res.send(company[0])
})


app.listen(3000, async () => {
    await connect();
    console.log("server is running")
})
