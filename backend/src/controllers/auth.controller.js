import jwt from "jsonwebtoken";
import { db } from "../config/db.js";

export const login = async (req, res) => {
  const { email, password } = req.body;

  const [users] = await db.query(
    "SELECT * FROM tblEmployees WHERE Email = ?",
    [email]
  );

  if (!users.length) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    { id: users[0].Employee_ID, role: users[0].Role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.json({ token });
};
