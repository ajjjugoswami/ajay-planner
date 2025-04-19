import { Layout } from "@/components/Layout";
import TimeConverter from "@/components/timeConverter/TimeConverter";

export default function Home() {
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br dark:bg-gray-900 p-4 sm:p-8">
        <TimeConverter />
      </div>
    </Layout>
  );
}
