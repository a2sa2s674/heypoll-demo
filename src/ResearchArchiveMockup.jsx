import { useState } from "react";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from "recharts";

const COLORS = {
  navy: "#031D38",
  navyLight: "#1B2A4A",
  orange: "#FF5D37",
  orangeLight: "#FF7F5C",
  bg: "#F7F8FA",
  white: "#FFFFFF",
  gray100: "#F3F4F6",
  gray200: "#E5E7EB",
  gray300: "#D1D5DB",
  gray400: "#9CA3AF",
  gray500: "#6B7280",
  gray600: "#4B5563",
  gray700: "#374151",
  gray900: "#111827",
  teal: "#0891B2",
  badge: {
    정기조사: "#2563EB",
    기획조사: "#7C3AED",
    트렌드리포트: "#059669",
    브랜드진단: "#D97706",
    소비자분석: "#DC2626",
    광고효과: "#0891B2",
  }
};

const CHART_COLORS = ["#FF5D37", "#031D38", "#0891B2", "#7C3AED", "#059669", "#D97706"];

// ── Sample Report Data ──
const reportsData = [
  {
    id: 1, type: "정기조사", category: "브랜드",
    title: "2026 상반기 금융 브랜드 인지도 & 선호도 정기조사",
    desc: "주요 금융 브랜드 20개사 대상 비보조 인지도, 보조 인지도, 선호도, NPS 추이를 분기별로 추적한 정기 리포트",
    date: "2026.03.15", sample: "N=2,000", year: 2026,
    tags: ["금융", "브랜드인지도", "NPS", "정기추적"],
    aiSummary: "하나금융 비보조인지도 전분기 대비 2.3%p 상승, MZ세대 선호도 개선 뚜렷",
    price: 450000,
    reportContent: {
      overview: "본 조사는 국내 주요 금융 브랜드 20개사를 대상으로 비보조 인지도, 보조 인지도, 브랜드 선호도, NPS(순추천지수)를 분기별로 추적 관측한 정기 리포트입니다. 전국 만 20-59세 남녀 2,000명을 대상으로 온라인 패널 조사를 실시하였으며, 표본오차는 95% 신뢰수준에서 ±2.2%p입니다.",
      methodology: "온라인 패널 조사 | 전국 만 20-59세 남녀 | 2026.02.24 ~ 03.08 (13일간) | 구조화 설문지",
      keyFindings: [
        "하나금융 비보조 인지도 18.7% → 21.0%로 전분기 대비 2.3%p 상승 (3위 → 2위)",
        "MZ세대(20-39세) 하나금융 선호도 12.4%로 역대 최고치 경신",
        "카카오뱅크 비보조 인지도 24.3%로 전체 1위 유지, 다만 성장세 둔화(-0.4%p)",
        "NPS 상위 3사: 카카오뱅크(+42), 토스(+38), 하나금융(+21) — 하나금융 전분기 대비 +7p 상승"
      ],
      chartData: {
        awareness: [
          { name: "카카오뱅크", value: 24.3 },
          { name: "하나금융", value: 21.0 },
          { name: "KB국민", value: 19.8 },
          { name: "신한", value: 17.2 },
          { name: "토스", value: 15.6 },
        ],
        trend: [
          { q: "24Q1", 하나: 14.2, KB: 20.1, 카카오: 22.8 },
          { q: "24Q2", 하나: 15.1, KB: 20.5, 카카오: 23.1 },
          { q: "24Q3", 하나: 16.0, KB: 20.2, 카카오: 23.5 },
          { q: "24Q4", 하나: 17.3, KB: 19.9, 카카오: 24.0 },
          { q: "25Q1", 하나: 18.7, KB: 20.0, 카카오: 24.7 },
          { q: "25Q2", 하나: 21.0, KB: 19.8, 카카오: 24.3 },
        ],
        nps: [
          { name: "카카오뱅크", value: 42 },
          { name: "토스", value: 38 },
          { name: "하나금융", value: 21 },
          { name: "KB국민", value: 15 },
          { name: "신한", value: 12 },
        ]
      },
      tableData: [
        { brand: "카카오뱅크", unaided: "24.3%", aided: "92.1%", pref: "18.7%", nps: "+42" },
        { brand: "하나금융", unaided: "21.0%", aided: "89.5%", pref: "14.2%", nps: "+21" },
        { brand: "KB국민", unaided: "19.8%", aided: "94.3%", pref: "16.1%", nps: "+15" },
        { brand: "신한", unaided: "17.2%", aided: "91.7%", pref: "13.8%", nps: "+12" },
        { brand: "토스", unaided: "15.6%", aided: "85.4%", pref: "12.5%", nps: "+38" },
      ],
      conclusion: "하나금융의 브랜드 인지도 상승세가 뚜렷하며, 특히 MZ세대에서의 개선이 두드러집니다. 하나원큐 앱 UX 개선과 ESG 캠페인이 주요 동인으로 분석됩니다. 다만 보조 인지도(89.5%)는 KB(94.3%)·카카오(92.1%) 대비 아직 격차가 있어, 대중 인지도 제고를 위한 매체 전략 강화가 필요합니다."
    }
  },
  {
    id: 2, type: "기획조사", category: "소비자",
    title: "MZ세대 정수기 구독 서비스 이용 행태 조사",
    desc: "20-39세 정수기 구독 이용자 대상 브랜드 선택 요인, 만족도, 해지 사유 심층 분석",
    date: "2026.03.10", sample: "N=1,500", year: 2026,
    tags: ["MZ세대", "구독경제", "정수기", "코웨이"],
    aiSummary: "가격 대비 성능(42%)이 1순위 선택 요인, 디자인 중요도 전년비 8%p 증가",
    price: 380000,
    reportContent: {
      overview: "MZ세대(만 20-39세) 정수기 구독 서비스 이용자 1,500명을 대상으로 브랜드 선택 요인, 이용 만족도, 해지 사유, 향후 전환 의향을 심층 분석한 기획 조사입니다.",
      methodology: "온라인 패널 조사 | 정수기 구독 이용 경험 MZ세대 | 2026.02.15 ~ 02.28 | 구조화 설문 + 심층 FGI 4그룹",
      keyFindings: [
        "브랜드 선택 1순위: 가격 대비 성능(42%) > 디자인(23%) > A/S 품질(18%) > 브랜드 신뢰도(12%)",
        "디자인 중요도 전년 대비 8%p 급증 — 인테리어 트렌드와 연동",
        "코웨이 만족도 78점으로 1위, LG퓨리케어 74점, 쿠쿠 68점 순",
        "해지 사유 Top3: 이사(31%), 가격 부담(27%), 위생 불안(19%)"
      ],
      chartData: {
        awareness: [
          { name: "가격대비성능", value: 42 },
          { name: "디자인", value: 23 },
          { name: "A/S 품질", value: 18 },
          { name: "브랜드신뢰", value: 12 },
          { name: "기타", value: 5 },
        ],
        trend: [
          { q: "2023", 코웨이: 72, LG: 70, 쿠쿠: 65 },
          { q: "2024", 코웨이: 75, LG: 72, 쿠쿠: 66 },
          { q: "2025", 코웨이: 76, LG: 73, 쿠쿠: 67 },
          { q: "2026", 코웨이: 78, LG: 74, 쿠쿠: 68 },
        ],
        nps: [
          { name: "코웨이", value: 78 },
          { name: "LG퓨리케어", value: 74 },
          { name: "쿠쿠", value: 68 },
          { name: "청호나이스", value: 62 },
        ]
      },
      tableData: [
        { brand: "코웨이", unaided: "42.1%", aided: "96.3%", pref: "34.7%", nps: "+32" },
        { brand: "LG퓨리케어", unaided: "28.5%", aided: "93.1%", pref: "26.2%", nps: "+24" },
        { brand: "쿠쿠", unaided: "15.3%", aided: "88.7%", pref: "18.4%", nps: "+14" },
        { brand: "청호나이스", unaided: "8.2%", aided: "72.4%", pref: "9.1%", nps: "+6" },
      ],
      conclusion: "MZ세대 정수기 구독 시장에서 '디자인'의 중요도가 급격히 상승하고 있으며, 이는 1인 가구 증가와 인테리어 트렌드의 영향으로 분석됩니다. 코웨이는 프리미엄 디자인 라인업 확대 전략이 효과를 보이고 있으나, 가격 합리성 인식 개선이 차기 과제로 도출되었습니다."
    }
  },
  {
    id: 3, type: "트렌드리포트", category: "트렌드",
    title: "2026 소비 트렌드 키워드 리포트: 'AI 네이티브 소비자'의 등장",
    desc: "AI 기반 추천, 검색, 구매 여정이 일상화된 소비자 세그먼트의 특성과 마케팅 시사점",
    date: "2026.02.28", sample: "N=3,000", year: 2026,
    tags: ["AI", "소비트렌드", "2026키워드", "디지털전환"],
    aiSummary: "AI 추천 기반 구매 비중이 35%를 돌파, 특히 뷰티·식품 카테고리에서 두드러짐",
    price: 500000,
    reportContent: {
      overview: "AI 기반 추천·검색·구매 여정이 일상화된 'AI 네이티브 소비자' 세그먼트의 규모, 특성, 구매 행태를 분석한 트렌드 리포트입니다. 전국 만 15-59세 3,000명 대상 대규모 조사와 빅데이터 분석을 병행하였습니다.",
      methodology: "온라인 패널 조사 + 커머스 빅데이터 분석 | 전국 만 15-59세 | 2026.01.15 ~ 02.15 (32일간)",
      keyFindings: [
        "AI 추천 기반 구매 비중 35.2%로 전년 대비 11.4%p 급증",
        "뷰티(48.3%)·식품(41.7%) 카테고리에서 AI 추천 구매 비중 최고",
        "'AI 네이티브 소비자' 세그먼트 전체의 28%로 추정 — 약 890만명",
        "AI 추천 신뢰도: 20대 72%, 30대 64%, 40대 48%, 50대 31%"
      ],
      chartData: {
        awareness: [
          { name: "뷰티", value: 48.3 },
          { name: "식품", value: 41.7 },
          { name: "패션", value: 37.2 },
          { name: "가전", value: 29.8 },
          { name: "금융", value: 22.1 },
        ],
        trend: [
          { q: "2022", AI구매: 12.5, 검색구매: 45.2, 직접구매: 42.3 },
          { q: "2023", AI구매: 18.3, 검색구매: 43.8, 직접구매: 37.9 },
          { q: "2024", AI구매: 23.8, 검색구매: 41.2, 직접구매: 35.0 },
          { q: "2025", AI구매: 35.2, 검색구매: 37.5, 직접구매: 27.3 },
        ],
        nps: [
          { name: "20대", value: 72 },
          { name: "30대", value: 64 },
          { name: "40대", value: 48 },
          { name: "50대", value: 31 },
        ]
      },
      tableData: [
        { brand: "뷰티", unaided: "48.3%", aided: "AI추천 구매율", pref: "↑14.2%p", nps: "YoY" },
        { brand: "식품", unaided: "41.7%", aided: "AI추천 구매율", pref: "↑12.8%p", nps: "YoY" },
        { brand: "패션", unaided: "37.2%", aided: "AI추천 구매율", pref: "↑10.1%p", nps: "YoY" },
        { brand: "가전", unaided: "29.8%", aided: "AI추천 구매율", pref: "↑8.5%p", nps: "YoY" },
      ],
      conclusion: "'AI 네이티브 소비자'의 급성장은 브랜드 마케팅의 패러다임 전환을 요구합니다. AI 추천 알고리즘 최적화, 개인화 콘텐츠 제작, AI 기반 CRM 도입이 시급하며, 특히 뷰티·식품 카테고리에서의 선제적 대응이 필요합니다."
    }
  },
  {
    id: 4, type: "브랜드진단", category: "브랜드",
    title: "코웨이 브랜드 헬스체크 2026 Q1",
    desc: "코웨이 브랜드의 인지-고려-선호-추천 퍼널 분석, 경쟁사 대비 포지셔닝 맵 도출",
    date: "2026.02.20", sample: "N=1,200", year: 2026,
    tags: ["코웨이", "브랜드헬스", "포지셔닝", "경쟁분석"],
    aiSummary: "프리미엄 이미지 1위 유지, 단 가격 합리성 인식은 LG퓨리케어에 역전됨",
    price: 420000,
    reportContent: {
      overview: "코웨이 브랜드의 인지-고려-선호-추천 퍼널을 정밀 분석하고, 주요 경쟁사(LG퓨리케어, 쿠쿠, 청호나이스) 대비 포지셔닝 맵을 도출한 브랜드 진단 보고서입니다.",
      methodology: "온라인 패널 + CATI 병행 | 정수기/공기청정기 보유 가구 | 2026.01.20 ~ 02.10",
      keyFindings: [
        "코웨이 브랜드 퍼널: 인지 96% → 고려 58% → 선호 34% → 추천 21%",
        "프리미엄 이미지 1위 유지 (코웨이 4.2점 > LG 3.8점 > 쿠쿠 3.1점, 5점 척도)",
        "가격 합리성: LG퓨리케어(3.6점)가 코웨이(3.2점)를 역전 — 전년 대비 0.5점 하락",
        "코웨이 핵심 연상어: '깨끗한'(32%), '프리미엄'(24%), '비싼'(18%), '신뢰'(15%)"
      ],
      chartData: {
        awareness: [
          { name: "인지", value: 96 },
          { name: "고려", value: 58 },
          { name: "선호", value: 34 },
          { name: "추천", value: 21 },
        ],
        trend: [
          { q: "24Q1", 코웨이: 35, LG: 28, 쿠쿠: 20 },
          { q: "24Q3", 코웨이: 36, LG: 30, 쿠쿠: 19 },
          { q: "25Q1", 코웨이: 35, LG: 31, 쿠쿠: 20 },
          { q: "25Q3", 코웨이: 34, LG: 32, 쿠쿠: 21 },
          { q: "26Q1", 코웨이: 34, LG: 33, 쿠쿠: 22 },
        ],
        nps: [
          { name: "프리미엄", 코웨이: 4.2, LG: 3.8, 쿠쿠: 3.1 },
          { name: "가격합리성", 코웨이: 3.2, LG: 3.6, 쿠쿠: 3.8 },
          { name: "A/S", 코웨이: 4.0, LG: 3.7, 쿠쿠: 3.3 },
          { name: "디자인", 코웨이: 4.3, LG: 3.9, 쿠쿠: 3.0 },
          { name: "위생안전", 코웨이: 4.1, LG: 3.8, 쿠쿠: 3.4 },
        ]
      },
      tableData: [
        { brand: "코웨이", unaided: "96%→58%→34%→21%", aided: "퍼널", pref: "4.2점", nps: "+28" },
        { brand: "LG퓨리케어", unaided: "93%→52%→31%→18%", aided: "퍼널", pref: "3.8점", nps: "+22" },
        { brand: "쿠쿠", unaided: "89%→41%→22%→12%", aided: "퍼널", pref: "3.1점", nps: "+10" },
      ],
      conclusion: "코웨이는 프리미엄과 디자인 영역에서 확고한 1위를 유지하고 있으나, 가격 합리성 인식의 하락은 중장기적으로 고려-선호 전환율 저하로 이어질 수 있습니다. '프리미엄의 재정의' — 단순 고가가 아닌 '합리적 프리미엄' 포지셔닝 전략이 필요합니다."
    }
  },
  {
    id: 5, type: "소비자분석", category: "소비자",
    title: "시니어 금융 서비스 디지털 전환 수용도 조사",
    desc: "55-70세 대상 모바일뱅킹 이용현황, 비대면 서비스 불안요인, 디지털 금융 교육 니즈 파악",
    date: "2026.02.15", sample: "N=800", year: 2026,
    tags: ["시니어", "디지털전환", "금융", "모바일뱅킹"],
    aiSummary: "시니어 모바일뱅킹 이용률 62%까지 상승, 보안 불안(38%)이 최대 저해요인",
    price: 350000,
    reportContent: {
      overview: "55-70세 시니어를 대상으로 모바일뱅킹 이용 현황, 비대면 금융 서비스에 대한 불안 요인, 디지털 금융 교육 니즈를 파악한 소비자 분석 보고서입니다.",
      methodology: "온라인 + 오프라인(대면) 병행 조사 | 만 55-70세 | 2026.01.20 ~ 02.08",
      keyFindings: [
        "시니어 모바일뱅킹 이용률 62% — 2023년(41%) 대비 21%p 급증",
        "최대 저해요인: 보안 불안(38%) > 복잡한 UI(26%) > 오류 시 대처 불안(21%)",
        "디지털 금융 교육 희망률 73%, 선호 방식: 오프라인 1:1(45%) > 영상 교육(28%)",
        "자녀 도움 의존도 54% — '혼자 할 수 있는 자신감' 교육이 핵심"
      ],
      chartData: {
        awareness: [
          { name: "보안불안", value: 38 },
          { name: "복잡한UI", value: 26 },
          { name: "오류불안", value: 21 },
          { name: "필요성못느낌", value: 10 },
          { name: "기타", value: 5 },
        ],
        trend: [
          { q: "2022", 이용률: 35, 불안도: 72 },
          { q: "2023", 이용률: 41, 불안도: 65 },
          { q: "2024", 이용률: 51, 불안도: 55 },
          { q: "2025", 이용률: 62, 불안도: 48 },
        ],
        nps: [
          { name: "55-59세", value: 71 },
          { name: "60-64세", value: 62 },
          { name: "65-70세", value: 48 },
        ]
      },
      tableData: [
        { brand: "55-59세", unaided: "71%", aided: "이용률", pref: "32%", nps: "불안도" },
        { brand: "60-64세", unaided: "62%", aided: "이용률", pref: "48%", nps: "불안도" },
        { brand: "65-70세", unaided: "48%", aided: "이용률", pref: "61%", nps: "불안도" },
      ],
      conclusion: "시니어 모바일뱅킹 이용률은 빠르게 성장하고 있으나, 보안 불안 해소와 직관적 UI 설계가 추가 성장의 핵심입니다. 오프라인 1:1 교육 프로그램과 시니어 전용 간편 모드 도입이 효과적인 전략으로 제안됩니다."
    }
  },
  {
    id: 6, type: "광고효과", category: "광고",
    title: "하나금융 '같이 가치' 캠페인 광고효과 조사",
    desc: "TV·디지털·옥외 매체별 광고 인지도, 메시지 전달력, 브랜드 호감도 변화 측정",
    date: "2026.01.30", sample: "N=1,000", year: 2026,
    tags: ["하나금융", "광고효과", "캠페인", "브랜드호감도"],
    aiSummary: "디지털 매체 광고 인지율(47%)이 TV(39%)를 최초로 역전, 2030세대 주도",
    price: 380000,
    reportContent: {
      overview: "하나금융 '같이 가치' 캠페인의 매체별 광고 인지도, 핵심 메시지 전달력, 브랜드 호감도 변화를 측정한 광고효과 조사입니다.",
      methodology: "온라인 패널 조사 | 수도권+5대 광역시 만 20-59세 | 2026.01.10 ~ 01.25 | 사전-사후 비교",
      keyFindings: [
        "디지털 매체 광고 인지율(47%)이 TV(39%)를 최초로 역전",
        "핵심 메시지 '같이 가치' 회상률 61% — 목표(55%) 대비 초과 달성",
        "캠페인 접촉 후 브랜드 호감도 +8.3점 상승 (100점 만점)",
        "20-30대 호감도 상승폭(+12.1점)이 40-50대(+4.7점)의 2.5배"
      ],
      chartData: {
        awareness: [
          { name: "디지털", value: 47 },
          { name: "TV", value: 39 },
          { name: "옥외", value: 24 },
          { name: "인쇄", value: 11 },
        ],
        trend: [
          { q: "접촉전", 호감도: 52.4, 신뢰도: 58.1 },
          { q: "1주후", 호감도: 56.8, 신뢰도: 59.3 },
          { q: "2주후", 호감도: 59.2, 신뢰도: 61.5 },
          { q: "4주후", 호감도: 60.7, 신뢰도: 62.8 },
        ],
        nps: [
          { name: "20대", value: 14.2 },
          { name: "30대", value: 10.1 },
          { name: "40대", value: 5.8 },
          { name: "50대", value: 3.6 },
        ]
      },
      tableData: [
        { brand: "디지털", unaided: "47%", aided: "인지율", pref: "1위", nps: "↑12%p YoY" },
        { brand: "TV", unaided: "39%", aided: "인지율", pref: "2위", nps: "↓3%p YoY" },
        { brand: "옥외", unaided: "24%", aided: "인지율", pref: "3위", nps: "±0%p" },
      ],
      conclusion: "디지털 매체가 TV를 역전한 것은 금융업계 캠페인 중 최초 사례로, MZ세대 타겟팅의 성과입니다. 다만 40-50대 도달률 강화를 위해 TV+디지털 시너지 전략이 필요하며, 옥외 매체의 ROI 재검토가 권고됩니다."
    }
  },
  {
    id: 7, type: "정기조사", category: "브랜드",
    title: "2025 하반기 가전 브랜드 트래킹 조사",
    desc: "생활가전 주요 브랜드 인지도·선호도·구매의향 반기별 추적, 카테고리별 Top3 변동 분석",
    date: "2025.12.20", sample: "N=2,500", year: 2025,
    tags: ["가전", "브랜드트래킹", "코웨이", "LG"],
    aiSummary: "코웨이 정수기 카테고리 선호도 1위 유지(32%), 공기청정기 카테고리 3위→2위",
    price: 450000,
  },
  {
    id: 8, type: "기획조사", category: "트렌드",
    title: "Z세대 브랜드 충성도 패러다임 변화 연구",
    desc: "15-26세 대상 브랜드 전환 행태, 충성도 형성 요인, SNS·커뮤니티 영향력 심층 분석",
    date: "2025.11.15", sample: "N=1,800", year: 2025,
    tags: ["Z세대", "브랜드충성도", "SNS", "커뮤니티"],
    aiSummary: "Z세대 평균 브랜드 전환 주기 4.2개월, '가치 소비'가 충성도 1순위 동인",
    price: 300000,
  },
  {
    id: 9, type: "소비자분석", category: "소비자",
    title: "구독 경제 2.0: 번들링 서비스 소비자 반응 조사",
    desc: "복합 구독(가전+콘텐츠+보험) 번들 상품에 대한 소비자 수용도, 적정 가격, 선호 조합 분석",
    date: "2025.10.28", sample: "N=1,300", year: 2025,
    tags: ["구독경제", "번들링", "가전", "콘텐츠"],
    aiSummary: "가전+콘텐츠 번들 선호도 58%, 적정 월 구독료 4.9만원(중위값)",
    price: 350000,
  },
];

