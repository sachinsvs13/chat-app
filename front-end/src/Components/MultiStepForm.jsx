import { useState } from "react";
import "../Styles/MultiStepForm.css";
import FirstStep from "./FirstStep";
import SecondStep from "./SecondStep";
import ThirdStep from "./ThirdStep";

export default function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    Email: "",
    OTP: "",
    ProfilePicture: "",
    UserName: "",
  });

  // Update Form Data
  const updateData = (data) => {
    setFormData({ ...formData, ...data });
  };

  // Move to Next Step
  const nextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  // Move to Prev Step
  const prevStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const renderForm = () => {
    switch (currentStep) {
      case 0:
        return (
          <FirstStep
            updateData={updateData}
            nextStep={nextStep}
            data={formData}
          />
        );
      case 1:
        return (
          <SecondStep
            updateData={updateData}
            prevStep={prevStep}
            nextStep={nextStep}
            data={formData}
          />
        );
      case 2:
        return (
          <ThirdStep
            updateData={updateData}
            prevStep={prevStep}
            data={formData}
          />
        );
      default:
        return (
          <FirstStep
            updateData={updateData}
            nextStep={nextStep}
            data={formData}
          />
        );
    }
  };
  return <div>{renderForm()}</div>;
}
