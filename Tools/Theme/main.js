// Comprehensive theme collection with diverse styles and aesthetics
const themes = [
  {
    name: "Modern Minimal",
    description: "Clean and simple with plenty of whitespace",
    category: "minimal",
    css: `
      body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; background: #ffffff; color: #1a1a1a; line-height: 1.7; margin: 0; padding: 40px; max-width: 800px; margin: 0 auto; }
      h1 { font-size: 2.5rem; font-weight: 300; color: #2c3e50; margin-bottom: 1.5rem; letter-spacing: -0.02em; }
      h2 { font-size: 2rem; font-weight: 400; color: #34495e; margin: 2.5rem 0 1rem; }
      h3 { font-size: 1.5rem; font-weight: 500; color: #555; margin: 2rem 0 0.5rem; }
      p { margin-bottom: 1.5rem; color: #666; max-width: 65ch; font-size: 1.1rem; }
      ul, ol { margin: 1.5rem 0; padding-left: 2rem; }
      li { margin-bottom: 0.8rem; color: #666; font-size: 1.1rem; }
      strong { color: #2c3e50; font-weight: 600; }
      em { color: #7f8c8d; font-style: italic; }
      a { color: #3498db; text-decoration: none; border-bottom: 1px solid transparent; transition: border-color 0.3s ease; }
      a:hover { border-bottom-color: #3498db; }
      .button { display: inline-block; padding: 14px 28px; background: #3498db; color: white; border-radius: 6px; text-decoration: none; font-weight: 500; transition: all 0.3s ease; margin-top: 1rem; }
      .button:hover { background: #2980b9; border-bottom: none; transform: translateY(-1px); }
      .highlight { background: #f8f9fa; padding: 2rem; border-left: 4px solid #3498db; margin: 2rem 0; border-radius: 0 8px 8px 0; }
    `,
    html: `
      <h1>Modern Minimal Design</h1>
      <p>This theme embraces <strong>simplicity</strong> and <em>clarity</em>. Perfect for professional websites and blogs that want to focus on content without distractions.</p>
      
      <h2>Key Features</h2>
      <ul>
        <li>Clean typography with excellent readability</li>
        <li>Generous whitespace for better focus</li>
        <li>Subtle color palette that's easy on the eyes</li>
        <li>Responsive design principles</li>
      </ul>
      
      <div class="highlight">
        <h3>Highlighted Content</h3>
        <p>Important information stands out with this subtle highlighting technique that doesn't overwhelm the reader.</p>
      </div>
      
      <p>Ready to get started? <a href="#" class="button">Get Started</a></p>
    `
  },
  {
    name: "Dark Mode Pro",
    description: "Professional dark theme for developers",
    category: "dark",
    css: `
      body { font-family: 'SF Mono', 'Monaco', 'Cascadia Code', monospace; background: #0d1117; color: #c9d1d9; line-height: 1.6; margin: 0; padding: 40px; }
      h1 { font-size: 2.5rem; font-weight: 700; color: #58a6ff; margin-bottom: 1rem; text-shadow: 0 0 10px rgba(88, 166, 255, 0.3); }
      h2 { font-size: 2rem; font-weight: 600; color: #7c3aed; margin: 2rem 0 1rem; }
      h3 { font-size: 1.5rem; font-weight: 500; color: #f85149; margin: 1.5rem 0 0.5rem; }
      p { margin-bottom: 1.2rem; color: #8b949e; font-size: 1rem; }
      ul, ol { margin: 1rem 0; padding-left: 2rem; }
      li { margin-bottom: 0.5rem; color: #8b949e; }
      strong { color: #58a6ff; font-weight: 700; }
      em { color: #a5a5a5; font-style: italic; }
      a { color: #58a6ff; text-decoration: none; transition: all 0.3s ease; }
      a:hover { text-decoration: underline; text-shadow: 0 0 5px rgba(88, 166, 255, 0.5); }
      .button { display: inline-block; padding: 12px 24px; background: linear-gradient(135deg, #7c3aed, #3b82f6); color: white; border-radius: 8px; text-decoration: none; font-weight: 600; transition: all 0.3s; box-shadow: 0 4px 15px rgba(124, 58, 237, 0.2); }
      .button:hover { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(124, 58, 237, 0.4); text-decoration: none; }
      .code-block { background: #161b22; border: 1px solid #30363d; border-radius: 8px; padding: 1.5rem; margin: 2rem 0; font-family: inherit; position: relative; }
      .code-block::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; background: linear-gradient(90deg, #7c3aed, #3b82f6, #06b6d4); border-radius: 8px 8px 0 0; }
    `,
    html: `
      <h1>Dark Mode Pro</h1>
      <p>A <strong>developer-focused</strong> theme with <em>syntax highlighting</em> colors and modern dark aesthetics.</p>
      
      <h2>Perfect For</h2>
      <ul>
        <li>Developer portfolios and blogs</li>
        <li>Technical documentation</li>
        <li>Code-heavy content</li>
        <li>Late-night coding sessions</li>
      </ul>
      
      <div class="code-block">
        <h3>Code-Friendly Design</h3>
        <p>This theme uses colors inspired by popular code editors like VS Code and GitHub Dark.</p>
      </div>
      
      <p>Experience the dark side: <a href="#" class="button">Enable Dark Mode</a></p>
    `
  },
  {
    name: "Sunset Gradient",
    description: "Warm gradients with vibrant sunset colors",
    category: "colorful",
    css: `
      body { font-family: 'Inter', sans-serif; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #ffffff; line-height: 1.6; margin: 0; padding: 40px; min-height: 100vh; }
      h1 { font-size: 3rem; font-weight: 800; background: linear-gradient(45deg, #ff6b6b, #ffd93d); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; margin-bottom: 1rem; text-align: center; }
      h2 { font-size: 2rem; font-weight: 600; color: #ffd93d; margin: 2rem 0 1rem; text-shadow: 0 2px 4px rgba(0,0,0,0.3); }
      h3 { font-size: 1.5rem; font-weight: 500; color: #ff9ff3; margin: 1.5rem 0 0.5rem; }
      p { margin-bottom: 1.2rem; color: #f0f0f0; text-shadow: 0 1px 2px rgba(0,0,0,0.2); }
      ul, ol { margin: 1rem 0; padding-left: 2rem; }
      li { margin-bottom: 0.5rem; color: #f0f0f0; }
      strong { color: #ffd93d; font-weight: 700; }
      em { color: #ff9ff3; font-style: italic; }
      a { color: #ff6b6b; text-decoration: none; font-weight: 600; transition: all 0.3s ease; }
      a:hover { text-shadow: 0 0 10px rgba(255, 107, 107, 0.8); }
      .button { display: inline-block; padding: 15px 30px; background: linear-gradient(45deg, #ff6b6b, #4ecdc4); color: white; border-radius: 50px; text-decoration: none; font-weight: 600; transition: all 0.3s; box-shadow: 0 8px 15px rgba(255, 107, 107, 0.3); }
      .button:hover { transform: translateY(-3px); box-shadow: 0 15px 25px rgba(255, 107, 107, 0.5); }
      .card { background: rgba(255,255,255,0.1); backdrop-filter: blur(10px); border-radius: 15px; padding: 2rem; margin: 2rem 0; border: 1px solid rgba(255,255,255,0.2); }
    `,
    html: `
      <h1>Sunset Gradient</h1>
      <p>Immerse yourself in <strong>warm colors</strong> and <em>beautiful gradients</em> that remind you of a perfect sunset.</p>
      
      <h2>Features</h2>
      <ul>
        <li>Vibrant gradient backgrounds</li>
        <li>Glass morphism effects</li>
        <li>Warm, inviting color palette</li>
        <li>Perfect for creative portfolios</li>
      </ul>
      
      <div class="card">
        <h3>Glass Card Effect</h3>
        <p>This card demonstrates the beautiful glass morphism effect with backdrop blur and subtle transparency.</p>
      </div>
      
      <p>Ready to dive in? <a href="#" class="button">Explore More</a></p>
    `
  },
  {
    name: "Corporate Blue",
    description: "Professional business theme in corporate blue",
    category: "business",
    css: `
      body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #f8fafc; color: #1e293b; line-height: 1.6; margin: 0; padding: 40px; }
      h1 { font-size: 2.5rem; font-weight: 700; color: #1e40af; margin-bottom: 1rem; border-bottom: 3px solid #3b82f6; padding-bottom: 0.5rem; }
      h2 { font-size: 2rem; font-weight: 600; color: #1e40af; margin: 2rem 0 1rem; }
      h3 { font-size: 1.5rem; font-weight: 500; color: #1e40af; margin: 1.5rem 0 0.5rem; }
      p { margin-bottom: 1.2rem; color: #475569; }
      ul, ol { margin: 1rem 0; padding-left: 2rem; }
      li { margin-bottom: 0.5rem; color: #475569; }
      strong { color: #1e40af; font-weight: 700; }
      em { color: #64748b; font-style: italic; }
      a { color: #2563eb; text-decoration: none; font-weight: 600; transition: all 0.3s ease; }
      a:hover { color: #1d4ed8; text-decoration: underline; }
      .button { display: inline-block; padding: 12px 24px; background: #1e40af; color: white; border-radius: 6px; text-decoration: none; font-weight: 600; transition: all 0.3s ease; box-shadow: 0 2px 4px rgba(30, 64, 175, 0.2); }
      .button:hover { background: #1d4ed8; box-shadow: 0 4px 8px rgba(30, 64, 175, 0.3); transform: translateY(-1px); }
      .info-box { background: #dbeafe; border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 0 6px 6px 0; }
    `,
    html: `
      <h1>Corporate Excellence</h1>
      <p>A <strong>professional</strong> and <em>trustworthy</em> design perfect for business websites, corporate blogs, and professional services.</p>
      
      <h2>Why Choose Corporate Blue?</h2>
      <ul>
        <li>Builds trust and credibility</li>
        <li>Professional appearance</li>
        <li>Excellent readability</li>
        <li>Conservative and reliable</li>
      </ul>
      
      <div class="info-box">
        <h3>Professional Highlight</h3>
        <p>Use this style to highlight important business information and key messages.</p>
      </div>
      
      <p>Ready to elevate your business? <a href="#" class="button">Get Started Today</a></p>
    `
  },
  {
    name: "Retro Neon",
    description: "80s-inspired neon colors and retro vibes",
    category: "retro",
    css: `
      body { font-family: 'Courier New', monospace; background: #0a0a0a; color: #00ff41; line-height: 1.6; margin: 0; padding: 40px; background-image: radial-gradient(circle at 25% 25%, #ff00ff 0%, transparent 50%), radial-gradient(circle at 75% 75%, #00ffff 0%, transparent 50%); }
      h1 { font-size: 3rem; font-weight: 900; color: #ff00ff; margin-bottom: 1rem; text-shadow: 0 0 10px #ff00ff, 0 0 20px #ff00ff, 0 0 30px #ff00ff; animation: glow 2s ease-in-out infinite alternate; text-transform: uppercase; letter-spacing: 0.1em; }
      h2 { font-size: 2rem; font-weight: 700; color: #00ffff; margin: 2rem 0 1rem; text-shadow: 0 0 5px #00ffff; text-transform: uppercase; }
      h3 { font-size: 1.5rem; font-weight: 600; color: #ffff00; margin: 1.5rem 0 0.5rem; text-shadow: 0 0 5px #ffff00; }
      p { margin-bottom: 1.2rem; color: #00ff41; text-shadow: 0 0 2px #00ff41; }
      ul, ol { margin: 1rem 0; padding-left: 2rem; }
      li { margin-bottom: 0.5rem; color: #00ff41; }
      strong { color: #ff00ff; font-weight: 900; text-shadow: 0 0 5px #ff00ff; }
      em { color: #ffff00; font-style: italic; text-shadow: 0 0 3px #ffff00; }
      a { color: #00ffff; text-decoration: none; font-weight: 700; text-shadow: 0 0 5px #00ffff; transition: all 0.3s ease; }
      a:hover { animation: flicker 0.1s infinite; }
      .button { display: inline-block; padding: 15px 30px; background: linear-gradient(45deg, #ff00ff, #00ffff); color: #000; border-radius: 0; text-decoration: none; font-weight: 900; transition: all 0.3s; box-shadow: 0 0 20px rgba(255, 0, 255, 0.5); text-transform: uppercase; border: 2px solid #fff; }
      .button:hover { box-shadow: 0 0 30px rgba(255, 0, 255, 0.8), 0 0 30px rgba(0, 255, 255, 0.8); }
      .retro-box { border: 2px solid #00ffff; padding: 2rem; margin: 2rem 0; background: rgba(0, 255, 255, 0.1); box-shadow: inset 0 0 20px rgba(0, 255, 255, 0.2); }
      @keyframes glow { from { text-shadow: 0 0 10px #ff00ff, 0 0 20px #ff00ff, 0 0 30px #ff00ff; } to { text-shadow: 0 0 20px #ff00ff, 0 0 30px #ff00ff, 0 0 40px #ff00ff; } }
      @keyframes flicker { 0%, 100% { opacity: 1; } 50% { opacity: 0.8; } }
    `,
    html: `
      <h1>Retro Neon</h1>
      <p>Step into the <strong>80s</strong> with this <em>cyberpunk-inspired</em> theme featuring neon colors and retro aesthetics.</p>
      
      <h2>Neon Features</h2>
      <ul>
        <li>Glowing text effects</li>
        <li>Retro color scheme</li>
        <li>Cyberpunk aesthetics</li>
        <li>80s nostalgia vibes</li>
      </ul>
      
      <div class="retro-box">
        <h3>Neon Highlight</h3>
        <p>This box showcases the retro neon aesthetic with glowing borders and cyberpunk styling.</p>
      </div>
      
      <p>Enter the matrix: <a href="#" class="button">Go Retro</a></p>
    `
  },
  {
    name: "Nature Green",
    description: "Earthy greens inspired by nature",
    category: "nature",
    css: `
      body { font-family: 'Georgia', serif; background: linear-gradient(135deg, #a8e6cf 0%, #dcedc1 100%); color: #2d5016; line-height: 1.7; margin: 0; padding: 40px; }
      h1 { font-size: 2.8rem; font-weight: 700; color: #1b5e20; margin-bottom: 1rem; text-shadow: 0 2px 4px rgba(27, 94, 32, 0.2); }
      h2 { font-size: 2.2rem; font-weight: 600; color: #2e7d32; margin: 2rem 0 1rem; }
      h3 { font-size: 1.6rem; font-weight: 500; color: #388e3c; margin: 1.5rem 0 0.5rem; }
      p { margin-bottom: 1.3rem; color: #2d5016; }
      ul, ol { margin: 1rem 0; padding-left: 2rem; }
      li { margin-bottom: 0.6rem; color: #2d5016; }
      strong { color: #1b5e20; font-weight: 700; }
      em { color: #4caf50; font-style: italic; }
      a { color: #2e7d32; text-decoration: none; font-weight: 600; border-bottom: 2px solid transparent; transition: all 0.3s ease; }
      a:hover { border-bottom-color: #2e7d32; }
      .button { display: inline-block; padding: 14px 28px; background: linear-gradient(135deg, #4caf50, #8bc34a); color: white; border-radius: 25px; text-decoration: none; font-weight: 600; transition: all 0.3s; box-shadow: 0 4px 15px rgba(76, 175, 80, 0.3); }
      .button:hover { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(76, 175, 80, 0.4); border-bottom: none; }
      .nature-card { background: rgba(255, 255, 255, 0.8); border-radius: 15px; padding: 2rem; margin: 2rem 0; box-shadow: 0 4px 20px rgba(27, 94, 32, 0.1); border: 1px solid rgba(76, 175, 80, 0.2); }
    `,
    html: `
      <h1>Nature's Harmony</h1>
      <p>Connect with <strong>nature</strong> through this <em>organic</em> theme inspired by forests, leaves, and the natural world.</p>
      
      <h2>Eco-Friendly Features</h2>
      <ul>
        <li>Calming green color palette</li>
        <li>Natural, organic feel</li>
        <li>Perfect for environmental sites</li>
        <li>Promotes tranquility and growth</li>
      </ul>
      
      <div class="nature-card">
        <h3>Growth & Sustainability</h3>
        <p>This theme is perfect for environmental organizations, sustainable businesses, and anyone who wants to convey natural beauty.</p>
      </div>
      
      <p>Embrace nature: <a href="#" class="button">Go Green</a></p>
    `
  },
  {
    name: "Pastel Dreams",
    description: "Soft pastel colors for a dreamy aesthetic",
    category: "pastel",
    css: `
      body { font-family: 'Poppins', sans-serif; background: linear-gradient(45deg, #ffeef8, #e8f5ff, #fff2e8); color: #6b46c1; line-height: 1.6; margin: 0; padding: 40px; }
      h1 { font-size: 2.5rem; font-weight: 600; background: linear-gradient(45deg, #ec4899, #8b5cf6, #06b6d4); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; margin-bottom: 1rem; }
      h2 { font-size: 2rem; font-weight: 500; color: #ec4899; margin: 2rem 0 1rem; }
      h3 { font-size: 1.5rem; font-weight: 500; color: #8b5cf6; margin: 1.5rem 0 0.5rem; }
      p { margin-bottom: 1.2rem; color: #6b7280; }
      ul, ol { margin: 1rem 0; padding-left: 2rem; }
      li { margin-bottom: 0.5rem; color: #6b7280; }
      strong { color: #ec4899; font-weight: 600; }
      em { color: #8b5cf6; font-style: italic; }
      a { color: #06b6d4; text-decoration: none; font-weight: 500; transition: all 0.3s ease; }
      a:hover { color: #0891b2; }
      .button { display: inline-block; padding: 12px 24px; background: linear-gradient(135deg, #fbbf24, #f472b6); color: white; border-radius: 20px; text-decoration: none; font-weight: 500; transition: all 0.3s; box-shadow: 0 4px 15px rgba(251, 191, 36, 0.3); }
      .button:hover { transform: translateY(-2px) scale(1.02); box-shadow: 0 8px 25px rgba(251, 191, 36, 0.4); }
      .pastel-card { background: linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.7)); backdrop-filter: blur(10px); border-radius: 20px; padding: 2rem; margin: 2rem 0; border: 1px solid rgba(255, 255, 255, 0.5); box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1); }
    `,
    html: `
      <h1>Pastel Dreams</h1>
      <p>Drift into a world of <strong>soft colors</strong> and <em>gentle aesthetics</em> with this dreamy pastel theme.</p>
      
      <h2>Dreamy Features</h2>
      <ul>
        <li>Soft, soothing color palette</li>
        <li>Glass morphism effects</li>
        <li>Perfect for creative portfolios</li>
        <li>Calming and peaceful vibes</li>
      </ul>
      
      <div class="pastel-card">
        <h3>Soft & Elegant</h3>
        <p>This card demonstrates the beautiful soft aesthetic with gentle gradients and subtle transparency effects.</p>
      </div>
      
      <p>Enter the dream: <a href="#" class="button">Explore Pastels</a></p>
    `
  },
  {
    name: "Ocean Blue",
    description: "Deep ocean blues with wave-like gradients",
    category: "nature",
    css: `
      body { font-family: 'Roboto', sans-serif; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #ffffff; line-height: 1.6; margin: 0; padding: 40px; background-attachment: fixed; }
      h1 { font-size: 3rem; font-weight: 700; color: #e1f5fe; margin-bottom: 1rem; text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3); }
      h2 { font-size: 2.2rem; font-weight: 600; color: #81d4fa; margin: 2rem 0 1rem; }
      h3 { font-size: 1.6rem; font-weight: 500; color: #4fc3f7; margin: 1.5rem 0 0.5rem; }
      p { margin-bottom: 1.2rem; color: #e3f2fd; }
      ul, ol { margin: 1rem 0; padding-left: 2rem; }
      li { margin-bottom: 0.5rem; color: #e3f2fd; }
      strong { color: #81d4fa; font-weight: 700; }
      em { color: #4fc3f7; font-style: italic; }
      a { color: #29b6f6; text-decoration: none; font-weight: 600; transition: all 0.3s ease; }
      a:hover { color: #03a9f4; text-shadow: 0 0 8px rgba(41, 182, 246, 0.6); }
      .button { display: inline-block; padding: 15px 30px; background: linear-gradient(45deg, #2196f3, #21cbf3); color: white; border-radius: 30px; text-decoration: none; font-weight: 600; transition: all 0.3s; box-shadow: 0 6px 20px rgba(33, 150, 243, 0.4); }
      .button:hover { transform: translateY(-3px); box-shadow: 0 10px 30px rgba(33, 150, 243, 0.6); }
      .wave-card { background: rgba(255, 255, 255, 0.1); backdrop-filter: blur(10px); border-radius: 15px; padding: 2rem; margin: 2rem 0; border: 1px solid rgba(255, 255, 255, 0.2); position: relative; overflow: hidden; }
      .wave-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 4px; background: linear-gradient(90deg, #2196f3, #21cbf3, #2196f3); }
    `,
    html: `
      <h1>Ocean Depths</h1>
      <p>Dive deep into the <strong>ocean's beauty</strong> with this <em>aquatic-inspired</em> theme featuring deep blues and wave-like gradients.</p>
      
      <h2>Aquatic Features</h2>
      <ul>
        <li>Deep ocean color palette</li>
        <li>Wave-like gradient backgrounds</li>
        <li>Calming water effects</li>
        <li>Perfect for maritime themes</li>
      </ul>
      
      <div class="wave-card">
        <h3>Deep Blue Sea</h3>
        <p>This card captures the essence of ocean depths with its translucent design and wave-inspired styling.</p>
      </div>
      
      <p>Dive deeper: <a href="#" class="button">Explore Ocean</a></p>
    `
  },
  {
    name: "Warm Autumn",
    description: "Cozy autumn colors with warm orange and brown tones",
    category: "seasonal",
    css: `
      body { font-family: 'Merriweather', serif; background: linear-gradient(135deg, #ff8a65 0%, #ffcc02 100%); color: #5d4037; line-height: 1.7; margin: 0; padding: 40px; }
      h1 { font-size: 2.8rem; font-weight: 700; color: #bf360c; margin-bottom: 1rem; text-shadow: 0 2px 4px rgba(191, 54, 12, 0.3); }
      h2 { font-size: 2.2rem; font-weight: 600; color: #d84315; margin: 2rem 0 1rem; }
      h3 { font-size: 1.6rem; font-weight: 500; color: #ff5722; margin: 1.5rem 0 0.5rem; }
      p { margin-bottom: 1.3rem; color: #6d4c41; }
      ul, ol { margin: 1rem 0; padding-left: 2rem; }
      li { margin-bottom: 0.6rem; color: #6d4c41; }
      strong { color: #bf360c; font-weight: 700; }
      em { color: #ff5722; font-style: italic; }
      a { color: #e65100; text-decoration: none; font-weight: 600; transition: all 0.3s ease; }
      a:hover { color: #d84315; text-shadow: 0 1px 3px rgba(216, 67, 21, 0.3); }
      .button { display: inline-block; padding: 14px 28px; background: linear-gradient(135deg, #ff6f00, #ff8f00); color: white; border-radius: 8px; text-decoration: none; font-weight: 600; transition: all 0.3s; box-shadow: 0 4px 15px rgba(255, 111, 0, 0.3); }
      .button:hover { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(255, 111, 0, 0.4); }
      .autumn-card { background: rgba(255, 255, 255, 0.9); border-radius: 12px; padding: 2rem; margin: 2rem 0; box-shadow: 0 8px 32px rgba(139, 69, 19, 0.2); border-left: 5px solid #ff6f00; }
    `,
    html: `
      <h1>Autumn Warmth</h1>
      <p>Embrace the <strong>cozy season</strong> with this <em>warm autumn</em> theme featuring rich oranges, browns, and golden hues.</p>
      
      <h2>Seasonal Features</h2>
      <ul>
        <li>Warm autumn color palette</li>
        <li>Cozy, inviting atmosphere</li>
        <li>Perfect for seasonal content</li>
        <li>Evokes comfort and warmth</li>
      </ul>
      
      <div class="autumn-card">
        <h3>Harvest Season</h3>
        <p>This design captures the essence of autumn with its warm, inviting colors that remind us of fallen leaves and cozy evenings.</p>
      </div>
      
      <p>Feel the warmth: <a href="#" class="button">Embrace Autumn</a></p>
    `
  },
  {
    name: "Midnight Purple",
    description: "Elegant purple theme with mysterious midnight vibes",
    category: "dark",
    css: `
      body { font-family: 'Playfair Display', serif; background: linear-gradient(135deg, #2d1b69 0%, #11998e 100%); color: #e1bee7; line-height: 1.6; margin: 0; padding: 40px; }
      h1 { font-size: 3rem; font-weight: 700; color: #ce93d8; margin-bottom: 1rem; text-shadow: 0 0 20px rgba(206, 147, 216, 0.5); }
      h2 { font-size: 2.2rem; font-weight: 600; color: #ba68c8; margin: 2rem 0 1rem; }
      h3 { font-size: 1.6rem; font-weight: 500; color: #ab47bc; margin: 1.5rem 0 0.5rem; }
      p { margin-bottom: 1.2rem; color: #d1c4e9; }
      ul, ol { margin: 1rem 0; padding-left: 2rem; }
      li { margin-bottom: 0.5rem; color: #d1c4e9; }
      strong { color: #ce93d8; font-weight: 700; }
      em { color: #ba68c8; font-style: italic; }
      a { color: #9c27b0; text-decoration: none; font-weight: 600; transition: all 0.3s ease; }
      a:hover { color: #8e24aa; text-shadow: 0 0 10px rgba(156, 39, 176, 0.6); }
      .button { display: inline-block; padding: 15px 30px; background: linear-gradient(45deg, #673ab7, #9c27b0); color: white; border-radius: 25px; text-decoration: none; font-weight: 600; transition: all 0.3s; box-shadow: 0 6px 20px rgba(103, 58, 183, 0.4); }
      .button:hover { transform: translateY(-3px); box-shadow: 0 10px 30px rgba(103, 58, 183, 0.6); }
      .mystery-card { background: rgba(156, 39, 176, 0.1); backdrop-filter: blur(10px); border-radius: 15px; padding: 2rem; margin: 2rem 0; border: 1px solid rgba(206, 147, 216, 0.3); box-shadow: 0 8px 32px rgba(45, 27, 105, 0.3); }
    `,
    html: `
      <h1>Midnight Purple</h1>
      <p>Step into the <strong>mysterious night</strong> with this <em>elegant purple</em> theme that evokes luxury and sophistication.</p>
      
      <h2>Mystical Features</h2>
      <ul>
        <li>Luxurious purple color scheme</li>
        <li>Mysterious midnight atmosphere</li>
        <li>Perfect for premium brands</li>
        <li>Elegant and sophisticated feel</li>
      </ul>
      
      <div class="mystery-card">
        <h3>Royal Elegance</h3>
        <p>This theme combines the mystery of midnight with the luxury of royal purple, creating an atmosphere of sophistication and intrigue.</p>
      </div>
      
      <p>Enter the mystery: <a href="#" class="button">Discover Magic</a></p>
    `
  },
  {
    name: "Cyberpunk Neon",
    description: "Futuristic cyberpunk with electric neon accents",
    category: "futuristic",
    css: `
      body { font-family: 'Orbitron', 'Courier New', monospace; background: #000510; color: #00d4ff; line-height: 1.6; margin: 0; padding: 40px; background-image: repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(0, 212, 255, 0.03) 2px, rgba(0, 212, 255, 0.03) 4px); }
      h1 { font-size: 3rem; font-weight: 900; color: #ff0080; margin-bottom: 1rem; text-shadow: 0 0 10px #ff0080, 0 0 20px #ff0080; text-transform: uppercase; letter-spacing: 0.2em; border-bottom: 2px solid #00d4ff; padding-bottom: 0.5rem; }
      h2 { font-size: 2rem; font-weight: 700; color: #00ff88; margin: 2rem 0 1rem; text-shadow: 0 0 5px #00ff88; text-transform: uppercase; }
      h3 { font-size: 1.5rem; font-weight: 600; color: #ffff00; margin: 1.5rem 0 0.5rem; text-shadow: 0 0 5px #ffff00; }
      p { margin-bottom: 1.2rem; color: #b3e5fc; text-shadow: 0 0 2px #00d4ff; }
      ul, ol { margin: 1rem 0; padding-left: 2rem; }
      li { margin-bottom: 0.5rem; color: #b3e5fc; }
      strong { color: #ff0080; font-weight: 900; text-shadow: 0 0 5px #ff0080; }
      em { color: #00ff88; font-style: italic; text-shadow: 0 0 3px #00ff88; }
      a { color: #00d4ff; text-decoration: none; font-weight: 700; text-shadow: 0 0 5px #00d4ff; transition: all 0.3s ease; }
      a:hover { color: #ffffff; text-shadow: 0 0 10px #00d4ff, 0 0 20px #00d4ff; }
      .button { display: inline-block; padding: 15px 30px; background: linear-gradient(45deg, #ff0080, #00d4ff); color: #000; border: 2px solid #00ff88; text-decoration: none; font-weight: 900; transition: all 0.3s; box-shadow: 0 0 20px rgba(255, 0, 128, 0.5); text-transform: uppercase; letter-spacing: 0.1em; }
      .button:hover { box-shadow: 0 0 30px rgba(255, 0, 128, 0.8), 0 0 30px rgba(0, 212, 255, 0.8); transform: scale(1.05); }
      .cyber-box { border: 2px solid #00ff88; padding: 2rem; margin: 2rem 0; background: rgba(0, 255, 136, 0.05); box-shadow: inset 0 0 20px rgba(0, 255, 136, 0.1), 0 0 20px rgba(0, 255, 136, 0.2); position: relative; }
      .cyber-box::before { content: ''; position: absolute; top: -2px; left: -2px; right: -2px; bottom: -2px; background: linear-gradient(45deg, #ff0080, #00d4ff, #00ff88, #ffff00); z-index: -1; animation: borderGlow 3s linear infinite; }
      @keyframes borderGlow { 0% { filter: hue-rotate(0deg); } 100% { filter: hue-rotate(360deg); } }
    `,
    html: `
      <h1>Cyberpunk Neon</h1>
      <p>Enter the <strong>digital future</strong> with this <em>high-tech cyberpunk</em> theme featuring electric neon colors and futuristic aesthetics.</p>
      
      <h2>Future Tech Features</h2>
      <ul>
        <li>Electric neon color scheme</li>
        <li>Futuristic typography</li>
        <li>Cyberpunk aesthetics</li>
        <li>High-tech visual effects</li>
      </ul>
      
      <div class="cyber-box">
        <h3>Neural Interface</h3>
        <p>This interface showcases the cyberpunk aesthetic with animated borders and electric neon effects that pulse with digital energy.</p>
      </div>
      
      <p>Jack into the matrix: <a href="#" class="button">Enter Cyberspace</a></p>
    `
  },
  {
    name: "Vintage Paper",
    description: "Classic vintage look with aged paper textures",
    category: "vintage",
    css: `
      body { font-family: 'Times New Roman', serif; background: #f4f1e8; color: #3c2e26; line-height: 1.8; margin: 0; padding: 40px; background-image: radial-gradient(circle at 20% 50%, rgba(120, 119, 108, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(120, 119, 108, 0.1) 0%, transparent 50%); }
      h1 { font-size: 2.5rem; font-weight: 700; color: #8b4513; margin-bottom: 1rem; text-shadow: 1px 1px 2px rgba(139, 69, 19, 0.3); border-bottom: 3px double #8b4513; padding-bottom: 0.5rem; }
      h2 { font-size: 2rem; font-weight: 600; color: #a0522d; margin: 2rem 0 1rem; }
      h3 { font-size: 1.5rem; font-weight: 500; color: #cd853f; margin: 1.5rem 0 0.5rem; }
      p { margin-bottom: 1.3rem; color: #5d4e37; text-align: justify; }
      ul, ol { margin: 1rem 0; padding-left: 2rem; }
      li { margin-bottom: 0.6rem; color: #5d4e37; }
      strong { color: #8b4513; font-weight: 700; }
      em { color: #a0522d; font-style: italic; }
      a { color: #b8860b; text-decoration: underline; font-weight: 600; transition: all 0.3s ease; }
      a:hover { color: #daa520; text-shadow: 1px 1px 2px rgba(218, 165, 32, 0.3); }
      .button { display: inline-block; padding: 12px 24px; background: #8b4513; color: #f4f1e8; border: 2px solid #a0522d; text-decoration: none; font-weight: 600; transition: all 0.3s; box-shadow: 2px 2px 4px rgba(139, 69, 19, 0.3); }
      .button:hover { background: #a0522d; box-shadow: 3px 3px 6px rgba(139, 69, 19, 0.4); transform: translateY(-1px); }
      .vintage-card { background: rgba(255, 255, 255, 0.7); border: 1px solid #d2b48c; padding: 2rem; margin: 2rem 0; box-shadow: inset 0 0 10px rgba(139, 69, 19, 0.1), 2px 2px 8px rgba(139, 69, 19, 0.2); }
    `,
    html: `
      <h1>Vintage Paper</h1>
      <p>Step back in time with this <strong>classic vintage</strong> theme that evokes the <em>charm of old manuscripts</em> and aged paper documents.</p>
      
      <h2>Timeless Features</h2>
      <ul>
        <li>Aged paper color palette</li>
        <li>Classic serif typography</li>
        <li>Vintage document styling</li>
        <li>Nostalgic and elegant feel</li>
      </ul>
      
      <div class="vintage-card">
        <h3>Historical Document</h3>
        <p>This card mimics the appearance of aged paper with subtle shadows and vintage styling that transports readers to a bygone era.</p>
      </div>
      
      <p>Discover the past: <a href="#" class="button">Explore History</a></p>
    `
  },
  {
    name: "Electric Blue",
    description: "High-energy electric blue with dynamic effects",
    category: "energetic",
    css: `
      body { font-family: 'Roboto', sans-serif; background: radial-gradient(ellipse at center, #001a2e 0%, #000814 100%); color: #ffffff; line-height: 1.6; margin: 0; padding: 40px; }
      h1 { font-size: 3rem; font-weight: 900; color: #00bfff; margin-bottom: 1rem; text-shadow: 0 0 20px #00bfff, 0 0 40px #00bfff; animation: electricPulse 2s ease-in-out infinite alternate; }
      h2 { font-size: 2rem; font-weight: 700; color: #1e90ff; margin: 2rem 0 1rem; text-shadow: 0 0 10px #1e90ff; }
      h3 { font-size: 1.5rem; font-weight: 600; color: #87ceeb; margin: 1.5rem 0 0.5rem; }
      p { margin-bottom: 1.2rem; color: #e0f6ff; }
      ul, ol { margin: 1rem 0; padding-left: 2rem; }
      li { margin-bottom: 0.5rem; color: #e0f6ff; }
      strong { color: #00bfff; font-weight: 900; text-shadow: 0 0 5px #00bfff; }
      em { color: #87ceeb; font-style: italic; }
      a { color: #00bfff; text-decoration: none; font-weight: 700; transition: all 0.3s ease; }
      a:hover { color: #ffffff; text-shadow: 0 0 15px #00bfff; }
      .button { display: inline-block; padding: 15px 30px; background: linear-gradient(45deg, #0066cc, #00bfff); color: white; border-radius: 8px; text-decoration: none; font-weight: 700; transition: all 0.3s; box-shadow: 0 0 20px rgba(0, 191, 255, 0.4); border: 2px solid #00bfff; }
      .button:hover { box-shadow: 0 0 30px rgba(0, 191, 255, 0.8); transform: scale(1.05); }
      .electric-card { background: rgba(0, 191, 255, 0.1); border: 2px solid #00bfff; border-radius: 10px; padding: 2rem; margin: 2rem 0; box-shadow: 0 0 30px rgba(0, 191, 255, 0.3); position: relative; }
      .electric-card::before { content: ''; position: absolute; top: -2px; left: -2px; right: -2px; bottom: -2px; background: linear-gradient(45deg, #00bfff, #1e90ff, #00bfff); border-radius: 12px; z-index: -1; animation: electricBorder 3s linear infinite; }
      @keyframes electricPulse { from { text-shadow: 0 0 20px #00bfff, 0 0 40px #00bfff; } to { text-shadow: 0 0 30px #00bfff, 0 0 60px #00bfff, 0 0 80px #00bfff; } }
      @keyframes electricBorder { 0% { filter: hue-rotate(0deg) brightness(1); } 50% { filter: hue-rotate(180deg) brightness(1.2); } 100% { filter: hue-rotate(360deg) brightness(1); } }
    `,
    html: `
      <h1>Electric Blue</h1>
      <p>Feel the <strong>electric energy</strong> with this <em>high-voltage</em> theme featuring dynamic blue effects and pulsing animations.</p>
      
      <h2>High-Energy Features</h2>
      <ul>
        <li>Electric blue color scheme</li>
        <li>Dynamic pulsing effects</li>
        <li>High-energy animations</li>
        <li>Perfect for tech and gaming</li>
      </ul>
      
      <div class="electric-card">
        <h3>Power Surge</h3>
        <p>This card demonstrates the electric theme with animated borders and glowing effects that pulse with electrical energy.</p>
      </div>
      
      <p>Feel the power: <a href="#" class="button">Charge Up</a></p>
    `
  },
  {
    name: "Rose Gold Luxury",
    description: "Elegant rose gold with luxury aesthetics",
    category: "luxury",
    css: `
      body { font-family: 'Playfair Display', serif; background: linear-gradient(135deg, #fdf2f8 0%, #fce7f3 100%); color: #831843; line-height: 1.7; margin: 0; padding: 40px; }
      h1 { font-size: 2.8rem; font-weight: 700; background: linear-gradient(45deg, #e91e63, #f8bbd9); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; margin-bottom: 1rem; text-shadow: 0 2px 4px rgba(233, 30, 99, 0.2); }
      h2 { font-size: 2.2rem; font-weight: 600; color: #be185d; margin: 2rem 0 1rem; }
      h3 { font-size: 1.6rem; font-weight: 500; color: #db2777; margin: 1.5rem 0 0.5rem; }
      p { margin-bottom: 1.3rem; color: #9d174d; }
      ul, ol { margin: 1rem 0; padding-left: 2rem; }
      li { margin-bottom: 0.6rem; color: #9d174d; }
      strong { color: #be185d; font-weight: 700; }
      em { color: #db2777; font-style: italic; }
      a { color: #e91e63; text-decoration: none; font-weight: 600; transition: all 0.3s ease; }
      a:hover { color: #ad1457; text-shadow: 0 1px 3px rgba(233, 30, 99, 0.3); }
      .button { display: inline-block; padding: 14px 28px; background: linear-gradient(135deg, #e91e63, #f06292); color: white; border-radius: 25px; text-decoration: none; font-weight: 600; transition: all 0.3s; box-shadow: 0 4px 15px rgba(233, 30, 99, 0.3); }
      .button:hover { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(233, 30, 99, 0.4); }
      .luxury-card { background: rgba(255, 255, 255, 0.8); border: 1px solid #f8bbd9; border-radius: 15px; padding: 2rem; margin: 2rem 0; box-shadow: 0 8px 32px rgba(233, 30, 99, 0.1); position: relative; }
      .luxury-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; background: linear-gradient(90deg, #e91e63, #f8bbd9, #e91e63); border-radius: 15px 15px 0 0; }
    `,
    html: `
      <h1>Rose Gold Luxury</h1>
      <p>Indulge in <strong>sophisticated elegance</strong> with this <em>luxurious rose gold</em> theme that exudes premium quality and refinement.</p>
      
      <h2>Luxury Features</h2>
      <ul>
        <li>Elegant rose gold color palette</li>
        <li>Sophisticated typography</li>
        <li>Premium aesthetic design</li>
        <li>Perfect for luxury brands</li>
      </ul>
      
      <div class="luxury-card">
        <h3>Premium Experience</h3>
        <p>This design embodies luxury with its rose gold accents and elegant styling that speaks to discerning tastes and premium quality.</p>
      </div>
      
      <p>Experience luxury: <a href="#" class="button">Discover Elegance</a></p>
    `
  },
  {
    name: "Forest Deep",
    description: "Deep forest greens with natural textures",
    category: "nature",
    css: `
      body { font-family: 'Merriweather', serif; background: linear-gradient(135deg, #1b4332 0%, #2d5016 100%); color: #d8f3dc; line-height: 1.7; margin: 0; padding: 40px; background-image: radial-gradient(circle at 30% 70%, rgba(40, 167, 69, 0.1) 0%, transparent 50%); }
      h1 { font-size: 2.8rem; font-weight: 700; color: #95d5b2; margin-bottom: 1rem; text-shadow: 0 2px 4px rgba(27, 67, 50, 0.5); }
      h2 { font-size: 2.2rem; font-weight: 600; color: #74c69d; margin: 2rem 0 1rem; }
      h3 { font-size: 1.6rem; font-weight: 500; color: #52b788; margin: 1.5rem 0 0.5rem; }
      p { margin-bottom: 1.3rem; color: #b7e4c7; }
      ul, ol { margin: 1rem 0; padding-left: 2rem; }
      li { margin-bottom: 0.6rem; color: #b7e4c7; }
      strong { color: #95d5b2; font-weight: 700; }
      em { color: #74c69d; font-style: italic; }
      a { color: #40916c; text-decoration: none; font-weight: 600; transition: all 0.3s ease; }
      a:hover { color: #52b788; text-shadow: 0 1px 3px rgba(64, 145, 108, 0.5); }
      .button { display: inline-block; padding: 14px 28px; background: linear-gradient(135deg, #40916c, #52b788); color: white; border-radius: 8px; text-decoration: none; font-weight: 600; transition: all 0.3s; box-shadow: 0 4px 15px rgba(64, 145, 108, 0.3); }
      .button:hover { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(64, 145, 108, 0.4); }
      .forest-card { background: rgba(149, 213, 178, 0.1); border: 1px solid #52b788; border-radius: 12px; padding: 2rem; margin: 2rem 0; box-shadow: 0 8px 32px rgba(27, 67, 50, 0.3); backdrop-filter: blur(5px); }
    `,
    html: `
      <h1>Forest Deep</h1>
      <p>Immerse yourself in the <strong>depths of nature</strong> with this <em>rich forest</em> theme that captures the essence of ancient woodlands.</p>
      
      <h2>Natural Features</h2>
      <ul>
        <li>Deep forest color palette</li>
        <li>Natural, organic textures</li>
        <li>Calming woodland atmosphere</li>
        <li>Perfect for environmental content</li>
      </ul>
      
      <div class="forest-card">
        <h3>Ancient Wisdom</h3>
        <p>This design draws inspiration from the deep forest, creating a sense of tranquility and connection with the natural world.</p>
      </div>
      
      <p>Enter the forest: <a href="#" class="button">Explore Nature</a></p>
    `
  },
  {
    name: "Cosmic Purple",
    description: "Space-inspired purple with cosmic effects",
    category: "space",
    css: `
      body { font-family: 'Orbitron', sans-serif; background: radial-gradient(ellipse at center, #1a0033 0%, #000000 100%); color: #e1bee7; line-height: 1.6; margin: 0; padding: 40px; background-image: radial-gradient(2px 2px at 20px 30px, #ffffff, transparent), radial-gradient(2px 2px at 40px 70px, #ffffff, transparent), radial-gradient(1px 1px at 90px 40px, #ffffff, transparent); background-size: 100px 100px; }
      h1 { font-size: 3rem; font-weight: 900; background: linear-gradient(45deg, #9c27b0, #e91e63, #3f51b5); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; margin-bottom: 1rem; text-shadow: 0 0 30px rgba(156, 39, 176, 0.5); animation: cosmicGlow 3s ease-in-out infinite alternate; }
      h2 { font-size: 2rem; font-weight: 700; color: #ba68c8; margin: 2rem 0 1rem; text-shadow: 0 0 10px #ba68c8; }
      h3 { font-size: 1.5rem; font-weight: 600; color: #ce93d8; margin: 1.5rem 0 0.5rem; }
      p { margin-bottom: 1.2rem; color: #f3e5f5; }
      ul, ol { margin: 1rem 0; padding-left: 2rem; }
      li { margin-bottom: 0.5rem; color: #f3e5f5; }
      strong { color: #ba68c8; font-weight: 900; text-shadow: 0 0 5px #ba68c8; }
      em { color: #ce93d8; font-style: italic; }
      a { color: #9c27b0; text-decoration: none; font-weight: 700; transition: all 0.3s ease; }
      a:hover { color: #e91e63; text-shadow: 0 0 15px #e91e63; }
      .button { display: inline-block; padding: 15px 30px; background: linear-gradient(45deg, #9c27b0, #3f51b5); color: white; border-radius: 30px; text-decoration: none; font-weight: 700; transition: all 0.3s; box-shadow: 0 0 20px rgba(156, 39, 176, 0.4); border: 2px solid #ba68c8; }
      .button:hover { box-shadow: 0 0 30px rgba(156, 39, 176, 0.8), 0 0 30px rgba(233, 30, 99, 0.4); transform: scale(1.05); }
      .cosmic-card { background: rgba(156, 39, 176, 0.1); border: 2px solid #ba68c8; border-radius: 15px; padding: 2rem; margin: 2rem 0; box-shadow: 0 0 30px rgba(156, 39, 176, 0.3); position: relative; backdrop-filter: blur(5px); }
      .cosmic-card::before { content: ''; position: absolute; top: -2px; left: -2px; right: -2px; bottom: -2px; background: linear-gradient(45deg, #9c27b0, #e91e63, #3f51b5, #9c27b0); border-radius: 17px; z-index: -1; animation: cosmicBorder 4s linear infinite; }
      @keyframes cosmicGlow { from { filter: brightness(1) hue-rotate(0deg); } to { filter: brightness(1.2) hue-rotate(30deg); } }
      @keyframes cosmicBorder { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
    `,
    html: `
      <h1>Cosmic Purple</h1>
      <p>Journey through the <strong>cosmic void</strong> with this <em>space-inspired</em> theme featuring stellar purples and galactic effects.</p>
      
      <h2>Galactic Features</h2>
      <ul>
        <li>Cosmic purple color scheme</li>
        <li>Stellar background effects</li>
        <li>Space-age typography</li>
        <li>Perfect for sci-fi content</li>
      </ul>
      
      <div class="cosmic-card">
        <h3>Stellar Navigation</h3>
        <p>This interface captures the mystery and beauty of deep space with animated cosmic effects and stellar color gradients.</p>
      </div>
      
      <p>Explore the cosmos: <a href="#" class="button">Launch Mission</a></p>
    `
  },
  {
    name: "Monochrome Classic",
    description: "Timeless black and white with elegant typography",
    category: "minimal",
    css: `
      body { font-family: 'Georgia', serif; background: #ffffff; color: #2c2c2c; line-height: 1.8; margin: 0; padding: 40px; max-width: 800px; margin: 0 auto; }
      h1 { font-size: 2.5rem; font-weight: 700; color: #000000; margin-bottom: 1.5rem; border-bottom: 2px solid #000000; padding-bottom: 0.5rem; letter-spacing: -0.02em; }
      h2 { font-size: 2rem; font-weight: 600; color: #1a1a1a; margin: 2.5rem 0 1rem; }
      h3 { font-size: 1.5rem; font-weight: 500; color: #333333; margin: 2rem 0 0.5rem; }
      p { margin-bottom: 1.5rem; color: #444444; text-align: justify; }
      ul, ol { margin: 1.5rem 0; padding-left: 2rem; }
      li { margin-bottom: 0.8rem; color: #444444; }
      strong { color: #000000; font-weight: 700; }
      em { color: #666666; font-style: italic; }
      a { color: #000000; text-decoration: underline; font-weight: 600; transition: all 0.3s ease; }
      a:hover { color: #666666; }
      .button { display: inline-block; padding: 12px 24px; background: #000000; color: white; border: 2px solid #000000; text-decoration: none; font-weight: 600; transition: all 0.3s; }
      .button:hover { background: white; color: #000000; }
      .classic-card { background: #f9f9f9; border: 1px solid #e0e0e0; padding: 2rem; margin: 2rem 0; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); }
    `,
    html: `
      <h1>Monochrome Classic</h1>
      <p>Embrace the <strong>timeless elegance</strong> of black and white design with this <em>classic monochrome</em> theme that never goes out of style.</p>
      
      <h2>Classic Features</h2>
      <ul>
        <li>Timeless black and white palette</li>
        <li>Elegant serif typography</li>
        <li>Clean, readable layout</li>
        <li>Perfect for editorial content</li>
      </ul>
      
      <div class="classic-card">
        <h3>Editorial Excellence</h3>
        <p>This design focuses on readability and elegance, making it perfect for blogs, articles, and any content where typography takes center stage.</p>
      </div>
      
      <p>Discover timeless design: <a href="#" class="button">Read More</a></p>
    `
  },
  {
    name: "Tropical Sunset",
    description: "Vibrant tropical colors with sunset gradients",
    category: "tropical",
    css: `
      body { font-family: 'Poppins', sans-serif; background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%); color: #2d1b69; line-height: 1.6; margin: 0; padding: 40px; }
      h1 { font-size: 3rem; font-weight: 800; background: linear-gradient(45deg, #ff6b6b, #ffa726, #ff7043); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; margin-bottom: 1rem; text-align: center; }
      h2 { font-size: 2rem; font-weight: 600; color: #e91e63; margin: 2rem 0 1rem; }
      h3 { font-size: 1.5rem; font-weight: 500; color: #ff5722; margin: 1.5rem 0 0.5rem; }
      p { margin-bottom: 1.2rem; color: #4a148c; }
      ul, ol { margin: 1rem 0; padding-left: 2rem; }
      li { margin-bottom: 0.5rem; color: #4a148c; }
      strong { color: #e91e63; font-weight: 700; }
      em { color: #ff5722; font-style: italic; }
      a { color: #ff6b6b; text-decoration: none; font-weight: 600; transition: all 0.3s ease; }
      a:hover { color: #ff5722; text-shadow: 0 1px 3px rgba(255, 107, 107, 0.3); }
      .button { display: inline-block; padding: 15px 30px; background: linear-gradient(45deg, #ff6b6b, #ffa726); color: white; border-radius: 50px; text-decoration: none; font-weight: 600; transition: all 0.3s; box-shadow: 0 8px 15px rgba(255, 107, 107, 0.3); }
      .button:hover { transform: translateY(-3px); box-shadow: 0 15px 25px rgba(255, 107, 107, 0.5); }
      .tropical-card { background: rgba(255, 255, 255, 0.3); backdrop-filter: blur(10px); border-radius: 20px; padding: 2rem; margin: 2rem 0; border: 1px solid rgba(255, 255, 255, 0.4); box-shadow: 0 8px 32px rgba(255, 107, 107, 0.2); }
    `,
    html: `
      <h1>Tropical Sunset</h1>
      <p>Escape to paradise with this <strong>vibrant tropical</strong> theme featuring <em>sunset gradients</em> and warm, inviting colors.</p>
      
      <h2>Paradise Features</h2>
      <ul>
        <li>Vibrant tropical color palette</li>
        <li>Sunset gradient backgrounds</li>
        <li>Warm, inviting atmosphere</li>
        <li>Perfect for travel and lifestyle</li>
      </ul>
      
      <div class="tropical-card">
        <h3>Island Vibes</h3>
        <p>This design captures the essence of tropical paradise with its warm colors and dreamy gradients that evoke sunset beaches.</p>
      </div>
      
      <p>Escape to paradise: <a href="#" class="button">Book Your Trip</a></p>
    `
  },
  {
    name: "Arctic Ice",
    description: "Cool blues and whites with icy effects",
    category: "cool",
    css: `
      body { font-family: 'Roboto', sans-serif; background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%); color: #0d47a1; line-height: 1.6; margin: 0; padding: 40px; }
      h1 { font-size: 2.8rem; font-weight: 700; color: #01579b; margin-bottom: 1rem; text-shadow: 0 2px 4px rgba(1, 87, 155, 0.3); }
      h2 { font-size: 2.2rem; font-weight: 600; color: #0277bd; margin: 2rem 0 1rem; }
      h3 { font-size: 1.6rem; font-weight: 500; color: #0288d1; margin: 1.5rem 0 0.5rem; }
      p { margin-bottom: 1.3rem; color: #1565c0; }
      ul, ol { margin: 1rem 0; padding-left: 2rem; }
      li { margin-bottom: 0.6rem; color: #1565c0; }
      strong { color: #01579b; font-weight: 700; }
      em { color: #0277bd; font-style: italic; }
      a { color: #0288d1; text-decoration: none; font-weight: 600; transition: all 0.3s ease; }
      a:hover { color: #01579b; text-shadow: 0 1px 3px rgba(2, 136, 209, 0.3); }
      .button { display: inline-block; padding: 14px 28px; background: linear-gradient(135deg, #0288d1, #03a9f4); color: white; border-radius: 8px; text-decoration: none; font-weight: 600; transition: all 0.3s; box-shadow: 0 4px 15px rgba(2, 136, 209, 0.3); }
      .button:hover { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(2, 136, 209, 0.4); }
      .ice-card { background: rgba(255, 255, 255, 0.8); border: 1px solid #81d4fa; border-radius: 12px; padding: 2rem; margin: 2rem 0; box-shadow: 0 8px 32px rgba(1, 87, 155, 0.1); backdrop-filter: blur(5px); }
    `,
    html: `
      <h1>Arctic Ice</h1>
      <p>Experience the <strong>pristine beauty</strong> of the arctic with this <em>cool and refreshing</em> theme featuring icy blues and crisp whites.</p>
      
      <h2>Glacial Features</h2>
      <ul>
        <li>Cool arctic color palette</li>
        <li>Crisp, clean design</li>
        <li>Refreshing ice effects</li>
        <li>Perfect for tech and healthcare</li>
      </ul>
      
      <div class="ice-card">
        <h3>Frozen Clarity</h3>
        <p>This design embodies the clarity and purity of arctic ice with its cool color scheme and clean, minimalist approach.</p>
      </div>
      
      <p>Embrace the cold: <a href="#" class="button">Explore Arctic</a></p>
    `
  }
];

