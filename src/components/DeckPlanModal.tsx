/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { 
  X, ZoomIn, ZoomOut, RotateCcw, HelpCircle, AlertTriangle, 
  MapPin, Utensils, Wine, ShieldCheck, Heart, Sparkles, Smile, Info
} from "lucide-react";
import { Facility } from "../types";
import { facilitiesData, whirlpoolsData, smokingAreasData } from "../data/facilities";

interface DeckPlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectFacilityDetail: (facilityId: string) => void;
  initialDeck?: number;
}

const CATEGORY_COLORS = {
  "餐廳": { bg: "bg-rose-500", border: "border-rose-300", accent: "#f43f5e", text: "text-rose-400" },
  "酒吧": { bg: "bg-amber-500", border: "border-amber-300", accent: "#f59e0b", text: "text-amber-400" },
  "旅客服務": { bg: "bg-sky-500", border: "border-sky-300", accent: "#0ea5e9", text: "text-sky-400" },
  "購物與休閒娛樂": { bg: "bg-indigo-500", border: "border-indigo-300", accent: "#6366f1", text: "text-indigo-400" },
  "水上與戶外娛樂": { bg: "bg-emerald-500", border: "border-emerald-300", accent: "#10b981", text: "text-emerald-400" }
};

export default function DeckPlanModal({ 
  isOpen, 
  onClose, 
  onSelectFacilityDetail, 
  initialDeck = 15 
}: DeckPlanModalProps) {
  const [selectedDeck, setSelectedDeck] = useState<number>(initialDeck);
  const [selectedFacility, setSelectedFacility] = useState<Facility | null>(null);
  
  // Highlighting safety states
  const [showSmoking, setShowSmoking] = useState(true);
  const [showWhirlpools, setShowWhirlpools] = useState(true);
  
  // Onboarding tutorial overlay
  const [showOnboarding, setShowOnboarding] = useState(false);
  
  // Zoom and Pan states
  const [scale, setScale] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const mapContainerRef = useRef<HTMLDivElement>(null);

  // Set initial deck and handle first-time onboarding via localStorage
  useEffect(() => {
    if (isOpen) {
      setSelectedDeck(initialDeck);
      setSelectedFacility(null);
      // Disable background vertical scrolling on iOS/mobile
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
      
      const hasSeenMapTutorial = localStorage.getItem("msc_has_seen_map_tutorial");
      if (!hasSeenMapTutorial) {
        setShowOnboarding(true);
        localStorage.setItem("msc_has_seen_map_tutorial", "true");
      }
    } else {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    };
  }, [isOpen, initialDeck]);

  // Onboarding timer: auto fadeout after 5 seconds
  useEffect(() => {
    if (showOnboarding) {
      const timer = setTimeout(() => {
        setShowOnboarding(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showOnboarding]);

  if (!isOpen) return null;

  // Filter facilities on the currently selected deck
  const currentDeckFacilities = facilitiesData.filter(f => f.deck === selectedDeck);
  const currentDeckWhirlpools = whirlpoolsData.filter(w => w.deck === selectedDeck);
  const currentDeckSmoking = smokingAreasData.filter(s => s.deck === selectedDeck);

  // Get active color for categories
  const getCatColor = (category: keyof typeof CATEGORY_COLORS) => {
    return CATEGORY_COLORS[category] || CATEGORY_COLORS["旅客服務"];
  };

  // Zoom helpers
  const handleZoomIn = () => setScale(prev => Math.min(prev + 0.25, 3));
  const handleZoomOut = () => setScale(prev => Math.max(prev - 0.25, 0.75));
  const handleReset = () => {
    setScale(1);
    setPan({ x: 0, y: 0 });
  };

  // Handle drag pan actions
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    dragStart.current = { x: e.clientX - pan.x, y: e.clientY - pan.y };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPan({
      x: e.clientX - dragStart.current.x,
      y: e.clientY - dragStart.current.y
    });
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  // Touch handlers for mobile pan
  const handleTouchStart = (e: React.TouchEvent) => {
    // Dismiss onboarding immediately on any touch
    if (showOnboarding) {
      setShowOnboarding(false);
    }
    if (e.touches.length === 1) {
      setIsDragging(true);
      const touch = e.touches[0];
      dragStart.current = { x: touch.clientX - pan.x, y: touch.clientY - pan.y };
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || e.touches.length !== 1) return;
    const touch = e.touches[0];
    setPan({
      x: touch.clientX - dragStart.current.x,
      y: touch.clientY - dragStart.current.y
    });
  };

  // Handle detailed routing trigger in App
  const handleViewDetails = (facilityId: string) => {
    onClose();
    setTimeout(() => {
      onSelectFacilityDetail(facilityId);
    }, 450);
  };

  return (
    <div 
      className="fixed inset-0 bg-[#050b14]/95 backdrop-blur-md z-50 flex flex-col justify-between"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      {/* HEADER SECTION with safe area spacer */}
      <header className="pt-2 px-4 pb-3 border-b border-white/5 bg-[#0b111e]/95 flex justify-between items-center z-10 select-none">
        <div className="flex items-center gap-3">
          <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-500">
            <CompassIcon className="w-5 h-5 animate-spin-slow" />
          </div>
          <div>
            <h2 className="text-sm font-semibold tracking-wide text-white uppercase flex items-center gap-2">
              Deck Plan <span className="text-amber-400 font-bold">第 {selectedDeck} 層甲板</span>
            </h2>
            <p className="text-[10px] text-gray-400 font-mono">MSC BELLISSIMA / 榮耀號首頁導航</p>
          </div>
        </div>
        <button 
          onClick={onClose}
          className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 active:scale-95 text-gray-300 hover:text-white transition-all cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>
      </header>

      {/* CORE CONTAINER: MAP VIEWPORT + FLOOR SELECTOR */}
      <div className="relative flex-1 bg-[#050b14] overflow-hidden flex">
        {/* Dynamic Filters Sidebar on the LEFT side */}
        <div className="absolute top-4 left-3 z-30 flex flex-col gap-2">
          {/* Smoking Warning Filter (Toggle highlight) */}
          <button
            onClick={() => {
              if (navigator.vibrate) navigator.vibrate(15);
              setShowSmoking(!showSmoking);
            }}
            className={`px-3 py-2 rounded-xl flex items-center gap-1.5 border backdrop-blur-md transition-all text-[11px] font-medium shadow-md ${
              showSmoking 
                ? "bg-amber-600/20 border-amber-500/50 text-amber-400" 
                : "bg-black/30 border-white/5 text-gray-400"
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0" />
            <span>避開吸煙區</span>
          </button>

          {/* Whirlpool Filter */}
          <button
            onClick={() => {
              if (navigator.vibrate) navigator.vibrate(15);
              setShowWhirlpools(!showWhirlpools);
            }}
            className={`px-3 py-2 rounded-xl flex items-center gap-1.5 border backdrop-blur-md transition-all text-[11px] font-medium shadow-md ${
              showWhirlpools 
                ? "bg-emerald-600/20 border-emerald-500/50 text-emerald-400" 
                : "bg-black/30 border-white/5 text-gray-400"
            }`}
          >
            <Heart className="w-3.5 h-3.5 flex-shrink-0" />
            <span>按摩池 Whirlpool</span>
          </button>
        </div>

        {/* Floor Selection side rail on the RIGHT side (Tactile physical layout) */}
        <div className="absolute top-4 right-3 z-30 flex flex-col gap-1.5 bg-black/40 backdrop-blur-lg p-1.5 rounded-2xl border border-white/5 shadow-2xl">
          <div className="text-[8px] font-bold text-amber-500/70 tracking-widest uppercase text-center py-1 select-none">Deck</div>
          {[19, 18, 16, 15, 7, 6, 5].map((deckNo) => (
            <button
              key={deckNo}
              onClick={() => {
                if (navigator.vibrate) navigator.vibrate(15);
                setSelectedDeck(deckNo);
                setSelectedFacility(null);
              }}
              className={`w-12 h-9 rounded-xl flex items-center justify-center font-mono text-xs font-bold transition-all ${
                selectedDeck === deckNo
                  ? "bg-gradient-to-b from-amber-400 to-amber-500 text-black shadow-lg shadow-amber-500/20 scale-105"
                  : "bg-white/5 hover:bg-white/10 text-gray-400 active:scale-95"
              }`}
            >
              <span>{deckNo}F</span>
            </button>
          ))}
        </div>

        {/* MAP CANVAS VIEWPORT */}
        <div 
          ref={mapContainerRef}
          className="flex-1 w-full h-full relative cursor-grab select-none overflow-hidden"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={handleMouseUpOrLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleMouseUpOrLeave}
        >
          {/* Renderable SVG Canvas with Zoom & Pan transforms applied */}
          <div 
            className="w-full h-full flex justify-center items-center p-4"
            style={{
              transform: `translate(${pan.x}px, ${pan.y}px) scale(${scale})`,
              transformOrigin: "center center",
              transition: isDragging ? "none" : "transform 0.2s cubic-bezier(0.22, 1, 0.36, 1)"
            }}
          >
            {/* Cruise outline SVG container */}
            <div className="relative w-[320px] h-[780px] flex justify-center bg-[#070d18]/40 border border-white/5 rounded-[120px] shadow-inner overflow-hidden select-none">
              
              {/* Cruise Hull Graphic Underlay */}
              <svg 
                viewBox="0 0 400 1000" 
                className="absolute inset-0 w-full h-full pointer-events-none select-none"
              >
                {/* Ship outer bound silhouette */}
                <path 
                  d="M 200 40 Q 34 250 80 500 L 98 840 Q 110 930 200 960 Q 290 930 302 840 L 320 500 Q 366 250 200 40 Z" 
                  fill="#0b172a" 
                  fillOpacity="0.4"
                  stroke="#3a517c" 
                  strokeWidth="2.5" 
                  strokeDasharray="4, 4"
                />
                
                {/* Bow/Fwd line, Mid line, Stern/Aft line markers */}
                <line x1="65" y1="360" x2="335" y2="360" stroke="#fffa" strokeOpacity="0.08" strokeWidth="1" />
                <line x1="85" y1="670" x2="315" y2="670" stroke="#fffa" strokeOpacity="0.08" strokeWidth="1" />
                
                {/* FWD/MID/AFT label texts */}
                <text x="200" y="110" textAnchor="middle" fill="#d4af37" fillOpacity="0.3" fontSize="16" fontWeight="bold">FWD 船頭 (BOW)</text>
                <text x="200" y="520" textAnchor="middle" fill="#d4af37" fillOpacity="0.3" fontSize="16" fontWeight="bold">MID 船中 (MIDDLE)</text>
                <text x="200" y="870" textAnchor="middle" fill="#d4af37" fillOpacity="0.3" fontSize="16" fontWeight="bold">AFT 船尾 (STERN)</text>
              </svg>

              {/* DYNAMIC PINS INTERACTION PANELS */}
              <div className="absolute inset-0 z-20 w-full h-full pointer-events-auto">
                {/* Whirlpools indicators */}
                {showWhirlpools && currentDeckWhirlpools.map((wp) => (
                  <button
                    key={wp.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (navigator.vibrate) navigator.vibrate(30);
                      // Formulate synthetic facility item for bottom slider
                      const compositeFac: Facility = {
                        id: wp.id,
                        deck: selectedDeck,
                        area: wp.cy < 360 ? "船頭" : wp.cy < 670 ? "船中" : "船尾",
                        category: "水上與戶外娛樂",
                        name: wp.name,
                        englishName: "Whirlpool Special Zone",
                        timeLine: "08:00 - 20:00 (熱水恆溫)",
                        description: wp.description,
                        cx: wp.cx,
                        cy: wp.cy
                      };
                      setSelectedFacility(compositeFac);
                    }}
                    style={{ left: `${(wp.cx / 400) * 100}%`, top: `${(wp.cy / 1000) * 100}%` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-full bg-emerald-500/20 border border-emerald-400 group cursor-pointer hover:scale-110 active:scale-95 transition-transform"
                    id={`dot-${wp.id}`}
                  >
                    <div className="absolute inset-0 rounded-full border border-emerald-400/50 opacity-45" />
                    <div className="w-5 h-5 rounded-full bg-emerald-400 flex items-center justify-center text-[10px] text-black font-extrabold shadow-md">
                      WP
                    </div>
                  </button>
                ))}

                {/* Smoking Area Warn indicators */}
                {showSmoking && currentDeckSmoking.map((smk) => {
                  const xPct = (smk.cx / 400) * 100;
                  const yPct = (smk.cy / 1000) * 100;
                  return (
                    <div key={smk.id} className="pointer-events-none">
                      {/* Bounding shadow alerts (orange/red solid boundaries) */}
                      <div 
                        style={{ left: `${xPct}%`, top: `${yPct}%` }}
                        className="absolute -translate-x-1/2 -translate-y-1/2 w-[75px] h-[34px] bg-amber-600/10 border-2 border-dashed border-amber-500/50 rounded-xl flex items-center justify-center shadow-lg z-10"
                      />
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (navigator.vibrate) navigator.vibrate(30);
                          const compositeFac: Facility = {
                            id: smk.id,
                            deck: selectedDeck,
                            area: smk.cy < 360 ? "船頭" : smk.cy < 670 ? "船中" : "船尾",
                            category: "旅客服務",
                            name: smk.name,
                            englishName: `Warning: Smoking Area (${smk.type})`,
                            timeLine: "24 小時避開管制區",
                            description: `${smk.description} ❗ 帶著長輩小孩與 2 歲嬰童者，行進該路段請提早就座於左側，避免受二手菸污染。`,
                            cx: smk.cx,
                            cy: smk.cy
                          };
                          setSelectedFacility(compositeFac);
                        }}
                        style={{ left: `${xPct}%`, top: `${yPct}%` }}
                        className="absolute -translate-x-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center z-20 pointer-events-auto cursor-pointer"
                      >
                        <div className="w-6 h-6 rounded-lg bg-orange-600 text-white flex items-center justify-center shadow-lg font-bold text-xs">
                          🚬
                        </div>
                      </button>
                    </div>
                  );
                })}

                {/* Core Facility pulse pins */}
                {currentDeckFacilities.map((f) => {
                  const catColor = getCatColor(f.category);
                  const xPercent = (f.cx / 400) * 100;
                  const yPercent = (f.cy / 1000) * 100;
                  const isMainRest = f.category === "餐廳" && f.isMainRestaurant === true;

                  return (
                    <div 
                      key={f.id}
                      style={{ left: `${xPercent}%`, top: `${yPercent}%` }}
                      className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10"
                    >
                      {/* Pulse circle with extra expanded tapping area */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (navigator.vibrate) navigator.vibrate(30);
                          setSelectedFacility(f);
                        }}
                        className="relative w-12 h-12 flex items-center justify-center rounded-full bg-transparent border-0 cursor-pointer outline-none group focus:scale-105 active:scale-95 transition-transform"
                        title={f.name}
                      >
                        {/* Invisible touch extender */}
                        <div className="absolute inset-0 w-11 h-11 pointer-events-none" />
                        
                        {/* Core pin layout */}
                        <div className={`w-3.5 h-3.5 rounded-full ${isMainRest ? "bg-gray-600 border border-white/50" : catColor.bg} border-2 border-[#050b14] flex items-center justify-center transition-all group-hover:scale-125 shadow-lg`}>
                          {/* Pulsing removed for clean non-flickering look */}
                        </div>
                        
                        {/* Miniature categoric symbol above */}
                        <div className="absolute -top-1 bg-black/60 backdrop-blur-md px-1 rounded border border-white/5 text-[7px] text-gray-300 font-mono scale-90 pointer-events-none select-none">
                          {isMainRest ? "REST 📍" : f.category === "餐廳" ? "DINING" : f.category === "酒吧" ? "BAR" : f.category === "旅客服務" ? "SERV" : "REC"}
                        </div>
                      </button>

                      {/* Side label tag (with click prevention) */}
                      <div className="absolute top-7 w-[100px] text-center pointer-events-none select-none">
                        <p className={`text-[8px] font-bold py-0.5 px-1 bg-[#050b14]/95 rounded border border-white/5 shadow-md leading-tight text-ellipsis truncate ${
                          isMainRest ? "text-gray-500 line-through opacity-50" : "text-white"
                        }`}>
                          {f.name.split(" ")[0]}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          </div>
        </div>

        {/* BOTTOM LEFT CORNER: PERSISTENT ZOOM CONTROLS */}
        <div className="absolute bottom-6 left-3 z-30 flex flex-col gap-1.5 bg-black/40 backdrop-blur-lg p-1.5 rounded-2xl border border-white/5">
          <button 
            onClick={handleZoomIn}
            className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 active:scale-90 text-gray-300 flex items-center justify-center transition-all cursor-pointer"
            title="放大 Map"
          >
            <ZoomIn className="w-5 h-5" />
          </button>
          <button 
            onClick={handleZoomOut}
            className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 active:scale-90 text-gray-300 flex items-center justify-center transition-all cursor-pointer"
            title="縮小 Map"
          >
            <ZoomOut className="w-5 h-5" />
          </button>
          <button 
            onClick={handleReset}
            className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 active:scale-90 text-gray-300 flex items-center justify-center transition-all cursor-pointer"
            title="重算歸零"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>

        {/* ONBOARDING OVERLAY COVER (5s expiry OR immediate tap unlock) */}
        {showOnboarding && (
          <div 
            onClick={() => setShowOnboarding(false)}
            className="absolute inset-0 bg-black/75 z-40 flex flex-col items-center justify-center p-6 text-center select-none"
          >
            <div className="p-4 rounded-3xl bg-amber-500/10 border border-amber-500/20 text-amber-500 max-w-xs animate-bounce-slow flex flex-col items-center gap-3">
              <HelpCircle className="w-12 h-12" />
              <p className="text-sm font-semibold leading-relaxed text-white">
                💡 點擊地圖上的發光圓點，即可快速探索設施的營業時間與地中海遊艇會尊榮權益！
              </p>
              <p className="text-[10px] text-amber-500/70 uppercase tracking-widest font-mono">
                輕觸螢幕任何地方即可解鎖
              </p>
            </div>
          </div>
        )}
      </div>

      {/* DYNAMIC SWIPEABLE DETAIL SHEETS (iOS-STYLE COMPONENT) */}
      <div 
        className={`bg-[#0b111e] border-t border-white/10 max-h-[290px] w-full z-40 transition-all duration-300 ease-out transform pointer-events-auto select-text ${
          selectedFacility ? "translate-y-0 opacity-100" : "translate-y-full opacity-0 pointer-events-none h-0"
        }`}
      >
        {selectedFacility && (
          <div className="p-4 pb-6 flex flex-col gap-3">
            {/* Grab Bar Visual handle */}
            <div className="w-12 h-1.5 bg-white/20 rounded-full mx-auto -mt-1 mb-1 pointer-events-none" />

            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded ${
                    selectedFacility.isMainRestaurant ? "bg-gray-700 text-gray-400" : getCatColor(selectedFacility.category).bg + " text-black font-extrabold"
                  }`}>
                    {selectedFacility.category}
                  </span>
                  <span className="text-[10px] bg-white/5 text-gray-400 font-mono px-1.5 py-0.5 rounded">
                    Deck {selectedFacility.deck} · {selectedFacility.area}
                  </span>
                  {selectedFacility.type === "paid" && (
                    <span className="text-[9px] bg-amber-500/10 text-amber-400 px-1.5 py-0.5 rounded font-bold">
                      收費付費
                    </span>
                  )}
                </div>
                <h3 className="text-base font-bold text-white mt-1">
                  {selectedFacility.name}
                </h3>
                <p className="text-[10px] text-gray-400 font-mono mt-0.5">
                  {selectedFacility.englishName}
                </p>
              </div>
              <button 
                onClick={() => setSelectedFacility(null)}
                className="p-1 px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 text-xs text-center border border-white/5"
              >
                隱藏
              </button>
            </div>

            {/* Time Slot Status indicator */}
            <div className="flex items-center gap-2 bg-white/5 p-2 rounded-xl text-xs border border-white/5">
              <span className={`w-2 h-2 rounded-full ${
                selectedFacility.timeLine.includes("closed") || selectedFacility.timeLine.includes("暫停營業")
                  ? "bg-red-500 animate-pulse"
                  : selectedFacility.isMainRestaurant
                  ? "bg-orange-500"
                  : "bg-green-500 animate-pulse"
              }`} />
              <p className="text-gray-300 font-medium">
                時段：<span className="font-semibold text-white">{selectedFacility.timeLine}</span>
              </p>
            </div>

            {/* Descriptions & Private privileges */}
            <div className="space-y-1 overflow-y-auto max-h-[85px] pr-2 custom-scrollbar">
              <p className="text-xs text-gray-400 leading-relaxed">
                {selectedFacility.description}
              </p>
              {selectedFacility.privilege && (
                <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-[11px] font-medium leading-relaxed text-amber-400 mt-1">
                  👑 {selectedFacility.privilege}
                </div>
              )}
            </div>

            {/* View detailed redirection button */}
            {!selectedFacility.isMainRestaurant && facilitiesData.some(f => f.id === selectedFacility.id) && (
              <button
                onClick={() => handleViewDetails(selectedFacility.id)}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-black font-bold text-xs uppercase tracking-widest text-center hover:opacity-90 active:scale-95 transition-all shadow-lg cursor-pointer"
              >
                查看詳情 & 立即位置尋路 🗺️
              </button>
            )}

            {selectedFacility.isMainRestaurant && (
              <div className="p-2 text-center text-[11px] font-bold bg-[#fc8c03]/10 border border-[#fc8c03]/20 rounded-xl text-[#fc8c03]">
                📍 本餐廳僅做導航標示，YC 客人請去 18F 地中海遊艇會專屬餐廳用餐！
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// Reusable micro-components
function CompassIcon({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </svg>
  );
}
