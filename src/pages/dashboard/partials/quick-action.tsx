import { ROUTES } from "@/routes/routes";
import { Briefcase, FileText, Info, Scale, Settings, Users } from "lucide-react";
import { Link } from "react-router";

type QuickAction = {
  title: string;
  href: string;
  icon: React.ElementType;
  iconColor: string;
  iconBg: string;
};

const actions: QuickAction[] = [
  {
    title: "New Service",
    href: ROUTES.service.newService,
    icon: Briefcase,
    iconColor: "text-amber-700",
    iconBg: "bg-amber-100",
  },
  {
    title: "About",
    href: ROUTES.about.editVison,
    icon: Users,
    iconColor: "text-red-600",
    iconBg: "bg-red-100",
  },
  {
    title: "Write Blog",
    href: ROUTES.blog.newBlog,
    icon: FileText,
    iconColor: "text-blue-600",
    iconBg: "bg-blue-100",
  },

  {
    title: "Settings",
    href: ROUTES.orgSettings.base,
    icon: Settings,
    iconColor: "text-orange-600",
    iconBg: "bg-orange-100",
  },
];

export default function QuickActions() {
  return (
    <div className="bg-white p-8 border rounded-3xl">
      <h2 className="mb-8 font-semibold text-2xl text-center">Quick action</h2>

      <div className="gap-6 grid grid-cols-2 md:grid-cols-3">
        {actions.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.title}
              to={item.href}
              className="flex flex-col justify-center items-center hover:shadow-xs px-2 py-4 border rounded-3xl text-center transition"
            >
              <div
                className={`mb-4 flex h-16 w-16 items-center justify-center rounded-2xl ${item.iconBg}`}
              >
                <Icon className={`h-7 w-7 ${item.iconColor}`} />
              </div>

              <p className="font-medium text-xs uppercase tracking-wide">
                {item.title}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
