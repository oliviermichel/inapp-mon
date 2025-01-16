export default function DashboardLayout({
  children,
  healthmonitor,
  messagemonitor,
  notifications,
  login
}: {
    children: React.ReactNode;
    healthmonitor: React.ReactNode;
    messagemonitor: React.ReactNode;
    notifications: React.ReactNode;
    login: React.ReactNode;
}) {
    const isLoggedIn = true;
  return isLoggedIn ? (
<div>
    <div>{children}</div>
    <div style={{ display: "flex" }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
            <div>{healthmonitor}</div>
            <div>{notifications}</div>
        </div>
        <div style={{ display: "flex", flex: 1 }}>{messagemonitor}</div>
    </div>
</div>  
  ) : (
    <div>{login}</div>
  );
}