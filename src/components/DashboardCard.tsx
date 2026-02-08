interface Props {
  title: string;
  value: string;
  icon: React.ReactNode;
}

const DashboardCard = ({ title, value, icon }: Props) => {
  return (
    <div className="bg-white/5 backdrop-blur rounded-xl p-6 border border-white/10 hover:border-primary transition">
      <div className="flex justify-between items-center mb-4">
        <p className="text-sm text-muted-foreground">{title}</p>
        <span className="text-primary">{icon}</span>
      </div>
      <h2 className="text-3xl font-bold">{value}</h2>
    </div>
  );
};

export default DashboardCard;