// Application state
let currentTheme = null;
let filteredThemes = [...themes];

// DOM elements
const themeList = document.getElementById('themeList');
const previewContent = document.getElementById('previewContent');
const currentThemeName = document.getElementById('currentThemeName');
const viewCodeBtn = document.getElementById('viewCodeBtn');
const searchInput = document.getElementById('searchInput');
const codeModal = document.getElementById('codeModal');
const modalBackdrop = document.getElementById('modalBackdrop');
const closeModal = document.getElementById('closeModal');
const htmlCode = document.getElementById('htmlCode');
const cssCode = document.getElementById('cssCode');

// Initialize the application
function init() {
  renderThemeList();
  setupEventListeners();
  
  // Add some initial animation
  setTimeout(() => {
    document.body.classList.add('loaded');
  }, 100);
}

// Render the theme list in the sidebar
function renderThemeList() {
  themeList.innerHTML = '';
  
  if (filteredThemes.length === 0) {
    const noResults = document.createElement('div');
    noResults.className = 'no-results';
    noResults.innerHTML = `
      <p style="text-align: center; color: var(--gray-500); padding: 2rem;">
        No themes found matching your search.
      </p>
    `;
    themeList.appendChild(noResults);
    return;
  }
  
  filteredThemes.forEach((theme, index) => {
    const themeItem = document.createElement('button');
    themeItem.className = 'theme-item';
    themeItem.setAttribute('data-category', theme.category);
    themeItem.style.animationDelay = `${index * 50}ms`;
    
    themeItem.innerHTML = `
      <div class="theme-item-name">${theme.name}</div>
      <div class="theme-item-description">${theme.description}</div>
    `;
    
    themeItem.addEventListener('click', () => selectTheme(theme, themeItem));
    themeList.appendChild(themeItem);
  });
}

