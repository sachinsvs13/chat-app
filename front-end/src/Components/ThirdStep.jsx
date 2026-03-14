import { useEffect, useState } from "react";
import axios from "axios";

export default function ThirdStep({ updateData, data, prevStep }) {
  const handleChange = (e) => {
    updateData({ [e.target.name]: e.target.value });
  };

  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");

  const handleImageChange = (event) => {
    console.log(event);

    const file = event.target.files[0];
    if (file) {
      setImage(file);
      // Create a local URL for image preview
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setImage(null);
      setPreviewUrl("");
    }
  };

  // axios
  //   .post("http://localhost:3000/api/v1/auth/login", data,)
  //   .then((response) => {
  //     console.log("Login successful:", response.data);
  //   })
  //   .catch((error) => {
  //     console.error("Login error:", error);
  //   });

  console.log(data);
  console.log(image);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", data.Email);
    formData.append("otp", data.OTP);
    formData.append("avatar", image);
    formData.append("UserName", data.UserName);
    // Handle the final form submission logic (e.g., send to API)

    axios
      .post("http://localhost:3000/api/v1/auth/userRegister", formData)
      .then((response) => {
        console.log("Login successful:", response.data);
      })
      .catch((error) => {
        console.error("Login error:", error);
      });
    console.log("Form Submitted:", formData);
    alert("Form Submitted Successfully!");
  };
  return (
    <div className="form-container">
      <form className="form-group" onSubmit={handleSubmit}>
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
              style={{ margin: "0" }}
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
              name="avatar"
              value={data.avatar}
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
          <button type="submit" className="form-btn">
            Submit
          </button>
          <button className="form-btn" onClick={prevStep}>
            Back
          </button>
        </div>
      </form>
    </div>
  );
}
