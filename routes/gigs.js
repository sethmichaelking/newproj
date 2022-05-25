const express = require('express')
const router = express.Router()
const db = require('../database/db')
const Gig = require('../models/Gig')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

//viewe gigs

router.get('/', (req, res)=>{
    Gig.findAll()
    .then(gigs => {
        console.log(gigs)
        res.render('gigs', {
            gigs
        })
    })
    .catch(err => console.log(err))
})

router.get('/add', (req, res)=>{
    res.render('add')
})

router.post('/add', (req, res)=>{
    let { title, technologies, description, budget } = req.body

    Gig.create({
        title,
        technologies,
        description,
        budget
    })
        .then(res.redirect('/gigs'))
})

router.get('/search', (req, res)=>{
    const { term } = req.query
    Gig.findAll({ where: { technologies: { [Op.like]: '%' + term + '%' } } })
    .then(gigs => res.render('gigs', { gigs}))
})

router.get('/delete', (req, res)=>{
   res.render('delete')
})

router.post('/delete', (req, res)=>{
    let param = req.body.titleDelete
    Gig.destroy({ where: { title: param} })
        .then(res.redirect('/gigs'))
        .catch(err => console.log(err))
})

router.get('/update', (req, res)=>{
    res.render('update')
 })

router.post('/update', (req, res)=>{
    let titleOfGigToUpdate = req.body.titleOfGigToUpdate
    let valueReplacement = req.body.valueReplacement
     Gig.findOne({
        where: { title: titleOfGigToUpdate }
    }).then((gig) =>{
       gig.update(
           { title: valueReplacement }
       )
       res.redirect('/gigs')
    })
    .catch((err) => {
        console.log("Error: " + err)
    })
})



module.exports = router