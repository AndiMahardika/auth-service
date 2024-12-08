import express from "express"
import AdminController from "../controllers/admin.controller"
import AuthMiddleware from "../middleware/auth.middleware"
import AdminMiddleware from "../middleware/role.middleware"

const AdminRoutes = express.Router()

AdminRoutes.use(AuthMiddleware)
AdminRoutes.use(AdminMiddleware)

AdminRoutes.get("/", AdminController.handleGetUsers)
AdminRoutes.patch("/role/:id", AdminController.handleUpdateUserRole)
AdminRoutes.delete("/:id", AdminController.handleDeleteUser)
AdminRoutes.post("/find", AdminController.handleFindUser)

export default AdminRoutes;