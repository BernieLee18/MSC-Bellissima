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
      className="fixed bottom-0 left-0 right-0 z-50 bg-[#f8f5ee]/95 border-t border-stone-200/90 backdrop-blur-xl shadow-lg transition-all"
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
                className="flex flex-col items-center justify-center w-14 h-full active:scale-90 transition-all duration-200 cursor-pointer relative text-stone-500 hover:text-stone-855"
                id={`nav-btn-${item.id}`}
              >
                <Icon className="w-5 h-5 stroke-[1.8]" />
                <span className="text-[10.5px] tracking-wider mt-1 font-semibold">
                  {item.label}
                </span>
              </button>
            );
          }
 
          return (
            <button
              key={item.id}
              onClick={() => triggerNavigation(item.id)}
              className={`flex flex-col items-center justify-center w-14 h-full active:scale-90 transition-all duration-200 cursor-pointer relative ${
                isActive ? "text-amber-850 scale-103" : "text-stone-500 hover:text-stone-850"
              }`}
              id={`nav-btn-${item.id}`}
            >
              <Icon className={`w-5 h-5 transition-transform ${isActive ? "stroke-[2.5]" : "stroke-[1.8]"}`} />
              <span className={`text-[10.5px] tracking-wider mt-1 transition-all ${
                isActive ? "font-black text-amber-850" : "font-semibold"
              }`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
