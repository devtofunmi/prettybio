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


