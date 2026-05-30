/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Facility } from "../types";

export const facilitiesData: Facility[] = [
  // --- DECK 5 ---
  {
    id: "infinity-bar-d5",
    deck: 5,
    area: "船中",
    category: "酒吧",
    name: "Infinity Bar 無極酒廊",
    englishName: "Infinity Bar",
    timeLine: "06:30 - 00:00",
    description: "提供餐前開胃酒、MSC 獨家招牌調酒及全天候各類特調佳釀。",
    cx: 200,
    cy: 480
  },
  {
    id: "reception-d5",
    deck: 5,
    area: "船中",
    category: "旅客服務",
    name: "Reception - Guest Service 賓客服務中心",
    englishName: "Reception - Guest Service",
    timeLine: "24 小時營業",
    description: "提供 24 小時全天候諮詢服務。包含郵輪帳戶關聯（信用卡綁定）、航程表解釋、各類票券領取、遺失物處理，以及住宿與餐飲即時反饋協助。",
    cx: 150,
    cy: 530
  },
  {
    id: "excursions-d5",
    deck: 5,
    area: "船中",
    category: "旅客服務",
    name: "MSC Excursions 岸上觀光咨詢台",
    englishName: "MSC Excursions",
    timeLine: "09:00 - 13:00 / 17:00 - 21:00",
    description: "提供岸上行程推薦、諮詢與預訂服務，包含優先下船及接送安排。",
    cx: 250,
    cy: 530
  },
  {
    id: "future-cruise-d5",
    deck: 5,
    area: "船中",
    category: "旅客服務",
    name: "MSC 未來航程服務台",
    englishName: "Future Cruise Desk",
    timeLine: "09:00 - 12:00 / 18:00 - 22:00",
    description: "提供下一趟 MSC 航程預訂服務，享有現場專屬折扣、高額船上消費金及優先選房權。",
    cx: 200,
    cy: 600
  },
  {
    id: "posidonia-d5",
    deck: 5,
    area: "船尾",
    category: "餐廳",
    name: "Posidonia Restaurant 海王餐廳（主餐廳）",
    englishName: "Posidonia Restaurant",
    timeLine: "自訂晚餐時間席次",
    description: "📍 本餐廳僅供位置標示。您的專屬用餐請至：Deck 18 MSC Yacht Club Restaurant。",
    isMainRestaurant: true,
    cx: 200,
    cy: 800
  },

  // --- DECK 6 ---
  {
    id: "london-theatre-d6",
    deck: 6,
    area: "船頭",
    category: "購物與休閒娛樂",
    name: "London Theatre 倫敦大劇院",
    englishName: "London Theatre",
    timeLine: "18:30 - 19:15 / 20:00 - 20:45 / 21:30 - 22:15",
    description: "百老匯等級超現代設計劇院，由國際頂尖藝人陣容帶來極致娛樂盛宴與震撼演出。",
    privilege: "Yacht Club 專屬權益：免預約、免排隊。可直接至劇院中排向人員出示 YC 房卡/手環直接進入；或者在開演前 15 分鐘前往 Deck 16 YC 禮賓櫃檯，由尊屬管家親自帶隊免排隊入場。大劇院正中間最後面兩列為 YC 貴賓專屬保留席。",
    cx: 200,
    cy: 220
  },
  {
    id: "bellissima-bar-d6",
    deck: 6,
    area: "船中",
    category: "酒吧",
    name: "Bellissima Bar & Lounge 榮耀酒廊",
    englishName: "Bellissima Bar & Lounge",
    timeLine: "10:00 - 01:00",
    description: "供應 MSC 獨家招牌調酒、當代經典佳釀與專業調酒師量身調製的專屬特調。",
    cx: 200,
    cy: 410
  },
  {
    id: "chocolate-cafe-d6",
    deck: 6,
    area: "船中",
    category: "酒吧",
    name: "Jean-Philippe Chocolate & Café 巧克力工坊&咖啡屋",
    englishName: "Jean-Philippe Chocolate & Café",
    timeLine: "07:00 - 00:00",
    description: "法國大師操刀的時尚巧克力咖啡精品店。供應精緻手工巧克力、正宗法式馬卡龍與現烘精品咖啡，並提供高科技平板工作站供賓客客製化巧克力片。",
    type: "paid",
    cx: 120,
    cy: 460
  },
  {
    id: "hola-tapas-d6",
    deck: 6,
    area: "船中",
    category: "餐廳",
    name: "HOLA! Tapas Bar 墨西哥小館",
    englishName: "HOLA! Tapas Bar",
    timeLine: "12:00 - 21:30",
    description: "供應拉丁美洲與墨西哥風味經典料理（藍玉米塔可、烤乾酪辣肉醬玉米片、牛肉炸餃）與精選頂級龍舌蘭酒。",
    type: "paid",
    cx: 280,
    cy: 460
  },
  {
    id: "crepes-gelato-d6",
    deck: 6,
    area: "船中",
    category: "酒吧",
    name: "Jean-Philippe Crêpes & Gelato 可麗餅&冰淇淋吧",
    englishName: "Jean-Philippe Crêpes & Gelato",
    timeLine: "09:00 - 00:00",
    description: "位於室內中央榮耀大道旁。專售現點現做的法式薄餅與頂級冰淇淋。",
    type: "paid",
    cx: 120,
    cy: 500
  },
  {
    id: "galleria-bellissima-d6",
    deck: 6,
    area: "船中",
    category: "購物與休閒娛樂",
    name: "Galleria Bellissima 榮耀大道",
    englishName: "Galleria Bellissima",
    timeLine: "商店: 10:00-23:30 / 天幕秀: 19:15, 20:45, 22:15 / 派對: 22:15",
    description: "長 96 公尺的室內中央大道。聚集精品店、手錶、珠寶等多功能商場與餐廳，夜晚舉辦豐富娛樂活動。",
    cx: 200,
    cy: 500
  },
  {
    id: "msc-shop-d6",
    deck: 6,
    area: "船中",
    category: "購物與休閒娛樂",
    name: "MSC Shop MSC 紀念品商店",
    englishName: "MSC Shop",
    timeLine: "10:00 - 23:30",
    description: "專售 MSC 品牌限定商品，包含郵輪模型、服飾、吉祥物與航程專屬紀念品。",
    privilege: "Voyagers Club GOLD 權益：享有 MSC 品牌紀念品店 15% 折扣（限首次消費且需滿 50 歐元以上）。",
    cx: 280,
    cy: 540
  },
  {
    id: "msc-photo-d6",
    deck: 6,
    area: "船中",
    category: "購物與休閒娛樂",
    name: "MSC Photo 攝影中心 / Photo Gallery 攝影藝廊",
    englishName: "MSC Photo & Photo Gallery",
    timeLine: "09:00 - 22:00",
    description: "專業攝影團隊提供登船、正裝之夜與岸上觀光拍攝。設有數位藝廊供賓客瀏覽與珍藏回憶。",
    cx: 120,
    cy: 580
  },
  {
    id: "app-assistance-d6",
    deck: 6,
    area: "船中",
    category: "購物與休閒娛樂",
    name: "網路 & MSC for Me 應用程式資訊點",
    englishName: "Web & MSC for Me Info Point",
    timeLine: "09:00 - 22:00",
    description: "提供數位觸觸控面板與專屬 App 諮詢引導，協助旅客體驗船上智慧生活服務。",
    cx: 280,
    cy: 580
  },
  {
    id: "edge-cocktail-bar-d6",
    deck: 6,
    area: "船中",
    category: "酒吧",
    name: "Edge Cocktail Bar 緣-雞尾酒吧",
    englishName: "Edge Cocktail Bar",
    timeLine: "08:00 - 00:30",
    description: "全船核心地帶的時尚調酒聚集地。供應由 5 至 6 種精選原料搭配、調酒師現場 Live 調製的潮流特色調酒。",
    cx: 200,
    cy: 630
  },
  {
    id: "main-restaurants-d6",
    deck: 6,
    area: "船尾",
    category: "餐廳",
    name: "Il Ciliegio 櫻桃餐廳 & Le Cerisier 櫻桃樹餐廳",
    englishName: "Il Ciliegio & Le Cerisier Restaurant",
    timeLine: "主餐廳用餐時段",
    description: "📍 本餐廳僅供位置標示。您的專屬用餐請至：Deck 18 MSC Yacht Club Restaurant。",
    isMainRestaurant: true,
    cx: 160,
    cy: 780
  },
  {
    id: "lighthouse-d6",
    deck: 6,
    area: "船尾",
    category: "餐廳",
    name: "Lighthouse Restaurant 燈塔餐廳（主餐廳）",
    englishName: "Lighthouse Restaurant",
    timeLine: "主餐廳用餐時段",
    description: "📍 本餐廳僅供位置標示。您的專屬用餐請至：Deck 18 MSC Yacht Club Restaurant。",
    isMainRestaurant: true,
    cx: 240,
    cy: 830
  },

  // --- DECK 7 ---
  {
    id: "aurea-spa-d7",
    deck: 7,
    area: "船頭",
    category: "水上與戶外娛樂",
    name: "MSC Aurea Spa 水療中心",
    englishName: "MSC Aurea Spa",
    timeLine: "09:00 - 21:00",
    description: "水療中心配備熱療舒壓區、溫泉、美容沙龍與美甲沙龍，提供更衣室、帶密碼鎖置物櫃、浴巾與檸檬水。",
    privilege: "Yacht Club 專屬權益：Spa 內溫熱水療區（Thermal Area，含各式高檔冷熱桑拿房）完全免費無限次使用！需自備並穿著泳裝，可在 16 樓 YC 禮賓前台或 SPA 櫃檯提前預約。其餘精油按摩與個人護理屬付費項目。",
    type: "paid",
    cx: 200,
    cy: 280
  },
  {
    id: "tv-studio-d7",
    deck: 7,
    area: "船中",
    category: "酒吧",
    name: "TV Studio & Bar 演播廳酒廊",
    englishName: "TV Studio & Bar",
    timeLine: "18:30 - 00:00",
    description: "高規格電視與廣播直播室酒廊。全天候向全船直播，現場舉辦互動遊戲、瘋狂猜謎、海上達人秀，吧台供應調酒、啤酒、葡萄酒與軟飲。",
    cx: 130,
    cy: 420
  },
  {
    id: "masters-sea-d7",
    deck: 7,
    area: "船中",
    category: "酒吧",
    name: "Masters of the Sea 老船長酒吧",
    englishName: "Masters of the Sea Pub",
    timeLine: "17:00 - 01:00",
    description: "英倫風復古小酒館。主打各類生啤酒（Draught Beer）、義大利精釀啤酒（Italian Craft Beer）、精選威士忌與美式小點。",
    cx: 270,
    cy: 420
  },
  {
    id: "kaito-sushi-d7",
    deck: 7,
    area: "船中",
    category: "餐廳",
    name: "Kaito Sushi Bar 海渡壽司吧",
    englishName: "Kaito Sushi Bar",
    timeLine: "12:00 - 14:00 / 17:30 - 22:00",
    description: "時尚精緻日式壽司餐廳。主廚現場現點現做，供應頂級新鮮食材製成的道地亞洲珍饈。",
    type: "paid",
    cx: 130,
    cy: 470
  },
  {
    id: "kaito-teppanyaki-d7",
    deck: 7,
    area: "船中",
    category: "餐廳",
    name: "Kaito Teppanyaki 海渡鐵板燒",
    englishName: "Kaito Teppanyaki",
    timeLine: "12:00 - 14:00 / 17:30 - 22:00",
    description: "現代日式鐵板燒餐廳。設有四座烹調鐵板檯，由職人主廚現場展現鐵板料理廚藝秀，提供互動式用餐體驗。",
    type: "paid",
    cx: 270,
    cy: 470
  },
  {
    id: "butchers-cut-d7",
    deck: 7,
    area: "船中",
    category: "餐廳",
    name: "Butcher’s Cut 美式牛排屋",
    englishName: "Butcher’s Cut Steakhouse",
    timeLine: "10:00 - 14:00 / 17:30 - 22:00",
    description: "正宗美式牛排館。供應大師手工裁切與完美熟成的頂級 Linz Heritage 安格斯黑牛各部位肉品，並搭配新世界精選葡萄酒與風格調酒。",
    type: "paid",
    cx: 130,
    cy: 530
  },
  {
    id: "champagne-bar-d7",
    deck: 7,
    area: "船中",
    category: "酒吧",
    name: "Champagne Bar 香檳吧",
    englishName: "Champagne Bar",
    timeLine: "17:00 - 00:00",
    description: "現代摩登時尚香檳吧。匯聚頂級品牌香檳、氣泡酒，並提供現開生蠔、魚子醬與時令海鮮搭配。",
    cx: 270,
    cy: 530
  },
  {
    id: "casino-d7",
    deck: 7,
    area: "船尾",
    category: "購物與休閒娛樂",
    name: "Imperial Casino 帝國娛樂場",
    englishName: "Imperial Casino",
    timeLine: "公海航行時開啟 | 老虎機: 24H / 遊戲桌: 10:00 開啟",
    description: "大型海上娛樂賭場，提供各類博弈遊戲桌與老虎機服務。注意：帝國娛樂場右側老虎機台區為『室內公眾吸菸區』，攜帶幼童者請特別留意迴避。",
    cx: 200,
    cy: 690
  },
  {
    id: "casino-bar-d7",
    deck: 7,
    area: "船尾",
    category: "酒吧",
    name: "Imperial Casino Bar 帝國娛樂場酒吧",
    englishName: "Imperial Casino Bar",
    timeLine: "航行在公海時 10:00 起營業",
    description: "位於賭場內的休閒酒吧。供應精選特調、無酒精調飲（Mocktails）、生啤酒、葡萄酒與各類烈酒。",
    cx: 140,
    cy: 720
  },
  {
    id: "carousel-lounge-d7",
    deck: 7,
    area: "船尾",
    category: "購物與休閒娛樂",
    name: "Carousel Lounge 旋轉木馬劇場",
    englishName: "Carousel Lounge",
    timeLine: "海上日: 16:00, 18:00 / 靠港日: 21:00",
    description: "科技感專屬劇院。融合高空雜技、現代舞蹈與現場音樂，打造頂級感宿視聽體驗。提供兩檔大秀輪替：《SWEET 糖果樂園》與《MYÜT 追尋心聲》。",
    privilege: "需現場訂票預約學席。非免費大秀。票價 US$18 + 15% 服務費，包含：1 場 40 分鐘精品原創大秀，及開演前 30 分鐘進場贈送的專屬雞尾酒一杯。",
    type: "paid",
    cx: 200,
    cy: 860
  },

  // --- DECK 15 ---
  {
    id: "grand-canyon-pool-d15",
    deck: 15,
    area: "船中",
    category: "水上與戶外娛樂",
    name: "Grand Canyon Pool 大峽谷游泳池",
    englishName: "Grand Canyon Pool (Indoor)",
    timeLine: "08:00 - 23:00",
    description: "美式大峽谷風情室內泳池，不受天氣影響。配備可伸縮玻璃天幕與熱水按摩浴池（Whirlpools，水深 1.4m - 1.6m）。舒適水溫，適合親子同行。",
    cx: 200,
    cy: 440
  },
  {
    id: "grand-canyon-bar-d15",
    deck: 15,
    area: "船中",
    category: "酒吧",
    name: "Grand Canyon Bar 大峽谷酒吧",
    englishName: "Grand Canyon Bar",
    timeLine: "07:30 - 21:00",
    description: "主打現打鮮切果汁、異國風情熱帶雞尾酒、沁涼冰沙、冷飲與水果拉西（Lassi）。",
    cx: 140,
    cy: 460
  },
  {
    id: "atmosphere-bar-north-d15",
    deck: 15,
    area: "船中",
    category: "酒吧",
    name: "Atmosphere Bar North 氛圍酒吧 北館",
    englishName: "Atmosphere Bar North",
    timeLine: "暫停營業 (closed)",
    description: "位於主泳池北側。供應必喝招牌調酒、冰鎮啤酒、Colada 冰沙、無酒精飲料與特製咖啡。",
    cx: 260,
    cy: 460
  },
  {
    id: "atmosphere-pool-d15",
    deck: 15,
    area: "船中",
    category: "水上與戶外娛樂",
    name: "Atmosphere Pool 氛圍游泳池",
    englishName: "Atmosphere Pool",
    timeLine: "08:00 - 20:00",
    description: "超大型戶外頂級甲板泳池（水深 1.5m - 1.8m），池畔環繞躺椅，夜晚配備絕美絢麗燈光與巨大 LED 影音螢幕。注意：右側遮陽桌椅長形區域為戶外合法吸菸區，攜兒少經過時建議靠左側通行。",
    cx: 200,
    cy: 540
  },
  {
    id: "atmosphere-bar-south-d15",
    deck: 15,
    area: "船尾",
    category: "酒吧",
    name: "Atmosphere Bar South 氛圍酒吧 南館",
    englishName: "Atmosphere Bar South",
    timeLine: "10:00 - 22:00",
    description: "池畔休閒酒吧。主打由主廚全天候現做、剛出爐的特製炭烤美饌、美式多汁漢堡與熱狗佳餚。",
    cx: 140,
    cy: 580
  },
  {
    id: "atmosphere-icecream-d15",
    deck: 15,
    area: "船尾",
    category: "酒吧",
    name: "Atmosphere Ice Cream Bar 氛圍冰淇淋吧",
    englishName: "Atmosphere Ice Cream Bar",
    timeLine: "08:00 - 00:00",
    description: "泳池畔冰品吧。供應六款美味霜淇淋、現切鮮果、熱帶風情冰沙、冰鎮特調與椰林飄香（Coladas）。",
    cx: 260,
    cy: 580
  },
  {
    id: "marketplace-bar-d15",
    deck: 15,
    area: "船尾",
    category: "酒吧",
    name: "Marketplace Bar 市集自助餐廳酒吧",
    englishName: "Marketplace Bar",
    timeLine: "06:00 - 01:00",
    description: "位於市集自助餐廳旁的方便酒水吧。全天候提供冷飲、即磨咖啡、扎啤、葡萄酒等自助佐餐好夥伴。",
    cx: 150,
    cy: 690
  },
  {
    id: "marketplace-buffet-d15",
    deck: 15,
    area: "船尾",
    category: "餐廳",
    name: "Marketplace Buffet 市集自助餐廳",
    englishName: "Marketplace Buffet",
    timeLine: "早餐 06:30-11:00 | 午餐 11:00-15:00 | 晚餐 17:00-21:00 | 披薩 11:00-00:00 | 宵夜 21:30-01:00 | 茶吧 24H",
    description: "全天候海景自助餐廳。設有多功能美食料理現烤台、手作義大利鮮麵、比薩。早餐提供各式歐美中式早點，全天 24 小時免費提供現泡茶包、高檔即磨熱咖啡及精緻冰塊溫水。",
    cx: 200,
    cy: 720
  },
  {
    id: "sea-pavilion-d15",
    deck: 15,
    area: "船尾",
    category: "餐廳",
    name: "Sea Pavilion 海中閣火鍋",
    englishName: "Sea Pavilion Hotpot",
    timeLine: "17:30 - 22:00",
    description: "亞洲創意融合火鍋餐廳。提供獨特風味湯底、豐富高級火鍋食材（海鮮、和牛）與清爽開胃前菜，適合團聚分享。",
    type: "paid",
    cx: 200,
    cy: 820
  },

  // --- DECK 16 ---
  {
    id: "topsail-lounge-d16",
    deck: 16,
    area: "船頭",
    category: "酒吧",
    name: "Top Sail Lounge 遊艇會景觀酒廊",
    englishName: "Top Sail Lounge (Yacht Club Exclusive)",
    timeLine: "06:30 - 01:00 | 點心按餐段定時供應",
    description: "極致奢華。遊艇會貴賓專用。提供 270 度壯闊全幅海景、無限免費頂級酒水、現場鋼琴、及全時段由 YC 廚師精製的極緻英法點心。可點現炸新鮮柳橙汁（貼心小撇步：服務生會親自下去 19 樓泳池吧代為榨取為您端上！）。",
    privilege: "地中海遊艇會貴賓專屬（需刷手環或房卡驗證入場）。",
    cx: 200,
    cy: 160
  },
  {
    id: "concierge-d16",
    deck: 16,
    area: "船頭",
    category: "旅客服務",
    name: "Concierge Area 遊艇會禮賓櫃檯",
    englishName: "Yacht Club Concierge Desk",
    timeLine: "24 小時營業",
    description: "免排隊、免等待專屬禮賓櫃檯。協助 Yacht Club 貴賓辦理快速登離船、尊貴餐廳定位、桑拿預約、客製化岸上導覽包車，以及一切航程尊榮諮詢。",
    privilege: "地中海遊艇會貴賓專屬。",
    cx: 200,
    cy: 220
  },
  {
    id: "gym-d16",
    deck: 16,
    area: "船中",
    category: "購物與休閒娛樂",
    name: "MSC Gym powered by Technogym 泰諾健身中心",
    englishName: "MSC Gym",
    timeLine: "06:00 - 22:00",
    description: "擁有 270 度海景的頂級高層健身房。全館使用全球第一健身領導品牌義大利 Technogym® 專業高效能跑步機、重量訓練器材、飛輪，備有乾淨擦汗巾與冰水機。注意：需穿著專業運動衣物與乾淨無泥的運動鞋入場。",
    cx: 200,
    cy: 420
  },
  {
    id: "virtual-arcade-d16",
    deck: 16,
    area: "船尾",
    category: "購物與休閒娛樂",
    name: "Virtual Games Arcade 虛擬遊戲街區",
    englishName: "Virtual Games Arcade",
    timeLine: "24 小時營業",
    description: "海上頂尖數位娛樂遊戲區，提供各代經典街機、賽車格鬥以及最新沉浸式體感遊戲，需刷房卡代扣付費。",
    cx: 120,
    cy: 690
  },
  {
    id: "f1-vr-d16",
    deck: 16,
    area: "船尾",
    category: "購物與休閒娛樂",
    name: "MSC F1 模擬賽車、VR 迷宮、XD 互動影院、保齡球",
    englishName: "MSC F1 Simulator, VR & Bowling",
    timeLine: "09:00 - 23:30",
    description: "複合式科技娛樂極樂區。內含：按原裝比例建造的真車級 F1 電競模擬方程式賽車、超刺激科幻 VR 迷宮、自帶 3D 巨幕與動感衝擊椅的 XD 射擊影院，以及兩條能欣賞壯闊大洋的全尺寸海上保齡球道。",
    privilege: "MSC Voyagers Club GOLD 會員專屬特惠：本航段每位金卡會員享有『免費 1 次 F1 模擬賽車體驗』！請直接前往娛樂台向工作人員出示金卡兌領遊玩。",
    cx: 280,
    cy: 690
  },
  {
    id: "sportplex-d16",
    deck: 16,
    area: "船尾",
    category: "購物與休閒娛樂",
    name: "Sportplex 室內綜合運動館",
    englishName: "Sportplex",
    timeLine: "09:00 - 18:00",
    description: "高挑寬敞的多功能全天候室內體育館。白天提供標準籃球賽事、網球、五人制足球與排球運動空間，晚間常轉變為動感電音派對。適合全家大小一齊流汗競技。",
    cx: 200,
    cy: 740
  },
  {
    id: "sports-bar-d16",
    deck: 16,
    area: "船尾",
    category: "酒吧",
    name: "Sports Bar 運動酒吧",
    englishName: "Sports Bar",
    timeLine: "10:00 - 22:00",
    description: "美式體育視聽賽事酒吧。環繞電視直播英超、美職聯棒等精采賽事。免費無限供應美式經典熱烤熱狗；吧台另提供各式冰爽扎啤、機能飲料、乳清蛋白飲（Protein Shakes）與能量果汁。",
    cx: 130,
    cy: 790
  },
  {
    id: "horizon-pool-d16",
    deck: 16,
    area: "船尾",
    category: "水上與戶外娛樂",
    name: "Horizon Pool 天際游泳池",
    englishName: "Horizon Pool & Sun Deck",
    timeLine: "08:00 - 20:00",
    description: "位於 16 層船尾正中央的露天無邊際奢華泳池（水深 1.5m - 1.6m），擁有大面積開放日光躺椅，能鳥瞰郵輪起伏的雪白尾跡與 180 度全幅落日。夜晚更結合多段雷射舞台，是吹風聽音樂、放鬆發呆的完美聖地。",
    cx: 200,
    cy: 830
  },

  // --- DECK 18 ---
  {
    id: "yc-restaurant-d18",
    deck: 18,
    area: "船頭",
    category: "餐廳",
    name: "MSC Yacht Club Restaurant 專屬會所餐廳",
    englishName: "MSC Yacht Club Restaurant",
    timeLine: "早餐 07:00-09:00 | 午餐 12:00-13:30 | 晚餐 17:30-21:00",
    description: "極致尊享。遊艇會主餐廳。專屬米其林等級海景私廚、完全免預約，隨到隨點隨吃！每天推出不同地中海頂級點餐式法義料理（如鵝肝、波士頓龍蝦、頂級肋眼牛排），酒水全免。注意防禦著裝：晚餐時段需著優雅便裝（建議男士身穿有領襯衫、西裝外衣，女士身著洋裝優雅長裙，禁止短褲、拖鞋與背心入場）。",
    privilege: "地中海遊艇會貴賓專屬私密空間，尊榮無上。",
    cx: 200,
    cy: 160
  },
  {
    id: "sky-lounge-d18",
    deck: 18,
    area: "船中",
    category: "酒吧",
    name: "Sky Lounge 天空酒廊",
    englishName: "Sky Lounge & Piano Bar",
    timeLine: "10:00 - 01:00",
    description: "限成人的 18 樓全景鋼琴景觀酒吧。頂級爵士樂與古典鋼琴 Live 演奏，供應高品質烈酒、年份威士忌、雞尾酒與各式冷熱精緻小菜（完全免費提供）。備註：天空酒廊右側外圍通道設有『室內皇家雪茄吸煙室』，附設自動排氣，也是高檔雪茄客與煙客的隱藏版聚會之所。",
    cx: 200,
    cy: 480
  },
  {
    id: "doremiland-d18",
    deck: 18,
    area: "船尾",
    category: "旅客服務",
    name: "Doremiland 哆來咪樂園 - 兒童俱樂部",
    englishName: "Doremiland Kids Club",
    timeLine: "寶寶託用: 11:00-13:00 / 15:00-17:00 / 19:00-22:00（3歲以下需陪同）；親子開放: 10:00-22:00",
    description: "跨領域多功能兒童奇幻世界。嬰幼兒俱樂部提供與全球母嬰領導品牌義大利 Chicco® 攜手研發的益智玩具與遊戲；內部分為 3-11 歲樂高積木區（Lego Group 限定合作研發）、青少年電競休息區等，提供最安全的專業海上兒童托育服務。",
    cx: 180,
    cy: 710
  },
  {
    id: "attic-club-d18",
    deck: 18,
    area: "船尾",
    category: "酒吧",
    name: "Attic Club 閣樓俱樂部",
    englishName: "Attic Club Disco night",
    timeLine: "22:00 - 03:00 營業",
    description: "海上動感時尚摩登夜總會迪斯可。頂級 DJ 現場暖場，播放最流行的歐美電音、嗨歌與經典。供應多款熱情雞尾酒、無酒精沙冰、Spritz 氣泡飲與各類精釀啤酒。",
    cx: 240,
    cy: 710
  },
  {
    id: "horizon-bar-d18",
    deck: 18,
    area: "船尾",
    category: "酒吧",
    name: "Horizon Bar 天際酒吧 18樓版",
    englishName: "Horizon View Bar",
    timeLine: "10:00 - 22:00",
    description: "與天際泳池接軌的超高觀光高空酒吧，鳥瞰全景落日餘暉，供應特製馬丁尼、長島冰茶等經典。注意：本吧台右側長廊桌椅為「戶外吸菸區（右舷煙區）」。",
    cx: 200,
    cy: 800
  },

  // --- DECK 19 ---
  {
    id: "yc-grill-d19",
    deck: 19,
    area: "船頭",
    category: "餐廳",
    name: "MSC Yacht Club Grill & Bar The One Pool 專屬自助餐廳/燒烤吧",
    englishName: "MSC Yacht Club Grill & Bar (The One Pool Side)",
    timeLine: "早餐 06:30-10:30 | 午餐 11:30-15:00 | 午後鹹點甜品 16:00-17:00",
    description: "高奢。遊艇會 19F 池畔自助餐廳。提供豐盛香腸、現烤安格斯小肋排、烤大蝦/烤鮮魚、手作現炸薯條、精緻壽司與美式手工漢堡。池畔露天，空氣清新。",
    privilege: "地中海遊艇會貴賓專屬私密空間，隨心享用。",
    cx: 170,
    cy: 140
  },
  {
    id: "yc-sundeck-bar-d19",
    deck: 19,
    area: "船頭",
    category: "酒吧",
    name: "MSC Yacht Club Sundeck & Bar 專屬陽光甲板酒吧",
    englishName: "Yacht Club The One Pool Bar & Sundeck",
    timeLine: "06:30 - 19:00",
    description: "池畔奢享。供應由明星調酒師一對一客製特調，並提供免費『當天現壓 100% 純柳橙汁（整顆新鮮柳丁現榨）』。管家會隨時來到您的躺椅前，為您調整遮陽傘並送上冰鎮毛巾或香檳。",
    privilege: "地中海遊艇會貴賓專屬尊屬服務。",
    cx: 230,
    cy: 140
  },
  {
    id: "yc-pool-d19",
    deck: 19,
    area: "船頭",
    category: "水上與戶外娛樂",
    name: "MSC Yacht Club Pool 專屬尊貴景觀游泳池 & Whirlpool 漩渦池",
    englishName: "Yacht Club The One Pool (Private Deck)",
    timeLine: "08:00 - 20:00",
    description: "遊艇會專屬 19 樓頂端景觀游泳池（水深 1.4m - 1.5m）與兩個奢華熱水漩渦按摩池（Whirlpools），配有極奢華柚木地板、金色日光浴沙發、超大蓬鬆藍白寬條浴巾與管家級溫馨池畔小點服務。注意：sundeck 右下角有玻璃屏風阻擋處，是遊艇會專屬戶外煙區，攜童旅客可避開右下角活動。",
    privilege: "地中海遊艇會貴賓專屬（需刷卡/手環通行門禁）。",
    cx: 200,
    cy: 190
  },
  {
    id: "solarium-d19",
    deck: 19,
    area: "船中",
    category: "水上與戶外娛樂",
    name: "Top 19 Exclusive Solarium 19樓 專屬日光浴場",
    englishName: "Top 19 Exclusive Solarium",
    timeLine: "08:00 - 20:00",
    description: "需刷房卡解鎖才能進入的高層幽靜日光浴空位。配有舒適雙人休閒躺椅。適合想安靜讀書爆發日光與冥想的人，避開主池畔的喧囂。在船尾水上樂園旁有通道前往。",
    cx: 200,
    cy: 420
  },
  {
    id: "zen-bar-d19",
    deck: 19,
    area: "船中",
    category: "酒吧",
    name: "Top 19 專屬禪吧",
    englishName: "Top 19 Zen Bar",
    timeLine: "暫停營業 (closed)",
    description: "頂層 19 樓日光浴場旁的安靜補給吧。主打靜謐綠洲氛圍，提供輕盈健康草本茶、微風沙冰與氣泡軟飲。",
    cx: 200,
    cy: 470
  },
  {
    id: "arizona-bar-d19",
    deck: 19,
    area: "船尾",
    category: "酒吧",
    name: "Arizona Bar 亞利桑那樂園酒吧",
    englishName: "Arizona Bar (Aquapark)",
    timeLine: "09:00 - 16:00",
    description: "緊鄰高空水上樂園的戶外補給加油站。供應繽紛水果沙冰、消暑汽水、冰啤酒與冰鎮特調，是孩子玩水之於大人舒壓的最佳駐足點。",
    cx: 140,
    cy: 690
  },
  {
    id: "arizona-aquapark-d19",
    deck: 19,
    area: "船尾",
    category: "水上與戶外娛樂",
    name: "Arizona Aquapark 亞利桑那大峽谷親水水上樂園",
    englishName: "Arizona Aquapark",
    timeLine: "09:00 - 18:00",
    description: "大峽谷主題的海上巨型水上樂園。設有 3 條大型高速滑水道（滑道對身高要求分別為 107 與 122 公分；幼童短水滑滑梯限 91 公分）、大翻斗淋水桶、大量噴水槍，並有 50cm 深度的安全幼兒親水池與奇幻玩水洞穴。規範：一律著泳裝，幼童與需穿尿布者謝絕（不得包一般紙尿褲下水，請穿戴防水一次性游泳尿褲）。",
    cx: 200,
    cy: 730
  },
  {
    id: "himalayan-bridge-d19",
    deck: 19,
    area: "船尾",
    category: "水上與戶外娛樂",
    name: "Himalayan Bridge 喜馬拉雅高空繩索吊橋冒險",
    englishName: "Himalayan Bridge Adventure",
    timeLine: "09:00 - 18:00",
    description: "跨越船尾高達 80 米、全長 82 米的超驚險高空極限繩索吊橋項目！全方位安全扣件，考驗心跳與勇氣，鳥瞰一望無垠的世界。安全規範：必須著包頭運動跑鞋（嚴禁拖鞋、涼鞋與高跟鞋進入），並需提前至 16 樓登記並穿著安全背帶繫繩。",
    cx: 200,
    cy: 820
  }
];

