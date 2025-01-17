const express = require("express");
const multer = require("multer");
const userController = require("../controllers/userController");

const router = express.Router();
const upload = multer();

// Rota de cadastro de usuário
router.post("/create", userController.createUser);

// Rota de login de usuário
router.post("/login", userController.loginUser);

// Rota para upload de avatar
router.put("/:id/avatar", upload.single("avatar"), userController.uploadAvatar);

// Rota para obter um perfil de usuário
router.get("/:id", userController.getUser);

// Rota para atualizar um usuário
router.put("/:id", userController.updateUser);

// Rota para deletar um usuário
router.delete("/:id", userController.deleteUser);

module.exports = router;
