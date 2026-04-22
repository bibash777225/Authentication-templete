import { useGetDashboardData } from "@/services/dashboard/dashboard.api";
import { Briefcase, User2, Users } from "lucide-react";
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import StatCard from "./partials/stat-card";
import QuickActions from "./partials/quick-action";

const graphData = [
  {
    name: "Jan",
    uv: 4000,
  },
  {
    name: "Feb",
    uv: 3000,
  },
  {
    name: "Mar",
    uv: 4000,
  },
];

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
      <div className="gap-5 grid grid-cols-2 mt-5">
        <div className="bg-white shadow-xs p-3 pt-8 border rounded-md">
          <div>
            <p className="font-semibold text-2xl">Traffic Analytics</p>
            <p className="mt-1 mb-4 text-muted-foreground/80 text-sm">
              Visitor Growth Analysis.
            </p>
          </div>
          <ResponsiveContainer width="100%" aspect={1.618} maxHeight={500}>
            <AreaChart
              data={graphData}
              margin={{
                top: 20,
                right: 0,
                left: 0,
                bottom: 0,
              }}
            >
              <XAxis dataKey="name" />
              <YAxis width="auto" />
              <Area
                type="monotone"
                dataKey="uv"
                stroke="#8884d8"
                fill="#8884d8"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div>
          <QuickActions />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