const formatPrice = (p) => (p / 10000).toLocaleString() + "만원";

// ── Filter Categories ──
const filterCategories = {
  연구주제: ["브랜드", "소비자", "트렌드", "광고"],
  보고서유형: ["정기조사", "기획조사", "트렌드리포트", "브랜드진단", "소비자분석", "광고효과"],
  발행연도: [2026, 2025, 2024],
};

// ── Styles ──
const styles = {
  container: { minHeight: "100vh", background: COLORS.bg, fontFamily: "'Pretendard', 'Apple SD Gothic Neo', sans-serif" },
  header: { background: COLORS.navy, padding: "0 40px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 100 },
  logo: { display: "flex", alignItems: "center", gap: 12 },
  logoIcon: { width: 32, height: 32, borderRadius: 8, background: `linear-gradient(135deg, ${COLORS.orange}, ${COLORS.orangeLight})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 800, color: "#fff" },
  logoText: { fontSize: 18, fontWeight: 700, color: "#fff", letterSpacing: -0.5 },
  nav: { display: "flex", gap: 32, alignItems: "center" },
  navItem: (active) => ({ fontSize: 14, fontWeight: active ? 700 : 400, color: active ? "#fff" : "rgba(255,255,255,0.6)", cursor: "pointer", padding: "8px 0", borderBottom: active ? `2px solid ${COLORS.orange}` : "2px solid transparent", transition: "all 0.2s" }),
  userArea: { display: "flex", alignItems: "center", gap: 16 },
  userAvatar: { width: 32, height: 32, borderRadius: "50%", background: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, color: "#fff" },
  heroSection: { background: `linear-gradient(135deg, ${COLORS.navy} 0%, ${COLORS.navyLight} 100%)`, padding: "48px 40px 40px", textAlign: "center" },
  heroTitle: { fontSize: 28, fontWeight: 700, color: "#fff", marginBottom: 8, letterSpacing: -0.5 },
  heroSub: { fontSize: 15, color: "rgba(255,255,255,0.6)", marginBottom: 28 },
  searchWrap: { maxWidth: 640, margin: "0 auto", position: "relative" },
  searchInput: { width: "100%", padding: "14px 48px 14px 20px", borderRadius: 12, border: "none", fontSize: 15, background: "rgba(255,255,255,0.12)", color: "#fff", outline: "none", boxSizing: "border-box" },
  searchIcon: { position: "absolute", right: 16, top: "50%", transform: "translateY(-50%)", fontSize: 18, color: "rgba(255,255,255,0.5)" },
  aiSearchHint: { marginTop: 12, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, fontSize: 12, color: "rgba(255,255,255,0.45)" },
  body: { display: "flex", maxWidth: 1280, margin: "0 auto", padding: "32px 40px", gap: 32 },
  sidebar: { width: 240, flexShrink: 0 },
  filterGroup: { marginBottom: 28 },
  filterTitle: { fontSize: 13, fontWeight: 700, color: COLORS.gray700, marginBottom: 12, textTransform: "uppercase", letterSpacing: 0.5 },
  filterItem: (active) => ({ display: "flex", alignItems: "center", gap: 8, padding: "6px 0", cursor: "pointer", fontSize: 14, color: active ? COLORS.orange : COLORS.gray600, fontWeight: active ? 600 : 400, transition: "all 0.15s" }),
  checkbox: (active) => ({ width: 16, height: 16, borderRadius: 4, border: active ? `2px solid ${COLORS.orange}` : `2px solid ${COLORS.gray300}`, background: active ? COLORS.orange : "transparent", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: "#fff", flexShrink: 0, transition: "all 0.15s" }),
  mainContent: { flex: 1, minWidth: 0 },
  topBar: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 },
  resultCount: { fontSize: 14, color: COLORS.gray500 },
  sortSelect: { padding: "6px 12px", borderRadius: 8, border: `1px solid ${COLORS.gray200}`, fontSize: 13, color: COLORS.gray600, background: "#fff", cursor: "pointer" },
  cardList: { display: "flex", flexDirection: "column", gap: 16 },
  card: { background: "#fff", borderRadius: 16, padding: "24px 28px", border: `1px solid ${COLORS.gray200}`, cursor: "pointer", transition: "all 0.2s" },
  cardHover: { boxShadow: "0 4px 20px rgba(0,0,0,0.06)", borderColor: COLORS.orange, transform: "translateY(-1px)" },
  cardTop: { display: "flex", alignItems: "center", gap: 10, marginBottom: 12 },
  badge: (type) => ({ padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 600, color: "#fff", background: COLORS.badge[type] || COLORS.gray500 }),
  sampleBadge: { padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 500, color: COLORS.gray500, background: COLORS.gray100, border: `1px solid ${COLORS.gray200}` },
  cardTitle: { fontSize: 17, fontWeight: 700, color: COLORS.navy, marginBottom: 8, lineHeight: 1.5, letterSpacing: -0.3 },
  cardDesc: { fontSize: 13.5, color: COLORS.gray500, lineHeight: 1.65, marginBottom: 14 },
  aiTag: { display: "inline-flex", alignItems: "center", gap: 4, padding: "6px 12px", borderRadius: 8, background: "#FFF7ED", border: "1px solid #FFEDD5", fontSize: 12, color: "#C2410C", marginBottom: 14 },
  cardBottom: { display: "flex", justifyContent: "space-between", alignItems: "center" },
  cardDate: { fontSize: 12, color: COLORS.gray400 },
  tagList: { display: "flex", gap: 6, flexWrap: "wrap" },
  tag: { padding: "3px 10px", borderRadius: 6, fontSize: 11, color: COLORS.gray500, background: COLORS.gray100, cursor: "pointer" },
  priceBadge: { padding: "4px 12px", borderRadius: 8, fontSize: 12, fontWeight: 700, color: COLORS.orange, background: "#FFF5F3" },
  pagination: { display: "flex", justifyContent: "center", gap: 4, marginTop: 32 },
  pageBtn: (active) => ({ width: 36, height: 36, borderRadius: 8, border: active ? `1.5px solid ${COLORS.orange}` : `1px solid ${COLORS.gray200}`, background: active ? "#FFF5F3" : "#fff", color: active ? COLORS.orange : COLORS.gray500, fontSize: 13, fontWeight: active ? 700 : 400, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }),
  footer: { background: COLORS.navy, padding: "40px", marginTop: 60 },
  footerInner: { maxWidth: 1280, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "flex-start" },
  footerLogo: { fontSize: 16, fontWeight: 700, color: "rgba(255,255,255,0.8)", marginBottom: 12 },
  footerText: { fontSize: 12, color: "rgba(255,255,255,0.35)", lineHeight: 1.8 },
  footerLinks: { display: "flex", gap: 24 },
  footerLink: { fontSize: 12, color: "rgba(255,255,255,0.45)", cursor: "pointer" },
  overlay: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center" },
  modal: { background: "#fff", borderRadius: 20, width: 720, maxHeight: "85vh", overflow: "auto", padding: "36px 40px" },
  modalClose: { float: "right", fontSize: 20, cursor: "pointer", color: COLORS.gray400, background: "none", border: "none" },
  modalBadgeRow: { display: "flex", gap: 8, marginBottom: 16, marginTop: 8 },
  modalTitle: { fontSize: 22, fontWeight: 700, color: COLORS.navy, marginBottom: 12, lineHeight: 1.45 },
  modalMeta: { display: "flex", gap: 16, marginBottom: 20, fontSize: 13, color: COLORS.gray500 },
  modalSection: { marginBottom: 24 },
  modalSectionTitle: { fontSize: 14, fontWeight: 700, color: COLORS.gray700, marginBottom: 10, display: "flex", alignItems: "center", gap: 6 },
  modalDesc: { fontSize: 14, color: COLORS.gray600, lineHeight: 1.7 },
  modalAiBox: { padding: "16px 20px", borderRadius: 12, background: "linear-gradient(135deg, #FFF7ED, #FFFBF5)", border: "1px solid #FFEDD5" },
  modalAiText: { fontSize: 14, color: "#9A3412", lineHeight: 1.65 },
  modalTagList: { display: "flex", gap: 8, flexWrap: "wrap" },
  modalTag: { padding: "5px 14px", borderRadius: 8, fontSize: 13, color: COLORS.gray600, background: COLORS.gray100 },
  modalBtn: { marginTop: 24, display: "flex", gap: 12 },
  btnPrimary: { padding: "12px 28px", borderRadius: 10, background: COLORS.orange, color: "#fff", fontSize: 14, fontWeight: 600, border: "none", cursor: "pointer" },
  btnSecondary: { padding: "12px 28px", borderRadius: 10, background: COLORS.gray100, color: COLORS.gray700, fontSize: 14, fontWeight: 600, border: `1px solid ${COLORS.gray200}`, cursor: "pointer" },
  statRow: { display: "flex", gap: 16, marginTop: 32, marginBottom: 8 },
  statCard: { flex: 1, background: "#fff", borderRadius: 12, padding: "20px 24px", border: `1px solid ${COLORS.gray200}` },
  statNum: { fontSize: 28, fontWeight: 800, letterSpacing: -1 },
  statLabel: { fontSize: 12, color: COLORS.gray500, marginTop: 4 },
};

// ── Report Viewer Component ──
function ReportViewer({ report, onBack }) {
  const rc = report.reportContent;
  const trendKeys = rc.chartData.trend.length > 0 ? Object.keys(rc.chartData.trend[0]).filter(k => k !== "q" && k !== "name") : [];
  const [exportOpen, setExportOpen] = useState(false);
  const [exportStatus, setExportStatus] = useState(null); // null | "loading" | "done"

  const handleExport = (format) => {
    setExportOpen(false);
    setExportStatus("loading");
    setTimeout(() => setExportStatus("done"), 2000);
    setTimeout(() => setExportStatus(null), 5000);
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.logo}>
          <div style={styles.logoIcon}>H</div>
          <span style={styles.logoText}>HEYPOLL Data Marketplace</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, position: "relative" }}>
          <button onClick={onBack} style={{ padding: "6px 16px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.2)", background: "transparent", color: "#fff", fontSize: 13, cursor: "pointer" }}>← 목록으로</button>
          <div style={{ position: "relative" }}>
            <button onClick={() => setExportOpen(!exportOpen)} style={{ padding: "6px 16px", borderRadius: 8, border: "none", background: COLORS.orange, color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
              <span>↓</span> 내보내기
            </button>
            {exportOpen && (
              <div style={{ position: "absolute", top: "calc(100% + 6px)", right: 0, background: "#fff", borderRadius: 12, boxShadow: "0 8px 30px rgba(0,0,0,0.18)", padding: 8, minWidth: 200, zIndex: 100 }}>
                {[
                  { icon: "📄", label: "PDF로 내보내기", desc: "보고서 원본 형태 그대로", format: "pdf" },
                  { icon: "📊", label: "PPT로 내보내기", desc: "프레젠테이션용 슬라이드", format: "ppt" },
                  { icon: "📋", label: "Excel로 내보내기", desc: "데이터 테이블 · 차트 원본", format: "xlsx" },
                  { icon: "🔗", label: "공유 링크 생성", desc: "팀원에게 바로 공유", format: "link" },
                ].map((item, i) => (
                  <button key={i} onClick={() => handleExport(item.format)} style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "10px 12px", borderRadius: 8, border: "none", background: "transparent", cursor: "pointer", textAlign: "left", transition: "background 0.15s" }} onMouseEnter={e => e.currentTarget.style.background = COLORS.gray100} onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                    <span style={{ fontSize: 18 }}>{item.icon}</span>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.navy }}>{item.label}</div>
                      <div style={{ fontSize: 11, color: COLORS.gray500 }}>{item.desc}</div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Export Status Toast */}
      {exportStatus && (
        <div style={{ position: "fixed", bottom: 24, right: 24, background: exportStatus === "loading" ? COLORS.navy : "#059669", color: "#fff", padding: "14px 20px", borderRadius: 12, boxShadow: "0 8px 24px rgba(0,0,0,0.2)", display: "flex", alignItems: "center", gap: 10, zIndex: 200, fontSize: 13, fontWeight: 500 }}>
          {exportStatus === "loading" ? (
            <><span style={{ display: "inline-block", width: 16, height: 16, border: "2px solid rgba(255,255,255,0.3)", borderTop: "2px solid #fff", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} /> 보고서 내보내기 준비 중...</>
          ) : (
            <><span style={{ fontSize: 16 }}>✅</span> 내보내기 완료 — 다운로드가 시작됩니다</>
          )}
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      )}

      {/* Report Header */}
      <div style={{ background: `linear-gradient(135deg, ${COLORS.navy}, ${COLORS.navyLight})`, padding: "48px 0 40px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 40px" }}>
          <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
            <span style={styles.badge(report.type)}>{report.type}</span>
            <span style={{ padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 600, color: "#fff", background: "linear-gradient(90deg, #FF5D37, #FF7F5C)" }}>AI 재가공</span>
            <span style={{ padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 600, color: "#B2EBF2", background: "rgba(8,145,178,0.2)", border: "1px solid rgba(8,145,178,0.3)" }}>프로파일링 데이터 기반</span>
            <span style={{ ...styles.sampleBadge, background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.8)" }}>{report.sample}</span>
          </div>
          <h1 style={{ fontSize: 26, fontWeight: 700, color: "#fff", lineHeight: 1.45, marginBottom: 12 }}>{report.title}</h1>
          <div style={{ display: "flex", gap: 20, fontSize: 13, color: "rgba(255,255,255,0.5)" }}>
            <span>발행일: {report.date}</span>
            <span>카테고리: {report.category}</span>
            <span>가격: {formatPrice(report.price)}</span>
          </div>
        </div>
      </div>

      {/* Report Body */}
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "40px" }}>
        {/* AI Insight Banner */}
        <div style={{ ...styles.modalAiBox, marginBottom: 32, display: "flex", alignItems: "flex-start", gap: 12 }}>
          <span style={{ fontSize: 20 }}>✦</span>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: COLORS.orange }}>프로파일링 데이터 기반 재가공 리포트</div>
              <span style={{ padding: "2px 8px", borderRadius: 12, fontSize: 10, fontWeight: 600, color: "#fff", background: "linear-gradient(90deg, #FF5D37, #FF7F5C)" }}>AI 재가공</span>
            </div>
            <div style={styles.modalAiText}>{report.aiSummary}</div>
            <div style={{ marginTop: 10, padding: "8px 12px", background: "rgba(8,145,178,0.08)", borderRadius: 8, border: "1px solid rgba(8,145,178,0.15)", display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 11, color: COLORS.teal, fontWeight: 600 }}>데이터 출처</span>
              <span style={{ fontSize: 11, color: COLORS.gray600 }}>틸리언 Pro 프로파일링 데이터 × AI 페르소나 조사 결과</span>
            </div>
          </div>
        </div>

        {/* 1. 조사 개요 */}
        <section style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: COLORS.navy, marginBottom: 16, paddingBottom: 12, borderBottom: `2px solid ${COLORS.gray200}` }}>1. 조사 개요</h2>
          <p style={{ fontSize: 14, color: COLORS.gray600, lineHeight: 1.8, marginBottom: 16 }}>{rc.overview}</p>
          <div style={{ background: COLORS.gray100, borderRadius: 12, padding: "16px 20px", fontSize: 13, color: COLORS.gray600, lineHeight: 1.8 }}>
            <strong style={{ color: COLORS.navy }}>조사 방법론</strong><br/>{rc.methodology}
          </div>
        </section>

        {/* 2. 주요 발견 */}
        <section style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: COLORS.navy, marginBottom: 16, paddingBottom: 12, borderBottom: `2px solid ${COLORS.gray200}` }}>2. 주요 발견 (Key Findings)</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {rc.keyFindings.map((f, i) => (
              <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start", padding: "14px 18px", background: i === 0 ? "#FFF5F3" : "#fff", borderRadius: 10, border: `1px solid ${i === 0 ? "#FFD4CC" : COLORS.gray200}` }}>
                <span style={{ width: 24, height: 24, borderRadius: "50%", background: i === 0 ? COLORS.orange : COLORS.navy, color: "#fff", fontSize: 12, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{i + 1}</span>
                <span style={{ fontSize: 14, color: COLORS.gray700, lineHeight: 1.6 }}>{f}</span>
              </div>
            ))}
          </div>
        </section>

        {/* 3. 차트 영역 */}
        <section style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: COLORS.navy, marginBottom: 20, paddingBottom: 12, borderBottom: `2px solid ${COLORS.gray200}` }}>3. 데이터 분석</h2>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
            {/* Bar chart */}
            <div style={{ background: "#fff", borderRadius: 14, padding: "20px 24px", border: `1px solid ${COLORS.gray200}` }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: COLORS.gray700, marginBottom: 16 }}>항목별 분포</div>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={rc.chartData.awareness} layout="vertical" margin={{ left: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis type="number" tick={{ fontSize: 11 }} />
                  <YAxis type="category" dataKey="name" tick={{ fontSize: 11 }} width={70} />
                  <Tooltip />
                  <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                    {rc.chartData.awareness.map((_, i) => (
                      <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* NPS / secondary bar */}
            <div style={{ background: "#fff", borderRadius: 14, padding: "20px 24px", border: `1px solid ${COLORS.gray200}` }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: COLORS.gray700, marginBottom: 16 }}>비교 분석</div>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={rc.chartData.nps}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                    {rc.chartData.nps.map((_, i) => (
                      <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Trend line chart */}
          <div style={{ background: "#fff", borderRadius: 14, padding: "20px 24px", border: `1px solid ${COLORS.gray200}` }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: COLORS.gray700, marginBottom: 16 }}>추이 분석</div>
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={rc.chartData.trend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="q" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                {trendKeys.map((key, i) => (
                  <Line key={key} type="monotone" dataKey={key} stroke={CHART_COLORS[i % CHART_COLORS.length]} strokeWidth={2.5} dot={{ r: 4 }} />
                ))}
              </LineChart>
            </ResponsiveContainer>
            <div style={{ display: "flex", gap: 16, justifyContent: "center", marginTop: 8 }}>
              {trendKeys.map((key, i) => (
                <span key={key} style={{ fontSize: 11, color: COLORS.gray500, display: "flex", alignItems: "center", gap: 4 }}>
                  <span style={{ width: 10, height: 10, borderRadius: "50%", background: CHART_COLORS[i % CHART_COLORS.length] }}></span>
                  {key}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* 4. 요약 테이블 */}
        <section style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: COLORS.navy, marginBottom: 16, paddingBottom: 12, borderBottom: `2px solid ${COLORS.gray200}` }}>4. 요약 데이터</h2>
          <div style={{ borderRadius: 12, overflow: "hidden", border: `1px solid ${COLORS.gray200}` }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
              <thead>
                <tr style={{ background: COLORS.navy }}>
                  {["구분", "지표 A", "지표 B", "지표 C", "지표 D"].map((h, i) => (
                    <th key={i} style={{ padding: "12px 16px", color: "#fff", fontWeight: 600, textAlign: "left" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rc.tableData.map((row, i) => (
                  <tr key={i} style={{ background: i % 2 === 0 ? "#fff" : COLORS.gray100 }}>
                    <td style={{ padding: "11px 16px", fontWeight: 600, color: COLORS.navy }}>{row.brand}</td>
                    <td style={{ padding: "11px 16px", color: COLORS.gray600 }}>{row.unaided}</td>
                    <td style={{ padding: "11px 16px", color: COLORS.gray600 }}>{row.aided}</td>
                    <td style={{ padding: "11px 16px", color: COLORS.gray600 }}>{row.pref}</td>
                    <td style={{ padding: "11px 16px", color: COLORS.gray600 }}>{row.nps}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 5. 결론 */}
        <section style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: COLORS.navy, marginBottom: 16, paddingBottom: 12, borderBottom: `2px solid ${COLORS.gray200}` }}>5. 결론 및 제언</h2>
          <div style={{ background: `linear-gradient(135deg, #F0F4FF, #F8FAFF)`, border: "1px solid #DBEAFE", borderRadius: 14, padding: "24px 28px" }}>
            <p style={{ fontSize: 14, color: COLORS.gray700, lineHeight: 1.85 }}>{rc.conclusion}</p>
          </div>
        </section>

        {/* Tags */}
        <section style={{ marginBottom: 40 }}>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {report.tags.map((t, i) => <span key={i} style={{ padding: "6px 16px", borderRadius: 20, fontSize: 13, color: COLORS.gray600, background: COLORS.gray100 }}>#{t}</span>)}
          </div>
        </section>

        {/* Bottom actions */}
        <div style={{ display: "flex", gap: 12, justifyContent: "center", paddingTop: 20, borderTop: `1px solid ${COLORS.gray200}` }}>
          <button style={styles.btnSecondary} onClick={onBack}>← 목록으로 돌아가기</button>
          <button style={{ ...styles.btnSecondary, background: COLORS.navy, color: "#fff", border: "none", fontWeight: 600 }} onClick={() => handleExport("pdf")}>📄 PDF 다운로드</button>
          <button style={{ ...styles.btnSecondary, background: COLORS.orange, color: "#fff", border: "none", fontWeight: 600 }} onClick={() => handleExport("ppt")}>📊 PPT 내보내기</button>
          <button style={styles.btnSecondary} onClick={() => handleExport("link")}>🔗 공유하기</button>
        </div>
      </div>

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.footerInner}>
          <div>
            <div style={styles.footerLogo}>HEYPOLL Data Marketplace</div>
            <div style={styles.footerText}>헤이폴 데이터 마켓플레이스<br/>데이터 재가공 기반 리서치 커머스 플랫폼<br/>© 2026 Tillion Pro. All rights reserved.</div>
          </div>
          <div style={styles.footerLinks}>
            <span style={styles.footerLink}>이용약관</span>
            <span style={styles.footerLink}>개인정보처리방침</span>
            <span style={styles.footerLink}>고객센터</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ── Card Component ──
function ReportCard({ report, onOpen, hovered, onHover }) {
  return (
    <div
      style={{ ...styles.card, ...(hovered ? styles.cardHover : {}) }}
      onMouseEnter={() => onHover(report.id)}
      onMouseLeave={() => onHover(null)}
      onClick={() => onOpen(report)}
    >
      <div style={styles.cardTop}>
        <span style={styles.badge(report.type)}>{report.type}</span>
        <span style={{ padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 600, color: "#fff", background: "linear-gradient(90deg, #FF5D37, #FF7F5C)" }}>AI 재가공</span>
        <span style={{ padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 600, color: COLORS.teal, background: "#E0F7FA", border: "1px solid #B2EBF2" }}>프로파일링 데이터 기반</span>
        <span style={styles.sampleBadge}>{report.sample}</span>
      </div>
      <div style={styles.cardTitle}>{report.title}</div>
      <div style={styles.cardDesc}>{report.desc}</div>
      <div style={styles.aiTag}>
        <span>✦</span> AI 요약: {report.aiSummary}
      </div>
      <div style={styles.cardBottom}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <span style={styles.cardDate}>{report.date}</span>
          <div style={styles.tagList}>
            {report.tags.slice(0, 3).map((t, i) => (
              <span key={i} style={styles.tag}>#{t}</span>
            ))}
            {report.tags.length > 3 && <span style={{ ...styles.tag, color: COLORS.gray400 }}>+{report.tags.length - 3}</span>}
          </div>
        </div>
        <span style={styles.priceBadge}>{formatPrice(report.price)}</span>
      </div>
    </div>
  );
}

// ── Detail Modal ──
function DetailModal({ report, onClose, onViewReport }) {
  if (!report) return null;
  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button style={styles.modalClose} onClick={onClose}>✕</button>
        <div style={styles.modalBadgeRow}>
          <span style={styles.badge(report.type)}>{report.type}</span>
          <span style={{ padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 600, color: "#fff", background: "linear-gradient(90deg, #FF5D37, #FF7F5C)" }}>AI 재가공</span>
          <span style={{ padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 600, color: COLORS.teal, background: "#E0F7FA", border: "1px solid #B2EBF2" }}>프로파일링 데이터 기반</span>
          <span style={styles.sampleBadge}>{report.sample}</span>
          <span style={styles.priceBadge}>{formatPrice(report.price)}</span>
        </div>
        <div style={styles.modalTitle}>{report.title}</div>
        <div style={styles.modalMeta}>
          <span>발행일: {report.date}</span>
          <span>카테고리: {report.category}</span>
        </div>

        <div style={styles.modalSection}>
          <div style={styles.modalSectionTitle}>📋 조사 개요</div>
          <div style={styles.modalDesc}>{report.desc}</div>
        </div>

        <div style={styles.modalSection}>
          <div style={styles.modalSectionTitle}>✦ AI 핵심 인사이트</div>
          <div style={styles.modalAiBox}>
            <div style={styles.modalAiText}>{report.aiSummary}</div>
          </div>
        </div>

        <div style={styles.modalSection}>
          <div style={styles.modalSectionTitle}>🏷️ 키워드</div>
          <div style={styles.modalTagList}>
            {report.tags.map((t, i) => <span key={i} style={styles.modalTag}>#{t}</span>)}
          </div>
        </div>

        <div style={styles.modalSection}>
          <div style={styles.modalSectionTitle}>📊 포함 데이터</div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {["브랜드 인지도", "선호도 추이", "NPS 비교", "세그먼트 분석"].map((d, i) => (
              <span key={i} style={{ padding: "6px 14px", borderRadius: 8, fontSize: 12, background: "#EFF6FF", color: "#1D4ED8", fontWeight: 500 }}>{d}</span>
            ))}
          </div>
        </div>

        <div style={styles.modalBtn}>
          {report.reportContent ? (
            <button style={styles.btnPrimary} onClick={() => onViewReport(report)}>리포트 열람하기</button>
          ) : (
            <button style={{ ...styles.btnPrimary, opacity: 0.5, cursor: "not-allowed" }} disabled>샘플 준비 중</button>
          )}
          <button style={styles.btnSecondary}>PDF 다운로드</button>
          <button style={styles.btnSecondary}>공유하기</button>
        </div>
      </div>
    </div>
  );
}

// ── Main App ──
export default function ArchiveMockup({ onHome }) {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({ 연구주제: [], 보고서유형: [], 발행연도: [] });
  const [sortBy, setSortBy] = useState("latest");
  const [hoveredCard, setHoveredCard] = useState(null);
  const [selectedReport, setSelectedReport] = useState(null);
  const [viewingReport, setViewingReport] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeNav, setActiveNav] = useState("데이터");

  const toggleFilter = (group, value) => {
    setFilters((prev) => {
      const arr = prev[group];
      return { ...prev, [group]: arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value] };
    });
    setCurrentPage(1);
  };

  const filtered = reportsData.filter((r) => {
    if (search && !r.title.includes(search) && !r.tags.some((t) => t.includes(search)) && !r.desc.includes(search) && !r.aiSummary.includes(search)) return false;
    if (filters.연구주제.length && !filters.연구주제.includes(r.category)) return false;
    if (filters.보고서유형.length && !filters.보고서유형.includes(r.type)) return false;
    if (filters.발행연도.length && !filters.발행연도.includes(r.year)) return false;
    return true;
  });

  const sorted = [...filtered].sort((a, b) => sortBy === "latest" ? new Date(b.date) - new Date(a.date) : new Date(a.date) - new Date(b.date));
  const totalTypes = [...new Set(reportsData.map(r => r.type))].length;
  const totalTags = [...new Set(reportsData.flatMap(r => r.tags))].length;

  // If viewing a full report
  if (viewingReport) {
    return <ReportViewer report={viewingReport} onBack={() => setViewingReport(null)} />;
  }

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          {onHome && <span onClick={onHome} style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", cursor: "pointer" }}>← 홈</span>}
          <div style={styles.logo}>
            <div style={styles.logoIcon}>H</div>
            <span style={styles.logoText}>HEYPOLL Data Marketplace</span>
          </div>
        </div>
        <nav style={styles.nav}>
          {["리서치", "데이터", "인사이트", "AI 분석", "관리"].map((item) => (
            <span key={item} style={styles.navItem(activeNav === item)} onClick={() => setActiveNav(item)}>{item}</span>
          ))}
        </nav>
        <div style={styles.userArea}>
          <span style={{ fontSize: 13, color: "rgba(255,255,255,0.6)" }}>브랜딩그룹</span>
          <div style={styles.userAvatar}>H</div>
        </div>
      </header>

      {/* Hero / Search */}
      <section style={styles.heroSection}>
        <div style={styles.heroTitle}>데이터 마켓플레이스</div>
        <div style={styles.heroSub}>프로파일링 데이터 × AI 조사 결과를 재가공하여, 상품성 있는 리포트로 판매합니다</div>
        <div style={styles.searchWrap}>
          <input
            style={styles.searchInput}
            placeholder="궁금한 보고서를 검색해보세요  (예: MZ세대 금융 브랜드 인지도)"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
          />
          <span style={styles.searchIcon}>🔍</span>
        </div>
        <div style={styles.aiSearchHint}>
          <span style={{ background: `linear-gradient(135deg, ${COLORS.orange}, ${COLORS.orangeLight})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", fontWeight: 700 }}>✦ AI</span>
          자연어로 검색하면 AI가 관련 보고서를 추천해드립니다
        </div>
      </section>

      {/* Stats Row */}
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 40px" }}>
        <div style={styles.statRow}>
          <div style={styles.statCard}>
            <div style={{ ...styles.statNum, color: COLORS.navy }}>{reportsData.length}</div>
            <div style={styles.statLabel}>전체 보고서</div>
          </div>
          <div style={styles.statCard}>
            <div style={{ ...styles.statNum, color: COLORS.orange }}>{totalTypes}</div>
            <div style={styles.statLabel}>보고서 유형</div>
          </div>
          <div style={styles.statCard}>
            <div style={{ ...styles.statNum, color: COLORS.teal }}>{totalTags}</div>
            <div style={styles.statLabel}>분석 키워드</div>
          </div>
          <div style={styles.statCard}>
            <div style={{ ...styles.statNum, color: "#7C3AED" }}>AI</div>
            <div style={styles.statLabel}>자동 요약 지원</div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div style={styles.body}>
        {/* Sidebar */}
        <aside style={styles.sidebar}>
          {Object.entries(filterCategories).map(([group, items]) => (
            <div key={group} style={styles.filterGroup}>
              <div style={styles.filterTitle}>{group}</div>
              {items.map((item) => {
                const active = filters[group]?.includes(item);
                return (
                  <div key={item} style={styles.filterItem(active)} onClick={() => toggleFilter(group, item)}>
                    <div style={styles.checkbox(active)}>{active ? "✓" : ""}</div>
                    <span>{item}</span>
                    <span style={{ marginLeft: "auto", fontSize: 11, color: COLORS.gray400 }}>
                      {reportsData.filter((r) => group === "연구주제" ? r.category === item : group === "보고서유형" ? r.type === item : r.year === item).length}
                    </span>
                  </div>
                );
              })}
            </div>
          ))}

          {Object.values(filters).some((arr) => arr.length > 0) && (
            <div style={{ marginTop: 8 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: COLORS.gray600 }}>적용된 필터</span>
                <span style={{ fontSize: 11, color: COLORS.orange, cursor: "pointer", fontWeight: 600 }} onClick={() => setFilters({ 연구주제: [], 보고서유형: [], 발행연도: [] })}>초기화</span>
              </div>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {Object.entries(filters).flatMap(([g, arr]) => arr.map((v) => (
                  <span key={`${g}-${v}`} style={{ padding: "3px 10px", borderRadius: 6, fontSize: 11, background: "#FFF5F3", color: COLORS.orange, cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }} onClick={() => toggleFilter(g, v)}>
                    {v} ✕
                  </span>
                )))}
              </div>
            </div>
          )}
        </aside>

        {/* Main */}
        <main style={styles.mainContent}>
          <div style={styles.topBar}>
            <span style={styles.resultCount}>
              총 <strong style={{ color: COLORS.navy }}>{sorted.length}</strong>건의 보고서
            </span>
            <select style={styles.sortSelect} value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="latest">최신순</option>
              <option value="oldest">오래된순</option>
            </select>
          </div>
          <div style={styles.cardList}>
            {sorted.map((r) => (
              <ReportCard key={r.id} report={r} onOpen={setSelectedReport} hovered={hoveredCard === r.id} onHover={setHoveredCard} />
            ))}
          </div>
          {sorted.length === 0 && (
            <div style={{ textAlign: "center", padding: "60px 0", color: COLORS.gray400 }}>
              <div style={{ fontSize: 40, marginBottom: 12 }}>📭</div>
              <div style={{ fontSize: 15, fontWeight: 500 }}>검색 결과가 없습니다</div>
              <div style={{ fontSize: 13, marginTop: 6 }}>다른 키워드로 검색하거나 필터를 조정해보세요</div>
            </div>
          )}

          {sorted.length > 0 && (
            <div style={styles.pagination}>
              {[1, 2, 3].map((p) => (
                <div key={p} style={styles.pageBtn(currentPage === p)} onClick={() => setCurrentPage(p)}>{p}</div>
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.footerInner}>
          <div>
            <div style={styles.footerLogo}>HEYPOLL Data Marketplace</div>
            <div style={styles.footerText}>
              헤이폴 데이터 마켓플레이스<br />
              데이터 재가공 기반 리서치 커머스 플랫폼<br />
              © 2026 Tillion Pro. All rights reserved.
            </div>
          </div>
          <div style={styles.footerLinks}>
            <span style={styles.footerLink}>이용약관</span>
            <span style={styles.footerLink}>개인정보처리방침</span>
            <span style={styles.footerLink}>고객센터</span>
          </div>
        </div>
      </footer>

      {/* Detail Modal */}
      <DetailModal
        report={selectedReport}
        onClose={() => setSelectedReport(null)}
        onViewReport={(r) => { setSelectedReport(null); setViewingReport(r); }}
      />
    </div>
  );
}