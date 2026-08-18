import { Routes, Route } from "react-router-dom";
import Hero from "../componnents/Main/Hero";
import HowItWorks from "../componnents/Main/HowItworks";
import WhyItMatters from "../componnents/Main/WhyItMatters";
import WhatYouGet from "../componnents/Main/WhatYouGet";
import FAQ from "../componnents/Main/FAQ";
import InstrumentList from "../componnents/Pages/Instrumentlist";
import InstrumentDetailsPage from "../componnents/Pages/Instrumentdetailspage";
import Result from "../componnents/Pages/Result";
import Quiz from "../componnents/Pages/Quiz";

const AllRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route
        path="/"
        element={
          <>
            <Hero />
            <HowItWorks />
            <WhyItMatters />
            <WhatYouGet />
            <FAQ />
          </>
        }
      />

      {/* Sakib Start */}

      <Route path="/tests" element={<InstrumentList />} />
      <Route path="/tests/:slug" element={<InstrumentDetailsPage />} />
      <Route path="/tests/:slug/quiz" element={<Quiz />} />
      <Route path="/tests/:slug/result/:responseId" element={<Result />} />

        {/* Sakib end */}

      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  );
};

export default AllRoutes;
