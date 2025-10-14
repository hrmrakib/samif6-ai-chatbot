import React, { Suspense } from "react";
import VerifyOTPPageContent from "./PageContent";

const VerifyOTPPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyOTPPageContent />
    </Suspense>
  );
};

export default VerifyOTPPage;
