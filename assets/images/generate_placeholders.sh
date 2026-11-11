#!/bin/bash

# 1. Hero Background (1920x1080) - High-tech, dark futuristic studio, neon cyan & coral accents, grid & mesh
cat > "hero-bg.svg" << 'EOF'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080" width="1920" height="1080">
  <defs>
    <radialGradient id="hbg" cx="50%" cy="30%" r="80%">
      <stop offset="0%" stop-color="#2a457d"/>
      <stop offset="50%" stop-color="#142142"/>
      <stop offset="100%" stop-color="#0b101d"/>
    </radialGradient>
    <linearGradient id="coralGlow" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FF7474" stop-opacity="0.8"/>
      <stop offset="100%" stop-color="#FF416C" stop-opacity="0.1"/>
    </linearGradient>
    <linearGradient id="blueGlow" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#38ef7d" stop-opacity="0.6"/>
      <stop offset="100%" stop-color="#11998e" stop-opacity="0.1"/>
    </linearGradient>
    <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
      <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(255,255,255,0.04)" stroke-width="1"/>
      <circle cx="0" cy="0" r="1.5" fill="rgba(255,255,255,0.1)"/>
    </pattern>
  </defs>
  <rect width="1920" height="1080" fill="url(#hbg)"/>
  <rect width="1920" height="1080" fill="url(#grid)"/>
  
  <!-- Glowing spheres and geometric tech shapes -->
  <circle cx="1450" cy="400" r="320" fill="url(#coralGlow)" filter="blur(60px)"/>
  <circle cx="1600" cy="750" r="280" fill="#213C72" filter="blur(70px)"/>
  <circle cx="350" cy="850" r="350" fill="url(#blueGlow)" filter="blur(80px)"/>
  
  <!-- Abstract 3D Cube / AI Nodes in Background -->
  <g stroke="rgba(255,255,255,0.12)" stroke-width="1.5" fill="none">
    <polygon points="1350,220 1550,140 1750,220 1550,300"/>
    <polygon points="1350,220 1550,300 1550,480 1350,400"/>
    <polygon points="1750,220 1550,300 1550,480 1750,400"/>
    
    <polygon points="1420,540 1580,480 1740,540 1580,600" stroke="rgba(255,116,116,0.3)"/>
    <polygon points="1420,540 1580,600 1580,720 1420,660" stroke="rgba(255,116,116,0.3)"/>
    <polygon points="1740,540 1580,600 1580,720 1740,660" stroke="rgba(255,116,116,0.3)"/>
  </g>
  
  <path d="M 1200,900 Q 1450,650 1700,850 T 1920,700" fill="none" stroke="rgba(255,116,116,0.25)" stroke-width="3" stroke-dasharray="8 6"/>
  <path d="M 1150,820 Q 1400,600 1650,780 T 1920,620" fill="none" stroke="rgba(74,144,217,0.3)" stroke-width="2"/>
</svg>
EOF

