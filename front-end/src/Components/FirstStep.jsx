import axios, { HttpStatusCode } from "axios";

export default function FirstStep({ updateData, nextStep, data }) {
  const handleChange = (e) => {
    updateData({ [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/api/v1/auth/getOtp", {
        email: data.Email,
      })
      .then(() => console.log("success"))
      .catch((err) => console.error(err));

    if (data.Email && data.Email.includes("@")) {
      nextStep();
    } else {
      return <h1>Please fill the Email field</h1>;
    }
  };
  if (HttpStatusCode === 400) {
    <p>Already Email ID exists</p>;
  }

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
        {HttpStatusCode === 400 ? <p>Email mail</p> : null}
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
