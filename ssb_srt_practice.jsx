import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [selectedSRTs, setSelectedSRTs] = useState<number | null>(null);
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);

  const srts = [
    "He was walking alone at midnight and saw a man lying unconscious. He ___",
    "While travelling in a train, he saw someone trying to steal a bag. He ___",
    "During a football match, his team was losing badly. He ___",
    "He saw a child fall into a pond while playing. He ___",
    "He was preparing for exams but electricity went off. He ___",
    "While cycling to school, he saw an accident. He ___",
    "He was asked to speak suddenly on stage. He ___",
    "While going to office, he noticed a fire in a shop. He ___",
    "During trekking, one of his friends slipped and got injured. He ___",
    "On the way to exam, his bicycle chain broke. He ___",
    "While travelling, he found the bus overcrowded. He ___",
    "He saw an old man unable to cross the busy road. He ___",
    "During cricket practice, the ball broke a window. He ___",
    "He was going to interview and rain started heavily. He ___",
    "He was offered money to do something wrong. He ___",
  ];

  // Splash screen timeout
  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Stopwatch logic
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (running) {
      interval = setInterval(() => setTime((t) => t + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [running]);

  const startPractice = (count: number) => {
    setSelectedSRTs(count);
    setTime(0);
    setRunning(true);
  };

  if (showSplash) {
    return (
      <div className="flex items-center justify-center h-screen bg-black text-white">
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-2xl font-semibold"
        >
          Made by Ansh Khilnani
        </motion.h1>
      </div>
    );
  }

  if (!selectedSRTs) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
        <h1 className="text-2xl font-bold mb-6">Select Number of SRTs</h1>
        <div className="grid grid-cols-3 gap-4">
          {[5, 10, 15, 30, 45, 60].map((num) => (
            <button
              key={num}
              onClick={() => startPractice(num)}
              className="px-6 py-3 rounded-2xl shadow-md bg-white hover:bg-gray-200 transition"
            >
              {num}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-start h-screen bg-white p-6 overflow-y-scroll">
      <h1 className="text-xl font-semibold mb-4">SRT Practice ({selectedSRTs} SRTs)</h1>
      <div className="mb-6 text-lg font-mono">⏱ {Math.floor(time / 60)}:{String(time % 60).padStart(2, "0")}</div>

      <div className="grid gap-8 w-full max-w-2xl">
        {Array.from({ length: selectedSRTs }, (_, i) => (
          <div key={i} className="p-4 border rounded-xl shadow-sm bg-gray-50">
            <p className="mb-12 font-medium text-lg">{srts[i % srts.length]}</p>
            <p className="text-gray-400 italic">(Write your response by hand on paper)</p>
          </div>
        ))}
      </div>
    </div>
  );
}
