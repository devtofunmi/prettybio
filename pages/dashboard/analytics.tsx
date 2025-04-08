import { useEffect, useState } from 'react';
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
  const [links, setLinks] = useState<LinkStat[]>([]);
  useEffect(() => {
    setLinks(mockLinks);
  }, []);


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
  const topLink = links.length
  ? links.reduce((max, item) => (item.clickCount > max.clickCount ? item : max), links[0])
  : null;

const topSocial = mockSocialLinks.reduce(
  (max, item) => (item.clickCount > max.clickCount ? item : max),
  mockSocialLinks[0]
);
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

      <div style={{ padding: "24px" }}>
      <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px" }}>📊 Link Analytics</h1>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "16px" }}>
        {links.map((link) => (
          <div key={link.id} style={{ border: "1px solid #ddd", borderRadius: "12px", padding: "16px" }}>
            <p style={{ color: "#666" }}>{link.url}</p>
            <p style={{ fontSize: "18px", fontWeight: "bold" }}>{link.clickCount} clicks</p>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "16px", marginTop: "32px" }}>
        {topLink && (
          <div style={{ border: "1px solid #ddd", borderRadius: "12px", padding: "16px" }}>
            <h2 style={{ fontSize: "18px", fontWeight: "600" }}>🏆 Top Link</h2>
            <p style={{ color: "#666" }}>{topLink.url}</p>
            <p style={{ fontSize: "20px", fontWeight: "bold" }}>{topLink.clickCount} clicks</p>
          </div>
        )}

        <div style={{ border: "1px solid #ddd", borderRadius: "12px", padding: "16px" }}>
          <h2 style={{ fontSize: "18px", fontWeight: "600" }}>🔗 Top Social Link</h2>
          <p style={{ color: "#666" }}>{topSocial.url}</p>
          <p style={{ fontSize: "20px", fontWeight: "bold" }}>{topSocial.clickCount} clicks</p>
        </div>
      </div>

      <div style={{ marginTop: "48px" }}>
        <h2 style={{ fontSize: "20px", fontWeight: "600", marginBottom: "16px" }}>📈 Page Views (Last 5 Days)</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={mockPageViews}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="views" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div style={{ marginTop: "48px" }}>
        <h2 style={{ fontSize: "20px", fontWeight: "600", marginBottom: "16px" }}>🔥 Top 5 Most Clicked Links</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={links.sort((a, b) => b.clickCount - a.clickCount).slice(0, 5)}>
            <XAxis dataKey="url" tick={{ fontSize: 12 }} />
            <YAxis />
            <Tooltip />
            <Bar dataKey="clickCount" fill="#3b82f6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>

      
    </DashboardLayout>
  );
};

export default AnalyticsPage;