// Select and apply a theme
function selectTheme(theme, themeItemElement) {
  // Update active state
  document.querySelectorAll('.theme-item').forEach(item => item.classList.remove('active'));
  themeItemElement.classList.add('active');
  
  // Update current theme
  currentTheme = theme;
  currentThemeName.textContent = theme.name;
  viewCodeBtn.disabled = false;
  
  // Apply theme to preview
  applyThemeToPreview(theme);
}

// Apply theme styles and content to preview area
function applyThemeToPreview(theme) {
  // Remove existing style element if it exists
  const existingStyle = document.getElementById('preview-theme-styles');
  if (existingStyle) {
    existingStyle.remove();
  }
  
  // Create new style element with scoped styles
  const styleElement = document.createElement('style');
  styleElement.id = 'preview-theme-styles';
  
  // Scope the CSS to only apply within the preview content
  const scopedCSS = theme.css.replace(/body\s*{/g, '.preview-content {');
  styleElement.textContent = scopedCSS;
  document.head.appendChild(styleElement);
  
  // Update preview content with fade effect
  previewContent.style.opacity = '0';
  
  setTimeout(() => {
    previewContent.innerHTML = theme.html;
    previewContent.style.opacity = '1';
  }, 150);
}

// Setup all event listeners
function setupEventListeners() {
  // Search functionality
  searchInput.addEventListener('input', handleSearch);
  
  // View code button
  viewCodeBtn.addEventListener('click', openCodeModal);
  
  // Modal controls
  closeModal.addEventListener('click', closeCodeModal);
  modalBackdrop.addEventListener('click', closeCodeModal);
  
  // Tab switching
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', (e) => switchTab(e.target.dataset.tab));
  });
  
  // Copy buttons
  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', (e) => copyCode(e.target.closest('.copy-btn').dataset.type));
  });
  
  // Keyboard shortcuts
  document.addEventListener('keydown', handleKeyboardShortcuts);
  
  // Prevent form submission on search
  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  });
}

