// State Management
        const state = {
            originalImage: null,
            originalImageData: null,
            canvas: document.getElementById('canvas'),
            ctx: null,
            isImageLoaded: false,
            topBrightness: 0,
            bottomBrightness: 0,
            gradientTopPercentX: 20,
            gradientTopPercentY: 15,
            gradientBottomPercentX: 80,
            gradientBottomPercentY: 85,
            isDraggingTop: false,
            isDraggingBottom: false,
            isRadialMode: false
        };

        // DOM Elements
        const elements = {
            dropZone: document.getElementById('dropZone'),
            fileInput: document.getElementById('fileInput'),
            canvas: document.getElementById('canvas'),
            canvasWrapper: document.getElementById('canvasWrapper'),
            canvasPlaceholder: document.getElementById('canvasPlaceholder'),
            statusMessage: document.getElementById('statusMessage'),
            imageInfo: document.getElementById('imageInfo'),
            topBrightness: document.getElementById('topBrightness'),
            bottomBrightness: document.getElementById('bottomBrightness'),
            topBrightnessValue: document.getElementById('topBrightnessValue'),
            bottomBrightnessValue: document.getElementById('bottomBrightnessValue'),
            topPoint: document.getElementById('topPoint'),
            bottomPoint: document.getElementById('bottomPoint'),
            resetBtn: document.getElementById('resetBtn'),
            downloadBtn: document.getElementById('downloadBtn')
        };

        // Initialize Canvas Context
        state.ctx = state.canvas.getContext('2d', { willReadFrequently: true });

        // Utility: Show Status Message
        function showStatus(message, type = 'info') {
            elements.statusMessage.textContent = message;
            elements.statusMessage.className = `status-message show ${type}`;
            setTimeout(() => {
                elements.statusMessage.classList.remove('show');
            }, 4000);
        }

        // Utility: Validate File
        function isValidImage(file) {
            const validTypes = ['image/png', 'image/jpeg', 'image/webp'];
            return file && validTypes.includes(file.type) && file.size > 0;
        }

        // Utility: Format File Size
        function formatFileSize(bytes) {
            if (bytes === 0) return '0 B';
            const k = 1024;
            const sizes = ['B', 'KB', 'MB'];
            const i = Math.floor(Math.log(bytes) / Math.log(k));
            return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
        }

        // Utility: Calculate Aspect Ratio String
        function getAspectRatioString(width, height) {
            const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);
            const divisor = gcd(width, height);
            return `${width / divisor}:${height / divisor}`;
        }

        // Load Image and Display
        function loadImage(file) {
            if (!isValidImage(file)) {
                showStatus('Please upload a valid image (PNG, JPG, or WebP)', 'error');
                return;
            }

            const reader = new FileReader();

            reader.onload = (e) => {
                try {
                    const img = new Image();

                    img.onload = () => {
                        try {
                            // Reset brightness values
                            state.topBrightness = 0;
                            state.bottomBrightness = 0;
                            elements.topBrightness.value = 0;
                            elements.bottomBrightness.value = 0;
                            elements.topBrightnessValue.textContent = '0';
                            elements.bottomBrightnessValue.textContent = '0';

                            // Set canvas dimensions to match image
                            state.canvas.width = img.width;
                            state.canvas.height = img.height;

                            // Store original image
                            state.originalImage = img;
                            state.isImageLoaded = true;

                            // Draw original image to canvas
                            state.ctx.drawImage(img, 0, 0);

                            // Store original image data
                            state.originalImageData = state.ctx.getImageData(0, 0, state.canvas.width, state.canvas.height);

                            // Show canvas and hide placeholder
                            state.canvas.style.display = 'block';
                            elements.canvasPlaceholder.style.display = 'none';

                            // Show gradient points
                            elements.topPoint.style.display = 'block';
                            elements.bottomPoint.style.display = 'block';

                            // Enable controls
                            elements.topBrightness.disabled = false;
                            elements.bottomBrightness.disabled = false;
                            elements.resetBtn.disabled = false;
                            elements.downloadBtn.disabled = false;

                            // Update image info
                            updateImageInfo(img.width, img.height, file.size, file.type);

                            // Show success message
                            showStatus('✅ Image loaded successfully!', 'success');
                        } catch (error) {
                            console.error('Error processing image:', error);
                            showStatus('Error processing image. Please try again.', 'error');
                        }
                    };

                    img.onerror = () => {
                        showStatus('Failed to load image. Please try a different file.', 'error');
                    };

                    img.src = e.target.result;
                } catch (error) {
                    console.error('Error reading file:', error);
                    showStatus('Error reading file. Please try again.', 'error');
                }
            };

            reader.onerror = () => {
                showStatus('Error reading file. Please try again.', 'error');
            };

            reader.readAsDataURL(file);
        }

        // Update Image Info Display
        function updateImageInfo(width, height, fileSize, fileType) {
            document.getElementById('infoDimensions').textContent = `${width} × ${height}px`;
            document.getElementById('infoFileSize').textContent = formatFileSize(fileSize);
            document.getElementById('infoFormat').textContent = fileType.split('/')[1].toUpperCase();
            document.getElementById('infoRatio').textContent = getAspectRatioString(width, height);
            elements.imageInfo.classList.add('show');
        }

        // Apply Brightness Gradient with Freeform Points
        function applyBrightnessGradient() {
            if (!state.isImageLoaded || !state.originalImageData) return;

            try {
                // Create a copy of original image data
                const imageData = state.ctx.createImageData(state.originalImageData);
                const data = imageData.data;
                const originalData = state.originalImageData.data;

                const width = state.canvas.width;
                const height = state.canvas.height;

                // Convert percentages to pixel coordinates
                const topX = (state.gradientTopPercentX / 100) * width;
                const topY = (state.gradientTopPercentY / 100) * height;
                const bottomX = (state.gradientBottomPercentX / 100) * width;
                const bottomY = (state.gradientBottomPercentY / 100) * height;

                // Process each pixel
                for (let i = 0; i < originalData.length; i += 4) {
                    const pixelIndex = i / 4;
                    const pixelY = Math.floor(pixelIndex / width);
                    const pixelX = pixelIndex % width;

                    let gradientProgress = 0;

                    if (state.isRadialMode) {
                        // Radial gradient: distance from center to edge
                        const dX = bottomX - topX;
                        const dY = bottomY - topY;
                        const maxRadius = Math.sqrt(dX * dX + dY * dY);

                        if (maxRadius > 0) {
                            const pixelDX = pixelX - topX;
                            const pixelDY = pixelY - topY;
                            const pixelDistance = Math.sqrt(pixelDX * pixelDX + pixelDY * pixelDY);
                            gradientProgress = Math.max(0, Math.min(1, pixelDistance / maxRadius));
                        }
                    } else {
                        // Linear gradient: dot product projection onto gradient line
                        const dX = bottomX - topX;
                        const dY = bottomY - topY;
                        const distSquared = dX * dX + dY * dY;

                        if (distSquared > 0) {
                            const dotProduct = (pixelX - topX) * dX + (pixelY - topY) * dY;
                            gradientProgress = Math.max(0, Math.min(1, dotProduct / distSquared));
                        }
                    }

                    // Linear interpolation of brightness values
                    const brightness = state.topBrightness + (state.bottomBrightness - state.topBrightness) * gradientProgress;

                    // Apply brightness adjustment (scale: -100 to +100)
                    const factor = 1 + brightness / 100;

                    // Get original RGB values
                    const r = originalData[i];
                    const g = originalData[i + 1];
                    const b = originalData[i + 2];
                    const a = originalData[i + 3];

                    // Apply brightness and clamp to 0-255
                    data[i] = Math.max(0, Math.min(255, Math.round(r * factor)));
                    data[i + 1] = Math.max(0, Math.min(255, Math.round(g * factor)));
                    data[i + 2] = Math.max(0, Math.min(255, Math.round(b * factor)));
                    data[i + 3] = a;
                }

                // Put modified image data back on canvas
                state.ctx.putImageData(imageData, 0, 0);
            } catch (error) {
                console.error('Error applying brightness gradient:', error);
                showStatus('Error applying effect. Please try again.', 'error');
            }
        }

        // Reset to Original Image
        function resetImage() {
            if (!state.originalImage) return;

            try {
                state.topBrightness = 0;
                state.bottomBrightness = 0;
                elements.topBrightness.value = 0;
                elements.bottomBrightness.value = 0;
                elements.topBrightnessValue.textContent = '0';
                elements.bottomBrightnessValue.textContent = '0';

                // Redraw original
                state.ctx.drawImage(state.originalImage, 0, 0);
                state.originalImageData = state.ctx.getImageData(0, 0, state.canvas.width, state.canvas.height);

                showStatus('🔄 Reset to original image', 'success');
            } catch (error) {
                console.error('Error resetting image:', error);
                showStatus('Error resetting image.', 'error');
            }
        }

        // Download Image as PNG
        function downloadImage() {
            if (!state.isImageLoaded) {
                showStatus('No image to download', 'error');
                return;
            }

            try {
                const link = document.createElement('a');
                link.href = state.canvas.toDataURL('image/png');
                link.download = `brightness-gradient-${new Date().getTime()}.png`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                showStatus('💾 Image downloaded successfully!', 'success');
            } catch (error) {
                console.error('Error downloading image:', error);
                showStatus('Error downloading image. Please try again.', 'error');
            }
        }

        // Event Listeners: Drop Zone
        elements.dropZone.addEventListener('click', () => {
            elements.fileInput.click();
        });

        elements.dropZone.addEventListener('dragover', (e) => {
            e.preventDefault();
            e.stopPropagation();
            elements.dropZone.classList.add('drag-over');
        });

        elements.dropZone.addEventListener('dragleave', (e) => {
            e.preventDefault();
            e.stopPropagation();
            elements.dropZone.classList.remove('drag-over');
        });

        elements.dropZone.addEventListener('drop', (e) => {
            e.preventDefault();
            e.stopPropagation();
            elements.dropZone.classList.remove('drag-over');

            const files = e.dataTransfer.files;
            if (files.length > 0) {
                loadImage(files[0]);
            }
        });

        // Event Listeners: File Input
        elements.fileInput.addEventListener('change', (e) => {
            if (e.target.files.length > 0) {
                loadImage(e.target.files[0]);
            }
        });

        // Event Listeners: Brightness Sliders
        elements.topBrightness.addEventListener('input', (e) => {
            state.topBrightness = parseInt(e.target.value);
            elements.topBrightnessValue.textContent = state.topBrightness;
            applyBrightnessGradient();
        });

        elements.bottomBrightness.addEventListener('input', (e) => {
            state.bottomBrightness = parseInt(e.target.value);
            elements.bottomBrightnessValue.textContent = state.bottomBrightness;
            applyBrightnessGradient();
        });

        // Gradient Point Dragging - Freeform Movement
        function startDragging(isTop) {
            return (e) => {
                e.preventDefault();
                if (isTop) {
                    state.isDraggingTop = true;
                    elements.topPoint.classList.add('dragging');
                } else {
                    state.isDraggingBottom = true;
                    elements.bottomPoint.classList.add('dragging');
                }
            };
        }

        function handleMouseMove(e) {
            const wrapper = elements.canvasWrapper;
            const rect = wrapper.getBoundingClientRect();
            const x = e.clientY - rect.top;
            const y = e.clientY - rect.top;
            const percentX = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
            const percentY = Math.max(0, Math.min(100, (y / rect.height) * 100));

            if (state.isDraggingTop) {
                state.gradientTopPercentX = percentX;
                state.gradientTopPercentY = percentY;
                elements.topPoint.style.left = percentX + '%';
                elements.topPoint.style.top = percentY + '%';
                updateCoordinatesDisplay();
                applyBrightnessGradient();
            }

            if (state.isDraggingBottom) {
                state.gradientBottomPercentX = percentX;
                state.gradientBottomPercentY = percentY;
                elements.bottomPoint.style.left = percentX + '%';
                elements.bottomPoint.style.top = percentY + '%';
                updateCoordinatesDisplay();
                applyBrightnessGradient();
            }
        }

        function stopDragging() {
            state.isDraggingTop = false;
            state.isDraggingBottom = false;
            elements.topPoint.classList.remove('dragging');
            elements.bottomPoint.classList.remove('dragging');
            state.isRadialMode = false;
            updateCoordinatesDisplay();
        }

        // Update Coordinates Display
        function updateCoordinatesDisplay() {
            const topX = Math.round(state.gradientTopPercentX * 10) / 10;
            const topY = Math.round(state.gradientTopPercentY * 10) / 10;
            const bottomX = Math.round(state.gradientBottomPercentX * 10) / 10;
            const bottomY = Math.round(state.gradientBottomPercentY * 10) / 10;

            document.getElementById('blueDotCoords').textContent = `X: ${topX}%, Y: ${topY}%`;
            document.getElementById('greenDotCoords').textContent = `X: ${bottomX}%, Y: ${bottomY}%`;
        }

        // Apply Preset
        function applyPreset(presetName) {
            const presets = {
                'diagonal-tl-br': { topX: 5, topY: 5, bottomX: 95, bottomY: 95, isRadial: false },
                'diagonal-bl-tr': { topX: 5, topY: 95, bottomX: 95, bottomY: 5, isRadial: false },
                'horizontal': { topX: 0, topY: 50, bottomX: 100, bottomY: 50, isRadial: false },
                'vertical': { topX: 50, topY: 0, bottomX: 50, bottomY: 100, isRadial: false },
                'radial-center': { topX: 50, topY: 50, bottomX: 80, bottomY: 50, isRadial: true },
                'corner-tl': { topX: 0, topY: 0, bottomX: 100, bottomY: 100, isRadial: false }
            };

            const preset = presets[presetName];
            if (preset) {
                state.isRadialMode = preset.isRadial;
                state.gradientTopPercentX = preset.topX;
                state.gradientTopPercentY = preset.topY;
                state.gradientBottomPercentX = preset.bottomX;
                state.gradientBottomPercentY = preset.bottomY;

                elements.topPoint.style.left = preset.topX + '%';
                elements.topPoint.style.top = preset.topY + '%';
                elements.bottomPoint.style.left = preset.bottomX + '%';
                elements.bottomPoint.style.top = preset.bottomY + '%';

                // Update input fields
                document.getElementById('blueX').value = Math.round(preset.topX);
                document.getElementById('blueY').value = Math.round(preset.topY);
                document.getElementById('greenX').value = Math.round(preset.bottomX);
                document.getElementById('greenY').value = Math.round(preset.bottomY);

                updateCoordinatesDisplay();
                if (state.isImageLoaded) {
                    applyBrightnessGradient();
                }
                showStatus(`✨ Applied preset`, 'success');
            }
        }

        // Update dots from coordinate inputs
        function updateDotsFromInputs() {
            if (!state.isImageLoaded) {
                showStatus('Please load an image first', 'error');
                return;
            }

            let blueX = parseFloat(document.getElementById('blueX').value) || 0;
            let blueY = parseFloat(document.getElementById('blueY').value) || 0;
            let greenX = parseFloat(document.getElementById('greenX').value) || 0;
            let greenY = parseFloat(document.getElementById('greenY').value) || 0;

            blueX = Math.max(0, Math.min(100, blueX));
            blueY = Math.max(0, Math.min(100, blueY));
            greenX = Math.max(0, Math.min(100, greenX));
            greenY = Math.max(0, Math.min(100, greenY));

            state.gradientTopPercentX = blueX;
            state.gradientTopPercentY = blueY;
            state.gradientBottomPercentX = greenX;
            state.gradientBottomPercentY = greenY;
            state.isRadialMode = false;

            elements.topPoint.style.left = blueX + '%';
            elements.topPoint.style.top = blueY + '%';
            elements.bottomPoint.style.left = greenX + '%';
            elements.bottomPoint.style.top = greenY + '%';

            document.getElementById('blueX').value = blueX;
            document.getElementById('blueY').value = blueY;
            document.getElementById('greenX').value = greenX;
            document.getElementById('greenY').value = greenY;

            updateCoordinatesDisplay();
            applyBrightnessGradient();
        }

        // Event Listeners: Gradient Points
        elements.topPoint.addEventListener('mousedown', startDragging(true));
        elements.bottomPoint.addEventListener('mousedown', startDragging(false));
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', stopDragging);

        // Touch Support for Gradient Points
        elements.topPoint.addEventListener('touchstart', startDragging(true));
        elements.bottomPoint.addEventListener('touchstart', startDragging(false));
        document.addEventListener('touchmove', (e) => {
            if (state.isDraggingTop || state.isDraggingBottom) {
                const touch = e.touches[0];
                const mouseEvent = new MouseEvent('mousemove', {
                    clientX: touch.clientX,
                    clientY: touch.clientY
                });
                handleMouseMove(mouseEvent);
            }
        }, { passive: false });
        document.addEventListener('touchend', stopDragging);

        // Editable Value Input System
        function makeValueEditable(valueElement) {
            valueElement.addEventListener('click', () => {
                if (valueElement.classList.contains('editing')) return;

                const inputId = valueElement.dataset.input;
                const currentValue = valueElement.textContent;

                valueElement.classList.add('editing');
                const input = document.createElement('input');
                input.type = 'number';
                input.value = currentValue;
                input.min = '-100';
                input.max = '100';

                valueElement.textContent = '';
                valueElement.appendChild(input);
                input.focus();
                input.select();

                function saveValue() {
                    let newValue = parseInt(input.value) || 0;
                    newValue = Math.max(-100, Math.min(100, newValue));

                    elements[inputId].value = newValue;
                    elements[inputId].dispatchEvent(new Event('input'));

                    valueElement.classList.remove('editing');
                    valueElement.textContent = newValue;
                }

                input.addEventListener('blur', saveValue);
                input.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter') saveValue();
                    if (e.key === 'Escape') {
                        valueElement.classList.remove('editing');
                        valueElement.textContent = currentValue;
                    }
                });
            });
        }

        // Initialize editable values
        makeValueEditable(elements.topBrightnessValue);
        makeValueEditable(elements.bottomBrightnessValue);

        // Theme Selector
        const themeButtons = document.querySelectorAll('.theme-btn');
        const htmlElement = document.documentElement;

        // Set default theme to dark
        htmlElement.setAttribute('data-theme', 'dark');

        themeButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const theme = btn.dataset.theme;
                htmlElement.setAttribute('data-theme', theme);
                localStorage.setItem('editorTheme', theme);

                // Update active button
                themeButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
        });

        // Load saved theme or default to dark
        const savedTheme = localStorage.getItem('editorTheme') || 'dark';
        htmlElement.setAttribute('data-theme', savedTheme);
        themeButtons.forEach(btn => {
            if (btn.dataset.theme === savedTheme) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        // Event Listeners: Preset Buttons
        document.addEventListener('DOMContentLoaded', () => {
            const presetButtons = document.querySelectorAll('.preset-btn');
            presetButtons.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    if (!state.isImageLoaded) {
                        showStatus('Please load an image first', 'error');
                        return;
                    }
                    const presetName = btn.getAttribute('data-preset');
                    applyPreset(presetName);
                });
            });
        });

        // Event Listeners: Coordinate Inputs
        const coordInputs = ['blueX', 'blueY', 'greenX', 'greenY'];
        coordInputs.forEach(id => {
            document.getElementById(id).addEventListener('change', updateDotsFromInputs);
            document.getElementById(id).addEventListener('input', updateDotsFromInputs);
        });

        // Event Listeners: Buttons
        elements.resetBtn.addEventListener('click', resetImage);
        elements.downloadBtn.addEventListener('click', downloadImage);

        // Initial coordinates display
        updateCoordinatesDisplay();

        // Prevent default drag and drop behavior on document
        document.addEventListener('dragover', (e) => {
            e.preventDefault();
            e.stopPropagation();
        });

        document.addEventListener('drop', (e) => {
            e.preventDefault();
            e.stopPropagation();
        });

        // Initial placeholder display
        state.canvas.style.display = 'none';
        elements.topPoint.style.display = 'none';
        elements.bottomPoint.style.display = 'none';