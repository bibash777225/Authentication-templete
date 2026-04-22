const StatCard: React.FC<{
  data: {
    title: string;
    value: string | number;
    icon: React.ReactNode;
    subtitle: React.ReactNode;
  };
}> = ({ data }) => {
  return (
    <div className="flex justify-between bg-white shadow-xs p-[1.56rem] border rounded-md">
      <div className="space-y-2.5">
        <p className="font-semibold text-muted-foreground/80 text-lg">
          {data.title}
        </p>
        <p className="font-bold text-xl">{data.value}</p>
        <div className="text-sm">{data.subtitle}</div>
      </div>
      <div>{data.icon}</div>
    </div>
  );
};

export default StatCard;
