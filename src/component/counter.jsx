import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import FlipUnit from "./FlipUnit"; // 导入 FlipUnit 组件

export default function Timer() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [bgColor, setBgColor] = useState("bg-black");
  const [isFullscreen, setIsFullscreen] = useState(!!document.fullscreenElement);
  const [prevTime, setPrevTime] = useState(0);

  useEffect(() => {
    const savedTime = localStorage.getItem("timer-time");
    const savedRunning = localStorage.getItem("timer-running");
    if (savedTime) setTime(parseInt(savedTime, 10));
    if (savedRunning === "true") setIsRunning(true);
  }, []);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);    
  }, [isRunning]);

  useEffect(() => {
    if (!isRunning) {
      localStorage.setItem("timer-time", time);
      localStorage.setItem("timer-running", isRunning);
    }
    setPrevTime(time);
  }, [time, isRunning]);

  const saveRecord = () => {
    const newRecord = {
      time: `${hours.join(":")}:${minutes.join(":")}:${seconds.join(":")}`,
      date: new Date().toLocaleString(),
    };

    const savedRecords = JSON.parse(localStorage.getItem("timer-records")) || [];
    savedRecords.push(newRecord);
    localStorage.setItem("timer-records", JSON.stringify(savedRecords));
  };

  useEffect(() => {
    if (!isRunning && time > 0) {
      saveRecord(); // 自动保存记录
    }
  }, [isRunning]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement && document.documentElement.requestFullscreen) {
        // 进入全屏
        document.documentElement.requestFullscreen().catch((err) => {
          console.error("进入全屏失败:", err);
        });
      } else if (document.exitFullscreen) {
        // 退出全屏
        document.exitFullscreen().catch((err) => {
          console.error("退出全屏失败:", err);
        });
      }
  };

  const formatTimeUnit = (unit) => String(unit).padStart(2, "0").split("");
  const hours = formatTimeUnit(Math.floor(time / 3600) % 24);
  const minutes = formatTimeUnit(Math.floor((time % 3600) / 60));
  const seconds = formatTimeUnit(time % 60);
  
  const prevHours = formatTimeUnit(Math.floor(prevTime / 3600) % 24);
  const prevMinutes = formatTimeUnit(Math.floor((prevTime % 3600) / 60));
  const prevSeconds = formatTimeUnit(prevTime % 60);

  const toggleBackground = () => {
    const colors = [
      "bg-red-500",
      "bg-blue-500",
      "bg-green-500",
      "bg-yellow-500",
      "bg-purple-500",
      "bg-pink-500",
      "bg-indigo-500",
      "bg-teal-500",
    ];
    setBgColor((prev) => {
      let newColor;
      do {
        newColor = colors[Math.floor(Math.random() * colors.length)];
      } while (newColor === prev); // 确保新颜色与当前颜色不同
      return newColor;
    });
  };


  // 添加键盘快捷键
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Enter") {
        // 按下 Enter 键开始/暂停计时
        setIsRunning((prev) => !prev);
      } else if (event.key === "c") {
        // 按下 C 键切换背景颜色
        toggleBackground();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  
  return (
    <motion.div 
      className={`flex flex-col items-center justify-center min-h-screen ${bgColor}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="flex p-6 rounded-xl shadow-2xl">
        {[hours, minutes, seconds].map((unit, index) => (
          <div key={index} className="flex space-x-2 p-4 rounded-lg">
            {index !== 0 && (
              <div class="flip-clock-divider relative w-2 h-full" style={{ left: '-17px' }} >
                <span class="flip-clock-label"></span>
                <span class="flip-clock-dot top"></span>
                <span class="flip-clock-dot bottom"></span>
                </div>
            )}
            <FlipUnit digit={unit[0]} prevDigit={[prevHours, prevMinutes, prevSeconds][index][0]} />
            <FlipUnit digit={unit[1]} prevDigit={[prevHours, prevMinutes, prevSeconds][index][1]} />
          </div>
        ))}
      </div>
      {!isFullscreen && (
        <div className="mt-6 space-x-4">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className="px-6 py-3 bg-white text-black rounded-lg shadow-md text-lg"
          >
            {isRunning ? "暂停" : "开始"}
          </button>
          <button
            onClick={() => {
              setTime(0);
              setIsRunning(false);
              localStorage.removeItem("timer-time");
              localStorage.removeItem("timer-running");
            }}
            className="px-6 py-3 bg-gray-700 text-white rounded-lg shadow-md text-lg"
          >
            重置
          </button>
          <button
            onClick={toggleFullscreen}
            className="px-6 py-3 bg-black text-white rounded-lg shadow-md text-lg"
          >
            {isFullscreen ? "退出全屏" : "全屏显示"}
          </button>
          <button
            onClick={toggleBackground}
            className="px-6 py-3 bg-gray-500 text-white rounded-lg shadow-md text-lg"
          >
            切换背景
          </button>
        </div>
      )}
    </motion.div>
  );
}
