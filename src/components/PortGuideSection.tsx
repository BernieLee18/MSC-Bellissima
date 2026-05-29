/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { 
  Anchor, PhoneCall, Copy, MapPin, Compass, Globe, ExternalLink, AlertTriangle, Sparkles, Check, HelpCircle
} from "lucide-react";

interface PortGuideSectionProps {
  initialSubTab?: string; // "tools" | "sasebo" | "kagoshima"
}

const COMMUNICATION_CARDS = [
  { id: "cc1", text: "有兒童椅嗎公？", japanese: "子供用の椅子はありますか？", hint: "適合帶小孩家族在餐廳點餐時使用" },
  { id: "cc2", text: "我要結帳", japanese: "お会計をお願いします。", hint: "藥妝店、餐廳付款必備" },
  { id: "cc3", text: "我要回郵輪港口", japanese: "クルーズ港（三浦岸壁/マリンポート）まで行ってください。", hint: "打計程車時給司機看的通用字句" },
  { id: "cc4", text: "請帶裝我去這裡", japanese: "ここへ連れて行ってください。", hint: "指點手機地圖上的地标景點" },
  { id: "cc5", text: "可以刷卡嗎？", japanese: "クレジットカードは使えますか？", hint: "日本購物、用餐前確認" },
  { id: "cc6", text: "我迷路了，請幫忙", japanese: "道に迷ってしまいました。助けてください。", hint: "緊急避險求救" }
];

