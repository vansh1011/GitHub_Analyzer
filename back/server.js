import express from 'express'
import dotenv from 'dotenv'
import db from './db.js'
import cors from 'cors'

dotenv.config()

const app = express()

app.use(express.json())
app.use(cors({
    origin: process.env.FRONTURL
}))


app.post('/find', (req, res) => {


    const { username } = req.body;

    const data = db.query('SELECT * FROM profiles WHERE username = ?', [username], (err, result) => {


        if (err) {
            return res.json({ error: err.message })

        }

        return res.json({ data: result })

    })





})


app.get('/all', (req, res) => {

    db.query('SELECT * FROM profiles' , (err, result)=>{
        if(err)
        {
            console.log(err);
            res.json({error : err.message})

        }

        res.json(result)
    })




})


app.post('/save', async (req, res) => {

    const { username, followers, following, public_repos, total_stars, total_forks, top_language } = req.body;

    const values = [username, followers, following, public_repos, total_stars, total_forks, top_language]
    db.query('INSERT INTO profiles (username , followers , following , public_repos , total_stars , total_forks , top_language )  VALUES (? , ? , ? , ? , ? , ? , ?)', values, (err, _result) => {
        if (err) {
            console.log(err);
        }
        return res.json({ message: "User Saved" })

    })


})

const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(` http://localhost:${port}`)
})