// Special coordinates for Whirlpools on different decks as requested in spec:
// Deck 15: Grand Canyon Pool middle (left/right whirlpools, indoor)
// Deck 16: mid left/right (2 indoor, 2 outdoor)
// Deck 18: aft (1 outdoor)
// Deck 19: bow (1 outdoor)
export interface WharfSpec {
  id: string;
  deck: number;
  name: string;
  cx: number;
  cy: number;
  description: string;
}

export const whirlpoolsData: WharfSpec[] = [
  { id: "wp-d15-l", deck: 15, name: "Whirlpool 室內熱水按摩池 (左)", cx: 165, cy: 420, description: "位於 15 樓大峽谷室內泳池區的中間左側。全天恆溫，舒適水流療癒。" },
  { id: "wp-d15-r", deck: 15, name: "Whirlpool 室內熱水按摩池 (右)", cx: 235, cy: 420, description: "位於 15 樓大峽谷室內泳池區的中間右側。全天恆溫，舒適水流療癒。" },
  { id: "wp-d16-in-l", deck: 16, name: "Whirlpool 室內熱水按摩池 (左)", cx: 165, cy: 410, description: "位於 16 樓泰諾健身房前方室內。提供恆溫熱水與強勁穴道指壓噴氣。" },
  { id: "wp-d16-in-r", deck: 16, name: "Whirlpool 室內熱水按摩池 (右)", cx: 235, cy: 410, description: "位於 16 樓泰諾健身房前方室內。提供恆溫熱水與強勁穴道指壓噴氣。" },
  { id: "wp-d16-out-l", deck: 16, name: "Whirlpool 戶外星空熱水池 (左)", cx: 105, cy: 540, description: "位於 16 樓船中左舷外側通道，可俯瞰 15 樓氛圍游泳池。吹海風、享熱池極其舒適。" },
  { id: "wp-d16-out-r", deck: 16, name: "Whirlpool 戶外星空熱水池 (右)", cx: 295, cy: 540, description: "位於 16 樓船中右舷外側通道，可俯瞰 15 樓氛圍游泳池。吹海風、享熱池極其舒適。" },
  { id: "wp-d18-aft", deck: 18, name: "Whirlpool 戶外高空熱水按摩池", cx: 200, cy: 840, description: "位於 18 樓天際酒吧露天後方船尾。高處鳥瞰海景與浪花航線。" },
  { id: "wp-d19-bow", deck: 19, name: "Whirlpool 遊艇會專屬溫水按摩池", cx: 200, cy: 220, description: "位於 19 樓 Yacht Club 專屬泳池前端。極致高空景觀，極致奢華私密。" }
];

