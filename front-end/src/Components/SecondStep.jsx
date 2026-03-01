export default function SecondStep({ updateData, data, nextStep, prevStep }) {
  const handleChange = (e) => {
    updateData({ [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    if (data.Email) {
      nextStep();
    } else {
      return <h1>Please fill the OTP field</h1>;
    }
  };
  return (
    <div>
      <label>OTP :</label>
      <input
        type="text"
        name="OTP"
        placeholder="OTP"
        value={data.OTP}
        onChange={handleChange}
      />
      <button onClick={prevStep}>Back</button>
      <button onClick={handleNext}>Next</button>
    </div>
  );
}
