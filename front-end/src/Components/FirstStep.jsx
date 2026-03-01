export default function FirstStep({ updateData, nextStep, data }) {
  const handleChange = (e) => {
    updateData({ [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    if (data.Email) {
      nextStep();
    } else {
      return <h1>Please fill the Email field</h1>;
    }
  };
  return (
    <div>
      <label>Email :</label>
      <input
        type="text"
        name="Email"
        placeholder="Email"
        value={data.Email}
        onChange={handleChange}
      />
      <button onClick={handleNext}>Next</button>
    </div>
  );
}
