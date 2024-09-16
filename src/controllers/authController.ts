import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../database/models/user';
import { z } from 'zod';

const JWT_SECRET = process.env.JWT_SECRET || 'default_secret';

// Função para gerar um token JWT
const generateToken = (userId: number, email: string) => {
  return jwt.sign({ id: userId, email }, JWT_SECRET, { expiresIn: '1h' });
};

// Esquema de validação Zod para registro
const userSchema = z.object({
  email: z.string().email({ message: "E-mail inválido." }),
  password: z.string().min(6, { message: "A senha deve ter pelo menos 6 caracteres." }),
});

export const register = async (req: Request, res: Response) => {
  try {
    // Valida os dados com Zod
    const parsedData = userSchema.parse(req.body);

    const { email, password } = parsedData;

    // Verifica se o e-mail já existe
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'E-mail já cadastrado.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      email,
      password: hashedPassword,
    });

    const token = generateToken(newUser.id, newUser.email);

    res.status(201).json({ message: 'Usuário registrado com sucesso.', token });
  } catch (error) {
    // Verifica se o erro é de validação do Zod
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: "Dados inválidos", errors: error.errors });
    }
    res.status(500).json({ message: 'Erro ao registrar o usuário.', error });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const parsedData = userSchema.parse(req.body);

    const { email, password } = parsedData;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: 'E-mail ou senha inválidos.' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'E-mail ou senha inválidos.' });
    }

    const token = generateToken(user.id, user.email);

    res.status(200).json({ message: 'Login bem-sucedido.', token });
  } catch (error) {
    if (error instanceof z.ZodError) { // Verifica se o erro é de validação do Zod
      return res.status(400).json({ message: "Dados inválidos", errors: error.errors });
    }
    res.status(500).json({ message: 'Erro ao fazer login.', error });
  }
};
