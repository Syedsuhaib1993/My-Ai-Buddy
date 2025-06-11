import React, { useEffect, useRef, useState } from "react";
import Typewriter from "./components/Typewriter";
import RecentSearch from "./components/RecentSearch";
import QuestionAnswer from "./components/QuestionAnswer";

const App = () => {
  const URI =
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyAGrbXIAQh89CetWI3UyuHjXCZI6E9o-oc";
  const [question, setquestion] = useState("");
  const [answer, setanswer] = useState([]);
  const [recentHistory, setRecentHistory] = useState(
    JSON.parse(localStorage.getItem("history"))
  );
  const [selectedHistory, setSelectedHistory] = useState("");
  const scrollToAns = useRef();
  const [loader, setLoader] = useState(false);
  const [isDark, setIsDark] = useState(false);

  const getAnswer = async () => {
    if (!question && !selectedHistory) {
      return false;
    }
    if (question) {
      if (localStorage.getItem("history")) {
        let history = JSON.parse(localStorage.getItem("history"));
        history = [question, ...history];
        localStorage.setItem("history", JSON.stringify(history));
        setRecentHistory(history);
      } else {
        localStorage.setItem("history", JSON.stringify([question]));
        setRecentHistory([question]);
      }
    }
    const payLoadData = question ? question : selectedHistory;
    const payload = {
      contents: [
        {
          parts: [
            {
              text: payLoadData,
            },
          ],
        },
      ],
    };
    setLoader(true);
    let response = await fetch(URI, {
      method: "POST",
      body: JSON.stringify(payload),
    });
    response = await response.json();
    let dataString = response.candidates[0].content.parts[0].text;
    dataString = dataString.split("* ");
    dataString = dataString.map((item) => item.trim());
    // console.log(dataString);
    setanswer([
      ...answer,
      { type: "q", text: question ? question : selectedHistory },
      { type: "a", text: dataString },
    ]);
    // console.log(answer);
    setquestion("");
    setTimeout(() => {
      scrollToAns.current.scrollTop = scrollToAns.current.scrollHeight;
    }, 500);
    setLoader(false);
  };
 
  const isEnter = (event) => {
    // console.log(event.key);
    if (event.key === "Enter") {
      getAnswer();
    }
  };
  useEffect(() => {
    console.log(selectedHistory);
    getAnswer();
  }, [selectedHistory]);
  return (
    <div className="grid grid-cols-5 h-screen bg-[#F9F9F9] text-black dark:bg-zinc-900 dark:text-white transition-colors duration-300">
      <RecentSearch isDark={isDark} setIsDark={setIsDark} recentHistory={recentHistory} setRecentHistory={setRecentHistory} setSelectedHistory={setSelectedHistory}/>
      <div className="md:col-span-4 col-span-5 p-10 ">
        <div className="flex justify-center ">
            <Typewriter text={"HHello User, How can I assist you today?"} />
             {loader ? (
          <div className="mt-5 " role="status">
            <svg
              aria-hidden="true"
              className="w-8 h-8 text-gray-600 animate-spin  fill-blue-800"
              viewBox="0 0 100 101"
              fill="#27272a"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        ) : null}

        </div>
       
        <div ref={scrollToAns} className=" container  h-[430px] overflow-y-auto px-2 ">
          <div>
            <ul>
              {answer.map((item, index) => (
               <QuestionAnswer key={index} item={item}  index={index}/>
              ))}
            </ul>
          </div>
        </div>
        <div className="md:w-1/2 w-3/4 dark:bg-zinc-800 bg-zinc-300 flex mx-auto mt-2 text-white px-3 py-4 rounded-3xl border border-zinc-700 transition duration-300 focus-within:ring-4 focus-within:ring-green-300 focus-within:shadow-[0_0_10px_2px_rgba(34,197,94,0.6)] ">
          <input
            value={question}
            onChange={(event) => setquestion(event.target.value)}
            className="w-full dark:bg-zinc-800 bg-zinc-300 outline-none transition duration-300"
            type="text"
            placeholder="Ask me Anything"
            onKeyDown={isEnter}
          />
          <button onClick={getAnswer} className="text-white hover:bg-[0_0_10px_2px_rgba(34,197,94,0.6)]">
            {
              isDark?(<svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#FFFFFF"
            >
              <path d="M120-160v-640l760 320-760 320Zm80-120 474-200-474-200v140l240 60-240 60v140Zm0 0v-400 400Z" />
            </svg>):(
              <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#000000"
            >
              <path d="M120-160v-640l760 320-760 320Zm80-120 474-200-474-200v140l240 60-240 60v140Zm0 0v-400 400Z" />
            </svg>
            )
            }
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
