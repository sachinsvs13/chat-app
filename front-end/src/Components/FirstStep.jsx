import axios from "axios";

export default function FirstStep({ updateData, nextStep, data }) {
  const handleChange = (e) => {
    updateData({ [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    if (data.Email && data.Email.includes("@")) {
      nextStep();
    } else {
      return <h1>Please fill the Email field</h1>;
    }
  };
  const handlesubmit = () => {
    axios
      .post("http://localhost:3000/api/v1/auth/getOtp", {
        email: data.email,
      })
      .then((res) => console.log("OTP Sended:", res))
      .catch((err) => console.error(err));
  };
  return (
    <div className="form-container">
      <div className="form-group">
        <h3 className="form-header">Login Form</h3>
        <label className="form-label">Email :</label>
        <input
          className="form-input"
          type="text"
          name="Email"
          placeholder="Email"
          value={data.Email}
          onChange={handleChange}
        />
        <button
          className="form-btn"
          onClick={handleNext}
          style={{ margin: "1em 0 0 auto" }}
        >
          Next
        </button>
      </div>
    </div>
  );
}
