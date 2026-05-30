/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { 
  Sun, Cloud, CloudRain, ShieldAlert, Compass, Anchor, Calendar, CloudSun, Wind, Thermometer, Clock, ShieldCheck, Ship, ChevronLeft, ChevronRight, Activity, Crown
} from "lucide-react";
import { WeatherInfo } from "../types";
import { fetchWeather, destinations } from "../utils/weather";

// Helper to render weather condition icon with premium colors
const getWeatherIcon = (condition: string) => {
  const cond = condition.toLowerCase();
  if (cond.includes("雨") || cond.includes("陣雨") || cond.includes("落水") || cond.includes("水")) {
    return <CloudRain className="w-3.5 h-3.5 text-sky-400 mx-auto" />;
  }
  if (cond.includes("雲") || cond.includes("陰") || cond.includes("霧")) {
    return <Cloud className="w-3.5 h-3.5 text-slate-350 mx-auto" />;
  }
  return <Sun className="w-3.5 h-3.5 text-amber-500 mx-auto" />;
};

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
  };

  const handleNextWeather = () => {
    if (navigator.vibrate) navigator.vibrate(15);
    setActiveWeatherIndex(Math.min(activeWeatherIndex + 1, destinations.length - 1));
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
        <h1 className="text-xl font-black tracking-[0.06em] font-sans uppercase text-[#2c1d11] leading-none">
          MSC BELLISSIMA
        </h1>
        <p className="text-[10px] font-extrabold text-amber-800 tracking-wider uppercase mt-1 leading-none">
          Sasebo · Kagoshima <span className="text-stone-500 font-bold font-sans">/ 佐世保 · 鹿兒島</span>
        </p>
      </header>

      {/* WEATHER LANDSCAPE SCROLLABLE ROW (左右滑動) */}
      <article className="px-3 select-none">
        <div 
          ref={scrollRef}
          className="flex gap-2.5 overflow-x-auto pb-1 hover:pb-1 snap-x snap-mandatory scroll-smooth scrollbar-none"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {destinations.map((dest, idx) => {
            const isSelected = activeWeatherIndex === idx;
            const weather = weatherProfiles[dest.name];
            return (
              <div
                key={dest.name}
                onClick={() => {
                  if (navigator.vibrate) navigator.vibrate(15);
                  setActiveWeatherIndex(idx);
                }}
                className={`snap-center shrink-0 w-[245px] relative bg-white border rounded-2xl p-2.5 shadow-sm transition-all duration-300 cursor-pointer ${
                  isSelected 
                    ? "border-amber-500 ring-1 ring-amber-500/20 bg-[#fffdf0]" 
                    : "border-stone-200/90 bg-[#fdfbf6] opacity-80 hover:opacity-100 hover:border-slate-400"
                }`}
              >
                {/* Header Tag in Card */}
                <div className="flex justify-between items-center mb-1 leading-none">
                  <span className="text-[8.5px] text-amber-800 font-extrabold tracking-wider uppercase bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20">
                    {dest.label}
                  </span>
                  <span className="text-[8.5px] text-stone-500 font-mono font-bold">
                    {dest.dateStr}
                  </span>
                </div>

                <h3 className="text-xs font-black text-stone-900 flex items-center gap-1 leading-none my-1.5">
                  <CloudSun className={`w-3.5 h-3.5 ${isSelected ? "text-amber-600 animate-pulse-slow font-bold" : "text-stone-400"}`} />
                  {dest.name}
                </h3>

                {loading ? (
                  <div className="h-5 flex items-center justify-start py-0.5 px-2">
                    <div className="w-3.5 h-3.5 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
                  </div>
                ) : weather ? (
                  <div className="flex items-center gap-2 select-none leading-none mt-1">
                    <span className="text-lg font-black text-stone-950 font-mono tracking-tighter">
                      {weather.temp}
                    </span>
                    <div className="text-left flex flex-col justify-center gap-0.5">
                      <p className="text-[9.5px] text-stone-800 font-bold leading-none">{weather.condition}</p>
                      <p className="text-[8px] text-stone-500 font-mono flex items-center gap-0.5 leading-none">
                        <Wind className="w-2.5 h-2.5 text-blue-500 flex-shrink-0" />
                        {weather.windSpeed}
                      </p>
                    </div>
                  </div>
                ) : (
                  <p className="text-[8.5px] text-red-500">無法加載天氣</p>
                )}
              </div>
            );
          })}
        </div>

        {/* Small subtle indicators under the carousel */}
        <div className="flex justify-center gap-1 mt-1.5 select-none">
          {destinations.map((_, idx) => (
            <button
               key={idx}
               onClick={() => {
                 if (navigator.vibrate) navigator.vibrate(15);
                 setActiveWeatherIndex(idx);
               }}
              className={`h-1.5 rounded-full transition-all cursor-pointer ${
                activeWeatherIndex === idx ? "w-3 bg-amber-600" : "w-1.5 bg-stone-300 hover:bg-stone-450"
              }`}
            />
          ))}
        </div>

        {/* Hourly Previews Toggler for focused destination weather profile */}
        {currentWeather && (() => {
          const now = new Date();
          const nowYear = now.getFullYear();
          const nowMonth = String(now.getMonth() + 1).padStart(2, "0");
          const nowDate = String(now.getDate()).padStart(2, "0");
          const nowHour = now.getHours();
          const todayStr = `${nowYear}-${nowMonth}-${nowDate}`;

          const filteredHourly = currentWeather.hourly.filter(h => {
            if (currentDest.dateStr === todayStr) {
              const hHour = parseInt(h.time.split(":")[0]);
              return hHour >= nowHour;
            }
            return true;
          });

          return (
            <div className="mt-2 bg-[#fffdf6] border border-stone-200/80 p-2 rounded-xl text-center shadow-inner">
              <button 
                onClick={() => {
                  if (navigator.vibrate) navigator.vibrate(20);
                  setShowHourly(!showHourly);
                }}
                className="text-[9.5px] text-stone-850 font-extrabold tracking-wider uppercase hover:text-amber-800 active:scale-95 transition-all inline-flex items-center gap-1 select-none cursor-pointer leading-none"
              >
                <Clock className="w-3.5 h-3.5 text-amber-600" />
                <span>{showHourly ? "關閉 逐小時預報" : `展開 ${currentDest.name.split("/")[1] || currentDest.name} 逐小時氣溫預報`}</span>
              </button>

              {/* Hourly sliding carousel axis */}
              {showHourly && (
                <div className="flex gap-1.5 overflow-x-auto pt-2 pb-0.5 select-text scroll-smooth" id="hourly-carousel">
                  {filteredHourly.length > 0 ? (
                    filteredHourly.map((h, hIdx) => (
                      <div 
                        key={hIdx} 
                        className="min-w-[46px] bg-white p-1.5 rounded-lg border border-stone-150 text-center flex-shrink-0 flex flex-col items-center justify-center gap-0.5 shadow-sm"
                      >
                        <span className="text-[8.5px] text-stone-500 font-mono font-bold block">{h.time}</span>
                        <span className="text-[10px] font-extrabold text-stone-900 font-mono block">{h.temp}</span>
                        <div className="mt-0.5 flex items-center justify-center h-4 w-4">
                          {getWeatherIcon(h.condition)}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-2 text-stone-500 text-[10px] sm:text-xs">
                      目前時段已無後續逐小時預報
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })()}
      </article>

      {/* HIGH-END SYMMETRICAL 2x3 UNIFIED GRID WITH SILK-GOLD BONE CONTEXT */}
      <article className="px-3 mt-3.5 select-none">
        <div className="grid grid-cols-2 gap-2.5 w-full">
          {/* Card 1: Explore */}
          <button
            onClick={() => {
              if (navigator.vibrate) navigator.vibrate(25);
              onOpenDeckPlan();
            }}
            className="px-2 py-3 rounded-2xl bg-[#f4edd9]/90 border border-[#e6dec8] flex items-center gap-1.5 text-left relative overflow-hidden group active:scale-95 shadow-sm hover:shadow-md hover:bg-[#ebdfcc] transition-all cursor-pointer h-[98px] sm:h-[104px]"
            id="tool-explore-deck"
          >
            <div className="p-2 rounded-xl bg-orange-100/50 text-amber-900 group-hover:bg-amber-150 group-hover:text-amber-905 transition-colors flex-shrink-0">
              <Compass className="w-[18px] h-[18px] stroke-[2.2]" />
            </div>
            <div className="flex flex-col min-w-0 leading-tight flex-1">
              <span className="text-[8.5px] font-mono font-bold text-amber-800 tracking-wide uppercase leading-none mb-1">EXPLORE</span>
              <span className="text-[15.5px] sm:text-[16.5px] font-black text-stone-900 leading-none py-0.5">郵輪地圖</span>
              <span className="text-[8.5px] min-[360px]:text-[9.5px] text-stone-600 font-bold mt-1 block whitespace-nowrap tracking-tight">查看各層設施佈局</span>
            </div>
          </button>

          {/* Card 2: MSC Yacht Club */}
          <button
            onClick={() => handleGridClick(1, "yacht_club")}
            className="px-2 py-3 rounded-2xl bg-[#f4edd9]/90 border border-[#e6dec8] flex items-center gap-1.5 text-left relative overflow-hidden group active:scale-95 shadow-sm hover:shadow-md hover:bg-[#ebdfcc] transition-all cursor-pointer h-[98px] sm:h-[104px]"
            id="tool-yacht-club"
          >
            <div className="p-2 rounded-xl bg-orange-100/50 text-amber-900 group-hover:bg-amber-150 group-hover:text-amber-905 transition-colors flex-shrink-0">
              <Crown className="w-[18px] h-[18px] stroke-[2.2]" />
            </div>
            <div className="flex flex-col min-w-0 leading-tight flex-1">
              <span className="text-[8.5px] font-mono font-bold text-amber-800 tracking-wide uppercase leading-none mb-1">YACHT CLUB</span>
              <span className="text-[15.5px] sm:text-[16.5px] font-black text-stone-900 leading-none py-0.5">地中海遊艇會</span>
              <span className="text-[8.5px] min-[360px]:text-[9.5px] text-stone-600 font-bold mt-1 block whitespace-nowrap tracking-tight">尊榮船中船貴賓攻略</span>
            </div>
          </button>

          {/* Card 3: Sasebo */}
          <button
            onClick={() => handleGridClick(2, "port", "sasebo")}
            className="px-2 py-3 rounded-2xl bg-[#f4edd9]/90 border border-[#e6dec8] flex items-center gap-1.5 text-left relative overflow-hidden group active:scale-95 shadow-sm hover:shadow-md hover:bg-[#ebdfcc] transition-all cursor-pointer h-[98px] sm:h-[104px]"
            id="tool-sasebo"
          >
            <div className="p-2 rounded-xl bg-orange-100/50 text-amber-900 group-hover:bg-amber-150 group-hover:text-amber-905 transition-colors flex-shrink-0">
              <Anchor className="w-[18px] h-[18px] stroke-[2.2]" />
            </div>
            <div className="flex flex-col min-w-0 leading-tight flex-1">
              <span className="text-[8.5px] font-mono font-bold text-amber-800 tracking-wide uppercase leading-none mb-1">SASEBO</span>
              <span className="text-[15.5px] sm:text-[16.5px] font-black text-stone-900 leading-none py-0.5">佐世保</span>
              <span className="text-[8px] min-[360px]:text-[8.5px] sm:text-[9px] text-stone-600 font-extrabold mt-1 block whitespace-nowrap tracking-tighter">08:00抵達 ‧ 20:00啟航</span>
            </div>
          </button>

          {/* Card 4: Kagoshima */}
          <button
            onClick={() => handleGridClick(3, "port", "kagoshima")}
            className="px-2 py-3 rounded-2xl bg-[#f4edd9]/90 border border-[#e6dec8] flex items-center gap-1.5 text-left relative overflow-hidden group active:scale-95 shadow-sm hover:shadow-md hover:bg-[#ebdfcc] transition-all cursor-pointer h-[98px] sm:h-[104px]"
            id="tool-kagoshima"
          >
            <div className="p-2 rounded-xl bg-orange-100/50 text-amber-900 group-hover:bg-amber-150 group-hover:text-amber-905 transition-colors flex-shrink-0">
              <Anchor className="w-[18px] h-[18px] stroke-[2.2]" />
            </div>
            <div className="flex flex-col min-w-0 leading-tight flex-1">
              <span className="text-[8.5px] font-mono font-bold text-amber-800 tracking-wide uppercase leading-none mb-1">KAGOSHIMA</span>
              <span className="text-[15.5px] sm:text-[16.5px] font-black text-stone-900 leading-none py-0.5">鹿兒島</span>
              <span className="text-[8px] min-[360px]:text-[8.5px] sm:text-[9px] text-stone-600 font-extrabold mt-1 block whitespace-nowrap tracking-tighter">09:00抵達 ‧ 20:00啟航</span>
            </div>
          </button>

          {/* Card 5: Onboard */}
          <button
            onClick={() => handleGridClick(4, "info", "onboard")}
            className="px-2 py-3 rounded-2xl bg-[#f4edd9]/90 border border-[#e6dec8] flex items-center gap-1.5 text-left relative overflow-hidden group active:scale-95 shadow-sm hover:shadow-md hover:bg-[#ebdfcc] transition-all cursor-pointer h-[98px] sm:h-[104px]"
            id="tool-onboard"
          >
            <div className="p-2 rounded-xl bg-orange-100/50 text-amber-900 group-hover:bg-amber-150 group-hover:text-amber-905 transition-colors flex-shrink-0">
              <Ship className="w-[18px] h-[18px] stroke-[2.2]" />
            </div>
            <div className="flex flex-col min-w-0 leading-tight flex-1">
              <span className="text-[8.5px] font-mono font-bold text-amber-800 tracking-wide uppercase leading-none mb-1">ONBOARD</span>
              <span className="text-[15.5px] sm:text-[16.5px] font-black text-stone-900 leading-none py-0.5">登船日</span>
              <span className="text-[8px] min-[360px]:text-[8.5px] sm:text-[9px] text-stone-600 font-extrabold mt-1 block whitespace-nowrap tracking-tighter">06/25 ‧ 17:00 啟航</span>
            </div>
          </button>

          {/* Card 6: Ashore */}
          <button
            onClick={() => handleGridClick(5, "info", "offboard")}
            className="px-2 py-3 rounded-2xl bg-[#f4edd9]/90 border border-[#e6dec8] flex items-center gap-1.5 text-left relative overflow-hidden group active:scale-95 shadow-sm hover:shadow-md hover:bg-[#ebdfcc] transition-all cursor-pointer h-[98px] sm:h-[104px]"
            id="tool-offboard"
          >
            <div className="p-2 rounded-xl bg-orange-100/50 text-amber-900 group-hover:bg-amber-150 group-hover:text-amber-905 transition-colors flex-shrink-0">
              <Calendar className="w-[18px] h-[18px] stroke-[2.2]" />
            </div>
            <div className="flex flex-col min-w-0 leading-tight flex-1">
              <span className="text-[8.5px] font-mono font-bold text-amber-800 tracking-wide uppercase leading-none mb-1">ASHORE</span>
              <span className="text-[15.5px] sm:text-[16.5px] font-black text-stone-900 leading-none py-0.5">離船日</span>
              <span className="text-[8px] min-[360px]:text-[8.5px] sm:text-[9px] text-stone-600 font-extrabold mt-1 block whitespace-nowrap tracking-tighter">06/30 ‧ 06:00 抵達</span>
            </div>
          </button>

        </div>
      </article>
    </section>
  );
}
