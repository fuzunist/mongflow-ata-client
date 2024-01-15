// ChatBox.jsx
import React, { useState, useEffect } from "react";
import {
  sendMessage,
  runAssistant,
  getAssistantResponse,
  createThread,
} from "@/gpt/UseTheAssistant";
import { Input } from "antd";

const { Search } = Input;

const ChatBox = ({ assistantId, threadId: passedThreadId }) => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [threadId, setThreadId] = useState(passedThreadId);
  const [isLoading, setIsLoading]=useState(false)

  useEffect(() => {
    const initializeThread = async () => {
      if (!passedThreadId) {
        const newThread = await createThread();
        console.log("New thread ID:", newThread.id); // Debugging
        setThreadId(newThread.id);
      }
    };

    initializeThread();
  }, [passedThreadId]);

  const handleUserInput = async (value, _e) => {
    console.log("clicked handleUserInput");
    console.log("userıipuy", userInput);
    _e.preventDefault();
    console.log("Handling user input...");

    if (userInput.trim() === "") {
      console.log("User input is empty.");
      return;
    }
    if (!threadId) {
      console.log("Thread ID is not available.");
      return;
    }

    try {
      setIsLoading(true)
      console.log("Adding user message to chat");
      // setMessages((prev) => [...prev, { role: "user", content: userInput }]);

      console.log("Sending message to thread:", threadId);
      await sendMessage(threadId, userInput);

      console.log(
        "Running the assistant with threadId:",
        threadId,
        "and assistantId:",
        assistantId
      );
      await runAssistant(threadId, assistantId, "Answer this question");

      console.log("Setting timeout to fetch assistant's response.");
      // Fetch the assistant's response after a short delay
      console.log("Setting timeout to fetch assistant's response.");
      setTimeout(async () => {
        console.log(
          "Timeout completed. Getting assistant's response for threadId:",
          threadId
        );
        const assistantMessages = await getAssistantResponse(threadId);

        if (assistantMessages.length > 0) {
          const firstMessageObject = assistantMessages[0]; // Get the first message object from the array
          console.log("First message object:", firstMessageObject);

          if (firstMessageObject.length > 0) {
            const firstResponseValue = firstMessageObject[0].text.value;
            console.log("First assistant response value:", firstResponseValue);
            setMessages((prev) => [
              ...prev,
              { role: "assistant", content: firstResponseValue },
            ]);
          } else {
            console.log(
              "Text value is not available in the first message object."
            );
            setMessages((prev) => [
              ...prev,
              { role: "assistant", content: "No response found." },
            ]);
          }
          setIsLoading(false)
        } else {
          console.log("Assistant messages array is empty.");
          setMessages((prev) => [
            ...prev,
            { role: "assistant", content: "No response found." },
          ]);
          setIsLoading(false)

        }
      }, 5000);

      console.log("Clearing the input field.");
      setUserInput("");
    } catch (error) {
      console.error("Error in handleUserInput:", error);
      setIsLoading(false)
      
    }
  };

  return (
    <div className="chat-box">
      <form>
        <Search
          placeholder="Grafik hakkında bilgi al"
          enterButton="Sor"
          size="large"
          loading={isLoading}
          className="text-white "
          
          // suffix={suffix}
          onSearch={handleUserInput}
          // onPressEnter={handleUserInput}
          onChange={(e) => setUserInput(e.target.value)}
        />
        {/* <input
          type="text"
          value={userInput}
          onChange={}
          placeholder="Ask a question..."
        /> */}
        {/* <button type="submit">Send</button> */}
      </form>
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.role}`}>
            {msg.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatBox;
