import { useNavigate } from "react-router-dom";
import { useState } from "react";


function Parking() {
  const navigate = useNavigate();

 
  const screen = (
    <div className="h-full">

      <div className="flex flex-col items-center justify-center h-full bg-green overflow-auto">
        {/* Parking lot container */}
        <div className="flex flex-col items-center justify-center bg-gray-500">
      

          {/* Top side parking spots (4 items) */}
          <div className="flex flex-row items-center justify-center border-t-8 border-l-8 border-r-8 border-red">
            <div className="w-36 h-36 bg-green text-center"></div>
            <div className="w-24 h-36 flex items-center justify-center bg-gray-500 border-t-8 border-l-8 border-r-4 border-white font-mono text-2xl">00</div>
            <div className="w-24 h-36 flex items-center justify-center bg-gray-500 border-t-8 border-l-4 border-r-4 border-white font-mono text-2xl">01</div>
            <div className="w-24 h-36 flex items-center justify-center bg-gray-500 border-t-8 border-l-4 border-r-4 border-white font-mono text-2xl">02</div>
            <div className="w-24 h-36 flex items-center justify-center bg-gray-500 border-t-8 border-l-4 border-r-8 border-white font-mono text-2xl">03</div>
            <div className="w-36 h-36 bg-green text-center"></div>
          </div>

          <div className="flex flex-row bg-box_color items-center justify-center border-l-8 border-r-8 border-red">
            <div className="w-36 h-24 flex items-center justify-center bg-gray-500 border-t-8 border-l-8 border-b-4 border-white font-mono text-2xl">10</div>
            <div className="w-24 h-24 bg-black border-4 border-gray-500 text-center">PA</div>
            <div className="w-24 h-24 bg-black border-4 border-gray-500 text-center">PA</div>
            <div className="w-24 h-24 bg-black border-4 border-gray-500 text-center">PA</div>
            <div className="w-24 h-24 bg-black border-4 border-gray-500 text-center">PA</div>
            <div className="w-36 h-24 flex items-center justify-center bg-gray-500 border-t-8 border-r-8 border-b-4 border-white font-mono text-2xl">11</div>
          </div>

          <div className="flex flex-row items-center justify-center border-l-8 border-r-8 border-red">
            <div className="w-36 h-24 flex items-center justify-center bg-gray-500 border-t-4 border-l-8 border-b-4 border-white font-mono text-2xl">20</div>
            <div className="w-24 h-24 bg-black border-4 border-gray-500 text-center">PA</div>
            <div className="w-24 h-24 bg-black border-gray-500 border-t-4 border-l-4 rounded-tl-2xl text-center">PA</div>
            <div className="w-24 h-24 bg-black border-gray-500 border-t-4 border-r-4 rounded-tr-2xl text-center">PA</div>
            <div className="w-24 h-24 bg-black border-4 border-gray-500 text-center">PA</div>
            <div className="w-36 h-24 flex items-center justify-center bg-gray-500 border-t-4 border-r-8 border-b-4 border-white font-mono text-2xl">21</div>
          </div>

          <div className="flex flex-row items-center justify-center border-l-8 border-r-8 border-red">
            <div className="w-36 h-24 flex items-center justify-center bg-gray-500 border-t-4 border-l-8 border-b-8 border-white font-mono text-2xl">30</div>
            <div className="w-24 h-24 bg-black border-4 border-gray-500 text-center">PA</div>
            <div className="w-24 h-24 bg-black border-gray-500 border-b-4 border-l-4 rounded-bl-2xl text-center">PA</div>
            <div className="w-24 h-24 bg-black border-gray-500 border-b-4 border-r-4 rounded-br-2xl text-center">PA</div>
            <div className="w-24 h-24 bg-black border-4 border-gray-500 text-center">PA</div>
            <div className="w-36 h-24 flex items-center justify-center bg-gray-500 border-t-4 border-r-8 border-b-8 border-white font-mono text-2xl">31</div>
          </div>

          <div className="flex flex-row items-center justify-center border-l-8 border-r-8 border-red">
            <div className="w-36 h-24 bg-green text-center"></div>
            <div className="w-24 h-24 bg-black border-4 border-gray-500 text-center">PA</div>
            <div className="w-24 h-24 bg-black border-4 border-gray-500 text-center">PA</div>
            <div className="w-24 h-24 bg-black border-4 border-gray-500 text-center">PA</div>
            <div className="w-24 h-24 bg-black border-4 border-gray-500 text-center">PA</div>
            <div className="w-36 h-24 bg-green border-b-8 border-red text-center "></div>
          </div>

          <div className="flex flex-row items-center justify-center border-l-8 border-l-red border-r-8 border-r-gray-500">
            <div className="w-36 h-24 bg-green border-b-8 border-red text-center"></div>
            <div className="w-24 h-24 bg-black flex flex-row items-center justify-center border-b-8">
              <div className="h-full w-full bg-gray-500 border-b-yellow border-b-8">
                  sda
              </div>
            </div>
            <div className="w-24 h-24 bg-blue text-center border-b-8">PA</div>
            <div className="w-24 h-24 bg-blue text-center border-b-8">PA</div>
            <div className="w-24 h-24 bg-gray-500 text-center border-t-8 border-yellow border-b-8 border-b-white">PA</div>
            <div className="w-36 h-24 bg-gray-500 text-center border-b-8"></div>
          </div>

   
        </div>
      </div>
    </div>
  );

  return screen;
}

export default Parking;