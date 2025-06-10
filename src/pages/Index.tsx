
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { DashboardOverview } from "@/components/dashboard/DashboardOverview";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import { CampaignsList } from "@/components/campaigns/CampaignsList";
import { CreateCampaign } from "@/components/campaigns/CreateCampaign";
import { ContactsList } from "@/components/contacts/ContactsList";
import { ImportContacts } from "@/components/contacts/ImportContacts";
import { OrdersList } from "@/components/orders/OrdersList";
import { Analytics } from "@/components/analytics/Analytics";
import { BrandManagement } from "@/components/brands/BrandManagement";
import { Settings } from "@/components/settings/Settings";

interface IndexProps {
  onLogout: () => void;
}

const Index = ({ onLogout }: IndexProps) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground w-full">
      <div className="flex w-full">
        <Sidebar collapsed={sidebarCollapsed} onToggle={setSidebarCollapsed} />
        <div className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
          <Header onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)} />
          <main className="p-6">
            <Routes>
              <Route path="/" element={<DashboardOverview />} />
              <Route path="/campaigns" element={<CampaignsList />} />
              <Route path="/campaigns/create" element={<CreateCampaign />} />
              <Route path="/contacts" element={<ContactsList />} />
              <Route path="/contacts/import" element={<ImportContacts />} />
              <Route path="/orders" element={<OrdersList />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/brands" element={<BrandManagement />} />
              <Route path="/settings" element={<Settings onLogout={onLogout} />} />
            </Routes>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Index;
