"use client"

import { useState, useEffect } from "react"

function Parkings() {
  const [view, setView] = useState("list")
  const [searchQuery, setSearchQuery] = useState("")
  const [parkingSpots, setParkingSpots] = useState([
    {
      id: 1,
      name: "Downtown Garage",
      address: "123 Main St, Downtown, NY 10001",
      coordinates: { lat: 40.7128, lng: -74.006 },
    },
    {
      id: 2,
      name: "City Center Parking",
      address: "456 Center Ave, Midtown, NY 10018",
      coordinates: { lat: 40.7549, lng: -73.9841 },
    },
    {
      id: 3,
      name: "West Side Lot",
      address: "789 West Blvd, West Side, NY 10023",
      coordinates: { lat: 40.7736, lng: -73.9566 },
    },
    {
      id: 4,
      name: "East River Parking",
      address: "321 River St, East Side, NY 10002",
      coordinates: { lat: 40.7168, lng: -73.9861 },
    },
    {
      id: 5,
      name: "North Plaza Garage",
      address: "555 North Ave, Uptown, NY 10029",
      coordinates: { lat: 40.7918, lng: -73.9442 },
    },
    {
      id: 6,
      name: "South Terminal Parking",
      address: "888 South St, Downtown, NY 10004",
      coordinates: { lat: 40.7046, lng: -74.0121 },
    },
  ])

  const [filteredParkingSpots, setFilteredParkingSpots] = useState(parkingSpots)

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredParkingSpots(parkingSpots)
    } else {
      const filtered = parkingSpots.filter(
        (spot) =>
          spot.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          spot.address.toLowerCase().includes(searchQuery.toLowerCase()),
      )
      setFilteredParkingSpots(filtered)
    }
  }, [searchQuery, parkingSpots])

  const handleParkingClick = (id) => {
    console.log(`Parking spot ${id} clicked`)
    // Navigate to parking details page or show modal
  }

  const clearSearch = () => {
    setSearchQuery("")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          {/* Search Bar with Integrated Toggle */}
          <div className="w-full">
            <div className="flex items-center bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
              <div className="pl-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search parking spots by name or address..."
                className="py-4 px-4 w-full focus:outline-none text-gray-700"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />

              {/* Clear search button (only shows when there's text) */}
              {searchQuery && (
                <button onClick={clearSearch} className="px-3 text-gray-400 hover:text-gray-600 focus:outline-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}

              {/* Divider */}
              <div className="h-8 w-px bg-gray-200 mx-1"></div>

              {/* View Toggle */}
              <div className="flex items-center pr-2">
                <button
                  className={`p-2 rounded-md ${
                    view === "list"
                      ? "bg-blue-100 text-blue-700"
                      : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                  }`}
                  onClick={() => setView("list")}
                  title="List View"
                >
                       <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
          <rect x="14" y="14" width="7" height="7" rx="1" />
        </svg>
                </button>
                <button
                  className={`p-2 rounded-md ${
                    view === "map" ? "bg-blue-100 text-blue-700" : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                  }`}
                  onClick={() => setView("map")}
                  title="Map View"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {view === "list" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredParkingSpots.length > 0 ? (
              filteredParkingSpots.map((spot) => (
                <div
                  key={spot.id}
                  onClick={() => handleParkingClick(spot.id)}
                  className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                >
                  <div className="p-6">
                    <div className="flex items-start">
                      <div className="rounded-full bg-blue-200 p-3 mr-4 flex-shrink-0">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 text-blue-700"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.5 2.8C1.4 11.3 1 12.1 1 13v3c0 .6.4 1 1 1h2" />
                          <circle cx="7" cy="17" r="2" />
                          <path d="M9 17h6" />
                          <circle cx="17" cy="17" r="2" />
                        </svg>
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-gray-900">{spot.name}</h2>
                        <p className="text-sm text-gray-500 mt-1">{spot.address}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <div className="rounded-full bg-blue-200 p-3 mx-auto mb-4 w-fit">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-blue-700"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900">No parking spots found</h3>
                <p className="mt-2 text-sm text-gray-500">Try adjusting your search criteria</p>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="relative bg-gray-200 h-[500px] flex items-center justify-center">
              <div className="text-center p-8">
                <div className="rounded-full bg-blue-200 p-3 mx-auto mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-blue-700"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900">Map View</h3>
                <p className="mt-2 text-sm text-gray-500">{filteredParkingSpots.length} parking locations available</p>

                {/* Map pins for demonstration */}
                <div className="relative mt-8 w-full max-w-md mx-auto">
                  <div className="border-4 border-white rounded-lg shadow-md overflow-hidden">
                    <div className="bg-blue-100 h-64 relative">
                      {filteredParkingSpots.map((spot) => (
                        <div
                          key={spot.id}
                          className="absolute w-6 h-6 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                          style={{
                            left: `${Math.random() * 80 + 10}%`,
                            top: `${Math.random() * 80 + 10}%`,
                          }}
                          onClick={() => handleParkingClick(spot.id)}
                        >
                          <div className="relative group">
                            <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                                />
                              </svg>
                            </div>
                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                              <div className="bg-white rounded-md shadow-md p-2 whitespace-nowrap">
                                <p className="text-xs font-medium text-gray-900">{spot.name}</p>
                                <p className="text-xs text-gray-500">{spot.address}</p>
                              </div>
                              <div className="w-2 h-2 bg-white transform rotate-45 absolute -bottom-1 left-1/2 -translate-x-1/2"></div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Parkings
