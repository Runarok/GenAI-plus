// --- FORMATTERS ---
function formatHTML(html, tab = '  ')
{
  html = html.replace(/>\s+</g, '>\n<').replace(/^\s+|\s+$/gm, '');
  const lines = html.split('\n');
  let indent = '';
  let result = '';
  const voidTags = [
  'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link',
  'meta', 'source', 'track', 'wbr'
  ];
  const isVoid = tag =>
  voidTags.includes(tag.replace(/^<\/*|\s.*$/g, '').replace('/', '').toLowerCase());
  for (let i = 0;
  i < lines.length;
  i++)
  {
    let line = lines[i].trim();
    if (!line) continue;
    if (/^<\/\w/.test(line))
    {
      indent = indent.slice(tab.length);
    }
    result += indent + line + '\n';
    if (
    /^<\w/.test(line) &&
    !/^<.*\/>$/.test(line) &&
    !isVoid(line) &&
    !/^<!/.test(line) &&
    !/<script\b|<style\b/i.test(line)
    )
    {
      indent += tab;
    }
    if (/^<\/(script|style)>/i.test(line))
    {
      indent = indent.slice(tab.length);
    }
  }
  return result.trim();
}
function formatCSS(css)
{
  if (!css) return '';
  try
  {
    let formatted = css
    .replace(/([
    {
    }
    ])/g, '\n$1\n')
    .replace(/;
    /g, ';
    \n')
    .replace(/\n\s*\n/g, '\n')
    .split('\n')
    .map(line => line.trim())
    .filter(line => line)
    .map(line =>
    {
      if (line === '
      {
        ' || line === '
      }
      ') return line;
      return '  ' + line;
    }
    )
    .join('\n');
    let out = '';
    let indent = '';
    for (let line of formatted.split('\n'))
    {
      if (line === '
    }
    ') indent = indent.slice(2);
    out += indent + line + '\n';
    if (line === '
    {
      ') indent += '  ';
    }
    return out.trim();
  }
  catch
  {
    return css;
  }
}
function formatJS(js)
{
  if (!js) return '';
  try
  {
    let formatted = js
    .replace(/([
    {
    }
    ])/g, '\n$1\n')
    .replace(/;
    /g, ';
    \n')
    .replace(/\n\s*\n/g, '\n')
    .split('\n')
    .map(line => line.trim())
    .filter(line => line)
    .join('\n');
    let out = '';
    let indent = '';
    for (let line of formatted.split('\n'))
    {
      if (line === '
    }
    ') indent = indent.slice(2);
    out += indent + line + '\n';
    if (line === '
    {
      ') indent += '  ';
    }
    return out.trim();
  }
  catch
  {
    return js;
  }
}
function extractParts(htmlString)
{
  let jsParts = [], cssParts = [];
  htmlString = htmlString.replace(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi, function(match, attrs, content)
  {
    if (attrs && /\bsrc\s*=/.test(attrs)) return match;
    jsParts.push(content.trim());
    return '';
  }
  );
  htmlString = htmlString.replace(/<style\b([^>]*)>([\s\S]*?)<\/style>/gi, function(match, attrs, content)
  {
    cssParts.push(content.trim());
    return '';
  }
  );
  htmlString = htmlString.replace(/^\s*[\r\n]/gm, '');
  return
  {
    html: htmlString.trim(),
    js: jsParts.join('\n\n').trim(),
    css: cssParts.join('\n\n').trim()
  }
  ;
}
function injectLinks(html, jsFile, cssFile)
{
  let doc = document.implementation.createHTMLDocument('');
  doc.documentElement.innerHTML = html;
  let head = doc.querySelector('head');
  if (!head)
  {
    head = doc.createElement('head');
    if (doc.documentElement.firstChild)
    {
      doc.documentElement.insertBefore(head, doc.documentElement.firstChild);
    }
    else
    {
      doc.documentElement.appendChild(head);
    }
  }
  let faviconUrl = "https://raw.githubusercontent.com/Runarok/GenAI-plus/main/GenAI-plus.png";
  if (!head.querySelector('link[rel="icon"]'))
  {
    let icon = doc.createElement('link');
    icon.rel = "icon";
    icon.href = faviconUrl;
    icon.type = "image/png";
    head.appendChild(icon);
  }
  if (!head.querySelector(`link[rel="stylesheet"][href="$
  {
    cssFile
  }
  "]`))
  {
    let cssLink = doc.createElement('link');
    cssLink.rel = "stylesheet";
    cssLink.type = "text/css";
    cssLink.href = cssFile;
    head.appendChild(cssLink);
  }
  let script = doc.createElement('script');
  script.src = jsFile;
  let body = doc.querySelector('body');
  if (body)
  {
    body.appendChild(script);
  }
  else
  {
    doc.documentElement.appendChild(script);
  }
  let raw = "<!DOCTYPE html>\n" + doc.documentElement.outerHTML.replace(/^\s+|\s+$/g, '');
  return formatHTML(raw);
}
function downloadFile(filename, content)
{
  const blob = new Blob([content],
  {
    type: 'text/plain'
  }
  );
  const url = URL.createObjectURL(blob);
  let a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  setTimeout(() =>
  {
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
  , 200);
}
function downloadAllSeparate()
{
  const html = document.getElementById('html-output').value;
  const css = document.getElementById('css-output').value;
  const js = document.getElementById('js-output').value;
  if (html) downloadFile('index.html', html);
  if (css) downloadFile('style.css', css);
  if (js) downloadFile('script.js', js);
}
function downloadAllZip()
{
  const html = document.getElementById('html-output').value;
  const css = document.getElementById('css-output').value;
  const js = document.getElementById('js-output').value;
  if (!html && !css && !js) return;
  const zipScriptUrl = 'https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js';
  function doZip()
  {
    const zip = new JSZip();
    if (html) zip.file('index.html', html);
    if (css) zip.file('style.css', css);
    if (js) zip.file('script.js', js);
    zip.generateAsync(
    {
      type: "blob"
    }
    ).then(function (blob)
    {
      let a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'html-extract.zip';
      document.body.appendChild(a);
      a.click();
      setTimeout(() =>
      {
        document.body.removeChild(a);
      }
      , 200);
    }
    );
  }
  if (!window.JSZip)
  {
    let script = document.createElement('script');
    script.src = zipScriptUrl;
    script.onload = doZip;
    document.body.appendChild(script);
  }
  else
  {
    doZip();
  }
}
// --- Drag and Drop Area ---
const droparea = document.getElementById('droparea');
droparea.addEventListener('dragover', (e) =>
{
  e.preventDefault();
  droparea.classList.add('dragover');
  droparea.textContent = "Drop your HTML file here";
}
);
droparea.addEventListener('dragleave', (e) =>
{
  droparea.classList.remove('dragover');
  droparea.textContent = "Drag & Drop HTML file here, or click to select";
}
);
droparea.addEventListener('drop', (e) =>
{
  e.preventDefault();
  droparea.classList.remove('dragover');
  const file = e.dataTransfer.files[0];
  if (!file || !file.name.match(/\.html?$/i))
  {
    droparea.textContent = "Please drop a valid .html file!";
    return;
  }
  const reader = new FileReader();
  reader.onload = function(evt)
  {
    document.getElementById('input-html').value = evt.target.result;
    droparea.textContent = "Loaded: " + file.name;
  }
  ;
  reader.readAsText(file);
}
);
droparea.addEventListener('click', () =>
{
  let input = document.createElement('input');
  input.type = 'file';
  input.accept = '.htm,.html,text/html';
  input.onchange = function(e)
  {
    let file = input.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(evt)
    {
      document.getElementById('input-html').value = evt.target.result;
      droparea.textContent = "Loaded: " + file.name;
    }
    ;
    reader.readAsText(file);
  }
  ;
  input.click();
}
);
// Tab logic
const tabBtns = Array.from(document.querySelectorAll('.tab-btn'));
const tabContents =
{
  html: document.getElementById('tab-html'),
  css: document.getElementById('tab-css'),
  js: document.getElementById('tab-js')
}
;
tabBtns.forEach(btn =>
{
  btn.addEventListener('click', () =>
  {
    tabBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    Object.keys(tabContents).forEach(k => tabContents[k].classList.remove('active'));
    tabContents[btn.dataset.tab].classList.add('active');
  }
  );
}
);
document.getElementById('split-btn').onclick = function()
{
  const input = document.getElementById('input-html').value.trim();
  if (!input)
  {
    alert('Please paste valid HTML code or load a file!');
    return;
  }
  const parts = extractParts(input);
  const cssFile = "style.css";
  const jsFile = "script.js";
  const htmlFile = "index.html";
  const linkedHtml = injectLinks(parts.html, jsFile, cssFile);
  document.getElementById('html-output').value = linkedHtml;
  document.getElementById('css-output').value = formatCSS(parts.css);
  document.getElementById('js-output').value = formatJS(parts.js);
}
;
document.getElementById('clear-btn').onclick = function()
{
  document.getElementById('input-html').value = '';
  document.getElementById('html-output').value = '';
  document.getElementById('css-output').value = '';
  document.getElementById('js-output').value = '';
  droparea.textContent = "Drag & Drop HTML file here, or click to select";
}
;
// --- Download menu logic ---
const menuBtn = document.getElementById('download-menu-trigger');
const menu = document.getElementById('download-menu');
menuBtn.addEventListener('click', function(e)
{
  e.stopPropagation();
  menuBtn.classList.toggle('active');
  menu.classList.toggle('active');
}
);
document.addEventListener('click', function()
{
  menuBtn.classList.remove('active');
  menu.classList.remove('active');
}
);
menu.addEventListener('click', function(e)
{
  e.stopPropagation();
}
);
// Download menu buttons
document.getElementById('download-zip').onclick = function()
{
  downloadAllZip();
  menuBtn.classList.remove('active');
  menu.classList.remove('active');
}
;
document.getElementById('download-all-separate').onclick = function()
{
  downloadAllSeparate();
  menuBtn.classList.remove('active');
  menu.classList.remove('active');
}
;
document.getElementById('download-html-all').onclick = function()
{
  downloadFile('index.html', document.getElementById('html-output').value);
  menuBtn.classList.remove('active');
  menu.classList.remove('active');
}
;
document.getElementById('download-css-all').onclick = function()
{
  downloadFile('style.css', document.getElementById('css-output').value);
  menuBtn.classList.remove('active');
  menu.classList.remove('active');
}
;
document.getElementById('download-js-all').onclick = function()
{
  downloadFile('script.js', document.getElementById('js-output').value);
  menuBtn.classList.remove('active');
  menu.classList.remove('active');
}
;