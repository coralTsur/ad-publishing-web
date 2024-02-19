/*

Route	Method	Functionality
/api/contacts	GET	Retrive all contacts
/api/contacts	POST	Create contact
/api/contacts/:id	PUT	Update the details of a contact
/api/contacts/:id	DELETE	Delete a contact

 */

var express = require('express');
var router = express.Router();

const db = require('../models');
router.get('/ads', (req, res) => {
    return db.Ad.findAll({
        order: [['createdAt', 'DESC']]
    })
        .then((ads) => res.send(ads))
        .catch((err) => {
            console.log('There was an error querying contacts', JSON.stringify(err))
            err.error = 1; // some error code for client side
            return res.status(400).send(err) // send the error to the client
        });
});
//אם נספיק להוסיף את הבונוס של החיפוש נעדכן חלק זה
/*router.get('/ads/:title-contain', (req, res) => {
    return db.Ads.findAll({where: {lastName: req.params.lastName}})
        .then((contacts) => res.send(contacts))
        .catch((err) => {
            console.log('There was an error querying contacts', JSON.stringify(err))
            return res.status(400).send(err)
        });
});*/

router.post('/ads', (req, res) => {
    const { title, description,price, phone, email } = req.body;
    return db.Ads.create({ title, description,price, phone, email })
        .then((ad) => res.status(201).send(ad))
        .catch((err) => {
            console.log('*** error creating a contact', JSON.stringify(ad))
            return res.status(400).send(err)
        })
});

router.delete('/contacts/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if (req.session.isAdmin) {
        return db.Ad.findByPk(id)
            .then((contact) => contact.destroy({force: true}))
            .then(() => res.status(204).send())
            .catch((err) => {
                console.log('***Error deleting contact', JSON.stringify(err))
                res.status(400).send(err)
            })
    }
    else
        res.render('login',{title: "something wend wrong!!!!!"});
});

/*router.put('/contacts/:id', (req, res) => {
    const id = parseInt(req.params.id)
    return db.Contact.findById(id)
        .then((contact) => {
            const { firstName, lastName, phone } = req.body
            return contact.update({ firstName, lastName, phone })
                .then(() => res.send(contact))
                .catch((err) => {
                    console.log('***Error updating contact', JSON.stringify(err))
                    res.status(400).send(err)
                })
        })
});
*/
module.exports = router;
