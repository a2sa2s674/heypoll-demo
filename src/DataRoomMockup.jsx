import { useState, useRef, useEffect } from "react";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from "recharts";

const COLORS = {
  navy: "#1B2A4A",
  navyLight: "#2A3F6A",
  orange: "#E85D3A",
  orangeLight: "#FF7F5C",
  teal: "#0891B2",
  tealLight: "#22D3EE",
  bg: "#F1F5F9",
  white: "#FFFFFF",
  gray100: "#F8FAFC",
  gray200: "#E2E8F0",
  gray300: "#CBD5E1",
  gray500: "#64748B",
  gray700: "#334155",
  gray900: "#0F172A",
};

// ── Persona Data (per brand) ──
const personaData = {
  hana: [
    {
      id: "h1", name: "김서연", age: "28세 · 여", tag: "MZ 직장인", avatar: "👩‍💼",
      desc: "카카오뱅크 주거래, 하나원큐 보조 사용",
      profile: "IT기업 마케터 3년차. 월급 380만원. 카카오뱅크 주거래, 하나원큐는 적금용으로 보조 사용. 카페·편의점 할인 혜택에 민감. 토스 투자도 소액으로 시작.",
      chatScript: [
        { q: "하나금융 하면 어떤 이미지가 떠오르세요?", a: "음... 솔직히 좀 올드한 느낌? KB나 카카오뱅크에 비하면 좀 덜 힙하달까요. 근데 하나원큐 앱은 의외로 괜찮더라고요. 환전할 때 진짜 편해요." },
        { q: "하나금융을 주거래로 바꿀 의향이 있으신가요?", a: "글쎄요... 카카오뱅크가 너무 편해서. 이체도 빠르고 26일 저금도 재밌고. 하나가 바꾸려면 확실한 혜택이 있어야 해요. 예를 들면 스타벅스 할인이라든지, 구독 서비스 할인 같은 거요." },
        { q: "금융앱에서 가장 중요하게 생각하는 건 뭔가요?", a: "직관적인 UX요. 이체할 때 3번 넘게 터치하면 짜증나요. 그리고 내 소비 패턴 분석해주는 기능? 카카오뱅크가 그걸 잘하거든요. 하나도 그런 거 강화하면 좋을 것 같아요." },
        { q: "최근 금융 관련해서 불만이었던 경험이 있나요?", a: "하나원큐에서 적금 만기 해지하는데 앱에서 바로 안 되고 전화해야 했어요. 진짜 황당했죠. 2024년에 이게 말이 되나... 그때 좀 실망했어요." },
      ],
    },
    {
      id: "h2", name: "이준혁", age: "35세 · 남", tag: "자산관리 관심", avatar: "👨‍💻",
      desc: "KB스타뱅킹 주거래, 투자 앱 3개 사용",
      profile: "스타트업 PM. 연봉 5,800만원. KB금융 주거래. 미래에셋·토스증권·삼성증권 동시 사용. ETF와 미국주식 관심.",
      chatScript: [
        { q: "자산관리 서비스로 하나금융을 고려해본 적 있나요?", a: "하나은행 하나머니 정도? 근데 KB의 마이데이터가 워낙 잘 되어 있어서... 모든 계좌를 한 눈에 볼 수 있잖아요. 하나는 아직 그 수준은 아닌 것 같아요." },
        { q: "금융사를 선택할 때 가장 중요한 기준이 뭔가요?", a: "첫째 금리, 둘째 앱 완성도, 셋째 투자 상품 다양성이요. KB가 3개 다 괜찮은 편이라... 하나가 넘어오려면 WM 특화 서비스 같은 차별점이 필요하죠." },
        { q: "하나금융의 투자 서비스에 대해 어떻게 생각하세요?", a: "솔직히 잘 모르겠어요. 하나증권이 있는 건 아는데, KB증권이나 미래에셋 대비 뭐가 좋은지 와닿지 않아요. 마케팅이 부족한 건지... 리서치 리포트 같은 걸 더 잘 제공하면 관심 가질 것 같아요." },
      ],
    },
    {
      id: "h3", name: "박미정", age: "52세 · 여", tag: "VIP 자산가", avatar: "👩‍🦰",
      desc: "신한 프리미엄, 하나 골드 동시 보유",
      profile: "강남 거주 자영업자 배우자. 금융자산 8억. 신한PWM 주거래, 하나 골드클럽 동시 이용. 부동산·채권 관심.",
      chatScript: [
        { q: "하나금융 골드클럽 서비스 만족도는 어떠신가요?", a: "괜찮은 편이에요. 담당 PB분이 친절하시고. 근데 신한PWM이 좀 더 체계적이랄까? 분기별 포트폴리오 리뷰도 해주시고, 세무 상담도 연결해주시고." },
        { q: "금융사 VIP 서비스에서 가장 중요하게 보시는 건요?", a: "세금 절약이죠. 양도세, 증여세 상담을 얼마나 잘해주느냐. 그리고 IPO나 사모펀드 같은 기회를 먼저 알려주느냐. 신한이 그 부분에서 좀 더 빨라요." },
        { q: "하나금융으로 자산을 더 이동할 생각이 있으신가요?", a: "하나의 환전 우대나 해외 서비스는 좋아요. 여행 갈 때 편하고. 근데 자산관리 메인을 옮기려면... 신한만큼의 전문성을 보여줘야 해요. 한두 번 만나서 되는 게 아니라 꾸준히 관리해주는 느낌이 필요해요." },
      ],
    },
    {
      id: "h4", name: "최동우", age: "44세 · 남", tag: "자영업자", avatar: "👨‍🔧",
      desc: "사업자 대출 비교, 금리 민감 고객",
      profile: "식당 2곳 운영. 매출 월 4,000만원. 사업자 대출 1.5억. 금리 0.1%에도 민감. 여러 은행 비교 후 선택.",
      chatScript: [
        { q: "현재 사업자 대출은 어느 은행을 이용하고 계세요?", a: "지금은 국민은행이요. 금리가 4.2%인데, 하나는 4.5% 제시해서 안 갔어요. 0.3%면 연간 45만원 차이거든요. 자영업자한테 그 돈 크죠." },
        { q: "하나금융 사업자 서비스에 대해 들어본 적 있으세요?", a: "하나 사업자 통장은 괜찮다고 들었어요. 매출 관리 기능이 있다던데. 근데 대출 금리가 경쟁력이 없으면 굳이 바꿀 이유가 없죠. POS 연동이나 세금 자동계산 같은 부가서비스가 좋으면 모를까." },
      ],
    },
    {
      id: "h5", name: "정하은", age: "23세 · 여", tag: "대학생", avatar: "👩‍🎓",
      desc: "용돈 관리, 소액투자, 혜택 중시",
      profile: "대학교 3학년. 월 용돈 50만원+알바 80만원. 토스·카카오뱅크 사용. 쿠팡·배민 할인 혜택 민감.",
      chatScript: [
        { q: "은행 앱은 주로 어떤 걸 쓰시나요?", a: "토스랑 카카오뱅크요! 토스는 거의 매일 써요. 만보기도 하고, 행운퀴즈도 돌리고. 카카오뱅크는 26일 저금. 시중 은행 앱은 솔직히 안 깔아봤어요." },
        { q: "하나금융이라는 브랜드를 접해본 적 있나요?", a: "음... 하나은행? 엄마가 쓰시는 것 같은데. 저한테는 좀 먼 느낌이에요. 또래 중에 하나은행 쓰는 친구 못 본 것 같아요. 뭔가 이벤트나 혜택으로 접할 기회가 없었어요." },
        { q: "어떤 혜택이 있으면 새 은행 앱을 깔아볼 의향이 있나요?", a: "배민이나 쿠팡 할인이면 바로 깔아요! 아니면 OTT 구독 할인? 넷플릭스 3개월 무료 이런 거면 혹할 것 같아요. 가입만 하면 커피 쿠폰 주는 건 요즘 다 하니까 별로..." },
      ],
    },
    {
      id: "h6", name: "윤재호", age: "61세 · 남", tag: "은퇴 시니어", avatar: "👴",
      desc: "오프라인 지점 선호, 안전 자산 중심",
      profile: "공무원 은퇴. 연금 월 280만원. 우리은행 30년 거래. 정기예금·국채 중심. 모바일뱅킹 불안해함.",
      chatScript: [
        { q: "은행 업무는 주로 어떻게 보시나요?", a: "지점 가서 해요. 아직도 통장 찍는 게 확실하지. 아들이 모바일뱅킹 하라고 하는데, 비밀번호가 헷갈리고... 큰 돈 이체는 무조건 지점에서 해요." },
        { q: "하나은행 지점을 이용하신 경험이 있으세요?", a: "한 번 가봤는데 집 근처 지점이 없어져서 불편했어요. 우리은행은 걸어서 5분이거든. 요즘 은행들이 지점을 자꾸 줄이는데, 우리 같은 사람은 어쩌라고..." },
        { q: "노후 자산관리에서 가장 중요하게 생각하시는 건요?", a: "안전이죠. 원금 보장. 주식이니 펀드니 그런 건 불안해요. 정기예금 금리가 0.1%라도 높은 데로 가요. 그리고 직원이 친절하게 설명해주는 게 중요해요. 기계한테 물어보기 싫어." },
      ],
    },
  ],
  coway: [
    {
      id: "c1", name: "한소희", age: "30세 · 여", tag: "신혼부부", avatar: "👩",
      desc: "인테리어 관심 높음, 디자인 중시",
      profile: "결혼 1년차. 신혼집 30평 아파트. 인스타그램으로 인테리어 참고. 주방가전 디자인을 매우 중시.",
      chatScript: [
        { q: "정수기 선택 시 가장 중요하게 보시는 기준이 뭔가요?", a: "디자인이요! 우리 집 주방이 화이트 톤인데, 정수기가 튀면 안 되잖아요. 코웨이 아이콘은 깔끔해서 좋긴 한데, LG 오브제가 색상 선택이 더 다양하더라고요." },
        { q: "코웨이 정수기를 사용해보신 적 있으세요?", a: "친정에서 코웨이 썼어요. AS가 확실히 좋았어요. 코디분이 정기적으로 오셔서 필터도 갈아주시고. 근데 렌탈료가 LG보다 살짝 비싼 게 걸려요. 월 3천원 차이가 1년이면 3만 6천원이잖아요." },
        { q: "정수기 외에 다른 생활가전도 렌탈 중이신가요?", a: "비데는 코웨이꺼 쓰고 있어요. 공기청정기는 LG 쓰고요. 솔직히 한 회사로 통일하면 관리가 편한데... 각각 장단점이 있어서 고민이에요." },
        { q: "신혼집 정수기를 고를 때 남편분과 의견 차이가 있나요?", a: "남편은 무조건 가성비요. 저는 디자인. 그래서 중간점이 필요한데, 코웨이가 디자인도 괜찮고 성능도 좋으니까 남편을 설득할 수 있을 것 같긴 해요. 렌탈료만 조금 낮추면..." },
      ],
    },
    {
      id: "c2", name: "김태영", age: "36세 · 남", tag: "영유아 아빠", avatar: "👨‍👧",
      desc: "아이 건강 최우선, AS 품질 중시",
      profile: "3살 딸 아빠. 아이 분유·이유식에 정수기 물 사용. 위생과 필터 성능에 매우 민감.",
      chatScript: [
        { q: "아이가 있는 가정에서 정수기 선택 기준이 다른가요?", a: "완전히 다르죠. 아이 낳기 전엔 그냥 아무거나 썼는데, 지금은 필터 성능부터 봐요. 중금속 제거율, 세균 차단... 코웨이가 나노트랩 필터라고 하던데 그게 좀 안심이 돼요." },
        { q: "현재 어떤 정수기를 사용 중이세요?", a: "코웨이 아이콘 직수형이요. 딸 분유 탈 때 온수 바로 나오니까 진짜 편해요. 밤에 3시에 일어나서 분유 타는데 끓일 필요 없으니까... 이것만으로도 코웨이 선택한 보람이 있어요." },
        { q: "AS 경험은 어떠셨나요?", a: "코웨이 코디분이 2개월마다 오시는데 진짜 꼼꼼해요. 필터 교체하면서 내부도 살균해주시고. 한번은 온수가 잘 안 나와서 전화했는데 다음날 바로 오셨어요. 이런 게 아이 있는 집에선 중요해요." },
      ],
    },
    {
      id: "c3", name: "이수진", age: "27세 · 여", tag: "1인가구", avatar: "👩‍💻",
      desc: "소형 정수기, 가성비 중시",
      profile: "회사원 2년차. 원룸 거주. 공간 작아서 소형 필수. 월 렌탈료 2만원대 희망.",
      chatScript: [
        { q: "1인 가구에서 정수기가 꼭 필요하다고 느끼시나요?", a: "처음엔 생수 사먹었는데 매달 2만원 넘게 들더라고요. 그리고 무거워서 배달시키면 또 번거롭고. 소형 정수기 렌탈이 월 2만원대면 그게 나은 것 같아서 알아보고 있어요." },
        { q: "코웨이 소형 정수기에 대해 어떻게 생각하세요?", a: "코웨이 나노직수는 이쁘긴 한데 월 3만 3천원? 좀 부담이에요. SK매직이나 청호에 2만원대 제품도 있거든요. 성능 차이가 크면 모르겠는데, 1인가구 입장에서 월 1만원 차이가 커요." },
        { q: "정수기 외에 관심있는 생활가전이 있나요?", a: "공기청정기요! 원룸이라 환기가 잘 안 돼서. 정수기+공기청정기 번들로 할인해주면 좋겠는데... 코웨이가 그런 패키지 있나요? 있으면 고려해볼 것 같아요." },
      ],
    },
    {
      id: "c4", name: "박성훈", age: "45세 · 남", tag: "가전 매니아", avatar: "🧑‍💼",
      desc: "스마트홈 연동, LG ThinQ 사용 중",
      profile: "IT기업 부장. LG 가전 다수 보유. ThinQ로 통합 관리 중. IoT 연동 중시.",
      chatScript: [
        { q: "현재 가정의 가전 생태계가 어떻게 구성되어 있나요?", a: "거의 LG로 통일했어요. TV, 냉장고, 세탁기, 에어컨 전부 LG. ThinQ 앱 하나로 다 제어하니까 편하죠. 정수기도 LG 퓨리케어 쓰고 있어요." },
        { q: "코웨이로 전환을 고려해본 적 있으세요?", a: "코웨이 필터 성능이 좋다는 건 아는데, ThinQ 연동이 안 되잖아요. 제 입장에서는 성능이 10% 좋은 것보다 생태계 통합이 더 중요해요. 코웨이가 자체 IoT를 잘 만들든지, LG 연동을 하든지 해야..." },
        { q: "만약 코웨이가 스마트홈 연동을 강화한다면요?", a: "Matter 프로토콜 지원하면 고려해볼 수 있어요. 필터 교체 알림이 앱으로 오고, 사용량 통계도 보여주고... 그런 스마트 기능이 제대로 되면 AS 좋은 코웨이가 매력적이긴 하죠." },
      ],
    },
    {
      id: "c5", name: "정미래", age: "33세 · 여", tag: "건강 관심", avatar: "🧘‍♀️",
      desc: "미네랄 필터, 수소수 기능 관심",
      profile: "필라테스 강사. 하루 물 2L 이상 섭취. 수질에 매우 관심. 미네랄 워터 선호.",
      chatScript: [
        { q: "물 마시는 습관이 어떻게 되시나요?", a: "하루에 2리터 이상은 꼭 마셔요. 직업 특성상 운동 많이 하니까. 예전엔 에비앙 같은 미네랄워터 사먹었는데, 비용이 장난 아니에요. 월 7-8만원씩 나가더라고요." },
        { q: "정수기 물과 생수의 차이를 느끼시나요?", a: "네, 확실히 달라요. 역삼투압(RO) 정수기는 물맛이 밋밋해요. 미네랄이 다 빠지니까. 코웨이 나노트랩은 미네랄은 살린다고 하던데, 실제로 마셔보면 생수보다는 좀 다르긴 해요." },
        { q: "수소수 기능이 있는 정수기에 관심 있으시다고요?", a: "관심은 있는데 효과가 진짜인지 좀 의심스러워요. 마케팅 아닌가 싶기도 하고. 과학적 근거가 확실하면 프리미엄 내더라도 쓸 의향 있어요. 코웨이가 그런 데이터를 보여주면 설득력 있을 것 같아요." },
      ],
    },
    {
      id: "c6", name: "오현석", age: "58세 · 남", tag: "전원주택", avatar: "👨‍🌾",
      desc: "대용량 필요, 관리 편의성 중시",
      profile: "경기도 양평 전원주택 거주. 가족 4인+주말 손님 빈번. 대용량·내구성 중시.",
      chatScript: [
        { q: "전원주택에서 정수기 사용 시 특별한 요구사항이 있나요?", a: "수도물이 도시보다 안 좋아요. 지하수 섞여 나올 때도 있고. 그래서 정수 성능이 가장 중요해요. 그리고 주말에 손님 오면 물 사용량이 확 늘거든요. 대용량이 필수예요." },
        { q: "현재 어떤 정수기를 사용하고 계세요?", a: "코웨이 대용량 모델 쓰고 있어요. 3년 됐는데 아직 괜찮아요. 근데 코디분이 여기까지 오시느라 좀 미안하긴 해요. 양평이 서울에서 멀잖아요. 그래도 빠짐없이 오시더라고요." },
        { q: "정수기 교체 시기가 다가오면 어떤 걸 고려하세요?", a: "내구성이요. 3년 쓰다 고장나면 짜증나죠. 그리고 시골이니까 AS가 빨리 와야 해요. 코웨이가 전국 네트워크가 좋다고 해서 선택한 건데, 실제로 경험이 좋았어요. 다음에도 코웨이 할 것 같아요." },
      ],
    },
  ],
};

