/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { Metrics } from './components/Metrics';
import { MainActions } from './components/MainActions';
import { VerseCard } from './components/VerseCard';
import { LatestVideoCard } from './components/LatestVideoCard';
import { CommunityCard } from './components/CommunityCard';
import { FreeArchiveCard } from './components/FreeArchiveCard';
import { ProductsSection } from './components/ProductsSection';
import { SupportCard } from './components/SupportCard';
import { SupportModal } from './components/SupportModal';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';
import { YouTubeApiResponse } from './types';

export default function App() {
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [youtubeData, setYoutubeData] = useState<YouTubeApiResponse | null>(null);
  const [isLoadingYoutube, setIsLoadingYoutube] = useState(true);

  useEffect(() => {
    let isMounted = true;
    fetch('/api/youtube')
      .then((res) => res.json())
      .then((data: YouTubeApiResponse) => {
        if (isMounted && data && data.success) {
          setYoutubeData(data);
        }
      })
      .catch((err) => {
        console.error('Failed to load YouTube API data:', err);
      })
      .finally(() => {
        if (isMounted) setIsLoadingYoutube(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  return (
    <div className="w-full min-h-screen bg-[#050505] text-[#F5F2E8] flex flex-col items-center justify-start overflow-x-hidden selection:bg-[#C89B2C]/30 selection:text-[#F5F2E8]">
      {/* Centered Column Container (Width bounded between 600px - 680px) */}
      <main className="w-full max-w-[640px] px-0 sm:px-2 py-4 flex flex-col">
        {/* Header */}
        <Header onShowToast={showToast} />

        {/* Metrics */}
        <Metrics metrics={youtubeData?.metrics} isLoading={isLoadingYoutube} />

        {/* Main Actions */}
        <MainActions
          onOpenSupportModal={() => setIsSupportModalOpen(true)}
          latestVideoLink={youtubeData?.latestVideo?.link}
        />

        {/* Verse & Meditation */}
        <VerseCard onShowToast={showToast} />

        {/* Latest Video Card */}
        <LatestVideoCard
          latestVideo={youtubeData?.latestVideo}
          isLoading={isLoadingYoutube}
        />

        {/* Community Card */}
        <CommunityCard />

        {/* Free Archive Card */}
        <FreeArchiveCard />

        {/* Products Section */}
        <ProductsSection />

        {/* Support Card */}
        <SupportCard onOpenModal={() => setIsSupportModalOpen(true)} />

        {/* Footer */}
        <Footer />
      </main>

      {/* Support Modal */}
      <SupportModal
        isOpen={isSupportModalOpen}
        onClose={() => setIsSupportModalOpen(false)}
        onShowToast={showToast}
      />

      {/* Feedback Toast */}
      <Toast message={toastMessage} />
    </div>
  );
}
