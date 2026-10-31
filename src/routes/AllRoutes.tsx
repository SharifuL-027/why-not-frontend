import { Routes, Route, Outlet } from "react-router-dom";
import Hero from "../componnents/Main/Hero";
import HowItWorks from "../componnents/Main/HowItworks";
import WhyItMatters from "../componnents/Main/WhyItMatters";
import WhatYouGet from "../componnents/Main/WhatYouGet";
import FAQ from "../componnents/Main/FAQ";
import InstrumentList from "../componnents/Pages/Instrumentlist";
import InstrumentDetailsPage from "../componnents/Pages/Instrumentdetailspage";
import Result from "../componnents/Pages/Result";
import Quiz from "../componnents/Pages/Quiz";
import AuthPage from "../componnents/Auth/AuthPage";
import AdminHome from "../componnents/ADMIN/AdminHome";
import AdminDashboard from "../componnents/ADMIN/AdminDashboard";
import Navbar from "../componnents/navbar/Navbar";
import Footer from "../componnents/Main/Footer";
import AmBatteryList from "../componnents/ADMIN/AmBattery/Ambatterylist";
import AmBatteryCreate from "../componnents/ADMIN/AmBattery/Ambatterycreate";
import AmItemManager from "../componnents/ADMIN/AmBattery/Amitemmanager";
import AmBatteryQuiz from "../componnents/Pages/AmBatteryQuiz";
import AmBatteryResult from "../componnents/Pages/Ambatteryresult";
import AmBatteryListPublic from "../componnents/Pages/Ambatterylistpublic";
import AmBatteryDetailsPublic from "../componnents/Pages/AmBatteryDetailsPublic";
import ImageQuizList from "../componnents/ADMIN/ImageQuizList";
import ImageQuizCreate from "../componnents/ADMIN/ImageQuizCreate";
import ImageQuizItemManager from "../componnents/ADMIN/ImageQuizItemManager";
import ImageQuizListPublic from "../componnents/Pages/ImageQuizListPublic";
import ImageQuizDetailsPublic from "../componnents/Pages/ImageQuizDetailsPublic";
import ImageQuizTake from "../componnents/Pages/ImageQuizTake";
import ImageQuizResult from "../componnents/Pages/ImageQuizResult";
import OnlineCounselling from "../componnents/Pages/OnlineCounselling";
import YoungGeneration from "../componnents/Pages/YoungGenaration";
import PsychologicalAwareness from "../componnents/Pages/PsychologicalAwareness";
import AboutUs from "../componnents/Pages/AboutUs";
import ArtTherapy from "../componnents/Pages/ArtTherapy";
import OpeningPost from "../componnents/Main/OpeningPost";
import ScrollToTop from "../componnents/ScrollToTop";
import StandaloneMcrrReport from "../componnents/Pages/StandaloneMcrrReport";
import StandaloneRrsReport from "../componnents/Pages/StandaloneRrsReport";
import StandaloneMhsReport from "../componnents/Pages/StandaloneMhsReport";

const MainLayout = () => {
  return (
    // পুরো লেআউটটিকে একটি ফ্লেক্স কন্টেইনারে রাখা হয়েছে এবং নেভি ব্লু ব্যাকগ্রাউন্ড দেওয়া হয়েছে
    <div className="relative min-h-screen bg-[#F9F6F0] w-full flex flex-col">
      
      <Navbar />

      <div className="flex-1 flex flex-col lg:pl-80 w-full pt-[130px] lg:pt-0">
        <ScrollToTop/>
        
        <main className="flex-1 w-full min-h-screen relative">
          <Outlet />
        </main>

        <Footer />
        
      </div>
</div>
  );
};

const AllRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <OpeningPost/>
              <HowItWorks />
              <WhyItMatters />
              <WhatYouGet />
              <FAQ />
            </>
          }
        />
        <Route path="/counselling" element={<OnlineCounselling />} />
        <Route path="/young-generation" element={<YoungGeneration />} />
        <Route path="/awareness" element={<PsychologicalAwareness />} />
        <Route path="/contact" element={<AboutUs />} />
        <Route path="/arttherapy" element={<ArtTherapy/>} />
        {/* Sakib Start */}
        <Route path="/tests" element={<InstrumentList />} />
        <Route path="/tests/:slug" element={<InstrumentDetailsPage />} />
        <Route path="/tests/:slug/quiz" element={<Quiz />} />
        <Route path="/tests/:slug/result/:responseId" element={<Result />} />
        
        {/* AuthPage সাধারণত Navbar ছাড়াই দেখানো হয়, তাই চাইলে একে MainLayout এর বাইরে রাখতে পারেন।
            তবে আপনি যদি চান AuthPage এও Navbar থাকুক, তবে এখানেই ঠিক আছে। */}
        <Route path="/authpage" element={<AuthPage />} />
        
        <Route path="/selection" element={<AmBatteryListPublic />} />
        <Route path="/selection/:slug" element={<AmBatteryDetailsPublic />} />
        <Route path="/selection/:slug/quiz" element={<AmBatteryQuiz />} />
        <Route path="/image-quiz" element={<ImageQuizListPublic />} />
        <Route path="/image-quiz/:slug" element={<ImageQuizDetailsPublic />} />
        <Route path="/image-quiz/:slug/quiz" element={<ImageQuizTake />} />
        <Route
          path="/image-quiz/:slug/result/:responseId"
          element={<ImageQuizResult />}
        />
        <Route
          path="/selection/:slug/result/:responseId"
          element={<AmBatteryResult />}
        />

        {/* Dedicated Standalone MCRR-BD Reporting Routes */}
        <Route path="/mcrr-report" element={<StandaloneMcrrReport />} />
        <Route path="/mcrr-report/:responseId" element={<StandaloneMcrrReport />} />

        {/* Dedicated Standalone RRS-24 Reporting Routes */}
        <Route path="/rrs-report" element={<StandaloneRrsReport />} />
        <Route path="/rrs-report/:responseId" element={<StandaloneRrsReport />} />

        {/* Dedicated Standalone MHS-BD Reporting Routes */}
        <Route path="/mhs-report" element={<StandaloneMhsReport />} />
        <Route path="/mhs-report/:responseId" element={<StandaloneMhsReport />} />
      </Route>

      {/* Completely Isolated Fullscreen MCRR-BD Report Routes */}
      <Route path="/report/mcrr-bd" element={<StandaloneMcrrReport />} />
      <Route path="/report/mcrr-bd/:responseId" element={<StandaloneMcrrReport />} />

      {/* Completely Isolated Fullscreen RRS-24 Report Routes */}
      <Route path="/report/rrs-24" element={<StandaloneRrsReport />} />
      <Route path="/report/rrs-24/:responseId" element={<StandaloneRrsReport />} />

      {/* Completely Isolated Fullscreen MHS-BD Report Routes */}
      <Route path="/report/mhs-bd" element={<StandaloneMhsReport />} />
      <Route path="/report/mhs-bd/:responseId" element={<StandaloneMhsReport />} />

      {/* Admin Routes */}
      <Route path="dashboard/admin/why-not-you" element={<AdminHome />}>
        <Route index element={<AdminDashboard />} />
        <Route path="am-battery" element={<AmBatteryList />} />
        <Route path="am-battery/create" element={<AmBatteryCreate />} />
        <Route path="am-battery/:slug/items" element={<AmItemManager />} />
        <Route path="image-quiz" element={<ImageQuizList />} />
        <Route path="image-quiz/create" element={<ImageQuizCreate />} />
        <Route
          path="image-quiz/:slug/items"
          element={<ImageQuizItemManager />}
        />
      </Route>

      {/* Sakib end */}

      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  );
};

export default AllRoutes;