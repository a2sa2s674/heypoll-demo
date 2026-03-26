import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import DataRoomMockup from './DataRoomMockup'
import ResearchArchiveMockup from './ResearchArchiveMockup'

const COLORS = {
  navy: "#031D38",
  orange: "#FF5D37",
  bg: "#F7F8FA",
}

function Launcher() {
  const [page, setPage] = useState("home")

  if (page === "dataroom") return <DataRoomMockup onHome={() => setPage("home")} />
  if (page === "archive") return <ResearchArchiveMockup onHome={() => setPage("home")} />

  return (
    <div style={{ minHeight: "100vh", background: `linear-gradient(135deg, ${COLORS.navy} 0%, #1B2A4A 100%)`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontFamily: "'Pretendard', 'Apple SD Gothic Neo', sans-serif" }}>

      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 48 }}>
        <div style={{ width: 48, height: 48, borderRadius: 14, background: `linear-gradient(135deg, ${COLORS.orange}, #FF7F5C)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, fontWeight: 800, color: "#fff" }}>H</div>
        <div>
          <div style={{ fontSize: 28, fontWeight: 800, color: "#fff", letterSpacing: -0.5 }}>HEYPOLL</div>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", letterSpacing: 2, marginTop: 2 }}>AI PERSONA PLATFORM</div>
        </div>
      </div>

      {/* Title */}
      <h1 style={{ fontSize: 20, fontWeight: 600, color: "rgba(255,255,255,0.7)", marginBottom: 40, letterSpacing: -0.3 }}>CEO 보고 시연용 서비스 목업</h1>

      {/* Cards */}
      <div style={{ display: "flex", gap: 24 }}>
        <div
          onClick={() => setPage("dataroom")}
          style={{ width: 340, background: "rgba(255,255,255,0.06)", borderRadius: 20, padding: "36px 32px", border: "1px solid rgba(255,255,255,0.1)", cursor: "pointer", transition: "all 0.25s" }}
          onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.1)"; e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.borderColor = COLORS.orange }}
          onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)" }}
        >
          <div style={{ fontSize: 36, marginBottom: 16 }}>📊</div>
          <div style={{ fontSize: 11, fontWeight: 600, color: COLORS.orange, letterSpacing: 1, marginBottom: 8 }}>사업 1</div>
          <div style={{ fontSize: 20, fontWeight: 700, color: "#fff", marginBottom: 10, lineHeight: 1.4 }}>데이터 인텔리전스 플랫폼</div>
          <div style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", lineHeight: 1.7 }}>
            대시보드 + AI 페르소나 인터뷰 채팅<br/>
            브랜딩(하나금융) · 제품(코웨이) 예시
          </div>
          <div style={{ marginTop: 20, padding: "8px 0", borderTop: "1px solid rgba(255,255,255,0.08)", fontSize: 12, color: COLORS.orange, fontWeight: 600 }}>
            시연하기 →
          </div>
        </div>

        <div
          onClick={() => setPage("archive")}
          style={{ width: 340, background: "rgba(255,255,255,0.06)", borderRadius: 20, padding: "36px 32px", border: "1px solid rgba(255,255,255,0.1)", cursor: "pointer", transition: "all 0.25s" }}
          onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.1)"; e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.borderColor = COLORS.orange }}
          onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)" }}
        >
          <div style={{ fontSize: 36, marginBottom: 16 }}>📚</div>
          <div style={{ fontSize: 11, fontWeight: 600, color: COLORS.orange, letterSpacing: 1, marginBottom: 8 }}>사업 2</div>
          <div style={{ fontSize: 20, fontWeight: 700, color: "#fff", marginBottom: 10, lineHeight: 1.4 }}>데이터 마켓플레이스</div>
          <div style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", lineHeight: 1.7 }}>
            데이터 재가공 · 리포트 판매 · AI 요약<br/>
            샘플 보고서 6건 포함
          </div>
          <div style={{ marginTop: 20, padding: "8px 0", borderTop: "1px solid rgba(255,255,255,0.08)", fontSize: 12, color: COLORS.orange, fontWeight: 600 }}>
            시연하기 →
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ marginTop: 60, fontSize: 11, color: "rgba(255,255,255,0.2)" }}>
        © 2026 Tillion Pro · 브랜딩그룹 · CEO 보고용 시연 데모
      </div>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Launcher />
  </React.StrictMode>
)