/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { 
  ArrowLeft, Wine, ArrowUpRight, ShieldCheck, Ticket, Pizza, DoorOpen, Coffee, HelpCircle, Pocket, ArrowDown
} from "lucide-react";

interface YachtClubSectionProps {
  onBackToHome: () => void;
}

export default function YachtClubSection({ onBackToHome }: YachtClubSectionProps) {
  const [expandedFolder, setExpandedFolder] = useState<string | null>("drinks");

  const toggleFolder = (folderId: string) => {
    if (navigator.vibrate) navigator.vibrate(15);
    setExpandedFolder(expandedFolder === folderId ? null : folderId);
  };

  const sections = [
    {
      id: "drinks",
      title: "🍷 頂級酒水與 Mini-Bar 攻略",
      icon: Wine,
      color: "bg-white",
      badgeColor: "bg-rose-100 text-rose-800",
      content: (
        <div className="space-y-3 text-xs leading-relaxed text-slate-700 font-semibold">
          <p>
            <strong className="text-amber-800 font-extrabold">● Premium Extra 尊榮無限暢飲套餐：</strong> 
            全船所有酒吧、走道廊台、與大部分特色餐廳皆可免費享用 <strong className="text-slate-900 font-black">16 美元（含）以下</strong> 的所有酒精、無酒精雞尾酒、氣泡酒、與高檔現磨咖啡。一天最多可在不同酒吧享用高達 <span className="text-amber-850 font-black">15 杯</span> 的飲料！
            <em className="text-slate-400 block mt-1 font-bold">（註：六樓著名的 Jean-Philippe 巧克力工坊/可麗餅冰淇淋吧屬店面特別版，除外收費）</em>
          </p>
          <div className="border-t border-slate-100 pt-2">
            <p>
              <strong className="text-amber-800 font-extrabold">● 房內迎賓葡萄酒：</strong> 
              在 Check-in 登船首日，可在房內免費享用精選紅/白葡萄酒一瓶。
            </p>
          </div>
          <div className="border-t border-slate-100 pt-2">
            <p>
              <strong className="text-amber-800 font-extrabold">● 房內迷你吧無限暢喝：</strong> 
              艙房冰箱內提供的高端利樂包果汁、海尼根啤酒、雪碧、可樂，以及洋芋片、堅果全數免費提供。管家與助理每日上午、下午至少兩次自動定時補滿！
            </p>
          </div>
          <div className="border-t border-slate-100 pt-2 bg-amber-500/5 p-2 rounded-xl border border-amber-300/30">
            <p className="text-[11px] text-amber-900 font-bold leading-relaxed">
              ⚠️ <strong className="text-amber-950 font-extrabold">補給小撇步：</strong> 房內零食（如 Toblerone 三角巧克力和特百惠桶裝薯片）屬於首日單次贈送，僅限享用一次。另外，房間內提供大、小玻璃瓶裝的進口 Acqua Panna 礦泉水，攜帶出門極其沈重。若有靠港出門散步的便利寶特瓶包裝礦泉水需求，<strong className="text-slate-900 font-black">可直接隨時前往 16 樓 YC 酒吧台，向服務人員免費索取攜帶出門！</strong>
            </p>
          </div>
        </div>
      )
    },
    {
      id: "elevator",
      title: "⚡ 隱藏版 YC 優先電梯刷卡手勢",
      icon: ArrowUpRight,
      color: "bg-white",
      badgeColor: "bg-sky-100 text-sky-800",
      content: (
        <div className="space-y-3 text-xs leading-relaxed text-slate-700 font-semibold">
          <p>
            船頭部分的特定中高層電梯，隱藏著供 Yacht Club 貴賓越級直達的高階專屬感應器。在電梯等候大廳的外壁感應板上：
          </p>
          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 font-sans">
            <p className="text-amber-850 font-black">第一步：在大廳外解鎖</p>
            <p className="text-slate-600 mt-1 font-bold">電梯外等候區，將您的「YC 尊享發光手環」或「Yacht Club 藍金色房卡」輕觸一下電梯按鈕旁邊的小型黑色感應槽，電梯中控將發起最高級預派，直接以最高優先權自動將一部電梯外派至你所在的樓層。</p>
          </div>
          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 font-sans">
            <p className="text-amber-850 font-black">第二步：在電梯車廂內二次直達</p>
            <p className="text-slate-600 mt-1 font-bold">進入電梯車廂後，請再次刷一下手環。此時，車廂面板下方的 VIP 燈號亮起。這座電梯將暫時無視其他樓層旅客的外派請求，以 VIP 直達特快速度無中斷送您前往目的層！</p>
          </div>
        </div>
      )
    },
    {
      id: "theatre",
      title: "🎭 倫敦大劇院 London Theatre 免排隊特權",
      icon: Ticket,
      color: "bg-white",
      badgeColor: "bg-indigo-100 text-indigo-800",
      content: (
        <div className="space-y-3 text-xs leading-relaxed text-slate-700 font-semibold">
          <p>
            <strong className="text-amber-800 font-extrabold">● 免預約，完全免排：</strong> 
            普通艙旅客觀看大劇院每人每晚必須預約、並提前排隊 20 分鐘才可進場。而 YC 旅客在觀賞大秀（一般三場時段：18:30 / 20:00 / 21:30）時，不需要透過 App 進行任何預約。
          </p>
          <div className="border-t border-slate-100 pt-2">
            <p>
              <strong className="text-amber-800 font-extrabold">● 雙軌管家帶隊模式：</strong> 
               1. 旅客可自由在開演前 5 分鐘，直接走到 6 樓劇院中排向工作人員出示 YC 金色房卡或金色手環，會為您秒速拉開紅線排隊通道直接進場； <br />
               2. 在開演前 15 分鐘，前往 Deck 16 的 YC 禮賓大廳集合，當班管家團隊會親自列隊，帶領所有貴賓通過 VIP 電梯，免排隊直抵劇院內部入席。
            </p>
          </div>
          <div className="border-t border-slate-100 pt-2 bg-indigo-50/60 p-2 rounded-xl border border-indigo-200">
            <p className="text-[11px] text-indigo-900 font-bold leading-relaxed">
              💡 <strong className="text-indigo-950 font-black">YC 尊屬保留席：</strong> 為了讓 30-60 歲家長與孩子免除視界干擾，大劇院內部正中間最後面兩列最寬敞、視野最佳的座椅，已被永久掛牌為「Yacht Club 貴賓保留席」。
              <em className="text-slate-500 block mt-1 font-medium">（特別註記：若旅客想坐得特別靠前，比如最前排舞台近距離，仍建議攜家人提早 10 分鐘入場挑選前排座位。）</em>
            </p>
          </div>
        </div>
      )
    },
    {
      id: "pizza_service",
      title: "🍕 24H 免費房內送餐與極致生活細節",
      icon: Pizza,
      color: "bg-white",
      badgeColor: "bg-emerald-100 text-emerald-800",
      content: (
        <div className="space-y-3 text-xs leading-relaxed text-slate-700 font-semibold">
          <p>
            <strong className="text-amber-800 font-extrabold">● 24H 送餐與免費專屬披薩：</strong>
            遊艇會貴賓可免費享受客房送餐（Room Service）與免服務費特權。特別推薦：在房間可免費呼叫現烤香脆的 Yacht Club 比薩！僅需使用房間書桌旁的有線電話撥打專屬速撥鍵，或分機號碼 <span className="text-amber-850 font-black font-mono">[2856]</span> 直接對話禮賓櫃檯，15~20 分鐘後管家便會端來剛出爐、帶有香濃起司的大披薩送至房內！
          </p>
          <div className="border-t border-slate-100 pt-2">
            <p>
              <strong className="text-amber-800 font-extrabold">● DORALAN 枕頭選單 (Pillow Menu)：</strong>
              房內預設提供的是義大利奢華床具品牌 Dorelan 記憶枕。若習慣偏硬/偏高/天然乳膠/草本填充枕頭，可告知您的專屬管家索取 Pillow Menu，提供 5 種不同高度與軟硬度的極致枕頭免費調劑替換。
            </p>
          </div>
          <div className="border-t border-slate-100 pt-2">
            <p>
              <strong className="text-amber-800 font-extrabold">● Aurea Spa 溫泉溫熱體驗區免費：</strong>
              Yacht Club 旅客可免費享用位於 7 樓 Aurea Spa 內部的 Sauna 熱石桑拿與舒壓溫水水療區。可在 16 樓 YC 櫃檯，提前為長輩與同行旅客預約時間即可免排，並有免費大型浴袍、拖鞋與檸檬排毒水伺候。
            </p>
          </div>
          <div className="border-t border-slate-100 pt-2">
            <p>
              <strong className="text-amber-800 font-extrabold">● 免費贈送兩台高速網路：</strong>
              每位遊艇會旅客皆免費贈送兩台裝置的基礎聯網。建議在首次聯網時填入房卡、名字。
              <em className="text-slate-500 block mt-1 font-medium">（注意：此免費版本不支援 YouTube、Netflix、Spotify 等超高頻寬串流影音，如需影音工作可現場付費升級為 Premium 套餐。）</em>
            </p>
          </div>
        </div>
      )
    }
  ];

  return (
    <section id="yacht-club" className="flex flex-col gap-4 flex-1 pb-20 select-none animate-slide-up">
      
      {/* HEADER TOOLBAR WITH BACK BUTTON */}
      <div className="px-4 pt-3 flex justify-between items-center select-none">
        <button
          onClick={onBackToHome}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-slate-50 active:scale-95 text-xs font-black text-slate-800 border border-slate-200 transition-all cursor-pointer shadow-sm"
        >
          <ArrowLeft className="w-4 h-4 text-amber-700 stroke-[2.5]" />
          <span>返回首頁</span>
        </button>
        <span className="text-[10px] text-slate-500 font-extrabold tracking-wider">EXCLUSIVE VIP AREA</span>
      </div>

      {/* LEAD INTRO SUMMARY SECTION */}
      <article className="px-4 text-center select-none">
        <div className="p-1 px-3 bg-amber-100 border border-amber-300 text-amber-900 text-[10px] font-black uppercase tracking-[0.2em] rounded-full inline-block mb-3">
          MSC Yacht Club 地中海遊艇會
        </div>
        <h2 className="text-xl font-black text-[#0f2942] leading-relaxed">
          「船中船」尊享特權指南
        </h2>
        <p className="text-xs text-slate-705 leading-relaxed max-w-sm mx-auto mt-2 text-justify font-bold text-slate-700">
          MSC Yacht Club 地中海遊艇會專為您打造尊寵私密的「船中船」體驗。它坐落於榮耀號船頭黃金 14 至 19 層，僅供全船最尊貴的 4% 貴賓獨特尊屬。在這裡，您將獨享 24 小時歐式私人管家與禮賓服務、專屬藍金色尊享智慧手環、專屬碼頭 VIP 優先登船登機，在尊貴優雅的大理石會所與私密空間內，暢享您的地中海臻奢之旅。
        </p>
      </article>

      {/* EXPANDABLE CATEGORIZED ACCORDIONS */}
      <article className="px-4 flex flex-col gap-3">
        {sections.map((sec) => {
          const Icon = sec.icon;
          const isExpanded = expandedFolder === sec.id;

          return (
            <div 
              key={sec.id}
              className={`rounded-2xl border transition-all duration-300 overflow-hidden bg-white ${
                isExpanded ? "border-amber-500 shadow-md ring-1 ring-amber-500/20" : "border-slate-200 shadow-sm hover:border-amber-400"
              }`}
            >
              {/* Box Trigger line */}
              <button
                onClick={() => toggleFolder(sec.id)}
                className="w-full flex items-center justify-between p-4 cursor-pointer text-left focus:outline-none"
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2.5 rounded-xl bg-amber-500/10 text-amber-700`}>
                    <Icon className="w-4.5 h-4.5 text-amber-700" />
                  </div>
                  <h3 className="text-xs sm:text-xs font-black text-slate-900 tracking-wide">
                    {sec.title}
                  </h3>
                </div>
                <div className="p-1 rounded-full bg-slate-100 text-slate-400">
                  <ArrowDown className={`w-3.5 h-3.5 transition-transform duration-300 ${
                    isExpanded ? "rotate-180 text-amber-700" : ""
                  }`} />
                </div>
              </button>

              {/* Collapsing Detail Segment */}
              <div className={`transition-all duration-300 ease-in-out ${
                isExpanded ? "max-h-[500px] border-t border-slate-100 opacity-100 p-4 bg-slate-50/50" : "max-h-0 opacity-0 pointer-events-none"
              } overflow-y-auto`}>
                {sec.content}
              </div>
            </div>
          );
        })}
      </article>

      {/* QUICK HIGHLIGHT WARNING TIPS FOR NEW GUESTS */}
      <article className="mx-4 p-4 rounded-2xl bg-amber-50/60 border border-amber-350 flex gap-3 text-xs leading-relaxed select-none shadow-sm">
        <div className="text-amber-800 mt-0.5 font-bold">
          💡
        </div>
        <div>
          <p className="font-black text-amber-900">遊艇會尊享提醒 (Yacht Club Note)</p>
          <p className="text-slate-705 font-semibold mt-1">
            下船在佐世保與鹿兒島登陸觀光時，您的藍金尊享智慧手環、金色房卡就是快速返回通道的 VIP 確認憑證。看見普通客人排長龍回船時，不要猶豫，直接前往 YC 貴賓專屬安檢通道即可長驅直入！
          </p>
        </div>
      </article>

    </section>
  );
}
