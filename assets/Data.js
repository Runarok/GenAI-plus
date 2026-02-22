const menuData = [
  {
    id: "college",
    title: "College",
    links: [
  { label: "CPU Scheduler", url: "College/CPU Scheduler/index.html", desc: "Visualize CPU scheduling algorithms." },
  { label: "Paging Algorithms", url: "College/Paging Algorithms/index.html", desc: "Demonstrate memory paging techniques." },
  { label: "Memory Allocation", url: "College/Memory Allocation/index.html", desc: "Explore memory allocation methods." },
  { label: "Bankers Algorithm", url: "College/Bankers Algorithm/index.html", desc: "Simulate Banker's deadlock avoidance." },
  { label: "Cipher Programs", url: "College/Cipher Programs/index.html", desc: "Demo classical cryptographic ciphers." },
  { label: "Internet of Things", url: "College/LABS/Internet of Things/index.html", desc: "Hands-on IoT projects and demos." },
  { label: "Embedded Systems", url: "College/LABS/Embedded Systems/index.html", desc: "Explore embedded system projects." },
  { label: "Python Projects", url: "College/Python/index.html", desc: "Explore Simple Python projects." },
  { label: "SDLC v1", url: "College/SDLC/SDLC v1/index.html", desc: "SDLC Project version 2." },
  { label: "SDLC v2", url: "College/SDLC/SDLC v2/index.html", desc: "SDLC Project version 2." },
  { label: "Project Review", url: "College/Proj Review/index.html", desc: "Proj Review Details of Phase 2" },
  { label: "Computer Science Quiz", url: "College/CS Quiz/index.html", desc: "Internship Quiz" },
  { label: "SE Mod 4 & 5", url: "College/SE 45/index.html", desc: "SE Mod 4n5 Imp Concepts" },
  { label: "College Quotes", url: "College/Quotes/index.html", desc: "Quotes around ECE Block." },
  { label: "Control Networks", url: "College/CNP/index.html", desc: "Control Networks Protocol Programs." },
  { label: "Python Quiz Framework", url: "College/Quiz/index.html", desc: "OOP-based Python quiz (~1k lines)." }
   ]
  },
  {
    id: "games",
    title: "Games",
    links: [
      { label: "Checkers", url: "Games/Checkers/index.html", desc: "Classic strategic boardgame." },            
      { label: "Cyper Type", url: "Games/Cyper Type/index.html", desc: "Type Falling text." },
      { label: "Reflex Rush", url: "Games/Reflex Rush/index.html", desc: "Rapid Response Test." },
      { label: "Simon Says", url: "Games/Simon Says/index.html", desc: "Memory pattern light game." },
      { label: "Space Dash", url: "Games/Space Dash/index.html", desc: "Space Dash." },
      { label: "Skyward Ascent", url: "Games/Skyward Ascent/index.html", desc: "Fancy Doodle Jump." },
      { label: "Sudoku", url: "Games/Sudoku/index.html", desc: "Sudoku." },
      { label: "Stone Story Guide", url: "Games/Stone Story/index.html", desc: "Stone Story Helping Guide." }
    ]
  },
  {
    id: "tools",
    title: "Tools",
    links: [
      { label: "Calculator", url: "Tools/Calculator/index.html", desc: "Simple math calculator." },
      { label: "Cheat Sheets", url: "Tools/CheatSheets/index.html", desc: "CheatSheets for Remembering." },
      { label: "HTML Editor", url: "Tools/HTML Editor/index.html", desc: "Live HTML editor." },
      { label: "Image Base64", url: "Tools/Base64CropImage/index.html", desc: "Base64 & Image conversion." },
      { label: "HTML Merger", url: "Tools/HTML Merger/index.html", desc: "Inline HTML, CSS, JS with preview." },
      { label: "HTML Splitter", url: "Tools/HTML Splitter/index.html", desc: "Splits code into HTML, CSS, and JS." },
      { label: "HTML Split v2", url: "Tools/HTML Splitter v2/index.html", desc: "Better Working and Minimalistic." },
      { label: "Markdown Editor", url: "Tools/MarkDown/index.html", desc: "Live Github markdown." },
      { label: "SVG Editor", url: "Tools/Svg Edit/index.html", desc: "Live SVG Editor." },
      { label: "Morse Code", url: "Tools/MorseCode/index.html",  desc: "Live MorseCode." },
      { label: "LocalStorage  Viewer", url: "Tools/LocalStorage/index.html",  desc: "View LocalStorage." },
      { label: "Matrix Generator", url: "Tools/Matrix_Gen/index.html",  desc: "Random Matrix Generator." },
      { label: "Brightness Gradient", url: "Tools/Brightness Gradient/index.html",  desc: "Brightness Gradient Image Editor." },
      { label: "Themes", url: "Tools/Theme/index.html", desc: "Few Themes." }
    ]
  },
{
  "id": "experiments",
  "title": "Experiments",
  "links": [
    { "label": "Productive-Tips", "url": "Experiments/Productive/index.html", "desc": "Be more productive." },
    { "label": "Quotes", "url": "Experiments/Quotes/index.html", "desc": "Fav Quotes/Words." },
    { "label": "Sandbox", "url": "Experiments/Sandbox/Sandbox.html", "desc": "Try out ideas in the sandbox." },
    { "label": "SnarkBot", "url": "Experiments/AI Chat/SnarkBot/index.html", "desc": "Snarky AI bot." },
    { "label": "Bin", "url": "Experiments/Bin/index.html", "desc": "Trash/projects that failed or were ditched." },
    { "label": "MBTI test", "url": "Experiments/Type/index.html", "desc": "MBTI Personality Test." },
    { "label": "CS-v0", "url": "Experiments/Choice Spinner/v0/index.html", "desc": "Choice Spinner v0." },
    { "label": "CS-Bolt", "url": "Experiments/Choice Spinner/Bolt/index.html", "desc": "Choice Spinner Bolt." },
    { "label": "Extras", "url": "Experiments/Extras/index.html", "desc": "Useful/specific projects that don't fit elsewhere." }
  ]
},
  {
    id: "about",
    title: "About",
    links: [
      { label: "About me", url: "About/index.html?page=about", desc: "Mindset, tools, and flow." },
      { label: "Project Info", url: "About/index.html?page=hub", desc: "Learn more about this hub." },
      { label: "Contact", url: "About/index.html?page=contact", desc: "Get in touch." }
    ]
  }
];

// Sort links within each category alphabetically by label
menuData.forEach(category => {
  category.links.sort((a, b) => a.label.localeCompare(b.label));
});
