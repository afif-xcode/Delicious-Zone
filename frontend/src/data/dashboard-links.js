import { ROLE } from "../utils/constants"

export const sidebarLinks = [
  {
    id: 1,
    name: "My Profile",
    path: "/dashboard/my-profile",
    icon: "VscAccount",
  },
  {
    id: 2,
    name: "Dashboard",
    path: "/dashboard/admin",
    type: ROLE.ADMIN,
    icon: "VscDashboard",
  },
  {
    id: 3,
    name: "My Courses",
    path: "/dashboard/admin/products",
    type: ROLE.ADMIN,
    icon: "VscVm",
  },
  {
    id: 4,
    name: "Add Course",
    path: "/dashboard/add-products",
    type: ROLE.ADMIN,
    icon: "VscAdd",
  },
  {
    id: 5,
    name: "Orders",
    path: "/dashboard/enrolled-courses",
    type: ROLE.CUSTOMER,
    icon: "VscPackage",
  },
  {
    id: 7,
    name: "Cart",
    path: "/dashboard/cart",
    type: ROLE.CUSTOMER,
    icon: "VscHeart",
  },
]
