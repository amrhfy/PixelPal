import { 
  RiTeamLine, 
  RiUserFollowLine,
  RiProjectorLine,
  RiPlayCircleLine
} from 'react-icons/ri';

interface AdminStatsProps {
  stats: {
    totalUsers: number;
    activeUsers: number;
    totalProjects: number;
    activeProjects: number;
  };
}

export default function AdminStats({ stats }: AdminStatsProps) {
  const statCards = [
    {
      title: 'Total Users',
      value: stats.totalUsers,
      icon: RiTeamLine,
      color: 'bg-blue-500/10 text-blue-500'
    },
    {
      title: 'Active Users',
      value: stats.activeUsers,
      icon: RiUserFollowLine,
      color: 'bg-green-500/10 text-green-500'
    },
    {
      title: 'Total Projects',
      value: stats.totalProjects,
      icon: RiProjectorLine,
      color: 'bg-purple-500/10 text-purple-500'
    },
    {
      title: 'Active Projects',
      value: stats.activeProjects,
      icon: RiPlayCircleLine,
      color: 'bg-orange-500/10 text-orange-500'
    }
  ];

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {statCards.map((stat, index) => (
        <div
          key={stat.title}
          className="p-6 rounded-xl border border-border bg-card"
        >
          <div className="flex items-center justify-between">
            <div className={`p-2 rounded-lg ${stat.color}`}>
              <stat.icon className="w-6 h-6" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-medium text-muted-foreground">{stat.title}</h3>
            <p className="text-2xl font-semibold mt-1">{stat.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
} 
