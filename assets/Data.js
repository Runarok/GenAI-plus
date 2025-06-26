const menuData = [
  {
    id: "games",
    title: "Games",
    links: [
      { label: "Checkers", url: "Games/Checkers/index.html", desc: "Classic strategic boardgame." },            
      { label: "Cyper Type", url: "Games/Cyper Type/index.html", desc: "Type Falling text." },
      { label: "Reflex Rush", url: "Games/Reflex Rush/index.html", desc: "Rapid Response Test." },
      { label: "Simon Says", url: "Games/Simon Says/index.html", desc: "Memory pattern light game." },
      { label: "Space Dash", url: "Games/Space Dash/index.html", desc: "Space Dash." },
      { label: "Sudoku", url: "Games/Sudoku/index.html", desc: "Sudoku." }
    ]
  },
  {
    id: "college",
    title: "College",
    links: [
  { label: "CPU Scheduler", url: "College/CPU Scheduler/index.html", desc: "Visualize CPU scheduling algorithms." },
  { label: "Paging Algorithms", url: "College/Paging Algorithms/index.html", desc: "Demonstrate memory paging techniques." },
  { label: "Memory Allocation", url: "College/Memory Allocation/index.html", desc: "Explore memory allocation methods." },
  { label: "Bankers Algorithm", url: "College/Memory Allocation/index.html", desc: "Simulate Banker's deadlock avoidance." },
  { label: "Cipher Programs", url: "College/Cipher Programs/index.html", desc: "Demo classical cryptographic ciphers." },
  { label: "Internet of Things", url: "College/LABS/Internet of Things/index.html", desc: "Hands-on IoT projects and demos." },
  { label: "Embedded Systems", url: "College/LABS/Embedded Systems/index.html", desc: "Explore embedded system projects." }
]
  },
  {
    id: "tools",
    title: "Tools",
    links: [
      { label: "Calculator", url: "Tools/Calculator/index.html", desc: "Simple math calculator." },
      { label: "Cheat Sheets", url: "Tools/CheatSheets/index.html", desc: "CheatSheets for Remembering." },
      { label: "HTML Editor", url: "Tools/HTML Editor/index.html", desc: "Live HTML editor." },
      { label: "HTML Merger", url: "Tools/HTML Merger/index.html", desc: "Inline HTML, CSS, JS with preview." },
      { label: "HTML Splitter", url: "Tools/HTML Splitter/index.html", desc: "Splits code into HTML, CSS, and JS." },
      { label: "Markdown Editor", url: "Tools/MarkDown/index.html", desc: "Live Github markdown." },
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
    { "label": "Extras", "url": "Experiments/Extras/index.html", "desc": "Useful/specific projects that don't fit elsewhere." },
    { "label": "Anime Merch", "url": "Experiments/AnimeMerch/index.html", "desc": "Just front end." }
  ]
},
  {
    id: "about",
    title: "About",
    links: [
      { label: "Project Info", url: "about.html", desc: "Learn more about this hub." },
      { label: "Contact", url: "contact.html", desc: "Get in touch." }
    ]
  }
];

// Sort links within each category alphabetically by label
menuData.forEach(category => {
  category.links.sort((a, b) => a.label.localeCompare(b.label));
});
