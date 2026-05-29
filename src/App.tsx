/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { 
  Compass, Anchor, ShieldAlert, Award, Search, Info, HelpCircle, 
  MapPin, Utensils, Wine, ShieldCheck, Heart, Sparkles, Smile, Filter, ChevronRight
} from "lucide-react";

import { Facility } from "./types";
import { facilitiesData } from "./data/facilities";

// Modular sub components
import BottomNav from "./components/BottomNav";
import DeckPlanModal from "./components/DeckPlanModal";
import HeroSection from "./components/HeroSection";
import YachtClubSection from "./components/YachtClubSection";
import PortGuideSection from "./components/PortGuideSection";
import InformationSection from "./components/InformationSection";

const CATEGORY_TAGS = {
  "餐廳": { label: "餐廳餐食", bg: "bg-rose-950/40 text-rose-300 border border-rose-500/20 font-extrabold", accent: "rose" },
  "酒吧": { label: "酒吧", bg: "bg-amber-950/40 text-amber-300 border border-amber-500/20 font-extrabold", accent: "amber" },
  "旅客服務": { label: "賓客服務", bg: "bg-sky-950/40 text-sky-300 border border-sky-500/20 font-extrabold", accent: "sky" },
  "購物與休閒娛樂": { label: "休閒購物", bg: "bg-indigo-950/40 text-indigo-300 border border-indigo-500/20 font-extrabold", accent: "indigo" },
  "水上與戶外娛樂": { label: "水上樂園", bg: "bg-emerald-950/40 text-emerald-300 border border-emerald-500/20 font-extrabold", accent: "emerald" }
};

