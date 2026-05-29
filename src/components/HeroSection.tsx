/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { 
  ShieldAlert, Compass, Anchor, Calendar, CloudSun, Wind, Thermometer, Clock, ShieldCheck, Ship, ChevronLeft, ChevronRight, Activity
} from "lucide-react";
import { WeatherInfo } from "../types";
import { fetchWeather, destinations } from "../utils/weather";

interface HeroSectionProps {
  onOpenDeckPlan: () => void;
  onNavigateToTab: (pageName: string, subTab?: string) => void;
  activeWeatherIndex: number;
  setActiveWeatherIndex: (index: number) => void;
}

export default function HeroSection({ 
  onOpenDeckPlan, 
  onNavigateToTab,
  activeWeatherIndex,
  setActiveWeatherIndex
}: HeroSectionProps) {
  const [weatherProfiles, setWeatherProfiles] = useState<Record<string, WeatherInfo>>({});
  const [loading, setLoading] = useState(true);
  const [showHourly, setShowHourly] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Load weather profiles from free endpoint
  useEffect(() => {
    async function loadAllDestinationsWeather() {
      setLoading(true);
      const results: Record<string, WeatherInfo> = {};
      
      const promises = destinations.map(async (dest) => {
        const info = await fetchWeather(dest.latitude, dest.longitude, dest.name, dest.dateStr);
        results[dest.name] = info;
      });

      await Promise.all(promises);
      setWeatherProfiles(results);
      setLoading(false);

      // Default directly to Keelung (Index 0) at start-up as requested by user
      setActiveWeatherIndex(0);
    }
    loadAllDestinationsWeather();
  }, [setActiveWeatherIndex]);

  // Sync scroll positioning of Weather slider
  useEffect(() => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const child = container.children[activeWeatherIndex] as HTMLDivElement;
      if (child) {
        container.scrollTo({
          left: child.offsetLeft - container.offsetWidth / 2 + child.offsetWidth / 2,
          behavior: "smooth"
        });
      }
    }
  }, [activeWeatherIndex]);

  // Current selected weather index info
  const currentDest = destinations[activeWeatherIndex];
  const currentWeather = weatherProfiles[currentDest.name];

  const handlePrevWeather = () => {
    if (navigator.vibrate) navigator.vibrate(15);
    setActiveWeatherIndex(Math.max(activeWeatherIndex - 1, 0));
    setShowHourly(false);
  };

  const handleNextWeather = () => {
    if (navigator.vibrate) navigator.vibrate(15);
    setActiveWeatherIndex(Math.min(activeWeatherIndex + 1, destinations.length - 1));
    setShowHourly(false);
  };

  const handleGridClick = (gridIndex: number, navPage: string, subTab?: string) => {
    if (navigator.vibrate) navigator.vibrate(25);
    
    // Sync Weather indicator with clicked card profile if applicable
    if (gridIndex === 2) setActiveWeatherIndex(1); // Sasebo
    if (gridIndex === 3) setActiveWeatherIndex(2); // Kagoshima
    if (gridIndex === 4) setActiveWeatherIndex(0); // 6/25
    if (gridIndex === 5) setActiveWeatherIndex(3); // 6/30

    onNavigateToTab(navPage, subTab);
  };

  return (
    <section id="hero" className="flex flex-col gap-2.5 flex-1 select-none pb-1.5">
      
      {/* HEADER HERO LOGO BRIDGES */}
      <header className="text-center pt-2 pb-0.5 select-none">
        <h1 className="text-xl font-black tracking-[0.24em] font-sans uppercase bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200 bg-clip-text text-transparent leading-none">
          MSC BELLISSIMA
        </h1>
        <p className="text-[10px] font-extrabold text-amber-500/90 tracking-wider uppercase mt-1 leading-none">
          Sasebo · Kagoshima <span className="text-slate-405 font-bold font-sans">/ 佐世保 · 鹿兒島</span>
        </p>
      </header>

      {/* WEATHER LANDSCAPE CAROUSEL CARD */}
      <article className="px-3">
        <div className="relative bg-[#13233f]/90 border border-[#233a5f] rounded-2xl p-2 md:p-2.5 shadow-md overflow-hidden">
          
          {/* Subtle ocean underlight decoration */}
          <div className="absolute -right-20 -top-20 w-28 h-28 rounded-full bg-blue-500/10 blur-2xl pointer-events-none" />
          
          {/* Main profile row */}
          <div className="flex justify-between items-center select-none">
            
            {/* Left Button */}
            <button 
              onClick={handlePrevWeather}
              disabled={activeWeatherIndex === 0}
              className={`p-1.5 rounded-lg bg-[#1f304f] border border-[#2d446b] text-white transition-all cursor-pointer ${
                activeWeatherIndex === 0 ? "opacity-20 pointer-events-none bg-slate-800/50" : "hover:bg-[#2d446b] active:scale-95"
              }`}
            >
              <ChevronLeft className="w-3.5 h-3.5 stroke-[2.5]" />
            </button>

            {/* Core Destination Weather Detail */}
            <div className="text-center flex-1 mx-2">
              <span className="text-[9px] text-amber-400 font-extrabold tracking-wider uppercase bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 leading-none">
                {currentDest.label} · {currentDest.dateStr}
              </span>
              <h2 className="text-xs font-black text-white mt-1 flex items-center justify-center gap-1 leading-none">
                <CloudSun className="w-3.5 h-3.5 text-amber-400 animate-pulse-slow" />
                {currentDest.name}
              </h2>
              
              {loading ? (
                <div className="h-4 flex items-center justify-center mt-1">
                  <div className="w-3 h-3 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
                </div>
              ) : currentWeather ? (
                <div className="mt-1 flex justify-center items-center gap-1.5 select-none leading-none">
                  <span className="text-lg font-black text-white font-mono tracking-tighter">
                    {currentWeather.temp}
                  </span>
                  <div className="text-left flex flex-col justify-center">
                    <p className="text-[10px] text-slate-200 font-bold leading-none">{currentWeather.condition}</p>
                    <p className="text-[8px] text-slate-400 font-mono flex items-center gap-0.5 mt-0.5 leading-none">
                      <Wind className="w-2 h-2 text-blue-400" />
                      {currentWeather.windSpeed}
                    </p>
                  </div>
                </div>
              ) : (
                <p className="text-[9px] text-red-450 mt-1">無法加載天氣資料</p>
              )}
            </div>

            {/* Right Button */}
            <button 
              onClick={handleNextWeather}
              disabled={activeWeatherIndex === destinations.length - 1}
              className={`p-1.5 rounded-lg bg-[#1f304f] border border-[#2d446b] text-white transition-all cursor-pointer ${
                activeWeatherIndex === destinations.length - 1 ? "opacity-20 pointer-events-none bg-slate-800/50" : "hover:bg-[#2d446b] active:scale-95"
              }`}
            >
              <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </button>

          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-1 mt-1 select-none">
            {destinations.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  if (navigator.vibrate) navigator.vibrate(15);
                  setActiveWeatherIndex(idx);
                  setShowHourly(false);
                }}
                className={`h-1 rounded-full transition-all cursor-pointer ${
                  activeWeatherIndex === idx ? "w-3 bg-amber-500" : "w-1 bg-slate-600 hover:bg-slate-500"
                }`}
              />
            ))}
          </div>

          {/* Hourly Previews Toggler (Tap to Toggle Inline Drawer) */}
          {currentWeather && (
            <div className="mt-1 border-t border-[#233a5f] pt-1 text-center pointer-events-auto">
              <button 
                onClick={() => {
                  if (navigator.vibrate) navigator.vibrate(20);
                  setShowHourly(!showHourly);
                }}
                className="text-[9px] text-slate-300 font-extrabold tracking-wider uppercase hover:text-amber-400 active:scale-95 transition-all inline-flex items-center gap-0.5 select-none cursor-pointer leading-none"
              >
                <Clock className="w-3 h-3 text-amber-500" />
                <span>{showHourly ? "關閉 24H" : "展開 24H 氣溫預報"}</span>
              </button>

              {/* Hourly sliding carousel axis */}
              {showHourly && (
                <div className="flex gap-1 overflow-x-auto pt-1 pb-0.5 select-text scroll-smooth" id="hourly-carousel">
                  {currentWeather.hourly.map((h, hIdx) => (
                    <div 
                      key={hIdx} 
                      className="min-w-[44px] bg-[#1a2c4e] p-1 rounded-lg border border-[#2d446b] text-center flex-shrink-0"
                    >
                      <span className="text-[8px] text-slate-400 font-mono font-bold block mb-0.5">{h.time}</span>
                      <span className="text-[10px] font-black text-white font-mono block mb-0.5">{h.temp}</span>
                      <span className="text-[8px] font-bold text-amber-405 block">{h.condition}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>
      </article>

      {/* HIGH-END SYMMETRICAL 2x3 ICON GRID (LARGE MAIN TOUCH TARGET) */}
      <article className="px-3 mt-1 select-none">
        <div className="grid grid-cols-2 gap-2.5 w-full">
          
          {/* Card 1: Explore Deck Plan */}
          <button
            onClick={() => {
              if (navigator.vibrate) navigator.vibrate(25);
              onOpenDeckPlan();
            }}
            className="p-3 rounded-2xl bg-[#14233c]/90 border border-[#233a5f] flex items-center gap-2.5 text-left relative overflow-hidden group active:scale-95 hover:border-amber-500 shadow-md transition-all cursor-pointer h-[74px] sm:h-[80px]"
            id="tool-explore-deck"
          >
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 group-hover:scale-105 transition-transform flex-shrink-0">
              <Compass className="w-[18px] h-[18px] stroke-[2.2]" />
            </div>
            <div className="flex flex-col min-w-0 leading-tight">
              <h4 className="text-[11px] font-black uppercase tracking-tight text-white leading-tight">
                EXPLORE DECK <span className="text-amber-450 font-sans block text-[10px] font-bold mt-0.5">探索郵輪地圖</span>
              </h4>
              <p className="text-[9px] text-slate-300 font-bold mt-0.5">查看各層設施佈局</p>
            </div>
          </button>

          {/* Card 2: MSC Yacht Club (AUTHENTIC GOLD ON NAVY LOGO) */}
          <button
            onClick={() => handleGridClick(1, "yacht_club")}
            className="p-3 rounded-2xl bg-[#14233c]/90 border border-amber-500/40 flex items-center gap-2.5 text-left relative overflow-hidden group active:scale-95 hover:border-amber-500 shadow-md transition-all cursor-pointer h-[74px] sm:h-[80px]"
            id="tool-yacht-club"
          >
            <div className="w-[34px] h-[34px] rounded-full overflow-hidden border border-amber-500/40 flex-shrink-0 bg-[#070e1b] flex items-center justify-center p-0.5 group-hover:scale-105 transition-transform shadow-md">
              <img 
                src="/src/assets/images/yacht_club_lotus_logo_1780043451979.png" 
                alt="MSC Yacht Club Icon" 
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex flex-col min-w-0 leading-tight">
              <h4 className="text-[11px] font-black uppercase tracking-tight text-amber-455 leading-tight">
                YACHT CLUB <span className="text-white font-sans block text-[10px] font-bold mt-0.5">尊享遊艇會</span>
              </h4>
              <p className="text-[9px] text-slate-300 font-bold mt-0.5">尊榮船中船貴賓攻略</p>
            </div>
          </button>

          {/* Card 3: Sasebo */}
          <button
            onClick={() => handleGridClick(2, "port", "sasebo")}
            className="p-3 rounded-2xl bg-[#14233c]/90 border border-[#233a5f] hover:border-amber-500 flex items-center gap-2.5 text-left relative overflow-hidden group active:scale-95 transition-all duration-300 border cursor-pointer h-[74px] sm:h-[80px]"
            id="tool-sasebo"
          >
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 group-hover:scale-105 transition-transform flex-shrink-0">
              <Anchor className="w-[18px] h-[18px] stroke-[2.2]" />
            </div>
            <div className="flex flex-col min-w-0 leading-tight">
              <h4 className="text-[11px] font-black uppercase tracking-tight text-white leading-tight">
                SASEBO <span className="text-amber-400 font-sans block text-[10px] font-bold mt-0.5">佐世保港</span>
              </h4>
              <p className="text-[9px] text-slate-300 font-bold mt-0.5">08:00 抵 ‧ 20:00 啟</p>
            </div>
          </button>

          {/* Card 4: Kagoshima */}
          <button
            onClick={() => handleGridClick(3, "port", "kagoshima")}
            className="p-3 rounded-2xl bg-[#14233c]/90 border border-[#233a5f] hover:border-amber-500 flex items-center gap-2.5 text-left relative overflow-hidden group active:scale-95 transition-all duration-300 border cursor-pointer h-[74px] sm:h-[80px]"
            id="tool-kagoshima"
          >
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 group-hover:scale-105 transition-transform flex-shrink-0">
              <Anchor className="w-[18px] h-[18px] stroke-[2.2]" />
            </div>
            <div className="flex flex-col min-w-0 leading-tight">
              <h4 className="text-[11px] font-black uppercase tracking-tight text-white leading-tight">
                KAGOSHIMA <span className="text-amber-400 font-sans block text-[10px] font-bold mt-0.5">鹿兒島港</span>
              </h4>
              <p className="text-[9px] text-slate-300 font-bold mt-0.5">09:00 抵 ‧ 20:00 啟</p>
            </div>
          </button>

          {/* Card 5: Onboard 6/25 */}
          <button
            onClick={() => handleGridClick(4, "info", "onboard")}
            className="p-3 rounded-2xl bg-[#14233c]/90 border border-[#233a5f] hover:border-amber-500 flex items-center gap-2.5 text-left relative overflow-hidden group active:scale-95 transition-all duration-300 border cursor-pointer h-[74px] sm:h-[80px]"
            id="tool-onboard"
          >
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 group-hover:scale-105 transition-transform flex-shrink-0">
              <Ship className="w-[18px] h-[18px] stroke-[2.2]" />
            </div>
            <div className="flex flex-col min-w-0 leading-tight">
              <h4 className="text-[11px] font-black uppercase tracking-tight text-white leading-tight">
                ONBOARD <span className="text-amber-400 font-sans block text-[10px] font-bold mt-0.5">登船啟程</span>
              </h4>
              <p className="text-[9px] text-slate-300 font-bold mt-0.5">06/25 ‧ 17:00 啟航</p>
            </div>
          </button>

          {/* Card 6: Ashore 6/30 */}
          <button
            onClick={() => handleGridClick(5, "info", "offboard")}
            className="p-3 rounded-2xl bg-[#14233c]/90 border border-[#233a5f] hover:border-amber-500 flex items-center gap-2.5 text-left relative overflow-hidden group active:scale-95 transition-all duration-300 border cursor-pointer h-[74px] sm:h-[80px]"
            id="tool-offboard"
          >
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 group-hover:scale-105 transition-transform flex-shrink-0">
              <Calendar className="w-[18px] h-[18px] stroke-[2.2]" />
            </div>
            <div className="flex flex-col min-w-0 leading-tight">
              <h4 className="text-[11px] font-black uppercase tracking-tight text-white leading-tight">
                ASHORE <span className="text-amber-400 font-sans block text-[10px] font-bold mt-0.5">返港離船</span>
              </h4>
              <p className="text-[9px] text-slate-300 font-bold mt-0.5">06/30 ‧ 06:00 抵境</p>
            </div>
          </button>

        </div>
      </article>

    </section>
  );
}
