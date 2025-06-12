import ResponsiveNavbar from "../../component/Navbar/ResponsiveNavbar";

export default function SubFolderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <ResponsiveNavbar />
      {children}
    </div>
  );
}