export default function App() {
  const [activeTab, setActiveTab] = useState<string>("home"); // "home" | "info" | "port" | "yacht_club"
  const [openDeckPlan, setOpenDeckPlan] = useState<boolean>(false);
  const [activeWeatherIndex, setActiveWeatherIndex] = useState<number>(1); // Default to Sasebo (6/27)

  // Subtab preset buffers to sync across button clicks
  const [infoSubTabBuffer, setInfoSubTabBuffer] = useState<string>("prep");
  const [portSubTabBuffer, setPortSubTabBuffer] = useState<string>("tools");

  // Facility filter configurations inside home list
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedDeckFilter, setSelectedDeckFilter] = useState<string>("all");

  // Ref & target tracking for Deck details scroll mapping
  const [highlightedFacilityId, setHighlightedFacilityId] = useState<string | null>(null);

  // Custom multi-navigation routine
  const handleNavigateWithTabs = (pageName: string, subTab?: string) => {
    setActiveTab(pageName);
    if (pageName === "info" && subTab) {
      setInfoSubTabBuffer(subTab === "onboard" ? "onboard" : subTab === "offboard" ? "offboard" : "prep");
    }
    if (pageName === "port" && subTab) {
      setPortSubTabBuffer(subTab === "sasebo" ? "sasebo" : subTab === "kagoshima" ? "kagoshima" : "tools");
    }
  };

  // Callback triggered when "View Details & Find location" is tapped inside Map drawer
  const handleSelectFacilityDetailAndScroll = (facilityId: string) => {
    setOpenDeckPlan(false);
    setActiveTab("home");
    setSearchQuery("");
    setSelectedCategory("all");
    setSelectedDeckFilter("all");

    // Clear highlights
    setHighlightedFacilityId(null);

    // Delay smooth scroll to ensure DOM render has updated
    setTimeout(() => {
      const element = document.getElementById(facilityId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
        setHighlightedFacilityId(facilityId);
        
        // Vibrate to signify successful map routing locking
        if (navigator.vibrate) navigator.vibrate([40, 30, 40]);

        // Remove golden flash outline after 3 seconds
        setTimeout(() => {
          setHighlightedFacilityId(null);
        }, 3600);
      }
    }, 450);
  };

  // Offline service worker scaffolding declaration for literal PWA caching compliance
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker.register("/sw.js").catch((err) => {
          console.log("PWA Service Worker offline registration placeholder bypassed", err);
        });
      });
    }
  }, []);

  // Filter calculations for 40 facilities detail cards listings
  const filteredFacilities = facilitiesData.filter((f) => {
    const matchesSearch = f.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          f.englishName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          f.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || f.category === selectedCategory;
    const matchesDeck = selectedDeckFilter === "all" || f.deck.toString() === selectedDeckFilter;
    return matchesSearch && matchesCategory && matchesDeck;
  });

  return (
    <div className="min-h-screen bg-[#0d1629] text-slate-100 flex flex-col font-sans selection:bg-amber-400 selection:text-black">
      
      {/* GLOBAL BACKGROUND OCEAN SPENCER GRAPHS */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[10%] left-[-25%] w-[80vw] h-[80vw] rounded-full bg-blue-900/15 blur-[140px]" />
        <div className="absolute bottom-[10%] right-[-25%] w-[70vw] h-[70vw] rounded-full bg-amber-950/10 blur-[130px]" />
      </div>

      {/* VIEWPORTS CONTAINER SCROLLER */}
      <main className="flex-1 w-full max-w-xl md:max-w-2xl mx-auto relative z-10 px-3 md:px-5 flex flex-col pb-24">
        
        {/* --- PAGE: HOME (Dashboard, Weather, Grid & Facilities List) --- */}
        {activeTab === "home" && (
          <div className="flex flex-col gap-4 animate-fade-in">
            <HeroSection 
              onOpenDeckPlan={() => setOpenDeckPlan(true)}
              onNavigateToTab={handleNavigateWithTabs}
              activeWeatherIndex={activeWeatherIndex}
              setActiveWeatherIndex={setActiveWeatherIndex}
            />

            {/* HIGH END INTEGRATED SEARCH & FULL DETAILED FACILITIES CARD CORNER */}
            <section className="px-1 space-y-4">
              
              {/* 頂部快速入口（Hybrid Grid - Compact h-[46px] to let 2x3 dominate） */}
              <div className="grid grid-cols-6 gap-2 pt-1 select-none w-full">
                {/* 上層 1x2 大網格（Dining 餐廳 / Bar & Lounge 酒吧） */}
                <button
                  onClick={() => {
                    if (navigator.vibrate) navigator.vibrate(15);
                    setSelectedCategory(selectedCategory === "餐廳" ? "all" : "餐廳");
                  }}
                  className={`col-span-3 h-[46px] flex flex-col justify-center items-center py-1 px-1 rounded-xl cursor-pointer transition-all duration-300 border text-center ${
                    selectedCategory === "餐廳"
                      ? "bg-rose-500/15 border-rose-500/50 text-rose-300 shadow-md ring-1 ring-rose-500/25"
                      : "bg-[#14233c]/80 border-[#223554] text-slate-300 hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <Utensils className={`w-3.5 h-3.5 ${selectedCategory === "餐廳" ? "text-rose-400" : "text-slate-400"}`} />
                    <span className="text-[10px] font-bold mt-0.5 leading-none">美食餐廳</span>
                  </div>
                </button>

                <button
                  onClick={() => {
                    if (navigator.vibrate) navigator.vibrate(15);
                    setSelectedCategory(selectedCategory === "酒吧" ? "all" : "酒吧");
                  }}
                  className={`col-span-3 h-[46px] flex flex-col justify-center items-center py-1 px-1 rounded-xl cursor-pointer transition-all duration-300 border text-center ${
                    selectedCategory === "酒吧"
                      ? "bg-amber-500/15 border-amber-500/50 text-amber-300 shadow-md ring-1 ring-amber-500/25"
                      : "bg-[#14233c]/80 border-[#223554] text-slate-300 hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <Wine className={`w-3.5 h-3.5 ${selectedCategory === "酒吧" ? "text-amber-400" : "text-slate-400"}`} />
                    <span className="text-[10px] font-bold mt-0.5 leading-none">酒吧</span>
                  </div>
                </button>

                {/* 下層 1x3 精巧網格（Services 旅客服務 / Entertainment 購物與休閒娛樂 / Pool & Outdoor 水上與戶外娛樂） */}
                <button
                  onClick={() => {
                    if (navigator.vibrate) navigator.vibrate(15);
                    setSelectedCategory(selectedCategory === "旅客服務" ? "all" : "旅客服務");
                  }}
                  className={`col-span-2 h-[46px] flex flex-col justify-center items-center py-1 px-1 rounded-xl cursor-pointer transition-all duration-300 border text-center ${
                    selectedCategory === "旅客服務"
                      ? "bg-sky-500/15 border-sky-500/50 text-sky-300 shadow-md ring-1 ring-sky-500/25"
                      : "bg-[#14233c]/80 border-[#223554] text-slate-300 hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className={`w-3.5 h-3.5 ${selectedCategory === "旅客服務" ? "text-sky-400" : "text-slate-400"}`} />
                    <span className="text-[10px] font-bold mt-0.5 leading-none">旅客服務</span>
                  </div>
                </button>

                <button
                  onClick={() => {
                    if (navigator.vibrate) navigator.vibrate(15);
                    setSelectedCategory(selectedCategory === "購物與休閒娛樂" ? "all" : "購物與休閒娛樂");
                  }}
                  className={`col-span-2 h-[46px] flex flex-col justify-center items-center py-1 px-1 rounded-xl cursor-pointer transition-all duration-300 border text-center ${
                    selectedCategory === "購物與休閒娛樂"
                      ? "bg-indigo-500/15 border-indigo-500/50 text-indigo-300 shadow-md ring-1 ring-indigo-500/25"
                      : "bg-[#14233c]/80 border-[#223554] text-slate-300 hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <Sparkles className={`w-3.5 h-3.5 ${selectedCategory === "購物與休閒娛樂" ? "text-indigo-400" : "text-slate-400"}`} />
                    <span className="text-[10px] font-bold mt-0.5 leading-none">休閒娛樂</span>
                  </div>
                </button>

                <button
                  onClick={() => {
                    if (navigator.vibrate) navigator.vibrate(15);
                    setSelectedCategory(selectedCategory === "水上與戶外娛樂" ? "all" : "水上與戶外娛樂");
                  }}
                  className={`col-span-2 h-[46px] flex flex-col justify-center items-center py-1 px-1 rounded-xl cursor-pointer transition-all duration-300 border text-center ${
                    selectedCategory === "水上與戶外娛樂"
                      ? "bg-emerald-500/15 border-emerald-500/50 text-emerald-300 shadow-md ring-1 ring-emerald-500/25"
                      : "bg-[#14233c]/80 border-[#223554] text-slate-300 hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <Anchor className={`w-3.5 h-3.5 ${selectedCategory === "水上與戶外娛樂" ? "text-emerald-400" : "text-slate-400"}`} />
                    <span className="text-[10px] font-bold mt-0.5 leading-none">水上戶外</span>
                  </div>
                </button>
              </div>

              {/* ONLY SHOW LIST DETAILS & FILTERS WHEN A CATEGORY IS ACTIVE OR A SEARCH IS ENTERED */}
              {(selectedCategory !== "all" || searchQuery !== "") && (
                <div className="space-y-4 pt-2 border-t border-[#233a5f] animate-fade-in">
                  
                  {/* Category Results Header with a Back button */}
                  <div className="flex justify-between items-center bg-[#13233f]/95 p-3.5 rounded-2xl border border-[#233a5f] shadow-md">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[9px] font-mono tracking-widest text-amber-405 font-black block">CATEGORY RESULTS</span>
                      <h3 className="text-xs font-extrabold text-[#edf2f8] flex items-center gap-1.5">
                        正在瀏覽：<span className="text-amber-400 font-extrabold">{selectedCategory === "all" ? "全部設施" : selectedCategory}</span>
                      </h3>
                    </div>
                    <button
                      onClick={() => {
                        if (navigator.vibrate) navigator.vibrate(15);
                        setSelectedCategory("all");
                        setSearchQuery("");
                        setSelectedDeckFilter("all");
                      }}
                      className="text-[10px] font-extrabold text-amber-400 bg-amber-500/10 hover:bg-amber-500/20 px-3 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1 border border-amber-500/20"
                    >
                      ← 返回首頁
                    </button>
                  </div>

                  {/* High precision compact search bar */}
                  <div className="flex gap-2 text-xs">
                    <div className="relative flex-1">
                      <span className="absolute inset-y-0 left-3 flex items-center text-slate-400">
                        <Search className="w-4 h-4 text-slate-400" />
                      </span>
                      <input
                        type="text"
                        placeholder="搜尋此類別的設施名稱..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-[#1a2c4e] border border-[#2d446b] focus:border-amber-400 outline-none text-xs text-white placeholder:text-slate-400 shadow-sm transition-all"
                      />
                      {searchQuery && (
                        <button 
                          onClick={() => setSearchQuery("")}
                          className="absolute inset-y-0 right-3 flex items-center text-xs text-slate-400 hover:text-white border-none bg-transparent outline-none cursor-pointer"
                        >
                          清除
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Deck selector quick filtering row */}
                  <div className="flex gap-2 items-center bg-[#13233f]/95 p-2.5 border border-[#233a5f] rounded-2xl shadow-sm">
                    <span className="text-[11px] font-black text-slate-200 uppercase tracking-widest pl-1">甲板樓層：</span>
                    <div className="flex-1 flex gap-1.5 overflow-x-auto">
                      <button
                        onClick={() => setSelectedDeckFilter("all")}
                        className={`px-3 py-1.5 text-xs font-black rounded-lg transition-all flex-shrink-0 cursor-pointer ${
                          selectedDeckFilter === "all" ? "bg-amber-500/15 text-amber-400 border border-amber-500/40" : "bg-[#1f304f] text-slate-300 border border-[#2d446b]"
                        }`}
                      >
                        全部 ⚓
                      </button>
                      {[5, 6, 7, 15, 16, 18, 19].map((dfNo) => (
                        <button
                          key={dfNo}
                          onClick={() => setSelectedDeckFilter(dfNo.toString())}
                          className={`px-3 py-1.5 text-xs font-mono font-black rounded-lg transition-all flex-shrink-0 cursor-pointer ${
                            selectedDeckFilter === dfNo.toString() ? "bg-amber-500/15 text-amber-400 border border-amber-500/40" : "bg-[#1f355c] text-slate-300 border border-[#2d446b]"
                          }`}
                        >
                          D{dfNo}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* List header */}
                  <div className="flex flex-col gap-0.5 pl-1 select-none">
                    <h3 className="text-[10px] font-bold tracking-[0.2em] text-slate-400 uppercase">
                      PREMIUM SHIP EXCURSIONS <span className="font-sans">/ 全船精選設施</span>
                    </h3>
                  </div>

                  {/* RENDER THE DOCK-PLAN DATA CARDS */}
                  <div className="space-y-3.5 pt-1 pb-10">
                    {filteredFacilities.length === 0 ? (
                      <div className="text-center py-12 bg-[#13233f]/95 border border-[#233a5f] rounded-3xl shadow-sm">
                        <HelpCircle className="w-12 h-12 text-slate-500 mx-auto" />
                        <p className="text-xs text-slate-405 font-bold mt-3">找不到相符的郵輪設施項目</p>
                      </div>
                    ) : (
                      filteredFacilities.map((f) => {
                        const isMainRestaurant = f.category === "餐廳" && f.isMainRestaurant === true;
                        const cTag = CATEGORY_TAGS[f.category as keyof typeof CATEGORY_TAGS] || { bg: "bg-slate-800 text-slate-300 border border-slate-600", label: f.category };
                        const isHighlighted = highlightedFacilityId === f.id;

                        return (
                      <div
                        key={f.id}
                        id={f.id}
                        className={`content-section relative rounded-3xl bg-[#13233f]/95 border transition-all duration-300 select-text ${
                          isHighlighted 
                            ? "border-amber-500 shadow-xl scale-[1.02] opacity-100 ring-2 ring-amber-405 highlight-flash" 
                            : isMainRestaurant
                            ? "border-dashed border-[#233a5f] opacity-40 pointer-events-none"
                            : "border-[#233a5f] shadow-sm hover:border-blue-400"
                        }`}
                      >
                        {/* Golden Corner light for interactive search indicators */}
                        {isHighlighted && (
                          <div className="absolute top-0 right-0 p-1 px-2 bg-amber-400 text-slate-950 text-[9px] font-black uppercase rounded-bl-xl tracking-widest">
                            已定位
                          </div>
                        )}

                        <div className="p-4 flex flex-col gap-2">
                          {/* Heading labels info */}
                          <div className="flex justify-between items-baseline select-none text-xs">
                            <span className={`text-[9.5px] uppercase font-black tracking-wider px-2 py-0.5 rounded ${cTag.bg}`}>
                              {cTag.label} · 甲板 {f.deck}
                            </span>
                            <span className="text-[10px] text-slate-400 font-mono font-bold">
                              {f.area} | {f.timeLine.includes("closed") ? "CLOSED" : "AVAILABLE"}
                            </span>
                          </div>

                          {/* Body Name and English names */}
                          <div className="mt-1">
                            <h4 className="text-sm font-black text-slate-100 tracking-wide">
                              {f.name}
                            </h4>
                            <p className="text-[10.5px] text-slate-405 font-mono font-bold tracking-tight uppercase">
                              {f.englishName}
                            </p>
                          </div>

                          {/* Hourly Timing details with colored dots */}
                          <div className="flex items-center gap-1.5 bg-[#1a2c4e] p-2 rounded-xl text-xs font-bold text-slate-300 border border-[#2d446b] select-none w-fit">
                            <span className={`w-2 h-2 rounded-full ${
                              f.timeLine.includes("closed") ? "bg-red-500" : isMainRestaurant ? "bg-orange-500" : "bg-emerald-500 animate-pulse"
                            }`} />
                            <p>開放時間：<span className="font-extrabold text-white">{f.timeLine}</span></p>
                          </div>

                          {/* Description details text */}
                          <p className="text-xs text-slate-300 leading-relaxed text-justify mt-1">
                            {f.description}
                          </p>

                          {/* VIP Club Exclusives detail highlights */}
                          {f.privilege && (
                            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/25 text-xs leading-relaxed text-amber-200 flex gap-2.5 items-start mt-2">
                              {f.privilege.includes("Yacht Club") ? (
                                <ShieldCheck className="w-4.5 h-4.5 text-amber-400 flex-shrink-0 mt-0.5" />
                              ) : (
                                <Award className="w-4.5 h-4.5 text-amber-400 flex-shrink-0 mt-0.5" />
                              )}
                              <div>
                                <p className="font-black text-amber-305">👑 尊榮特權權益 (Privilege Note)</p>
                                <p className="text-amber-300 font-semibold mt-0.5">{f.privilege}</p>
                              </div>
                            </div>
                          )}

                          {/* Actions trigger for map redirect syncing */}
                          {!isMainRestaurant && (
                            <div className="flex justify-end mt-2 pt-2 border-t border-[#233a5f] select-none">
                              <button
                                onClick={() => {
                                  if (navigator.vibrate) navigator.vibrate(20);
                                  setOpenDeckPlan(true);
                                }}
                                className="text-[10.5px] text-amber-400 hover:text-amber-350 font-extrabold tracking-widest uppercase flex items-center gap-0.5 cursor-pointer bg-transparent border-none"
                              >
                                <span>在互動地圖上查看對應位置 🗺️</span>
                                <ChevronRight className="w-3.5 h-3.5 text-amber-400" />
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}
        </section>
      </div>
    )}

        {/* --- PAGE: INFORMATION (#information) --- */}
        {activeTab === "info" && (
          <InformationSection initialSubTab={infoSubTabBuffer} />
        )}

        {/* --- PAGE: PORT TOUR GUIDE (#port-guide) --- */}
        {activeTab === "port" && (
          <PortGuideSection initialSubTab={portSubTabBuffer} />
        )}

        {/* --- PAGE: YACHT CLUB (#yacht-club) --- */}
        {activeTab === "yacht_club" && (
          <YachtClubSection onBackToHome={() => setActiveTab("home")} />
        )}

      </main>

      {/* FIXED FOOTER NAV COREGULATORS */}
      <BottomNav 
        activeTab={activeTab === "yacht_club" ? "home" : activeTab}
        setActiveTab={setActiveTab}
        onOpenDeckPlan={() => setOpenDeckPlan(true)}
      />

      {/* FULL SCREEN LIGHTBOX: DECK PLAN MAP MODAL MODULE */}
      <DeckPlanModal 
        isOpen={openDeckPlan}
        onClose={() => setOpenDeckPlan(false)}
        initialDeck={selectedDeckFilter !== "all" ? parseInt(selectedDeckFilter) : 15}
        onSelectFacilityDetail={handleSelectFacilityDetailAndScroll}
      />

    </div>
  );
}
