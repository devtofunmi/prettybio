import React, { useEffect, useState } from "react";
import DashboardLayout from "./DashboardLayout";
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

// Mock Data
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

const AnalyticsPage: React.FC = () => {
  const [links, setLinks] = useState<LinkStat[]>([]);

  useEffect(() => {
    setLinks(mockLinks);
  }, []);

  const topLink = links.length
    ? links.reduce((max, item) =>
        item.clickCount > max.clickCount ? item : max, links[0])
    : null;

  const topSocial = mockSocialLinks.reduce((max, item) =>
    item.clickCount > max.clickCount ? item : max, mockSocialLinks[0]);

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        

        <div className="text-gray-800">
          <h1 className="text-2xl font-bold mb-6">📊 Link Analytics</h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {links.map((link) => (
              <div key={link.id} className="border rounded-xl p-4 shadow-sm">
                <p className="text-gray-600 break-words">{link.url}</p>
                <p className="text-lg font-semibold">{link.clickCount} clicks</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 text-gray-800">
          {topLink && (
            <div className="border rounded-xl p-4 shadow-sm">
              <h2 className="text-lg font-semibold">🏆 Top Link</h2>
              <p className="text-gray-600 break-words">{topLink.url}</p>
              <p className="text-xl font-bold">{topLink.clickCount} clicks</p>
            </div>
          )}
          <div className="border rounded-xl p-4 shadow-sm">
            <h2 className="text-lg font-semibold">🔗 Top Social Link</h2>
            <p className="text-gray-600 break-words">{topSocial.url}</p>
            <p className="text-xl font-bold">{topSocial.clickCount} clicks</p>
          </div>
        </div>

        <div className="mt-12 text-gray-800">
          <h2 className="text-xl font-semibold mb-4">📈 Page Views (Last 5 Days)</h2>
          <div className="w-full h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockPageViews}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="views"
                  stroke="#10b981"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="mt-12 text-gray-800">
          <h2 className="text-xl font-semibold mb-4">🔥 Top 5 Most Clicked Links</h2>
          <div className="w-full h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={[...links].sort((a, b) => b.clickCount - a.clickCount).slice(0, 5)}
              >
                <XAxis dataKey="url" tick={{ fontSize: 12 }} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="clickCount" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AnalyticsPage;



