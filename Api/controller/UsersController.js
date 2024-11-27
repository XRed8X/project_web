// Registro
// Inicio de sesion
// Actualizar perfil (lider)

import { UserModel } from "../models/UsersModel.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    // Implementar la lógica para registrar un usuario
    try {
        const hash = await bcrypt.hash(req.body.password, 10);
        const user = {
            name: req.body.name,
            email: req.body.email,
            password: hash,
            curp: req.body.curp,
            rol: req.body.rol
        };
        await UserModel.create(user)
        res.status(201).json({ message: "Usuario registrado correctamente" });
    } catch (err) {
        res.status(500).json({ error: "Error al registrar el usuario" });
        console.error(err);
    }

}

export const login = async (req, res) => {
    // Implementar la lógica para iniciar sesión
    try {
        const email = req.body.email;
        const password = req.body.password;

    if(!email || !password) {
        return res.status(400).json({ message: "Debes proporcionar email y contraseña" });
    }
    
    const user = await UserModel.findOne({ email});
    if(!user) {
        return res.status(404).json({ message: "Credenciales no validas" });
    }

    if(!(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: "Credenciales no validas" });
    }


    // Creacion de JSON web token
    const token = await jwt.sign(JSON.stringify(user),process.env.PRIVATE_KEY)
    return res.status(202).json({ token });
    } catch(err) {
        console.error(err);
        return res.status(500).json({ error: "Error al iniciar sesión" });
    }

}

// Actualizar perfil
export const updateProfile = async (req, res) => {
    try {
        // Buscar el usuario por su ID
        const user = await UserModel.findById(req.params._id); 
        
        // Si el usuario no se encuentra
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        console.log(req.body);
    
        // Actualizar los datos del usuario
        user.name = req.body.name ? req.body.name : user.name;
        user.email = req.body.email ? req.body.email : user.email;
        
        // Cambiar contraseña si se proporciona
        if (req.body.password) {
            const newPassword = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(req.body.password, newPassword);
        }
        
        user.curp = req.body.curp ? req.body.curp : user.curp;
        user.rol = req.body.rol ? req.body.rol : user.rol;

        await user.save();

        return res.status(200).json({ message: "Perfil actualizado correctamente", user });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Error al actualizar el usuario", details: err.message });
    }
};