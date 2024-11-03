import {
  LayoutDashboard,
  ShoppingCart,
  Users,
  Package,
  FileText,
  BarChart2,
  Settings,
  CreditCard,
  DollarSign,
  Briefcase,
  BarChart,
  FileBarChart,
  UserCircle,
  Building,
  FileStack,
  HelpCircle,
  PencilLine,
  Contact,
  Mail,
} from "lucide-react";
export const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  {
    icon: PencilLine,
    label: "Posts",
    href: "#",
    subItems: [
      { label: "New Post", href: "/dashboard/posts/new-post" },
      { label: "Manage Posts", href: "/dashboard/posts/manage-posts" },
      { label: "New Category", href: "/dashboard/categories/new-category" },
      {
        label: "Category List",
        href: "/dashboard/categories/manage-categories",
      },
    ],
  },
  { icon: Contact, label: "Contacts", href: "/dashboard/contacts" },
  { icon: Mail, label: "Newsletters", href: "/dashboard/newsletters" },
  { icon: Settings, label: "Settings", href: "/dashboard/settings" },
];
