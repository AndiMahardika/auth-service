import { User } from "../models/user.schema";

const AdminRepository = {
  getAllUsers: async () => {
    try {
      const users = await User.find();
      return users;
    } catch (error) {
      console.log(error);
    }
  },

  updateUserRole: async (userId: string, role: string) => {
    try {
      return await User.findByIdAndUpdate(userId, {role}, {new: true})
    } catch (error) {
      console.log(error)
    }
  },

  deleteUser: async (userId: string) => {
    try {
      return await User.findByIdAndDelete(userId)
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
}

export default AdminRepository;