// ── Brand Data ──
const brandData = {
  hana: {
    name: "하나금융그룹", type: "브랜딩 분석", icon: "🏦", color: "#009775", colorLight: "#00C49A",
    kpi: [
      { label: "브랜드 인지도", value: "68.2%", change: "+3.1%", up: true },
      { label: "NPS 점수", value: "42점", change: "+5점", up: true },
      { label: "경쟁사 이탈률", value: "12.4%", change: "-2.1%", up: true },
      { label: "광고 상기도", value: "54.7%", change: "+8.3%", up: true },
    ],
    awarenessData: [
      { month: "10월", 하나: 62, KB: 71, 신한: 68, 우리: 55 },
      { month: "11월", 하나: 63, KB: 70, 신한: 69, 우리: 56 },
      { month: "12월", 하나: 64, KB: 72, 신한: 67, 우리: 54 },
      { month: "1월", 하나: 65, KB: 71, 신한: 68, 우리: 57 },
      { month: "2월", 하나: 67, KB: 70, 신한: 69, 우리: 56 },
      { month: "3월", 하나: 68, KB: 71, 신한: 68, 우리: 55 },
    ],
    npsData: [
      { name: "하나금융", value: 42, fill: "#009775" },
      { name: "KB금융", value: 48, fill: "#FFBB28" },
      { name: "신한금융", value: 45, fill: "#0088FE" },
      { name: "우리금융", value: 35, fill: "#FF8042" },
    ],
    radarData: [
      { subject: "신뢰도", 하나: 72, 경쟁평균: 68 },
      { subject: "혁신성", 하나: 78, 경쟁평균: 65 },
      { subject: "편의성", 하나: 65, 경쟁평균: 70 },
      { subject: "고객응대", 하나: 70, 경쟁평균: 72 },
      { subject: "디지털", 하나: 82, 경쟁평균: 67 },
      { subject: "상품경쟁력", 하나: 68, 경쟁평균: 71 },
    ],
    segmentData: [
      { name: "MZ세대", value: 35 }, { name: "3040 직장인", value: 28 },
      { name: "5060 자산가", value: 22 }, { name: "시니어", value: 15 },
    ],
    chatMessages: [
      { role: "user", text: "하나금융그룹의 MZ세대 브랜드 인지도를 경쟁사와 비교 분석해줘." },
      { role: "ai", text: "하나금융의 MZ세대(20-35세) 브랜드 인지도를 분석했습니다.\n\n📊 MZ세대 인지도: 하나 58.3% vs KB 65.1% vs 신한 62.7%\n\n하나금융은 '디지털 혁신' 이미지에서 78점으로 1위이나, '일상 밀착도'에서 KB(72점) 대비 낮은 61점을 기록했습니다.\n\n💡 제안: MZ 일상금융 접점 강화 시 인지도 5~8%p 개선 가능합니다." },
    ],
  },
  coway: {
    name: "코웨이 정수기", type: "제품 분석", icon: "💧", color: "#2563EB", colorLight: "#60A5FA",
    kpi: [
      { label: "제품 만족도", value: "4.3/5", change: "+0.2", up: true },
      { label: "재구매 의향", value: "72.8%", change: "+4.5%", up: true },
      { label: "경쟁사 전환율", value: "8.7%", change: "-1.3%", up: true },
      { label: "추천 의향(NPS)", value: "51점", change: "+7점", up: true },
    ],
    awarenessData: [
      { month: "10월", 코웨이: 45, LG: 38, SK매직: 28, 청호: 15 },
      { month: "11월", 코웨이: 46, LG: 39, SK매직: 30, 청호: 14 },
      { month: "12월", 코웨이: 48, LG: 40, SK매직: 29, 청호: 16 },
      { month: "1월", 코웨이: 47, LG: 41, SK매직: 31, 청호: 15 },
      { month: "2월", 코웨이: 49, LG: 40, SK매직: 30, 청호: 14 },
      { month: "3월", 코웨이: 51, LG: 42, SK매직: 32, 청호: 15 },
    ],
    npsData: [
      { name: "코웨이", value: 51, fill: "#2563EB" },
      { name: "LG퓨리케어", value: 44, fill: "#10B981" },
      { name: "SK매직", value: 38, fill: "#F59E0B" },
      { name: "청호나이스", value: 29, fill: "#EF4444" },
    ],
    radarData: [
      { subject: "정수 성능", 코웨이: 85, 경쟁평균: 72 },
      { subject: "디자인", 코웨이: 80, 경쟁평균: 74 },
      { subject: "AS품질", 코웨이: 88, 경쟁평균: 68 },
      { subject: "가격경쟁력", 코웨이: 62, 경쟁평균: 70 },
      { subject: "필터교체", 코웨이: 82, 경쟁평균: 65 },
      { subject: "설치편의", 코웨이: 75, 경쟁평균: 71 },
    ],
    segmentData: [
      { name: "신혼부부", value: 32 }, { name: "영유아 가정", value: 27 },
      { name: "1인가구", value: 23 }, { name: "시니어", value: 18 },
    ],
    chatMessages: [
      { role: "user", text: "코웨이 아이콘2 정수기 신제품 컨셉에 대해 소비자 반응 조사해줘." },
      { role: "ai", text: "AI 페르소나 인터뷰 결과 (N=856명):\n\n✅ 긍정 반응 (67.3%):\n• \"디자인이 세련됨\" (43.2%)\n• \"직수형이라 위생적\" (38.5%)\n\n⚠️ 우려 사항 (32.7%):\n• \"월 렌탈료가 LG보다 높아 보임\" (52.1%)\n\n💡 제안: 렌탈료 비교표 + 기존 모델 대비 개선점 커뮤니케이션으로 전환율 15~20% 개선 예상." },
    ],
  },
};

