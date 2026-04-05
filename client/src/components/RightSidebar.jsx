import React, { useContext, useEffect, useState } from "react";
import assets from "../assets/assets";
import { ChatContext } from "../../context/ChatContext";
import { AuthContext } from "../../context/AuthContext";
import { CallContext } from "../../context/CallContext";
import { ThemeContext } from "../../context/ThemeContext";

const RightSidebar = () => {
  const { selectedUser, messages, setIsProfileOpen } = useContext(ChatContext);
  const { logout, onlineUsers } = useContext(AuthContext);
  const { startCall } = useContext(CallContext);
  const { isDark } = useContext(ThemeContext);
  const [msgImages, setMsgImages] = useState([]);

  // Get all the images from the messages and set them to state
  useEffect(() => {
    if (messages?.length) {
      setMsgImages(messages.filter((msg) => msg.image).map((msg) => msg.image));
    }
  }, [messages]);

  return (
    selectedUser && (
      <div className={`fixed inset-0 md:relative md:border-l backdrop-blur-3xl w-full z-[100] md:z-auto overflow-y-auto custom-scrollbar flex flex-col p-6 md:p-8 pt-safe pb-safe transition-all duration-500 ${isDark ? 'bg-[#0f172a]/95 md:bg-white/5 border-white/10 text-white' : 'bg-white/95 md:bg-slate-50 border-slate-100 text-slate-900'}`}>
        {/* Close Button */}
        <button
          onClick={() => setIsProfileOpen(false)}
          className={`absolute top-4 right-4 md:top-6 md:right-6 p-2 rounded-full transition-all active:scale-90 z-20 mt-safe mr-safe ${isDark ? 'hover:bg-white/5 text-gray-400 hover:text-white' : 'hover:bg-slate-200 text-slate-400 hover:text-slate-600'}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Profile Section */}
        <div className="flex flex-col items-center mt-10">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full blur opacity-40 group-hover:opacity-60 transition duration-1000 group-hover:duration-200"></div>
            <img
              src={selectedUser?.profilePic || assets.avatar_icon}
              alt="Profile"
              className={`relative w-28 h-28 rounded-full object-cover border-4 shadow-2xl transition-all duration-500 ${isDark ? 'border-[#1a1a1a]' : 'border-white'}`}
            />
            {onlineUsers.includes(selectedUser._id) && (
              <div className="absolute bottom-1 right-1 w-5 h-5 bg-[#22c55e] border-4 border-[#1a1a1a] rounded-full shadow-[0_0_15px_rgba(34,197,94,0.6)]"></div>
            )}
          </div>

          <h1 className={`mt-6 text-2xl font-bold tracking-tight flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            {selectedUser.fullName}
          </h1>

          <p className={`mt-4 px-4 text-center text-sm leading-relaxed max-w-[240px] opacity-70 ${isDark ? 'text-gray-400' : 'text-slate-500 font-medium'}`}>
            {selectedUser.bio || "Hey, I am using Quick Chat"}
          </p>

          <div className="flex items-center gap-4 mt-8 w-full justify-center px-6">
            <button
              onClick={() => startCall(selectedUser, 'voice')}
              className={`flex-1 flex flex-col items-center gap-2 p-4 rounded-3xl transition-all active:scale-95 ${isDark ? 'bg-white/5 hover:bg-white/10 border border-white/5' : 'bg-slate-100 hover:bg-slate-200 border border-slate-200'} group`}
            >
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-500 group-hover:scale-110 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" /></svg>
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Voice Call</span>
            </button>
            <button
              onClick={() => startCall(selectedUser, 'video')}
              className={`flex-1 flex flex-col items-center gap-2 p-4 rounded-3xl transition-all active:scale-95 ${isDark ? 'bg-white/5 hover:bg-white/10 border border-white/5' : 'bg-slate-100 hover:bg-slate-200 border border-slate-200'} group`}
            >
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-500 group-hover:scale-110 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" /></svg>
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Video Call</span>
            </button>
          </div>
        </div>

        <div className={`w-full h-px my-10 ${isDark ? 'bg-gradient-to-r from-transparent via-white/10 to-transparent' : 'bg-gradient-to-r from-transparent via-slate-200 to-transparent'}`}></div>

        {/* Media Section */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-4">
            <p className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-gray-400' : 'text-slate-400'}`}>Media</p>
            <p className="text-indigo-400 text-[10px] font-bold cursor-pointer hover:underline">View All</p>
          </div>

          <div className="grid grid-cols-2 gap-3 overflow-y-auto max-h-[300px] custom-scrollbar rounded-2xl">
            {msgImages.length > 0 ? (
              msgImages.map((url, index) => (
                <div
                  key={index}
                  onClick={() => window.open(url)}
                  className={`group relative cursor-pointer aspect-square rounded-xl overflow-hidden border transition-all ${isDark ? 'bg-white/5 border-white/5 hover:border-white/20' : 'bg-white border-slate-200 hover:border-indigo-300 shadow-sm'}`}
                >
                  <img src={url} alt="" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-white">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-2 flex flex-col items-center py-10 opacity-20">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-10 h-10 mb-2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                </svg>
                <p className="text-xs">No media shared</p>
              </div>
            )}
          </div>
        </div>

        <button
          onClick={logout}
          className="mt-8 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 bg-[length:200%_auto] hover:bg-right transition-all duration-500 text-white font-bold py-4 rounded-2xl shadow-[0_10px_20px_-10px_rgba(99,102,241,0.5)] active:scale-95 flex items-center justify-center gap-2 group"
        >
          Logout
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4 transition-transform group-hover:translate-x-1">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
          </svg>
        </button>
      </div>
    )
  );
};

export default RightSidebar;
