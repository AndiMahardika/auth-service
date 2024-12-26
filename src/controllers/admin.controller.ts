import AdminService from "../services/admin.service";

const AdminController = {
  handleGetUsers: async (req: any, res: any) => {
    try {
      const users = await AdminService.fetchAllUsers();
      res.status(200).json({message: "Users fetched successfully", users});
    } catch (error) {
      if(error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  },

  handleUpdateUserRole: async (req: any, res: any) => {
    const { id } = req.params;
    const { role } = req.body;
    try {
      const updatedUser = await AdminService.changeUserRole(id, role);
      res.status(200).json({message: "User role updated successfully", updatedUser});
    } catch (error) {
      if(error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  },

  handleDeleteUser: async (req: any, res: any) => {
    const { id } = req.params;
    try {
      const deletedUser = await AdminService.removeUser(id);
      res.status(200).json({message: "User deleted successfully", deletedUser});
    } catch (error) {
      if(error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  },

  handleFindUser: async (req: any, res: any) => {
    const { id, email } = req.body;
    try {
      const user = await AdminService.findUser({id, email});
      res.status(200).json({message: "User found successfully", user});
    } catch (error) {
      if(error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  }
}

export default AdminController;