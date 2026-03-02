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
    <div className="form-container">
      <div className="profile-picture">
        <h1 className="upload-icon">
          <i className="fa fa-plus fa-2x" aria-hidden="true"></i>
        </h1>
        <input
        className="file-uploader"
          type="file"
          name="ProfilePicture"
          value={data.ProfilePicture}
          onChange={handleChange}
          accept="image/*"
        />
      </div>
      <label className="form-label">Name :</label>
      <input
        type="text"
        name="UserName"
        placeholder="Name"
        value={data.UserName}
        onChange={handleChange}
        className="form-input"
      />
      <button className="form-btn" onClick={prevStep}>
        Back
      </button>
      <button className="form-btn" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
}