const PIE_COLORS = ["#0891B2", "#E85D3A", "#FFBB28", "#8B5CF6"];

// ── Sub Components ──
function KPICard({ label, value, change, up }) {
  return (
    <div style={{ background: COLORS.white, borderRadius: 12, padding: "16px 18px", boxShadow: "0 1px 3px rgba(0,0,0,0.06)", border: `1px solid ${COLORS.gray200}`, minWidth: 0, flex: 1 }}>
      <div style={{ fontSize: 11, color: COLORS.gray500, marginBottom: 4, fontWeight: 500 }}>{label}</div>
      <div style={{ fontSize: 22, fontWeight: 700, color: COLORS.navy }}>{value}</div>
      <div style={{ fontSize: 11, color: up ? "#10B981" : "#EF4444", fontWeight: 600, marginTop: 2 }}>{up ? "▲" : "▼"} {change}</div>
    </div>
  );
}

function ChatBubble({ role, text, name, avatar }) {
  const isUser = role === "user";
  const isPersona = role === "persona";
  return (
    <div style={{ display: "flex", justifyContent: isUser ? "flex-end" : "flex-start", marginBottom: 14 }}>
      {!isUser && (
        <div style={{
          width: 32, height: 32, borderRadius: 8,
          background: isPersona ? COLORS.gray200 : `linear-gradient(135deg, ${COLORS.navy}, ${COLORS.teal})`,
          display: "flex", alignItems: "center", justifyContent: "center",
          color: isPersona ? undefined : COLORS.white, fontSize: isPersona ? 16 : 14, fontWeight: 700,
          marginRight: 8, flexShrink: 0, marginTop: 2,
        }}>{isPersona ? avatar : "AI"}</div>
      )}
      <div>
        {!isUser && name && <div style={{ fontSize: 10, color: COLORS.gray500, marginBottom: 3, fontWeight: 600 }}>{name}</div>}
        <div style={{
          maxWidth: 300, padding: "12px 16px", borderRadius: isUser ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
          background: isUser ? COLORS.navy : isPersona ? "#FFF7ED" : COLORS.gray100,
          color: isUser ? COLORS.white : COLORS.gray900,
          fontSize: 13, lineHeight: 1.65, whiteSpace: "pre-wrap",
          boxShadow: isUser ? "none" : "0 1px 2px rgba(0,0,0,0.05)",
          border: isUser ? "none" : isPersona ? "1px solid #FED7AA" : `1px solid ${COLORS.gray200}`,
        }}>{text}</div>
      </div>
    </div>
  );
}