// Handle search functionality with debouncing
let searchTimeout;
function handleSearch(e) {
  clearTimeout(searchTimeout);
  
  searchTimeout = setTimeout(() => {
    const searchTerm = e.target.value.toLowerCase().trim();
    
    if (searchTerm === '') {
      filteredThemes = [...themes];
    } else {
      filteredThemes = themes.filter(theme => 
        theme.name.toLowerCase().includes(searchTerm) || 
        theme.description.toLowerCase().includes(searchTerm) ||
        theme.category.toLowerCase().includes(searchTerm)
      );
    }
    
    renderThemeList();
    
    // Clear current selection if the current theme is not in filtered results
    if (currentTheme && !filteredThemes.includes(currentTheme)) {
      currentTheme = null;
      currentThemeName.textContent = 'Select a Theme';
      viewCodeBtn.disabled = true;
      
      // Reset preview
      const existingStyle = document.getElementById('preview-theme-styles');
      if (existingStyle) {
        existingStyle.remove();
      }
      
      previewContent.innerHTML = `
        <div class="welcome-message">
          <h2>Welcome to Theme Hub</h2>
          <p>Select a theme from the sidebar to see a live preview here.</p>
          <p>You can browse through dozens of beautiful CSS themes and copy their code instantly.</p>
        </div>
      `;
    }
  }, 300);
}

