// Theme data structure
const themes = [
  {
    name: "Modern Minimal",
    description: "Clean and simple with plenty of whitespace",
    css: `
      body { font-family: 'Helvetica Neue', Arial, sans-serif; background: #ffffff; color: #333333; line-height: 1.6; margin: 0; padding: 40px; }
      h1 { font-size: 2.5rem; font-weight: 300; color: #2c3e50; margin-bottom: 1rem; letter-spacing: -0.02em; }
      h2 { font-size: 2rem; font-weight: 400; color: #34495e; margin: 2rem 0 1rem; }
      h3 { font-size: 1.5rem; font-weight: 500; color: #555; margin: 1.5rem 0 0.5rem; }
      p { margin-bottom: 1.2rem; color: #666; max-width: 65ch; }
      ul, ol { margin: 1rem 0; padding-left: 2rem; }
      li { margin-bottom: 0.5rem; color: #666; }
      strong { color: #2c3e50; font-weight: 600; }
      em { color: #7f8c8d; font-style: italic; }
      a { color: #3498db; text-decoration: none; border-bottom: 1px solid transparent; transition: border-color 0.2s; }
      a:hover { border-bottom-color: #3498db; }
      .button { display: inline-block; padding: 12px 24px; background: #3498db; color: white; border-radius: 4px; text-decoration: none; font-weight: 500; transition: background 0.2s; }
      .button:hover { background: #2980b9; border-bottom: none; }
      .highlight { background: #f8f9fa; padding: 2rem; border-left: 4px solid #3498db; margin: 2rem 0; }
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
        <p>Important information stands out with this subtle highlighting technique.</p>
      </div>
      
      <p>Ready to get started? <a href="#" class="button">Get Started</a></p>
    `
  },
  {
    name: "Dark Mode Pro",
    description: "Professional dark theme for developers",
    css: `
      body { font-family: 'SF Mono', 'Monaco', monospace; background: #0d1117; color: #c9d1d9; line-height: 1.6; margin: 0; padding: 40px; }
      h1 { font-size: 2.5rem; font-weight: 700; color: #58a6ff; margin-bottom: 1rem; text-shadow: 0 0 10px rgba(88, 166, 255, 0.3); }
      h2 { font-size: 2rem; font-weight: 600; color: #7c3aed; margin: 2rem 0 1rem; }
      h3 { font-size: 1.5rem; font-weight: 500; color: #f85149; margin: 1.5rem 0 0.5rem; }
      p { margin-bottom: 1.2rem; color: #8b949e; }
      ul, ol { margin: 1rem 0; padding-left: 2rem; }
      li { margin-bottom: 0.5rem; color: #8b949e; }
      strong { color: #58a6ff; font-weight: 700; }
      em { color: #a5a5a5; font-style: italic; }
      a { color: #58a6ff; text-decoration: none; }
      a:hover { text-decoration: underline; text-shadow: 0 0 5px rgba(88, 166, 255, 0.5); }
      .button { display: inline-block; padding: 12px 24px; background: linear-gradient(135deg, #7c3aed, #3b82f6); color: white; border-radius: 8px; text-decoration: none; font-weight: 600; transition: all 0.3s; box-shadow: 0 4px 15px rgba(124, 58, 237, 0.2); }
      .button:hover { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(124, 58, 237, 0.4); text-decoration: none; }
      .code-block { background: #161b22; border: 1px solid #30363d; border-radius: 8px; padding: 1.5rem; margin: 2rem 0; font-family: inherit; }
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
        <p>This theme uses colors inspired by popular code editors like VS Code and GitHub.</p>
      </div>
      
      <p>Experience the dark side: <a href="#" class="button">Enable Dark Mode</a></p>
    `
  },
  {
    name: "Sunset Gradient",
    description: "Warm gradients with vibrant sunset colors",
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
      a { color: #ff6b6b; text-decoration: none; font-weight: 600; }
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
      a { color: #2563eb; text-decoration: none; font-weight: 600; }
      a:hover { color: #1d4ed8; text-decoration: underline; }
      .button { display: inline-block; padding: 12px 24px; background: #1e40af; color: white; border-radius: 6px; text-decoration: none; font-weight: 600; transition: background 0.2s; box-shadow: 0 2px 4px rgba(30, 64, 175, 0.2); }
      .button:hover { background: #1d4ed8; box-shadow: 0 4px 8px rgba(30, 64, 175, 0.3); }
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
      a { color: #00ffff; text-decoration: none; font-weight: 700; text-shadow: 0 0 5px #00ffff; }
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
      a { color: #2e7d32; text-decoration: none; font-weight: 600; border-bottom: 2px solid transparent; transition: border-color 0.3s; }
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
      a { color: #06b6d4; text-decoration: none; font-weight: 500; }
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
      a { color: #29b6f6; text-decoration: none; font-weight: 600; }
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
      a { color: #e65100; text-decoration: none; font-weight: 600; }
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
      a { color: #9c27b0; text-decoration: none; font-weight: 600; }
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
}

// Render the theme list in the sidebar
function renderThemeList() {
  themeList.innerHTML = '';
  
  filteredThemes.forEach((theme, index) => {
    const themeItem = document.createElement('button');
    themeItem.className = 'theme-item';
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
  
  // Create new style element
  const styleElement = document.createElement('style');
  styleElement.id = 'preview-theme-styles';
  styleElement.textContent = `
    .preview-content {
      ${theme.css}
    }
  `;
  document.head.appendChild(styleElement);
  
  // Update preview content
  previewContent.innerHTML = theme.html;
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
    btn.addEventListener('click', (e) => copyCode(e.target.dataset.type));
  });
  
  // Keyboard shortcuts
  document.addEventListener('keydown', handleKeyboardShortcuts);
}

// Handle search functionality
function handleSearch(e) {
  const searchTerm = e.target.value.toLowerCase();
  
  filteredThemes = themes.filter(theme => 
    theme.name.toLowerCase().includes(searchTerm) || 
    theme.description.toLowerCase().includes(searchTerm)
  );
  
  renderThemeList();
}

// Open the code modal
function openCodeModal() {
  if (!currentTheme) return;
  
  // Populate code sections
  htmlCode.textContent = currentTheme.html;
  cssCode.textContent = currentTheme.css;
  
  // Show modal
  codeModal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

// Close the code modal
function closeCodeModal() {
  codeModal.classList.remove('active');
  document.body.style.overflow = 'auto';
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

// Copy code to clipboard
async function copyCode(type) {
  const code = type === 'html' ? currentTheme.html : currentTheme.css;
  const button = document.querySelector(`[data-type="${type}"]`);
  
  try {
    await navigator.clipboard.writeText(code);
    
    // Show success feedback
    const originalText = button.innerHTML;
    button.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="20,6 9,17 4,12"></polyline>
      </svg>
      Copied!
    `;
    button.classList.add('copied');
    
    setTimeout(() => {
      button.innerHTML = originalText;
      button.classList.remove('copied');
    }, 2000);
    
  } catch (err) {
    console.error('Failed to copy code:', err);
    
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = code;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    
    // Show feedback
    button.textContent = 'Copied!';
    button.classList.add('copied');
    setTimeout(() => {
      button.innerHTML = originalText;
      button.classList.remove('copied');
    }, 2000);
  }
}

// Handle keyboard shortcuts
function handleKeyboardShortcuts(e) {
  // Escape key to close modal
  if (e.key === 'Escape' && codeModal.classList.contains('active')) {
    closeCodeModal();
  }
  
  // Ctrl/Cmd + K to focus search
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault();
    searchInput.focus();
  }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', init);