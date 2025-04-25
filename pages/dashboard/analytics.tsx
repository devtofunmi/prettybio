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
import { useUser } from '../../context/UserContext';
import LoadingSpinner from "../../components/LoadingSpinner";

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

const AnalyticsPage: React.FC = () => {
  const [links, setLinks] = useState<LinkStat[]>([]);
  const [socialLinks, setSocialLinks] = useState<SocialStat[]>([]);
  const [pageViews, setPageViews] = useState<PageView[]>([]);
  const [loading, setLoading] = useState(true);
  const {  token } = useUser();

  useEffect(() => {
    const fetchAnalytics = async () => {
      if (!token) return;
  
      try {
        const [linkRes, socialRes, viewsRes] = await Promise.all([
          fetch(`https://prettybioo.up.railway.app/analytics/links`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
          fetch(`https://prettybioo.up.railway.app/analytics/social-links`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
          fetch(`https://prettybioo.up.railway.app/analytics/page-views`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
        ]);
  
        const [linksData, socialData, viewsData] = await Promise.all([
          linkRes.json(),
          socialRes.json(),
          viewsRes.json(),
        ]);
  
        setLinks(linksData);
        setSocialLinks(socialData);
        setPageViews(
          viewsData.map((v: PageView) => ({
            ...v,
            date: new Date(v.date).toISOString().split("T")[0],
          }))
        );
      } catch (error) {
        console.error("Error fetching analytics:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchAnalytics();
  }, [token]);
  

  const topLink = links.length
    ? links.reduce((max, item) =>
        item.clickCount > max.clickCount ? item : max, links[0])
    : null;

  const topSocial = socialLinks.length
    ? socialLinks.reduce((max, item) =>
        item.clickCount > max.clickCount ? item : max, socialLinks[0])
    : null;

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6 text-gray-800">
        {loading ? (
          <div className="flex justify-center items-center h-screen">
          <LoadingSpinner />
          </div>
        ) : (
          <>
        <h1 className="text-2xl font-bold mb-6">Link Analytics</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {links.map((link) => (
                <div key={link.id} className="border rounded-xl p-4 shadow-sm">
                  <p className="text-gray-600 break-words">{link.url}</p>
                  <p className="text-lg font-semibold">{link.clickCount} clicks</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
              {topLink && (
                <div className="border rounded-xl p-4 shadow-sm">
                  <h2 className="text-lg font-semibold">Top Link</h2>
                  <p className="text-gray-600 break-words">{topLink.url}</p>
                  <p className="text-xl font-bold">{topLink.clickCount} clicks</p>
                </div>
              )}
              {topSocial && (
                <div className="border rounded-xl p-4 shadow-sm">
                  <h2 className="text-lg font-semibold">Top Social Link</h2>
                  <p className="text-gray-600 break-words">{topSocial.url}</p>
                  <p className="text-xl font-bold">{topSocial.clickCount} clicks</p>
                </div>
              )}
            </div>

            <div className="mt-12">
              <h2 className="text-xl font-semibold mb-4">Page Views (Last 5 Days)</h2>
              <div className="w-full h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={pageViews}>
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

            <div className="mt-12">
              <h2 className="text-xl font-semibold mb-4">Top 5 Most Clicked Links</h2>
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

            <div className="mt-12 pb-[50px] md:pb-0">
              <h2 className="text-xl font-semibold mb-4">Top 5 Social Links</h2>
              <div className="w-full h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={[...socialLinks].sort((a, b) => b.clickCount - a.clickCount).slice(0, 5)}
                  >
                    <XAxis dataKey="url" tick={{ fontSize: 12 }} />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="clickCount" fill="#6366f1" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
};

export default AnalyticsPage;