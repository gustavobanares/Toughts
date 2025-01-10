const User = require("../models/User");
const bcrypt = require("bcryptjs");

module.exports = class AuthController {
  static login(req, res) {
    res.render("auth/login");
  }

  static async loginPost(req, res) {
    try {
      const { email, password } = req.body;

      // Find user
      const user = await User.findOne({ where: { email: email } });

      if (!user) {
        req.flash("message", "Usuário não encontrado!");
        return res.render("auth/login"); // Adicionado return
      }

      // Check if passwords match
      const passwordMatch = bcrypt.compareSync(password, user.password);

      if (!passwordMatch) {
        req.flash("message", "Senha inválida!");
        return res.render("auth/login"); // Adicionado return
      }

      // Initialize session
      req.session.userid = user.id;

      req.flash("message", "Autenticação realizada com sucesso!");

      req.session.save(() => {
        res.redirect("/");
      });
    } catch (error) {
      console.log(error); // Corrigido para usar a variável correta
      req.flash("message", "Erro ao realizar login. Tente novamente.");
      res.redirect("/login");
    }
  }

  static register(req, res) {
    res.render("auth/register");
  }

  static async registerPost(req, res) {
    try {
      const { name, email, password, confirmpassword } = req.body;

      // Password match validation
      if (password !== confirmpassword) {
        req.flash("message", "As senhas não conferem, tente novamente!");
        return res.render("auth/register"); // Adicionado return
      }

      // Check if user exists
      const checkIfUserExists = await User.findOne({ where: { email: email } });

      if (checkIfUserExists) {
        req.flash("message", "O e-mail já está em uso.");
        return res.render("auth/register"); // Adicionado return
      }

      // Create a password
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(password, salt);

      const user = {
        name,
        email,
        password: hashedPassword,
      };

      const createdUser = await User.create(user);

      // Initialize session
      req.session.userid = createdUser.id;

      req.flash("message", "Cadastro realizado com sucesso!");

      req.session.save(() => {
        res.redirect("/");
      });
    } catch (error) {
      console.log(error); // Corrigido para usar a variável correta
      req.flash("message", "Erro ao realizar cadastro. Tente novamente.");
      res.render("auth/register");
    }
  }

  static logout(req, res) {
    req.session.destroy(() => {
      res.redirect("/login");
    });
  }
};