        let currentImage = null;
        let cropper = null;
        let rotationAngle = 0;
        
        // Theme switching
        document.querySelectorAll('.theme-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const theme = btn.dataset.theme;
                document.body.dataset.theme = theme;
                
                document.querySelectorAll('.theme-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                localStorage.setItem('theme', theme);
            });
        });
        
        // Load saved theme
        const savedTheme = localStorage.getItem('theme') || 'dark';
        document.body.dataset.theme = savedTheme;
        document.querySelector(`[data-theme="${savedTheme}"]`).classList.add('active');
        document.querySelectorAll('.theme-btn').forEach(b => {
            if (b.dataset.theme !== savedTheme) b.classList.remove('active');
        });
        
        // Tab switching
        document.querySelectorAll('.tab').forEach(tab => {
            tab.addEventListener('click', () => {
                const tabName = tab.dataset.tab;
                
                document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
                document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
                
                tab.classList.add('active');
                document.querySelector(`[data-content="${tabName}"]`).classList.add('active');
            });
        });
        
        function showToast(message, type = 'success') {
            const toast = document.getElementById('toast');
            toast.textContent = message;
            toast.className = `toast ${type}`;
            toast.classList.add('show');
            
            setTimeout(() => {
                toast.classList.remove('show');
            }, 3000);
        }
        
        function updateImage() {
            const base64Input = document.getElementById('base64Input').value.trim();
            const imageDisplay = document.getElementById('imageDisplay');
            
            if (!base64Input) {
                imageDisplay.innerHTML = '<div class="placeholder"><p>No image to display</p><p>Enter Base64 text or upload an image</p></div>';
                toggleImageControls(false);
                return;
            }
            
            try {
                let base64Data = base64Input;
                
                // Check if it already has data URL prefix
                if (!base64Data.startsWith('data:')) {
                    // Try to detect image type or default to PNG
                    base64Data = `data:image/png;base64,${base64Data}`;
                }
                
                const img = document.createElement('img');
                img.onload = () => {
                    imageDisplay.innerHTML = '';
                    imageDisplay.appendChild(img);
                    currentImage = img;
                    toggleImageControls(true);
                };
                
                img.onerror = () => {
                    imageDisplay.innerHTML = '<div class="placeholder"><p>Invalid Base64 image data</p><p>Please check your input</p></div>';
                    toggleImageControls(false);
                };
                
                img.src = base64Data;
                
            } catch (error) {
                imageDisplay.innerHTML = '<div class="placeholder"><p>Error loading image</p><p>Invalid Base64 format</p></div>';
                toggleImageControls(false);
            }
        }
        
        function toggleImageControls(enabled) {
            const controls = ['downloadBtn', 'rotateBtn', 'cropBtn'];
            controls.forEach(id => {
                document.getElementById(id).disabled = !enabled;
            });
        }
        
        function handleFileUpload(event) {
            const file = event.target.files[0];
            if (!file) return;
            
            if (!file.type.startsWith('image/')) {
                showToast('Please select a valid image file', 'error');
                return;
            }
            
            const reader = new FileReader();
            reader.onload = (e) => {
                const base64 = e.target.result;
                document.getElementById('base64Input').value = base64;
                updateImage();
                showToast('Image uploaded successfully');
                
                // Switch to text tab to show the base64
                document.querySelector('[data-tab="text"]').click();
            };
            
            reader.readAsDataURL(file);
        }
        
        function copyText() {
            const textArea = document.getElementById('base64Input');
            if (!textArea.value.trim()) {
                showToast('No text to copy', 'error');
                return;
            }
            
            textArea.select();
            document.execCommand('copy');
            showToast('Base64 text copied to clipboard');
        }
        
        function downloadText() {
            const text = document.getElementById('base64Input').value;
            if (!text.trim()) {
                showToast('No text to download', 'error');
                return;
            }
            
            const blob = new Blob([text], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'base64-text.txt';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            showToast('Text file downloaded');
        }
        
        function downloadImage() {
            if (!currentImage) {
                showToast('No image to download', 'error');
                return;
            }
            
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            
            // Apply rotation if any
            if (rotationAngle !== 0) {
                const { width, height } = getRotatedDimensions(currentImage.naturalWidth, currentImage.naturalHeight, rotationAngle);
                canvas.width = width;
                canvas.height = height;
                
                ctx.translate(width / 2, height / 2);
                ctx.rotate((rotationAngle * Math.PI) / 180);
                ctx.drawImage(currentImage, -currentImage.naturalWidth / 2, -currentImage.naturalHeight / 2);
            } else {
                canvas.width = currentImage.naturalWidth;
                canvas.height = currentImage.naturalHeight;
                ctx.drawImage(currentImage, 0, 0);
            }
            
            canvas.toBlob((blob) => {
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'image.png';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
                showToast('Image downloaded');
            });
        }
        
        function rotateImage() {
            if (!currentImage) return;
            
            rotationAngle = (rotationAngle + 90) % 360;
            currentImage.style.transform = `rotate(${rotationAngle}deg)`;
            showToast(`Image rotated ${rotationAngle}°`);
        }
        
        function getRotatedDimensions(width, height, angle) {
            const rad = (angle * Math.PI) / 180;
            const sin = Math.abs(Math.sin(rad));
            const cos = Math.abs(Math.cos(rad));
            return {
                width: Math.ceil(width * cos + height * sin),
                height: Math.ceil(width * sin + height * cos)
            };
        }
        
        function openCropModal() {
            if (!currentImage) return;
            
            const modal = document.getElementById('cropModal');
            const cropImage = document.getElementById('cropImage');
            
            cropImage.src = currentImage.src;
            modal.classList.add('show');
            
            // Initialize cropper
            cropImage.onload = () => {
                if (cropper) {
                    cropper.destroy();
                }
                cropper = new Cropper(cropImage, {
                    aspectRatio: NaN,
                    viewMode: 1,
                    dragMode: 'move',
                    autoCropArea: 0.8,
                    responsive: true,
                    restore: false,
                    guides: true,
                    center: true,
                    highlight: false,
                    cropBoxMovable: true,
                    cropBoxResizable: true,
                    toggleDragModeOnDblclick: false,
                });
            };
        }
        
        function closeCropModal() {
            const modal = document.getElementById('cropModal');
            modal.classList.remove('show');
            
            if (cropper) {
                cropper.destroy();
                cropper = null;
            }
        }
        
        function applyCrop() {
            if (!cropper) return;
            
            const canvas = cropper.getCroppedCanvas();
            const croppedDataURL = canvas.toDataURL();
            
            // Update the base64 input with cropped image
            document.getElementById('base64Input').value = croppedDataURL;
            updateImage();
            
            closeCropModal();
            showToast('Image cropped successfully');
        }
        
        function clearText() {
            document.getElementById('base64Input').value = '';
            updateImage();
            showToast('Text cleared');
        }
        
        // Process file (used by both drag-drop and file upload)
        function processFile(file) {
            if (!file.type.startsWith('image/')) {
                showToast('Please select a valid image file', 'error');
                return;
            }
            
            const reader = new FileReader();
            reader.onload = (e) => {
                const base64 = e.target.result;
                document.getElementById('base64Input').value = base64;
                updateImage();
                showToast('Image processed successfully');
                
                // Switch to text tab to show the base64
                document.querySelector('[data-tab="text"]').click();
            };
            
            reader.readAsDataURL(file);
        }
        
        // Drag and Drop functionality
        function setupDragAndDrop() {
            const dropZone = document.getElementById('dropZone');
            const body = document.body;
            
            // Prevent default drag behaviors on the entire page
            ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
                body.addEventListener(eventName, preventDefaults, false);
                dropZone.addEventListener(eventName, preventDefaults, false);
            });
            
            // Highlight drop zone when item is dragged over it
            ['dragenter', 'dragover'].forEach(eventName => {
                dropZone.addEventListener(eventName, highlight, false);
            });
            
            ['dragleave', 'drop'].forEach(eventName => {
                dropZone.addEventListener(eventName, unhighlight, false);
            });
            
            // Handle dropped files
            dropZone.addEventListener('drop', handleDrop, false);
            
            function preventDefaults(e) {
                e.preventDefault();
                e.stopPropagation();
            }
            
            function highlight(e) {
                dropZone.classList.add('drag-over');
            }
            
            function unhighlight(e) {
                dropZone.classList.remove('drag-over');
            }
            
            function handleDrop(e) {
                const dt = e.dataTransfer;
                const files = dt.files;
                
                if (files.length > 0) {
                    processFile(files[0]);
                }
            }
        }
        
        // Clipboard paste functionality
        function setupClipboardPaste() {
            document.addEventListener('paste', function(e) {
                const items = e.clipboardData.items;
                
                for (let i = 0; i < items.length; i++) {
                    if (items[i].type.indexOf('image') !== -1) {
                        e.preventDefault();
                        const file = items[i].getAsFile();
                        processFile(file);
                        showToast('Image pasted from clipboard');
                        break;
                    }
                }
            });
        }
        
        // Initialize
        updateImage();
        setupDragAndDrop();
        setupClipboardPaste();