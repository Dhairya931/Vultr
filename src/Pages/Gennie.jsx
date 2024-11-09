import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const Gennie = () => {
    const [userMessage, setUserMessage] = useState("");
    const [chatHistory, setChatHistory] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const chatContainerRef = useRef(null);
  
    const apiKey = "AZCH6BUZFADQIH2DT4IKWSTUJKWGZ3JWOH6A"; 
    const apiUrl = "https://api.vultrinference.com/v1/chat/completions";
  
    useEffect(() => {
      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
      }
    }, [chatHistory]);
  
    const handleSendMessage = async (e) => {
      e.preventDefault();
      if (!userMessage.trim()) return;
  
      setIsLoading(true);
      setChatHistory((prev) => [...prev, { sender: "user", text: userMessage }]);
  
      try {
        const response = await axios.post(
          apiUrl,
          {
            model: "zephyr-7b-beta-Q5_K_M",
            messages: [
              { role: "system", content: "Provide skills required for the specified job title." },
              { role: "user", content: `Job title: ${userMessage}` }
            ],
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${apiKey}`,
            },
          }
        );
  
        const botMessage =
          response.data.choices[0]?.message?.content ||
          "I'm not sure about the skills required for that job.";
  
        setChatHistory((prev) => [...prev, { sender: "bot", text: botMessage }]);
      } catch (error) {
        console.error("Error:", error);
        setChatHistory((prev) => [
          ...prev,
          { sender: "bot", text: "Error fetching response from API." },
        ]);
      }
  
      setIsLoading(false);
      setUserMessage("");
    };

  return (
    <div className="max-w-full mt-10 max-h-full mx-auto p-6 bg-gradient-to-br from-blue-900 to-indigo-800 rounded-lg shadow-lg text-white">
      <h2 className="text-3xl font-semibold mb-6 text-center">Welcome by Gennie 🤖</h2>
      
      <div
        ref={chatContainerRef}
        className="border border-gray-300 rounded-lg p-4 h-[400px] overflow-y-auto bg-white text-gray-800 shadow-inner space-y-3"
      >
        {chatHistory.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`rounded-lg px-4 py-2 max-w-[75%] shadow-sm ${
                message.sender === "user"
                  ? "bg-blue-800 text-white animate-slideIn"
                  : "bg-gray-200 text-gray-900 animate-slideIn"
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700">
              <div className="animate-pulse">Thinking...</div>
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSendMessage} className="flex gap-4 mt-6">
        <input
          type="text"
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
          placeholder="Enter your dream job tittle"
          className="flex-1 px-4 py-2 rounded-lg border-2 border-blue-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-500 focus:ring-blue-200 text-black"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !userMessage.trim()}
          className="px-6 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white font-semibold transition duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default Gennie;
