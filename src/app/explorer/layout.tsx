export default function DashboardLayout({
  children,
  explorerroot,
  login
}: {
  children: React.ReactNode;
  explorerroot: React.ReactNode;
  login: React.ReactNode;
}) {
  const isLoggedIn = true;
  return isLoggedIn ? (
    <div>
      <div>{children}</div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
        <div style={{ width: "100%", display: "flex", justifyContent: "center", marginTop: "20px" }}>
          {explorerroot}
        </div>
      </div>
    </div>
  ) : (
    <div>{login}</div>
  );
}