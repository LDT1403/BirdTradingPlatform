import { useState } from "react";
import { useDispatch } from "react-redux";
import { changePassword } from "../redux/apiRequest";

const ChangePassword = ({ onCancelPasswordForm, onPasswordChanged }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const dispatch = useDispatch();

  const token = localStorage.getItem("jwtToken");

  const [formErrors, setFormErrors] = useState({
    oldPassword: false,
    newPassword: false,
    confirmNewPassword: false,
  });

  const [formErrorMessage, setFormErrorMessage] = useState("");
  const [formSuccessMessage, setFormSuccessMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const userPassword = {
      oldPassword: oldPassword,
      newPassword: newPassword,
      confirmNewPassword: confirmNewPassword,
    };

    // Perform form validation
    const currentPasswordRequired = oldPassword.trim() === "";
    const newPasswordRequired = newPassword.trim() === "";
    const confirmPasswordRequired = confirmNewPassword.trim() === "";

    setFormErrors({
      oldPassword: currentPasswordRequired,
      newPassword: newPasswordRequired,
      confirmNewPassword: confirmPasswordRequired,
    });

    if (currentPasswordRequired || newPasswordRequired || confirmPasswordRequired) {
      setFormErrorMessage("Please fill in all required fields.");
      setFormSuccessMessage("");
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setFormErrorMessage("Confirm password failed. Try again.");
      setFormSuccessMessage("");
      return;
    }

    // Call the API request function passing the necessary data
    changePassword(userPassword, dispatch, token);

    // Clear the form fields
    setOldPassword("");
    setNewPassword("");
    setConfirmNewPassword("");

    // Invoke the callback function if provided
    if (onPasswordChanged) {
      onPasswordChanged();
    }

    // Invoke the onCancelPasswordForm function to close the form
    if (onCancelPasswordForm) {
      onCancelPasswordForm();
    }

    // Reset form errors and messages
    setFormErrors({
      oldPassword: false,
      newPassword: false,
      confirmNewPassword: false,
    });
    setFormErrorMessage("");
    setFormSuccessMessage("Password changed successfully.");
  };

  const handleCancel = () => {
    if (onCancelPasswordForm) {
      onCancelPasswordForm();
    }

    // Clear the form fields
    setOldPassword("");
    setNewPassword("");
    setConfirmNewPassword("");

    // Reset form errors and messages
    setFormErrors({
      oldPassword: false,
      newPassword: false,
      confirmNewPassword: false,
    });
    setFormErrorMessage("");
    setFormSuccessMessage("");
  };

  return (
    <div className="password-form-overlay">
      <form className="password-form" onSubmit={handleSubmit}>
      <h3 className="text-center">Password</h3>
        <div className="mb-3 mt-3 content">
          <label htmlFor="oldPassword" className="form-label">
            Old Password:
          </label>
          <input
            type="password"
            className="form-control"
            id="oldPassword"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
          {formErrors.oldPassword && (
            <div className="text-danger">Please enter your current password.</div>
          )}
        </div>
        <div className="mb-3 content">
          <label htmlFor="newPassword" className="form-label">
            New Password:
          </label>
          <input
            type="password"
            className="form-control"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          {formErrors.newPassword && (
            <div className="text-danger">Please enter a new password.</div>
          )}
        </div>
        <div className="mb-3 content">
          <label htmlFor="confirmNewPassword" className="form-label">
            Confirm Password:
          </label>
          <input
            type="password"
            className="form-control"
            id="confirmNewPassword"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
          />
          {formErrors.confirmNewPassword && (
            <div className="text-danger">Please confirm your new password.</div>
          )}
        </div>
        {formErrorMessage && <div className="text-danger">{formErrorMessage}</div>}
        {formSuccessMessage && <div className="text-success">{formSuccessMessage}</div>}
        <div className="button-container">
          <button type="button" className="btn-primary" style={{marginRight:"10px"}} onClick={handleCancel}>
            Cancel
          </button>
          <button type="submit" className="btn-primary" >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
