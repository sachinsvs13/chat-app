export default function SecondStep({ updateData, data, nextStep, prevStep }) {
  const handleChange = (e) => {
    updateData({ [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    if (data.OTP) {
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
          <button className="form-btn" onClick={handleNext}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
