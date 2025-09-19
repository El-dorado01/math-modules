import AppHeader from "@/components/app-header";
import { AppSidebar } from "@/components/app-sidebar";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { auth0 } from "@/lib/auth0";

const Page: React.FC = async () => {
  const session = await auth0.getSession();
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AppHeader title="Dashboard" />
        <h1>Welcome to Dashboard</h1>
        <div className="flex flex-col-reverse lg:flex-row flex-1 gap-4 py-8 pt-10 px-4 text-sm">
          <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6">Profile</h2>
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-green-700">
                Email: {session?.user.email}
              </h3>
              <p>Name: {session?.user.name}</p>
              <p>
                Email Verified:{" "}
                {session?.user.email_verified ? (
                  <span className="text-green-500">true</span>
                ) : (
                  <span className="text-red-500">false</span>
                )}
              </p>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default Page;
