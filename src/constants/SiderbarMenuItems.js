import {
  UserIcon,
  UsersIcon,
  LayoutDashboardIcon,
  ListPlus,
  Users,
  LayoutList,
  ListChecks,
  TableProperties,
  CircleDollarSign,
  Factory,
  Layers,
  Contact2,
} from "lucide-react";

export default [
  {
    key: "navigation",
    isTitle: true,
  },
  {
    key: "dashboard",
    icon: LayoutDashboardIcon,
    // badge: {
    //     variant: 'success',
    //     text: '9+'
    // },
    url: "/dashboard",
  },
  {
    key: "users",
    icon: UsersIcon,
    url: "/users",
    authenticate: {
      type: "usertype",
      value: ["admin", "boss"],
    },
  },
  {
    key: "pending-orders",
    icon: LayoutList,
    url: "/pending-orders",
    authenticate: {
      type: "usertype",
      value: [
        "admin",
        "boss",
        "production_manager",
      ],
    },
  },
  {
    key: "apps",
    isTitle: true,
  },
  {
    key: "apps-proforma-invoice",
    icon: ListPlus,
    url: "/apps/proforma-invoice",
    authenticate: {
      type: "usertype",
      value: [
        "admin",
        "boss",
        "domestic_market_manager",
        "foreign_market_manager",
        "domestic_market_marketing",
        "foreign_market_marketing",
        "stock_manager",
        "production_manager",
      ],
    },
  },
  {
    key: "apps-customers",
    icon: Contact2,
    url: "/apps/customers",
  },
  {
    key: "apps-products",
    icon: TableProperties,
    url: "/apps/products",
  },
  {
    key: "apps-orders",
    icon: ListChecks,
    url: "/apps/orders",
    authenticate: {
      type: "usertype",
      value: [
        "admin",
        "boss",
        "domestic_market_manager",
        "foreign_market_manager",
        "domestic_market_marketing",
        "foreign_market_marketing",
        "stock_manager",
        "production_manager",
      ],
    },
  },
  {
    key: "apps-stocks",
    icon: Layers,
    url: "/apps/stocks",
    authenticate: {
      type: "usertype",
      value: ["admin", "stock_manager", "boss"],
    },
  },
  {
    key: "apps-productions",
    icon: Factory,
    url: "/apps/productions",
    authenticate: {
      type: "usertype",
      value: ["admin", "stock_manager", "boss"],
    },
  },
  {
    key: "apps-materials",
    icon: CircleDollarSign,
    url: "/apps/materials",
    authenticate: {
      type: "usertype",
      value: [
        "admin",
        "boss",
        "domestic_market_manager",
        "foreign_market_manager",
        "domestic_market_marketing",
        "foreign_market_marketing",
        "stock_manager",
        "production_manager",
      ],
    },
  },
  {
    key: "apps-expenses",
    icon: Factory,
    url: "/apps/expenses",
    authenticate: {
      type: "usertype",
      value: [
        "admin",
        "boss",
        "domestic_market_manager",
        "foreign_market_manager",
        "domestic_market_marketing",
        "foreign_market_marketing",
        "stock_manager",
      ],
    },
  },
  {
    key: "apps-rawmaterials-stocks",
    icon: Layers,
    url: "/apps/rawmaterials-stocks",
    authenticate: {
      type: "usertype",
      value: [
        "admin",
        "boss",
        "domestic_market_manager",
        "foreign_market_manager",
        "domestic_market_marketing",
        "foreign_market_marketing",
        "stock_manager",
      ],
    },
  },
];
