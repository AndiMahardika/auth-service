import UserRepository from "../repositories/user.repository";
import { IUser, IUserUpdate } from "../types/user.entities";
import bcrypt from "bcrypt"

const AuthService = {
  registerUser: async (userData: IUser) => {
    const { name, password, email, role} = userData;

    if (!name || !email) {
      throw new Error("Name and email are required");
    }

    if (password.length < 8) {
      throw new Error("Password should have a minimum of 8 characters");
    }

    try {
      const existingUser = await UserRepository.findUserByEmail(email);
      if (existingUser) {
        throw new Error("Email is already registered");
      }

      const hashPassword = await bcrypt.hash(password, 10)
      const newUser = await UserRepository.createUser({name, email, password: hashPassword, role}) 

      if(!newUser) {
        throw new Error("User not created")
      }

      return newUser;
    } catch (error) {
      console.log(error)
      throw error;
    }
  }, 

  loginUser: async (email: string, password: string) => {
    // VALIDATION
    if (!email || !password) {
      throw new Error("Email and password are required");
    }

    try {
      const user = await UserRepository.findUserByEmail(email);
      if (!user) {
        throw new Error("Invalid Credentials");
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new Error("Invalid Credentials");
      }
  
      return user;
    } catch (error) {
      throw error
    }
  },

  updateUser: async (userId: string, userData: IUserUpdate) => {
    if (userData.password.length < 8) {
      throw new Error("Password should have a minimum of 8 characters");
    }

    if (userData.password) {
      const hashPassword = await bcrypt.hash(userData.password, 10)
      userData.password = hashPassword
    }

    try {
      const updatedUser = await UserRepository.updateUser(userId, userData)
      return updatedUser
    } catch (error) {
      console.log(error)
    }
  }
}

export default AuthService