        // Global variables
        let processes = [];
        let currentResults = null;
        let selectedAlgorithm = "FIFO";
        let timeQuantum = 2;

        const colors = [
            "bg-cyan-500",
            "bg-emerald-500",
            "bg-amber-500",
            "bg-rose-500",
            "bg-purple-500",
            "bg-indigo-500",
            "bg-orange-500",
            "bg-pink-500",
            "bg-teal-500",
            "bg-lime-500",
        ];

        // Process management functions
        function addProcess() {
            const burstTime = document.getElementById('burstTime').value;
            const arrivalTime = document.getElementById('arrivalTime').value;
            const priority = document.getElementById('priority').value;

            if (!burstTime || !arrivalTime || !priority) {
                return;
            }

            const process = {
                id: `P${processes.length + 1}`,
                burstTime: parseInt(burstTime),
                arrivalTime: parseInt(arrivalTime),
                priority: parseInt(priority),
            };

            processes.push(process);
            updateProcessList();
            clearInputs();
            updateRunButton();

            if (currentResults) {
                runAlgorithm();
            }
        }

        function removeProcess(index) {
            processes.splice(index, 1);
            updateProcessList();
            updateRunButton();

            if (processes.length === 0) {
                hideResults();
            } else if (currentResults) {
                runAlgorithm();
            }
        }

        function clearAll() {
            processes = [];
            updateProcessList();
            updateRunButton();
            hideResults();
        }

        function clearInputs() {
            document.getElementById('burstTime').value = '';
            document.getElementById('arrivalTime').value = '';
            document.getElementById('priority').value = '';
        }

        function updateProcessList() {
            const processList = document.getElementById('processList');
            const processContainer = document.getElementById('processContainer');
            const clearBtn = document.getElementById('clearBtn');

            if (processes.length === 0) {
                processList.classList.add('hidden');
                clearBtn.classList.add('hidden');
                return;
            }

            processList.classList.remove('hidden');
            clearBtn.classList.remove('hidden');

            processContainer.innerHTML = processes.map((process, index) => `
                <div class="flex items-center justify-between bg-slate-700/50 p-4 rounded-lg border border-slate-600/50">
                    <div class="flex gap-6 text-sm">
                        <span class="font-semibold text-cyan-400 min-w-[2rem]">${process.id}</span>
                        <span class="text-slate-300">BT: <span class="text-white font-medium">${process.burstTime}</span></span>
                        <span class="text-slate-300">AT: <span class="text-white font-medium">${process.arrivalTime}</span></span>
                        <span class="text-slate-300">Priority: <span class="text-white font-medium">${process.priority}</span></span>
                    </div>
                    <button onclick="removeProcess(${index})" class="text-red-400 hover:text-red-300 hover:bg-red-900/20 p-1 rounded transition-all">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                        </svg>
                    </button>
                </div>
            `).join('');
        }

        function updateRunButton() {
            const runBtn = document.getElementById('runBtn');
            runBtn.disabled = processes.length === 0;
        }

        function handleAlgorithmChange() {
            selectedAlgorithm = document.getElementById('algorithmSelect').value;
            const timeQuantumDiv = document.getElementById('timeQuantumDiv');
            
            if (selectedAlgorithm === 'RR') {
                timeQuantumDiv.classList.remove('hidden');
            } else {
                timeQuantumDiv.classList.add('hidden');
            }

            if (processes.length > 0 && currentResults) {
                runAlgorithm();
            }
        }

        function handleTimeQuantumChange() {
            timeQuantum = parseInt(document.getElementById('timeQuantum').value) || 1;
            if (processes.length > 0 && currentResults && selectedAlgorithm === 'RR') {
                runAlgorithm();
            }
        }

        function hideResults() {
            document.getElementById('noResults').classList.remove('hidden');
            document.getElementById('resultsTable').classList.add('hidden');
            document.getElementById('ganttChart').classList.add('hidden');
            currentResults = null;
        }

        function showResults() {
            document.getElementById('noResults').classList.add('hidden');
            document.getElementById('resultsTable').classList.remove('hidden');
            document.getElementById('ganttChart').classList.remove('hidden');
        }

        // Scheduling algorithms
        function runAlgorithm() {
            if (processes.length === 0) return;

            let result;
            const processesCopy = processes.map(p => ({ ...p, remainingTime: p.burstTime }));

            switch (selectedAlgorithm) {
                case "FIFO":
                    result = fifoScheduling(processesCopy);
                    break;
                case "RR":
                    result = roundRobinScheduling(processesCopy, timeQuantum);
                    break;
                case "SJF":
                    result = sjfScheduling(processesCopy);
                    break;
                case "SRJF":
                    result = srjfScheduling(processesCopy);
                    break;
                case "PP":
                    result = preemptivePriorityScheduling(processesCopy);
                    break;
                case "NPP":
                    result = nonPreemptivePriorityScheduling(processesCopy);
                    break;
                default:
                    result = fifoScheduling(processesCopy);
            }

            currentResults = result;
            displayResults(result);
        }

        function fifoScheduling(processes) {
            const sortedProcesses = [...processes].sort((a, b) => a.arrivalTime - b.arrivalTime);
            const ganttChart = [];
            let currentTime = 0;

            sortedProcesses.forEach((process) => {
                if (currentTime < process.arrivalTime) {
                    currentTime = process.arrivalTime;
                }

                const startTime = currentTime;
                const endTime = currentTime + process.burstTime;

                ganttChart.push({
                    processId: process.id,
                    startTime,
                    endTime,
                });

                process.completionTime = endTime;
                process.turnaroundTime = process.completionTime - process.arrivalTime;
                process.waitingTime = process.turnaroundTime - process.burstTime;

                currentTime = endTime;
            });

            return {
                algorithm: "FIFO",
                processes: sortedProcesses,
                ganttChart,
                averages: calculateAverages(sortedProcesses),
            };
        }

        function roundRobinScheduling(processes, timeQuantum) {
            const queue = [];
            const ganttChart = [];
            let currentTime = 0;
            let processIndex = 0;
            const sortedProcesses = [...processes].sort((a, b) => a.arrivalTime - b.arrivalTime);
            const completed = [];

            sortedProcesses.forEach((p) => (p.remainingTime = p.burstTime));

            while (completed.length < sortedProcesses.length) {
                while (processIndex < sortedProcesses.length && sortedProcesses[processIndex].arrivalTime <= currentTime) {
                    queue.push(sortedProcesses[processIndex]);
                    processIndex++;
                }

                if (queue.length === 0) {
                    if (processIndex < sortedProcesses.length) {
                        currentTime = sortedProcesses[processIndex].arrivalTime;
                        queue.push(sortedProcesses[processIndex]);
                        processIndex++;
                    }
                }

                if (queue.length > 0) {
                    const currentProcess = queue.shift();
                    const startTime = currentTime;
                    const executionTime = Math.min(timeQuantum, currentProcess.remainingTime);

                    currentTime += executionTime;
                    currentProcess.remainingTime -= executionTime;

                    ganttChart.push({
                        processId: currentProcess.id,
                        startTime,
                        endTime: currentTime,
                    });

                    while (processIndex < sortedProcesses.length && sortedProcesses[processIndex].arrivalTime <= currentTime) {
                        queue.push(sortedProcesses[processIndex]);
                        processIndex++;
                    }

                    if (currentProcess.remainingTime > 0) {
                        queue.push(currentProcess);
                    } else {
                        currentProcess.completionTime = currentTime;
                        currentProcess.turnaroundTime = currentProcess.completionTime - currentProcess.arrivalTime;
                        currentProcess.waitingTime = currentProcess.turnaroundTime - currentProcess.burstTime;
                        completed.push(currentProcess);
                    }
                }
            }

            return {
                algorithm: "Round Robin",
                processes: completed,
                ganttChart,
                averages: calculateAverages(completed),
            };
        }

        function sjfScheduling(processes) {
            const ganttChart = [];
            const completed = [];
            const remaining = [...processes];
            let currentTime = 0;

            while (remaining.length > 0) {
                const available = remaining.filter((p) => p.arrivalTime <= currentTime);

                if (available.length === 0) {
                    currentTime = Math.min(...remaining.map((p) => p.arrivalTime));
                    continue;
                }

                const shortest = available.reduce((min, p) => (p.burstTime < min.burstTime ? p : min));

                const startTime = currentTime;
                const endTime = currentTime + shortest.burstTime;

                ganttChart.push({
                    processId: shortest.id,
                    startTime,
                    endTime,
                });

                shortest.completionTime = endTime;
                shortest.turnaroundTime = shortest.completionTime - shortest.arrivalTime;
                shortest.waitingTime = shortest.turnaroundTime - shortest.burstTime;

                completed.push(shortest);
                remaining.splice(remaining.indexOf(shortest), 1);
                currentTime = endTime;
            }

            return {
                algorithm: "SJF (Non-preemptive)",
                processes: completed,
                ganttChart,
                averages: calculateAverages(completed),
            };
        }

        function srjfScheduling(processes) {
            const ganttChart = [];
            const completed = [];
            const remaining = [...processes];
            let currentTime = 0;

            while (remaining.length > 0) {
                const available = remaining.filter((p) => p.arrivalTime <= currentTime);

                if (available.length === 0) {
                    currentTime = Math.min(...remaining.map((p) => p.arrivalTime));
                    continue;
                }

                const shortest = available.reduce((min, p) => (p.remainingTime < min.remainingTime ? p : min));

                const startTime = currentTime;
                currentTime++;
                shortest.remainingTime--;

                if (
                    ganttChart.length > 0 &&
                    ganttChart[ganttChart.length - 1].processId === shortest.id &&
                    ganttChart[ganttChart.length - 1].endTime === startTime
                ) {
                    ganttChart[ganttChart.length - 1].endTime = currentTime;
                } else {
                    ganttChart.push({
                        processId: shortest.id,
                        startTime,
                        endTime: currentTime,
                    });
                }

                if (shortest.remainingTime === 0) {
                    shortest.completionTime = currentTime;
                    shortest.turnaroundTime = shortest.completionTime - shortest.arrivalTime;
                    shortest.waitingTime = shortest.turnaroundTime - shortest.burstTime;
                    completed.push(shortest);
                    remaining.splice(remaining.indexOf(shortest), 1);
                }
            }

            return {
                algorithm: "SRJF (Preemptive)",
                processes: completed,
                ganttChart,
                averages: calculateAverages(completed),
            };
        }

        function preemptivePriorityScheduling(processes) {
            const ganttChart = [];
            const completed = [];
            const remaining = [...processes];
            let currentTime = 0;

            while (remaining.length > 0) {
                const available = remaining.filter((p) => p.arrivalTime <= currentTime);

                if (available.length === 0) {
                    currentTime = Math.min(...remaining.map((p) => p.arrivalTime));
                    continue;
                }

                const highest = available.reduce((max, p) => (p.priority > max.priority ? p : max));

                const startTime = currentTime;
                currentTime++;
                highest.remainingTime--;

                if (
                    ganttChart.length > 0 &&
                    ganttChart[ganttChart.length - 1].processId === highest.id &&
                    ganttChart[ganttChart.length - 1].endTime === startTime
                ) {
                    ganttChart[ganttChart.length - 1].endTime = currentTime;
                } else {
                    ganttChart.push({
                        processId: highest.id,
                        startTime,
                        endTime: currentTime,
                    });
                }

                if (highest.remainingTime === 0) {
                    highest.completionTime = currentTime;
                    highest.turnaroundTime = highest.completionTime - highest.arrivalTime;
                    highest.waitingTime = highest.turnaroundTime - highest.burstTime;
                    completed.push(highest);
                    remaining.splice(remaining.indexOf(highest), 1);
                }
            }

            return {
                algorithm: "Preemptive Priority",
                processes: completed,
                ganttChart,
                averages: calculateAverages(completed),
            };
        }

        function nonPreemptivePriorityScheduling(processes) {
            const ganttChart = [];
            const completed = [];
            const remaining = [...processes];
            let currentTime = 0;

            while (remaining.length > 0) {
                const available = remaining.filter((p) => p.arrivalTime <= currentTime);

                if (available.length === 0) {
                    currentTime = Math.min(...remaining.map((p) => p.arrivalTime));
                    continue;
                }

                const highest = available.reduce((max, p) => (p.priority > max.priority ? p : max));

                const startTime = currentTime;
                const endTime = currentTime + highest.burstTime;

                ganttChart.push({
                    processId: highest.id,
                    startTime,
                    endTime,
                });

                highest.completionTime = endTime;
                highest.turnaroundTime = highest.completionTime - highest.arrivalTime;
                highest.waitingTime = highest.turnaroundTime - highest.burstTime;

                completed.push(highest);
                remaining.splice(remaining.indexOf(highest), 1);
                currentTime = endTime;
            }

            return {
                algorithm: "Non-preemptive Priority",
                processes: completed,
                ganttChart,
                averages: calculateAverages(completed),
            };
        }

        function calculateAverages(processes) {
            const n = processes.length;
            const avgCompletionTime = processes.reduce((sum, p) => sum + p.completionTime, 0) / n;
            const avgTurnaroundTime = processes.reduce((sum, p) => sum + p.turnaroundTime, 0) / n;
            const avgWaitingTime = processes.reduce((sum, p) => sum + p.waitingTime, 0) / n;

            return {
                avgCompletionTime,
                avgTurnaroundTime,
                avgWaitingTime,
            };
        }

        function displayResults(results) {
            showResults();

            // Update results title
            document.getElementById('resultsTitle').textContent = `Results - ${results.algorithm}`;

            // Update results table
            const tableBody = document.getElementById('resultsTableBody');
            tableBody.innerHTML = results.processes.map((process, index) => `
                <tr class="border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors">
                    <td class="p-3 font-semibold text-cyan-400 text-center">${process.id}</td>
                    <td class="p-3 text-center text-white">${process.arrivalTime}</td>
                    <td class="p-3 text-center text-white">${process.burstTime}</td>
                    <td class="p-3 text-center text-white">${process.priority}</td>
                    <td class="p-3 text-center text-white font-medium">${process.completionTime}</td>
                    <td class="p-3 text-center text-white font-medium">${process.turnaroundTime}</td>
                    <td class="p-3 text-center text-white font-medium">${process.waitingTime}</td>
                </tr>
            `).join('');

            // Update averages
            document.getElementById('avgCT').textContent = results.averages.avgCompletionTime.toFixed(2);
            document.getElementById('avgTAT').textContent = results.averages.avgTurnaroundTime.toFixed(2);
            document.getElementById('avgWT').textContent = results.averages.avgWaitingTime.toFixed(2);

            // Update Gantt chart
            displayGanttChart(results.ganttChart);
        }

        function displayGanttChart(ganttData) {
            const processColors = {};
            let colorIndex = 0;

            ganttData.forEach((entry) => {
                if (!processColors[entry.processId]) {
                    processColors[entry.processId] = colors[colorIndex % colors.length];
                    colorIndex++;
                }
            });

            const maxTime = Math.max(...ganttData.map((entry) => entry.endTime));
            const minTime = Math.min(...ganttData.map((entry) => entry.startTime));

            const maxChartWidth = 600;
            const totalWidth = Math.min(maxChartWidth, (maxTime - minTime) * 40);

            // Process Legend
            const processLegend = document.getElementById('processLegend');
            processLegend.innerHTML = Object.entries(processColors).map(([processId, color]) => `
                <div class="flex items-center gap-2 bg-slate-700/50 px-3 py-2 rounded-lg">
                    <div class="w-4 h-4 rounded ${color} shadow-sm"></div>
                    <span class="text-sm text-slate-300 font-medium">${processId}</span>
                </div>
            `).join('');

            // Gantt Container
            const ganttContainer = document.getElementById('ganttContainer');
            ganttContainer.style.width = totalWidth + 'px';
            ganttContainer.innerHTML = `
                <!-- Start and End Time Markers -->
                <div class="flex justify-between mb-2 px-2">
                    <div class="text-sm text-slate-400 font-medium">${minTime}</div>
                    <div class="text-sm text-slate-400 font-medium">${maxTime}</div>
                </div>

                <!-- Process execution timeline -->
                <div class="relative h-16 bg-slate-700/30 rounded-lg border border-slate-600 overflow-hidden">
                    ${ganttData.map((entry, index) => {
                        const startPos = ((entry.startTime - minTime) / (maxTime - minTime)) * 100;
                        const width = ((entry.endTime - entry.startTime) / (maxTime - minTime)) * 100;
                        return `
                            <div class="absolute h-full ${processColors[entry.processId]} flex items-center justify-center text-white text-sm font-semibold border-r border-slate-800 shadow-sm transition-all hover:brightness-110"
                                 style="left: ${startPos}%; width: ${width}%;"
                                 title="${entry.processId}: ${entry.startTime} - ${entry.endTime}">
                                ${width > 8 ? entry.processId : ""}
                            </div>
                        `;
                    }).join('')}
                </div>

                <!-- Time markers -->
                <div class="relative mt-2 h-6">
                    ${Array.from(new Set([minTime, ...ganttData.flatMap(entry => [entry.startTime, entry.endTime]), maxTime]))
                        .sort((a, b) => a - b)
                        .map(time => `
                            <div class="absolute text-xs text-slate-400 font-medium"
                                 style="left: ${((time - minTime) / (maxTime - minTime)) * 100}%; transform: translateX(-50%);">
                                ${time}
                            </div>
                        `).join('')}
                </div>
            `;

            // Execution Sequence
            const executionSequence = document.getElementById('executionSequence');
            executionSequence.innerHTML = ganttData.map((entry, index) => `
                <span class="text-cyan-400">${entry.processId}</span>${index < ganttData.length - 1 ? '<span class="text-slate-400 mx-1">→</span>' : ''}
            `).join('');

            // Timeline Details
            const timelineDetails = document.getElementById('timelineDetails');
            timelineDetails.innerHTML = ganttData.map((entry, index) => `
                <div class="bg-slate-700/30 p-3 rounded-lg border border-slate-600/50 text-center">
                    <div class="inline-block w-3 h-3 rounded ${processColors[entry.processId]} mr-2"></div>
                    <span class="text-white font-medium">${entry.processId}</span>
                    <span class="text-slate-400 text-sm ml-2">(${entry.startTime} - ${entry.endTime})</span>
                </div>
            `).join('');
        }

        // Initialize
        handleAlgorithmChange();