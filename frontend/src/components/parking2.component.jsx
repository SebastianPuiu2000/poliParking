import { useState, useEffect } from "react"

function Parking() {
  const [hoveredSpot, setHoveredSpot] = useState(null)
  const [showStatsPopup, setShowStatsPopup] = useState(false)
  const [showTimer, setShowTimer] = useState(false)
  const [timeLeft, setTimeLeft] = useState(300) // 5 minutes in seconds

  // Define parking spots status
  const parkingSpots = {
    "00": { status: "available" },
    "01": { status: "occupied" },
    "02": { status: "available" },
    "03": { status: "available" },
    10: { status: "available" },
    11: { status: "occupied" },
    20: { status: "reserved" },
    21: { status: "available" },
    30: { status: "occupied" },
    31: { status: "available" },
    40: { status: "reserved" },
  }

  // Calculate parking statistics
  const parkingStats = {
    total: Object.keys(parkingSpots).length,
    available: Object.values(parkingSpots).filter((spot) => spot.status === "available").length,
    occupied: Object.values(parkingSpots).filter((spot) => spot.status === "occupied").length,
    reserved: Object.values(parkingSpots).filter((spot) => spot.status === "reserved").length,
  }

  // Function to toggle stats popup
  const toggleStatsPopup = () => {
    setShowStatsPopup(!showStatsPopup)
  }

  // Function to toggle timer
  const toggleTimer = () => {
    if (!showTimer) {
      setShowTimer(true)
      setTimeLeft(300) // Reset to 5 minutes when starting
    }
  }

  // Countdown timer effect
  useEffect(() => {
    let interval
    if (showTimer && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1)
      }, 1000)
    } else if (timeLeft === 0) {
      setShowTimer(false)
    }
    return () => clearInterval(interval)
  }, [showTimer, timeLeft])

  // Format time as MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  // Define parking spot component for reusability
  const ParkingSpot = ({ id, status = "available" }) => {
    const isHovered = hoveredSpot === id
    const isOccupied = status === "occupied"
    const isReserved = status === "reserved"

    return (
      <div
        className={`h-full w-full relative cursor-default transition-all duration-200 ${
          isHovered ? "ring-2 ring-blue-600" : ""
        } ${isOccupied ? "bg-gray-200" : "bg-white hover:bg-blue-50"}`}
        onMouseEnter={() => status !== "occupied" && setHoveredSpot(id)}
        onMouseLeave={() => setHoveredSpot(null)}
      >
        {/* Car silhouette (only if occupied) */}
        {isOccupied && (
          <div className="absolute inset-2 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="w-full h-full text-gray-500"
            >
              <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.5 2.8C1.4 11.3 1 12.1 1 13v3c0 .6.4 1 1 1h2" />
              <circle cx="7" cy="17" r="2" />
              <path d="M9 17h6" />
              <circle cx="17" cy="17" r="2" />
            </svg>
          </div>
        )}

        {/* Spot ID */}
        <div
          className={`absolute bottom-1 right-1 text-xs font-mono ${
            isHovered ? "text-blue-700 font-bold" : "text-gray-500"
          }`}
        >
          {id}
        </div>

        {/* Parking spot indicator */}
        {!isOccupied && (
          <div
            className={`h-full w-full flex items-center justify-center font-bold text-xl ${
              isHovered ? "text-blue-700" : "text-gray-700"
            }`}
          >
            P
          </div>
        )}
      </div>
    )
  }

  // Modified barrier component with smaller purple arrows at the top
  const Barrier = ({ direction = "up" }) => {
    return (
      <div className="relative h-full w-full">
        {/* Smaller purple arrow - positioned at the top of the cell */}
        <div className="absolute top-1 left-0 right-0 flex justify-center z-30">
          {direction === "up" ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="#2563eb" // Darker purple color
              className="drop-shadow-sm"
            >
              <path d="M12 3l8 10H4z" />
              <rect x="11" y="12" width="2" height="9" fill="#2563eb" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="#2563eb" // Darker purple color
              className="drop-shadow-sm"
            >
              <path d="M12 21l-8-10h16z" />
              <rect x="11" y="3" width="2" height="9" fill="#2563eb" />
            </svg>
          )}
        </div>

        {/* Barrier post */}
        <div
          className={`absolute ${direction === "up" ? "bottom-0 left-2" : "bottom-0 right-2"} w-4 h-12 bg-gray-700 rounded-t-sm z-10`}
        ></div>

        {/* Barrier arm */}
        <div
          className={`absolute ${direction === "up" ? "bottom-8 left-4" : "bottom-8 right-4"} h-3 ${direction === "up" ? "w-[calc(100%-16px)]" : "w-[calc(100%-16px)]"} border border-gray-400 z-10`}
        >
          <div className="h-full w-full flex">
            {[...Array(5)].map((_, i) => (
              <div key={i} className={`h-full flex-1 ${i % 2 === 0 ? "bg-red-500" : "bg-white"} ${i === 0  && direction !== "up"  ? "rounded-l-xl" : ""} ${i === 4  && direction === "up"  ? "rounded-r-xl" : ""}`}></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // Stats Popup Component
  const StatsPopup = ({ stats, onClose }) => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">Parking Statistics</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700 focus:outline-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-white border border-gray-300 rounded mr-3"></div>
                <span className="font-medium">Available Spots</span>
              </div>
              <span className="text-xl font-bold text-blue-600">{stats.available}</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-red-100 rounded-lg">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-gray-200 border border-gray-300 rounded mr-3"></div>
                <span className="font-medium">Occupied Spots</span>
              </div>
              <span className="text-xl font-bold text-gray-600">{stats.occupied}</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-white border border-gray-300 rounded mr-3"></div>
                <span className="font-medium">Reserved Spots</span>
              </div>
              <span className="text-xl font-bold text-purple-600">{stats.reserved}</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-200 rounded-lg border-t-2 border-gray-900">
              <span className="font-medium">Total Parking Spots</span>
              <span className="text-xl font-bold text-gray-800">{stats.total}</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white p-4">
      <div className="mx-auto max-w-3xl">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-gray-900">Parking Map</h1>
        </div>

        {/* Parking lot container - centered with flex */}
        <div className="flex justify-center">
          <div className="overflow-auto rounded-lg border-2 border-blue-300 bg-white p-4 shadow-md">
            <div className="flex flex-col">
              {/* Top side parking spots (4 items) */}
              <div className="flex flex-row">
                <div className="h-36 w-36 border border-blue-200 p-2 bg-blue-50"></div>
                <div className="h-36 w-24 border border-blue-300 p-2">
                  <ParkingSpot id="00" status={parkingSpots["00"].status} />
                </div>
                <div className="h-36 w-24 border border-blue-300 p-2">
                  <ParkingSpot id="01" status={parkingSpots["01"].status} />
                </div>
                <div className="h-36 w-24 border border-blue-300 p-2">
                  <ParkingSpot id="02" status={parkingSpots["02"].status} />
                </div>
                <div className="h-36 w-24 border border-blue-300 p-2">
                  <ParkingSpot id="03" status={parkingSpots["03"].status} />
                </div>
                <div className="h-36 w-36 border border-blue-200 p-2 bg-blue-50"></div>
              </div>

              {/* Driving area with parking spots on sides */}
              <div className="flex">
                {/* Left parking spots */}
                <div className="flex flex-col">
                  <div className="h-24 w-36 border border-blue-300 p-2">
                    <ParkingSpot id="10" status={parkingSpots["10"].status} />
                  </div>
                  <div className="h-24 w-36 border border-blue-300 p-2">
                    <ParkingSpot id="20" status={parkingSpots["20"].status} />
                  </div>
                  <div className="h-24 w-36 border border-blue-300 p-2">
                    <ParkingSpot id="30" status={parkingSpots["30"].status} />
                  </div>
                </div>

                {/* Central driving area - without yellow lines */}
                <div className="relative w-96 h-72 bg-gray-400">
                  {/* Road markings - removed yellow lines */}
                  <div className="absolute inset-0">
                    {/* Smaller roundabout in the center with timer button */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-gray-500 border-[3px] border-dashed border-white flex items-center justify-center">
                      <button 
                          onClick={toggleTimer}
                          disabled={showTimer}
                          className={`w-24 h-24 rounded-full border-8 border-blue-700 transition-transform duration-300 transform hover:scale-110 flex flex-col items-center justify-center text-white ${
                            showTimer
                              ? "bg-blue-700 border-gray-600 cursor-not-allowed"
                              : "bg-gray-600 border-blue-700 cursor-pointer"
                          }`}>
                        <div className="font-medium">
                          {showTimer ? "Reserved" : "Reserve"}

                        </div>
                        {/* </button> */}
                        {showTimer && <div className="mt-1 text-[14px] font-medium">{formatTime(timeLeft)}</div>}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Right parking spots */}
                <div className="flex flex-col">
                  <div className="h-24 w-36 border border-blue-300 p-2">
                    <ParkingSpot id="11" status={parkingSpots["11"].status} />
                  </div>
                  <div className="h-24 w-36 border border-blue-300 p-2">
                    <ParkingSpot id="21" status={parkingSpots["21"].status} />
                  </div>
                  <div className="h-24 w-36 border border-blue-300 p-2">
                    <ParkingSpot id="31" status={parkingSpots["31"].status} />
                  </div>
                </div>
              </div>

              {/* Bottom row */}
              <div className="flex flex-row">
                {/* First cell - same as first cell of first row */}
                <div className="h-24 w-36 border border-blue-200 p-2 bg-blue-50"></div>

                {/* Second cell - exit cell with downward arrow - no top border */}
                <div className="h-24 w-24 border-b border-l border-r border-blue-300 p-0 relative bg-gray-400 overflow-hidden">
                  {/* Using the modified Barrier component with smaller purple arrow at the top */}
                  <Barrier direction="down" />
                </div>

                {/* Guard Cabin - spans two cells with a single border */}
                <div
                  className="h-24 w-48 border border-blue-300 p-0 relative bg-gray-200 flex items-center justify-center cursor-pointer hover:bg-gray-300 transition-colors"
                  onClick={toggleStatsPopup}
                >
                  {/* Security camera icon - now clickable */}
                  <div className="flex flex-col items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="60"
                      height="60"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-gray-700"
                    >
                      <rect x="3" y="3" width="18" height="12" rx="2" />
                      <circle cx="12" cy="9" r="3" />
                      <path d="M12 15v6" />
                      <path d="M8 21h8" />
                    </svg>
                    <span className="text-xs mt-1 text-gray-700 font-medium">Click for stats</span>
                  </div>
                </div>

                {/* Entrance with barrier and arrow - no top border */}
                <div className="h-24 w-24 border-b border-l border-r border-blue-300 p-0 relative bg-gray-400 overflow-hidden">
                  {/* Using the modified Barrier component with smaller purple arrow at the top */}
                  <Barrier direction="up" />
                </div>

                <div className="h-24 w-36 border border-blue-200 p-2 bg-blue-50"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="mt-6 flex flex-wrap justify-center gap-4 rounded-lg border border-blue-200 bg-white p-4 text-sm">
          <div className="flex items-center">
            <div className="mr-2 h-4 w-4 rounded border border-gray-300 bg-white flex items-center justify-center text-[8px] font-bold">
              P
            </div>
            <span>Available</span>
          </div>
          <div className="flex items-center">
            <div className="mr-2 h-4 w-4 rounded border border-gray-300 bg-gray-200 flex items-center justify-center">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="w-3 h-3 text-gray-500"
              >
                <path d="M19 17h2v-3l-1.5-1.5C18 10 16 10 16 10s-1-2-2-2H5l-1.5 3L2 13v4h2" />
                <circle cx="7" cy="17" r="1" />
                <path d="M9 17h6" />
                <circle cx="17" cy="17" r="1" />
              </svg>
            </div>
            <span>Occupied</span>
          </div>
          <div className="flex items-center">
            <div className="mr-2 h-4 w-4 rounded border border-gray-300 ring-1 ring-blue-600 bg-blue-50 flex items-center justify-center text-[8px] font-bold text-blue-700">
              P
            </div>
            <span>Hovered</span>
          </div>
          <div className="flex items-center">
            <div className="mr-2 h-4 w-4 rounded border border-gray-300 bg-gray-400"></div>
            <span>Driving Area</span>
          </div>
          <div className="flex items-center">
            <div className="mr-2 h-4 w-8 flex items-center">
              <div className="h-2 w-full bg-red-500 border border-gray-300"></div>
            </div>
            <span>Barrier</span>
          </div>
          <div className="flex items-center">
            <div className="mr-2 h-4 w-4 bg-white border border-gray-300 flex items-center justify-center">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="#2563eb" stroke="none" strokeWidth="1">
                <path d="M12 3l8 10H4z" />
                <rect x="11" y="12" width="2" height="9" fill="#2563eb" />
              </svg>
            </div>
            <span>Direction</span>
          </div>
          <div className="flex items-center">
            <div className="mr-2 h-4 w-4 bg-gray-200 border border-gray-300 flex items-center justify-center">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="w-3 h-3 text-gray-700"
              >
                <rect x="3" y="3" width="18" height="12" rx="2" />
                <circle cx="12" cy="9" r="3" />
              </svg>
            </div>
            <span>Security</span>
          </div>
        </div>
      </div>

      {/* Stats Popup */}
      {showStatsPopup && <StatsPopup stats={parkingStats} onClose={() => setShowStatsPopup(false)} />}
    </div>
  )
}

export default Parking