// Open the code modal
function openCodeModal() {
  if (!currentTheme) return;
  
  // Populate code sections with proper formatting
  htmlCode.textContent = formatCode(currentTheme.html, 'html');
  cssCode.textContent = formatCode(currentTheme.css, 'css');
  
  // Show modal with animation
  codeModal.classList.add('active');
  document.body.style.overflow = 'hidden';
  
  // Focus management
  closeModal.focus();
}

// Close the code modal
function closeCodeModal() {
  codeModal.classList.remove('active');
  document.body.style.overflow = 'auto';
  
  // Return focus to the view code button
  if (viewCodeBtn && !viewCodeBtn.disabled) {
    viewCodeBtn.focus();
  }
}

// Switch between HTML and CSS tabs
function switchTab(tabName) {
  // Update tab buttons
  document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
  document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
  
  // Update tab content
  document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
  document.getElementById(`${tabName}Tab`).classList.add('active');
}

// Format code for better readability
function formatCode(code, type) {
  if (type === 'css') {
    // Basic CSS formatting
    return code
      .replace(/\s*{\s*/g, ' {\n  ')
      .replace(/;\s*/g, ';\n  ')
      .replace(/\s*}\s*/g, '\n}\n\n')
      .replace(/,\s*/g, ',\n')
      .trim();
  } else if (type === 'html') {
    // Basic HTML formatting
    return code
      .replace(/></g, '>\n<')
      .replace(/^\s+|\s+$/gm, '')
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0)
      .join('\n');
  }
  return code;
}

