/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Facility {
  id: string; // unique ID
  deck: number; // e.g., 5, 6, 7, 15, 16, 18, 19
  area: string; // "船頭" | "船中" | "船尾"
  category: "餐廳" | "酒吧" | "旅客服務" | "購物與休閒娛樂" | "水上與戶外娛樂";
  name: string;
  englishName: string;
  timeLine: string;
  description: string;
  privilege?: string; // YC, Gold or other special privileges
  isMainRestaurant?: boolean;
  type?: "paid" | "free";
  // Coordinates for SVG map rendering (viewBox="0 0 400 1000")
  cx: number;
  cy: number;
}

export interface WeatherInfo {
  name: string;
  latitude: number;
  longitude: number;
  dateStr: string;
  temp: string;
  condition: string;
  windSpeed: string;
  hourly: Array<{
    time: string;
    temp: string;
    condition: string;
  }>;
}

export interface ChecklistItem {
  id: string;
  text: string;
  category: string; // "隨身行李" | "托運行李" | "電子設備" | "藥品"
}
