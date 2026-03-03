import { useEffect, useState } from "react";

export default function ThirdStep({ updateData, data, prevStep }) {
  const handleChange = (e) => {
    updateData({ [e.target.name]: e.target.value });
  };

  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.substring(0, 5) === "image") {
      setImage(file);
      // Create a local URL for image preview
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setImage(null);
      setPreviewUrl("");
    }
  };

  const handleSubmit = () => {
    // Handle the final form submission logic (e.g., send to API)
    console.log("Form Submitted:", data);
    alert("Form Submitted Successfully!");
  };
  return (
    <div className="form-container">
      <div className="form-group">
        <h3 className="form-header">Login Form</h3>
        {previewUrl ? (
          <div className="profile-picture-preview-container">
            <img
              className="profile-picture-preview"
              src={previewUrl}
              alt="Uploaded preview"
            />
            <br />
            <button
              onClick={() => {
                setImage(null);
                setPreviewUrl("");
              }}
              style={{margin: '0'}}
            >
              Remove Image
            </button>
          </div>
        ) : (
          <div className="profile-picture">
            <h1 className="upload-icon">
              <i className="fa fa-plus fa-2x" aria-hidden="true"></i>
            </h1>
            <input
              className="file-uploader"
              type="file"
              name="ProfilePicture"
              value={data.ProfilePicture}
              onChange={handleImageChange}
              accept=".jpg, .jpeg, .png"
            />
          </div>
        )}
        <label className="form-label">Name :</label>
        <input
          type="text"
          name="UserName"
          placeholder="Name"
          value={data.UserName}
          onChange={handleChange}
          className="form-input"
        />
        <div className="button-group" style={{ margin: "1rem 0" }}>
          <button className="form-btn" onClick={prevStep}>
            Back
          </button>
          <button className="form-btn" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
