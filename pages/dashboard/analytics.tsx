import DashboardLayout from './DashboardLayout';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
} from "recharts";

const AnalyticsPage: React.FC = () => {
  interface LinkStat {
    id: string;
    url: string;
    clickCount: number;
  }
  
  interface SocialStat {
    id: string;
    url: string;
    clickCount: number;
  }
  
  interface PageView {
    date: string;
    views: number;
  }

  const mockLinks: LinkStat[] = [
    { id: "1", url: "https://example.com/1", clickCount: 100 },
    { id: "2", url: "https://example.com/2", clickCount: 80 },
    { id: "3", url: "https://example.com/3", clickCount: 60 },
    { id: "4", url: "https://example.com/4", clickCount: 40 },
    { id: "5", url: "https://example.com/5", clickCount: 20 },
  ];
  
  const mockSocialLinks: SocialStat[] = [
    { id: "1", url: "https://twitter.com/user", clickCount: 40 },
    { id: "2", url: "https://linkedin.com/in/user", clickCount: 28 },
  ];
  
  const mockPageViews: PageView[] = [
    { date: "2025-04-01", views: 10 },
    { date: "2025-04-02", views: 25 },
    { date: "2025-04-03", views: 15 },
    { date: "2025-04-04", views: 30 },
    { date: "2025-04-05", views: 20 },
  ];
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="p-4 border rounded-lg hover:shadow-md">
          <h2 className="text-lg font-bold text-gray-800">Total Views</h2>
          <p className="text-gray-600">123,456</p>
        </div>

        <div className="p-4 border rounded-lg hover:shadow-md">
          <h2 className="text-lg font-bold text-gray-800">Link Clicks</h2>
          <p className="text-gray-600">78,910</p>
        </div>
      </div>

      
    </DashboardLayout>
  );
};

export default AnalyticsPage;


