const Tought = require("../models/Tought");
const User = require("../models/User");

module.exports = class ToughController {
  static async showToughts(req, res) {
    res.render("toughts/home");
  }

  static async dashboard(req, res) {
    res.render("toughts/dashboard");
  }

  static async createTought(req, res) {
    res.render("toughts/create");
  }

  static async createToughtSave(req, res) {
    
    const tought = {
      title: req.body.title,
      UserId: req.session.userid
    }

    await Tought.create(tought)

    req.flash('message', 'Pensamento criado com sucesso')

    req.session.save(() =>{
      try {
        res.redirect('/toughts/dashboard')
      } catch (error) {
        console.log('Aconteceu um erro: ' + error)
      }
    })

  }
};
