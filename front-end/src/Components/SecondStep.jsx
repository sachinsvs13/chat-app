import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

export default function SecondStep({ updateData, data, nextStep, prevStep }) {
  const handleChange = (e) => {
    updateData({ [e.target.name]: e.target.value });
  };
  const [isOtp, setIsOtp] = useState("");

  const verifyOTP = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/v1/auth/showOtp",
      );
      setIsOtp(response.data.otp);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    verifyOTP;
  }, []);

  const handleNext = () => {
    if (data.OTP && data.OTP.length === 6) {
      nextStep();
    } else {
      return <h1>Please fill the OTP field</h1>;
    }
  };

  return (
    <div className="form-container">
      <div className="form-group">
        <h3 className="form-header">Login Form</h3>
        <label className="form-label">OTP :</label>
        {isOtp}
        <input
          type="text"
          name="OTP"
          placeholder="OTP"
          value={data.OTP}
          onChange={handleChange}
          className="form-input"
        />
        <p className="otp-text">OTP sent to {data.Email}</p>
        <div className="button-group">
          <button className="form-btn" onClick={prevStep}>
            Back
          </button>
          {console.log(isOtp)}
          <button className="form-btn" onClick={handleNext}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
