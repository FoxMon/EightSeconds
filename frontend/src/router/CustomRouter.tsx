import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import SidebarComponent from "@/components/commonLayout/sidebars/SidebarComponent";
import Footer from "@/components/commonLayout/footer/Footer";
import LoadingCycle from "@/components/loading/LoadingCycle";
import ScrollToTop from "@/util/scrollToTop";

const MainComponentPage = React.lazy(() => import("@/components/pages/Main"));
const LoginComponentPage = React.lazy(() => import("@/components/pages/Auth"));
const ChannelFormComponentPage = React.lazy(
  () => import("@/components/pages/ChannelForm")
);
const ProfileComponentPage = React.lazy(
  () => import("@/components/pages/Profile")
);
const ChannelListPageComponent = React.lazy(
  () => import("@/components/pages/ChannelList")
);
const AboutPloggingComponent = React.lazy(
  () => import("@/components/pages/AboutPlogging")
);
const ChannelPageComponent = React.lazy(
  () => import("@/components/pages/Channel")
);
const NotFoundPageComponent = React.lazy(
  () => import("@/components/pages/NotFound")
);

const CustomRouter = () => {
  return (
    <React.Fragment>
      <SidebarComponent />
      <Suspense fallback={<LoadingCycle />}>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<MainComponentPage />} />
          <Route path="/auth" element={<LoginComponentPage />} />
          <Route path="/about" element={<AboutPloggingComponent />} />
          <Route path="/profile" element={<ProfileComponentPage />} />
          <Route path="/profile/:userId" element={<ProfileComponentPage />} />
          <Route path="/channels" element={<ChannelListPageComponent />} />
          <Route
            path="/channels/create"
            element={<ChannelFormComponentPage />}
          />
          <Route
            path="/channels/:channelId"
            element={<ChannelPageComponent />}
          />
          <Route path="*" element={<NotFoundPageComponent />} />
        </Routes>
      </Suspense>
      <Footer />
    </React.Fragment>
  );
};

export default CustomRouter;