// Copy code to clipboard with enhanced feedback
async function copyCode(type) {
  if (!currentTheme) return;
  
  const code = type === 'html' ? currentTheme.html : currentTheme.css;
  const button = document.querySelector(`[data-type="${type}"]`);
  
  if (!button) return;
  
  try {
    await navigator.clipboard.writeText(code);
    showCopySuccess(button);
  } catch (err) {
    console.error('Failed to copy code:', err);
    
    // Fallback for older browsers
    try {
      const textArea = document.createElement('textarea');
      textArea.value = code;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      showCopySuccess(button);
    } catch (fallbackErr) {
      console.error('Fallback copy failed:', fallbackErr);
      showCopyError(button);
    }
  }
}

// Show copy success feedback
function showCopySuccess(button) {
  const originalHTML = button.innerHTML;
  
  button.innerHTML = `
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <polyline points="20,6 9,17 4,12"></polyline>
    </svg>
    Copied!
  `;
  button.classList.add('copied');
  
  setTimeout(() => {
    button.innerHTML = originalHTML;
    button.classList.remove('copied');
  }, 2000);
}

// Show copy error feedback
function showCopyError(button) {
  const originalHTML = button.innerHTML;
  
  button.innerHTML = `
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="15" y1="9" x2="9" y2="15"></line>
      <line x1="9" y1="9" x2="15" y2="15"></line>
    </svg>
    Error
  `;
  
  setTimeout(() => {
    button.innerHTML = originalHTML;
  }, 2000);
}

