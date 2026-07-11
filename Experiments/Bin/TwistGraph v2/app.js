/* =========================================================
   TWISTGRAPH
   Rubik's Cube Knowledge Graph Engine

   Requires:
   data.js

========================================================= */
"use strict";
// =========================================================
// DOM REFERENCES
// =========================================================
const canvas =
	document.getElementById(
		"graphCanvas"
	);
const ctx =
	canvas.getContext("2d");
const miniCanvas =
	document.getElementById(
		"miniCanvas"
	);
const miniCtx =
	miniCanvas.getContext("2d");
const sidebar =
	document.getElementById(
		"sidebar"
	);
const detailsPanel =
	document.getElementById(
		"detailsPanel"
	);
const detailsContent =
	document.getElementById(
		"detailsContent"
	);
const categoryFilters =
	document.getElementById(
		"categoryFilters"
	);
const tagFilters =
	document.getElementById(
		"tagFilters"
	);
// =========================================================
// CANVAS SIZE
// =========================================================
function resizeCanvas() {
	canvas.width =
		canvas.clientWidth;
	canvas.height =
		canvas.clientHeight;
	miniCanvas.width =
		miniCanvas.clientWidth;
	miniCanvas.height =
		miniCanvas.clientHeight;
}
window.addEventListener(
	"resize",
	resizeCanvas
);
resizeCanvas();
// =========================================================
// GRAPH STATE
// =========================================================
let nodes = [];
let edges = [];
let selectedNode = null;
let hoveredNode = null;
let draggedNode = null;
let isPanning = false;
let lastMouse = {
	x: 0,
	y: 0
};
let camera = {
	x: 0,
	y: 0,
	zoom: 1
};
let treeMode = false;

const filters = {
	search: "",
	category: null,
	tags: new Set()
};
// =========================================================
// NODE CREATION
// =========================================================
function createGraph() {
	nodes =
		cubes.map(
			cube => {
				return {
					...cube,
					x: 0,
					y: 0,
					vx: 0,
					vy: 0,
					size: 80,
					hidden: false
				};
			});
	positionTree();
	buildEdges();
	createFilters();
	centerGraph();
}

function positionTree() {
	let roots =
		nodes.filter(
			n => n.parent === null
		);
	roots.forEach(
		root => {
			root.x = 0;
			root.y = 0;
			placeChildren(
				root,
				0,
				0,
				500
			);
		});
}

function placeChildren(
	parent,
	level,
	startAngle,
	radius
) {
	let children =
		nodes.filter(
			n =>
			n.parent === parent.id
		);
	let count =
		children.length;
	children.forEach(
		(child, index) => {
			let angle =
				startAngle +
				(
					(index / count) *
					Math.PI * 2
				);
			child.x =
				parent.x +
				Math.cos(angle) *
				radius;
			child.y =
				parent.y +
				Math.sin(angle) *
				radius;
			placeChildren(
				child,
				level + 1,
				angle,
				radius * 0.65
			);
		});
}

function buildEdges() {
	edges = [];
	nodes.forEach(
		node => {
			if (node.parent) {
				let parent =
					nodes.find(
						n =>
						n.id === node.parent
					);
				if (parent) {
					edges.push({
						from: node,
						to: parent
					});
				}
			}
		});
}

// =========================================================
// FORCE GRAPH PHYSICS
// =========================================================
function updatePhysics() {
	// =========================
	// GRAPH TUNING VALUES
	// =========================
	const nodeDistance = 220; // space between nodes
	const edgeDistance = 350; // preferred connection length
	const pushStrength = 0.08; // node separation force
	const springStrength = 0.0005;
	const maxSpeed = 3;
	nodes.forEach(
		a => {
			if (a.hidden)
				return;
			let fx = 0;
			let fy = 0;
			// =========================
			// NODE REPULSION
			// =========================
			nodes.forEach(
				b => {
					if (
						a === b ||
						b.hidden
					)
						return;
					let dx =
						a.x - b.x;
					let dy =
						a.y - b.y;
					let distance =
						Math.sqrt(
							dx * dx +
							dy * dy
						) || 1;
					if (distance < nodeDistance) {
						let force =
							(nodeDistance - distance) /
							distance;
						fx +=
							dx *
							force *
							pushStrength;
						fy +=
							dy *
							force *
							pushStrength;
					}
				});
			// =========================
			// EDGE SPRING FORCE
			// =========================
			edges.forEach(
				edge => {
					let other = null;
					if (edge.from === a)
						other = edge.to;
					if (edge.to === a)
						other = edge.from;
					if (other) {
						let dx =
							other.x - a.x;
						let dy =
							other.y - a.y;
						let distance =
							Math.sqrt(
								dx * dx +
								dy * dy
							);
						let pull =
							(distance - edgeDistance) *
							springStrength;
						fx +=
							dx *
							pull;
						fy +=
							dy *
							pull;
					}
				});
			// =========================
			// ROOT GRAVITY
			// =========================
			if (a.parent === null) {
				fx +=
					-a.x *
					0.002;
				fy +=
					-a.y *
					0.002;
			}
			// =========================
			// APPLY MOTION
			// =========================
			a.vx += fx;
			a.vy += fy;
			// liquid damping
			a.vx *= 0.82;
			a.vy *= 0.82;
			// speed limit
			a.vx =
				Math.max(
					-maxSpeed,
					Math.min(
						maxSpeed,
						a.vx
					)
				);
			a.vy =
				Math.max(
					-maxSpeed,
					Math.min(
						maxSpeed,
						a.vy
					)
				);
			// =========================
			// MOVE NODE
			// =========================
			a.x += a.vx;
			a.y += a.vy;
			// =========================
			// GRAPH BOUNDARY
			// =========================
			a.x =
				Math.max(
					-1500,
					Math.min(
						1500,
						a.x
					)
				);
			a.y =
				Math.max(
					-1500,
					Math.min(
						1500,
						a.y
					)
				);
		});
}

