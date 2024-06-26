"use client";
import React, { useState, useRef, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import "./ChatBot.css";
const messageTone = "/messageTone.mp3";
// Import Popupsound from the public directory
const Popupsound = "/popup-sound.mp3";
import fetchUserInfo from "./userinfo"; // Import the userinfo.js function
import chatbotData from "./chatbotData.json"; // Import the JSON data
import jokeData from "./jokeData.json";
import Image from "next/image";
const ChatBot = () => {
  const [showChatbot, setShowChatbot] = useState(false);
  const [messages, setMessages] = useState([]);
  const inputRef = useRef(null);
  const chatboxRef = useRef(null);
  const [firstTime, setFirstTime] = useState(true);
  const [chatbotOpened, setChatbotOpened] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  useEffect(() => {
    if (showChatbot) {
      inputRef.current.focus();
      if (firstTime) {
        setTimeout(() => {
          handleBotMessage(
            "Hello! I am Thowfick's virtual assistant. How may I assist you today?"
          );
          playMessageTone();
          setFirstTime(false);
        }, 2000);
      }
    }
  }, [showChatbot, firstTime]);

  const toggleChatbot = () => {
    const popupAudio = new Audio(Popupsound);
    popupAudio.play();

    // Close the chatbot if it is already open and the device is in mobile view
    if (showChatbot && isMobileView) {
      setShowChatbot(false);
    } else {
      setShowChatbot((prev) => !prev);
    }

    setChatbotOpened((prev) => !prev);
  };

  const handleUserMessage = async (message) => {
    if (message.trim() === "") {
      return;
    }

    setMessages((prevMessages) => [
      ...prevMessages,
      { text: message, type: "user" },
    ]);

    // Check for auto-reply based on patterns
    const matchedReply = chatbotData.find(({ patterns }) =>
      patterns.some((pattern) => new RegExp(pattern, "i").test(message))
    );

    if (matchedReply) {
      setTimeout(() => {
        handleBotMessage(matchedReply.reply);
        playMessageTone();
        chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
      }, 1000);
    } else {
      // If no pattern is found, reply with a default message
      setTimeout(() => {
        handleBotMessage("Sorry, I am in the developing stage.");
        playMessageTone();
        chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
      }, 1000);

      // Ask a follow-up question with options for input
      setTimeout(() => {
        handleBotMessage("Please select an option:", [
          "Shall i say about you?",
          "Do you want to know about me?",
          "Shall i tell a joke to you?",
        ]);
        playMessageTone();
        chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
      }, 2000);
    }

    inputRef.current.value = "";
  };

  const handleBotMessage = (message, options) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: message, type: "bot", options },
    ]);
  };

  const playMessageTone = () => {
    const audio = new Audio(messageTone);
    audio.play();
  };

  const handleOptionClick = async (option) => {
    // Define configuration object for each option
    const optionConfig = {
      "Shall i say about you?": {
        message: "Please wait while I gather information about you...",
        action: async () => {
          try {
            const userMessages = await fetchUserInfo();
            if (userMessages) {
              userMessages.forEach((userMessage, index) => {
                setTimeout(() => {
                  handleBotMessage(userMessage);
                  playMessageTone();
                  chatboxRef.current.scrollTop =
                    chatboxRef.current.scrollHeight;
                }, 1000 * (index + 1));
              });
            } else {
              throw new Error("Unable to retrieve user information.");
            }
          } catch (error) {
            handleBotMessage(error.message);
            playMessageTone();
            chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
          }
        },
      },
      "Do you want to know about me?": {
        message: "Let me provide some information about myself...",
        action: () => {
          const aboutMeMessages = [
            "You can check out my creator's portfolio at https://thowfickofficial.netlify.app. It showcases various projects and skills!",
            "Mohamed Thowfick has expertise in web development, programming languages like JavaScript, React, Node.js, and more!",
            "With a passion for cybersecurity, ethical hacking, and full stack development, Mohamed Thowfick is an aspiring IT professional.",
            "Explore Mohamed Thowfick's skills in Git, Docker, WordPress, MongoDB, MySQL, Python, Node.js, PHP, C, Bash, Typing, Linux, Networking, Computer Hardware, Web Applications, CLI App Development on Linux, Photoshop, Figma, React, HTML5, CSS3, JavaScript, Tailwind CSS, Bootstrap, and more.",
            "Explore Mohamed Thowfick's internship experience in Cyber Security, Full Stack Development, and Web Development.",
            "Learn about Mohamed Thowfick's educational journey, including a Bachelor of Business Administration, Secondary School Education, and a Diploma in Computer Hardware Technology.",
            "With a passion for cybersecurity, ethical hacking, and full stack development, I'm Mohamed Thowfick—an aspiring IT professional. Throughout my self-learning journey, My career goals revolve around exploring the extreme of technology. I aspire to make a meaningful impact in the IT and cybersecurity industry by ensuring robust security measures and staying ahead of emerging threats. Let's connect to explore how my skills and passion can contribute to the advancement of cybersecurity and the IT industry. Seeking growth opportunities and ready to make a positive impact!",
          ];
          aboutMeMessages.forEach((message, index) => {
            setTimeout(() => {
              handleBotMessage(message);
              playMessageTone();
              chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
            }, 1000 * (index + 1));
          });
        },
      },
      "Shall i tell a joke to you?": {
        message: "Get ready for a good laugh...",
        action: () => {
          handleBotMessage(
            `Alright, here's a joke for you: ${getRandomJoke()}`
          );
          playMessageTone();
          chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
          setTimeout(() => {
            handleBotMessage("Would you like to hear another joke?");
            playMessageTone();
            chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
          }, 1000);
          setTimeout(() => {
            handleBotMessage("Please select an option:", ["Yes", "No"]);
            playMessageTone();
            chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
          }, 2000);
        },
      },
      Yes: {
        message: "Here's another joke for you:",
        action: () => {
          handleBotMessage(
            `${
              optionConfig["Shall i tell a joke to you?"].message
            } ${getRandomJoke()}`
          );
          playMessageTone();
          chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
          setTimeout(() => {
            handleBotMessage("Would you like to hear another joke?");
            playMessageTone();
            chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
          }, 1000);
          setTimeout(() => {
            handleBotMessage("Please select an option:", ["Yes", "No"]);
            playMessageTone();
            chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
          }, 2000);
        },
      },
      No: {
        message:
          "Thank you for chatting with me! If you have any other questions, feel free to ask.",
        action: () => {
          handleBotMessage(optionConfig[option].message);
          playMessageTone();
          chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
        },
      },
    };

    // Execute action based on the selected option
    const { message, action } = optionConfig[option];
    handleBotMessage(`You have chosen: "${option}". ${message}`);
    await action();

    // Play message tone and scroll to bottom of chatbox
    playMessageTone();
    chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
  };

  // Function to get a random joke from the joke data
  const getRandomJoke = () => {
    const randomIndex = Math.floor(Math.random() * jokeData.length);
    return jokeData[randomIndex];
  };
  useEffect(() => {
    // Check window width on mount and on resize
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 767);
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize); // Listen for resize events

    // Cleanup function to remove resize event listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    // Scroll to the bottom of the chatbox container
    if (chatboxRef.current && (messages.length > 0 || chatbotOpened)) {
      chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
    }
  }, [messages, chatbotOpened]);
  const width = 300; // Adjust this value as needed
  const height = 400;
  return (
    <div
      className={`chatbot-container ${showChatbot ? "show-chatbot" : ""} ${
        isMobileView ? "mobile-view" : ""
      }`}
      onClick={() => {
        // When the chatbot container is clicked, close it
        if (isMobileView && showChatbot) {
          toggleChatbot();
        }
      }}
    >
      {showChatbot && (
        <div className="chatbot">
          <div className="chat-header">
            <div className="chatbot-logo-container">
              <Image
                src="/images/chatbot/ChatBotLogo.png"
                alt="Chatbot Logo"
                className="chatbot-logo"
                width={width}
                height={height}
              />
            </div>
            <h2>Chatbot</h2>
            {isMobileView && (
              <button
                className="mob-chatbot-close-icon"
                onClick={toggleChatbot} // Update here
              >
                <FaTimes />
              </button>
            )}
          </div>
          <div ref={chatboxRef} className="chat-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.type}`}>
                {msg.text}
                {msg.options && (
                  <div className="options">
                    {msg.options.map((option, optionIndex) => (
                      <button
                        key={optionIndex}
                        onClick={() => handleOptionClick(option)}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="chat-input">
            <input
              ref={inputRef}
              type="text"
              placeholder="Type your message..."
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleUserMessage(e.target.value);
                }
              }}
            />
            <button
              onClick={() =>
                inputRef.current && handleUserMessage(inputRef.current.value)
              }
            >
              Send
            </button>
          </div>
        </div>
      )}
      {showChatbot && !isMobileView ? (
        <button className="chatbot-close-icon" onClick={toggleChatbot}>
          <FaTimes />
        </button>
      ) : (
        <button className="chatbot-icon" onClick={toggleChatbot}>
          <Image
            src="/images/chatbot/chatbot.png"
            alt="Chatbot"
            width={width}
            height={height}
          />
        </button>
      )}
    </div>
  );
};

export default ChatBot;