create_card_svg() {
  local file="$1" title="$2" subtitle="$3" icon="$4" c1="$5" c2="$6"
  cat > "$file" << EOF
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="800" height="500">
  <defs>
    <linearGradient id="bg_${file//[^a-zA-Z0-9]/}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${c1}"/>
      <stop offset="100%" stop-color="${c2}"/>
    </linearGradient>
    <pattern id="dot_${file//[^a-zA-Z0-9]/}" width="30" height="30" patternUnits="userSpaceOnUse">
      <circle cx="15" cy="15" r="1.5" fill="rgba(255,255,255,0.12)"/>
    </pattern>
  </defs>
  <rect width="800" height="500" fill="url(#bg_${file//[^a-zA-Z0-9]/})"/>
  <rect width="800" height="500" fill="url(#dot_${file//[^a-zA-Z0-9]/})"/>
  
  <!-- Subtle decorative ambient circles -->
  <circle cx="680" cy="120" r="180" fill="rgba(255,116,116,0.18)" filter="blur(40px)"/>
  <circle cx="140" cy="380" r="140" fill="rgba(74,144,217,0.2)" filter="blur(30px)"/>
  
  <!-- Visual Frame / Glass Graphic Card -->
  <g transform="translate(160, 60)">
    <rect width="480" height="380" rx="24" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.18)" stroke-width="1.5"/>
    
    <!-- Top toolbar dots -->
    <circle cx="36" cy="36" r="6" fill="#FF7474"/>
    <circle cx="56" cy="36" r="6" fill="#FFBD2E"/>
    <circle cx="76" cy="36" r="6" fill="#27C93F"/>
    
    <!-- Badge -->
    <rect x="36" y="80" width="130" height="32" rx="16" fill="rgba(255,116,116,0.2)"/>
    <text x="101" y="101" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="12" font-weight="bold" fill="#FF7474" text-anchor="middle" letter-spacing="1">TRIVIKRA TECH</text>
    
    <!-- Big Badge / Icon Symbol -->
    <circle cx="240" cy="190" r="54" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.2)" stroke-width="2"/>
    <text x="240" y="202" font-family="Arial, sans-serif" font-size="34" fill="#ffffff" text-anchor="middle">${icon}</text>
    
    <!-- Title & subtitle -->
    <text x="240" y="280" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="22" font-weight="bold" fill="#FFFFFF" text-anchor="middle">${title}</text>
    <text x="240" y="315" font-family="'Inter', Arial, sans-serif" font-size="14" fill="rgba(255,255,255,0.7)" text-anchor="middle">${subtitle}</text>
  </g>
</svg>
EOF
}

# Create Course Images
create_card_svg "course-uiux.svg" "UI/UX Design + AI" "Gen-AI &amp; Agentic Design Workflows" "✦" "#1b2848" "#0f172a"
create_card_svg "course-webdev.svg" "Web Development + AI" "Full Stack Engineering with AI" "&lt;/&gt;" "#13254e" "#0b152d"
create_card_svg "course-graphic.svg" "Graphic Design + AI" "Visual Identity &amp; Creative Gen-AI" "❖" "#2a1b4e" "#120a28"

# Create Blog Images
create_card_svg "blog-uiux.svg" "UI/UX with Gen-AI" "Next-Gen User Experience Trends" "✦" "#192849" "#0f1624"
create_card_svg "blog-agenticai.svg" "Understanding Agentic AI" "Autonomous Agents in Design &amp; Code" "⚡" "#20173e" "#0e0920"
create_card_svg "blog-webdev.svg" "Modern Web Development" "From Semantics to Intelligent Web Apps" "⌘" "#122a46" "#091729"
create_card_svg "blog-genai.svg" "Generative AI Creative Tools" "The Evolution of Digital Artistry" "✿" "#281938" "#13091e"
create_card_svg "blog-career.svg" "Future-Proof Careers" "High-Demand Skills for 2027" "★" "#162b3a" "#0a1720"
create_card_svg "blog-graphic.svg" "Brand Design with AI" "Crafting Memorable Visual Systems" "❖" "#2d1d3a" "#140c1c"

# Create Project Images
create_card_svg "project-mobile-app.svg" "FinTech Mobile App" "End-to-End iOS &amp; Android UI/UX" "📱" "#152a50" "#0a1730"
create_card_svg "project-website.svg" "SaaS Enterprise Website" "Responsive Web Design &amp; Architecture" "🌐" "#182645" "#0d162a"
create_card_svg "project-dashboard.svg" "AI Analytics Dashboard" "Complex Data Visualization &amp; UX" "📊" "#1f224b" "#0e1029"
create_card_svg "project-branding.svg" "Verve Studio Branding" "Complete Brand Identity &amp; Guidelines" "✨" "#2e1a3b" "#150a1d"
create_card_svg "project-ai-web.svg" "Neural Prompt Generator" "Full-Stack AI Web Application" "⚡" "#112e47" "#081b2c"
create_card_svg "project-portfolio.svg" "Creative Studio Portfolio" "Award-Winning Interactive Showcase" "🎯" "#271d43" "#120b24"

# Create About Image
create_card_svg "about-team.svg" "Trivikra Tech Academy" "Design &amp; AI Center of Excellence" "🏛️" "#1e3360" "#0f1c39"

echo "Vector assets generated successfully."
