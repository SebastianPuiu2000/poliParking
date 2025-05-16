"use client"

import { useState, useRef, useEffect } from "react"
import { Link } from "react-router-dom"

function Navbar() {
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isParkingOpen, setIsParkingOpen] = useState(false)
  const [parkingState, setParkingState] = useState("parked") // "parked", "reserved", "not-parked"
  const profileRef = useRef(null)
  const parkingRef = useRef(null)

  // Mock data - in a real app, this would come from your auth/state management
  const userData = {
    name: "John Doe",
    email: "john@example.com",
    carName: "Tesla Model 3",
    balance: "$250.75",
  }

  // Mock parking status based on current state
  const getParkingStatus = () => {
    switch (parkingState) {
      case "parked":
        return {
          isParked: true,
          hasReservation: false,
          location: "Downtown Garage",
          address: "123 Main St, Downtown, NY 10001",
          entryTime: "2025-05-16T08:30:00",
          currentAmount: "$12.50",
          reservationTime: null,
          statusText: "Arrived",
        }
      case "reserved":
        return {
          isParked: false,
          hasReservation: true,
          location: "City Center Parking",
          address: "456 Center Ave, Midtown, NY 10018",
          entryTime: null,
          currentAmount: null,
          reservationStartTime: "2025-05-17T14:00:00",
          reservationEndTime: "2025-05-17T18:00:00",
          statusText: "Awaited",
        }
      case "not-parked":
      default:
        return {
          isParked: false,
          hasReservation: false,
          location: null,
          address: null,
          entryTime: null,
          currentAmount: null,
          reservationTime: null,
          statusText: "Idle",
        }
    }
  }

  const parkingStatus = getParkingStatus()

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen)
    if (isParkingOpen) setIsParkingOpen(false)
  }

  const toggleParking = () => {
    setIsParkingOpen(!isParkingOpen)
    if (isProfileOpen) setIsProfileOpen(false)
  }

  // Cycle through parking states
  const cycleParkingState = () => {
    setParkingState((currentState) => {
      switch (currentState) {
        case "parked":
          return "reserved"
        case "reserved":
          return "not-parked"
        case "not-parked":
        default:
          return "parked"
      }
    })
  }

  // Format date and time
  const formatDateTime = (dateTimeString) => {
    if (!dateTimeString) return "N/A"
    const date = new Date(dateTimeString)
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    })
  }

  // Format time only
  const formatTime = (dateTimeString) => {
    if (!dateTimeString) return "N/A"
    const date = new Date(dateTimeString)
    return date.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    })
  }

  // Calculate time elapsed since entry
  const calculateTimeElapsed = (entryTimeString) => {
    if (!entryTimeString) return "N/A"
    const entryTime = new Date(entryTimeString)
    const now = new Date()
    const diffMs = now - entryTime
    const diffHrs = Math.floor(diffMs / (1000 * 60 * 60))
    const diffMins = Math.round((diffMs % (1000 * 60 * 60)) / (1000 * 60))

    if (diffHrs === 0) {
      return `${diffMins} min`
    } else if (diffMins === 0) {
      return `${diffHrs} hr`
    } else {
      return `${diffHrs} hr ${diffMins} min`
    }
  }

  // Get background color based on parking state
  const getParkingIconBgColor = () => {
    switch (parkingState) {
      case "parked":
        return "bg-red-500 text-white hover:bg-red-600"
      case "reserved":
        return "bg-purple-500 text-white hover:bg-purple-600"
      case "not-parked":
      default:
        return "bg-blue-500 text-white hover:bg-blue-600"
    }
  }

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false)
      }
      if (parkingRef.current && !parkingRef.current.contains(event.target)) {
        setIsParkingOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [profileRef, parkingRef])

  return (
    <nav className="bg-white sticky top-0 z-50 shadow-sm border-b border-gray-100">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left side - Car Icon */}
          <div className="relative" ref={profileRef}>
            <button
              className="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-500"
              onClick={toggleProfile}
              aria-expanded={isProfileOpen}
            >
              <div className="h-9 w-9 rounded-full bg-blue-200 flex items-center justify-center text-blue-700 hover:bg-blue-300 transition-colors duration-200">
                  <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </div>
            </button>

            {/* Profile dropdown */}
            {isProfileOpen && (
              <div className="origin-top-left absolute left-0 mt-2 w-64 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-3 px-4 border-b border-gray-100">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 rounded-full bg-blue-200 flex items-center justify-center text-blue-700">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.5 2.8C1.4 11.3 1 12.1 1 13v3c0 .6.4 1 1 1h2"
                          />
                          <circle cx="7" cy="17" r="2" />
                          <path d="M9 17h6" />
                          <circle cx="17" cy="17" r="2" />
                        </svg>
                      </div>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">{userData.name}</p>
                      <p className="text-xs text-gray-500">{userData.email}</p>
                    </div>
                  </div>
                </div>

                <div className="py-1">
                  <Link
                    to="/settings"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    <div className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-2 text-gray-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      Settings
                    </div>
                  </Link>
                  <Link
                    to="/history"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    <div className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-2 text-gray-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      History
                    </div>
                  </Link>
                  <Link
                    to="/billing"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    <div className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-2 text-gray-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      Add Funds
                    </div>
                  </Link>
                  <Link
                    to="/parkings"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    <div className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-2 text-gray-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.5 2.8C1.4 11.3 1 12.1 1 13v3c0 .6.4 1 1 1h2"
                        />
                        <circle cx="7" cy="17" r="2" />
                        <path d="M9 17h6" />
                        <circle cx="17" cy="17" r="2" />
                      </svg>
                      Parkings
                    </div>
                  </Link>
                  <div className="border-t border-gray-100"></div>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    <div className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-2 text-gray-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        />
                      </svg>
                      Sign out
                    </div>
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Center - Logo */}
          <div className="flex-1 flex justify-center">
            <div className="logo-text">RoGovParking</div>
          </div>

          {/* Right side - Parking Status Icon */}
          <div className="relative" ref={parkingRef}>
            <button
              className={`flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-500 ${
                parkingStatus.isParked ? "animate-pulse" : ""
              }`}
              onClick={toggleParking}
              aria-expanded={isParkingOpen}
            >
              <div
                className={`h-9 w-9 rounded-full flex items-center justify-center transition-colors duration-200 ${getParkingIconBgColor()}`}
              >
                <span className="text-white font-serif text-lg">P</span>
              </div>
            </button>

            {/* Parking status dropdown */}
            {isParkingOpen && (
              <div className="origin-top-right absolute right-0 mt-2 w-72 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-3 px-4 border-b border-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div
                        className={`h-10 w-10 rounded-full flex items-center justify-center mr-3 ${
                          parkingStatus.isParked
                            ? "bg-red-500 text-white"
                            : parkingStatus.hasReservation
                              ? "bg-purple-500 text-white"
                              : "bg-blue-500 text-white"
                        }`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.5 2.8C1.4 11.3 1 12.1 1 13v3c0 .6.4 1 1 1h2"
                          />
                          <circle cx="7" cy="17" r="2" />
                          <path d="M9 17h6" />
                          <circle cx="17" cy="17" r="2" />
                        </svg>                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{userData.carName}</p>
                        <p
                          className={`text-xs font-medium ${
                            parkingStatus.isParked
                              ? "text-red-600"
                              : parkingStatus.hasReservation
                                ? "text-purple-600"
                                : "text-blue-600"
                          }`}
                        >
                          {parkingStatus.statusText}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">Balance</p>
                      <p className="text-sm font-semibold text-green-600">{userData.balance}</p>
                    </div>
                  </div>
                </div>

                {parkingStatus.isParked && (
                  <div className="py-3 px-4">
                    <div className="mb-3">
                      <p className="text-xs text-gray-500">Location</p>
                      <p className="text-sm font-medium">{parkingStatus.location}</p>
                    </div>

                    <div className="mb-3">
                      <p className="text-xs text-gray-500">Entry Time</p>
                      <p className="text-sm font-medium">{formatDateTime(parkingStatus.entryTime)}</p>
                    </div>

                    <div className="pt-3 border-t border-gray-100">
                      <p className="text-xs text-gray-500">Time Spent</p>
                      <p className="text-sm font-medium">{calculateTimeElapsed(parkingStatus.entryTime)}</p>

                      <div className="mt-2">
                        <p className="text-xs text-gray-500">Current Amount</p>
                        <p className="text-lg font-bold text-red-600">{parkingStatus.currentAmount}</p>
                      </div>
                    </div>
                  </div>
                )}

                {parkingStatus.hasReservation && !parkingStatus.isParked && (
                  <div className="py-3 px-4">
                    <div className="mb-3">
                      <p className="text-xs text-gray-500">Location</p>
                      <p className="text-sm font-medium">{parkingStatus.location}</p>
                    </div>

                    <div className="mb-3">
                      <p className="text-xs text-gray-500">Reservation Interval</p>
                      <p className="text-sm font-medium">
                        {formatDateTime(parkingStatus.reservationStartTime)} -{" "}
                        {formatTime(parkingStatus.reservationEndTime)}
                      </p>
                    </div>
                  </div>
                )}

                {!parkingStatus.isParked && !parkingStatus.hasReservation && (
                  <div className="py-3 px-4">
                    <div className="text-center py-4">
                      <p className="text-sm text-gray-500">Your car is not currently parked.</p>
                    </div>
                  </div>
                )}

                {/* State toggle button */}
                <div className="py-3 px-4 border-t border-gray-100">
                  <button
                    onClick={cycleParkingState}
                    className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                  >
                    Switch Parking State (Demo)
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
