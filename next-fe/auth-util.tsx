import { useEffect } from "react";
import { useRouter } from "next/navigation";

const withAuth = (WrappedComponent: React.ComponentType) => {
  const AuthHOC = (props: any) => {
    const router = useRouter();

    useEffect(() => {
      const checkAuth = async () => {
        const token = localStorage.getItem("authToken");

        if (!token) {
          router.push("/auth/login");
        }

        const res = await fetch("http://localhost:3001/auth/verify", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.status === 401) {
          router.push("/auth/login");
        }
      };

      checkAuth();
    }, [router]);

    return <WrappedComponent {...props} />;
  };

  return AuthHOC;
};

export default withAuth;
