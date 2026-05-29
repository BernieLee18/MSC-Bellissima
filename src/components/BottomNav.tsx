/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Home, Info, Map, Ship } from "lucide-react";

interface BottomNavProps {
  activeTab: string; // "home" | "info" | "port" | "map"
  setActiveTab: (tab: string) => void;
  onOpenDeckPlan: () => void;
}

export default function BottomNav({ activeTab, setActiveTab, onOpenDeckPlan }: BottomNavProps) {
  const triggerNavigation = (tab: string) => {
    if (navigator.vibrate) {
      navigator.vibrate(25);
    }
    setActiveTab(tab);
    
    // Smooth scroll to top of viewport to emulate actual page changes
    window.scrollTo({
      top: 0,
      behavior: "instant"
    });
  };

  const menuItems = [
    { id: "home", label: "首頁", icon: Home },
    { id: "info", label: "資訊", icon: Info },
    { id: "map", label: "地圖", icon: Map, isSpecial: true },
    { id: "port", label: "觀光", icon: Ship }
  ];

  return (
    <nav 
      className="fixed bottom-0 left-0 right-0 z-50 bg-[#0d1629]/95 border-t border-[#233a5f] backdrop-blur-xl shadow-2xl transition-all"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="max-w-xl md:max-w-2xl mx-auto h-[58px] px-8 flex justify-between items-center">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          if (item.isSpecial) {
            return (
              <button
                key={item.id}
                onClick={() => {
                  if (navigator.vibrate) navigator.vibrate(30);
                  onOpenDeckPlan();
                }}
                className="flex flex-col items-center justify-center -translate-y-2.5 relative group cursor-pointer"
                id={`nav-btn-${item.id}`}
              >
                {/* Golden glowing circle background for Deck Plan map shortcut */}
                <div className="w-13 h-13 rounded-full bg-gradient-to-tr from-amber-300 to-amber-500 shadow-lg shadow-amber-500/10 flex items-center justify-center text-slate-950 active:scale-95 group-hover:scale-105 transition-all">
                  <Icon className="w-6 h-6 stroke-[2.5]" />
                </div>
                <span className="text-[10px] font-black text-amber-400 mt-1">地圖</span>
              </button>
            );
          }
 
          return (
            <button
              key={item.id}
              onClick={() => triggerNavigation(item.id)}
              className={`flex flex-col items-center justify-center w-14 h-full active:scale-90 transition-all duration-200 cursor-pointer relative ${
                isActive ? "text-amber-450 scale-105" : "text-slate-400 hover:text-white"
              }`}
              id={`nav-btn-${item.id}`}
            >
              <Icon className={`w-5 h-5 transition-transform ${isActive ? "stroke-[2.5]" : "stroke-[1.8]"}`} />
              <span className={`text-[10.5px] tracking-wider mt-1 transition-all ${
                isActive ? "font-black text-amber-450" : "font-semibold"
              }`}>
                {item.label}
              </span>
              
              {/* Dynamic little golden anchor active dot underneath */}
              {isActive && (
                <span className="absolute bottom-1 w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