// ── Persona Interview Modal ──
function PersonaInterviewPanel({ persona, brandColor, onClose, onOpenPanel }) {
  const [messages, setMessages] = useState([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [finished, setFinished] = useState(false);
  const chatEndRef = useRef(null);
  const hasStarted = useRef(false);

  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const askNext = () => {
    if (currentQ >= persona.chatScript.length) { setFinished(true); return; }
    const script = persona.chatScript[currentQ];
    // show interviewer question
    setMessages(prev => [...prev, { role: "user", text: script.q }]);
    setIsTyping(true);
    // simulate persona typing
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, { role: "persona", text: script.a, name: persona.name, avatar: persona.avatar }]);
      setCurrentQ(prev => prev + 1);
    }, 1200 + Math.random() * 800);
  };

  const startInterview = () => {
    setMessages([{ role: "system", text: `${persona.name}님과의 인터뷰가 시작됩니다.\n\n📋 프로필: ${persona.profile}` }]);
    setTimeout(() => askNext(), 600);
  };

  useEffect(() => {
    if (hasStarted.current) return;
    hasStarted.current = true;
    startInterview();
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Header */}
      <div style={{ padding: "14px 18px", borderBottom: `1px solid ${COLORS.gray200}`, display: "flex", alignItems: "center", gap: 10 }}>
        <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 18, color: COLORS.gray500, padding: 0 }}>←</button>
        <div style={{
          width: 36, height: 36, borderRadius: 10,
          background: `linear-gradient(135deg, ${brandColor}22, ${brandColor}44)`,
          display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18,
        }}>{persona.avatar}</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: COLORS.navy }}>{persona.name} <span style={{ fontWeight: 400, color: COLORS.gray500 }}>· {persona.age}</span></div>
          <div style={{ fontSize: 10, color: brandColor, fontWeight: 600 }}>{persona.tag} · AI 페르소나 인터뷰</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#10B981" }} />
          <span style={{ fontSize: 10, color: "#10B981", fontWeight: 600 }}>LIVE</span>
        </div>
      </div>

      {/* Chat Area */}
      <div style={{ flex: 1, overflow: "auto", padding: 16 }}>
        {messages.map((msg, i) =>
          msg.role === "system" ? (
            <div key={i} style={{
              background: `linear-gradient(135deg, ${brandColor}08, ${COLORS.teal}08)`,
              borderRadius: 12, padding: 14, marginBottom: 16, border: `1px solid ${brandColor}20`,
              fontSize: 12, color: COLORS.gray700, lineHeight: 1.7, whiteSpace: "pre-wrap",
            }}>{msg.text}</div>
          ) : (
            <ChatBubble key={i} {...msg} />
          )
        )}
        {isTyping && (
          <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 0" }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: COLORS.gray200, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>{persona.avatar}</div>
            <div style={{ display: "flex", gap: 4 }}>
              {[0, 1, 2].map(i => (
                <div key={i} style={{ width: 7, height: 7, borderRadius: "50%", background: COLORS.gray300, animation: `pulse 1.2s ease-in-out ${i * 0.2}s infinite` }} />
              ))}
            </div>
            <span style={{ fontSize: 10, color: COLORS.gray500 }}>{persona.name}님이 답변 중...</span>
          </div>
        )}
        {finished && (
          <div style={{
            background: `linear-gradient(135deg, ${COLORS.navy}08, ${brandColor}08)`,
            borderRadius: 12, padding: 16, marginTop: 8, border: `1px solid ${brandColor}20`, textAlign: "center",
          }}>
            <div style={{ fontSize: 20, marginBottom: 8 }}>✅</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: COLORS.navy, marginBottom: 4 }}>인터뷰 완료</div>
            <div style={{ fontSize: 11, color: COLORS.gray500, lineHeight: 1.6 }}>
              {persona.name}님과의 {persona.chatScript.length}개 질문 인터뷰가 완료되었습니다.<br/>
              분석 리포트가 자동 생성됩니다.
            </div>
            <div style={{ display: "flex", gap: 6, marginTop: 12, justifyContent: "center" }}>
              <button onClick={() => onOpenPanel?.("survey")} style={{ padding: "6px 14px", borderRadius: 8, border: `1px solid ${brandColor}30`, background: `${brandColor}08`, color: brandColor, fontSize: 11, fontWeight: 600, cursor: "pointer" }}>📋 설문으로 검증</button>
              <button onClick={() => onOpenPanel?.("fgd")} style={{ padding: "6px 14px", borderRadius: 8, border: `1px solid ${brandColor}30`, background: `${brandColor}08`, color: brandColor, fontSize: 11, fontWeight: 600, cursor: "pointer" }}>👥 좌담회 매칭</button>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
        <style>{`@keyframes pulse { 0%, 100% { opacity: 0.3; } 50% { opacity: 1; } }`}</style>
      </div>

      {/* Action Bar */}
      <div style={{ padding: "12px 16px", borderTop: `1px solid ${COLORS.gray200}`, display: "flex", gap: 8 }}>
        {!finished && !isTyping && currentQ > 0 && currentQ < persona.chatScript.length && (
          <button onClick={askNext} style={{
            flex: 1, padding: "10px 0", borderRadius: 10, border: "none",
            background: COLORS.navy, color: COLORS.white, fontSize: 12, fontWeight: 700, cursor: "pointer",
          }}>다음 질문 →</button>
        )}
        {finished && (
          <button onClick={onClose} style={{
            flex: 1, padding: "10px 0", borderRadius: 10, border: "none",
            background: COLORS.navy, color: COLORS.white, fontSize: 12, fontWeight: 700, cursor: "pointer",
          }}>인터뷰 목록으로 돌아가기</button>
        )}
        {!finished && !isTyping && currentQ === 0 && (
          <div style={{ flex: 1, textAlign: "center", fontSize: 11, color: COLORS.gray500, padding: 10 }}>
            인터뷰가 자동으로 시작됩니다...
          </div>
        )}
        {isTyping && (
          <div style={{ flex: 1, textAlign: "center", fontSize: 11, color: COLORS.gray500, padding: 10 }}>
            {persona.name}님의 응답을 기다리는 중...
          </div>
        )}
      </div>
    </div>
  );
}

