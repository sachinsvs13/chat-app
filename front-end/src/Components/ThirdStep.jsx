export default function ThirdStep({ updateData, data, prevStep }) {
  const handleChange = (e) => {
    updateData({ [e.target.name]: e.target.value });
  };
  const handleSubmit = () => {
    // Handle the final form submission logic (e.g., send to API)
    console.log("Form Submitted:", data);
    alert("Form Submitted Successfully!");
  };
  return (
    <div>
      <input
        type="file"
        name="ProfilePicture"
        value={data.ProfilePicture}
        onChange={handleChange}
      />
      <label>Name :</label>
      <input
        type="text"
        name="UserName"
        placeholder="Name"
        value={data.UserName}
        onChange={handleChange}
      />
      <button onClick={prevStep}>Back</button>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}
