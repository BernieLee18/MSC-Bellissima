/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { 
  Check, Square, CheckSquare, ClipboardList, Info, AlertTriangle, ShieldCheck, CreditCard, Apple, HelpCircle, ArrowRight, MapPin, Copy
} from "lucide-react";

interface InformationSectionProps {
  initialSubTab?: string; // "prep" | "onboard" | "offboard"
}

// Fixed Packing checklist data mapped for persistence
const INITIAL_PACK_LIST = [
  // 隨身行李
  { id: "p1", text: "護照正本（有效期需滿 6 個月以上）", category: "隨身行李" },
  { id: "p2", text: "護照 A4 規格影本 * 2 份（靠岸通關必備）", category: "隨身行李" },
  { id: "p3", text: "MSC 電子船票與條碼（已列印紙本）", category: "隨身行李" },
  { id: "p4", text: "Yacht Club 藍金色行李優先吊牌（綁妥房號）", category: "隨身行李" },
  { id: "p5", text: "雙幣信用卡或美金/台幣/日幣現鈔", category: "隨身行李" },
  { id: "p6", text: "各類常備藥、常備藥品、處方簽與胰島素", category: "隨身行李" },
  
  // 托運服飾
  { id: "p10", text: "正式西裝/西外套裝（YC 晚餐正式 Dress Code）", category: "托運行李與服飾" },
  { id: "p11", text: "全白衣服/洋裝（MSC 經典「白色派對」穿搭）", category: "托運行李與服飾" },
  { id: "p12", text: "換洗衣物、薄防風防曬外套（海上早晚風大）", category: "托運行李與服飾" },
  { id: "p13", text: "防曬草帽、太陽眼鏡、UV 傘或雨具", category: "托運行李與服飾" },
  { id: "p14", text: "個人泳裝（進入遊艇會與按摩浴池必備）", category: "托運行李與服飾" },
  { id: "p15", text: "運動跑鞋（喜馬拉雅極限高空繩橋、健身房必備，不可穿拖鞋進場）", category: "托運行李與服飾" },
  { id: "p16", text: "自備牙刷、牙膏、刮鬍刀、洗面乳（房內僅配有洗沐浴套裝、浴袍）", category: "托運行李與服飾" },

  // 充電與電器
  { id: "p20", text: "高規格萬用插頭 / 歐規轉接器（雙圓尖插頭）", category: "充電與電子設備" },
  { id: "p21", text: "手機、平板、數位相機充電器與充電短線", category: "充電與電子設備" },
  { id: "p22", text: "大容量行動電源（下船岸上長途觀光用）", category: "充電與電子設備" }
];

