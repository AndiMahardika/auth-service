import { User } from "../models/user.schema";
import { IUser, IUserUpdate } from "../types/user.entities";

export const UserRepository = {
  createUser: async (userData: IUser) => {
    try {
      const newUser = new User(userData)
      const saveUser = await newUser.save();
      return saveUser
    } catch (error) { 
      console.log(error)
    }
  },
  findUserById: async (userId: string) => {
    try {
      const user = await User.findById(userId)
      return user;
    } catch (error) {
      console.log(error)
    }
  },

  findUserByEmail: async (email: string) => {
    try {
      const user = await User.findOne({email})
      return user
    } catch (error) {
      console.log(error);
    }
  },

  updateUser: async (userId: string, userData: IUserUpdate) => {
    try {
      const updatedUser = await User.findByIdAndUpdate(userId, userData, { new: true })
      return updatedUser
    } catch (error) {
      console.log(error)
    }
  }
}

export default UserRepository