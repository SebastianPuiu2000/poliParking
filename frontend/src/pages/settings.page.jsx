"use client"

import { useState } from "react"

function Settings() {
  // Password change state
  const [passwordFormData, setPasswordFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })
  const [passwordErrors, setPasswordErrors] = useState({})
  const [passwordSuccess, setPasswordSuccess] = useState("")
  const [isPasswordSubmitting, setIsPasswordSubmitting] = useState(false)

  // Email change state
  const [emailFormData, setEmailFormData] = useState({
    currentEmail: "john@example.com", // Pre-filled with current email
    newEmail: "",
    password: "",
  })
  const [emailErrors, setEmailErrors] = useState({})
  const [emailSuccess, setEmailSuccess] = useState("")
  const [isEmailSubmitting, setIsEmailSubmitting] = useState(false)

  // Handle password form changes
  const handlePasswordChange = (e) => {
    const { name, value } = e.target
    setPasswordFormData({
      ...passwordFormData,
      [name]: value,
    })

    // Clear error when user starts typing
    if (passwordErrors[name]) {
      setPasswordErrors({
        ...passwordErrors,
        [name]: "",
      })
    }
  }

  // Handle email form changes
  const handleEmailChange = (e) => {
    const { name, value } = e.target
    setEmailFormData({
      ...emailFormData,
      [name]: value,
    })

    // Clear error when user starts typing
    if (emailErrors[name]) {
      setEmailErrors({
        ...emailErrors,
        [name]: "",
      })
    }
  }

  // Validate password form
  const validatePasswordForm = () => {
    const newErrors = {}

    if (!passwordFormData.currentPassword) {
      newErrors.currentPassword = "Current password is required"
    }

    if (!passwordFormData.newPassword) {
      newErrors.newPassword = "New password is required"
    } else if (passwordFormData.newPassword.length < 8) {
      newErrors.newPassword = "Password must be at least 8 characters"
    }

    if (!passwordFormData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your new password"
    } else if (passwordFormData.newPassword !== passwordFormData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    return newErrors
  }

  // Validate email form
  const validateEmailForm = () => {
    const newErrors = {}
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!emailFormData.newEmail) {
      newErrors.newEmail = "New email is required"
    } else if (!emailRegex.test(emailFormData.newEmail)) {
      newErrors.newEmail = "Please enter a valid email address"
    }

    if (!emailFormData.password) {
      newErrors.password = "Password is required to confirm this change"
    }

    return newErrors
  }

  // Handle password form submission
  const handlePasswordSubmit = (e) => {
    e.preventDefault()
    setPasswordSuccess("")

    const formErrors = validatePasswordForm()
    if (Object.keys(formErrors).length > 0) {
      setPasswordErrors(formErrors)
      return
    }

    setIsPasswordSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      // In a real app, you would send the password change request to your backend
      console.log("Password change submitted:", passwordFormData)

      // Reset form
      setPasswordFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      })

      setPasswordSuccess("Password changed successfully!")
      setIsPasswordSubmitting(false)
    }, 1000)
  }

  // Handle email form submission
  const handleEmailSubmit = (e) => {
    e.preventDefault()
    setEmailSuccess("")

    const formErrors = validateEmailForm()
    if (Object.keys(formErrors).length > 0) {
      setEmailErrors(formErrors)
      return
    }

    setIsEmailSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      // In a real app, you would send the email change request to your backend
      console.log("Email change submitted:", emailFormData)

      // Reset form but keep the new email as current
      setEmailFormData({
        currentEmail: emailFormData.newEmail,
        newEmail: "",
        password: "",
      })

      setEmailSuccess("Email changed successfully!")
      setIsEmailSubmitting(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white shadow rounded-lg overflow-hidden mb-6">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Change Password</h2>

            {passwordSuccess && (
              <div className="mb-4 p-3 bg-green-100 border border-green-200 text-green-700 rounded-md">
                {passwordSuccess}
              </div>
            )}

            <form onSubmit={handlePasswordSubmit}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
                    Current Password
                  </label>
                  <input
                    type="password"
                    id="currentPassword"
                    name="currentPassword"
                    value={passwordFormData.currentPassword}
                    onChange={handlePasswordChange}
                    className={`w-full px-3 py-2 border ${
                      passwordErrors.currentPassword ? "border-red-500" : "border-gray-300"
                    } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                  {passwordErrors.currentPassword && (
                    <p className="mt-1 text-sm text-red-600">{passwordErrors.currentPassword}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                    New Password
                  </label>
                  <input
                    type="password"
                    id="newPassword"
                    name="newPassword"
                    value={passwordFormData.newPassword}
                    onChange={handlePasswordChange}
                    className={`w-full px-3 py-2 border ${
                      passwordErrors.newPassword ? "border-red-500" : "border-gray-300"
                    } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                  {passwordErrors.newPassword && (
                    <p className="mt-1 text-sm text-red-600">{passwordErrors.newPassword}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={passwordFormData.confirmPassword}
                    onChange={handlePasswordChange}
                    className={`w-full px-3 py-2 border ${
                      passwordErrors.confirmPassword ? "border-red-500" : "border-gray-300"
                    } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                  {passwordErrors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-600">{passwordErrors.confirmPassword}</p>
                  )}
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isPasswordSubmitting}
                    className={`w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                      isPasswordSubmitting ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                  >
                    {isPasswordSubmitting ? "Changing Password..." : "Change Password"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Change Email Address</h2>

            {emailSuccess && (
              <div className="mb-4 p-3 bg-green-100 border border-green-200 text-green-700 rounded-md">
                {emailSuccess}
              </div>
            )}

            <form onSubmit={handleEmailSubmit}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="newEmail" className="block text-sm font-medium text-gray-700 mb-1">
                    New Email
                  </label>
                  <input
                    type="email"
                    id="newEmail"
                    name="newEmail"
                    value={emailFormData.newEmail}
                    onChange={handleEmailChange}
                    className={`w-full px-3 py-2 border ${
                      emailErrors.newEmail ? "border-red-500" : "border-gray-300"
                    } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                  {emailErrors.newEmail && <p className="mt-1 text-sm text-red-600">{emailErrors.newEmail}</p>}
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={emailFormData.password}
                    onChange={handleEmailChange}
                    className={`w-full px-3 py-2 border ${
                      emailErrors.password ? "border-red-500" : "border-gray-300"
                    } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                  {emailErrors.password && <p className="mt-1 text-sm text-red-600">{emailErrors.password}</p>}
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isEmailSubmitting}
                    className={`w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                      isEmailSubmitting ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                  >
                    {isEmailSubmitting ? "Changing Email..." : "Change Email"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings
