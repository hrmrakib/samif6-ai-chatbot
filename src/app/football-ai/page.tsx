import React, { Suspense } from "react";
import ChatbotSectionContent from "./ChatbotSectionContent";

const FootballAIPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ChatbotSectionContent />
    </Suspense>
  );
};

export default FootballAIPage;
