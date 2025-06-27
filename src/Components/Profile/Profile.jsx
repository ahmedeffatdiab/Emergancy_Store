import React, { useContext, useEffect, useRef, useState } from 'react';
import profile_image from '../../assets/images/profiile-image.jpg';
import jwt_decode from 'jwt-decode';
import { ApiContext } from '../../Context/ApiContext';
import Joi from 'joi';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Profile({ saveUserData }) {
  const navigate = useNavigate();
  const { showPurchaseAlert } = useContext(ApiContext);
  const [userInfo, setUserInfo] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);
  const [user, setUser] = useState({ username: '', email: '' });
  const [changePassword, setChangePassword] = useState({ password: '', confirm_password: '' });
  const [validationError, setValidationError] = useState([]);
  const [errorChangePassword, setErrorChangePassword] = useState([]);
  const [loadingImage, setLoadingImage] = useState(false);  
  const imageInputRef = useRef(null);
  const updateImageRef = useRef(null);
  const saveUploadBtnRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    if (token) {
      const data = jwt_decode(token);
      console.log(data)
      setUserInfo(data.user);
      setUser({
        username: data.user.UserName,
        email: data.user.Email,
      });
    }
  }, []);
  // Select file and enable button.
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    if (saveUploadBtnRef.current) {
      saveUploadBtnRef.current.disabled = false;
    }
  };
  // Upload profile image to server.
  const uploadProfileImage = async () => {
    if (!selectedFile) return;
    setLoadingImage(true)
    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const res = await axios.post(
        'https://emergancy-api-kqk9.vercel.app/auth/changeProfileImage',
        formData,
        {
          headers: {
            token: `Bearer ${localStorage.getItem('userToken')}`,
          },
        }
      );
      console.log(res)
      if (res.data.message==="Image updated successfully!") {
        console.log(res.data.user)
        setUserInfo(res.data.user);
        localStorage.removeItem("userToken");
        navigate("/login")
        showPurchaseAlert("👍 Profile image updated successfully!");
      }
    } catch (err) {
      console.error(err);
    } finally {
    setLoadingImage(false); 
  }
  };
  //This function handles changes to the profile input fields (username or email).
  const changeContent = (e) => {
    const { name, value } = e.target;
    const updatedUser = { ...user, [name]: value };
    setUser(updatedUser);

    const unchanged =
      updatedUser.username === userInfo.user?.UserName &&
      updatedUser.email === userInfo.user?.Email;

    document.getElementById('submitbtn').disabled = unchanged;
  };
  // Update user input and toggle submit.
  const validateProfileForm = () => {
    const schema = Joi.object({
      username: Joi.string().min(6).max(15).required(),
      email: Joi.string().email({ tlds: { allow: ['com', 'net'] } }).required(),
    });

    return schema.validate(user, { abortEarly: false });
  };
  // Submit profile changes to server
  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    const { error } = validateProfileForm();

    if (error) {
      setValidationError(error.details);
    } else {
      try {
        const res = await axios.post(
          'https://emergancy-api-kqk9.vercel.app/auth/editUserInfo',
          user,
          {
            headers: {
              'Content-Type': 'application/json',
              token: `Bearer ${localStorage.getItem('userToken')}`,
              
            },
          }
        );
        console.log(res)
        if (res.data.message === "Updated successfully") {
          localStorage.removeItem('userToken');
          navigate('/login');
          showPurchaseAlert("👍 Changed profile Image successfully!");
        }
      } catch (err) {
        console.error(err);
      }
    }
  };
  // Update password inputs and toggle submit
  const handleChangePasswordInput = (e) => {
    const { name, value } = e.target;
    setChangePassword(prev => ({ ...prev, [name]: value }));

    const { password, confirm_password } = { ...changePassword, [name]: value };
    document.getElementById('submitPassword').disabled = !(password && confirm_password);
  };
  // Validate password change form input
  const validateChangePassword = () => {
    const schema = Joi.object({
      password: Joi.string().min(6).max(15).required(),
      confirm_password: Joi.string().valid(Joi.ref('password')).required().label('Confirm Password').messages({
        'any.only': 'Passwords do not match',
      }),
    });

    return schema.validate(changePassword, { abortEarly: false });
  };
  //Submit password change to server
  const handleChangePasswordSubmit = async (e) => {
    e.preventDefault();
    const { error } = validateChangePassword();

    if (error) {
      setErrorChangePassword(error.details);
    } else {
      try {
        const res = await axios.post(
          'https://emergancy-api-kqk9.vercel.app/auth/changePassword',
          changePassword,
          {
            headers: {
              'Content-Type': 'application/json',
              token: `Bearer ${localStorage.getItem('userToken')}`,
            },
          }
        );

        if (res.data.message === "Password changed successfully") {
          showPurchaseAlert("👍 Password changed successfully")
          localStorage.removeItem('userToken');
          navigate('/login');
        } else {
          setErrorChangePassword([{ message: res.data.error }]);
        }
      } catch (err) {
        console.error(err);
      }
    }
  };
  // Show image update input field.
  const showUpdateImage = () => {
    updateImageRef.current?.classList.remove('updateImage');
  };
  // Hide image input and reset
  const hideUpdateImage = () => {
    if (imageInputRef.current) imageInputRef.current.value = '';
    updateImageRef.current?.classList.add('updateImage');
  };
  // Show change password form
  const showChangePasswordForm = () => {
    document.getElementById('formChangePassword')?.classList.remove('changePasswordForm');
  };
  //Log out and redirect user
  const logout = () => {
    localStorage.removeItem('userToken');
    saveUserData();
    navigate('/login');
  };

  return (
    <div className="container">
      <div className="row my-4">
        <div className="col-md-4">
          <div className="w-100">
            <div className="w-75 m-auto">
              {loadingImage ? (
                  <p className="my-2 text-ceter"><i class="fa-solid fa-spinner fa-spin fa-5x m-auto"></i></p>
                    ) : userInfo.imageProfile ? (
                      <img
                        className="profileImage my-2"
                        src={`${userInfo.imageProfile}?${Date.now()}`}
                        alt="profile"
                      />
                    ) : (
                      <img
                        className="profileImage my-2"
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7U_ef87Q7CQ1Fx_khkPq-y9IfPmBWrMZ6ig&s"
                        alt="default"
                      />
                    )}
                    {/* <img src={userInfo.imageProfile} alt="User Profile" /> */}
                    
              <button className="btn btn-link p-0" onClick={showUpdateImage}>Update Image</button>
              <div className="my-2 updateImage" id="updateImage" ref={updateImageRef}>
                <input type="file" accept="image/*" ref={imageInputRef} onChange={handleFileChange}/>
                <div className="d-flex justify-content-between w-50">
                  <button className="btn btn-primary" ref={saveUploadBtnRef} onClick={uploadProfileImage}>Save</button>
                  <button className="btn btn-danger" onClick={hideUpdateImage}>Cancel</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-8">
          <form onSubmit={handleProfileSubmit}>
            {validationError.map((err, i) => (
              <div key={i} className="alert alert-danger">{err.message}</div>
            ))}
            <h4 className="text-center text-info my-3">Profile Info</h4>
            <div className="row gy-2">
              <div className="col-md-6">
                <label htmlFor="Username">Username</label>
                <input
                  type="text"
                  id="Username"
                  name="username"
                  value={user.username}
                  onChange={changeContent}
                  className="form-control"
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="Email">Email</label>
                <input
                  type="email"
                  id="Email"
                  name="email"
                  value={user.email}
                  onChange={changeContent}
                  className="form-control"
                />
              </div>
            </div>
            <div className="text-center my-4">
              <button className="btn btn-primary w-25" id="submitbtn" disabled>Save Info</button>
            </div>
          </form>

          <p className="Link" onClick={showChangePasswordForm}>Change Password</p>
          <form onSubmit={handleChangePasswordSubmit} className="changePasswordForm" id="formChangePassword">
            {errorChangePassword.map((err, i) => (
              <div key={i} className="alert alert-danger">{err.message}</div>
            ))}
            <div className="row">
              <div className="col-md-6">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  onChange={handleChangePasswordInput}
                  className="form-control"
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="confirm_password">Confirm Password</label>
                <input
                  type="password"
                  id="confirm_Password"
                  name="confirm_password"
                  onChange={handleChangePasswordInput}
                  className="form-control"
                />
              </div>
            </div>
            <div className="text-center my-3">
              <button type="submit" id="submitPassword" className="btn btn-primary w-25" disabled>
                Change Password
              </button>
            </div>
          </form>

          <button className="btn btn-danger my-4 float-start" onClick={logout}>Logout</button>
        </div>
      </div>
    </div>
  );
}