// =========================================================
// DRAW LOOP
// =========================================================
function animate() {
	updatePhysics();
	draw();
	requestAnimationFrame(
		animate
	);
}
animate();

function draw() {
	ctx.clearRect(
		0,
		0,
		canvas.width,
		canvas.height
	);
	ctx.save();
	ctx.translate(
		canvas.width / 2 +
		camera.x,
		canvas.height / 2 +
		camera.y
	);
	ctx.scale(
		camera.zoom,
		camera.zoom
	);
	drawConnections();
	drawNodes();
	ctx.restore();
	drawMiniMap();
}
// =========================================================
// CONNECTIONS
// =========================================================
function drawConnections() {
	edges.forEach(
		edge => {
			if (
				edge.from.hidden ||
				edge.to.hidden
			)
				return;
			ctx.beginPath();
			ctx.moveTo(
				edge.from.x,
				edge.from.y
			);
			ctx.lineTo(
				edge.to.x,
				edge.to.y
			);
			ctx.strokeStyle =
				"rgba(100,100,130,0.45)";
			ctx.lineWidth = 4;
			ctx.stroke();
		});
}
// =========================================================
// NODES
// =========================================================
function drawNodes() {
	nodes.forEach(
		node => {
			if (node.hidden)
				return;
			let size =
				node.size;
			ctx.beginPath();
			ctx.roundRect(
				node.x - size / 2,
				node.y - size / 2,
				size,
				size,
				18
			);
			ctx.fillStyle =
				selectedNode === node ?
				"#00d9ff" :
				"#202027";
			ctx.fill();
			ctx.strokeStyle =
				hoveredNode === node ?
				"#00d9ff" :
				"#444";
			ctx.stroke();
			ctx.fillStyle = "white";
			ctx.font = "12px Arial";
			ctx.textAlign = "center";
			ctx.fillText(
				node.name.substring(
					0,
					14
				),
				node.x,
				node.y + 45
			);
		});
}
// =========================================================
// MOUSE KEYBOARD EVENTS 
// =========================================================


let mouseDownNode = null;
let mouseDownPosition = {
	x: 0,
	y: 0
};
let isDragging = false;
canvas.addEventListener(
	"mousedown",
	e => {
		const mouse =
			screenToWorld(e);
		const node =
			findNode(mouse);
		if (node) {
			mouseDownNode = node;
			mouseDownPosition = {
				x: e.clientX,
				y: e.clientY
			};
			draggedNode = node;
			isDragging = false;
		} else {
			isPanning = true;
			lastMouse = e;
		}
	});
canvas.addEventListener(
	"mousemove",
	e => {
		const mouse =
			screenToWorld(e);
		hoveredNode =
			findNode(mouse);
		// detect dragging
		if (draggedNode) {
			let distance =
				Math.sqrt(
					Math.pow(
						e.clientX - mouseDownPosition.x,
						2
					) +
					Math.pow(
						e.clientY - mouseDownPosition.y,
						2
					)
				);
			if (distance > 5) {
				isDragging = true;
			}
			draggedNode.x =
				mouse.x;
			draggedNode.y =
				mouse.y;
			draggedNode.vx = 0;
			draggedNode.vy = 0;
		}
		if (isPanning) {
			camera.x +=
				e.clientX -
				lastMouse.clientX;
			camera.y +=
				e.clientY -
				lastMouse.clientY;
			lastMouse = e;
		}
	});
canvas.addEventListener(
	"mouseup",
	() => {
		// only click opens info
		if (
			mouseDownNode &&
			!isDragging
		) {
			selectedNode =
				mouseDownNode;
			openDetails(
				mouseDownNode
			);
		}
		draggedNode = null;
		mouseDownNode = null;
		isDragging = false;
		isPanning = false;
	});

function screenToWorld(e) {
	return {
		x: (
				e.offsetX -
				canvas.width / 2 -
				camera.x
			) /
			camera.zoom,
		y: (
				e.offsetY -
				canvas.height / 2 -
				camera.y
			) /
			camera.zoom
	};
}

