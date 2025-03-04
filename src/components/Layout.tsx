import Header from "./Header";
import Head from "next/head";

export const Layout = (props: any) => {
  return (
    <>
      <Head>
        <title>Note Sync - Organize Your Thoughts</title>
        <meta name="description" content="Note Sync helps you organize and sync your notes effortlessly across devices." />
        <meta name="keywords" content="note taking, sync notes, productivity, online notes" />
        <meta name="author" content="Your Name or Company" />

        {/* Open Graph Meta Tags (for social media) */}
        <meta property="og:title" content="Note Sync - Organize Your Thoughts" />
        <meta property="og:description" content="Sync your notes seamlessly across all your devices with Note Sync." />
        <meta property="og:image" content="/note-sync-preview.png" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourwebsite.com" />

        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Note Sync - Organize Your Thoughts" />
        <meta name="twitter:description" content="Sync your notes seamlessly across all your devices with Note Sync." />
        <meta name="twitter:image" content="/note-sync-preview.png" />
      </Head>
      <Header />
      <div className="min-h-screen">
        <main>{props.children}</main>
      </div>
    </>
  );
};
