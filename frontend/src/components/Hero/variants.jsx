export const THEMES = {
  green: {
    bg: "#2D6A4F",
    // These are the specific shapes from your "Eixo 01" / Login
    shapes: (
      <>
        <ellipse cx="350" cy="40" rx="130" ry="90" fill="#40916C" opacity="0.4"/>
        <ellipse cx="60" cy="190" rx="100" ry="65" fill="#1B4332" opacity="0.4"/>
        <path d="M0,150 Q80,100 180,130 Q280,160 400,110 L400,220 L0,220Z" fill="#1B4332" opacity="0.3"/>
      </>
    )
  },
  blue: {
    bg: "#1565C0",
    // Shapes from "Eixo 02"
    shapes: (
      <>
        <ellipse cx="50" cy="50" rx="100" ry="70" fill="#1565C0" opacity="0.3"/>
        <ellipse cx="350" cy="130" rx="120" ry="70" fill="#0D47A1" opacity="0.25"/>
        <path d="M0,100 Q80,50 180,80 Q280,110 400,60 L400,190 L0,190Z" fill="#0D47A1" opacity="0.3"/>
        <circle cx="300" cy="40" r="50" fill="#42A5F5" opacity="0.2"/>
      </>
    )
  },
  orange: {
    bg: "#E65100",
    // Shapes from "Eixo 04"
    shapes: (
      <>
        <ellipse cx="380" cy="50" rx="100" ry="75" fill="#E65100" opacity="0.3"/>
        <ellipse cx="100" cy="160" rx="130" ry="60" fill="#BF360C" opacity="0.25"/>
        <path d="M0,90 Q100,140 200,100 Q300,60 400,120 L400,190 L0,190Z" fill="#BF360C" opacity="0.25"/>
      </>
    )
  },
  purple: {
    bg: "#6A1B9A",
    // Shapes from "Eixo 05"
    shapes: (
      <>
        <ellipse cx="200" cy="20" rx="200" ry="80" fill="#6A1B9A" opacity="0.3"/>
        <ellipse cx="380" cy="150" rx="90" ry="65" fill="#4A148C" opacity="0.25"/>
        <path d="M0,110 Q80,70 160,100 Q240,130 320,80 Q380,50 400,90 L400,190 L0,190Z" fill="#4A148C" opacity="0.3"/>
      </>
    )
  }
};