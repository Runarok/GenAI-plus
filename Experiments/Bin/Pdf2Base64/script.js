    const pdfjsLib = window['pdfjs-dist/build/pdf'];
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

    const outputDiv = document.getElementById('output');
    const allBase64Text = document.getElementById('all-base64-text');
    const loadingDiv = document.getElementById('loading');
    const searchInput = document.getElementById('searchInput');

    let pdfDoc = null;
    let base64Map = {};
    let pageCount = 0;

    function switchTab(tabId) {
      document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(tc => tc.classList.remove('active'));
      document.querySelector(`[onclick="switchTab('${tabId}')"]`).classList.add('active');
      document.getElementById(tabId).classList.add('active');
    }

    document.getElementById('pdf-upload').addEventListener('change', async (e) => {
      const file = e.target.files[0];
      if (!file) return;

      base64Map = {};
      outputDiv.innerHTML = '';
      allBase64Text.value = '';
      loadingDiv.textContent = 'Loading PDF...';

      const fileReader = new FileReader();
      fileReader.onload = async function () {
        const typedArray = new Uint8Array(this.result);
        pdfDoc = await pdfjsLib.getDocument({ data: typedArray }).promise;
        pageCount = pdfDoc.numPages;

        for (let i = 1; i <= pageCount; i++) {
          const placeholder = document.createElement('div');
          placeholder.className = 'page-card';
          placeholder.id = `page-${i}`;
          placeholder.innerHTML = `<h3>Page ${i}</h3><div class="canvas-container"></div><textarea readonly></textarea><button disabled>Copy Base64</button>`;
          outputDiv.appendChild(placeholder);
        }

        setupLazyLoading();
        gradualAllBase64Update(); // Start gradual all base64 update
        switchTab('pages-tab');
        loadingDiv.textContent = '';
      };

      fileReader.readAsArrayBuffer(file);
    });

    function setupLazyLoading() {
      const options = {
        root: null,
        rootMargin: "300px",
        threshold: 0.1
      };

      const observer = new IntersectionObserver(async (entries, obs) => {
        for (let entry of entries) {
          if (entry.isIntersecting) {
            const card = entry.target;
            const pageNum = parseInt(card.id.replace('page-', ''));
            if (card.dataset.rendered) continue;

            const canvasContainer = card.querySelector('.canvas-container');
            const textarea = card.querySelector('textarea');
            const button = card.querySelector('button');

            const page = await pdfDoc.getPage(pageNum);
            const viewport = page.getViewport({ scale: 1.5 });

            const canvas = document.createElement("canvas");
            const context = canvas.getContext("2d");
            canvas.width = viewport.width;
            canvas.height = viewport.height;

            await page.render({ canvasContext: context, viewport: viewport }).promise;
            canvasContainer.appendChild(canvas);

            const base64 = canvas.toDataURL("image/png");
            base64Map[pageNum] = base64;
            textarea.value = base64;
            button.disabled = false;
            button.textContent = "Copy Base64";
            button.onclick = () => {
              textarea.select();
              document.execCommand("copy");
              button.textContent = "Copied!";
              setTimeout(() => button.textContent = "Copy Base64", 1000);
            };

            card.dataset.rendered = "true";
          }
        }
      }, options);

      document.querySelectorAll('.page-card').forEach(card => observer.observe(card));
    }

    // Gradual updating for all base64 textarea
    async function gradualAllBase64Update() {
      allBase64Text.value = '';
      for (let i = 1; i <= pageCount; i++) {
        if (!base64Map[i]) {
          // Render page base64 if not ready (force render to get base64 without canvas)
          const page = await pdfDoc.getPage(i);
          const viewport = page.getViewport({ scale: 0.7 }); // smaller scale for speed

          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          canvas.width = viewport.width;
          canvas.height = viewport.height;
          await page.render({ canvasContext: ctx, viewport }).promise;
          const base64 = canvas.toDataURL('image/png');
          base64Map[i] = base64;
        }
        allBase64Text.value += base64Map[i] + '\n\n';

        // Slowly update textarea to avoid freezing (chunk every 5 pages)
        if (i % 5 === 0) {
          await new Promise(r => setTimeout(r, 50));
        }
      }
    }

    function copyAllBase64() {
      allBase64Text.select();
      document.execCommand("copy");
    }

    searchInput.addEventListener('input', () => {
      const val = searchInput.value.trim();
      document.querySelectorAll('.page-card').forEach(card => {
        const pageNum = card.id.replace('page-', '');
        card.style.display = val === '' || pageNum.includes(val) ? 'block' : 'none';
      });
    });