// Handle keyboard shortcuts
function handleKeyboardShortcuts(e) {
  // Escape key to close modal
  if (e.key === 'Escape' && codeModal.classList.contains('active')) {
    closeCodeModal();
    return;
  }
  
  // Ctrl/Cmd + K to focus search
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault();
    searchInput.focus();
    searchInput.select();
    return;
  }
  
  // Ctrl/Cmd + Enter to view code (if theme is selected)
  if ((e.ctrlKey || e.metaKey) && e.key === 'Enter' && currentTheme) {
    e.preventDefault();
    openCodeModal();
    return;
  }
  
  // Arrow keys for theme navigation
  if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
    const themeItems = document.querySelectorAll('.theme-item');
    const activeItem = document.querySelector('.theme-item.active');
    
    if (themeItems.length === 0) return;
    
    let currentIndex = activeItem ? Array.from(themeItems).indexOf(activeItem) : -1;
    
    if (e.key === 'ArrowDown') {
      currentIndex = (currentIndex + 1) % themeItems.length;
    } else {
      currentIndex = currentIndex <= 0 ? themeItems.length - 1 : currentIndex - 1;
    }
    
    const targetItem = themeItems[currentIndex];
    if (targetItem) {
      e.preventDefault();
      targetItem.click();
      targetItem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', init);

// Add some performance optimizations
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    // Pause any animations when tab is not visible
    document.body.style.animationPlayState = 'paused';
  } else {
    // Resume animations when tab becomes visible
    document.body.style.animationPlayState = 'running';
  }
});

// Add error handling for theme loading
window.addEventListener('error', (e) => {
  console.error('Theme Hub Error:', e.error);
  
  // Show user-friendly error message
  if (previewContent && previewContent.innerHTML.trim() === '') {
    previewContent.innerHTML = `
      <div class="welcome-message">
        <h2>Oops! Something went wrong</h2>
        <p>There was an error loading the theme. Please try selecting another theme.</p>
        <p>If the problem persists, try refreshing the page.</p>
      </div>
    `;
  }
});