export default function InformationSection({ initialSubTab = "prep" }: InformationSectionProps) {
  const [subTab, setSubTab] = useState<string>(initialSubTab);
  
  // Checklist tracked and synced with localStorage
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  
  // Folder expanded states
  const [expandedPrep, setExpandedPrep] = useState<string | null>("power_sockets");

  useEffect(() => {
    if (initialSubTab) {
      setSubTab(initialSubTab);
    }
  }, [initialSubTab]);

  // Read checklist values from localstorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("msc_pack_checks");
      if (saved) {
        setCheckedItems(JSON.parse(saved));
      }
    } catch (e) {
      console.warn("Could not read checklist state from localStorage", e);
    }
  }, []);

  const handleCheckboxChange = (id: string) => {
    if (navigator.vibrate) {
      navigator.vibrate(20);
    }
    const nextChecks = {
      ...checkedItems,
      [id]: !checkedItems[id]
    };
    setCheckedItems(nextChecks);
    localStorage.setItem("msc_pack_checks", JSON.stringify(nextChecks));
  };

  const togglePrepFolder = (folderId: string) => {
    if (navigator.vibrate) navigator.vibrate(15);
    setExpandedPrep(expandedPrep === folderId ? null : folderId);
  };

  return (
    <section id="information" className="flex flex-col gap-4 flex-1 pb-20 select-none animate-slide-up">
      
      {/* SEGMENTED TAB CAPULED BAR AT TOP (IOS STYLE) */}
      <div className="px-4 pt-3 flex justify-center select-none">
        <div className="flex bg-white shadow-sm p-1 rounded-2xl border border-slate-205 w-full max-w-sm">
          {[
            { id: "prep", label: "🧰 行前準備" },
            { id: "onboard", label: "🚢 登船資訊" },
            { id: "offboard", label: "🚪 離船資訊" }
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

      {/* CORE INFO VIEWS SCROLL PANE */}
      <div className="px-4 flex flex-col gap-4 flex-1 col-span-1">

        {/* ======================= SUBVIEW 1: TRAVEL PREPARATIONS ======================= */}
        {subTab === "prep" && (
          <div className="space-y-4 animate-fade-in pb-4">
            
            {/* MSC FOR ME EXPLANATORY SMART BANNER */}
            <div className="p-4 rounded-3xl bg-white border border-slate-200 shadow relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-amber-400/5 to-transparent rounded-bl-full pointer-events-none" />
              <div className="flex items-center gap-2 mb-2">
                <span className="p-1 rounded bg-amber-500/10 text-amber-800 text-xs font-black">📱</span>
                <h4 className="text-sm font-black text-amber-900 tracking-wide">MSC for Me App 實戰使用法</h4>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed text-justify font-bold">
                <strong>上船前僅能使用部分功能，登船連上內網後方可解鎖全功能！</strong>
                上船後，請立即將手機設定為<span className="text-amber-700 font-black">「飛航模式」</span>並單獨開啟 WiFi 連接 MSC 內網。一定要關閉蜂窩數據漫遊，否則一旦自動接駁上極昂貴的「衛星內聯網路（Marilyn Maritime）」，漫遊扣費每分鐘將高達驚人的 $10+ 美元！靠港日本需要下船漫遊時，再取消飛航開啟即可。
              </p>
              <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-slate-200 text-[10.5px] text-slate-500 font-black">
                <p className="flex items-center gap-1">📋 查看電子晚報節目</p>
                <p className="flex items-center gap-1">🍷 預覽全船菜單酒水</p>
                <p className="flex items-center gap-1">🎟️ 免費預訂劇場大秀</p>
                <p className="flex items-center gap-1">💬 免費與同伴親友 Chat</p>
              </div>
            </div>

            {/* DYNAMIC COMPREHENSIVE TIMELINE CHECKLIST SEGMENTS */}
            <div className="space-y-3">
              <div className="flex justify-end items-center px-1">
                <button
                  onClick={() => {
                    if (navigator.vibrate) navigator.vibrate(30);
                    setCheckedItems({});
                    localStorage.removeItem("msc_pack_checks");
                  }}
                  className="text-[10px] sm:text-xs text-amber-400 font-extrabold tracking-widest hover:underline cursor-pointer"
                >
                  重設全部清單
                </button>
              </div>

              {/* Pack list rendering organized nicely */}
              <div className="bg-white border border-slate-202 rounded-2xl p-2 divide-y divide-slate-100 shadow-md">
                {INITIAL_PACK_LIST.map((item) => {
                  const isChecked = !!checkedItems[item.id];
                  return (
                    <div 
                      key={item.id}
                      onClick={() => handleCheckboxChange(item.id)}
                      className="p-3 flex items-center justify-between gap-3 text-xs cursor-pointer active:bg-slate-50 transition-all w-full"
                    >
                      <div className="flex items-center gap-3 flex-1 select-none pr-1">
                        <div className="flex-shrink-0">
                          {isChecked ? (
                            <div className="w-5 h-5 rounded-md bg-gradient-to-r from-amber-400 to-amber-500 text-slate-900 flex items-center justify-center">
                              <Check className="w-3.5 h-3.5 stroke-[3]" />
                            </div>
                          ) : (
                            <div className="w-5 h-5 rounded-md border border-slate-300 hover:border-amber-500 transition-colors" />
                          )}
                        </div>
                        <span className={`transition-all font-bold ${isChecked ? "line-through text-slate-400 opacity-60" : "text-slate-800"}`}>
                          {item.text}
                        </span>
                      </div>
                      <span className="text-[9.5px] font-mono text-slate-500 border border-slate-200 bg-slate-100 rounded px-1 flex-shrink-0 font-bold">
                        {item.category.slice(0, 4)}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* VOLTAGE POWER CHARGING & SS PHARMACY GUIDELINES COG */}
            <div className="space-y-2.5">

              {/* Sub-accordion 1: Sockets and Cords */}
              <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-sm">
                <button
                  onClick={() => togglePrepFolder("power_sockets")}
                  className="w-full flex justify-between p-3.5 text-left text-xs font-black text-slate-800 items-center cursor-pointer hover:bg-slate-50"
                >
                  <span className="flex items-center gap-2">🔌 客房插頭規格與萬用充電</span>
                  <span className="text-[10px] text-amber-700 font-mono font-bold">D5-D19 通用</span>
                </button>
                {expandedPrep === "power_sockets" && (
                  <div className="p-3.5 border-t border-slate-150 text-[12px] text-slate-705 leading-relaxed bg-slate-50">
                    <p className="font-semibold text-slate-700">
                      <strong>房內梳妝台電源配備：</strong><br />
                      ● 110V 台灣標準平行扁孔插座 * 2 個；<br />
                      ● 220V 歐規雙個圓孔插頭 * 2 個（需接萬用轉接插頭頭才可使用）；<br />
                      ● USB 充電口 * 1 個；<br />
                      ● 床頭背景小夜燈附設：USB 高速充電座 * 1 個。<br />
                      <span className="text-amber-800 font-extrabold block mt-2">❌ 禁帶物品警告：</span>
                      高能耗排插延長線、大功率吹風機/摺疊電燙斗/熱水器壺、或是任何生鮮冷凍肉品皆一律嚴禁上船托運，安檢發現將會被直接沒收至航程最後一天放岸時退還。
                    </p>
                  </div>
                )}
              </div>

              {/* Sub-accordion 2: Rabbit pill guideline details */}
              <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-sm">
                <button
                  onClick={() => togglePrepFolder("sickness_pills")}
                  className="w-full flex justify-between p-3.5 text-left text-xs font-black text-slate-800 items-center cursor-pointer hover:bg-slate-50"
                >
                  <span className="flex items-center gap-2">💊 暈船神藥：SS製藥白兔牌詳解</span>
                  <span className="text-[10px] sm:text-xs text-rose-500 font-black">隨行備藥提醒</span>
                </button>
                {expandedPrep === "sickness_pills" && (
                  <div className="p-3.5 border-t border-slate-150 text-[12px] text-slate-705 leading-relaxed bg-slate-50 space-y-1.5 font-medium">
                    <p className="text-slate-700 font-semibold">
                      船頭與高層風浪較大時偶有搖晃，建議備妥日本最著名<strong>「SS製藥藍白兔牌（Elesin）」</strong>：
                    </p>
                    <p className="text-slate-700">
                      <strong>● 劑量規範：</strong> 15 歲及以上成人，每次服用 <span className="text-slate-900 font-black">1 粒（每日限服用一次）</span>。請在登船、靠港出門或船起航前約 <strong className="text-amber-700 font-black">30 分鐘</strong> 以溫水送服，即可完美壓制 24 小時內所有顛簸暈厥。
                    </p>
                    <p className="text-slate-700">
                      <strong>● 嚴禁對象：</strong> <span className="text-rose-700 font-extrabold">15 歲以下成員禁止服用成人款兔牌！</span> 5 歲以上請選用專屬兒童款；幼童因成分考量，服用前請務必諮詢專業醫師。
                    </p>
                    <p className="text-[10.5px] text-slate-500 font-bold">
                      （本藥含有抗組胺等助眠成分，服用後可能會產生微弱倦怠與渴睡感，服藥後多躺在 19 層日光躺椅閉目吹風更佳）
                    </p>
                  </div>
                )}
              </div>

            </div>

          </div>
        )}

        {/* ======================= SUBVIEW 2: EMBARKATION DETAILS ======================= */}
        {subTab === "onboard" && (
          <div className="space-y-4 animate-fade-in pb-4">
            {/* SHUTTLE DISPATCH CARD */}
            <div className="p-4 bg-white border border-slate-202 shadow-md rounded-3xl relative overflow-hidden">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] text-amber-800 font-black uppercase bg-amber-100 border border-amber-300 px-2 py-0.5 rounded">
                    去程包車
                  </span>
                  <h4 className="text-base font-black text-slate-900 mt-2">夢玩家旅遊 - 尊享奔赴基隆港</h4>
                  <p className="text-[10px] text-slate-500 font-mono mt-0.5">Mercedes-Benz Vito 9-Seater Luxury Shuttle</p>
                </div>
                <div className="p-2 bg-slate-100 border border-slate-200 rounded-xl text-xs text-slate-800 text-center font-black">
                  06/25 <br /> 08:00
                </div>
              </div>

              {/* Shuttle detailed timing details */}
              <div className="mt-4 bg-slate-55 p-3.5 rounded-2xl border border-slate-200 text-xs text-slate-700 space-y-2 font-semibold">
                <p>● <strong className="text-slate-900">上車時間：</strong> 2026-06-25 上午 08:00 準時發車</p>
                <p>● <strong className="text-slate-900">出發目的地：</strong> 直奔基隆港西岸旅客中心（西二西三碼頭通航大樓）</p>
                <p>● <strong className="text-slate-900">隨行配置：</strong> 6 位隨行貴賓、4 件大行李，並配置一組兒童專屬防護安全座椅。</p>
                
                <a 
                  href="https://maps.google.com/?q=Keelung+Port+West+Passenger+Terminal"
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full py-2.5 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-900 font-black text-center text-xs uppercase tracking-wider rounded-xl mt-3 flex items-center justify-center gap-1 shadow-sm cursor-pointer hover:shadow"
                >
                  <MapPin className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>打開基隆港西岸碼頭導航</span>
                </a>
              </div>
            </div>

            {/* BUTLER TERMINAL PASSAGE INSTRUCTION COGNITION */}
            <div className="p-4 rounded-3xl bg-white border border-amber-300 text-xs sm:text-sm leading-relaxed text-slate-800 shadow-md">
              <div className="flex gap-2 items-center text-amber-800 font-extrabold mb-2">
                <ShieldCheck className="w-5 h-5 text-amber-600" />
                <span className="text-sm font-black">Yacht Club 優先通關禮遇（基隆碼頭）</span>
              </div>
              <p className="text-slate-700 font-semibold text-justify">
                <strong>無需參與普通旅客的漫長排隊！</strong><br />
                抵達基隆港西客運碼頭後，請直接前往設有金色<strong>「MSC Yacht Club」</strong>鮮明標誌的貴賓通道。專屬 YC 管家與禮賓人員已在貴賓通道入口與 VIP 專屬貴賓室恭候。<br />
                您享有的<strong>優先行李托運服務</strong>：管家將親自為您的行李拴上金色專屬優先行李牌，隨後由專用通道直接運送至您 14F-19F 的套房門口。<br />
                在享用精緻點心與特調飲品的同時，現場專員將協助您快速辦理船卡並綁定信用卡，隨後經由 VIP 專用廊橋優先登船！
              </p>
            </div>
          </div>
        )}

        {/* ======================= SUBVIEW 3: DEBARRATION INFO ======================= */}
        {subTab === "offboard" && (
          <div className="space-y-4 animate-fade-in pb-4">
            {/* RETURN SHUTTLE BUSTLE INFO */}
            <div className="p-4 bg-white border border-slate-202 shadow-md rounded-3xl relative overflow-hidden">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] text-amber-800 font-black uppercase bg-amber-100 border border-amber-300 px-2 py-0.5 rounded">
                    回程包車
                  </span>
                  <h4 className="text-base font-black text-slate-900 mt-2">夢玩家旅遊 - 順滑接送車輛返台</h4>
                  <p className="text-[10px] text-slate-500 font-mono mt-0.5">Mercedes-Benz Vito 9-Seater Luxury Pickup</p>
                </div>
                <div className="p-2 bg-slate-100 border border-slate-205 rounded-xl text-xs text-slate-800 text-center font-black">
                  06/30 <br /> 09:45
                </div>
              </div>

              {/* Timing details */}
              <div className="mt-4 bg-slate-55 p-3.5 rounded-2xl border border-slate-202 text-xs text-slate-700 space-y-2 font-semibold">
                <p>● <strong className="text-slate-900">接送地點：</strong> 基隆港口西岸旅客通關出口處（外側專用接載車道）</p>
                <p>● <strong className="text-slate-900">約定時間：</strong> 2026-06-30 上午 09:45 準時在此發車返程（司機電話與車牌，登船當晚將在 YC 每日節目早报提供）</p>
                <p>● <strong className="text-slate-900">隨行配置：</strong> 6 人同行、攜 4 件大行李箱，附設合規安全座椅一組。</p>
              </div>
            </div>

            {/* BUTLER ARRIVAL AND CHECKOUT PRIORITY PROCEDURES */}
            <div className="p-4 rounded-3xl bg-white border border-amber-300 text-xs sm:text-sm leading-relaxed text-slate-800 font-semibold font-sans shadow-md">
              <div className="flex gap-2 items-center text-amber-800 font-black mb-2">
                <ShieldCheck className="w-5 h-5 text-amber-600" />
                <span className="text-sm font-black">Yacht Club 優先下船禮遇（6/30 基隆碼頭）</span>
              </div>
              <p className="text-slate-700 font-medium text-justify">
                <strong>輕鬆體驗離船日，告別繁瑣打包流程：</strong><br />
                在 6/29 靠港前夕，專屬 YC 管家會將金色專用優先下船吊牌與行李牌送至您的套房。您只需在離船當日凌晨 01:00 前，將拴好吊牌的托運行李置於房門外走道即可。行李將透過 VIP 專用通道提早運送下船。<br />
                <strong>專屬快速通關，悠閒抵港：</strong><br />
                離船日上午 09:00 前，同行貴賓可於 16 樓 YC Top Sail 景觀酒廊享用精緻早餐。隨後於 16 樓禮賓部集合，管家與禮賓團隊將親自全程護送您前往海關。海關現場特別設有「YC 專用黃金通道」，讓您快捷避開擁擠排隊，輕鬆通關！
              </p>
            </div>
          </div>
        )}

      </div>

    </section>
  );
}
