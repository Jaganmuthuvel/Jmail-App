import React from "react";
import { Upload, FileText, Send } from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";
import * as XLSX from "xlsx";


export default function BulkMailUI() {
  const [msg, setMsg] = useState()
  const [file1, setFile1] = useState([])
  const [status,setStatus]=useState(false)
  const handleonchange = (event) => {
    setMsg(event.target.value)
  }
  useEffect(() => {
    console.log("file1 updated:", file1);
  }, [file1]);
  const handlefile = (event) => {
    const file = event.target.files[0]
    const reader = new FileReader()
    reader.onload = function (event) {
      const data = event.target.result
      const workbook = XLSX.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0]

      const worksheet = workbook.Sheets[sheetName]
      const emailList = XLSX.utils.sheet_to_json(worksheet, { header: 'A' })
      const totalmails = emailList.map(function (item) { return item.A })

      setFile1(totalmails)

    }
    reader.readAsArrayBuffer(file);
  }
  const handleonclick = () => {
    setStatus(true)
    axios.post(" https://jmail-app-1.onrender.com", { msg: msg, file1: file1 })
    .then(function(data){
      if(data.data===true){
        alert("Email Send Successfully")
        setStatus(false)  
      }else{
        alert("Email Failed")
      }
    })
      

  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-blue-100 to-purple-200 flex items-center justify-center p-6">

      <div className="bg-white/80 backdrop-blur-xl shadow-2xl rounded-3xl overflow-hidden grid md:grid-cols-2 w-full max-w-5xl">

        {/* Left Info Panel */}
        <div className="bg-gradient-to-br from-blue-600 to-purple-700 text-white p-10 flex flex-col justify-center">
          <h1 className="text-3xl font-bold mb-4">📨  JMail Sender</h1>
          <p className="text-lg mb-6 opacity-90">
            Upload your email list, write your message, and send emails to
            thousands in one go.
          </p>
          <ul className="space-y-3">
            <li className="flex items-center gap-2">
              <Upload size={20} /> Easy File Upload
            </li>
            <li className="flex items-center gap-2">
              <FileText size={20} /> Rich Email Content
            </li>
            <li className="flex items-center gap-2">
              <Send size={20} /> One-Click Send
            </li>
          </ul>
        </div>

        {/* Right Form Panel */}
        <div className="p-10">
          {/* Upload */}
          <label className="block mb-6">
            <span className="text-gray-800 font-semibold">Upload Email List</span>
            <input
              onChange={handlefile}
              id="fileInput"
              type="file"
              className="mt-2 block w-full text-sm text-gray-600
                file:mr-4 file:py-2 file:px-4
                file:rounded-lg file:border-0
                file:text-sm file:font-semibold
                file:bg-purple-600 file:text-white
                hover:file:bg-purple-700
                cursor-pointer"
            />
          </label>
          <div className="mb-2">
            No of emails:{file1.length}
          </div>

          {/* Email Content */}
          <label className="block mb-6">
            <span className="text-gray-800 font-semibold">Email Content</span>
            <textarea onChange={handleonchange}
              value={msg}
              rows="6"
              className="mt-2 block w-full rounded-xl border border-gray-300 shadow-md
                focus:ring-2 focus:ring-purple-500 focus:border-purple-500
                p-4 text-gray-700"
              placeholder="Write your email here..."
            />
          </label>

          {/* Send Button */}
          <button
            className="w-full flex items-center justify-center gap-2
              bg-gradient-to-r from-purple-600 to-blue-600
              text-white font-semibold py-3 rounded-xl shadow-lg
              hover:from-purple-700 hover:to-blue-700 transition duration-300" onClick={handleonclick}>
            <Send size={20} /> {status?"Sending...":"Send"}
          </button>
        </div>
      </div>
    </div>
  );
}