// Special Smoking areas data for warning maps
export interface SmokeSpec {
  id: string;
  deck: number;
  name: string;
  type: string; // "室內" | "戶外"
  cx: number;
  cy: number;
  description: string;
}

export const smokingAreasData: SmokeSpec[] = [
  { id: "smk-d7-in", deck: 7, name: "Smoking Area (室內吸菸區)", type: "室內", cx: 260, cy: 690, description: "Deck 7 船中右舷：Imperial Casino 帝國娛樂場右側老虎機台區。" },
  { id: "smk-d18-in", deck: 18, name: "Smoking Area (室內吸菸室)", type: "室內", cx: 260, cy: 480, description: "Deck 18 船中右舷：Sky Lounge 天空酒廊右側外圍走道旁的獨立專用雪茄室。" },
  { id: "smk-d7-out", deck: 7, name: "Smoking Area (戶外吸菸區)", type: "戶外", cx: 260, cy: 780, description: "Deck 7 船尾右舷：帝國娛樂場與 Carousel Lounge 之間右側逃生門外的戶外通道甲板。" },
  { id: "smk-d15-out", deck: 15, name: "Smoking Area (戶外吸菸區)", type: "戶外", cx: 260, cy: 540, description: "Deck 15 船中右舷：Atmosphere Pool 氛圍游泳池甲板右側遮陽桌椅吸煙區（與泳池長度一致）。" },
  { id: "smk-d16-out", deck: 16, name: "Smoking Area (戶外吸菸區)", type: "戶外", cx: 260, cy: 820, description: "Deck 16 船尾右舷：Horizon Amphitheatre 右側觀景台。" },
  { id: "smk-d18-out", deck: 18, name: "Smoking Area (戶外吸菸區)", type: "戶外", cx: 260, cy: 800, description: "Deck 18 船尾右舷：Horizon Bar 天際酒吧右舷遮陽桌椅觀海煙區。" },
  { id: "smk-d19-out", deck: 19, name: "Smoking Area (遊艇會專屬戶外煙區)", type: "戶外", cx: 260, cy: 245, description: "Deck 19 船頭右舷：Yacht Club 專屬泳池下方甲板，靠近 Solarium 有玻璃屏風遮擋的高檔度假沙發區。" }
];
