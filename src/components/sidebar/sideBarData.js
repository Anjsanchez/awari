import {
  RiUserSmileFill,
  RiShoppingBag2Fill,
  RiBankCardFill,
  RiBillFill,
} from "react-icons/ri";
import { MdDashboard } from "react-icons/md";
import { BsFillHouseDoorFill } from "react-icons/bs";

export const sideBarData = [
  {
    title: "General",
    id: 0,
    subNav: [
      {
        subTitle: "Dashboard",
        icon: <MdDashboard />,
        path: "/",
        id: 1,
      },
    ],
  },
  {
    title: "Reservation ",
    id: 0,
    subNav: [
      {
        subTitle: "Make a booking",
        icon: <MdDashboard />,
        path: "/",
        id: 1,
      },
    ],
  },
  {
    title: "Resource Management",
    id: 2,
    subNav: [
      {
        subTitle: "Users",
        icon: <RiUserSmileFill />,
        id: 3,
        subNav: [
          { title: "Employees", path: "/a/user-management/employees", id: 4 },
          {
            title: "Customers",
            path: "/a/user-management/customers",
            id: 5,
          },
        ],
      },
      {
        subTitle: "Rooms",
        icon: <BsFillHouseDoorFill />,
        id: 6,
        subNav: [
          {
            title: "Variants",
            path: "/a/room-management/room-variants",
            id: 7,
          },
          {
            title: "Rooms",
            path: "/a/room-management/rooms",
            id: 8,
          },
          {
            title: "Pricings",
            path: "/a/room-management/room-pricings",
            id: 9,
          },
        ],
      },
      {
        subTitle: "Products",
        icon: <RiShoppingBag2Fill />,
        id: 10,
        subNav: [
          {
            title: "Category",
            path: "/a/product-management/category",
            id: 11,
          },
          {
            title: "Products",
            path: "/a/product-management/products",
            id: 12,
          },
        ],
      },
    ],
  },
  {
    title: "System Functionality",
    id: 13,
    subNav: [
      {
        subTitle: "Payments",
        icon: <RiBankCardFill />,
        id: 14,
        path: "/a/system-functionality/payments",
      },
      {
        subTitle: "Discounts",
        icon: <RiBillFill />,
        id: 15,
        path: "/a/system-functionality/discounts",
      },
    ],
  },
];
