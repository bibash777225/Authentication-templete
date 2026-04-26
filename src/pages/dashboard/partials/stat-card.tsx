const StatCard: React.FC<{
  data: {
    title: string;
    value: string | number;
    icon: React.ReactNode;
    subtitle: React.ReactNode;
  };
}> = ({ data }) => {
  return (
    <div className="flex justify-between bg-white shadow-none p-[1.56rem] border-amber-100 rounded-xl">
      <div className="space-y-2.5">
        <p className="font-semibold text-zinc-400">
          {data.title}
        </p>
        <p className="font-medium text-sm">{data.value}</p>
        <div className="text-sm">{data.subtitle}</div>
      </div>
      <div className="text-amber-500">{data.icon}</div>
    </div>
  );
};

export default StatCard;
