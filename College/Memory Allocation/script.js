function parseInput(str) {
    return str.split(',')
        .map(s => s.trim())
        .filter(s => s.length > 0)
        .map(Number)
        .filter(n => !isNaN(n) && n > 0);
}

function cloneBlocks(blocks) {
    return blocks.map(b => ({...b}));
}

function formatBlocks(blocks) {
    return blocks.map(b => 
        `${b.size}${b.allocated ? ' (Allocated)' : ''}`
    ).join(' | ');
}

function formatAllocSummary(alloc, processes) {
    let lines = [];
    for (let i = 0; i < processes.length; ++i) {
        if (alloc[i] !== null && alloc[i] !== undefined) {
            lines.push(`Process ${i+1} (${processes[i]}) → Block ${alloc[i]+1}`);
        } else {
            lines.push(`Process ${i+1} (${processes[i]}) → <span class="not-allocated">Not Allocated</span>`);
        }
    }
    return lines.join('<br>');
}

function firstFit(blockSizes, processes) {
    let steps = [];
    let blocks = blockSizes.map((size, i) => ({size, allocated: false, index: i}));
    let alloc = Array(processes.length).fill(null);

    steps.push({
        title: "Initial Memory Blocks",
        blocks: cloneBlocks(blocks),
        reasoning: null
    });

    for (let p = 0; p < processes.length; ++p) {
        let allocated = false;
        let reasoning = '';
        for (let b = 0; b < blocks.length; ++b) {
            if (!blocks[b].allocated && blocks[b].size >= processes[p]) {
                reasoning = `Process ${p+1} (${processes[p]}) fits in Block ${b+1} (${blocks[b].size}). Allocated.`;
                blocks[b].size -= processes[p];
                blocks[b].allocated = blocks[b].size === 0;
                alloc[p] = b;
                allocated = true;
                break;
            }
        }
        if (!allocated) {
            reasoning = `Process ${p+1} (${processes[p]}) could not be allocated. No suitable block found.`;
        }
        steps.push({
            title: `Allocating Process ${p+1} (${processes[p]})`,
            blocks: cloneBlocks(blocks),
            reasoning
        });
    }

    steps.push({
        title: "Final Allocation Summary",
        blocks: null,
        reasoning: formatAllocSummary(alloc, processes)
    });

    return steps;
}

function bestFit(blockSizes, processes) {
    let steps = [];
    let blocks = blockSizes.map((size, i) => ({size, allocated: false, index: i}));
    let alloc = Array(processes.length).fill(null);

    steps.push({
        title: "Initial Memory Blocks",
        blocks: cloneBlocks(blocks),
        reasoning: null
    });

    for (let p = 0; p < processes.length; ++p) {
        let bestIdx = -1, minDiff = Infinity;
        for (let b = 0; b < blocks.length; ++b) {
            if (!blocks[b].allocated && blocks[b].size >= processes[p]) {
                let diff = blocks[b].size - processes[p];
                if (diff < minDiff) {
                    minDiff = diff;
                    bestIdx = b;
                }
            }
        }
        let reasoning = '';
        if (bestIdx !== -1) {
            reasoning = `Process ${p+1} (${processes[p]}) best fits in Block ${bestIdx+1} (${blocks[bestIdx].size}). Allocated.`;
            blocks[bestIdx].size -= processes[p];
            blocks[bestIdx].allocated = blocks[bestIdx].size === 0;
            alloc[p] = bestIdx;
        } else {
            reasoning = `Process ${p+1} (${processes[p]}) could not be allocated. No suitable block found.`;
        }
        steps.push({
            title: `Allocating Process ${p+1} (${processes[p]})`,
            blocks: cloneBlocks(blocks),
            reasoning
        });
    }

    steps.push({
        title: "Final Allocation Summary",
        blocks: null,
        reasoning: formatAllocSummary(alloc, processes)
    });

    return steps;
}

function worstFit(blockSizes, processes) {
    let steps = [];
    let blocks = blockSizes.map((size, i) => ({size, allocated: false, index: i}));
    let alloc = Array(processes.length).fill(null);

    steps.push({
        title: "Initial Memory Blocks",
        blocks: cloneBlocks(blocks),
        reasoning: null
    });

    for (let p = 0; p < processes.length; ++p) {
        let worstIdx = -1, maxDiff = -1;
        for (let b = 0; b < blocks.length; ++b) {
            if (!blocks[b].allocated && blocks[b].size >= processes[p]) {
                let diff = blocks[b].size - processes[p];
                if (diff > maxDiff) {
                    maxDiff = diff;
                    worstIdx = b;
                }
            }
        }
        let reasoning = '';
        if (worstIdx !== -1) {
            reasoning = `Process ${p+1} (${processes[p]}) worst fits in Block ${worstIdx+1} (${blocks[worstIdx].size}). Allocated.`;
            blocks[worstIdx].size -= processes[p];
            blocks[worstIdx].allocated = blocks[worstIdx].size === 0;
            alloc[p] = worstIdx;
        } else {
            reasoning = `Process ${p+1} (${processes[p]}) could not be allocated. No suitable block found.`;
        }
        steps.push({
            title: `Allocating Process ${p+1} (${processes[p]})`,
            blocks: cloneBlocks(blocks),
            reasoning
        });
    }

    steps.push({
        title: "Final Allocation Summary",
        blocks: null,
        reasoning: formatAllocSummary(alloc, processes)
    });

    return steps;
}

function renderSteps(steps, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    steps.forEach(step => {
        const div = document.createElement('div');
        div.className = 'step';
        const title = document.createElement('div');
        title.innerHTML = `<strong>${step.title}</strong>`;
        div.appendChild(title);
        if (step.blocks) {
            const blocksDiv = document.createElement('div');
            blocksDiv.className = 'memory-blocks';
            blocksDiv.innerText = formatBlocks(step.blocks);
            div.appendChild(blocksDiv);
        }
        if (step.reasoning) {
            const reasoningDiv = document.createElement('div');
            if (step.title === "Final Allocation Summary") {
                reasoningDiv.className = 'allocation-summary';
                reasoningDiv.innerHTML = step.reasoning;
            } else {
                reasoningDiv.className = 'reasoning';
                reasoningDiv.innerText = step.reasoning;
            }
            div.appendChild(reasoningDiv);
        }
        container.appendChild(div);
    });
}

document.getElementById('inputForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const blocksInput = document.getElementById('blocksInput').value;
    const processesInput = document.getElementById('processesInput').value;
    const blockSizes = parseInput(blocksInput);
    const processes = parseInput(processesInput);

    if (blockSizes.length === 0 || processes.length === 0) {
        alert('Please enter valid memory blocks and processes.');
        return;
    }

    document.getElementById('results').style.display = 'flex';

    const firstFitSteps = firstFit(blockSizes, processes);
    const bestFitSteps = bestFit(blockSizes, processes);
    const worstFitSteps = worstFit(blockSizes, processes);

    renderSteps(firstFitSteps, 'firstFitSteps');
    renderSteps(bestFitSteps, 'bestFitSteps');
    renderSteps(worstFitSteps, 'worstFitSteps');
});
