// ==== DARK MODE TOGGLE ====
    const themeToggle = document.getElementById("theme-toggle");
    function setColorScheme(scheme) {
      document.documentElement.setAttribute('data-color-scheme', scheme);
      localStorage.setItem('stoneStoryTheme', scheme);
      themeToggle.checked = (scheme === 'light');
    }
    themeToggle.addEventListener('change', () => {
      setColorScheme(themeToggle.checked ? 'light' : 'dark');
    });
    // Init: set to stored preference or dark by default
    (() => {
      const stored = localStorage.getItem('stoneStoryTheme');
      setColorScheme(stored === 'light' ? 'light' : 'dark');
    })();
    // ==== TABS ====
    const tabs = document.querySelectorAll('.tab');
    function showTab(tab) {
      document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(c => c.style.display = 'none');
      document.querySelector('.tab[data-tab="' + tab + '"]').classList.add('active');
      document.querySelector('#tab-' + tab).style.display = '';
    }
    tabs.forEach(tab =>
      tab.addEventListener('click', () => showTab(tab.dataset.tab))
    );
    // ==== DATA ====
    const RECIPES = [
      {inputs: "Sword + Shield", output: "War Hammer"},
      {inputs: "Sword + Crossbow", output: "Heavy Crossbow"},
      {inputs: "Sword + Quarterstaff", output: "Big Sword"},
      {inputs: "Sword + Stone Wand", output: "Stone Sword"},
      {inputs: "Shield + Stone Wand", output: "Stone Shield"},
      {inputs: "Quarterstaff + Stone Wand", output: "Stone Staff"},
      {inputs: "Stone Wand + [Any Rune]", output: "Runestone Wand"},
      {inputs: "War Hammer + Stone Wand", output: "Stone Hammer"},
      {inputs: "Sword + Stone Shield", output: "Stone Hammer"},
      {inputs: "Shield + Stone Sword", output: "Stone Hammer"},
      {inputs: "Heavy Crossbow + Crossbow", output: "Repeating Crossbow"},
      {inputs: "Shield + Crossbow", output: "Dashing Shield"},
      {inputs: "Shield + Dashing Shield", output: "Compound Shield"},
      {inputs: "Shield + Quarterstaff", output: "Towering Shield"},
      {inputs: "Stone Sword + [Any Rune]", output: "Runestone Sword"},
      {inputs: "Sword + [Any Runestone] Wand", output: "Runestone Sword"},
      {inputs: "Stone Shield + [Any Rune]", output: "Runestone Shield"},
      {inputs: "Shield + [Any Runestone] Wand", output: "Runestone Shield"},
      {inputs: "Stone Staff + [Any Rune]", output: "Runestone Staff"},
      {inputs: "Quarterstaff + [Any Runestone] Wand", output: "Runestone Staff"},
      {inputs: "Heavy Crossbow + Stone Wand", output: "Stone Crossbow"},
      {inputs: "Crossbow + Stone Sword", output: "Stone Crossbow"},
      {inputs: "Stone Hammer + [Any Rune]", output: "Runestone Hammer"},
      {inputs: "War Hammer + [Any Runestone] Wand", output: "Runestone Hammer"},
      {inputs: "Sword + [Any Runestone] Shield", output: "Runestone Hammer"},
      {inputs: "Shield + [Any Runestone] Sword", output: "Runestone Hammer"},
      {inputs: "Stone Crossbow + [Any Rune]", output: "Runestone Crossbow"},
      {inputs: "Heavy Crossbow + [Any Runestone] Wand", output: "Runestone Crossbow"},
      {inputs: "Crossbow + [Any Runestone] Sword", output: "Runestone Crossbow"},
      {inputs: "Big Sword + Stone Wand", output: "Big Stone Sword"},
      {inputs: "Sword + Stone Staff", output: "Big Stone Sword"},
      {inputs: "Stone Sword + Quarterstaff", output: "Big Stone Sword"},
      {inputs: "Big Stone Sword + [Any Rune]", output: "Big Runestone Sword"},
      {inputs: "Big Sword + [Any Runestone] Wand", output: "Big Runestone Sword"},
      {inputs: "Sword + [Any Runestone] Staff", output: "Big Runestone Sword"},
      {inputs: "Quarterstaff + [Any Runestone] Sword", output: "Big Runestone Sword"},
      {inputs: "Shield + Big Sword", output: "Bardiche"},
      {inputs: "Sword + Towering Shield", output: "Bardiche"},
      {inputs: "War Hammer + Quarterstaff", output: "Heavy Hammer"},
    ];
    const STONES = [
      {name:"Sight Stone", location:"Rocky Plateau - Beat Dysangelos boss on 3★", uses:"Reveals enemy stats, HP, buffs/debuffs. Essential for combat strategy."},
      {name:"Star Stone", location:"Deadwood Canyon - Collect all glyphs", uses:"Unlocks star-based progression. Enhances stellar abilities & cosmic powers."},
      {name:"Experience Stone", location:"Haunted Halls - Complete all achievements", uses:"Boosts XP gain. Accelerates leveling & skill progression."},
      {name:"Ki Stone", location:"Temple - Beat Nagaraja boss on 3★", uses:"Ki energy for martial arts. Enhances attack speed, critical hits & flow."},
      {name:"Quest Stone", location:"Caves of Fear - Complete all side quests", uses:"Tracks quest progress. Reveals hidden objectives & secret missions."},
      {name:"Ouroboros Stone", location:"Haunted Halls - Beat Hrimnir boss on 3★", uses:"Time manipulation. Slow enemies. Ouroboros rune for temporal effects."},
      {name:"Fissure Stone", location:"Icy Ridge - Explore hidden fissures", uses:"Earth-splitting power. Causes ground tremors & terrain damage."},
      {name:"Triskelion Stone", location:"Mushroom Forest - Ancient shrine discovery", uses:"Triple-aspect magic. Grants balance of mind, body & spirit powers."},
      {name:"Mind Stone", location:"Deadwood Canyon - Beat Poena boss on 3★", uses:"Unlocks Stonescript programming. Allows AI automation & custom scripts."},
      {name:"The Moondial Stone", location:"Temple - Lunar alignment event", uses:"Celestial timing control. Alters day/night cycles & moon-phase effects."},
    ];
    const LOCATIONS = [
      {name:"Rocky Plateau", bestDrop:"Sight Stone, Brass Stone, Boulders", notes:"First area. Beat Dysangelos on 3★ for Sight Stone. Farm boulders for resources."},
      {name:"Deadwood Canyon", bestDrop:"Mind Stone, Wood, Tar", notes:"Beat Poena on 3★ for Mind Stone. Unlocks Stonescript programming."},
      {name:"Caves of Fear", bestDrop:"Aether Stone, Ore", notes:"Beat Bolesh on 3★ for Aether Stone. Dark cave with challenging enemies."},
      {name:"Mushroom Forest", bestDrop:"Vigor Stone, Poison Stone", notes:"Beat Myconid on 3★ for both Vigor & Poison Stones. Toxic enemies."},
      {name:"Haunted Halls", bestDrop:"Ouroboros Stone, Enchants", notes:"Beat Hrimnir on 3★ for Ouroboros Stone. Time-based mechanics."},
      {name:"Boiling Mine", bestDrop:"Fire Stone, Metal", notes:"Beat Bronze Guardian on 3★ for Fire Stone. High heat damage area."},
      {name:"Icy Ridge", bestDrop:"Ice Stone, Frozen Items", notes:"Beat Hrimnir (Yeti form) on 3★ for Ice Stone. Cold damage zone."},
      {name:"Temple", bestDrop:"Qi Stone, Ki Crystals", notes:"Beat Nagaraja on 3★ for Qi Stone. Final main story location."},
    ];
    // Programs: Real Stonescript examples for each location
    const PROGRAMS = [
      {location:"Rocky Plateau", item:"All-Purpose", code:`// Rocky Plateau - Comprehensive automation
// Credit: Based on TheMatjaz StoneScript patterns

?loc = rocky
  // Default loadout - fast clearing
  equipR sword
  equipL shield
  
  // HP management
  ?hp < 30
    activate potion
  
  // Boss: Dysangelos (3 phases)
  ?foe = dysangelos
    ?foe = phase1
      equipR fire sword
      equipL vigor shield
    :?foe = phase2
      equipR poison sword
      equipL aether shield
    :?foe = phase3
      equip bardiche
  
  // Boulder farming (for Brass Stone)
  ?foe.name = "boulder"
    equip hammer
  
  // Speed boost when no enemies
  ?foe = none
    equip dash boots`},
    
      {location:"Deadwood Canyon", item:"All-Purpose", code:`// Deadwood Canyon - Tar & Mind Stone farm
// Credit: Based on TheMatjaz StoneScript patterns

?loc = deadwood
  equipR crossbow
  equipL stone shield
  
  ?hp < 25
    activate potion
  
  // Boss: Poena
  ?foe = poena
    ?foe.hp > 50%
      equipR repeating crossbow
      equipL vigor shield
    :
      equip big sword
  
  // Tar beetle priority
  ?foe.name = "tar beetle"
    equipR fire wand
  
  // Speed clear
  ?foe.distance > 10
    equipR heavy crossbow`},
    
      {location:"Caves of Fear", item:"All-Purpose", code:`// Caves of Fear - Aether Stone & Ore
// Credit: Based on TheMatjaz StoneScript patterns

?loc = cave
  equipR poison sword
  equipL fire wand
  
  ?hp < 20
    activate potion
  
  // Boss: Bolesh (multi-phase)
  ?foe = bolesh
    ?foe.armor > 0
      equipR hammer *7 D
      equipL mind stone
    :?foe.buffs.count > 0
      equipR poison wand dP
      equipL ice wand D
    :
      equip grappling hook
      equipR vigor sword
  
  // Cave bats - quick kills
  ?foe.name = "bat"
    equipR repeating crossbow`},
    
      {location:"Mushroom Forest", item:"All-Purpose", code:`// Mushroom Forest - Vigor & Poison Stones
// Credit: Based on TheMatjaz StoneScript patterns

?loc = mushroom
  equipR fire sword
  equipL vigor wand
  
  ?hp < 30
    activate potion
  
  // Poison resistance needed
  ?debuff.poison
    activate antidote
    equipL vigor wand dL
  
  // Boss: Myconid
  ?foe = myconid
    ?foe.distance < 5
      equip stone staff
      activate smite
    :
      equipR repeating crossbow
      equipL poison shield
  
  // Spore clouds - ranged attack
  ?foe.name = "spore"
    equipR crossbow`},
    
      {location:"Haunted Halls", item:"All-Purpose", code:`// Haunted Halls - Ouroboros Stone
// Credit: Based on TheMatjaz StoneScript patterns

?loc = halls
  equipR aether sword
  equipL poison wand
  
  ?hp < 25
    activate potion
  
  // Boss: Hrimnir
  ?foe = hrimnir
    ?foe.buffs.string = "buff_damage"
      // Wait out damage buff
      equipL compound shield
      equipR none
    :?foe.distance > 15
      equipR heavy crossbow
    :
      equipR vigor hammer
      equipL fire wand
      activate smite
  
  // Ghost enemies - special weapon
  ?foe.name = "ghost"
    equipR aether sword
  
  ?loc.stars > 8
    equipR runestone sword +10`},
    
      {location:"Boiling Mine", item:"All-Purpose", code:`// Boiling Mine - Fire Stone
// Credit: Based on TheMatjaz StoneScript patterns

?loc = mine
  equipR ice hammer
  equipL ice wand
  
  ?hp < 20
    activate potion
  
  // Fire resistance critical
  ?debuff.burning
    activate ice shield
  
  // Boss: Bronze Guardian (timing-based)
  ?foe = guardian
    ?time < 900
      equipR ice hammer *7
      equipL vigor shield
    :?time < 1800
      equipR repeating crossbow
      equipL compound shield
    :?time < 2700
      equipR poison wand dP
      equipL ice wand D
    :
      equip bardiche
      activate smite
  
  // Lava elementals
  ?foe.name = "elemental"
    equipR ice sword
    equipL ice wand`},
    
      {location:"Icy Ridge", item:"All-Purpose", code:`// Icy Ridge - Ice Stone
// Credit: Based on TheMatjaz StoneScript patterns

?loc = ridge
  equipR fire hammer
  equipL fire wand
  
  ?hp < 25
    activate potion
  
  // Cold resistance
  ?debuff.frozen
    activate fire aura
    equipL fire wand dF
  
  // Boss: Hrimnir (Yeti form)
  ?foe = hrimnir
    ?foe.distance > 12
      equipR heavy crossbow
      equipL fire shield
    :?foe.armor > 0
      equipR fire hammer *7 D
    :
      equipR fire sword
      equipL vigor wand
      activate berserk
  
  ?loc.stars > 10
    equipR runestone hammer +12`},
    
      {location:"Temple", item:"All-Purpose", code:`// Temple - Qi Stone (Final area)
// Credit: Based on TheMatjaz StoneScript patterns

?loc = temple
  equipR aether sword
  equipL vigor wand
  
  ?hp < 35
    activate potion
  
  // Boss: Nagaraja (complex multi-phase)
  ?foe = nagaraja
    ?foe = phase1
      ?foe.distance > 17
        equipR repeating crossbow
      :
        equipR poison hammer D
        equipL poison hammer dL
    :?foe = phase2
      ?foe.buffs.count > 0
        equipL compound shield
        equipR vigor sword
      :
        equip bardiche
        activate smite
    :?foe = phase3
      equipR aether hammer
      equipL fire wand
      ?foe.hp < 25%
        activate berserk
  
  // Ki monks - fast attacks
  ?foe.name = "monk"
    equipR repeating crossbow
    equipL vigor shield
  
  ?loc.stars > 15
    equipR big runestone sword +15`},
    
      {location:"ALL LOCATIONS", item:"Master Script", code:`// ONE-FOR-ALL Master Script
// Handles ALL locations automatically
// Credit: Based on TheMatjaz StoneScript patterns

// ===== UNIVERSAL HP MANAGEMENT =====
?hp < 25
  activate potion

?hp < 10
  ?item.potion != empty
    activate potion
  :
    // Emergency - max defense
    equipL compound shield
    equipR vigor shield

// ===== LOCATION AUTO-DETECTION =====

// Rocky Plateau
?loc = rocky
  equipR sword
  equipL shield
  ?foe = dysangelos
    ?foe = phase3
      equip bardiche
    :
      equipR fire sword
      equipL vigor shield
  ?foe.name = "boulder"
    equip hammer

// Deadwood Canyon
:?loc = deadwood
  equipR crossbow
  equipL stone shield
  ?foe = poena
    ?foe.hp > 50%
      equipR repeating crossbow
    :
      equip big sword

// Caves of Fear
:?loc = cave
  equipR poison sword
  equipL fire wand
  ?foe = bolesh
    ?foe.armor > 0
      equipR hammer *7 D
    :
      equip grappling hook
      equipR vigor sword

// Mushroom Forest
:?loc = mushroom
  equipR fire sword
  equipL vigor wand
  ?debuff.poison
    activate antidote
  ?foe = myconid
    ?foe.distance < 5
      equip stone staff
    :
      equipR repeating crossbow

// Haunted Halls
:?loc = halls
  equipR aether sword
  equipL poison wand
  ?foe = hrimnir
    ?foe.buffs.count > 0
      equipL compound shield
    :
      equipR vigor hammer
      activate smite

// Boiling Mine
:?loc = mine
  equipR ice hammer
  equipL ice wand
  ?debuff.burning
    activate ice shield
  ?foe = guardian
    ?time < 900
      equipR ice hammer *7
    :
      equip bardiche

// Icy Ridge
:?loc = ridge
  equipR fire hammer
  equipL fire wand
  ?debuff.frozen
    activate fire aura
  ?foe = hrimnir
    ?foe.distance > 12
      equipR heavy crossbow
    :
      equipR fire hammer *7

// Temple
:?loc = temple
  equipR aether sword
  equipL vigor wand
  ?foe = nagaraja
    ?foe = phase1
      ?foe.distance > 17
        equipR repeating crossbow
      :
        equipR poison hammer D
    :?foe = phase2
      equip bardiche
    :
      equipR aether hammer
      ?foe.hp < 25%
        activate berserk

// ===== SPEED BOOST (NO ENEMIES) =====
?foe = none
  equip dash boots`},
    ];
    // ==== RECIPE TREE BUILDER ====
    function buildRecipeTree(targetItem) {
      // Find all recipes that produce targetItem
      let producers = RECIPES.filter(r => r.output.toLowerCase() === targetItem.toLowerCase());
      if (producers.length === 0) return null;
      
      let tree = [];
      producers.forEach(recipe => {
        let inputs = recipe.inputs.split(' + ').map(i => i.trim());
        let node = {
          output: recipe.output,
          inputs: inputs,
          subTrees: []
        };
        
        // Recursively build tree for each input
        inputs.forEach(input => {
          let subTree = buildRecipeTree(input);
          if (subTree) {
            node.subTrees.push(...subTree);
          }
        });
        
        tree.push(node);
      });
      
      return tree;
    }
    
    function renderRecipeTree(item) {
      let tree = buildRecipeTree(item);
      if (!tree) return `<p style="color:var(--color-danger);">No crafting path found for "${item}"</p>`;
      
      let html = `<div class="recipe-tree">
        <h3 style="color:var(--color-primary);margin-bottom:16px;">Crafting Paths for: ${item}</h3>`;
      
      tree.forEach((node, idx) => {
        html += renderTreeNode(node, 0, idx + 1);
      });
      
      html += `</div>`;
      return html;
    }
    
    function renderTreeNode(node, depth, pathNum) {
      let indent = depth * 24;
      let arrow = depth > 0 ? '↳ ' : `Path ${pathNum}: `;
      let html = `<div style="margin-left:${indent}px;margin-bottom:8px;padding:8px;background:${depth % 2 === 0 ? 'var(--color-surface)' : 'var(--color-bg-1)'};border-left:3px solid var(--color-primary);border-radius:4px;">
        <strong style="color:var(--color-accent);">${arrow}${node.output}</strong> 
        <span style="color:var(--color-text-secondary);">← ${node.inputs.join(' + ')}</span>
      </div>`;
      
      // Render sub-trees
      node.subTrees.forEach(subNode => {
        html += renderTreeNode(subNode, depth + 1, pathNum);
      });
      
      return html;
    }
    
    // ==== RECIPE FILTERING WITH TREE VIEW ====
    let selectedRecipeItem = null;
    
    function renderRecipes(searchIn) {
      if (selectedRecipeItem) {
        // Show tree view
        document.getElementById("recipes-list").innerHTML = renderRecipeTree(selectedRecipeItem);
        return;
      }
      
      let rows = RECIPES.filter(r =>
        (!searchIn) ||
        r.inputs.toLowerCase().includes(searchIn) ||
        r.output.toLowerCase().includes(searchIn)
      ).map(r => `<tr><td>${r.inputs}</td><td style="color:var(--color-primary);font-weight:500;cursor:pointer;" class="recipe-output" data-item="${r.output}">${r.output}</td></tr>`).join("");
      if (!rows) rows = `<tr><td colspan="2" style="color:var(--color-danger);text-align:center;">No recipes found</td></tr>`;
      let html = `<table><thead><tr><th>Inputs</th><th>Output (click for tree)</th></tr></thead><tbody>${rows}</tbody></table>`;
      document.getElementById("recipes-list").innerHTML = html;
      
      // Add click listeners to outputs
      document.querySelectorAll('.recipe-output').forEach(el => {
        el.addEventListener('click', function() {
          selectedRecipeItem = this.dataset.item;
          renderRecipes();
        });
      });
    }
    
    document.getElementById("recipes-search")
      .addEventListener('input', function() {
        selectedRecipeItem = null; // Reset tree view on search
        renderRecipes(this.value.trim().toLowerCase());
      });
    renderRecipes("");
    // ==== STONES ====
    function renderStones(searchIn) {
      let rows = STONES.filter(s =>
        (!searchIn) ||
        s.name.toLowerCase().includes(searchIn) ||
        s.location.toLowerCase().includes(searchIn) ||
        s.uses.toLowerCase().includes(searchIn)
      ).map(s =>
        `<tr>
          <td><span class="stone-type">${s.name}</span></td>
          <td><span class="stone-location">${s.location}</span></td>
          <td><span class="stone-use">${s.uses}</span></td>
        </tr>`
      ).join("");
      if (!rows) rows = `<tr><td colspan="3" style="color:var(--color-danger);text-align:center;">No stones found</td></tr>`;
      let html = `<table>
        <thead>
          <tr><th>Stone</th><th>Location</th><th>Uses</th></tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>`;
      document.getElementById("stones-list").innerHTML = html;
    }
    document.getElementById("stones-search")
      .addEventListener('input', function() {
        renderStones(this.value.trim().toLowerCase());
      });
    renderStones("");
    // ==== LOCATIONS ====
    function renderLocations(searchIn) {
      let rows = LOCATIONS.filter(loc =>
        (!searchIn) ||
        loc.name.toLowerCase().includes(searchIn) ||
        loc.bestDrop.toLowerCase().includes(searchIn) ||
        loc.notes.toLowerCase().includes(searchIn)
      ).map(loc =>
        `<tr>
          <td style="font-weight:600;color:var(--color-primary);">${loc.name}</td>
          <td>${loc.bestDrop}</td>
          <td class="stone-use">${loc.notes}</td>
        </tr>`
      ).join("");
      if (!rows) rows = `<tr><td colspan="3" style="color:var(--color-danger);text-align:center;">No locations found</td></tr>`;
      let html = `<table>
        <thead>
          <tr><th>Location</th><th>Best Drops</th><th>Notes</th></tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>`;
      document.getElementById("locations-list").innerHTML = html;
    }
    document.getElementById("locations-search")
      .addEventListener('input', function() {
        renderLocations(this.value.trim().toLowerCase());
      });
    renderLocations("");
    // ==== PROGRAM HELPER WITH MULTI-LOCATION ====
    // Populate location selector with multi-select capability:
    let locSel = document.getElementById('location-select');
    
    // Add "ALL LOCATIONS" option
    let allOpt = document.createElement("option");
    allOpt.value = "ALL LOCATIONS";
    allOpt.innerText = "🌍 ALL LOCATIONS (Master Script)";
    locSel.appendChild(allOpt);
    
    LOCATIONS.forEach(loc => {
      let opt = document.createElement("option");
      opt.value = loc.name;
      opt.innerText = loc.name;
      locSel.appendChild(opt);
    });
    
    // Multi-location selection state
    let selectedLocations = [];
    
    function toggleLocationSelection(locName) {
      if (locName === "ALL LOCATIONS") {
        selectedLocations = ["ALL LOCATIONS"];
        return;
      }
      
      let idx = selectedLocations.indexOf(locName);
      if (idx > -1) {
        selectedLocations.splice(idx, 1);
      } else {
        selectedLocations = selectedLocations.filter(l => l !== "ALL LOCATIONS");
        selectedLocations.push(locName);
      }
    }
    
    function combinePrograms(locations) {
      if (locations.includes("ALL LOCATIONS")) {
        let master = PROGRAMS.find(p => p.location === "ALL LOCATIONS");
        return master ? master.code : "Master script not found.";
      }
      
      if (locations.length === 0) return "Choose a location to see an optimal program.";
      
      if (locations.length === 1) {
        let match = PROGRAMS.find(p => p.location === locations[0]);
        return match ? match.code : "No program for this location.";
      }
      
      // Combine multiple location programs
      let combined = `// Combined script for: ${locations.join(', ')}\n// Credit: Based on TheMatjaz StoneScript patterns\n\n`;
      combined += `// Universal HP management\n?hp < 25\n  activate potion\n\n`;
      
      locations.forEach((loc, idx) => {
        let prog = PROGRAMS.find(p => p.location === loc);
        if (prog) {
          let prefix = idx === 0 ? '?' : ':?';
          combined += `${prefix}loc = ${loc.toLowerCase().split(' ')[0]}\n`;
          // Extract core logic (skip comments and HP management)
          let lines = prog.code.split('\n').filter(line => 
            !line.includes('//') && 
            !line.includes('?hp') && 
            !line.includes('activate potion') &&
            !line.includes('Credit:') &&
            line.trim() !== ''
          );
          combined += '  ' + lines.join('\n  ') + '\n\n';
        }
      });
      
      return combined;
    }
    
    function suggestProgram(locations, item) {
      if (!locations || locations.length === 0) {
        return "Choose one or more locations (or ALL LOCATIONS) to see optimal program(s).";
      }
      
      let code = combinePrograms(locations);
      let title = locations.includes("ALL LOCATIONS") ? 
        "<strong>🌍 Master Script - ALL LOCATIONS</strong>" :
        `<strong>${locations.join(' + ')}</strong>`;
      
      return `${title}<br><pre style="background:var(--color-surface);padding:12px;border-radius:8px;overflow-x:auto;max-height:400px;"><code>${code}</code></pre>`;
    }
    
    function updateProgramDisplay() {
      let loc = document.getElementById('location-select').value;
      if (loc) {
        toggleLocationSelection(loc);
      }
      
      document.getElementById('program-display').innerHTML = suggestProgram(selectedLocations);
      
      // Update selection display text
      let displayText = selectedLocations.length === 0 ? 
        'None' : 
        selectedLocations.join(', ');
      document.getElementById('selected-display').textContent = displayText;
      
      // Update dropdown
      if (selectedLocations.length > 0) {
        document.getElementById('location-select').value = selectedLocations[selectedLocations.length - 1];
      }
    }
    
    document.getElementById('location-select')
      .addEventListener('change', updateProgramDisplay);

    // ==== ALLOW TABBING BETWEEN SELECTS ====
    document.querySelectorAll('input,select').forEach(el => {
      el.addEventListener('keydown', e => {
        if(e.key === 'Enter') e.blur();
      });
    });

    // ==== EXPOSE: ADD CUSTOM LOCATION/PROGRAM ====
    // Players can extend with custom locations/programs via console:
    window.addCustomLocation = function(name, bestDrop, notes) {
      LOCATIONS.push({name, bestDrop, notes});
      let opt = document.createElement("option");
      opt.value = name;
      opt.innerText = name;
      document.getElementById('location-select').appendChild(opt);
      renderLocations(
        document.getElementById("locations-search").value.trim().toLowerCase()
      );
    }
    window.addCustomProgram = function(location, item, code) {
      PROGRAMS.push({location, item, code});
    }
    
    // ==== COPY TO CLIPBOARD ====
    function copyProgramToClipboard() {
      let code = combinePrograms(selectedLocations);
      navigator.clipboard.writeText(code).then(() => {
        alert('Program copied to clipboard! Paste it into your Mind Stone.');
      }).catch(err => {
        console.error('Failed to copy:', err);
      });
    }

    // ==== QoL: CTRL+F focus on currently visible search ====
    document.addEventListener('keydown', function(e){
      if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
        e.preventDefault();
        if(document.querySelector('.tab.active').dataset.tab === 'recipes')
          document.getElementById('recipes-search').focus();
        else if(document.querySelector('.tab.active').dataset.tab === 'stones')
          document.getElementById('stones-search').focus();
        else if(document.querySelector('.tab.active').dataset.tab === 'locations')
          document.getElementById('locations-search').focus();
        else if(document.querySelector('.tab.active').dataset.tab === 'programs')
          document.getElementById('item-select').focus();
      }
    });