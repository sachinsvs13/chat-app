import axios from "axios";
export default function FirstStep({ updateData, nextStep, data }) {
  const handleChange = (e) => {
    updateData({ [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/api/v1/otp/getOtp", {
        email: data.Email,
      })
      .then((res) => console.log(res.data.otp._id))
      .catch((err) => console.error(err));
    if (data.Email && data.Email.includes("@")) {
      nextStep();
    } else {
      return <h1>Please fill the Email field</h1>;
    }
  };

  return (
    <div className="form-container">
      <form className="form-group" onSubmit={handleSubmit}>
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
          type="submit"
          className="form-btn"
          style={{ margin: "1em 0 0 auto" }}
        >
          Next
        </button>
      </form>
    </div>
  );
}
