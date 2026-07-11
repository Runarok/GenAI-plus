const cubes = 
[

  // =====================================
  // PART 1
  // ROOT + STANDARD + NxN FAMILY
  // =====================================

  {
    id: "rubiks_cube",
    name: "Rubik's Cube",
    image: "images/rubiks_cube.webp",
    parent: null,
    category: "Root",
    tags: [
      "cube",
      "standard",
      "face-turning",
      "3x3"
    ],
    description: "The original 3x3 twisty puzzle and foundation of modern cubing."
  }
  ,

  {
    id: "standard_cubes",
    name: "Standard Cubes",
    image: "images/standard_cube.webp",
    parent: "rubiks_cube",
    category: "Family",
    tags: [
      "cube",
      "standard"
    ],
    description: "Traditional cubic puzzles based on the Rubik's Cube design."
  },

  // =====================================
  // SMALL CUBES
  // =====================================

  {
    id: "1x1_cube",
    name: "1x1 Cube",
    image: "images/1x1_cube.webp",
    parent: "standard_cubes",
    category: "NxN",
    tags: [
      "1x1",
      "cube",
      "face-turning"
    ],
    description: "A single-piece cube puzzle."
  },

  {
    id: "2x2_cube",
    name: "2x2 Cube",
    image: "images/2x2_cube.webp",
    parent: "standard_cubes",
    category: "NxN",
    tags: [
      "2x2",
      "cube",
      "face-turning",
      "pocket-cube"
    ],
    description: "A smaller cube without fixed centers or edges."
  },

  {
    id: "3x3_cube",
    name: "3x3 Cube",
    image: "images/3x3_cube.webp",
    parent: "standard_cubes",
    category: "NxN",
    tags: [
      "3x3",
      "cube",
      "face-turning",
      "wca"
    ],
    description: "The classic Rubik's Cube format."
  },

  {
    id: "4x4_cube",
    name: "4x4 Cube",
    image: "images/4x4_cube.webp",
    parent: "standard_cubes",
    category: "NxN",
    tags: [
      "4x4",
      "cube",
      "face-turning",
      "wca"
    ],
    description: "A larger cube with no fixed centers."
  },

  {
    id: "5x5_cube",
    name: "5x5 Cube",
    image: "images/5x5_cube.webp",
    parent: "standard_cubes",
    category: "NxN",
    tags: [
      "5x5",
      "cube",
      "face-turning",
      "wca"
    ],
    description: "A larger cube with movable centers and edges."
  },

  // =====================================
  // NxN FAMILY
  // =====================================

  {
    id: "6x6_cube",
    name: "6x6 Cube",
    image: "images/6x6_cube.webp",
    parent: "standard_cubes",
    category: "NxN",
    tags: ["6x6", "cube", "face-turning", "big-cube"],
    description: "A 6 layered cube puzzle."
  },

  {
    id: "7x7_cube",
    name: "7x7 Cube",
    image: "images/7x7_cube.webp",
    parent: "standard_cubes",
    category: "NxN",
    tags: ["7x7", "cube", "face-turning", "wca"],
    description: "The largest official WCA cube event."
  },

  {
    id: "8x8_cube",
    name: "8x8 Cube",
    image: "images/8x8_cube.webp",
    parent: "standard_cubes",
    category: "NxN",
    tags: ["8x8", "cube", "big-cube"],
    description: "An even layered cube puzzle."
  },

  {
    id: "9x9_cube",
    name: "9x9 Cube",
    image: "images/9x9_cube.webp",
    parent: "standard_cubes",
    category: "NxN",
    tags: ["9x9", "cube", "big-cube"],
    description: "Large NxN cube."
  },

  {
    id: "10x10_cube",
    name: "10x10 Cube",
    image: "images/10x10_cube.webp",
    parent: "standard_cubes",
    category: "NxN",
    tags: ["10x10", "cube", "big-cube"],
    description: "Large NxN cube."
  },

  {
    id: "11x11_cube",
    name: "11x11 Cube",
    image: "images/11x11_cube.webp",
    parent: "standard_cubes",
    category: "NxN",
    tags: ["11x11", "cube", "big-cube"],
    description: "Large NxN cube."
  },

  {
    id: "12x12_cube",
    name: "12x12 Cube",
    image: "images/12x12_cube.webp",
    parent: "standard_cubes",
    category: "NxN",
    tags: ["12x12", "cube", "big-cube"],
    description: "Large NxN cube."
  },

  {
    id: "13x13_cube",
    name: "13x13 Cube",
    image: "images/13x13_cube.webp",
    parent: "standard_cubes",
    category: "NxN",
    tags: ["13x13", "cube", "big-cube"],
    description: "Large NxN cube."
  },

  {
    id: "14x14_cube",
    name: "14x14 Cube",
    image: "images/14x14_cube.webp",
    parent: "standard_cubes",
    category: "NxN",
    tags: ["14x14", "cube", "big-cube"],
    description: "Large NxN cube."
  },

  {
    id: "15x15_cube",
    name: "15x15 Cube",
    image: "images/15x15_cube.webp",
    parent: "standard_cubes",
    category: "NxN",
    tags: ["15x15", "cube", "big-cube"],
    description: "Large NxN cube."
  },

  {
    id: "17x17_cube",
    name: "17x17 Cube",
    image: "images/17x17_cube.webp",
    parent: "standard_cubes",
    category: "NxN",
    tags: ["17x17", "cube", "big-cube"],
    description: "Large NxN cube."
  },

  {
    id: "19x19_cube",
    name: "19x19 Cube",
    image: "images/19x19_cube.webp",
    parent: "standard_cubes",
    category: "NxN",
    tags: ["19x19", "cube", "big-cube"],
    description: "Large NxN cube."
  },

  {
    id: "21x21_cube",
    name: "21x21 Cube",
    image: "images/21x21_cube.webp",
    parent: "standard_cubes",
    category: "NxN",
    tags: ["21x21", "cube", "big-cube"],
    description: "Large NxN cube."
  },

  {
    id: "25x25_cube",
    name: "25x25 Cube",
    image: "images/25x25_cube.webp",
    parent: "standard_cubes",
    category: "NxN",
    tags: ["25x25", "cube", "big-cube"],
    description: "Extreme sized NxN cube."
  },

  {
    id: "33x33_cube",
    name: "33x33 Cube",
    image: "images/33x33_cube.webp",
    parent: "standard_cubes",
    category: "NxN",
    tags: ["33x33", "cube", "big-cube", "extreme"],
    description: "An extremely large NxN cube."
  },

  // =====================================
  // SPEEDCUBE VARIANTS
  // =====================================

  {
    id: "magnetic_3x3",
    name: "Magnetic 3x3",
    image: "images/magnetic_3x3.webp",
    parent: "3x3_cube",
    category: "Speed Cube",
    tags: [
      "3x3",
      "magnetic",
      "speedcube"
    ],
    description: "A 3x3 cube using magnets for improved stability."
  },

  {
    id: "stickerless_3x3",
    name: "Stickerless 3x3",
    image: "images/stickerless_3x3.webp",
    parent: "3x3_cube",
    category: "Speed Cube",
    tags: [
      "3x3",
      "stickerless",
      "speedcube"
    ],
    description: "A colored plastic cube without stickers."
  },

  {
    id: "black_3x3",
    name: "Black 3x3",
    image: "images/black_3x3.webp",
    parent: "3x3_cube",
    category: "Speed Cube",
    tags: [
      "3x3",
      "black",
      "classic"
    ],
    description: "Classic black plastic cube."
  },

  {
    id: "white_3x3",
    name: "White 3x3",
    image: "images/white_3x3.webp",
    parent: "3x3_cube",
    category: "Speed Cube",
    tags: [
      "3x3",
      "white"
    ],
    description: "Classic white plastic cube."
  },

  {
    id: "transparent_3x3",
    name: "Transparent 3x3",
    image: "images/transparent_3x3.webp",
    parent: "3x3_cube",
    category: "Special Cube",
    tags: [
      "3x3",
      "transparent",
      "display"
    ],
    description: "Clear body cube design."
  },

  {
    id: "mirror_3x3",
    name: "Mirror 3x3",
    image: "images/mirror_3x3.webp",
    parent: "3x3_cube",
    category: "Special Cube",
    tags: [
      "3x3",
      "mirror",
      "shape-mod"
    ],
    description: "A mirror-finish variation of the 3x3."
  },

  {
    id: "picture_cube",
    name: "Picture Cube",
    image: "images/picture_cube.webp",
    parent: "3x3_cube",
    category: "Special Cube",
    tags: [
      "3x3",
      "picture",
      "pattern"
    ],
    description: "A cube solved by image orientation."
  },

  {
    id: "supercube",
    name: "Super Cube",
    image: "images/supercube.webp",
    parent: "3x3_cube",
    category: "Special Cube",
    tags: [
      "3x3",
      "orientation",
      "center"
    ],
    description: "A cube where center orientation matters."
  },
  // =====================================
  // PART 2
  // SHAPE MODS FAMILY
  // =====================================

  {
    id: "shape_mods",
    name: "Shape Mods",
    image: "images/shape_mods.webp",
    parent: "rubiks_cube",
    category: "Family",
    tags: [
      "shape-mod",
      "cube",
      "non-standard"
    ],
    description: "Cubes that modify the external shape while keeping twisty puzzle mechanisms."
  },

  {
    id: "mirror_cube",
    name: "Mirror Cube",
    image: "images/mirror_cube.webp",
    parent: "shape_mods",
    category: "Shape Mod",
    tags: [
      "mirror",
      "3x3",
      "shape-mod",
      "face-turning"
    ],
    description: "A cube where pieces are distinguished by shape instead of color."
  },

  {
    id: "mirror_blocks",
    name: "Mirror Blocks",
    image: "images/mirror_blocks.webp",
    parent: "shape_mods",
    category: "Shape Mod",
    tags: [
      "mirror",
      "blocks",
      "shape-mod"
    ],
    description: "A block-style mirror cube variant."
  },

  {
    id: "ghost_cube",
    name: "Ghost Cube",
    image: "images/ghost_cube.webp",
    parent: "shape_mods",
    category: "Shape Mod",
    tags: [
      "ghost",
      "shape-mod",
      "3x3",
      "supercube"
    ],
    description: "A highly distorted 3x3 shape modification."
  },

  {
    id: "ghost_cube_2",
    name: "Ghost Cube II",
    image: "images/ghost_cube_2.webp",
    parent: "ghost_cube",
    category: "Shape Mod",
    tags: [
      "ghost",
      "advanced",
      "shape-shifting"
    ],
    description: "A more complex ghost cube variation."
  },

  {
    id: "fisher_cube",
    name: "Fisher Cube",
    image: "images/fisher_cube.webp",
    parent: "shape_mods",
    category: "Shape Mod",
    tags: [
      "fisher",
      "3x3",
      "shape-mod"
    ],
    description: "A cube with sliced and rotated layers creating a new shape."
  },

  {
    id: "master_fisher_cube",
    name: "Master Fisher Cube",
    image: "images/master_fisher_cube.webp",
    parent: "fisher_cube",
    category: "Shape Mod",
    tags: [
      "fisher",
      "4x4",
      "shape-mod"
    ],
    description: "A larger Fisher style cube."
  },

  {
    id: "windmill_cube",
    name: "Windmill Cube",
    image: "images/windmill_cube.webp",
    parent: "shape_mods",
    category: "Shape Mod",
    tags: [
      "windmill",
      "3x3",
      "shape-mod"
    ],
    description: "A rotated layer shape modification."
  },

  {
    id: "axis_cube",
    name: "Axis Cube",
    image: "images/axis_cube.webp",
    parent: "shape_mods",
    category: "Shape Mod",
    tags: [
      "axis",
      "shape-mod",
      "3x3"
    ],
    description: "A cube with shifted axis orientation."
  },

  {
    id: "master_axis_cube",
    name: "Master Axis Cube",
    image: "images/master_axis_cube.webp",
    parent: "axis_cube",
    category: "Shape Mod",
    tags: [
      "axis",
      "advanced",
      "shape-mod"
    ],
    description: "A more complex Axis cube."
  },

  {
    id: "bandaged_axis",
    name: "Bandaged Axis Cube",
    image: "images/bandaged_axis.webp",
    parent: "axis_cube",
    category: "Shape Mod",
    tags: [
      "axis",
      "bandaged"
    ],
    description: "Axis cube combined with blocked pieces."
  },

  {
    id: "mirror_axis_cube",
    name: "Mirror Axis Cube",
    image: "images/mirror_axis_cube.webp",
    parent: "axis_cube",
    category: "Shape Mod",
    tags: [
      "axis",
      "mirror",
      "shape-mod"
    ],
    description: "Mirror finish Axis cube."
  },

  {
    id: "windmill_mirror",
    name: "Mirror Windmill Cube",
    image: "images/mirror_windmill.webp",
    parent: "windmill_cube",
    category: "Shape Mod",
    tags: [
      "windmill",
      "mirror"
    ],
    description: "Mirror version of Windmill Cube."
  },

  {
    id: "fisher_mirror",
    name: "Mirror Fisher Cube",
    image: "images/mirror_fisher.webp",
    parent: "fisher_cube",
    category: "Shape Mod",
    tags: [
      "fisher",
      "mirror"
    ],
    description: "Mirror surfaced Fisher cube."
  },

  {
    id: "mastermorphix",
    name: "Mastermorphix",
    image: "images/mastermorphix.webp",
    parent: "shape_mods",
    category: "Shape Mod",
    tags: [
      "morphix",
      "shape-mod",
      "tetra-like"
    ],
    description: "A tetrahedral style cube modification."
  },

  {
    id: "2x2_mastermorphix",
    name: "2x2 Mastermorphix",
    image: "images/2x2_mastermorphix.webp",
    parent: "mastermorphix",
    category: "Shape Mod",
    tags: [
      "2x2",
      "morphix"
    ],
    description: "Small Mastermorphix variant."
  },

  {
    id: "4x4_mastermorphix",
    name: "4x4 Mastermorphix",
    image: "images/4x4_mastermorphix.webp",
    parent: "mastermorphix",
    category: "Shape Mod",
    tags: [
      "4x4",
      "morphix"
    ],
    description: "Large Mastermorphix variant."
  },

  {
    id: "5x5_mastermorphix",
    name: "5x5 Mastermorphix",
    image: "images/5x5_mastermorphix.webp",
    parent: "mastermorphix",
    category: "Shape Mod",
    tags: [
      "5x5",
      "morphix"
    ],
    description: "Five layered Mastermorphix."
  },

  {
    id: "axis_morphix",
    name: "Axis Morphix",
    image: "images/axis_morphix.webp",
    parent: "mastermorphix",
    category: "Shape Mod",
    tags: [
      "morphix",
      "axis",
      "shape-mod"
    ],
    description: "Combination of Axis and Morphix designs."
  },

  {
    id: "ghost_morphix",
    name: "Ghost Morphix",
    image: "images/ghost_morphix.webp",
    parent: "mastermorphix",
    category: "Shape Mod",
    tags: [
      "ghost",
      "morphix"
    ],
    description: "Ghost style Morphix puzzle."
  },

  {
    id: "penrose_cube",
    name: "Penrose Cube",
    image: "images/penrose_cube.webp",
    parent: "shape_mods",
    category: "Shape Mod",
    tags: [
      "penrose",
      "shape-mod",
      "3x3"
    ],
    description: "Optical illusion based cube design."
  },

  {
    id: "crazy_cube",
    name: "Crazy Cube",
    image: "images/crazy_cube.webp",
    parent: "shape_mods",
    category: "Shape Mod",
    tags: [
      "crazy",
      "center-turning",
      "shape-mod"
    ],
    description: "Cube with additional circular turning mechanisms."
  },

  {
    id: "crazy_3x3",
    name: "Crazy 3x3",
    image: "images/crazy_3x3.webp",
    parent: "crazy_cube",
    category: "Shape Mod",
    tags: [
      "crazy",
      "3x3"
    ],
    description: "Crazy version of the classic cube."
  },

  {
    id: "crazy_4x4",
    name: "Crazy 4x4",
    image: "images/crazy_4x4.webp",
    parent: "crazy_cube",
    category: "Shape Mod",
    tags: [
      "crazy",
      "4x4"
    ],
    description: "Crazy mechanism applied to 4x4."
  },

  {
    id: "clover_cube",
    name: "Clover Cube",
    image: "images/clover_cube.webp",
    parent: "shape_mods",
    category: "Shape Mod",
    tags: [
      "clover",
      "edge-turning"
    ],
    description: "A clover shaped twisty puzzle."
  },

  {
    id: "clover_plus",
    name: "Clover Plus",
    image: "images/clover_plus.webp",
    parent: "clover_cube",
    category: "Shape Mod",
    tags: [
      "clover",
      "advanced"
    ],
    description: "Advanced Clover variation."
  },

  {
    id: "twist_cube",
    name: "Twist Cube",
    image: "images/twist_cube.webp",
    parent: "shape_mods",
    category: "Shape Mod",
    tags: [
      "twist",
      "shape-mod"
    ],
    description: "A twisted cube design."
  },

  {
    id: "super_twist_cube",
    name: "Super Twist Cube",
    image: "images/super_twist_cube.webp",
    parent: "twist_cube",
    category: "Shape Mod",
    tags: [
      "twist",
      "advanced"
    ],
    description: "Complex twist cube variation."
  },

  {
    id: "evil_cube",
    name: "Evil Cube",
    image: "images/evil_cube.webp",
    parent: "shape_mods",
    category: "Shape Mod",
    tags: [
      "shape-mod",
      "irregular"
    ],
    description: "An irregular cube modification."
  },

  {
    id: "impossible_cube",
    name: "Impossible Cube",
    image: "images/impossible_cube.webp",
    parent: "shape_mods",
    category: "Shape Mod",
    tags: [
      "impossible",
      "illusion"
    ],
    description: "A cube designed around visual impossibility."
  },

  {
    id: "rainbow_cube",
    name: "Rainbow Cube",
    image: "images/rainbow_cube.webp",
    parent: "shape_mods",
    category: "Shape Mod",
    tags: [
      "color",
      "pattern"
    ],
    description: "A colorful cube variation."
  },

  {
    id: "picture_cube_shape",
    name: "Picture Shape Cube",
    image: "images/picture_shape_cube.webp",
    parent: "shape_mods",
    category: "Shape Mod",
    tags: [
      "picture",
      "pattern"
    ],
    description: "Image-based cube modification."
  },

  {
    id: "void_mirror",
    name: "Void Mirror Cube",
    image: "images/void_mirror.webp",
    parent: "shape_mods",
    category: "Shape Mod",
    tags: [
      "void",
      "mirror"
    ],
    description: "A mirror cube without visible core."
  },

  {
    id: "ghost_void",
    name: "Ghost Void Cube",
    image: "images/ghost_void.webp",
    parent: "void_mirror",
    category: "Shape Mod",
    tags: [
      "ghost",
      "void"
    ],
    description: "Ghost design combined with void mechanism."
  },

  {
    id: "transparent_cube",
    name: "Transparent Cube",
    image: "images/transparent_cube.webp",
    parent: "shape_mods",
    category: "Special",
    tags: [
      "transparent",
      "display"
    ],
    description: "Clear body cube design."
  },

  {
    id: "metal_cube",
    name: "Metal Cube",
    image: "images/metal_cube.webp",
    parent: "shape_mods",
    category: "Special",
    tags: [
      "metal",
      "collector"
    ],
    description: "Metal body cube design."
  },

  {
    id: "wood_cube",
    name: "Wooden Cube",
    image: "images/wood_cube.webp",
    parent: "shape_mods",
    category: "Special",
    tags: [
      "wood",
      "collector"
    ],
    description: "Wooden cube design."
  },
  // =====================================
  // PART 3
  // CORNER TURNING / SKEWB FAMILY
  // =====================================

  {
    id: "corner_turning",
    name: "Corner Turning Puzzles",
    image: "images/corner_turning.webp",
    parent: "rubiks_cube",
    category: "Family",
    tags: [
      "corner-turning",
      "vertex-turning",
      "twisty"
    ],
    description: "Puzzles that rotate around corners or vertices instead of faces."
  },

  {
    id: "skewb_family",
    name: "Skewb Family",
    image: "images/skewb_family.webp",
    parent: "corner_turning",
    category: "Family",
    tags: [
      "skewb",
      "corner-turning"
    ],
    description: "A family of corner turning puzzles based on the Skewb mechanism."
  },

  {
    id: "skewb",
    name: "Skewb",
    image: "images/skewb.webp",
    parent: "skewb_family",
    category: "Corner Turning",
    tags: [
      "skewb",
      "corner-turning",
      "wca"
    ],
    description: "A corner-turning cube puzzle with four-axis rotations."
  },

  {
    id: "skewb_plus",
    name: "Skewb Plus",
    image: "images/skewb_plus.webp",
    parent: "skewb",
    category: "Corner Turning",
    tags: [
      "skewb",
      "variant"
    ],
    description: "A modified Skewb design."
  },

  {
    id: "master_skewb",
    name: "Master Skewb",
    image: "images/master_skewb.webp",
    parent: "skewb_family",
    category: "Corner Turning",
    tags: [
      "skewb",
      "advanced"
    ],
    description: "A larger and more complex Skewb."
  },

  {
    id: "elite_skewb",
    name: "Elite Skewb",
    image: "images/elite_skewb.webp",
    parent: "master_skewb",
    category: "Corner Turning",
    tags: [
      "skewb",
      "expert"
    ],
    description: "An advanced Skewb variant."
  },

  {
    id: "ultimate_skewb",
    name: "Ultimate Skewb",
    image: "images/ultimate_skewb.webp",
    parent: "skewb_family",
    category: "Corner Turning",
    tags: [
      "skewb",
      "extreme"
    ],
    description: "A complex Skewb modification."
  },

  {
    id: "skewb_diamond",
    name: "Skewb Diamond",
    image: "images/skewb_diamond.webp",
    parent: "skewb_family",
    category: "Corner Turning",
    tags: [
      "skewb",
      "diamond",
      "vertex"
    ],
    description: "A diamond-shaped Skewb puzzle."
  },

  {
    id: "master_skewb_diamond",
    name: "Master Skewb Diamond",
    image: "images/master_skewb_diamond.webp",
    parent: "skewb_diamond",
    category: "Corner Turning",
    tags: [
      "skewb",
      "diamond",
      "advanced"
    ],
    description: "Larger Skewb Diamond variant."
  },

  {
    id: "skewb_ball",
    name: "Skewb Ball",
    image: "images/skewb_ball.webp",
    parent: "skewb_family",
    category: "Corner Turning",
    tags: [
      "skewb",
      "spherical"
    ],
    description: "A spherical Skewb variation."
  },

  {
    id: "skewb_hex",
    name: "Skewb Hex",
    image: "images/skewb_hex.webp",
    parent: "skewb_family",
    category: "Corner Turning",
    tags: [
      "skewb",
      "hexagonal"
    ],
    description: "Hexagonal Skewb style puzzle."
  },

  // =====================================
  // IVY FAMILY
  // =====================================

  {
    id: "ivy_family",
    name: "Ivy Cube Family",
    image: "images/ivy_family.webp",
    parent: "corner_turning",
    category: "Family",
    tags: [
      "ivy",
      "corner-turning"
    ],
    description: "Simple corner-turning puzzles derived from Skewb mechanics."
  },

  {
    id: "ivy_cube",
    name: "Ivy Cube",
    image: "images/ivy_cube.webp",
    parent: "ivy_family",
    category: "Corner Turning",
    tags: [
      "ivy",
      "corner-turning",
      "beginner"
    ],
    description: "A four-axis corner turning puzzle."
  },

  {
    id: "ivy_plus",
    name: "Ivy Plus",
    image: "images/ivy_plus.webp",
    parent: "ivy_cube",
    category: "Corner Turning",
    tags: [
      "ivy",
      "variant"
    ],
    description: "Modified Ivy Cube design."
  },

  {
    id: "master_ivy",
    name: "Master Ivy Cube",
    image: "images/master_ivy.webp",
    parent: "ivy_family",
    category: "Corner Turning",
    tags: [
      "ivy",
      "advanced"
    ],
    description: "More complex Ivy style puzzle."
  },

  {
    id: "ivy_ball",
    name: "Ivy Ball",
    image: "images/ivy_ball.webp",
    parent: "ivy_family",
    category: "Corner Turning",
    tags: [
      "ivy",
      "spherical"
    ],
    description: "Ball-shaped Ivy puzzle."
  },

  // =====================================
  // REX FAMILY
  // =====================================

  {
    id: "rex_family",
    name: "Rex Family",
    image: "images/rex_family.webp",
    parent: "corner_turning",
    category: "Family",
    tags: [
      "rex",
      "corner-turning"
    ],
    description: "Corner turning puzzles based on Rex mechanisms."
  },

  {
    id: "rex_cube",
    name: "Rex Cube",
    image: "images/rex_cube.webp",
    parent: "rex_family",
    category: "Corner Turning",
    tags: [
      "rex",
      "corner-turning"
    ],
    description: "A corner turning cube variant."
  },

  {
    id: "master_rex_cube",
    name: "Master Rex Cube",
    image: "images/master_rex_cube.webp",
    parent: "rex_cube",
    category: "Corner Turning",
    tags: [
      "rex",
      "advanced"
    ],
    description: "Advanced Rex Cube."
  },

  {
    id: "rex_star",
    name: "Rex Star",
    image: "images/rex_star.webp",
    parent: "rex_family",
    category: "Corner Turning",
    tags: [
      "rex",
      "star"
    ],
    description: "Star-shaped Rex puzzle."
  },

  // =====================================
  // DINO FAMILY
  // =====================================

  {
    id: "dino_family",
    name: "Dino Cube Family",
    image: "images/dino_family.webp",
    parent: "corner_turning",
    category: "Family",
    tags: [
      "dino",
      "corner-turning"
    ],
    description: "Simple corner-axis puzzles."
  },

  {
    id: "dino_cube",
    name: "Dino Cube",
    image: "images/dino_cube.webp",
    parent: "dino_family",
    category: "Corner Turning",
    tags: [
      "dino",
      "corner-turning"
    ],
    description: "A corner twisting puzzle with triangular faces."
  },

  {
    id: "dino_star",
    name: "Dino Star",
    image: "images/dino_star.webp",
    parent: "dino_family",
    category: "Corner Turning",
    tags: [
      "dino",
      "star"
    ],
    description: "Star shaped Dino variant."
  },

  {
    id: "dino_plus",
    name: "Dino Plus",
    image: "images/dino_plus.webp",
    parent: "dino_family",
    category: "Corner Turning",
    tags: [
      "dino",
      "variant"
    ],
    description: "Modified Dino puzzle."
  },

  // =====================================
  // CLOVER FAMILY
  // =====================================

  {
    id: "clover_family",
    name: "Clover Family",
    image: "images/clover_family.webp",
    parent: "corner_turning",
    category: "Family",
    tags: [
      "clover",
      "corner-turning"
    ],
    description: "Leaf-shaped corner turning puzzles."
  },

  {
    id: "clover_cube",
    name: "Clover Cube",
    image: "images/clover_cube.webp",
    parent: "clover_family",
    category: "Corner Turning",
    tags: [
      "clover",
      "shape-mod"
    ],
    description: "A clover-shaped twisty puzzle."
  },

  {
    id: "clover_plus",
    name: "Clover Plus",
    image: "images/clover_plus.webp",
    parent: "clover_cube",
    category: "Corner Turning",
    tags: [
      "clover",
      "advanced"
    ],
    description: "Enhanced Clover mechanism."
  },

  {
    id: "master_clover",
    name: "Master Clover",
    image: "images/master_clover.webp",
    parent: "clover_family",
    category: "Corner Turning",
    tags: [
      "clover",
      "expert"
    ],
    description: "Complex Clover variation."
  },

  // =====================================
  // OTHER CORNER TURNING
  // =====================================

  {
    id: "star_skewb",
    name: "Star Skewb",
    image: "images/star_skewb.webp",
    parent: "corner_turning",
    category: "Corner Turning",
    tags: [
      "skewb",
      "star"
    ],
    description: "Star shaped Skewb modification."
  },

  {
    id: "ball_skewb",
    name: "Ball Skewb",
    image: "images/ball_skewb.webp",
    parent: "corner_turning",
    category: "Corner Turning",
    tags: [
      "skewb",
      "ball"
    ],
    description: "Spherical Skewb design."
  },

  {
    id: "corner_master",
    name: "Corner Master",
    image: "images/corner_master.webp",
    parent: "corner_turning",
    category: "Corner Turning",
    tags: [
      "corner-turning",
      "advanced"
    ],
    description: "Experimental corner turning puzzle."
  },

  {
    id: "vertex_cube",
    name: "Vertex Cube",
    image: "images/vertex_cube.webp",
    parent: "corner_turning",
    category: "Corner Turning",
    tags: [
      "vertex",
      "corner-turning"
    ],
    description: "A vertex based cube mechanism."
  },
  // =====================================
  // PART 4
  // GEAR FAMILY
  // =====================================

  {
    id: "gear_family",
    name: "Gear Family",
    image: "images/gear_family.webp",
    parent: "rubiks_cube",
    category: "Family",
    tags: [
      "gear",
      "mechanical",
      "face-turning"
    ],
    description: "Twisty puzzles using interlocking gear mechanisms."
  },

  {
    id: "gear_cube",
    name: "Gear Cube",
    image: "images/gear_cube.webp",
    parent: "gear_family",
    category: "Gear",
    tags: [
      "gear",
      "cube",
      "face-turning"
    ],
    description: "The original gear-based cube puzzle."
  },

  {
    id: "gear_cube_extreme",
    name: "Gear Cube Extreme",
    image: "images/gear_cube_extreme.webp",
    parent: "gear_cube",
    category: "Gear",
    tags: [
      "gear",
      "advanced"
    ],
    description: "A more complex gear cube variation."
  },

  {
    id: "gear_cube_2",
    name: "Gear Cube 2",
    image: "images/gear_cube_2.webp",
    parent: "gear_family",
    category: "Gear",
    tags: [
      "gear",
      "cube"
    ],
    description: "Second generation gear cube design."
  },

  {
    id: "gear_master",
    name: "Gear Master",
    image: "images/gear_master.webp",
    parent: "gear_family",
    category: "Gear",
    tags: [
      "gear",
      "advanced"
    ],
    description: "A larger gear mechanism puzzle."
  },

  {
    id: "gear_shift",
    name: "Gear Shift",
    image: "images/gear_shift.webp",
    parent: "gear_family",
    category: "Gear",
    tags: [
      "gear",
      "shape-shifting"
    ],
    description: "Gear puzzle with shifting geometry."
  },

  {
    id: "gear_shift_plus",
    name: "Gear Shift Plus",
    image: "images/gear_shift_plus.webp",
    parent: "gear_shift",
    category: "Gear",
    tags: [
      "gear",
      "advanced"
    ],
    description: "Enhanced Gear Shift variant."
  },

  // =====================================
  // GEAR BALL FAMILY
  // =====================================

  {
    id: "gear_ball",
    name: "Gear Ball",
    image: "images/gear_ball.webp",
    parent: "gear_family",
    category: "Gear",
    tags: [
      "gear",
      "ball",
      "spherical"
    ],
    description: "A spherical gear mechanism puzzle."
  },

  {
    id: "gear_ball_plus",
    name: "Gear Ball Plus",
    image: "images/gear_ball_plus.webp",
    parent: "gear_ball",
    category: "Gear",
    tags: [
      "gear",
      "ball"
    ],
    description: "Modified spherical gear puzzle."
  },

  {
    id: "gear_sphere",
    name: "Gear Sphere",
    image: "images/gear_sphere.webp",
    parent: "gear_family",
    category: "Gear",
    tags: [
      "gear",
      "sphere"
    ],
    description: "A spherical gear-based puzzle."
  },

  // =====================================
  // GEAR PYRAMINX FAMILY
  // =====================================

  {
    id: "gear_pyraminx",
    name: "Gear Pyraminx",
    image: "images/gear_pyraminx.webp",
    parent: "gear_family",
    category: "Gear",
    tags: [
      "gear",
      "pyraminx",
      "tetrahedron"
    ],
    description: "A Pyraminx shaped gear puzzle."
  },

  {
    id: "gear_master_pyraminx",
    name: "Gear Master Pyraminx",
    image: "images/gear_master_pyraminx.webp",
    parent: "gear_pyraminx",
    category: "Gear",
    tags: [
      "gear",
      "pyraminx",
      "advanced"
    ],
    description: "Advanced Gear Pyraminx variant."
  },

  {
    id: "gear_pyraminx_duo",
    name: "Gear Pyraminx Duo",
    image: "images/gear_pyraminx_duo.webp",
    parent: "gear_pyraminx",
    category: "Gear",
    tags: [
      "gear",
      "pyraminx"
    ],
    description: "Compact gear tetrahedral puzzle."
  },

  // =====================================
  // GEAR MEGAMINX FAMILY
  // =====================================

  {
    id: "gear_megaminx",
    name: "Gear Megaminx",
    image: "images/gear_megaminx.webp",
    parent: "gear_family",
    category: "Gear",
    tags: [
      "gear",
      "megaminx",
      "dodecahedron"
    ],
    description: "A Megaminx style gear puzzle."
  },

  {
    id: "gear_gigaminx",
    name: "Gear Gigaminx",
    image: "images/gear_gigaminx.webp",
    parent: "gear_megaminx",
    category: "Gear",
    tags: [
      "gear",
      "gigaminx"
    ],
    description: "Large gear dodecahedron puzzle."
  },

  // =====================================
  // GEAR BARREL FAMILY
  // =====================================

  {
    id: "gear_barrel",
    name: "Gear Barrel",
    image: "images/gear_barrel.webp",
    parent: "gear_family",
    category: "Gear",
    tags: [
      "gear",
      "barrel"
    ],
    description: "Barrel shaped gear puzzle."
  },

  {
    id: "gear_cylinder",
    name: "Gear Cylinder",
    image: "images/gear_cylinder.webp",
    parent: "gear_barrel",
    category: "Gear",
    tags: [
      "gear",
      "cylinder"
    ],
    description: "Cylinder shaped gear puzzle."
  },

  {
    id: "gear_tower",
    name: "Gear Tower",
    image: "images/gear_tower.webp",
    parent: "gear_family",
    category: "Gear",
    tags: [
      "gear",
      "tower"
    ],
    description: "Tall gear mechanism puzzle."
  },

  // =====================================
  // GEAR SHAPE MODS
  // =====================================

  {
    id: "gear_mirror",
    name: "Gear Mirror Cube",
    image: "images/gear_mirror.webp",
    parent: "gear_cube",
    category: "Gear Shape Mod",
    tags: [
      "gear",
      "mirror",
      "shape-mod"
    ],
    description: "Mirror style gear cube."
  },

  {
    id: "gear_ghost",
    name: "Gear Ghost Cube",
    image: "images/gear_ghost.webp",
    parent: "gear_cube",
    category: "Gear Shape Mod",
    tags: [
      "gear",
      "ghost",
      "shape-mod"
    ],
    description: "Ghost shaped gear cube."
  },

  {
    id: "gear_axis",
    name: "Gear Axis Cube",
    image: "images/gear_axis.webp",
    parent: "gear_cube",
    category: "Gear Shape Mod",
    tags: [
      "gear",
      "axis"
    ],
    description: "Axis style gear puzzle."
  },

  {
    id: "gear_fisher",
    name: "Gear Fisher Cube",
    image: "images/gear_fisher.webp",
    parent: "gear_cube",
    category: "Gear Shape Mod",
    tags: [
      "gear",
      "fisher"
    ],
    description: "Fisher style gear cube."
  },

  {
    id: "gear_windmill",
    name: "Gear Windmill Cube",
    image: "images/gear_windmill.webp",
    parent: "gear_cube",
    category: "Gear Shape Mod",
    tags: [
      "gear",
      "windmill"
    ],
    description: "Windmill shaped gear puzzle."
  },

  // =====================================
  // ADVANCED GEAR PUZZLES
  // =====================================

  {
    id: "gear_mixup",
    name: "Gear Mixup",
    image: "images/gear_mixup.webp",
    parent: "gear_family",
    category: "Gear",
    tags: [
      "gear",
      "mixup",
      "shape-shifting"
    ],
    description: "Combination of gear and mixup mechanisms."
  },

  {
    id: "gear_crazy",
    name: "Gear Crazy Cube",
    image: "images/gear_crazy.webp",
    parent: "gear_family",
    category: "Gear",
    tags: [
      "gear",
      "crazy",
      "center-turning"
    ],
    description: "Gear puzzle with crazy mechanisms."
  },

  {
    id: "gear_void",
    name: "Gear Void Cube",
    image: "images/gear_void.webp",
    parent: "gear_family",
    category: "Gear",
    tags: [
      "gear",
      "void"
    ],
    description: "Gear puzzle without visible core."
  },

  {
    id: "gear_skewb",
    name: "Gear Skewb",
    image: "images/gear_skewb.webp",
    parent: "gear_family",
    category: "Gear",
    tags: [
      "gear",
      "skewb",
      "corner-turning"
    ],
    description: "Combination of Skewb and gear mechanisms."
  },

  {
    id: "gear_dino",
    name: "Gear Dino",
    image: "images/gear_dino.webp",
    parent: "gear_family",
    category: "Gear",
    tags: [
      "gear",
      "dino"
    ],
    description: "Dino puzzle using gear movement."
  },

  {
    id: "gear_clover",
    name: "Gear Clover",
    image: "images/gear_clover.webp",
    parent: "gear_family",
    category: "Gear",
    tags: [
      "gear",
      "clover"
    ],
    description: "Clover shaped gear puzzle."
  },

  {
    id: "gear_star",
    name: "Gear Star",
    image: "images/gear_star.webp",
    parent: "gear_family",
    category: "Gear",
    tags: [
      "gear",
      "star"
    ],
    description: "Star shaped gear puzzle."
  },

  {
    id: "gear_cube_transparent",
    name: "Transparent Gear Cube",
    image: "images/transparent_gear_cube.webp",
    parent: "gear_cube",
    category: "Special Gear",
    tags: [
      "gear",
      "transparent"
    ],
    description: "Clear gear cube display version."
  },

  {
    id: "gear_cube_metal",
    name: "Metal Gear Cube",
    image: "images/metal_gear_cube.webp",
    parent: "gear_cube",
    category: "Special Gear",
    tags: [
      "gear",
      "metal"
    ],
    description: "Metal body gear cube."
  },
  // =====================================
  // PART 5
  // BANDAGED / RESTRICTED / SIAMESE FAMILY
  // =====================================

  {
    id: "bandaged_family",
    name: "Bandaged Cubes",
    image: "images/bandaged_family.webp",
    parent: "rubiks_cube",
    category: "Family",
    tags: [
      "bandaged",
      "restricted",
      "cube"
    ],
    description: "Puzzles where pieces are fused together to restrict movement."
  },

  {
    id: "bandaged_cube",
    name: "Bandaged Cube",
    image: "images/bandaged_cube.webp",
    parent: "bandaged_family",
    category: "Bandaged",
    tags: [
      "bandaged",
      "3x3",
      "restricted"
    ],
    description: "A cube with pieces physically joined together."
  },

  {
    id: "bandaged_3x3",
    name: "Bandaged 3x3",
    image: "images/bandaged_3x3.webp",
    parent: "bandaged_cube",
    category: "Bandaged",
    tags: [
      "3x3",
      "bandaged"
    ],
    description: "Classic restricted 3x3 modification."
  },

  {
    id: "bandaged_2x2",
    name: "Bandaged 2x2",
    image: "images/bandaged_2x2.webp",
    parent: "bandaged_family",
    category: "Bandaged",
    tags: [
      "2x2",
      "bandaged"
    ],
    description: "Bandaged pocket cube."
  },

  {
    id: "bandaged_4x4",
    name: "Bandaged 4x4",
    image: "images/bandaged_4x4.webp",
    parent: "bandaged_family",
    category: "Bandaged",
    tags: [
      "4x4",
      "bandaged"
    ],
    description: "Restricted 4x4 puzzle."
  },

  {
    id: "bandaged_5x5",
    name: "Bandaged 5x5",
    image: "images/bandaged_5x5.webp",
    parent: "bandaged_family",
    category: "Bandaged",
    tags: [
      "5x5",
      "bandaged"
    ],
    description: "Restricted 5x5 design."
  },

  // =====================================
  // FUSED / BLOCKED CUBES
  // =====================================

  {
    id: "fused_cube",
    name: "Fused Cube",
    image: "images/fused_cube.webp",
    parent: "bandaged_family",
    category: "Restricted",
    tags: [
      "fused",
      "bandaged"
    ],
    description: "Cube pieces fused into fixed groups."
  },

  {
    id: "fuse_cube",
    name: "Fuse Cube",
    image: "images/fuse_cube.webp",
    parent: "fused_cube",
    category: "Restricted",
    tags: [
      "fused",
      "cube"
    ],
    description: "A fused cube puzzle."
  },

  {
    id: "block_cube",
    name: "Block Cube",
    image: "images/block_cube.webp",
    parent: "bandaged_family",
    category: "Restricted",
    tags: [
      "block",
      "bandaged"
    ],
    description: "Cube made from connected blocks."
  },

  {
    id: "l_cube",
    name: "L Cube",
    image: "images/l_cube.webp",
    parent: "bandaged_family",
    category: "Restricted",
    tags: [
      "bandaged",
      "shape"
    ],
    description: "L-shaped restricted cube."
  },

  {
    id: "t_cube",
    name: "T Cube",
    image: "images/t_cube.webp",
    parent: "bandaged_family",
    category: "Restricted",
    tags: [
      "bandaged",
      "shape"
    ],
    description: "T-shaped bandaged cube."
  },

  {
    id: "u_cube",
    name: "U Cube",
    image: "images/u_cube.webp",
    parent: "bandaged_family",
    category: "Restricted",
    tags: [
      "bandaged",
      "shape"
    ],
    description: "U-shaped restricted cube."
  },

  // =====================================
  // SIAMESE CUBES
  // =====================================

  {
    id: "siamese_family",
    name: "Siamese Cubes",
    image: "images/siamese_family.webp",
    parent: "bandaged_family",
    category: "Family",
    tags: [
      "siamese",
      "fused",
      "multi-cube"
    ],
    description: "Multiple cubes connected together."
  },

  {
    id: "siamese_2x2",
    name: "Siamese 2x2 Cube",
    image: "images/siamese_2x2.webp",
    parent: "siamese_family",
    category: "Siamese",
    tags: [
      "2x2",
      "siamese"
    ],
    description: "Two 2x2 cubes fused together."
  },

  {
    id: "siamese_3x3",
    name: "Siamese 3x3 Cube",
    image: "images/siamese_3x3.webp",
    parent: "siamese_family",
    category: "Siamese",
    tags: [
      "3x3",
      "siamese"
    ],
    description: "Two 3x3 cubes connected together."
  },

  {
    id: "triamese_cube",
    name: "Triamese Cube",
    image: "images/triamese_cube.webp",
    parent: "siamese_family",
    category: "Siamese",
    tags: [
      "triple",
      "siamese"
    ],
    description: "Three connected cube puzzles."
  },

  {
    id: "quad_cube",
    name: "Quad Siamese Cube",
    image: "images/quad_siamese.webp",
    parent: "siamese_family",
    category: "Siamese",
    tags: [
      "quad",
      "siamese"
    ],
    description: "Four connected cube puzzle."
  },

  // =====================================
  // BANDAGED SHAPE MODS
  // =====================================

  {
    id: "bandaged_mirror",
    name: "Bandaged Mirror Cube",
    image: "images/bandaged_mirror.webp",
    parent: "bandaged_family",
    category: "Bandaged Shape Mod",
    tags: [
      "bandaged",
      "mirror",
      "shape-mod"
    ],
    description: "Mirror cube combined with restricted pieces."
  },

  {
    id: "bandaged_fisher",
    name: "Bandaged Fisher Cube",
    image: "images/bandaged_fisher.webp",
    parent: "bandaged_family",
    category: "Bandaged Shape Mod",
    tags: [
      "bandaged",
      "fisher"
    ],
    description: "Fisher cube with blocked movement."
  },

  {
    id: "bandaged_axis",
    name: "Bandaged Axis Cube",
    image: "images/bandaged_axis.webp",
    parent: "bandaged_family",
    category: "Bandaged Shape Mod",
    tags: [
      "bandaged",
      "axis"
    ],
    description: "Axis cube with fused pieces."
  },

  {
    id: "bandaged_ghost",
    name: "Bandaged Ghost Cube",
    image: "images/bandaged_ghost.webp",
    parent: "bandaged_family",
    category: "Bandaged Shape Mod",
    tags: [
      "bandaged",
      "ghost"
    ],
    description: "Ghost cube with restricted movement."
  },

  {
    id: "bandaged_windmill",
    name: "Bandaged Windmill Cube",
    image: "images/bandaged_windmill.webp",
    parent: "bandaged_family",
    category: "Bandaged Shape Mod",
    tags: [
      "bandaged",
      "windmill"
    ],
    description: "Windmill style restricted cube."
  },

  // =====================================
  // CENTER / EDGE RESTRICTED
  // =====================================

  {
    id: "edge_bandaged_cube",
    name: "Edge Bandaged Cube",
    image: "images/edge_bandaged_cube.webp",
    parent: "bandaged_family",
    category: "Restricted",
    tags: [
      "edge",
      "bandaged"
    ],
    description: "Edges are restricted together."
  },

  {
    id: "corner_bandaged_cube",
    name: "Corner Bandaged Cube",
    image: "images/corner_bandaged_cube.webp",
    parent: "bandaged_family",
    category: "Restricted",
    tags: [
      "corner",
      "bandaged"
    ],
    description: "Corner pieces are fused."
  },

  {
    id: "center_bandaged_cube",
    name: "Center Bandaged Cube",
    image: "images/center_bandaged_cube.webp",
    parent: "bandaged_family",
    category: "Restricted",
    tags: [
      "center",
      "bandaged"
    ],
    description: "Center movement restrictions."
  },

  // =====================================
  // EXPERIMENTAL RESTRICTED
  // =====================================

  {
    id: "restricted_gear_cube",
    name: "Restricted Gear Cube",
    image: "images/restricted_gear.webp",
    parent: "bandaged_family",
    category: "Hybrid",
    tags: [
      "gear",
      "bandaged"
    ],
    description: "Gear mechanism combined with restrictions."
  },

  {
    id: "restricted_skewb",
    name: "Restricted Skewb",
    image: "images/restricted_skewb.webp",
    parent: "bandaged_family",
    category: "Hybrid",
    tags: [
      "skewb",
      "bandaged"
    ],
    description: "Skewb with blocked moves."
  },

  {
    id: "restricted_pyraminx",
    name: "Restricted Pyraminx",
    image: "images/restricted_pyraminx.webp",
    parent: "bandaged_family",
    category: "Hybrid",
    tags: [
      "pyraminx",
      "bandaged"
    ],
    description: "Pyraminx with restricted turns."
  },

  {
    id: "bandaged_void",
    name: "Bandaged Void Cube",
    image: "images/bandaged_void.webp",
    parent: "bandaged_family",
    category: "Hybrid",
    tags: [
      "void",
      "bandaged"
    ],
    description: "Void mechanism with fused pieces."
  },

  {
    id: "bandaged_crazy",
    name: "Bandaged Crazy Cube",
    image: "images/bandaged_crazy.webp",
    parent: "bandaged_family",
    category: "Hybrid",
    tags: [
      "crazy",
      "bandaged"
    ],
    description: "Crazy cube with restrictions."
  },

  {
    id: "ultimate_bandaged_cube",
    name: "Ultimate Bandaged Cube",
    image: "images/ultimate_bandaged_cube.webp",
    parent: "bandaged_family",
    category: "Experimental",
    tags: [
      "bandaged",
      "extreme"
    ],
    description: "Highly restricted custom puzzle."
  },
  // =====================================
  // PART 6
  // HELICOPTER / CURVY / EDGE TURNING
  // =====================================

  {
    id: "edge_turning_family",
    name: "Edge Turning Family",
    image: "images/edge_turning_family.webp",
    parent: "rubiks_cube",
    category: "Family",
    tags: [
      "edge-turning",
      "jumbling",
      "twisty"
    ],
    description: "Puzzles where edges or edge axes drive the turning mechanism."
  },

  {
    id: "helicopter_family",
    name: "Helicopter Family",
    image: "images/helicopter_family.webp",
    parent: "edge_turning_family",
    category: "Family",
    tags: [
      "helicopter",
      "edge-turning"
    ],
    description: "A family of puzzles using helicopter-style edge cuts."
  },

  {
    id: "helicopter_cube",
    name: "Helicopter Cube",
    image: "images/helicopter_cube.webp",
    parent: "helicopter_family",
    category: "Edge Turning",
    tags: [
      "helicopter",
      "edge-turning",
      "cube"
    ],
    description: "The original helicopter style twisty puzzle."
  },

  {
    id: "helicopter_2x2",
    name: "Helicopter 2x2",
    image: "images/helicopter_2x2.webp",
    parent: "helicopter_family",
    category: "Edge Turning",
    tags: [
      "helicopter",
      "2x2"
    ],
    description: "Small helicopter cube variant."
  },

  {
    id: "helicopter_plus",
    name: "Helicopter Plus",
    image: "images/helicopter_plus.webp",
    parent: "helicopter_cube",
    category: "Edge Turning",
    tags: [
      "helicopter",
      "advanced"
    ],
    description: "Improved helicopter mechanism."
  },

  {
    id: "master_helicopter",
    name: "Master Helicopter",
    image: "images/master_helicopter.webp",
    parent: "helicopter_family",
    category: "Edge Turning",
    tags: [
      "helicopter",
      "expert"
    ],
    description: "Complex helicopter puzzle."
  },

  {
    id: "helicopter_star",
    name: "Helicopter Star",
    image: "images/helicopter_star.webp",
    parent: "helicopter_family",
    category: "Edge Turning",
    tags: [
      "helicopter",
      "star"
    ],
    description: "Star shaped helicopter puzzle."
  },

  // =====================================
  // CURVY COPTER FAMILY
  // =====================================

  {
    id: "curvy_family",
    name: "Curvy Family",
    image: "images/curvy_family.webp",
    parent: "edge_turning_family",
    category: "Family",
    tags: [
      "curvy",
      "edge-turning"
    ],
    description: "Curved edge turning puzzles."
  },

  {
    id: "curvy_copter",
    name: "Curvy Copter",
    image: "images/curvy_copter.webp",
    parent: "curvy_family",
    category: "Edge Turning",
    tags: [
      "curvy",
      "helicopter",
      "edge-turning"
    ],
    description: "A famous jumbling edge-turning puzzle."
  },

  {
    id: "curvy_copter_plus",
    name: "Curvy Copter Plus",
    image: "images/curvy_copter_plus.webp",
    parent: "curvy_copter",
    category: "Edge Turning",
    tags: [
      "curvy",
      "advanced"
    ],
    description: "Enhanced Curvy Copter."
  },

  {
    id: "curvy_copter_2",
    name: "Curvy Copter II",
    image: "images/curvy_copter_2.webp",
    parent: "curvy_family",
    category: "Edge Turning",
    tags: [
      "curvy",
      "variant"
    ],
    description: "Second Curvy Copter generation."
  },

  {
    id: "curvy_starminx",
    name: "Curvy Starminx",
    image: "images/curvy_starminx.webp",
    parent: "curvy_family",
    category: "Edge Turning",
    tags: [
      "curvy",
      "minx"
    ],
    description: "Curvy mechanism applied to a starminx."
  },

  {
    id: "curvy_dino",
    name: "Curvy Dino",
    image: "images/curvy_dino.webp",
    parent: "curvy_family",
    category: "Edge Turning",
    tags: [
      "curvy",
      "dino"
    ],
    description: "Dino shaped Curvy puzzle."
  },

  {
    id: "curvy_skewb",
    name: "Curvy Skewb",
    image: "images/curvy_skewb.webp",
    parent: "curvy_family",
    category: "Hybrid",
    tags: [
      "curvy",
      "skewb"
    ],
    description: "Curvy mechanism combined with Skewb."
  },

  // =====================================
  // EDGE ONLY PUZZLES
  // =====================================

  {
    id: "edge_cube",
    name: "Edge Cube",
    image: "images/edge_cube.webp",
    parent: "edge_turning_family",
    category: "Edge Turning",
    tags: [
      "edge-turning",
      "cube"
    ],
    description: "Puzzle based primarily around edge movement."
  },

  {
    id: "edge_only_cube",
    name: "Edge Only Cube",
    image: "images/edge_only_cube.webp",
    parent: "edge_cube",
    category: "Edge Turning",
    tags: [
      "edge",
      "experimental"
    ],
    description: "A cube focusing on edge pieces."
  },

  {
    id: "edge_skewb",
    name: "Edge Skewb",
    image: "images/edge_skewb.webp",
    parent: "edge_turning_family",
    category: "Hybrid",
    tags: [
      "edge",
      "skewb"
    ],
    description: "Combination of edge and corner mechanisms."
  },

  // =====================================
  // HELICOPTER SHAPE MODS
  // =====================================

  {
    id: "helicopter_mirror",
    name: "Mirror Helicopter Cube",
    image: "images/mirror_helicopter.webp",
    parent: "helicopter_family",
    category: "Shape Mod",
    tags: [
      "helicopter",
      "mirror"
    ],
    description: "Mirror finish helicopter puzzle."
  },

  {
    id: "helicopter_ghost",
    name: "Ghost Helicopter Cube",
    image: "images/ghost_helicopter.webp",
    parent: "helicopter_family",
    category: "Shape Mod",
    tags: [
      "helicopter",
      "ghost"
    ],
    description: "Ghost style helicopter puzzle."
  },

  {
    id: "helicopter_axis",
    name: "Axis Helicopter",
    image: "images/axis_helicopter.webp",
    parent: "helicopter_family",
    category: "Shape Mod",
    tags: [
      "helicopter",
      "axis"
    ],
    description: "Axis shaped helicopter variant."
  },

  {
    id: "helicopter_fisher",
    name: "Fisher Helicopter",
    image: "images/fisher_helicopter.webp",
    parent: "helicopter_family",
    category: "Shape Mod",
    tags: [
      "helicopter",
      "fisher"
    ],
    description: "Fisher style helicopter puzzle."
  },

  // =====================================
  // ADVANCED EDGE TURNING
  // =====================================

  {
    id: "jumbling_cube",
    name: "Jumbling Cube",
    image: "images/jumbling_cube.webp",
    parent: "edge_turning_family",
    category: "Edge Turning",
    tags: [
      "jumbling",
      "edge-turning"
    ],
    description: "A puzzle that changes shape during scrambling."
  },

  {
    id: "jumbling_tetrahedron",
    name: "Jumbling Tetrahedron",
    image: "images/jumbling_tetrahedron.webp",
    parent: "edge_turning_family",
    category: "Edge Turning",
    tags: [
      "jumbling",
      "tetrahedron"
    ],
    description: "A tetrahedral jumbling puzzle."
  },

  {
    id: "jumbling_octagon",
    name: "Jumbling Octagon",
    image: "images/jumbling_octagon.webp",
    parent: "edge_turning_family",
    category: "Edge Turning",
    tags: [
      "jumbling",
      "octagon"
    ],
    description: "An octagonal jumbling puzzle."
  },

  {
    id: "ultimate_curvy",
    name: "Ultimate Curvy Puzzle",
    image: "images/ultimate_curvy.webp",
    parent: "curvy_family",
    category: "Experimental",
    tags: [
      "curvy",
      "extreme"
    ],
    description: "Extreme curvy mechanism puzzle."
  },

  {
    id: "curvy_gear",
    name: "Curvy Gear",
    image: "images/curvy_gear.webp",
    parent: "curvy_family",
    category: "Hybrid",
    tags: [
      "curvy",
      "gear"
    ],
    description: "Combination of curved and gear mechanisms."
  },

  {
    id: "curvy_mirror",
    name: "Curvy Mirror",
    image: "images/curvy_mirror.webp",
    parent: "curvy_family",
    category: "Shape Mod",
    tags: [
      "curvy",
      "mirror"
    ],
    description: "Mirror surface curvy puzzle."
  },

  {
    id: "curvy_void",
    name: "Curvy Void",
    image: "images/curvy_void.webp",
    parent: "curvy_family",
    category: "Hybrid",
    tags: [
      "curvy",
      "void"
    ],
    description: "Curvy mechanism with open core."
  },

  // =====================================
  // EXPERIMENTAL EDGE PUZZLES
  // =====================================

  {
    id: "edge_ball",
    name: "Edge Ball",
    image: "images/edge_ball.webp",
    parent: "edge_turning_family",
    category: "Edge Turning",
    tags: [
      "edge",
      "ball"
    ],
    description: "Spherical edge turning puzzle."
  },

  {
    id: "edge_star",
    name: "Edge Star",
    image: "images/edge_star.webp",
    parent: "edge_turning_family",
    category: "Edge Turning",
    tags: [
      "edge",
      "star"
    ],
    description: "Star shaped edge turning puzzle."
  },

  {
    id: "edge_megaminx",
    name: "Edge Megaminx",
    image: "images/edge_megaminx.webp",
    parent: "edge_turning_family",
    category: "Hybrid",
    tags: [
      "edge",
      "megaminx"
    ],
    description: "Megaminx style edge puzzle."
  },

  {
    id: "helicopter_megaminx",
    name: "Helicopter Megaminx",
    image: "images/helicopter_megaminx.webp",
    parent: "helicopter_family",
    category: "Hybrid",
    tags: [
      "helicopter",
      "megaminx"
    ],
    description: "Megaminx with helicopter mechanism."
  },

  {
    id: "curvy_megaminx",
    name: "Curvy Megaminx",
    image: "images/curvy_megaminx.webp",
    parent: "curvy_family",
    category: "Hybrid",
    tags: [
      "curvy",
      "megaminx"
    ],
    description: "Curvy style Megaminx puzzle."
  },

  // =====================================
  // PART 7
  // PYRAMINX / TETRAHEDRAL FAMILY
  // =====================================

  {
    id: "pyraminx_family",
    name: "Pyraminx Family",
    image: "images/pyraminx_family.webp",
    parent: "rubiks_cube",
    category: "Family",
    tags: [
      "pyraminx",
      "tetrahedron",
      "twisty"
    ],
    description: "Four-sided tetrahedral twisty puzzles."
  },

  {
    id: "pyraminx",
    name: "Pyraminx",
    image: "images/pyraminx.webp",
    parent: "pyraminx_family",
    category: "Tetrahedral",
    tags: [
      "pyraminx",
      "tetrahedron",
      "wca"
    ],
    description: "The original tetrahedral twisty puzzle."
  },

  {
    id: "master_pyraminx",
    name: "Master Pyraminx",
    image: "images/master_pyraminx.webp",
    parent: "pyraminx_family",
    category: "Tetrahedral",
    tags: [
      "pyraminx",
      "advanced"
    ],
    description: "A larger and more complex Pyraminx."
  },

  {
    id: "professor_pyraminx",
    name: "Professor Pyraminx",
    image: "images/professor_pyraminx.webp",
    parent: "master_pyraminx",
    category: "Tetrahedral",
    tags: [
      "pyraminx",
      "expert"
    ],
    description: "High-order Pyraminx puzzle."
  },

  {
    id: "royal_pyraminx",
    name: "Royal Pyraminx",
    image: "images/royal_pyraminx.webp",
    parent: "pyraminx_family",
    category: "Tetrahedral",
    tags: [
      "pyraminx",
      "large"
    ],
    description: "Large Pyraminx variation."
  },

  {
    id: "kilominx_pyraminx",
    name: "Kilominx Pyraminx",
    image: "images/kilominx_pyraminx.webp",
    parent: "pyraminx_family",
    category: "Tetrahedral",
    tags: [
      "pyraminx",
      "hybrid"
    ],
    description: "Hybrid tetrahedral design."
  },

  {
    id: "pyraminx_duo",
    name: "Pyraminx Duo",
    image: "images/pyraminx_duo.webp",
    parent: "pyraminx_family",
    category: "Tetrahedral",
    tags: [
      "pyraminx",
      "2x2",
      "beginner"
    ],
    description: "Simplified Pyraminx variant."
  },

  {
    id: "pyraminx_crystal",
    name: "Pyraminx Crystal",
    image: "images/pyraminx_crystal.webp",
    parent: "pyraminx_family",
    category: "Tetrahedral",
    tags: [
      "pyraminx",
      "crystal"
    ],
    description: "Crystal-shaped Pyraminx puzzle."
  },

  {
    id: "pyraminx_ball",
    name: "Pyraminx Ball",
    image: "images/pyraminx_ball.webp",
    parent: "pyraminx_family",
    category: "Tetrahedral",
    tags: [
      "pyraminx",
      "ball"
    ],
    description: "Spherical Pyraminx variation."
  },

  {
    id: "pyraminx_star",
    name: "Pyraminx Star",
    image: "images/pyraminx_star.webp",
    parent: "pyraminx_family",
    category: "Tetrahedral",
    tags: [
      "pyraminx",
      "star"
    ],
    description: "Star shaped Pyraminx."
  },

  // =====================================
  // MASTER / HIGH ORDER
  // =====================================

  {
    id: "3x3_pyraminx",
    name: "3x3 Pyraminx",
    image: "images/3x3_pyraminx.webp",
    parent: "pyraminx_family",
    category: "High Order",
    tags: [
      "pyraminx",
      "3x3"
    ],
    description: "Three layer Pyraminx."
  },

  {
    id: "4x4_pyraminx",
    name: "4x4 Pyraminx",
    image: "images/4x4_pyraminx.webp",
    parent: "pyraminx_family",
    category: "High Order",
    tags: [
      "pyraminx",
      "4x4"
    ],
    description: "Four layer Pyraminx."
  },

  {
    id: "5x5_pyraminx",
    name: "5x5 Pyraminx",
    image: "images/5x5_pyraminx.webp",
    parent: "pyraminx_family",
    category: "High Order",
    tags: [
      "pyraminx",
      "5x5"
    ],
    description: "Five layer Pyraminx."
  },

  {
    id: "6x6_pyraminx",
    name: "6x6 Pyraminx",
    image: "images/6x6_pyraminx.webp",
    parent: "pyraminx_family",
    category: "High Order",
    tags: [
      "pyraminx",
      "6x6"
    ],
    description: "Six layer Pyraminx."
  },

  // =====================================
  // SHAPE MOD PYRAMINX
  // =====================================

  {
    id: "mirror_pyraminx",
    name: "Mirror Pyraminx",
    image: "images/mirror_pyraminx.webp",
    parent: "pyraminx_family",
    category: "Shape Mod",
    tags: [
      "pyraminx",
      "mirror"
    ],
    description: "Mirror finish Pyraminx."
  },

  {
    id: "ghost_pyraminx",
    name: "Ghost Pyraminx",
    image: "images/ghost_pyraminx.webp",
    parent: "pyraminx_family",
    category: "Shape Mod",
    tags: [
      "pyraminx",
      "ghost"
    ],
    description: "Ghost shaped Pyraminx."
  },

  {
    id: "gear_pyraminx",
    name: "Gear Pyraminx",
    image: "images/gear_pyraminx.webp",
    parent: "pyraminx_family",
    category: "Gear",
    tags: [
      "pyraminx",
      "gear"
    ],
    description: "Gear mechanism Pyraminx."
  },

  {
    id: "crazy_pyraminx",
    name: "Crazy Pyraminx",
    image: "images/crazy_pyraminx.webp",
    parent: "pyraminx_family",
    category: "Crazy",
    tags: [
      "pyraminx",
      "crazy"
    ],
    description: "Pyraminx with additional turning circles."
  },

  {
    id: "bandaged_pyraminx",
    name: "Bandaged Pyraminx",
    image: "images/bandaged_pyraminx.webp",
    parent: "pyraminx_family",
    category: "Restricted",
    tags: [
      "pyraminx",
      "bandaged"
    ],
    description: "Restricted Pyraminx."
  },

  {
    id: "void_pyraminx",
    name: "Void Pyraminx",
    image: "images/void_pyraminx.webp",
    parent: "pyraminx_family",
    category: "Void",
    tags: [
      "pyraminx",
      "void"
    ],
    description: "Pyraminx without visible core."
  },

  {
    id: "master_jing_pyraminx",
    name: "Master Jing Pyraminx",
    image: "images/master_jing_pyraminx.webp",
    parent: "pyraminx_family",
    category: "Tetrahedral",
    tags: [
      "jing",
      "pyraminx"
    ],
    description: "Advanced Jing Pyraminx variant."
  },

  {
    id: "jing_pyraminx",
    name: "Jing Pyraminx",
    image: "images/jing_pyraminx.webp",
    parent: "pyraminx_family",
    category: "Tetrahedral",
    tags: [
      "jing",
      "corner-turning"
    ],
    description: "Corner turning tetrahedral puzzle."
  },

  {
    id: "tetrahedron_cube",
    name: "Tetrahedron Cube",
    image: "images/tetrahedron_cube.webp",
    parent: "pyraminx_family",
    category: "Experimental",
    tags: [
      "tetrahedron",
      "shape-mod"
    ],
    description: "Cube mechanism in tetrahedron form."
  },

  {
    id: "ultimate_pyraminx",
    name: "Ultimate Pyraminx",
    image: "images/ultimate_pyraminx.webp",
    parent: "pyraminx_family",
    category: "Experimental",
    tags: [
      "pyraminx",
      "extreme"
    ],
    description: "Extreme Pyraminx design."
  },
  // =====================================
  // PART 8
  // MEGAMINX / MINX FAMILY
  // =====================================

  {
    id: "minx_family",
    name: "Minx Family",
    image: "images/minx_family.webp",
    parent: "rubiks_cube",
    category: "Family",
    tags: [
      "minx",
      "dodecahedron",
      "twisty"
    ],
    description: "Dodecahedral twisty puzzles based around the Megaminx design."
  },

  {
    id: "megaminx",
    name: "Megaminx",
    image: "images/megaminx.webp",
    parent: "minx_family",
    category: "Minx",
    tags: [
      "megaminx",
      "dodecahedron",
      "wca"
    ],
    description: "The original 12-sided twisty puzzle."
  },

  {
    id: "kilominx",
    name: "Kilominx",
    image: "images/kilominx.webp",
    parent: "minx_family",
    category: "Minx",
    tags: [
      "kilominx",
      "minx",
      "beginner"
    ],
    description: "A simplified Megaminx without center pieces."
  },

  {
    id: "master_kilominx",
    name: "Master Kilominx",
    image: "images/master_kilominx.webp",
    parent: "kilominx",
    category: "Minx",
    tags: [
      "kilominx",
      "advanced"
    ],
    description: "A higher complexity Kilominx."
  },

  {
    id: "gigaminx",
    name: "Gigaminx",
    image: "images/gigaminx.webp",
    parent: "megaminx",
    category: "Minx",
    tags: [
      "gigaminx",
      "large",
      "minx"
    ],
    description: "A larger Megaminx variant."
  },

  {
    id: "teraminx",
    name: "Teraminx",
    image: "images/teraminx.webp",
    parent: "gigaminx",
    category: "Minx",
    tags: [
      "teraminx",
      "large",
      "minx"
    ],
    description: "A very large dodecahedral puzzle."
  },

  {
    id: "petaminx",
    name: "Petaminx",
    image: "images/petaminx.webp",
    parent: "teraminx",
    category: "Minx",
    tags: [
      "petaminx",
      "extreme"
    ],
    description: "Extreme sized Megaminx variant."
  },

  {
    id: "examinx",
    name: "Examinx",
    image: "images/examinx.webp",
    parent: "minx_family",
    category: "Minx",
    tags: [
      "examinx",
      "extreme"
    ],
    description: "A massive order dodecahedral puzzle."
  },

  {
    id: "zettaminx",
    name: "Zettaminx",
    image: "images/zettaminx.webp",
    parent: "minx_family",
    category: "Minx",
    tags: [
      "zettaminx",
      "extreme"
    ],
    description: "An extremely high order Minx puzzle."
  },

  // =====================================
  // HIGH ORDER MINX
  // =====================================

  {
    id: "master_megaminx",
    name: "Master Megaminx",
    image: "images/master_megaminx.webp",
    parent: "megaminx",
    category: "Minx",
    tags: [
      "megaminx",
      "advanced"
    ],
    description: "More complex Megaminx variant."
  },

  {
    id: "super_megaminx",
    name: "Super Megaminx",
    image: "images/super_megaminx.webp",
    parent: "megaminx",
    category: "Minx",
    tags: [
      "megaminx",
      "super"
    ],
    description: "Modified Megaminx with extra complexity."
  },

  {
    id: "gigaminx_2",
    name: "Gigaminx II",
    image: "images/gigaminx_2.webp",
    parent: "gigaminx",
    category: "Minx",
    tags: [
      "gigaminx",
      "variant"
    ],
    description: "Second Gigaminx variation."
  },

  {
    id: "teraminx_2",
    name: "Teraminx II",
    image: "images/teraminx_2.webp",
    parent: "teraminx",
    category: "Minx",
    tags: [
      "teraminx",
      "variant"
    ],
    description: "Second Teraminx variation."
  },

  // =====================================
  // MINX SHAPE MODS
  // =====================================

  {
    id: "mirror_megaminx",
    name: "Mirror Megaminx",
    image: "images/mirror_megaminx.webp",
    parent: "megaminx",
    category: "Shape Mod",
    tags: [
      "megaminx",
      "mirror",
      "shape-mod"
    ],
    description: "Mirror version of Megaminx."
  },

  {
    id: "ghost_megaminx",
    name: "Ghost Megaminx",
    image: "images/ghost_megaminx.webp",
    parent: "megaminx",
    category: "Shape Mod",
    tags: [
      "megaminx",
      "ghost"
    ],
    description: "Ghost style Megaminx."
  },

  {
    id: "axis_megaminx",
    name: "Axis Megaminx",
    image: "images/axis_megaminx.webp",
    parent: "megaminx",
    category: "Shape Mod",
    tags: [
      "megaminx",
      "axis"
    ],
    description: "Axis style dodecahedron puzzle."
  },

  {
    id: "fisher_megaminx",
    name: "Fisher Megaminx",
    image: "images/fisher_megaminx.webp",
    parent: "megaminx",
    category: "Shape Mod",
    tags: [
      "megaminx",
      "fisher"
    ],
    description: "Fisher style Megaminx."
  },

  {
    id: "windmill_megaminx",
    name: "Windmill Megaminx",
    image: "images/windmill_megaminx.webp",
    parent: "megaminx",
    category: "Shape Mod",
    tags: [
      "megaminx",
      "windmill"
    ],
    description: "Windmill style Megaminx."
  },

  {
    id: "mastermorphix_megaminx",
    name: "Megamorphix",
    image: "images/megamorphix.webp",
    parent: "megaminx",
    category: "Shape Mod",
    tags: [
      "morphix",
      "megaminx"
    ],
    description: "Morphix style dodecahedron."
  },

  // =====================================
  // GEAR MINX
  // =====================================

  {
    id: "gear_megaminx",
    name: "Gear Megaminx",
    image: "images/gear_megaminx.webp",
    parent: "megaminx",
    category: "Gear",
    tags: [
      "gear",
      "megaminx"
    ],
    description: "Megaminx with gear mechanism."
  },

  {
    id: "gear_kilominx",
    name: "Gear Kilominx",
    image: "images/gear_kilominx.webp",
    parent: "kilominx",
    category: "Gear",
    tags: [
      "gear",
      "kilominx"
    ],
    description: "Gear based Kilominx."
  },

  {
    id: "gear_gigaminx",
    name: "Gear Gigaminx",
    image: "images/gear_gigaminx.webp",
    parent: "gigaminx",
    category: "Gear",
    tags: [
      "gear",
      "gigaminx"
    ],
    description: "Gear based Gigaminx."
  },

  // =====================================
  // CURVY / EDGE MINX
  // =====================================

  {
    id: "curvy_megaminx",
    name: "Curvy Megaminx",
    image: "images/curvy_megaminx.webp",
    parent: "megaminx",
    category: "Edge Turning",
    tags: [
      "curvy",
      "megaminx"
    ],
    description: "Curved edge turning Megaminx."
  },

  {
    id: "helicopter_megaminx",
    name: "Helicopter Megaminx",
    image: "images/helicopter_megaminx.webp",
    parent: "megaminx",
    category: "Edge Turning",
    tags: [
      "helicopter",
      "megaminx"
    ],
    description: "Helicopter mechanism Megaminx."
  },

  {
    id: "jumbling_megaminx",
    name: "Jumbling Megaminx",
    image: "images/jumbling_megaminx.webp",
    parent: "megaminx",
    category: "Jumbling",
    tags: [
      "jumbling",
      "megaminx"
    ],
    description: "Shape changing Megaminx."
  },

  // =====================================
  // VOID / CRAZY MINX
  // =====================================

  {
    id: "void_megaminx",
    name: "Void Megaminx",
    image: "images/void_megaminx.webp",
    parent: "megaminx",
    category: "Void",
    tags: [
      "void",
      "megaminx"
    ],
    description: "Megaminx without visible core."
  },

  {
    id: "crazy_megaminx",
    name: "Crazy Megaminx",
    image: "images/crazy_megaminx.webp",
    parent: "megaminx",
    category: "Crazy",
    tags: [
      "crazy",
      "megaminx"
    ],
    description: "Megaminx with additional circle cuts."
  },

  {
    id: "bandaged_megaminx",
    name: "Bandaged Megaminx",
    image: "images/bandaged_megaminx.webp",
    parent: "megaminx",
    category: "Restricted",
    tags: [
      "bandaged",
      "megaminx"
    ],
    description: "Restricted Megaminx."
  },

  // =====================================
  // SPHERICAL MINX
  // =====================================

  {
    id: "ball_megaminx",
    name: "Ball Megaminx",
    image: "images/ball_megaminx.webp",
    parent: "minx_family",
    category: "Shape Mod",
    tags: [
      "ball",
      "megaminx"
    ],
    description: "Rounded Megaminx design."
  },

  {
    id: "spherical_minx",
    name: "Spherical Minx",
    image: "images/spherical_minx.webp",
    parent: "minx_family",
    category: "Shape Mod",
    tags: [
      "sphere",
      "minx"
    ],
    description: "Spherical dodecahedron puzzle."
  },

  // =====================================
  // EXPERIMENTAL MINX
  // =====================================

  {
    id: "starminx",
    name: "Starminx",
    image: "images/starminx.webp",
    parent: "minx_family",
    category: "Experimental",
    tags: [
      "star",
      "minx"
    ],
    description: "Star shaped dodecahedral puzzle."
  },

  {
    id: "curvy_starminx",
    name: "Curvy Starminx",
    image: "images/curvy_starminx.webp",
    parent: "starminx",
    category: "Experimental",
    tags: [
      "curvy",
      "starminx"
    ],
    description: "Curved Starminx variant."
  },

  {
    id: "crazy_starminx",
    name: "Crazy Starminx",
    image: "images/crazy_starminx.webp",
    parent: "starminx",
    category: "Experimental",
    tags: [
      "crazy",
      "starminx"
    ],
    description: "Crazy mechanism Starminx."
  },

  {
    id: "void_starminx",
    name: "Void Starminx",
    image: "images/void_starminx.webp",
    parent: "starminx",
    category: "Experimental",
    tags: [
      "void",
      "starminx"
    ],
    description: "Void Starminx design."
  },

  {
    id: "ultimate_minx",
    name: "Ultimate Minx",
    image: "images/ultimate_minx.webp",
    parent: "minx_family",
    category: "Experimental",
    tags: [
      "minx",
      "extreme"
    ],
    description: "Experimental extreme Minx puzzle."
  },

  // =====================================
  // PART 9
  // SQUARE / MIXUP / SHAPE SHIFTING FAMILY
  // =====================================

  {
    id: "shape_shifting_family",
    name: "Shape Shifting Family",
    image: "images/shape_shifting_family.webp",
    parent: "rubiks_cube",
    category: "Family",
    tags: [
      "shape-shifting",
      "jumbling",
      "irregular"
    ],
    description: "Puzzles that change their external shape while scrambling."
  },

  // =====================================
  // SQUARE FAMILY
  // =====================================

  {
    id: "square_family",
    name: "Square Family",
    image: "images/square_family.webp",
    parent: "shape_shifting_family",
    category: "Family",
    tags: [
      "square",
      "shape-shifting"
    ],
    description: "Layered puzzles based around Square-1 mechanics."
  },

  {
    id: "square_0",
    name: "Square-0",
    image: "images/square_0.webp",
    parent: "square_family",
    category: "Square",
    tags: [
      "square",
      "shape-shifting"
    ],
    description: "Early Square puzzle design."
  },

  {
    id: "square_1",
    name: "Square-1",
    image: "images/square_1.webp",
    parent: "square_family",
    category: "Square",
    tags: [
      "square-1",
      "shape-shifting",
      "wca"
    ],
    description: "A famous shape-changing twisty puzzle."
  },

  {
    id: "square_2",
    name: "Square-2",
    image: "images/square_2.webp",
    parent: "square_1",
    category: "Square",
    tags: [
      "square",
      "advanced"
    ],
    description: "More complex Square-1 style puzzle."
  },

  {
    id: "square_3",
    name: "Square-3",
    image: "images/square_3.webp",
    parent: "square_family",
    category: "Square",
    tags: [
      "square",
      "variant"
    ],
    description: "Extended Square puzzle design."
  },

  {
    id: "super_square",
    name: "Super Square",
    image: "images/super_square.webp",
    parent: "square_family",
    category: "Square",
    tags: [
      "square",
      "advanced"
    ],
    description: "Advanced Square mechanism."
  },

  {
    id: "square_barrel",
    name: "Square Barrel",
    image: "images/square_barrel.webp",
    parent: "square_family",
    category: "Square",
    tags: [
      "square",
      "barrel",
      "shape-shifting"
    ],
    description: "Barrel shaped Square puzzle."
  },

  {
    id: "square_cube",
    name: "Square Cube",
    image: "images/square_cube.webp",
    parent: "square_family",
    category: "Square",
    tags: [
      "square",
      "cube"
    ],
    description: "Square mechanism inside cube form."
  },

  // =====================================
  // SQUARE SHAPE MODS
  // =====================================

  {
    id: "mirror_square_1",
    name: "Mirror Square-1",
    image: "images/mirror_square_1.webp",
    parent: "square_1",
    category: "Shape Mod",
    tags: [
      "square",
      "mirror"
    ],
    description: "Mirror surface Square-1."
  },

  {
    id: "ghost_square",
    name: "Ghost Square",
    image: "images/ghost_square.webp",
    parent: "square_family",
    category: "Shape Mod",
    tags: [
      "square",
      "ghost"
    ],
    description: "Ghost style Square puzzle."
  },

  {
    id: "void_square",
    name: "Void Square",
    image: "images/void_square.webp",
    parent: "square_family",
    category: "Void",
    tags: [
      "square",
      "void"
    ],
    description: "Square puzzle without visible core."
  },

  {
    id: "crazy_square",
    name: "Crazy Square",
    image: "images/crazy_square.webp",
    parent: "square_family",
    category: "Crazy",
    tags: [
      "square",
      "crazy"
    ],
    description: "Square puzzle with extra circular cuts."
  },

  // =====================================
  // MIXUP FAMILY
  // =====================================

  {
    id: "mixup_family",
    name: "Mixup Family",
    image: "images/mixup_family.webp",
    parent: "shape_shifting_family",
    category: "Family",
    tags: [
      "mixup",
      "shape-shifting"
    ],
    description: "Puzzles allowing unusual slice movement."
  },

  {
    id: "mixup_cube",
    name: "Mixup Cube",
    image: "images/mixup_cube.webp",
    parent: "mixup_family",
    category: "Mixup",
    tags: [
      "mixup",
      "cube",
      "shape-shifting"
    ],
    description: "Cube allowing middle slice turns."
  },

  {
    id: "mixup_plus",
    name: "Mixup Plus",
    image: "images/mixup_plus.webp",
    parent: "mixup_cube",
    category: "Mixup",
    tags: [
      "mixup",
      "advanced"
    ],
    description: "Improved Mixup Cube."
  },

  {
    id: "master_mixup",
    name: "Master Mixup",
    image: "images/master_mixup.webp",
    parent: "mixup_family",
    category: "Mixup",
    tags: [
      "mixup",
      "expert"
    ],
    description: "More complex Mixup puzzle."
  },

  {
    id: "mixup_2x2",
    name: "Mixup 2x2",
    image: "images/mixup_2x2.webp",
    parent: "mixup_family",
    category: "Mixup",
    tags: [
      "mixup",
      "2x2"
    ],
    description: "Small Mixup variation."
  },

  {
    id: "mixup_4x4",
    name: "Mixup 4x4",
    image: "images/mixup_4x4.webp",
    parent: "mixup_family",
    category: "Mixup",
    tags: [
      "mixup",
      "4x4"
    ],
    description: "Four layered Mixup puzzle."
  },

  // =====================================
  // SHAPE SHIFTING CUBES
  // =====================================

  {
    id: "mirror_shape_shifter",
    name: "Mirror Shape Shifter",
    image: "images/mirror_shape_shifter.webp",
    parent: "shape_shifting_family",
    category: "Shape Mod",
    tags: [
      "mirror",
      "shape-shifting"
    ],
    description: "Mirror finish shape shifting puzzle."
  },

  {
    id: "ghost_shape_shifter",
    name: "Ghost Shape Shifter",
    image: "images/ghost_shape_shifter.webp",
    parent: "shape_shifting_family",
    category: "Shape Mod",
    tags: [
      "ghost",
      "shape-shifting"
    ],
    description: "Ghost style shape changer."
  },

  {
    id: "fisher_shape_shifter",
    name: "Fisher Shape Shifter",
    image: "images/fisher_shape_shifter.webp",
    parent: "shape_shifting_family",
    category: "Shape Mod",
    tags: [
      "fisher",
      "shape-shifting"
    ],
    description: "Fisher based shape changer."
  },

  {
    id: "windmill_shape_shifter",
    name: "Windmill Shape Shifter",
    image: "images/windmill_shape_shifter.webp",
    parent: "shape_shifting_family",
    category: "Shape Mod",
    tags: [
      "windmill",
      "shape-shifting"
    ],
    description: "Windmill style shape changer."
  },

  {
    id: "axis_shape_shifter",
    name: "Axis Shape Shifter",
    image: "images/axis_shape_shifter.webp",
    parent: "shape_shifting_family",
    category: "Shape Mod",
    tags: [
      "axis",
      "shape-shifting"
    ],
    description: "Axis based shape changer."
  },

  // =====================================
  // CUBOID SHAPE SHIFTING
  // =====================================

  {
    id: "supercube",
    name: "Super Cube",
    image: "images/supercube.webp",
    parent: "shape_shifting_family",
    category: "Shape Shift",
    tags: [
      "cube",
      "orientation"
    ],
    description: "Cube where orientation affects solving."
  },

  {
    id: "cuboid_1x2x3",
    name: "1x2x3 Cuboid",
    image: "images/1x2x3_cuboid.webp",
    parent: "shape_shifting_family",
    category: "Cuboid",
    tags: [
      "cuboid",
      "shape-shifting"
    ],
    description: "Rectangular cuboid puzzle."
  },

  {
    id: "cuboid_2x2x3",
    name: "2x2x3 Cuboid",
    image: "images/2x2x3_cuboid.webp",
    parent: "shape_shifting_family",
    category: "Cuboid",
    tags: [
      "cuboid",
      "shape-shifting"
    ],
    description: "Two by two by three cuboid."
  },

  {
    id: "cuboid_2x3x4",
    name: "2x3x4 Cuboid",
    image: "images/2x3x4_cuboid.webp",
    parent: "shape_shifting_family",
    category: "Cuboid",
    tags: [
      "cuboid",
      "shape-shifting"
    ],
    description: "Rectangular cuboid twisty puzzle."
  },

  {
    id: "cuboid_3x3x4",
    name: "3x3x4 Cuboid",
    image: "images/3x3x4_cuboid.webp",
    parent: "shape_shifting_family",
    category: "Cuboid",
    tags: [
      "cuboid",
      "advanced"
    ],
    description: "Large cuboid puzzle."
  },

  {
    id: "cuboid_3x3x5",
    name: "3x3x5 Cuboid",
    image: "images/3x3x5_cuboid.webp",
    parent: "shape_shifting_family",
    category: "Cuboid",
    tags: [
      "cuboid"
    ],
    description: "Extended cuboid puzzle."
  },

  // =====================================
  // BARREL / IRREGULAR SHIFTING
  // =====================================

  {
    id: "barrel_cube",
    name: "Barrel Cube",
    image: "images/barrel_cube.webp",
    parent: "shape_shifting_family",
    category: "Shape Shift",
    tags: [
      "barrel",
      "shape-mod"
    ],
    description: "Barrel shaped cube."
  },

  {
    id: "super_barrel",
    name: "Super Barrel Cube",
    image: "images/super_barrel.webp",
    parent: "barrel_cube",
    category: "Shape Shift",
    tags: [
      "barrel",
      "advanced"
    ],
    description: "Advanced barrel puzzle."
  },

  {
    id: "windmill_cube_shift",
    name: "Windmill Shape Shift Cube",
    image: "images/windmill_shift.webp",
    parent: "shape_shifting_family",
    category: "Shape Shift",
    tags: [
      "windmill",
      "shape-shifting"
    ],
    description: "Windmill style shape changer."
  },

  {
    id: "fisher_cube_shift",
    name: "Fisher Shape Shift Cube",
    image: "images/fisher_shift.webp",
    parent: "shape_shifting_family",
    category: "Shape Shift",
    tags: [
      "fisher",
      "shape-shifting"
    ],
    description: "Fisher style shifting puzzle."
  },

  {
    id: "ultimate_shape_shifter",
    name: "Ultimate Shape Shifter",
    image: "images/ultimate_shape_shifter.webp",
    parent: "shape_shifting_family",
    category: "Experimental",
    tags: [
      "shape-shifting",
      "extreme"
    ],
    description: "Complex experimental shape changer."
  },
  // =====================================
  // PART 10
  // RARE / EXPERIMENTAL / CUSTOM MODS
  // =====================================

  {
    id: "experimental_family",
    name: "Rare Experimental Family",
    image: "images/experimental_family.webp",
    parent: "rubiks_cube",
    category: "Family",
    tags: [
      "experimental",
      "rare",
      "custom"
    ],
    description: "Unusual and collector twisty puzzles."
  },

  // =====================================
  // MIRROR / REFLECTION VARIANTS
  // =====================================

  {
    id: "mirror_cube",
    name: "Mirror Cube",
    image: "images/mirror_cube.webp",
    parent: "experimental_family",
    category: "Mirror",
    tags: [
      "mirror",
      "shape-mod"
    ],
    description: "Shape changing mirror cube."
  },

  {
    id: "mirror_2x2",
    name: "Mirror 2x2",
    image: "images/mirror_2x2.webp",
    parent: "mirror_cube",
    category: "Mirror",
    tags: [
      "mirror",
      "2x2"
    ],
    description: "Small mirror cube."
  },

  {
    id: "mirror_4x4",
    name: "Mirror 4x4",
    image: "images/mirror_4x4.webp",
    parent: "mirror_cube",
    category: "Mirror",
    tags: [
      "mirror",
      "4x4"
    ],
    description: "Higher order mirror cube."
  },

  {
    id: "mirror_5x5",
    name: "Mirror 5x5",
    image: "images/mirror_5x5.webp",
    parent: "mirror_cube",
    category: "Mirror",
    tags: [
      "mirror",
      "5x5"
    ],
    description: "Large mirror cube."
  },

  // =====================================
  // GHOST FAMILY
  // =====================================

  {
    id: "ghost_cube",
    name: "Ghost Cube",
    image: "images/ghost_cube.webp",
    parent: "experimental_family",
    category: "Ghost",
    tags: [
      "ghost",
      "shape-mod"
    ],
    description: "Extreme shape shifting cube."
  },

  {
    id: "ghost_2x2",
    name: "Ghost 2x2",
    image: "images/ghost_2x2.webp",
    parent: "ghost_cube",
    category: "Ghost",
    tags: [
      "ghost",
      "2x2"
    ],
    description: "Compact ghost puzzle."
  },

  {
    id: "ghost_4x4",
    name: "Ghost 4x4",
    image: "images/ghost_4x4.webp",
    parent: "ghost_cube",
    category: "Ghost",
    tags: [
      "ghost",
      "4x4"
    ],
    description: "Large ghost cube."
  },

  // =====================================
  // MORPHIX FAMILY
  // =====================================

  {
    id: "morphix_family",
    name: "Morphix Family",
    image: "images/morphix_family.webp",
    parent: "experimental_family",
    category: "Shape Mod",
    tags: [
      "morphix",
      "tetrahedral"
    ],
    description: "Cube puzzles transformed into tetrahedral shapes."
  },

  {
    id: "mastermorphix",
    name: "Mastermorphix",
    image: "images/mastermorphix.webp",
    parent: "morphix_family",
    category: "Shape Mod",
    tags: [
      "morphix",
      "4x4"
    ],
    description: "Tetrahedral 4x4 shape modification."
  },

  {
    id: "megaminx_morphix",
    name: "Megamorphix",
    image: "images/megamorphix.webp",
    parent: "morphix_family",
    category: "Shape Mod",
    tags: [
      "morphix",
      "megaminx"
    ],
    description: "Dodecahedral morphix puzzle."
  },

  {
    id: "pyraminx_morphix",
    name: "Pyraminx Morphix",
    image: "images/pyraminx_morphix.webp",
    parent: "morphix_family",
    category: "Shape Mod",
    tags: [
      "morphix",
      "pyraminx"
    ],
    description: "Tetrahedral morphix hybrid."
  },

  // =====================================
  // VOID FAMILY
  // =====================================

  {
    id: "void_cube",
    name: "Void Cube",
    image: "images/void_cube.webp",
    parent: "experimental_family",
    category: "Void",
    tags: [
      "void",
      "centerless"
    ],
    description: "Cube without fixed center mechanism."
  },

  {
    id: "void_2x2",
    name: "Void 2x2",
    image: "images/void_2x2.webp",
    parent: "void_cube",
    category: "Void",
    tags: [
      "void",
      "2x2"
    ],
    description: "Small void puzzle."
  },

  {
    id: "void_4x4",
    name: "Void 4x4",
    image: "images/void_4x4.webp",
    parent: "void_cube",
    category: "Void",
    tags: [
      "void",
      "4x4"
    ],
    description: "Higher order void cube."
  },

  // =====================================
  // CRAZY FAMILY
  // =====================================

  {
    id: "crazy_cube",
    name: "Crazy Cube",
    image: "images/crazy_cube.webp",
    parent: "experimental_family",
    category: "Crazy",
    tags: [
      "crazy",
      "circle-cut"
    ],
    description: "Cube with additional circular cuts."
  },

  {
    id: "crazy_2x2",
    name: "Crazy 2x2",
    image: "images/crazy_2x2.webp",
    parent: "crazy_cube",
    category: "Crazy",
    tags: [
      "crazy",
      "2x2"
    ],
    description: "Small crazy puzzle."
  },

  {
    id: "crazy_3x3",
    name: "Crazy 3x3",
    image: "images/crazy_3x3.webp",
    parent: "crazy_cube",
    category: "Crazy",
    tags: [
      "crazy",
      "3x3"
    ],
    description: "Classic crazy cube."
  },

  {
    id: "crazy_4x4",
    name: "Crazy 4x4",
    image: "images/crazy_4x4.webp",
    parent: "crazy_cube",
    category: "Crazy",
    tags: [
      "crazy",
      "4x4"
    ],
    description: "Advanced crazy cube."
  },

  // =====================================
  // CENTER TURNING
  // =====================================

  {
    id: "circle_cube",
    name: "Circle Cube",
    image: "images/circle_cube.webp",
    parent: "experimental_family",
    category: "Center Turning",
    tags: [
      "circle",
      "center-turning"
    ],
    description: "Puzzle with circular center turns."
  },

  {
    id: "super_circle_cube",
    name: "Super Circle Cube",
    image: "images/super_circle_cube.webp",
    parent: "circle_cube",
    category: "Center Turning",
    tags: [
      "circle",
      "advanced"
    ],
    description: "Advanced circular mechanism."
  },

  {
    id: "crazy_circle_cube",
    name: "Crazy Circle Cube",
    image: "images/crazy_circle_cube.webp",
    parent: "circle_cube",
    category: "Center Turning",
    tags: [
      "crazy",
      "circle"
    ],
    description: "Crazy center turning puzzle."
  },

  // =====================================
  // HYBRID MECHANISMS
  // =====================================

  {
    id: "gear_void_cube",
    name: "Gear Void Cube",
    image: "images/gear_void_cube.webp",
    parent: "experimental_family",
    category: "Hybrid",
    tags: [
      "gear",
      "void"
    ],
    description: "Gear mechanism without core."
  },

  {
    id: "gear_ghost_cube",
    name: "Gear Ghost Cube",
    image: "images/gear_ghost_cube.webp",
    parent: "experimental_family",
    category: "Hybrid",
    tags: [
      "gear",
      "ghost"
    ],
    description: "Gear based ghost puzzle."
  },

  {
    id: "skewb_mirror",
    name: "Mirror Skewb",
    image: "images/mirror_skewb.webp",
    parent: "experimental_family",
    category: "Hybrid",
    tags: [
      "mirror",
      "skewb"
    ],
    description: "Mirror Skewb variant."
  },

  {
    id: "skewb_ghost",
    name: "Ghost Skewb",
    image: "images/ghost_skewb.webp",
    parent: "experimental_family",
    category: "Hybrid",
    tags: [
      "ghost",
      "skewb"
    ],
    description: "Ghost style Skewb."
  },

  {
    id: "gear_skewb",
    name: "Gear Skewb",
    image: "images/gear_skewb.webp",
    parent: "experimental_family",
    category: "Hybrid",
    tags: [
      "gear",
      "skewb"
    ],
    description: "Gear and Skewb hybrid."
  },

  // =====================================
  // POLYHEDRAL EXPERIMENTS
  // =====================================

  {
    id: "octahedron_cube",
    name: "Octahedron Cube",
    image: "images/octahedron_cube.webp",
    parent: "experimental_family",
    category: "Polyhedral",
    tags: [
      "octahedron",
      "shape-mod"
    ],
    description: "Octahedral twisty puzzle."
  },

  {
    id: "dodecahedron_cube",
    name: "Dodecahedron Cube",
    image: "images/dodecahedron_cube.webp",
    parent: "experimental_family",
    category: "Polyhedral",
    tags: [
      "dodecahedron",
      "shape-mod"
    ],
    description: "Dodecahedral cube concept."
  },

  {
    id: "icosahedron_cube",
    name: "Icosahedron Cube",
    image: "images/icosahedron_cube.webp",
    parent: "experimental_family",
    category: "Polyhedral",
    tags: [
      "icosahedron",
      "shape-mod"
    ],
    description: "Icosahedral twisty design."
  },

  // =====================================
  // CUSTOM COLLECTOR MODS
  // =====================================

  {
    id: "custom_transparent_cube",
    name: "Transparent Custom Cube",
    image: "images/custom_transparent_cube.webp",
    parent: "experimental_family",
    category: "Custom",
    tags: [
      "transparent",
      "collector"
    ],
    description: "Clear display cube."
  },

  {
    id: "custom_metal_cube",
    name: "Metal Custom Cube",
    image: "images/custom_metal_cube.webp",
    parent: "experimental_family",
    category: "Custom",
    tags: [
      "metal",
      "collector"
    ],
    description: "Metal body cube."
  },

  {
    id: "custom_wood_cube",
    name: "Wood Custom Cube",
    image: "images/custom_wood_cube.webp",
    parent: "experimental_family",
    category: "Custom",
    tags: [
      "wood",
      "collector"
    ],
    description: "Wooden artisan cube."
  },

  {
    id: "custom_glass_cube",
    name: "Glass Cube",
    image: "images/glass_cube.webp",
    parent: "experimental_family",
    category: "Custom",
    tags: [
      "glass",
      "collector"
    ],
    description: "Glass style display cube."
  },

  {
    id: "ultimate_custom_cube",
    name: "Ultimate Custom Puzzle",
    image: "images/ultimate_custom_cube.webp",
    parent: "experimental_family",
    category: "Custom",
    tags: [
      "custom",
      "extreme"
    ],
    description: "Experimental collector creation."
  }

];