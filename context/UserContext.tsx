import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import api from "../lib/api"; 
import LoadingSpinner from "../components/LoadingSpinner";

interface User {
  id:string;
  userLinkName: string;
  name: string;
  image: string;
  user_link_name: string;
}

interface UserContextType {
  user: User | null;
  loading: boolean;
  token: string | null;
  refetchUser: () => Promise<void>;

}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const storedToken = localStorage.getItem("accessToken");

      if (!storedToken) {
        setLoading(false);
        return;
      }

      setToken(storedToken);

      try {
        const response = await api.get("/account", {
          headers: { Authorization: `Bearer ${storedToken}` },
        });

        setUser(response.data.user);
      } catch (error) {
        console.error("Error fetching user:", error);
        setUser(null);
        setToken(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const refetchUser = async (): Promise<void> => {
    const storedToken = localStorage.getItem("accessToken");

    if (!storedToken) {
      setUser(null);
      setToken(null);
      return;
    }

    setToken(storedToken);

    try {
      const response = await api.get("/account", {
        headers: { Authorization: `Bearer ${storedToken}` },
      });

      setUser(response.data.user);
    } catch (error) {
      console.error("Error refetching user:", error);
      setUser(null);
      setToken(null);
    }
  };

  if (loading) {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <UserContext.Provider value={{ user, loading, token, refetchUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within a UserProvider");
  return context;
};



