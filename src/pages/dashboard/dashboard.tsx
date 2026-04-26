import { useGetDashboardData } from "@/services/dashboard/dashboard.api";
import { Briefcase, User2, Users } from "lucide-react";
import StatCard from "./partials/stat-card";
import QuickActions from "./partials/quick-action";

const Dashboard = () => {
  const { data: statsData } = useGetDashboardData();
  const data = statsData?.data;
  const stats = [
    {
      title: "Client Enquiries",
      value: data?.enquiriesCount || "0",
      subtitle: "0% vs last month",
      icon: (
        <div className="bg-orange-50 p-1 rounded-md text-orange-500">
          <Users />
        </div>
      ),
    },
    {
      title: " Team",
      value: data?.teamMemberCount || "0",
      subtitle: "+12% vs last month",
      icon: (
        <div className="bg-blue-50 p-1 rounded-md text-blue-500">
          <User2 />
        </div>
      ),
    },
    {
      title: "Active Services",
      value: data?.serviceCount || "0",
      subtitle: "+23% vs last month",
      icon: (
        <div className="bg-green-50 p-1 rounded-md text-green-500">
          <Briefcase />
        </div>
      ),
    },
  ];
  return (
    <div className="pt-6">
      <div className="gap-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        {stats.map((data) => (
          <StatCard data={data} />
        ))}
      </div>
      
          
           
        <div>
          <QuickActions />
        </div>
      </div>
  
  );
};

export default Dashboard;