// ── Main App ──
export default function AIDataMeetingRoom({ onHome }) {
  const [activeBrand, setActiveBrand] = useState("hana");
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState(brandData.hana.chatMessages);
  const [activeTab, setActiveTab] = useState("overview");
  const [isTyping, setIsTyping] = useState(false);
  const [selectedPersona, setSelectedPersona] = useState(null);
  const [activePanel, setActivePanel] = useState(null); // "survey" | "fgd" | null
  const chatEndRef = useRef(null);

  const brand = brandData[activeBrand];
  const brandKey = activeBrand === "hana" ? "하나" : "코웨이";
  const personas = personaData[activeBrand];

  useEffect(() => {
    setMessages(brandData[activeBrand].chatMessages);
    setActiveTab("overview");
    setSelectedPersona(null);
  }, [activeBrand]);

  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const handleSend = () => {
    if (!chatInput.trim()) return;
    setMessages(prev => [...prev, { role: "user", text: chatInput }]);
    setChatInput("");
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, {
        role: "ai",
        text: `"${chatInput}" 분석을 시작합니다.\n\n📊 틸리언 Pro 패널 AI 페르소나 대상 실시간 조사를 진행하고 있습니다.\n\n(데모 응답입니다)`,
      }]);
    }, 1500);
  };

  const tabs = [
    { id: "overview", label: "종합 대시보드" },
    { id: "competitor", label: "경쟁사 비교" },
    { id: "persona", label: "AI 페르소나" },
  ];

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif", background: COLORS.bg, overflow: "hidden" }}>

      {/* ── Left Sidebar ── */}
      <div style={{ width: 240, background: COLORS.navy, display: "flex", flexDirection: "column", color: COLORS.white, flexShrink: 0 }}>
        <div style={{ padding: "20px 20px 16px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div onClick={onHome} style={{ width: 36, height: 36, borderRadius: 10, background: `linear-gradient(135deg, ${COLORS.orange}, ${COLORS.orangeLight})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 800, cursor: onHome ? "pointer" : "default" }}>D</div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, letterSpacing: -0.5 }}>데이터 인텔리전스 플랫폼</div>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.5)", marginTop: 1 }}>by Tillion Pro</div>
            </div>
          </div>
          {onHome && <div onClick={onHome} style={{ marginTop: 10, fontSize: 11, color: "rgba(255,255,255,0.4)", cursor: "pointer" }}>← 홈으로</div>}
        </div>
        <div style={{ padding: "16px 14px 8px" }}>
          <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", fontWeight: 600, letterSpacing: 1, marginBottom: 10, textTransform: "uppercase" }}>프로젝트</div>
          {Object.entries(brandData).map(([key, b]) => (
            <button key={key} onClick={() => setActiveBrand(key)} style={{
              width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 10, border: "none", cursor: "pointer",
              background: activeBrand === key ? "rgba(255,255,255,0.12)" : "transparent", color: COLORS.white, marginBottom: 4, textAlign: "left",
            }}>
              <span style={{ fontSize: 18 }}>{b.icon}</span>
              <div>
                <div style={{ fontSize: 13, fontWeight: activeBrand === key ? 600 : 400 }}>{b.name}</div>
                <div style={{ fontSize: 10, color: "rgba(255,255,255,0.45)" }}>{b.type}</div>
              </div>
            </button>
          ))}
        </div>
        <div style={{ padding: "12px 14px", borderTop: "1px solid rgba(255,255,255,0.06)", marginTop: 4 }}>
          <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", fontWeight: 600, letterSpacing: 1, marginBottom: 10, textTransform: "uppercase" }}>기능</div>
          {[
            { icon: "📊", label: "데이터 분석", desc: "경쟁사 고객 데이터", panel: null },
            { icon: "🎙️", label: "AI 인터뷰", desc: "페르소나 온디맨드", panel: null },
            { icon: "🔮", label: "소비 예측", desc: "Forecasting", panel: null },
            { icon: "📋", label: "실시간 설문", desc: "설문 즉시 배포·연동", panel: "survey" },
            { icon: "👥", label: "좌담회 매칭", desc: "실제 패널 FGD 연결", panel: "fgd" },
          ].map((item, i) => (
            <div key={i} onClick={() => item.panel && setActivePanel(item.panel)} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 12px", borderRadius: 8, marginBottom: 2, fontSize: 13, color: activePanel === item.panel ? COLORS.white : "rgba(255,255,255,0.7)", background: activePanel === item.panel ? "rgba(255,255,255,0.1)" : "transparent", cursor: item.panel ? "pointer" : "default", transition: "all 0.15s" }}>
              <span style={{ fontSize: 15 }}>{item.icon}</span>
              <div>
                <div style={{ fontWeight: 500 }}>{item.label}</div>
                <div style={{ fontSize: 10, color: "rgba(255,255,255,0.35)" }}>{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: "auto", padding: "16px 14px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 0" }}>
            <div style={{ width: 30, height: 30, borderRadius: 8, background: COLORS.orange, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700 }}>박</div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 500 }}>박현우 팀장</div>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)" }}>브랜딩그룹</div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <div style={{ padding: "14px 24px", background: COLORS.white, borderBottom: `1px solid ${COLORS.gray200}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 22 }}>{brand.icon}</span>
            <div>
              <div style={{ fontSize: 17, fontWeight: 700, color: COLORS.navy }}>{brand.name}</div>
              <div style={{ fontSize: 11, color: COLORS.gray500 }}>{brand.type} · 최근 업데이트 2026.03.24</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 4 }}>
            {tabs.map(t => (
              <button key={t.id} onClick={() => { setActiveTab(t.id); setSelectedPersona(null); }} style={{
                padding: "6px 14px", borderRadius: 8, border: "none", cursor: "pointer",
                background: activeTab === t.id ? COLORS.navy : "transparent",
                color: activeTab === t.id ? COLORS.white : COLORS.gray500, fontSize: 12, fontWeight: 500,
              }}>{t.label}</button>
            ))}
          </div>
        </div>

        <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
          {/* Dashboard Area */}
          <div style={{ flex: 1, overflow: "auto", padding: 20 }}>
            {/* KPIs */}
            <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
              {brand.kpi.map((k, i) => <KPICard key={i} {...k} />)}
            </div>

            {activeTab === "overview" && (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div style={{ background: COLORS.white, borderRadius: 14, padding: 20, boxShadow: "0 1px 3px rgba(0,0,0,0.06)", border: `1px solid ${COLORS.gray200}` }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: COLORS.navy, marginBottom: 4 }}>{activeBrand === "hana" ? "브랜드 인지도 추이" : "시장점유율 추이"}</div>
                  <div style={{ fontSize: 10, color: COLORS.gray500, marginBottom: 14 }}>최근 6개월 · 경쟁사 비교</div>
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={brand.awarenessData}>
                      <CartesianGrid strokeDasharray="3 3" stroke={COLORS.gray200} />
                      <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                      <YAxis tick={{ fontSize: 10 }} />
                      <Tooltip contentStyle={{ fontSize: 11 }} />
                      {Object.keys(brand.awarenessData[0]).filter(k => k !== "month").map((key, i) => (
                        <Line key={key} type="monotone" dataKey={key} stroke={i === 0 ? brand.color : ["#94A3B8", "#CBD5E1", "#E2E8F0"][i - 1]} strokeWidth={i === 0 ? 3 : 1.5} dot={i === 0} />
                      ))}
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div style={{ background: COLORS.white, borderRadius: 14, padding: 20, boxShadow: "0 1px 3px rgba(0,0,0,0.06)", border: `1px solid ${COLORS.gray200}` }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: COLORS.navy, marginBottom: 4 }}>NPS 경쟁사 비교</div>
                  <div style={{ fontSize: 10, color: COLORS.gray500, marginBottom: 14 }}>추천 의향 점수 비교</div>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={brand.npsData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" stroke={COLORS.gray200} />
                      <XAxis type="number" tick={{ fontSize: 10 }} domain={[0, 60]} />
                      <YAxis type="category" dataKey="name" tick={{ fontSize: 10 }} width={70} />
                      <Tooltip contentStyle={{ fontSize: 11 }} />
                      <Bar dataKey="value" radius={[0, 6, 6, 0]} barSize={20}>
                        {brand.npsData.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div style={{ background: COLORS.white, borderRadius: 14, padding: 20, boxShadow: "0 1px 3px rgba(0,0,0,0.06)", border: `1px solid ${COLORS.gray200}` }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: COLORS.navy, marginBottom: 4 }}>{activeBrand === "hana" ? "브랜드 이미지 레이더" : "제품 경쟁력 레이더"}</div>
                  <div style={{ fontSize: 10, color: COLORS.gray500, marginBottom: 10 }}>자사 vs 경쟁 평균</div>
                  <ResponsiveContainer width="100%" height={210}>
                    <RadarChart data={brand.radarData}>
                      <PolarGrid stroke={COLORS.gray200} />
                      <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10 }} />
                      <PolarRadiusAxis tick={{ fontSize: 9 }} domain={[0, 100]} />
                      <Radar name={brandKey} dataKey={brandKey} stroke={brand.color} fill={brand.color} fillOpacity={0.25} strokeWidth={2} />
                      <Radar name="경쟁평균" dataKey="경쟁평균" stroke={COLORS.gray300} fill={COLORS.gray300} fillOpacity={0.1} strokeWidth={1.5} />
                      <Tooltip contentStyle={{ fontSize: 11 }} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
                <div style={{ background: COLORS.white, borderRadius: 14, padding: 20, boxShadow: "0 1px 3px rgba(0,0,0,0.06)", border: `1px solid ${COLORS.gray200}` }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: COLORS.navy, marginBottom: 4 }}>핵심 타겟 세그먼트</div>
                  <div style={{ fontSize: 10, color: COLORS.gray500, marginBottom: 10 }}>AI 페르소나 기반 고객군 분석</div>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <ResponsiveContainer width="55%" height={190}>
                      <PieChart>
                        <Pie data={brand.segmentData} dataKey="value" cx="50%" cy="50%" outerRadius={75} innerRadius={40}>
                          {brand.segmentData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i]} />)}
                        </Pie>
                        <Tooltip contentStyle={{ fontSize: 11 }} />
                      </PieChart>
                    </ResponsiveContainer>
                    <div style={{ flex: 1 }}>
                      {brand.segmentData.map((s, i) => (
                        <div key={i} style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
                          <div style={{ width: 10, height: 10, borderRadius: 3, background: PIE_COLORS[i], flexShrink: 0 }} />
                          <div style={{ fontSize: 11, color: COLORS.gray700 }}>{s.name}</div>
                          <div style={{ fontSize: 11, fontWeight: 700, color: COLORS.navy, marginLeft: "auto" }}>{s.value}%</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "competitor" && (
              <div style={{ background: COLORS.white, borderRadius: 14, padding: 24, boxShadow: "0 1px 3px rgba(0,0,0,0.06)", border: `1px solid ${COLORS.gray200}` }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: COLORS.navy, marginBottom: 16 }}>경쟁사 심층 비교 분석</div>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
                  <thead>
                    <tr style={{ borderBottom: `2px solid ${COLORS.navy}` }}>
                      {(activeBrand === "hana"
                        ? ["항목", "하나금융", "KB금융", "신한금융", "우리금융"]
                        : ["항목", "코웨이", "LG퓨리케어", "SK매직", "청호나이스"]
                      ).map((h, i) => (
                        <th key={i} style={{ padding: "10px 12px", textAlign: i === 0 ? "left" : "center", fontWeight: 700, color: COLORS.navy }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {(activeBrand === "hana" ? [
                      ["브랜드 인지도", "68.2%", "71.0%", "68.5%", "55.3%"],
                      ["NPS", "42", "48", "45", "35"],
                      ["디지털 만족도", "82점", "75점", "78점", "68점"],
                      ["고객 충성도", "74.1%", "78.3%", "76.5%", "69.2%"],
                      ["MZ세대 선호도", "58.3%", "65.1%", "62.7%", "44.8%"],
                    ] : [
                      ["시장 점유율", "51.2%", "42.1%", "32.4%", "15.3%"],
                      ["NPS", "51", "44", "38", "29"],
                      ["AS 만족도", "88점", "72점", "68점", "65점"],
                      ["재구매 의향", "72.8%", "65.4%", "58.1%", "48.7%"],
                      ["월 렌탈료(직수)", "38,900원", "35,900원", "33,900원", "29,900원"],
                    ]).map((row, i) => (
                      <tr key={i} style={{ borderBottom: `1px solid ${COLORS.gray200}`, background: i % 2 === 0 ? COLORS.gray100 : COLORS.white }}>
                        {row.map((cell, j) => (
                          <td key={j} style={{ padding: "10px 12px", textAlign: j === 0 ? "left" : "center", fontWeight: j === 1 ? 700 : 400, color: j === 1 ? brand.color : COLORS.gray700 }}>{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === "persona" && (
              <div>
                {/* Persona header */}
                <div style={{ marginBottom: 16, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: COLORS.navy }}>AI 페르소나 패널</div>
                    <div style={{ fontSize: 11, color: COLORS.gray500, marginTop: 2 }}>틸리언 Pro 20가지+ 프로파일링 기반 · 온디맨드 인터뷰 가능</div>
                  </div>
                  <div style={{ padding: "6px 12px", borderRadius: 8, background: `${brand.color}10`, color: brand.color, fontSize: 11, fontWeight: 600 }}>
                    {personas.length}명 활성화
                  </div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14 }}>
                  {personas.map((p) => (
                    <div key={p.id} style={{
                      background: COLORS.white, borderRadius: 14, padding: 18,
                      boxShadow: "0 1px 3px rgba(0,0,0,0.06)", border: `1px solid ${COLORS.gray200}`,
                      transition: "all 0.2s", cursor: "pointer",
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = brand.color; e.currentTarget.style.boxShadow = `0 4px 12px ${brand.color}20`; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = COLORS.gray200; e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.06)"; }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                        <div style={{
                          width: 44, height: 44, borderRadius: 12,
                          background: `linear-gradient(135deg, ${brand.color}22, ${brand.color}44)`,
                          display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22,
                        }}>{p.avatar}</div>
                        <div>
                          <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.navy }}>{p.name}</div>
                          <div style={{ fontSize: 10, color: COLORS.gray500 }}>{p.age}</div>
                        </div>
                      </div>
                      <div style={{
                        display: "inline-block", padding: "3px 8px", borderRadius: 6,
                        background: `${brand.color}15`, color: brand.color, fontSize: 10, fontWeight: 600, marginBottom: 8,
                      }}>{p.tag}</div>
                      <div style={{ fontSize: 11, color: COLORS.gray500, lineHeight: 1.5, marginBottom: 6 }}>{p.desc}</div>
                      <div style={{ fontSize: 10, color: COLORS.gray300, marginBottom: 10 }}>질문 {p.chatScript.length}개 준비됨</div>
                      <button
                        onClick={() => setSelectedPersona(p)}
                        style={{
                          width: "100%", padding: "9px 0", borderRadius: 10,
                          border: "none", background: COLORS.navy, color: COLORS.white,
                          fontSize: 12, fontWeight: 600, cursor: "pointer", transition: "all 0.15s",
                          display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                        }}
                      >
                        🎙️ 인터뷰 시작
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ── Chat Panel / Persona Interview ── */}
          <div style={{ width: 380, borderLeft: `1px solid ${COLORS.gray200}`, background: COLORS.white, display: "flex", flexDirection: "column", flexShrink: 0 }}>
            {selectedPersona ? (
              <PersonaInterviewPanel
                key={selectedPersona.id}
                persona={selectedPersona}
                brandColor={brand.color}
                onClose={() => setSelectedPersona(null)}
                onOpenPanel={setActivePanel}
              />
            ) : (
              <>
                <div style={{ padding: "14px 18px", borderBottom: `1px solid ${COLORS.gray200}`, display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 32, height: 32, borderRadius: 10, background: `linear-gradient(135deg, ${COLORS.navy}, ${COLORS.teal})`, display: "flex", alignItems: "center", justifyContent: "center", color: COLORS.white, fontSize: 12, fontWeight: 800 }}>AI</div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: COLORS.navy }}>AI 데이터 어시스턴트</div>
                    <div style={{ fontSize: 10, color: COLORS.gray500 }}>틸리언 Pro 패널 · AI 페르소나 분석</div>
                  </div>
                  <div style={{ marginLeft: "auto", width: 8, height: 8, borderRadius: "50%", background: "#10B981" }} />
                </div>
                <div style={{ flex: 1, overflow: "auto", padding: 16 }}>
                  <div style={{
                    background: `linear-gradient(135deg, ${COLORS.navy}08, ${brand.color}08)`,
                    borderRadius: 12, padding: 14, marginBottom: 16, border: `1px solid ${brand.color}20`,
                  }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: COLORS.navy, marginBottom: 4 }}>{brand.icon} {brand.name} 분석 세션</div>
                    <div style={{ fontSize: 10, color: COLORS.gray500, lineHeight: 1.6 }}>경쟁사 고객 데이터 분석, AI 페르소나 인터뷰, 소비 예측까지 — 채팅으로 바로 요청하세요.</div>
                  </div>
                  {messages.map((msg, i) => <ChatBubble key={i} {...msg} />)}
                  {isTyping && (
                    <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 0" }}>
                      <div style={{ width: 32, height: 32, borderRadius: 8, background: `linear-gradient(135deg, ${COLORS.navy}, ${COLORS.teal})`, display: "flex", alignItems: "center", justifyContent: "center", color: COLORS.white, fontSize: 14, fontWeight: 700 }}>AI</div>
                      <div style={{ display: "flex", gap: 4 }}>
                        {[0, 1, 2].map(i => <div key={i} style={{ width: 7, height: 7, borderRadius: "50%", background: COLORS.gray300, animation: `pulse 1.2s ease-in-out ${i * 0.2}s infinite` }} />)}
                      </div>
                      <style>{`@keyframes pulse { 0%, 100% { opacity: 0.3; } 50% { opacity: 1; } }`}</style>
                    </div>
                  )}
                  <div ref={chatEndRef} />
                </div>
                <div style={{ padding: "8px 16px", display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {(activeBrand === "hana"
                    ? ["이탈 고객 분석", "MZ 캠페인 반응 예측", "KB vs 하나 비교"]
                    : ["신제품 컨셉 테스트", "LG 전환 고객 분석", "렌탈료 민감도 조사"]
                  ).map((q, i) => (
                    <button key={i} onClick={() => setChatInput(q)} style={{
                      padding: "5px 10px", borderRadius: 16, border: `1px solid ${COLORS.gray200}`,
                      background: COLORS.gray100, color: COLORS.gray700, fontSize: 10, cursor: "pointer", fontWeight: 500,
                    }}>{q}</button>
                  ))}
                  <button onClick={() => setActivePanel("survey")} style={{ padding: "5px 10px", borderRadius: 16, border: `1px solid ${brand.color}30`, background: `${brand.color}08`, color: brand.color, fontSize: 10, cursor: "pointer", fontWeight: 600 }}>📋 설문 연동</button>
                  <button onClick={() => setActivePanel("fgd")} style={{ padding: "5px 10px", borderRadius: 16, border: `1px solid ${brand.color}30`, background: `${brand.color}08`, color: brand.color, fontSize: 10, cursor: "pointer", fontWeight: 600 }}>👥 좌담회</button>
                </div>
                <div style={{ padding: "12px 16px", borderTop: `1px solid ${COLORS.gray200}`, display: "flex", gap: 8 }}>
                  <input
                    value={chatInput} onChange={e => setChatInput(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && handleSend()}
                    placeholder="데이터 분석, AI 인터뷰, 예측 요청..."
                    style={{ flex: 1, padding: "10px 14px", borderRadius: 10, border: `1px solid ${COLORS.gray200}`, fontSize: 12, outline: "none", background: COLORS.gray100 }}
                  />
                  <button onClick={handleSend} style={{
                    padding: "10px 16px", borderRadius: 10, border: "none",
                    background: chatInput.trim() ? COLORS.navy : COLORS.gray200,
                    color: chatInput.trim() ? COLORS.white : COLORS.gray500,
                    fontSize: 12, fontWeight: 700, cursor: "pointer",
                  }}>전송</button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* ── Survey Panel Overlay ── */}
      {activePanel === "survey" && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }} onClick={() => setActivePanel(null)}>
          <div onClick={e => e.stopPropagation()} style={{ width: 560, maxHeight: "85vh", background: COLORS.white, borderRadius: 16, overflow: "auto", boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}>
            <div style={{ padding: "24px 28px 16px", borderBottom: `1px solid ${COLORS.gray200}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontSize: 17, fontWeight: 700, color: COLORS.navy }}>📋 실시간 설문 연동</div>
                <div style={{ fontSize: 12, color: COLORS.gray500, marginTop: 4 }}>AI 분석 결과를 바로 실제 패널에게 검증합니다</div>
              </div>
              <button onClick={() => setActivePanel(null)} style={{ width: 32, height: 32, borderRadius: 8, border: "none", background: COLORS.gray100, cursor: "pointer", fontSize: 16 }}>✕</button>
            </div>
            <div style={{ padding: "20px 28px" }}>
              {/* Survey Status */}
              <div style={{ background: `${brand.color}08`, border: `1px solid ${brand.color}20`, borderRadius: 12, padding: 16, marginBottom: 20, display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: `${brand.color}15`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>⚡</div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.navy }}>AI 대화 기반 설문 자동 생성</div>
                  <div style={{ fontSize: 11, color: COLORS.gray500 }}>데이터 회의실 분석 내용을 기반으로 설문 문항이 자동 설계됩니다</div>
                </div>
              </div>

              {/* Generated Survey Preview */}
              <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.navy, marginBottom: 12 }}>자동 생성된 설문 미리보기</div>
              <div style={{ background: COLORS.gray100, borderRadius: 12, padding: 16, marginBottom: 20 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.navy, marginBottom: 4 }}>
                  {activeBrand === "hana" ? "하나금융 MZ세대 브랜드 인식 설문" : "코웨이 정수기 신제품 반응 조사"}
                </div>
                <div style={{ fontSize: 11, color: COLORS.gray500, marginBottom: 16 }}>예상 응답 시간: 3분 · 대상: {activeBrand === "hana" ? "20-39세 금융앱 사용자" : "30-49세 정수기 보유 가구"}</div>
                {(activeBrand === "hana" ? [
                  { q: "Q1. 하나금융 앱(하나원큐)을 사용해본 경험이 있나요?", type: "단일선택" },
                  { q: "Q2. 하나금융 하면 가장 먼저 떠오르는 이미지는?", type: "복수선택" },
                  { q: "Q3. 하나금융의 MZ 마케팅 캠페인을 본 적이 있나요?", type: "단일선택" },
                  { q: "Q4. 주거래 은행 변경 시 가장 중요한 요인은?", type: "순위형" },
                  { q: "Q5. 하나금융에 바라는 점을 자유롭게 적어주세요.", type: "주관식" },
                ] : [
                  { q: "Q1. 현재 사용 중인 정수기 브랜드는 무엇인가요?", type: "단일선택" },
                  { q: "Q2. 정수기 선택 시 가장 중요하게 고려하는 요소는?", type: "복수선택" },
                  { q: "Q3. 코웨이 새 필터 교체 주기 알림 기능에 관심이 있나요?", type: "리커트 5점" },
                  { q: "Q4. 월 렌탈료 적정 가격대를 선택해주세요.", type: "단일선택" },
                  { q: "Q5. 코웨이에서 개선되었으면 하는 점은?", type: "주관식" },
                ]).map((item, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: i < 4 ? `1px solid ${COLORS.gray200}` : "none" }}>
                    <span style={{ fontSize: 12, color: COLORS.gray700, flex: 1 }}>{item.q}</span>
                    <span style={{ fontSize: 10, color: COLORS.gray400, background: COLORS.white, padding: "3px 8px", borderRadius: 4, whiteSpace: "nowrap", marginLeft: 8 }}>{item.type}</span>
                  </div>
                ))}
              </div>

              {/* Target & Settings */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
                <div style={{ background: COLORS.gray100, borderRadius: 10, padding: 14 }}>
                  <div style={{ fontSize: 11, fontWeight: 600, color: COLORS.gray500, marginBottom: 8 }}>배포 대상</div>
                  <div style={{ fontSize: 22, fontWeight: 700, color: COLORS.navy }}>{activeBrand === "hana" ? "1,200명" : "800명"}</div>
                  <div style={{ fontSize: 11, color: COLORS.gray500 }}>틸리언 Pro 패널 자동 매칭</div>
                </div>
                <div style={{ background: COLORS.gray100, borderRadius: 10, padding: 14 }}>
                  <div style={{ fontSize: 11, fontWeight: 600, color: COLORS.gray500, marginBottom: 8 }}>예상 회수 시간</div>
                  <div style={{ fontSize: 22, fontWeight: 700, color: brand.color }}>2~4시간</div>
                  <div style={{ fontSize: 11, color: COLORS.gray500 }}>평균 응답률 78.4%</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: "flex", gap: 10 }}>
                <button style={{ flex: 1, padding: "12px 0", borderRadius: 10, border: "none", background: COLORS.navy, color: COLORS.white, fontSize: 13, fontWeight: 700, cursor: "pointer" }}>설문 배포하기</button>
                <button style={{ padding: "12px 20px", borderRadius: 10, border: `1px solid ${COLORS.gray200}`, background: COLORS.white, color: COLORS.gray700, fontSize: 13, fontWeight: 500, cursor: "pointer" }}>문항 수정</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── FGD Matching Panel Overlay ── */}
      {activePanel === "fgd" && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }} onClick={() => setActivePanel(null)}>
          <div onClick={e => e.stopPropagation()} style={{ width: 560, maxHeight: "85vh", background: COLORS.white, borderRadius: 16, overflow: "auto", boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}>
            <div style={{ padding: "24px 28px 16px", borderBottom: `1px solid ${COLORS.gray200}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontSize: 17, fontWeight: 700, color: COLORS.navy }}>👥 좌담회 매칭</div>
                <div style={{ fontSize: 12, color: COLORS.gray500, marginTop: 4 }}>AI 인터뷰 결과를 바탕으로 실제 패널 FGD를 연결합니다</div>
              </div>
              <button onClick={() => setActivePanel(null)} style={{ width: 32, height: 32, borderRadius: 8, border: "none", background: COLORS.gray100, cursor: "pointer", fontSize: 16 }}>✕</button>
            </div>
            <div style={{ padding: "20px 28px" }}>
              {/* Matching Info */}
              <div style={{ background: `${brand.color}08`, border: `1px solid ${brand.color}20`, borderRadius: 12, padding: 16, marginBottom: 20, display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: `${brand.color}15`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>🎯</div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.navy }}>AI 분석 기반 최적 패널 매칭</div>
                  <div style={{ fontSize: 11, color: COLORS.gray500 }}>페르소나 인터뷰 결과와 유사한 실제 소비자를 자동 추천합니다</div>
                </div>
              </div>

              {/* Session Info */}
              <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.navy, marginBottom: 12 }}>좌담회 세션 설정</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 20 }}>
                {[
                  { label: "세션 형태", value: activeBrand === "hana" ? "온라인 FGD" : "오프라인 FGD", icon: "💻" },
                  { label: "참석 인원", value: "6~8명", icon: "👤" },
                  { label: "소요 시간", value: "90분", icon: "⏱️" },
                ].map((s, i) => (
                  <div key={i} style={{ background: COLORS.gray100, borderRadius: 10, padding: 12, textAlign: "center" }}>
                    <div style={{ fontSize: 16, marginBottom: 4 }}>{s.icon}</div>
                    <div style={{ fontSize: 10, color: COLORS.gray500, marginBottom: 2 }}>{s.label}</div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: COLORS.navy }}>{s.value}</div>
                  </div>
                ))}
              </div>

              {/* Matched Panelists */}
              <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.navy, marginBottom: 12 }}>매칭된 패널 후보 ({activeBrand === "hana" ? "12명" : "9명"})</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 20 }}>
                {(activeBrand === "hana" ? [
                  { name: "김○영", age: "29세·여", job: "IT기업 마케터", match: 94, tag: "카카오뱅크 주거래, 하나원큐 보조" },
                  { name: "이○준", age: "33세·남", job: "스타트업 PM", match: 91, tag: "KB금융→하나 전환 고려 중" },
                  { name: "박○희", age: "26세·여", job: "대학원생", match: 88, tag: "토스·카카오뱅크 헤비유저" },
                  { name: "최○우", age: "37세·남", job: "프리랜서 개발자", match: 86, tag: "재테크 적극형, 은행 3개 비교 사용" },
                ] : [
                  { name: "정○미", age: "38세·여", job: "맞벌이 워킹맘", match: 95, tag: "코웨이 2년차 렌탈 사용 중" },
                  { name: "한○석", age: "42세·남", job: "IT 대기업 과장", match: 92, tag: "LG퓨리케어에서 코웨이 전환" },
                  { name: "오○진", age: "35세·여", job: "인테리어 디자이너", match: 89, tag: "정수기+공기청정기 번들 사용" },
                  { name: "송○호", age: "45세·남", job: "자영업(식당)", match: 85, tag: "SK매직 사용 중, 코웨이 관심" },
                ]).map((p, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", background: COLORS.gray100, borderRadius: 10, border: `1px solid ${COLORS.gray200}` }}>
                    <div style={{ width: 36, height: 36, borderRadius: 10, background: `${brand.color}${15 + i * 5}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, color: i === 0 ? COLORS.white : COLORS.navy }}>{p.name[0]}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <span style={{ fontSize: 13, fontWeight: 600, color: COLORS.navy }}>{p.name}</span>
                        <span style={{ fontSize: 10, color: COLORS.gray500 }}>{p.age} · {p.job}</span>
                      </div>
                      <div style={{ fontSize: 10, color: COLORS.gray500, marginTop: 2 }}>{p.tag}</div>
                    </div>
                    <div style={{ textAlign: "center" }}>
                      <div style={{ fontSize: 15, fontWeight: 700, color: p.match >= 90 ? brand.color : COLORS.gray700 }}>{p.match}%</div>
                      <div style={{ fontSize: 9, color: COLORS.gray500 }}>매칭률</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Discussion Guide Preview */}
              <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.navy, marginBottom: 8 }}>토의 가이드 (자동 생성)</div>
              <div style={{ background: COLORS.gray100, borderRadius: 10, padding: 14, marginBottom: 20, fontSize: 12, lineHeight: 1.8, color: COLORS.gray700 }}>
                {activeBrand === "hana" ? (
                  <>1. 현재 주거래 은행 이용 현황 (10분)<br/>2. 하나금융 브랜드 인식 및 경험 (20분)<br/>3. MZ세대 금융앱 기대 기능 (20분)<br/>4. 브랜드 전환 요인 및 장벽 (20분)<br/>5. 개선 아이디어 자유 토론 (20분)</>
                ) : (
                  <>1. 정수기 사용 패턴 및 만족도 (10분)<br/>2. 코웨이 브랜드 경험 공유 (20분)<br/>3. 신제품 컨셉 반응 테스트 (20분)<br/>4. 렌탈료 및 AS 서비스 기대사항 (20분)<br/>5. 경쟁사 비교 및 자유 토론 (20분)</>
                )}
              </div>

              {/* Actions */}
              <div style={{ display: "flex", gap: 10 }}>
                <button style={{ flex: 1, padding: "12px 0", borderRadius: 10, border: "none", background: COLORS.navy, color: COLORS.white, fontSize: 13, fontWeight: 700, cursor: "pointer" }}>좌담회 일정 잡기</button>
                <button style={{ padding: "12px 20px", borderRadius: 10, border: `1px solid ${COLORS.gray200}`, background: COLORS.white, color: COLORS.gray700, fontSize: 13, fontWeight: 500, cursor: "pointer" }}>가이드 수정</button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}