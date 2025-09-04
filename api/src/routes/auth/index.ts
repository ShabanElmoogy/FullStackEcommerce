import { Router } from 'express';
import { createUserSchema, loginSchema } from '../../db/userSchema.js';
import { validateData } from '../../middlewares/validationMiddleware.js';
import { sendError } from '../../utils/errorResponse.js';
import { usersTable } from '../../db/userSchema.js';
import { db } from '../../db/index.js';

import bcryptjs from 'bcryptjs';
import { eq } from 'drizzle-orm';
import jwt from 'jsonwebtoken';

const router = Router();

router.post('/login', validateData(loginSchema), async (req, res) => {

  const { id, ...data } = req.body;

  const [user] = await db.select().from(usersTable).where(eq(usersTable.email, data.email)).limit(1);

  if (user && bcryptjs.compareSync(data.password, user.password)) {
    const { password, ...safeUser } = user; // 👈 remove password

    //generate token
    const token = jwt.sign(safeUser, process.env.JWT_SECRET_KEY, { expiresIn: '30d' });
    res.status(200).json({ token, safeUser });
    res.cookie('token', token, { httpOnly: true }); // 👈 set cookie
  } else {
    sendError(res, 401, "login", 'Invalid credentials');
    return;
  }
});

router.post('/register', validateData(createUserSchema), async (req, res) => {

  try {
    const { id, ...data } = req.body; // 👈 ignore id from frontend
    const hashedPassword = await bcryptjs.hash(data.password, 10);

    //check if user already exists
    const existingUser = await db.select().from(usersTable).where(eq(usersTable.email, data.email)).limit(1);
    if (existingUser.length > 0) {
      return sendError(res, 400, "email", "User already exists");
    }

    const [user] = await db.insert(usersTable).values({ ...data, password: hashedPassword }).returning();

    res.status(201).json({ user });
  } catch (error) {
    console.error("Create user error:", error);
    return res.status(500).send({ error: "Internal Server Error" });
  }
});



export default router;