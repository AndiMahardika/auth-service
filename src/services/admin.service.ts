import AdminRepository from "../repositories/admin.repository";

const AdminService = {
  fetchAllUsers: async () => {
    try {
      const users = await AdminRepository.getAllUsers();

      if(!users || users.length === 0) {
        throw new Error("Users not found")
      }

      return users;
    } catch (error) {
      console.error("Error in fetchAllUsers:", error);
      throw error;
    }
  },

  changeUserRole: async (userId: string, role: string) => {
    try {
      if(role !== "user" && role !== "admin") {
        throw new Error("Invalid role")
      }
  
      if(!userId) {
        throw new Error("Invalid user id")
      }
  
      const user = await AdminRepository.findUserById(userId);
      if(!user) {
        throw new Error("User not found")
      }

      const updatedUser = await AdminRepository.updateUserRole(userId, role);
      return updatedUser
    } catch (error) {
      console.error("Error in changeUserRole:", error);
      throw error;
    }
  },

  removeUser: async (userId: string) => {
    try {
      if(!userId) {
        throw new Error("Invalid user id")
      }
  
      const user = await AdminRepository.findUserById(userId);
      if(!user) {
        throw new Error("User not found")
      }

      return await AdminRepository.deleteUser(userId)
    } catch (error) {
      console.error("Error in removeUser:", error);
      throw error; 
    }
  },

  findUser: async (query: { id?: string; email?: string }) => {
    try {
      if (!query.id && !query.email) {
        throw new Error("Invalid query: ID or email must be provided");
      }
  
      if (query.id) {
        const user = await AdminRepository.findUserById(query.id);
        if (!user) {
          throw new Error("User not found by ID");
        }
        return user;
      }
  
      if (query.email) {
        const user = await AdminRepository.findUserByEmail(query.email);
        if (!user) {
          throw new Error("User not found by email");
        }
        return user;
      }
    } catch (error) {
      console.error("Error in findUser:", error);
      throw error; 
    }
  }
}

export default AdminService;