function findNode(pos) {
	return nodes.find(
		node => {
			return (
				Math.abs(
					node.x - pos.x
				) <
				node.size / 2 &&
				Math.abs(
					node.y - pos.y
				) <
				node.size / 2
			);
		});
}
// =========================================================
// DETAILS PANEL
// =========================================================
function openDetails(node) {
	detailsPanel.style.display =
		"block";
	let parent =
		nodes.find(
			n =>
			n.id === node.parent
		);
	let children =
		nodes.filter(
			n =>
			n.parent === node.id
		);
	detailsContent.innerHTML = `


<h2>${node.name}</h2>


<img src="${node.image}">


<p>
${node.description || ""}
</p>



<h4 class="detail-title">
Category
</h4>

<p>
${node.category || ""}
</p>



<h4 class="detail-title">
Tags
</h4>


<div>

${
(node.tags || [])
.map(
tag=>`

<span class="tag">
${tag}
</span>

`
)
.join("")
}

</div>




<h4 class="detail-title">
Parent
</h4>


<p>
${parent ? parent.name : "Root"}
</p>




<h4 class="detail-title">
Children
</h4>


<p>
${
children
.map(
c=>c.name
)
.join(", ")
}
</p>


`;
}
document
	.getElementById(
		"closeDetails"
	)
	.onclick = () => {
		detailsPanel.style.display =
			"none";
	};
// =========================================================
// SEARCH
// =========================================================
document
	.getElementById(
		"searchInput"
	)
	.addEventListener(
		"input",
		e => {
			filters.search =
				e.target.value
				.toLowerCase();
			applyFilters();
		});
// =========================================================
// FILTER SYSTEM
// =========================================================
function createFilters() {
	let categories = [
		...new Set(
			cubes.map(
				x => x.category
			)
		)
	];
	categoryFilters.innerHTML =
		categories
		.map(
			cat => `

<span
class="filter-chip"
onclick="setCategory('${cat}')">

${cat}

</span>

`
		)
		.join("");
	let tags = [
		...new Set(
			cubes.flatMap(
				x => x.tags || []
			)
		)
	];
	tagFilters.innerHTML =
		tags
		.map(
			tag => `

<span
class="filter-chip"
onclick="toggleTag('${tag}')">

${tag}

</span>

`
		)
		.join("");
}

function setCategory(cat) {
	filters.category = cat;
	applyFilters();
}

function toggleTag(tag) {
	if (filters.tags.has(tag))
		filters.tags.delete(tag);
	else
		filters.tags.add(tag);
	applyFilters();
}

function applyFilters() {
	nodes.forEach(
		node => {
			let visible = true;
			if (filters.search) {
				visible =
					node.name
					.toLowerCase()
					.includes(
						filters.search
					);
			}
			if (
				filters.category &&
				node.category !== filters.category
			) {
				visible = false;
			}
			filters.tags.forEach(
				tag => {
					if (
						!node.tags ||
						!node.tags.includes(tag)
					) {
						visible = false;
					}
				});
			node.hidden = !visible;
		});
	// wake up physics after filtering
	nodes.forEach(
		n => {
			n.vx = 0;
			n.vy = 0;
		});
}

// =========================================================
// VIEW CONTROLS
// =========================================================
function centerGraph() {
	camera.x = 0;
	camera.y = 0;
	camera.zoom = .7;
}

function resetGraph() {
	centerGraph();
}

function fitGraph() {
	centerGraph();
}
document
	.getElementById(
		"resetButton"
	)
	.onclick =
	resetGraph;
document
	.getElementById(
		"fitButton"
	)
	.onclick =
	fitGraph;
document
	.getElementById(
		"sidebarButton"
	)
	.onclick =
	() => {
		sidebar.classList.toggle(
			"hidden"
		);
	};
// =========================================================
// MINIMAP
// =========================================================
function drawMiniMap() {
	miniCtx.clearRect(
		0,
		0,
		miniCanvas.width,
		miniCanvas.height
	);
	// =========================
	// DRAW NODES
	// =========================
	miniCtx.fillStyle =
		"#00d9ff";
	nodes.forEach(
		n => {
			if (n.hidden)
				return;
			miniCtx.fillRect(
				miniCanvas.width / 2 +
				n.x / 20,
				miniCanvas.height / 2 +
				n.y / 20,
				3,
				3
			);
		});
	// =========================
	// CAMERA VIEW WINDOW
	// =========================
	let viewWidth =
		canvas.width /
		camera.zoom;
	let viewHeight =
		canvas.height /
		camera.zoom;
	let miniScale = 1 / 20;
	let viewX =
		miniCanvas.width / 2 -
		(
			camera.x /
			camera.zoom
		) *
		miniScale;
	let viewY =
		miniCanvas.height / 2 -
		(
			camera.y /
			camera.zoom
		) *
		miniScale;
	miniCtx.strokeStyle =
		"rgba(255,255,255,0.8)";
	miniCtx.lineWidth =
		2;
	miniCtx.strokeRect(
		viewX -
		(viewWidth * miniScale) / 2,
		viewY -
		(viewHeight * miniScale) / 2,
		viewWidth * miniScale,
		viewHeight * miniScale
	);
}
// =========================================================
// START ENGINE
// =========================================================
createGraph();