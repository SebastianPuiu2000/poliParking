"use client"

import { useState } from "react"

function HistoryPage() {
  // Mock data for parking history
  const [historyItems, setHistoryItems] = useState([
    {
      id: 1,
      location: "Downtown Garage",
      address: "123 Main St, Downtown, NY 10001",
      entryTime: "2023-05-15T08:30:00",
      exitTime: "2023-05-15T17:45:00",
      amountPaid: "$18.75",
    },
    {
      id: 2,
      location: "City Center Parking",
      address: "456 Center Ave, Midtown, NY 10018",
      entryTime: "2023-05-12T09:15:00",
      exitTime: "2023-05-12T14:30:00",
      amountPaid: "$13.25",
    },
    {
      id: 3,
      location: "West Side Lot",
      address: "789 West Blvd, West Side, NY 10023",
      entryTime: "2023-05-10T12:00:00",
      exitTime: "2023-05-10T15:30:00",
      amountPaid: "$8.75",
    },
    {
      id: 4,
      location: "East River Parking",
      address: "321 River St, East Side, NY 10002",
      entryTime: "2023-05-08T07:45:00",
      exitTime: "2023-05-08T18:15:00",
      amountPaid: "$26.25",
    },
    {
      id: 5,
      location: "North Plaza Garage",
      address: "555 North Ave, Uptown, NY 10029",
      entryTime: "2023-05-05T10:30:00",
      exitTime: "2023-05-05T12:45:00",
      amountPaid: "$5.75",
    },
  ])

  // Function to format date and time
  const formatDateTime = (dateTimeString) => {
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

  // Function to calculate time spent
  const calculateTimeSpent = (entryTime, exitTime) => {
    const entry = new Date(entryTime)
    const exit = new Date(exitTime)
    const diffMs = exit - entry
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Parking History</h1>

        {historyItems.length > 0 ? (
          <div className="space-y-4">
            {historyItems.map((item) => (
              <div key={item.id} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
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
                      <h2 className="text-xl font-bold text-gray-900">{item.location}</h2>
                      <p className="text-sm text-gray-500">{item.address}</p>
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className="flex items-center mb-3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-green-600 mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <div>
                          <p className="text-xs text-gray-500">Entry Time</p>
                          <p className="text-sm font-medium">{formatDateTime(item.entryTime)}</p>
                        </div>
                      </div>

                      <div className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-red-600 mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z"
                          />
                        </svg>
                        <div>
                          <p className="text-xs text-gray-500">Exit Time</p>
                          <p className="text-sm font-medium">{formatDateTime(item.exitTime)}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col justify-center md:items-end">
                      <div className="mb-2">
                        <p className="text-xs text-gray-500">Time Spent</p>
                        <p className="text-sm font-medium">{calculateTimeSpent(item.entryTime, item.exitTime)}</p>
                      </div>

                      <div>
                        <p className="text-xs text-gray-500">Amount Paid</p>
                        <p className="text-lg font-bold text-green-600">{item.amountPaid}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-xl shadow-md">
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
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900">No parking history</h3>
            <p className="mt-2 text-sm text-gray-500">You haven't parked with us yet.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default HistoryPage