export default function PortGuideSection({ initialSubTab = "tools" }: PortGuideSectionProps) {
  const [subTab, setSubTab] = useState<string>(initialSubTab);
  
  // Realtime return-to-ship timer states
  const [timeLeft, setTimeLeft] = useState<{ hours: number; minutes: number; seconds: number }>({ hours: 4, minutes: 0, seconds: 0 });
  const [mockHoursLeft, setMockHoursLeft] = useState<number | null>(null); // Allow manual simulated testing of color warnings

  // Active fullscreen communication modal text
  const [activeCommCard, setActiveCommCard] = useState<{ chinese: string; japanese: string } | null>(null);
  
  // Copy notice triggers
  const [copiedText, setCopiedText] = useState("");

  useEffect(() => {
    if (initialSubTab) {
      setSubTab(initialSubTab);
    }
  }, [initialSubTab]);

  // Keep return-to-ship timer countdown running
  useEffect(() => {
    const interval = setInterval(() => {
      if (mockHoursLeft !== null) {
        setTimeLeft((prev) => {
          let s = prev.seconds - 1;
          let m = prev.minutes;
          let h = prev.hours;
          if (s < 0) {
            s = 59;
            m -= 1;
          }
          if (m < 0) {
            m = 59;
            h -= 1;
          }
          if (h < 0) {
            h = 0; m = 0; s = 0;
          }
          return { hours: h, minutes: m, seconds: s };
        });
        return;
      }

      // True date countdown based on current real-time. Target is 19:00 PM JST.
      const now = new Date();
      const target = new Date();
      target.setHours(19, 0, 0, 0); // 19:00 PM JST (Return to ship deadline)
      
      let diffMs = target.getTime() - now.getTime();
      if (diffMs < 0) {
        diffMs = 0;
      }
      
      const hours = Math.floor(diffMs / (1000 * 60 * 60));
      const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);
      setTimeLeft({ hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, [mockHoursLeft]);

  // Set testing overrides to inspect color warnings
  const setSimulatedTime = (hours: number) => {
    if (navigator.vibrate) navigator.vibrate(30);
    setMockHoursLeft(hours);
    setTimeLeft({ hours, minutes: 24, seconds: 15 });
  };

  const handleSOSClick = (tel: string) => {
    if (navigator.vibrate) navigator.vibrate(50);
  };

  const triggerCommunicationModal = (chinese: string, japanese: string) => {
    if (navigator.vibrate) navigator.vibrate(30);
    setActiveCommCard({ chinese, japanese });
  };

  const handleCopyText = (text: string, label: string) => {
    if (navigator.vibrate) navigator.vibrate(30);
    navigator.clipboard.writeText(text).then(() => {
      setCopiedText(label);
      setTimeout(() => setCopiedText(""), 2000);
    });
  };

  // Warning level styling for returned countdown
  const getWarningStyling = () => {
    const curHours = timeLeft.hours;
    if (curHours >= 3) {
      return {
        bg: "bg-emerald-50 border-emerald-305 shadow-sm",
        text: "text-emerald-800",
        label: "大於 3 小時 · 安全靠港中",
        pulse: false
      };
    } else if (curHours >= 1) {
      return {
        bg: "bg-amber-50 border-amber-305 shadow-md",
        text: "text-amber-800",
        label: "少於 3 小時 · 注意回船進程",
        pulse: false
      };
    } else {
      return {
        bg: "bg-rose-50 border-rose-300 shadow-lg",
        text: "text-rose-800 font-extrabold",
        label: "⚠️ 少於 1 小時 · 急速回船！",
        pulse: true
      };
    }
  };

  const warnStyle = getWarningStyling();

  return (
    <section id="port-guide" className="flex flex-col gap-4 flex-1 pb-20 select-none animate-slide-up">
      
      {/* SEGMENTED TAB CAPSULED BAR AT TOP (IOS STYLE) */}
      <div className="px-4 pt-3 flex justify-center select-none">
        <div className="flex bg-white shadow-sm p-1 rounded-2xl border border-slate-205 w-full max-w-sm">
          {[
            { id: "tools", label: "🧰 旅遊工具" },
            { id: "sasebo", label: "⚓ 佐世保" },
            { id: "kagoshima", label: "⚓ 鹿兒島" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                if (navigator.vibrate) navigator.vibrate(15);
                setSubTab(tab.id);
              }}
              className={`flex-1 py-1.5 text-center text-xs font-black rounded-xl transition-all cursor-pointer ${
                subTab === tab.id
                  ? "bg-gradient-to-r from-amber-400 to-amber-500 text-slate-900 shadow-md"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* DYNAMIC SCENE CONDITIONAL RENDER SPAN */}
      <div className="px-4 flex flex-col gap-4 flex-1">

        {/* ======================= T1: TRAVEL CONCIERGE TOOLS ======================= */}
        {subTab === "tools" && (
          <div className="space-y-4 animate-fade-in pb-4">
            {/* INLINE WARNING COUNTER COMPONENT */}
            <div className={`p-4 rounded-3xl border transition-all ${warnStyle.bg} ${
              warnStyle.pulse ? "animate-pulse" : ""
            }`}>
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-[10px] text-slate-500 uppercase tracking-widest font-mono font-black">Return-to-Ship Countdown</h4>
                  <p className={`text-sm font-black mt-0.5 ${warnStyle.text}`}>
                    全體返船截止：今日 19:00 JST
                  </p>
                </div>
                <span className="text-[9.5px] bg-white/80 border border-slate-200 text-slate-700 px-2 py-0.5 rounded-full font-bold shadow-sm">
                  {warnStyle.label}
                </span>
              </div>

              {/* Time Numbers row */}
              <div className="mt-4 flex justify-center items-center gap-2">
                <div className="bg-white px-3.5 py-2.5 rounded-2xl border border-slate-200 min-w-[62px] text-center shadow-sm">
                  <span className="text-2xl font-black text-slate-900 font-mono">{String(timeLeft.hours).padStart(2, "0")}</span>
                  <span className="text-[8px] text-slate-500 block font-mono font-bold mt-0.5">HOURS</span>
                </div>
                <span className="text-xl font-bold text-slate-800 animate-pulse">:</span>
                <div className="bg-white px-3.5 py-2.5 rounded-2xl border border-slate-200 min-w-[62px] text-center shadow-sm">
                  <span className="text-2xl font-black text-slate-900 font-mono">{String(timeLeft.minutes).padStart(2, "0")}</span>
                  <span className="text-[8px] text-slate-500 block font-mono font-bold mt-0.5">MINS</span>
                </div>
                <span className="text-xl font-bold text-slate-800 animate-pulse">:</span>
                <div className="bg-white px-3.5 py-2.5 rounded-2xl border border-slate-200 min-w-[62px] text-center shadow-sm">
                  <span className="text-2xl font-black text-slate-900 font-mono">{String(timeLeft.seconds).padStart(2, "0")}</span>
                  <span className="text-[8px] text-slate-500 block font-mono font-bold mt-0.5">SECS</span>
                </div>
              </div>

              {/* Testing sliders to help user witness warning state changes immediately */}
              <div className="mt-4 border-t border-slate-150 pt-3 flex justify-between items-center bg-slate-100/50 p-2 rounded-xl">
                <span className="text-[9.5px] text-slate-500 font-black">🛠️ 倒計時模擬測試：</span>
                <div className="flex gap-1.5">
                  <button 
                    onClick={() => setSimulatedTime(4)}
                    className="px-2 py-1 bg-emerald-100 text-emerald-800 text-[9.5px] font-black rounded-lg border border-emerald-200 scale-95 hover:scale-100 cursor-pointer"
                  >
                    4hr (綠)
                  </button>
                  <button 
                    onClick={() => setSimulatedTime(2)}
                    className="px-2 py-1 bg-amber-100 text-amber-800 text-[9.5px] font-black rounded-lg border border-amber-200 scale-95 hover:scale-100 cursor-pointer"
                  >
                    2hr (黃)
                  </button>
                  <button 
                    onClick={() => setSimulatedTime(0)}
                    className="px-2 py-1 bg-rose-100 text-rose-800 text-[9.5px] font-black rounded-lg border border-rose-200 scale-95 hover:scale-100 cursor-pointer"
                  >
                    40m (紅)
                  </button>
                </div>
              </div>
            </div>

            {/* ONE-CLICK SHUTTLE HELP SOS WIDGET */}
            <div className="grid grid-cols-2 gap-3">
              <a 
                href="tel:110" 
                onClick={() => handleSOSClick("110")}
                className="p-3.5 bg-rose-50 border border-rose-200 rounded-2xl flex items-center justify-between group active:scale-95 transition-all text-left shadow-sm"
              >
                <div>
                  <h4 className="text-[9px] text-slate-500 font-mono font-black uppercase">POLICE EMERGENCY</h4>
                  <p className="text-xs font-black text-rose-700 tracking-wide mt-0.5">📞 110 日本警察</p>
                </div>
                <div className="p-2 rounded-full bg-rose-100 text-rose-700 group-hover:scale-110 transition-transform">
                  <PhoneCall className="w-4 h-4 text-rose-700" />
                </div>
              </a>

              <a 
                href="tel:119" 
                onClick={() => handleSOSClick("119")}
                className="p-3.5 bg-rose-50 border border-rose-200 rounded-2xl flex items-center justify-between group active:scale-95 transition-all text-left shadow-sm"
              >
                <div>
                  <h4 className="text-[9px] text-slate-500 font-mono font-black uppercase">MEDICAL SERVICE</h4>
                  <p className="text-xs font-black text-rose-700 tracking-wide mt-0.5">📞 119 救護/火警</p>
                </div>
                <div className="p-2 rounded-full bg-rose-100 text-rose-700 group-hover:scale-110 transition-transform">
                  <PhoneCall className="w-4 h-4 text-rose-700" />
                </div>
              </a>
            </div>

            {/* GIANT COMMUNICATION CARDS MODULE */}
            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <h3 className="text-xs font-black text-slate-600 tracking-wider">
                  💬 全螢幕無障礙溝通大字卡
                </h3>
                <span className="text-[8px] text-slate-500 font-mono font-bold">TAP TO ZOOM</span>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                {COMMUNICATION_CARDS.map((card) => (
                  <button
                    key={card.id}
                    onClick={() => triggerCommunicationModal(card.text, card.japanese)}
                    className="p-3.5 bg-white border border-slate-200 hover:border-amber-500 hover:shadow shadow-sm active:scale-95 text-left rounded-2xl relative transition-all cursor-pointer group"
                  >
                    <span className="text-[12px] font-black text-slate-900 block mt-1">{card.text}</span>
                    <span className="text-[10px] text-amber-700 font-extrabold font-mono block mt-2 line-clamp-1">{card.japanese}</span>
                    <p className="text-[8.5px] text-slate-500 font-bold mt-1.5 leading-tight">{card.hint}</p>
                    <div className="absolute bottom-2.5 right-2 text-slate-400 group-hover:text-amber-500 text-[10px]">
                      🔍
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ======================= T2: SASEBO SIGHTSEEING ======================= */}
        {subTab === "sasebo" && (
          <div className="space-y-4 animate-fade-in pb-4">
            {/* TAXI DRIVER EXCLUSIVE TRANSLATION CARD */}
            <div className="p-4 rounded-3xl bg-white border border-slate-200 shadow relative overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-amber-400/5 to-transparent rounded-bl-full pointer-events-none" />
              
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs">🚕</span>
                  <h4 className="text-xs font-black text-amber-900 tracking-wider">司機看這邊 (Sasebo Taxi Mode)</h4>
                </div>
                {copiedText === "sasebo_addr" ? (
                  <span className="text-[9.5px] bg-green-100 text-green-800 border border-green-200 px-1.5 py-0.5 rounded font-bold font-mono">
                    已複製
                  </span>
                ) : (
                  <button 
                    onClick={() => handleCopyText("長崎県佐世保市三浦町21-1 佐世保港三浦岸壁", "sasebo_addr")}
                    className="text-[9px] bg-slate-50 hover:bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-black font-mono border border-slate-200 active:scale-90 flex items-center gap-0.5 cursor-pointer"
                  >
                    <Copy className="w-2.5 h-2.5" /> 複製地址
                  </button>
                )}
              </div>

              {/* Japanese address translation blocks */}
              <div 
                onClick={() => triggerCommunicationModal("佐世保計程車回港口模式", "運転手さん、佐世保新港国際ターミナル（三浦岸壁）まで行ってください。宜しくお願い致します。")}
                className="mt-3 bg-slate-50 p-3.5 rounded-2xl border border-slate-205 active:scale-99 transition-transform cursor-pointer hover:border-amber-400"
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[9px] text-amber-700 tracking-widest font-mono font-black">目的地 / 中文日文翻譯</span>
                  <span className="text-[9.5px] text-slate-500 font-bold">🔍 點擊放大</span>
                </div>
                <p className="text-base font-black text-slate-900 font-mono">佐世保港三浦岸壁</p>
                <p className="text-[10px] text-slate-500 mt-1 uppercase font-mono font-medium">佐世保港・三浦町21-1 (Sasebo International Terminal)</p>
                <p className="text-xs font-black text-amber-800 border-t border-slate-200 mt-2.5 pt-2">
                  🇯🇵 運転手さん、佐世保港三浦岸壁まで行ってください。
                </p>
              </div>

              {/* Action row with native apple/google navigation */}
              <div className="grid grid-cols-2 gap-3 mt-3">
                <a 
                  href="https://maps.google.com/?q=Nagasaki+Sasebo+International+Terminal+Miura"
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 text-center text-[10.5px] font-black flex items-center justify-center gap-1 cursor-pointer shadow-sm"
                >
                  <MapPin className="w-3.5 h-3.5 text-rose-500" />
                  <span>Google Maps 快速導航</span>
                </a>
                
                {/* SVG Mock QR Code link */}
                <div className="py-2.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-600 text-center text-[10px] font-mono font-bold flex items-center justify-center gap-1.5 select-none shadow-sm">
                  <span className="p-0.5 rounded bg-white text-black font-black text-[6.5px] border border-slate-300">▢ QR</span>
                  <span>司機直接看二維導航</span>
                </div>
              </div>
            </div>

            {/* HIGH-END VERTICAL TIMELINE MODULE */}
            <div className="space-y-3">
              <h3 className="text-xs font-black text-slate-600 tracking-wider pl-1">
                📍 今日遊覽實戰行程時間軸
              </h3>

              <div className="relative pl-6 border-l border-amber-305 ml-2 space-y-4">
                
                {/* TL Node 1 */}
                <div className="relative">
                  <span className="absolute -left-[31px] top-1.5 w-3.5 h-3.5 rounded-full bg-amber-500 border border-white shadow shadow-amber-500/30" />
                  <div className="p-3.5 bg-white border border-slate-200 rounded-2xl shadow-sm">
                    <span className="text-[10px] text-amber-700 font-mono font-black block">08:00</span>
                    <h5 className="text-xs font-black text-slate-900 mt-0.5">抵達佐世保港 (Sasebo Terminal 三浦岸壁)</h5>
                    <p className="text-[10.5px] text-slate-600 mt-1 font-bold">
                      豪華遊艇會貴賓可持金色房卡免排隊優先下船，從碼頭迅速通關。
                    </p>
                    <a 
                      href="https://maps.google.com/?q=Sasebo+Miura+Wharf" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[9.5px] text-amber-700 hover:underline inline-flex items-center gap-0.5 mt-2 font-bold"
                    >
                      🗺️ 港口地景地圖 <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  </div>
                </div>

                {/* TL Node 2 */}
                <div className="relative">
                  <span className="absolute -left-[31px] top-1.5 w-3.5 h-3.5 rounded-full bg-slate-300 border border-white" />
                  <div className="p-3.5 bg-white border border-slate-200 rounded-2xl shadow-sm">
                    <span className="text-[10px] text-slate-500 font-mono font-black block">10:00</span>
                    <h5 className="text-xs font-black text-slate-900 mt-0.5">させぼ五番街 (佐世保五番街購物中心)</h5>
                    <p className="text-[10.5px] text-slate-600 mt-1 font-bold">
                      緊靠碼頭的海濱購物城。包含日本雜貨大牌 Loft、星巴克與多個免稅日雜鋪。
                    </p>
                    <div className="flex gap-2.5 mt-2 font-bold">
                      <a href="https://5bangai.com" target="_blank" rel="noopener noreferrer" className="text-[9.5px] text-amber-700 hover:underline flex items-center gap-0.5">
                        🌐 官網連結
                      </a>
                      <a href="https://maps.google.com/?q=Sasebo+5番街" target="_blank" rel="noopener noreferrer" className="text-[9.5px] text-amber-700 hover:underline flex items-center gap-0.5">
                        🗺️ Google 導航
                      </a>
                    </div>
                  </div>
                </div>

                {/* TL Node 3 */}
                <div className="relative">
                  <span className="absolute -left-[31px] top-1.5 w-3.5 h-3.5 rounded-full bg-amber-550 border border-white" />
                  <div className="p-3.5 bg-amber-500/10 border border-amber-300 rounded-2xl shadow-sm">
                    <span className="text-[10px] text-amber-800 font-mono font-black block">12:00</span>
                    <h5 className="text-xs font-black text-amber-900 mt-0.5">午餐：佐が家 五番街店 (佐賀牛炭火燒肉)</h5>
                    <p className="text-[10px] text-amber-850 font-black mt-1">
                      📍 夢幻佐賀牛燒肉 · 已完成線上餐位預訂！
                    </p>
                    <p className="text-[10.5px] text-slate-700 mt-1 leading-relaxed font-semibold">
                      這家是佐世保人氣最旺的和牛燒肉店，請準時隨即往佐世保五番街。
                    </p>
                    <a href="https://maps.google.com/?q=佐が家+五番街店" target="_blank" rel="noopener noreferrer" className="text-[9.5px] text-amber-800 hover:underline inline-flex items-center gap-0.5 mt-2 font-black">
                      🗺️ 餐廳即時導航
                    </a>
                  </div>
                </div>

                {/* TL Node 4 */}
                <div className="relative">
                  <span className="absolute -left-[31px] top-1.5 w-3.5 h-3.5 rounded-full bg-slate-300 border border-white" />
                  <div className="p-3.5 bg-white border border-slate-200 rounded-2xl shadow-sm">
                    <span className="text-[10px] text-slate-500 font-mono font-black block">16:00</span>
                    <h5 className="text-xs font-black text-slate-900 mt-0.5">藥妝大採購：Cocokara Fine 五番街店</h5>
                    <p className="text-[10.5px] text-slate-600 mt-1 font-bold">
                      日本著名免稅藥妝連鎖。可持 Voyagers 金卡特惠或官網外籍旅客優惠券。
                    </p>
                    <a href="https://maps.google.com/?q=Cocokara+Fine+Sasebo" target="_blank" rel="noopener noreferrer" className="text-[9.5px] text-amber-700 hover:underline inline-flex items-center gap-0.5 mt-2 font-extrabold">
                      🗺️ 藥妝店導航
                    </a>
                  </div>
                </div>

                {/* TL Node 5 */}
                <div className="relative">
                  <span className="absolute -left-[31px] top-1.5 w-3.5 h-3.5 rounded-full bg-rose-600 border border-white shadow shadow-rose-500/30 animate-pulse" />
                  <div className="p-3.5 bg-rose-50 border border-rose-300 rounded-2xl shadow-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] text-rose-800 font-mono font-black">19:00</span>
                      <span className="text-[8px] bg-rose-200/50 border border-rose-400 text-rose-800 font-black rounded px-1.5 py-0.5 animate-pulse">CRITICAL</span>
                    </div>
                    <h5 className="text-xs font-black text-rose-900 mt-0.5">⚠️ 登船截止 (最晚回船截止)</h5>
                    <p className="text-[10.5px] text-rose-950 mt-1 font-semibold leading-relaxed">
                      過期不候！所有旅客在 19:00 前必須刷卡通過登船安檢。一分一秒不能遲到。
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}

        {/* ======================= T3: KAGOSHIMA SIGHTSEEING ======================= */}
        {subTab === "kagoshima" && (
          <div className="space-y-4 animate-fade-in pb-4">
            {/* TAXI DRIVER EXCLUSIVE TRANSLATION CARD */}
            <div className="p-4 rounded-3xl bg-white border border-slate-200 shadow relative overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-amber-400/5 to-transparent rounded-bl-full pointer-events-none" />
              
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs">🚕</span>
                  <h4 className="text-xs font-black text-amber-900 tracking-wider">司機看這邊 (Kagoshima Taxi Mode)</h4>
                </div>
                {copiedText === "kago_addr" ? (
                  <span className="text-[9.5px] bg-green-100 text-green-800 border border-green-200 px-1.5 py-0.5 rounded font-bold font-mono">
                    已複製
                  </span>
                ) : (
                  <button 
                    onClick={() => handleCopyText("鹿児島中央港新町 マリンポートかごしま", "kago_addr")}
                    className="text-[9px] bg-slate-50 hover:bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-black font-mono border border-slate-200 active:scale-90 flex items-center gap-0.5 cursor-pointer"
                  >
                    <Copy className="w-2.5 h-2.5" /> 複製地址
                  </button>
                )}
              </div>

              {/* Japanese address translation blocks */}
              <div 
                onClick={() => triggerCommunicationModal("鹿兒島計程車回港口模式", "運転手さん、マリンポートかごしま（クルーズ大型観光船岸壁）まで行ってください。宜しくお願い致します。")}
                className="mt-3 bg-slate-50 p-3.5 rounded-2xl border border-slate-205 active:scale-99 transition-transform cursor-pointer hover:border-amber-400"
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[9px] text-amber-700 tracking-widest font-mono font-black">目的地 / 中文日文翻譯</span>
                  <span className="text-[9.5px] text-slate-500 font-bold">🔍 點擊放大</span>
                </div>
                <p className="text-base font-black text-slate-900 font-mono">マリンポートかごしま</p>
                <p className="text-[10px] text-slate-500 mt-1 uppercase font-mono font-medium">鹿児島中央港新町 (Marine Port Kagoshima)</p>
                <p className="text-xs font-black text-amber-805 border-t border-slate-200 mt-2.5 pt-2">
                  🇯🇵 運転手さん、マリンポートかごしままで行ってください。
                </p>
              </div>

              {/* Action row with native apple/google navigation */}
              <div className="grid grid-cols-2 gap-3 mt-3">
                <a 
                  href="https://maps.google.com/?q=Marine+Port+Kagoshima"
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 text-center text-[10.5px] font-black flex items-center justify-center gap-1 cursor-pointer shadow-sm"
                >
                  <MapPin className="w-3.5 h-3.5 text-rose-500" />
                  <span>Google Maps 快速導航</span>
                </a>
                
                {/* SVG Mock QR Code link */}
                <div className="py-2.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-600 text-center text-[10px] font-mono font-bold flex items-center justify-center gap-1.5 select-none shadow-sm">
                  <span className="p-0.5 rounded bg-white text-black font-black text-[6.5px] border border-slate-300">▢ QR</span>
                  <span>司機直接看二維導航</span>
                </div>
              </div>
            </div>

            {/* HIGH-END VERTICAL TIMELINE MODULE */}
            <div className="space-y-3">
              <h3 className="text-xs font-black text-slate-600 tracking-wider pl-1">
                📍 今日遊覽實戰行程時間軸
              </h3>

              <div className="relative pl-6 border-l border-amber-305 ml-2 space-y-4">
                
                {/* TL Node 1 */}
                <div className="relative">
                  <span className="absolute -left-[31px] top-1.5 w-3.5 h-3.5 rounded-full bg-amber-500 border border-white shadow shadow-amber-500/30" />
                  <div className="p-3.5 bg-white border border-slate-200 rounded-2xl shadow-sm">
                    <span className="text-[10px] text-amber-700 font-mono font-black block">09:00</span>
                    <h5 className="text-xs font-black text-slate-900 mt-0.5">抵達鹿兒島港 (Marine Port Kagoshima)</h5>
                    <p className="text-[10.5px] text-slate-600 mt-1 font-bold">
                      豪華遊艇會貴賓可持專用手環，引導至快速離港通道免去長隊之苦。
                    </p>
                    <a 
                      href="https://maps.google.com/?q=Marine+Port+Kagoshima" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[9.5px] text-amber-700 hover:underline inline-flex items-center gap-0.5 mt-2 font-bold"
                    >
                      🗺️ 港口位置地景 <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  </div>
                </div>

                {/* TL Node 2 */}
                <div className="relative">
                  <span className="absolute -left-[31px] top-1.5 w-3.5 h-3.5 rounded-full bg-slate-300 border border-white" />
                  <div className="p-3.5 bg-white border border-slate-200 rounded-2xl shadow-sm">
                    <span className="text-[10px] text-slate-500 font-mono font-black block">10:30</span>
                    <h5 className="text-xs font-black text-slate-900 mt-0.5">AMU PLAZA 鹿兒島 (アミュプラザ鹿児島)</h5>
                    <p className="text-[10.5px] text-slate-600 mt-1 font-bold">
                      鹿兒島中央車站上蓋超大購物廣場！配備極地大摩天輪、黑豚料理美食廣場與高檔美學雜貨。
                    </p>
                    <div className="flex gap-2.5 mt-2 font-bold">
                      <a href="https://www.amu-kagoshima.com" target="_blank" rel="noopener noreferrer" className="text-[9.5px] text-amber-700 hover:underline flex items-center gap-0.5">
                        🌐 官網連結
                      </a>
                      <a href="https://maps.google.com/?q=Amu+Plaza+Kagoshima" target="_blank" rel="noopener noreferrer" className="text-[9.5px] text-amber-700 hover:underline flex items-center gap-0.5">
                        🗺️ Google 導航
                      </a>
                    </div>
                  </div>
                </div>

                {/* TL Node 3 */}
                <div className="relative">
                  <span className="absolute -left-[31px] top-1.5 w-3.5 h-3.5 rounded-full bg-rose-600 border border-white shadow shadow-rose-500/30 animate-pulse" />
                  <div className="p-3.5 bg-rose-50 border border-rose-300 rounded-2xl shadow-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] text-rose-800 font-mono font-black">19:00</span>
                      <span className="text-[8px] bg-rose-200/50 border border-rose-400 text-rose-800 font-black rounded px-1.5 py-0.5 animate-pulse">CRITICAL</span>
                    </div>
                    <h5 className="text-xs font-black text-rose-900 mt-0.5">⚠️ 登船截止 (截止檢卡回船)</h5>
                    <p className="text-[10.5px] text-rose-950 mt-1 font-semibold leading-relaxed">
                      郵輪將於日本時間晚上 20:00 啟航，最晚回船截止時間為 19:00，必須提早回到碼頭安檢登船。
                    </p>
                  </div>
                </div>

                {/* TL Node 4 */}
                <div className="relative text-slate-500">
                  <span className="absolute -left-[31px] top-1.5 w-3.5 h-3.5 rounded-full bg-slate-100 border border-slate-300" />
                  <div className="p-3.5 bg-slate-50 border border-slate-202 rounded-2xl shadow-sm">
                    <span className="text-[10px] font-mono leading-none block font-black text-slate-500">20:00</span>
                    <h5 className="text-xs font-black text-slate-400 mt-1">榮耀號啟航</h5>
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}

      </div>

      {/* GIANT PURE ULTRA BLACK SCREEN COMMUNICATION MODAL (POPUP) */}
      {activeCommCard && (
        <div 
          onClick={() => setActiveCommCard(null)}
          className="fixed inset-0 bg-[#000000] z-[100] p-6 flex flex-col justify-between select-text"
        >
          {/* Subtle info note at top */}
          <div className="text-center pt-8">
            <p className="text-xs font-bold text-gray-500 tracking-wider">
              {activeCommCard.chinese}
            </p>
            <p className="text-[11px] text-amber-500/75 mt-1 font-mono uppercase bg-amber-500/5 px-3 py-1 rounded inline-block">
              👈 輕點螢幕任何位置立即關閉 / Tap anywhere to close
            </p>
          </div>

          {/* Epic size centered Japanese text */}
          <div className="flex-1 flex items-center justify-center text-center p-4">
            <h2 
              className="text-white text-3xl sm:text-4xl font-black leading-snug tracking-wide select-all font-sans break-words break-all text-center w-full"
              style={{ fontSize: "clamp(2rem, 8vw, 3.8rem)" }}
            >
              {activeCommCard.japanese}
            </h2>
          </div>

          {/* Tactile vibration note at footer */}
          <div className="text-center pb-8 text-[10px] text-gray-500 uppercase tracking-widest font-mono select-none">
            Presented to Shop Staff or Driver · Tap Screen to Close
          </div>
        </div>
      )}

    </section>
  );
}
