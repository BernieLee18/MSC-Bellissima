/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { 
  ArrowLeft, Wine, ArrowUpRight, Ticket, Pizza, ArrowDown, Award, Crown, Sparkles, ShieldCheck
} from "lucide-react";

interface YachtClubSectionProps {
  onBackToHome: () => void;
}

export default function YachtClubSection({ onBackToHome }: YachtClubSectionProps) {
  // Support independent Multi-Expand state for each card
  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({
    drinks: true
  });

  const toggleFolder = (folderId: string) => {
    if (navigator.vibrate) navigator.vibrate(15);
    setExpandedFolders(prev => ({
      ...prev,
      [folderId]: !prev[folderId]
    }));
  };

  const sections = [
    {
      id: "drinks",
      title: "🍷 頂級酒水套餐&專屬酒廊",
      icon: Wine,
      color: "bg-white",
      badgeColor: "bg-rose-100 text-rose-800",
      content: (
        <div className="space-y-3 text-xs sm:text-sm leading-relaxed text-stone-750 font-medium">
          <p>
            <strong className="text-amber-800 font-extrabold">● Premium Extra 尊榮無限暢飲套餐：</strong> 
            全船所有酒吧、走道廊台、與大部分餐廳皆可免費無限暢享單價在 <strong className="text-stone-950 font-black">16 美元（含）以下</strong> 的各式酒精飲料、現磨意式即溶、招牌調酒、香檳與無酒精軟飲。
          </p>
          <div className="border-t border-stone-200/50 pt-2">
            <p>
              <strong className="text-amber-800 font-extrabold">● Top Sail Lounge 專屬海景酒廊：</strong> 
              坐享船頭黃金甲板視野。全天候定時端送頂奢下午茶、馬卡龍、主廚精緻手工冷盤以及香濃起司小點，飲品無限次供應。
              <em className="text-stone-450 block mt-1 font-bold text-xs">（註：六樓著名的 Jean-Philippe 巧克力工坊屬獨立店面，除外付費）</em>
            </p>
          </div>
          <div className="border-t border-stone-200/50 pt-2">
            <p>
               <strong className="text-amber-800 font-extrabold">● 迷你吧無限暢喝與迎賓红酒：</strong> 
              登船首日在客房尊享迎賓高品質紅酒/白葡萄酒一瓶。房內冰箱中進口啤酒、高級碳酸飲料、蘇打水、香脆堅果、果汁飲品每日有專人上午和下午定時至少兩次補滿，全數免費。
            </p>
          </div>
          <div className="border-t border-stone-200/20 pt-2 bg-amber-500/5 p-2 rounded-xl border border-amber-300/30">
            <p className="text-[11px] sm:text-xs text-amber-900 font-bold leading-relaxed">
              💡 <strong className="text-amber-950 font-extrabold">補給小提醒：</strong> 若有登岸漫步隨身攜帶寶特瓶包裝礦泉水的便利需求，<strong className="text-stone-950 font-black">可直接隨時隨地前往 16 樓 YC 專屬酒吧台，向服務生的金色房卡或金色手環免費索取瓶裝進口礦泉水攜帶下船！</strong>
            </p>
          </div>
        </div>
      )
    },
    {
      id: "elevator",
      title: "⚡ 優先電梯禮遇",
      icon: ArrowUpRight,
      color: "bg-white",
      badgeColor: "bg-sky-100 text-sky-800",
      content: (
        <div className="space-y-3 text-xs sm:text-sm leading-relaxed text-stone-750 font-medium">
          <p>
            <strong className="text-amber-800 font-extrabold">● 公共區電梯專屬特快直達：</strong> 
            只要在公共區域的電梯刷卡屏幕上，將您的 Yacht Club 專屬金色套房卡或金色智慧手環靠近傳感器，並<strong className="text-stone-950 font-black">持續長按感應 3~5 秒</strong>。
          </p>
          <div className="border-t border-stone-200/50 pt-2">
            <p>
              當電梯發出蜂鳴聲並點亮「VIP 專享優先通行」指標後，系統會將本電梯直接流暢、毫不停留普通客艙樓層，直通 16 樓遊艇會中樞或 18 層專屬套房大廳，全面保障客人的通行時效和優雅體驗。
            </p>
          </div>
          <div className="border-t border-stone-200/50 pt-2">
            <p>
              <strong className="text-amber-800 font-extrabold">● Yacht Club 專屬電梯：</strong> 
              在 YC 內部區域特設獨立通行電梯，非遊艇會貴賓無法進入其內，保障私密與舒適度。
            </p>
          </div>
        </div>
      )
    },
    {
      id: "theatre",
      title: "🎭 倫敦大劇院免排隊禮遇",
      icon: Ticket,
      color: "bg-white",
      badgeColor: "bg-indigo-100 text-indigo-800",
      content: (
        <div className="space-y-3 text-xs sm:text-sm leading-relaxed text-stone-750 font-medium">
          <p>
            <strong className="text-amber-800 font-extrabold">● 免預約，完全免排隊：</strong> 
            普通登客每晚赴倫敦劇院必須至少提前預約登席，且必須在劇院大門前排隊 20 分鐘等待開門。遊艇會 VIP 旅客在任何三場大秀時段中（18:30 / 20:00 / 21:30）<strong className="text-stone-950 font-black">完全免APP預約</strong>、隨到隨觀。
          </p>
          <div className="border-t border-stone-200/50 pt-2">
            <p>
              <strong className="text-amber-800 font-extrabold">● 雙向VIP對接進場途徑：</strong> <br />
               1. 自行漫步進場時，可在開演前 5 分鐘出示房卡，由工作人員快速拉開紅線免排進場； <br />
               2. 亦可在開演前 15 分鐘至 16 樓 YC 禮賓前台，由當值私人管家團隊親自集合、帶領，無障礙穿梭行政電梯進入劇院。
            </p>
          </div>
          <div className="border-t border-stone-200/20 pt-2 bg-amber-50/60 p-2 rounded-xl border border-amber-300/30">
            <p className="text-[11px] sm:text-xs text-amber-900 font-bold leading-relaxed">
              👑 <strong className="text-amber-950 font-black">遊艇會尊享專屬保留席：</strong> 劇院黃金中軸正後方視線最佳的全視野寬大靠椅已被特指為「YC貴賓保留席位」，不需爭搶，隨時就座。
            </p>
          </div>
        </div>
      )
    },
    {
      id: "luxury_villa",
      title: "🏡 海上私密尊邸的歐式奢華",
      icon: ShieldCheck,
      color: "bg-white",
      badgeColor: "bg-emerald-100 text-emerald-800",
      content: (
        <div className="space-y-3 text-xs sm:text-sm leading-relaxed text-stone-750 font-medium">
          <p>
            <strong className="text-amber-800 font-extrabold">● 頂級奢華套房：</strong> 
            房內採用實木、皮革等高品質材料打造奢華空間，並配有大型落地玻璃陽台。大理石衛浴乾濕分離，護膚盥洗系列由歐洲頂級美妝沙龍研製。
          </p>
          <div className="border-t border-stone-200/50 pt-2">
            <p>
              <strong className="text-amber-800 font-extrabold">● 義大利 Dorelan 生態臻緻床墊：</strong> 
              房內全部採用義大利頂級名床 Dorelan 手工定製的多層彈性床褥和溫馨墊層，具有絕佳舒壓感。
            </p>
          </div>
          <div className="border-t border-stone-200/50 pt-2">
            <p>
              <strong className="text-amber-800 font-extrabold">● 專屬 Dorelan Pillow Menu 枕頭菜單：</strong> 
              包含防螨護頸椎高回彈枕、天然植物乳膠枕、控溫薰衣草草本纖維枕、極致鵝絨枕等多達 5 款高度彈性軟硬舒心枕，告知專屬私人管家即可隨心更換。
            </p>
          </div>
          <div className="border-t border-stone-200/50 pt-2">
            <p>
              <strong className="text-amber-800 font-extrabold">● 細緻入微的晚間開夜床服務：</strong> 
              每日晚間提供貼心的夜床、窗簾閉合及香甜巧克力點心等高端服務，客艙配常備舒服純絨棉質睡袍和防撞保證拖鞋，帶來尊寵享受。
            </p>
          </div>
        </div>
      )
    },
    {
      id: "exclusive_privileges",
      title: "👑 遊艇會專屬禮遇 (新增)",
      icon: Award,
      color: "bg-white",
      badgeColor: "bg-amber-100 text-amber-800",
      content: (
        <div className="space-y-3 text-xs sm:text-sm leading-relaxed text-stone-750 font-medium">
          <p>
            <strong className="text-amber-800 font-extrabold">● 24小時無償客房送餐與比薩派送：</strong> 
            不論清晨或午夜，皆可無任何服務費、派送費享用精緻客房送餐。使用客房精緻電話一鍵撥打 24H 禮賓熱線或撥分機 <span className="font-mono text-amber-900 font-black">[2856]</span>，即刻免費點選 Yacht Club 手工香烤芝士大比薩派送上門！
          </p>
          <div className="border-t border-stone-200/50 pt-2">
            <p>
              <strong className="text-amber-800 font-extrabold">● MSC Aurea Spa 溫熱溫泉體驗一日通：</strong> 
              遊艇會貴賓可免費無限次通行於 MSC 著名的、提供桑拿、土耳其浴、熱石、極靜香氛等高檔水療溫泉一日熱療舒緩體驗（可在 16 樓 YC 櫃檯快速免排預約）。
            </p>
          </div>
          <div className="border-t border-stone-200/50 pt-2">
            <p>
              <strong className="text-amber-800 font-extrabold">● 精密聯網・免費配享兩台高速網絡：</strong> 
              客艙隨票首發贈送每組同行贵賓 2 台無限裝置的無障礙高品質網絡流量，便於在航行旅程與國內好友即時社群漫遊或商圈資訊即時溝通。
            </p>
          </div>
          <div className="border-t border-stone-200/50 pt-2">
            <p>
              <strong className="text-amber-800 font-extrabold">● 專屬 24 小時私密管家接待＆VIP快速通行：</strong> 
              登船和於佐世保、鹿兒島離船靠岸登陸時，金色房卡、手環是快速通道（VIP fast track）安檢回航的貴賓標誌，直接領先大部分旅客進入 YC 享用美味清淡冷盤，全程無障礙。
            </p>
          </div>
        </div>
      )
    }
  ];

  return (
    <section id="yacht-club" className="flex flex-col gap-4 flex-1 pb-20 select-none animate-slide-up bg-[#f8f5ee]">
      
      {/* HEADER TOOLBAR WITH BACK BUTTON - STICKY TOP */}
      <div className="sticky top-0 bg-[#f8f5ee]/95 backdrop-blur-md z-40 py-3 px-4 border-b border-stone-200 flex justify-between items-center select-none shadow-sm">
        <button
          onClick={onBackToHome}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-slate-50 active:scale-95 text-xs sm:text-sm font-black text-slate-800 border border-stone-200 transition-all cursor-pointer shadow-sm"
        >
          <ArrowLeft className="w-4 h-4 text-amber-700 stroke-[2.5]" />
          <span>首頁</span>
        </button>
        <span className="text-xs font-black text-amber-800 tracking-wider">MSC YACHT CLUB地中海遊艇會</span>
      </div>

      {/* LEAD INTRO SUMMARY SECTION */}
      <article className="px-4 text-center select-none mt-2">
        <h2 className="text-xl sm:text-2xl font-black text-amber-900 leading-relaxed">
          「船中船」尊享禮遇指南
        </h2>
        <p className="text-xs sm:text-sm leading-relaxed max-w-sm mx-auto mt-2 text-justify font-bold text-stone-600">
          MSC Yacht Club 地中海遊艇會為您打造極致私密的「船中船」尊榮體驗，享有24小時私人管家與禮賓服務，從登船到離船的全程VIP禮遇，盡情沉浸於全船豐富的娛樂與休閒設施。
        </p>
      </article>

      {/* EXPANDABLE CATEGORIZED ACCORDIONS */}
      <article className="px-4 flex flex-col gap-3">
        {sections.map((sec) => {
          const Icon = sec.icon;
          const isExpanded = !!expandedFolders[sec.id];

          return (
            <div 
              key={sec.id}
              className={`rounded-2xl border transition-all duration-300 overflow-hidden bg-white ${
                isExpanded ? "border-amber-500 shadow-sm ring-1 ring-amber-500/10" : "border-stone-200 shadow-xs hover:border-amber-400"
              }`}
            >
              {/* Box Trigger line */}
              <button
                onClick={() => toggleFolder(sec.id)}
                className="w-full flex items-center justify-between p-4 cursor-pointer text-left focus:outline-none"
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2.5 rounded-xl bg-amber-500/10 text-amber-700`}>
                    <Icon className="w-5 h-5 text-amber-700" />
                  </div>
                  <h3 className="text-xs sm:text-sm font-black text-stone-900 tracking-wide">
                    {sec.title}
                  </h3>
                </div>
                <div className="p-1 rounded-full bg-slate-50 text-stone-400">
                  <ArrowDown className={`w-3.5 h-3.5 transition-transform duration-300 ${
                    isExpanded ? "rotate-180 text-amber-700" : ""
                  }`} />
                </div>
              </button>

              {/* Collapsing Detail Segment */}
              <div className={`transition-all duration-300 ease-in-out ${
                isExpanded ? "max-h-[700px] border-t border-stone-100 opacity-100 p-4 bg-stone-50/40" : "max-h-0 opacity-0 pointer-events-none"
              } overflow-y-auto custom-scrollbar`}>
                {sec.content}
              </div>
            </div>
          );
        })}
      </article>

      {/* QUICK HIGHLIGHT WARNING TIPS FOR NEW GUESTS */}
      <article className="mx-4 p-4 rounded-2xl bg-[#fffef5] border border-stone-250 flex gap-3 text-xs sm:text-sm leading-relaxed select-none shadow-sm">
        <div className="text-amber-700 mt-0.5 font-bold text-base">
          💡
        </div>
        <div>
          <p className="font-extrabold text-[#2c1d11] text-xs sm:text-sm">遊艇會尊享提醒 (Yacht Club Note)</p>
          <p className="text-stone-600 font-semibold mt-1">
            下船在佐世保與鹿兒島登陸觀光時，您的藍金尊享智慧手環、金色房卡就是快速返回通道的 VIP 確認憑證。看見普通客人排長龍回船時，不要猶豫，直接前往 YC 貴賓專屬安檢通道即可長驅直入！
          </p>
        </div>
      </article>

    </section>
  );
}
