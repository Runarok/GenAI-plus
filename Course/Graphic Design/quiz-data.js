const chapters = {
	internship: {
		name: "Graphics Designing Intern",
		description: "Master the fundamentals of internship topics",
		chapters: [{
			id: "chapter1",
			name: "Chapter 1: Graphics Designer",
			description: "Comprehensive Graphic Design Basics.",
			icon: "📚",
			quizzes: [{
				"id": "ch1-q1",
				"name": "Quiz 1: Introduction to Graphic Design",
				"questions": [{
					"question": "Graphic design is best described as:",
					"options": ["Drawing pictures for fun", "Visual communication to convey ideas and messages", "Writing code", "Printing documents"],
					"answer": "Visual communication to convey ideas and messages"
				}, {
					"question": "Visual communication mainly uses:",
					"options": ["Numbers only", "Text and visuals together", "Signals", "Programming logic"],
					"answer": "Text and visuals together"
				}, {
					"question": "Design as problem-solving means:",
					"options": ["Making designs colorful", "Solving communication or user problems visually", "Copying existing designs", "Using random styles"],
					"answer": "Solving communication or user problems visually"
				}, {
					"question": "Which role focuses mainly on designing brand identity?",
					"options": ["UI Designer", "Print Designer", "Brand Designer", "Web Developer"],
					"answer": "Brand Designer"
				}, {
					"question": "Which designer primarily works on digital interfaces like apps and websites?",
					"options": ["Graphic Designer", "UI Designer", "Print Designer", "Brand Strategist"],
					"answer": "UI Designer"
				}, {
					"question": "Which Adobe tool is mainly used for photo editing?",
					"options": ["Illustrator", "InDesign", "Photoshop", "Figma"],
					"answer": "Photoshop"
				}, {
					"question": "Adobe Illustrator is best suited for:",
					"options": ["Editing photographs", "Creating vector graphics and logos", "Page layouts", "Video editing"],
					"answer": "Creating vector graphics and logos"
				}, {
					"question": "Which stage comes first in the design cycle?",
					"options": ["Concept", "Feedback", "Brief", "Delivery"],
					"answer": "Brief"
				}, {
					"question": "Which of the following is NOT an element of design?",
					"options": ["Color", "Contrast", "Balance", "Hierarchy"],
					"answer": "Contrast"
				}, {
					"question": "Which of the following is NOT an element of design?",
					"options": ["Color", "Shape", "Texture", "Animation"],
					"answer": "Animation"
				}]
			}, {
				"id": "ch1-q2",
				"name": "Quiz 2: Image Fundamentals and Photoshop Basics",
				"questions": [{
					"question": "Image resolution refers to:",
					"options": ["File size only", "Number of pixels in an image", "Image color", "File format"],
					"answer": "Number of pixels in an image"
				}, {
					"question": "Which color mode is used mainly for digital screens?",
					"options": ["CMYK", "RGB", "Grayscale", "Pantone"],
					"answer": "RGB"
				}, {
					"question": "CMYK color mode is primarily used for:",
					"options": ["Websites", "Mobile apps", "Print materials", "Video editing"],
					"answer": "Print materials"
				}, {
					"question": "Visual hierarchy in marketing designs helps to:",
					"options": ["Increase file size", "Guide the viewer’s attention", "Reduce contrast", "Avoid layout rules"],
					"answer": "Guide the viewer’s attention"
				}, {
					"question": "Digital images are best optimized for:",
					"options": ["Printers only", "Screens and online platforms", "Newspapers", "Books"],
					"answer": "Screens and online platforms"
				}, {
					"question": "Pixels are:",
					"options": ["Vector paths", "Smallest units of a digital image", "Color profiles", "Design tools"],
					"answer": "Smallest units of a digital image"
				}, {
					"question": "Which panel in Photoshop allows you to manage different elements separately?",
					"options": ["History", "Tools", "Layers", "Properties"],
					"answer": "Layers"
				}, {
					"question": "Blending modes in Photoshop are used to:",
					"options": ["Resize images", "Control how layers interact visually", "Export files", "Crop images"],
					"answer": "Control how layers interact visually"
				}, {
					"question": "Double exposure effect mainly involves:",
					"options": ["Using text only", "Blending two images together creatively", "Increasing resolution", "Cropping photos"],
					"answer": "Blending two images together creatively"
				}, {
					"question": "The rule of thirds divides an image into:",
					"options": ["Two parts", "Three equal vertical parts", "Nine equal sections", "Four sections"],
					"answer": "Nine equal sections"
				}]
			}, {
				"id": "ch1-q3",
				"name": "Quiz 3: Color Theory and Psychology",
				"questions": [{
					"question": "Colour psychology studies how colours:",
					"options": ["Are printed", "Affect human emotions and behaviour", "Are mixed digitally", "Reduce design cost"],
					"answer": "Affect human emotions and behaviour"
				}, {
					"question": "The colour red is commonly associated with:",
					"options": ["Calmness", "Energy and urgency", "Sadness", "Neutrality"],
					"answer": "Energy and urgency"
				}, {
					"question": "Blue is often used by brands to convey:",
					"options": ["Aggression", "Trust and reliability", "Danger", "Playfulness"],
					"answer": "Trust and reliability"
				}, {
					"question": "Primary colours are:",
					"options": ["Red, Green, Blue", "Red, Yellow, Blue", "Blue, Black, White", "Cyan, Magenta, Yellow"],
					"answer": "Red, Yellow, Blue"
				}, {
					"question": "Secondary colours are formed by:",
					"options": ["Mixing black and white", "Mixing two primary colours", "Mixing primary and black", "Using digital filters"],
					"answer": "Mixing two primary colours"
				}, {
					"question": "Green is a secondary colour formed by mixing:",
					"options": ["Red + Blue", "Blue + Yellow", "Red + Yellow", "Black + White"],
					"answer": "Blue + Yellow"
				}, {
					"question": "Spot colours (Pantone) are mainly used to:",
					"options": ["Reduce quality", "Achieve consistent colour accuracy", "Replace CMYK", "Display on screens"],
					"answer": "Achieve consistent colour accuracy"
				}, {
					"question": "Process colours refer to:",
					"options": ["RGB colours", "CMYK colours used in printing", "Pantone shades", "Neon colours"],
					"answer": "CMYK colours used in printing"
				}, {
					"question": "RGB colour mode is mainly used for:",
					"options": ["Print media", "Digital screens", "Newspapers", "Packaging"],
					"answer": "Digital screens"
				}, {
					"question": "CMYK colour mode is best suited for:",
					"options": ["Mobile apps", "Printing", "Video editing", "Web design"],
					"answer": "Printing"
				}]
			}, {
				"id": "ch1-q4",
				"name": "Quiz 4: Vector Design and the Pen Tool",
				"questions": [{
					"question": "In vector design, a path is made up of:",
					"options": ["Pixels", "Anchor points and segments", "Layers", "Filters"],
					"answer": "Anchor points and segments"
				}, {
					"question": "Anchor points are used to:",
					"options": ["Apply colors", "Define the shape and direction of a path", "Add text", "Resize images"],
					"answer": "Define the shape and direction of a path"
				}, {
					"question": "Handles (direction lines) help in:",
					"options": ["Moving layers", "Controlling the curve of a path", "Adding effects", "Cropping images"],
					"answer": "Controlling the curve of a path"
				}, {
					"question": "The Pen Tool is mainly used to:",
					"options": ["Paint images", "Create precise vector shapes and paths", "Apply gradients", "Blur images"],
					"answer": "Create precise vector shapes and paths"
				}, {
					"question": "Creating custom shapes from scratch improves:",
					"options": ["File size", "Design originality and control", "Printing speed", "Color modes"],
					"answer": "Design originality and control"
				}, {
					"question": "Hand–eye coordination with the Pen Tool helps designers to:",
					"options": ["Type faster", "Draw accurate curves and shapes", "Increase resolution", "Reduce creativity"],
					"answer": "Draw accurate curves and shapes"
				}, {
					"question": "Smooth curves are created by:",
					"options": ["Clicking only", "Clicking and dragging anchor points", "Using filters", "Applying masks"],
					"answer": "Clicking and dragging anchor points"
				}, {
					"question": "Editing paths allows designers to:",
					"options": ["Change font styles", "Refine and perfect shapes", "Add animation", "Adjust brightness"],
					"answer": "Refine and perfect shapes"
				}, {
					"question": "Refining paths is important for:",
					"options": ["Rough sketches only", "Professional and clean designs", "Faster exporting", "Reducing colors"],
					"answer": "Professional and clean designs"
				}, {
					"question": "Non-destructive design workflow means:",
					"options": ["Permanently altering original content", "Making changes without losing original data", "Deleting layers", "Flattening images early"],
					"answer": "Making changes without losing original data"
				}]
			}, {
				"id": "ch1-q5",
				"name": "Quiz 5: Creativity and Corporate Identity",
				"questions": [{
					"question": "Creativity is best described as:",
					"options": ["Random thinking", "A structured problem-solving skill", "Only artistic talent", "Copying ideas"],
					"answer": "A structured problem-solving skill"
				}, {
					"question": "The idea that only some people are creative is:",
					"options": ["Always true", "A common myth", "Scientific fact", "Required for design"],
					"answer": "A common myth"
				}, {
					"question": "Structured creativity techniques help to:",
					"options": ["Generate ideas systematically", "Avoid planning", "Remove collaboration", "Reduce innovation"],
					"answer": "Generate ideas systematically"
				}, {
					"question": "Redefining the box in creativity means:",
					"options": ["Ignoring constraints", "Changing how a problem is framed", "Removing all rules", "Avoiding structure"],
					"answer": "Changing how a problem is framed"
				}, {
					"question": "Creativity in business mainly supports:",
					"options": ["Better solutions and innovation", "Office decoration only", "File storage", "Hardware upgrades"],
					"answer": "Better solutions and innovation"
				}, {
					"question": "Brainstorming is an example of:",
					"options": ["Financial analysis", "Creative ideation technique", "Coding language", "File format"],
					"answer": "Creative ideation technique"
				}, {
					"question": "Corporate identity mainly reflects:",
					"options": ["Brand values and visual image", "Office furniture", "Software versions", "Email servers"],
					"answer": "Brand values and visual image"
				}, {
					"question": "A logo’s main purpose is to:",
					"options": ["Represent the brand visually", "Increase file size", "Replace marketing", "Store data"],
					"answer": "Represent the brand visually"
				}, {
					"question": "Effective logo design is usually:",
					"options": ["Simple and memorable", "Extremely complex", "Hard to read", "Randomly styled"],
					"answer": "Simple and memorable"
				}, {
					"question": "Brand values help businesses to:",
					"options": ["Define personality and messaging", "Remove identity", "Reduce consistency", "Avoid customers"],
					"answer": "Define personality and messaging"
				}]
			}, {
				"id": "ch1-q6",
				"name": "Quiz 6: Advanced Manipulation, Ethics, and 3D Design",
				"questions": [{
					"question": "Advanced photo manipulation is mainly used to:",
					"options": ["Enhance or transform images creatively", "Delete files", "Replace cameras", "Fix hardware"],
					"answer": "Enhance or transform images creatively"
				}, {
					"question": "Age transformation effects involve:",
					"options": ["Changing appearance to look older or younger", "Increasing file size", "Changing resolution only", "Removing layers"],
					"answer": "Changing appearance to look older or younger"
				}, {
					"question": "Creative compositing means:",
					"options": ["Combining multiple images into one scene", "Printing images", "Cropping only", "Adding text only"],
					"answer": "Combining multiple images into one scene"
				}, {
					"question": "Ethical photo manipulation focuses on:",
					"options": ["Transparency and responsible editing", "Misleading viewers intentionally", "Ignoring copyrights", "Removing credits"],
					"answer": "Transparency and responsible editing"
				}, {
					"question": "Ethical design is important because it:",
					"options": ["Builds trust with audiences", "Increases confusion", "Reduces creativity", "Slows workflow"],
					"answer": "Builds trust with audiences"
				}, {
					"question": "Compositing often uses:",
					"options": ["Layers and masking", "Email signatures", "Database tables", "Code editors"],
					"answer": "Layers and masking"
				}, {
					"question": "3D design allows designers to:",
					"options": ["Create realistic product visuals", "Remove colors", "Delete images", "Avoid perspective"],
					"answer": "Create realistic product visuals"
				}, {
					"question": "Illustrator’s 3D revolve tool is commonly used to create:",
					"options": ["Cylindrical shapes like bottles", "Flat text only", "Videos", "Audio files"],
					"answer": "Cylindrical shapes like bottles"
				}, {
					"question": "Rotation tools in 3D design help to:",
					"options": ["View objects from different angles", "Export PDFs", "Edit text", "Create databases"],
					"answer": "View objects from different angles"
				}, {
					"question": "Perspective helps designs look:",
					"options": ["More realistic", "Flat always", "Random", "Distorted intentionally"],
					"answer": "More realistic"
				}]
			}, {
				"id": "ch1-q7",
				"name": "Quiz 7: Mobile Design, Templates, and Typography",
				"questions": [{
					"question": "Mobile design tools are important because they allow designers to:",
					"options": ["Create and edit designs on the go", "Replace desktop software completely", "Manage databases", "Write backend code"],
					"answer": "Create and edit designs on the go"
				}, {
					"question": "Template-based design platforms help by:",
					"options": ["Speeding up design creation", "Removing creativity", "Blocking edits", "Avoiding layouts"],
					"answer": "Speeding up design creation"
				}, {
					"question": "Designers often use templates for:",
					"options": ["Quick social media content", "Hardware configuration", "Server setup", "Data analysis"],
					"answer": "Quick social media content"
				}, {
					"question": "Emergency client requests usually require:",
					"options": ["Fast and flexible design tools", "Complex coding", "Large software installs", "Offline workflows only"],
					"answer": "Fast and flexible design tools"
				}, {
					"question": "Mobile-friendly design tools are useful for:",
					"options": ["Quick edits and revisions", "Database backups", "Network monitoring", "Coding APIs"],
					"answer": "Quick edits and revisions"
				}, {
					"question": "Template platforms help beginners by:",
					"options": ["Providing ready-made layouts", "Removing customization", "Limiting creativity", "Avoiding typography"],
					"answer": "Providing ready-made layouts"
				}, {
					"question": "Social media design tools focus on:",
					"options": ["Pre-sized templates and quick export", "Hardware drivers", "Programming logic", "Audio production"],
					"answer": "Pre-sized templates and quick export"
				}, {
					"question": "Typography refers to:",
					"options": ["Arrangement and styling of text", "Image compression", "File storage", "Animation tools"],
					"answer": "Arrangement and styling of text"
				}, {
					"question": "A font family usually includes:",
					"options": ["Multiple styles like bold and italic", "Only one size", "Only uppercase letters", "Only icons"],
					"answer": "Multiple styles like bold and italic"
				}, {
					"question": "OTF stands for:",
					"options": ["OpenType Font", "Online Text Format", "Object Type File", "Optical Text Function"],
					"answer": "OpenType Font"
				}]
			}, {
				"id": "ch1-q8",
				"name": "Quiz 8: Freelancing, Agency, and Career Growth",
				"questions": [{
					"question": "A freelance designer typically:",
					"options": ["Works independently with multiple clients", "Manages only one company team", "Avoids client communication", "Works without deadlines"],
					"answer": "Works independently with multiple clients"
				}, {
					"question": "An agency mindset often involves:",
					"options": ["Team collaboration and structured workflows", "Working alone always", "No project planning", "Avoiding feedback"],
					"answer": "Team collaboration and structured workflows"
				}, {
					"question": "Value-based pricing focuses on:",
					"options": ["Value delivered to client", "Hourly time only", "File size", "Software cost"],
					"answer": "Value delivered to client"
				}, {
					"question": "Client quotations usually include:",
					"options": ["Scope, timeline, and pricing", "Social media passwords", "Server setup", "Hardware details"],
					"answer": "Scope, timeline, and pricing"
				}, {
					"question": "Task delegation helps designers to:",
					"options": ["Manage workload efficiently", "Increase confusion", "Avoid teamwork", "Reduce productivity"],
					"answer": "Manage workload efficiently"
				}, {
					"question": "Productivity tools for designers help with:",
					"options": ["Project management and collaboration", "Hardware repairs", "Coding APIs", "Database backups"],
					"answer": "Project management and collaboration"
				}, {
					"question": "A strong design resume should highlight:",
					"options": ["Skills and portfolio projects", "Only personal hobbies", "Random images", "File formats"],
					"answer": "Skills and portfolio projects"
				}, {
					"question": "Visual storytelling in resumes means:",
					"options": ["Using design to present career journey", "Writing long paragraphs only", "Avoiding visuals", "Using only text lists"],
					"answer": "Using design to present career journey"
				}, {
					"question": "Designers stand out by:",
					"options": ["Showing unique style and strong portfolio", "Copying templates exactly", "Avoiding branding", "Using large file sizes"],
					"answer": "Showing unique style and strong portfolio"
				}, {
					"question": "Portfolio links are important because they:",
					"options": ["Demonstrate real work examples", "Replace resumes", "Increase file storage", "Avoid interviews"],
					"answer": "Demonstrate real work examples"
				}]
			}]
		}, {
			id: "chapter2",
			name: "Chapter 2: Adobe-Lightroom",
			description: "Quiz for Adobe Lightroom Software.",
			icon: "🚀",
			quizzes: [{
				"id": "ch2-q1",
				"name": "Quiz 1: Lightroom Library and Organization",
				"questions": [{
					"question": "The primary purpose of the Library module in Lightroom is to:",
					"options": ["Perform advanced color grading", "Organize, import, and manage photos", "Create graphic designs", "Export videos"],
					"answer": "Organize, import, and manage photos"
				}, {
					"question": "A Lightroom catalog stores:",
					"options": ["Original image files", "Editing instructions and metadata references", "Camera firmware", "Cloud backups automatically"],
					"answer": "Editing instructions and metadata references"
				}, {
					"question": "Importing photos into Lightroom means:",
					"options": ["Moving files permanently", "Registering them into the catalog for management", "Editing automatically", "Compressing images"],
					"answer": "Registering them into the catalog for management"
				}, {
					"question": "Best practice for folder structure is to organize images by:",
					"options": ["Random names", "Date and project/event", "Camera brand only", "File size"],
					"answer": "Date and project/event"
				}, {
					"question": "The difference between folders and collections is that collections:",
					"options": ["Move original files", "Are virtual groupings without changing file location", "Replace storage drives", "Delete duplicates"],
					"answer": "Are virtual groupings without changing file location"
				}, {
					"question": "Ratings and flags are mainly used to:",
					"options": ["Delete photos", "Identify and prioritize selected images", "Export automatically", "Compress files"],
					"answer": "Identify and prioritize selected images"
				}, {
					"question": "Keywords in Lightroom help to:",
					"options": ["Increase exposure", "Improve searchability and organization", "Modify color", "Change resolution"],
					"answer": "Improve searchability and organization"
				}, {
					"question": "Smart collections automatically group photos based on:",
					"options": ["Manual selection", "Defined rules and metadata filters", "Folder location only", "File size"],
					"answer": "Defined rules and metadata filters"
				}, {
					"question": "The Develop module is primarily used for:",
					"options": ["Printing photos", "Editing and enhancing images", "Importing files", "Renaming folders"],
					"answer": "Editing and enhancing images"
				}, {
					"question": "RAW files differ from JPEG because RAW files:",
					"options": ["Have less detail", "Contain more image data and editing flexibility", "Are smaller in size always", "Cannot be edited"],
					"answer": "Contain more image data and editing flexibility"
				}]
			}, {
				"id": "ch2-q2",
				"name": "Quiz 2: Developing and Image Enhancement",
				"questions": [{
					"question": "Lightroom editing is considered non-destructive because:",
					"options": ["It deletes original pixels", "It stores adjustments without altering original file", "It overwrites images", "It compresses the file permanently"],
					"answer": "It stores adjustments without altering original file"
				}, {
					"question": "Increasing exposure primarily affects:",
					"options": ["Color balance", "Overall brightness", "Sharpness", "Cropping"],
					"answer": "Overall brightness"
				}, {
					"question": "Adjusting highlights mainly controls:",
					"options": ["Dark areas", "Brightest parts of an image", "Saturation", "Focus"],
					"answer": "Brightest parts of an image"
				}, {
					"question": "Blacks slider adjustment impacts:",
					"options": ["Midtones", "Darkest shadows and contrast depth", "White balance", "Temperature"],
					"answer": "Darkest shadows and contrast depth"
				}, {
					"question": "White balance adjustment corrects:",
					"options": ["Image size", "Color temperature and tint shifts", "Cropping", "Exposure only"],
					"answer": "Color temperature and tint shifts"
				}, {
					"question": "Vibrance differs from saturation because vibrance:",
					"options": ["Increases all colors equally", "Selectively enhances muted colors", "Reduces contrast", "Affects only shadows"],
					"answer": "Selectively enhances muted colors"
				}, {
					"question": "The Tone Curve allows photographers to:",
					"options": ["Crop images", "Fine-tune brightness and contrast across tonal ranges", "Remove spots", "Rename files"],
					"answer": "Fine-tune brightness and contrast across tonal ranges"
				}, {
					"question": "The Spot Removal tool is mainly used to:",
					"options": ["Adjust exposure", "Remove blemishes or dust spots", "Change white balance", "Add filters"],
					"answer": "Remove blemishes or dust spots"
				}, {
					"question": "A Radial Filter is useful for:",
					"options": ["Applying edits globally", "Creating selective adjustments in circular areas", "Organizing folders", "Exporting files"],
					"answer": "Creating selective adjustments in circular areas"
				}, {
					"question": "Combining metadata organization with creative enhancement ensures:",
					"options": ["Faster editing only", "Efficient workflow and professional output", "Smaller file size", "Automatic publishing"],
					"answer": "Efficient workflow and professional output"
				}]
			}, {
				"id": "ch2-q3",
				"name": "Quiz 3: Global and Localized Editing",
				"questions": [{
					"question": "Global editing affects:",
					"options": ["Only selected areas", "The entire image", "Metadata only", "File structure"],
					"answer": "The entire image"
				}, {
					"question": "Localized editing is useful when:",
					"options": ["All parts of image need same adjustment", "Specific areas require selective enhancement", "Exporting files", "Renaming photos"],
					"answer": "Specific areas require selective enhancement"
				}, {
					"question": "The Graduated Filter is most suitable for:",
					"options": ["Spot removal", "Adjusting exposure across horizons", "Cropping", "Metadata editing"],
					"answer": "Adjusting exposure across horizons"
				}, {
					"question": "The Radial Filter is typically used to:",
					"options": ["Apply edits in circular/elliptical area", "Delete backgrounds", "Adjust file size", "Add text"],
					"answer": "Apply edits in circular/elliptical area"
				}, {
					"question": "The Adjustment Brush allows:",
					"options": ["Automatic global changes", "Precise manual painting of adjustments", "Batch exporting", "File renaming"],
					"answer": "Precise manual painting of adjustments"
				}, {
					"question": "To balance exposure between a bright sky and dark foreground, you should:",
					"options": ["Increase global exposure", "Use a Graduated Filter on the sky", "Increase saturation", "Reduce clarity"],
					"answer": "Use a Graduated Filter on the sky"
				}, {
					"question": "Enhancing skies without affecting the foreground requires:",
					"options": ["Global contrast increase", "Local adjustment using mask tools", "Cropping", "Decreasing temperature globally"],
					"answer": "Local adjustment using mask tools"
				}, {
					"question": "Creating depth using light gradients works because:",
					"options": ["It increases file size", "It mimics natural light falloff", "It sharpens entire image", "It removes shadows"],
					"answer": "It mimics natural light falloff"
				}, {
					"question": "Adjusting temperature locally is helpful when:",
					"options": ["Entire image has color issue", "Only one section has incorrect white balance", "Exporting files", "Adding keywords"],
					"answer": "Only one section has incorrect white balance"
				}, {
					"question": "Selective sharpening is best applied to:",
					"options": ["Background blur", "Key details like eyes or subject focus area", "Entire image equally", "Shadows only"],
					"answer": "Key details like eyes or subject focus area"
				}]
			}, {
				"id": "ch2-q4",
				"name": "Quiz 4: Dodging, Burning, and HSL Adjustments",
				"questions": [{
					"question": "Dodging and burning refers to:",
					"options": ["Cropping and resizing", "Lightening and darkening specific areas", "Removing noise", "Deleting pixels"],
					"answer": "Lightening and darkening specific areas"
				}, {
					"question": "Local exposure correction in portraits helps to:",
					"options": ["Flatten facial features", "Enhance dimension and balance skin tones", "Increase noise", "Oversaturate colors"],
					"answer": "Enhance dimension and balance skin tones"
				}, {
					"question": "Combining multiple local adjustments should aim to:",
					"options": ["Make edits obvious", "Maintain natural look", "Overexpose highlights", "Increase vibrance excessively"],
					"answer": "Maintain natural look"
				}, {
					"question": "Creating focus using light primarily involves:",
					"options": ["Increasing global brightness", "Brightening subject and subtly darkening surroundings", "Cropping heavily", "Adding noise"],
					"answer": "Brightening subject and subtly darkening surroundings"
				}, {
					"question": "Over-editing can reduce image quality by:",
					"options": ["Enhancing natural feel", "Creating unnatural colors and halos", "Improving sharpness", "Reducing file size"],
					"answer": "Creating unnatural colors and halos"
				}, {
					"question": "The Hue slider changes:",
					"options": ["Brightness", "Specific color tones", "Sharpness", "File metadata"],
					"answer": "Specific color tones"
				}, {
					"question": "The Luminance slider controls:",
					"options": ["Color intensity", "Brightness of individual colors", "Contrast only", "Cropping"],
					"answer": "Brightness of individual colors"
				}, {
					"question": "The Targeted Adjustment Tool in HSL allows:",
					"options": ["Global exposure control", "Direct adjustment of selected color areas in image", "File export", "Keyword editing"],
					"answer": "Direct adjustment of selected color areas in image"
				}, {
					"question": "Converting to Black & White using HSL sliders allows:",
					"options": ["Removing editing flexibility", "Controlling tonal contrast of specific colors", "Adding color back", "Deleting highlights"],
					"answer": "Controlling tonal contrast of specific colors"
				}, {
					"question": "Enhancing texture and clarity in monochrome images helps to:",
					"options": ["Reduce depth", "Increase detail and dimension", "Remove sharpness", "Flatten tonal range"],
					"answer": "Increase detail and dimension"
				}]
			}, {
				"id": "ch2-q5",
				"name": "Quiz 5: Sharpness, Noise, and Detail Panel",
				"questions": [{
					"question": "Image sharpness is primarily affected by:",
					"options": ["File name", "Focus accuracy and camera stability", "Metadata", "White balance"],
					"answer": "Focus accuracy and camera stability"
				}, {
					"question": "Camera shake typically results in:",
					"options": ["Selective blur in background only", "Overall motion blur across the image", "Color distortion", "Increased sharpness"],
					"answer": "Overall motion blur across the image"
				}, {
					"question": "Focus issues usually cause:",
					"options": ["Uniform blur", "Softness in specific areas intended to be sharp", "Increased contrast", "Noise"],
					"answer": "Softness in specific areas intended to be sharp"
				}, {
					"question": "The Detail Panel in Lightroom is mainly used for:",
					"options": ["Cropping", "Sharpening and noise reduction", "Metadata editing", "Export settings"],
					"answer": "Sharpening and noise reduction"
				}, {
					"question": "Increasing the Amount slider under Sharpening will:",
					"options": ["Reduce noise", "Increase edge contrast", "Decrease exposure", "Fix distortion"],
					"answer": "Increase edge contrast"
				}, {
					"question": "Digital noise is most noticeable in:",
					"options": ["Low ISO images", "High ISO images", "RAW files only", "JPEG files only"],
					"answer": "High ISO images"
				}, {
					"question": "Luminance noise appears as:",
					"options": ["Color speckles", "Grain-like texture", "Lens distortion", "Vignetting"],
					"answer": "Grain-like texture"
				}, {
					"question": "Color noise appears as:",
					"options": ["Brightness variation only", "Random colored speckles", "Motion blur", "Focus error"],
					"answer": "Random colored speckles"
				}, {
					"question": "Increasing noise reduction too much can:",
					"options": ["Improve texture", "Make image look overly smooth and lose detail", "Increase sharpness", "Correct exposure"],
					"answer": "Make image look overly smooth and lose detail"
				}, {
					"question": "Balancing sharpness and noise reduction requires:",
					"options": ["Maximizing both sliders", "Careful adjustment to maintain detail without introducing grain", "Ignoring ISO settings", "Using presets only"],
					"answer": "Careful adjustment to maintain detail without introducing grain"
				}]
			}, {
				"id": "ch2-q6",
				"name": "Quiz 6: Lens Corrections, Technical Quality, and Presets",
				"questions": [{
					"question": "Lens distortion typically causes:",
					"options": ["Color shifts", "Curved or warped lines", "Grain", "Blur"],
					"answer": "Curved or warped lines"
				}, {
					"question": "Chromatic aberration appears as:",
					"options": ["Black shadows", "Colored fringing along high-contrast edges", "Soft focus", "Overexposure"],
					"answer": "Colored fringing along high-contrast edges"
				}, {
					"question": "Enabling Profile Corrections helps to:",
					"options": ["Increase vibrance", "Automatically correct lens distortion and vignetting", "Add sharpness", "Remove noise"],
					"answer": "Automatically correct lens distortion and vignetting"
				}, {
					"question": "Manual lens adjustments are useful when:",
					"options": ["Automatic profile fails to fully correct distortion", "Exporting files", "Adding metadata", "Renaming photos"],
					"answer": "Automatic profile fails to fully correct distortion"
				}, {
					"question": "Correct order of adjustments typically starts with:",
					"options": ["Export settings", "Basic exposure and white balance correction", "Batch processing", "Preset application only"],
					"answer": "Basic exposure and white balance correction"
				}, {
					"question": "Maintaining a natural look requires:",
					"options": ["Maximum clarity and contrast", "Subtle, balanced adjustments", "Extreme saturation", "Heavy sharpening"],
					"answer": "Subtle, balanced adjustments"
				}, {
					"question": "A technical quality checklist should include:",
					"options": ["Only exposure", "Focus, noise, distortion, color balance, and sharpness", "Metadata only", "File size"],
					"answer": "Focus, noise, distortion, color balance, and sharpness"
				}, {
					"question": "Batch processing is useful when:",
					"options": ["Editing one photo", "Applying similar adjustments to multiple photos", "Deleting files", "Creating new catalog"],
					"answer": "Applying similar adjustments to multiple photos"
				}, {
					"question": "Sync settings allow photographers to:",
					"options": ["Transfer files", "Apply selected adjustments across images", "Delete metadata", "Export automatically"],
					"answer": "Apply selected adjustments across images"
				}, {
					"question": "Creating custom presets helps to:",
					"options": ["Automate consistent editing style", "Replace manual editing entirely", "Increase noise", "Reduce quality"],
					"answer": "Automate consistent editing style"
				}]
			}, {
				"id": "ch2-q7",
				"name": "Quiz 7: Book Module and Exporting",
				"questions": [{
					"question": "The Lightroom Book Module is primarily used to:",
					"options": ["Edit RAW files", "Design and export photobooks", "Create panoramas", "Apply presets"],
					"answer": "Design and export photobooks"
				}, {
					"question": "The main difference between PDF, Print, and Blurb export is that:",
					"options": ["They all produce identical output", "Blurb is designed for direct professional book printing", "PDF cannot be shared digitally", "Print export is for social media"],
					"answer": "Blurb is designed for direct professional book printing"
				}, {
					"question": "Preparing images for layout involves:",
					"options": ["Ignoring resolution", "Selecting and editing final images before placing them", "Renaming folders only", "Adding heavy filters"],
					"answer": "Selecting and editing final images before placing them"
				}, {
					"question": "Sequencing in a photobook primarily enhances:",
					"options": ["File size", "Visual storytelling and flow", "Metadata", "Noise reduction"],
					"answer": "Visual storytelling and flow"
				}, {
					"question": "Page templates in the Book Module help to:",
					"options": ["Auto-edit images", "Maintain consistent layout structure", "Delete unused photos", "Adjust exposure"],
					"answer": "Maintain consistent layout structure"
				}, {
					"question": "White space in photobook design is important because it:",
					"options": ["Wastes space", "Improves readability and visual balance", "Reduces image quality", "Increases noise"],
					"answer": "Improves readability and visual balance"
				}, {
					"question": "Adding captions effectively requires:",
					"options": ["Long paragraphs", "Clear, concise typography aligned with theme", "Random fonts", "Overlapping text on subject"],
					"answer": "Clear, concise typography aligned with theme"
				}, {
					"question": "For print projects, higher resolution is important to:",
					"options": ["Reduce clarity", "Maintain sharpness and detail", "Increase noise", "Decrease file size"],
					"answer": "Maintain sharpness and detail"
				}, {
					"question": "Print exports typically use which color profile?",
					"options": ["RGB only", "CMYK or printer-specific profile", "HSL", "Grayscale"],
					"answer": "CMYK or printer-specific profile"
				}, {
					"question": "A final proofing checklist should include checking:",
					"options": ["File names only", "Spelling, alignment, cropping, and color consistency", "Metadata tags only", "Presets used"],
					"answer": "Spelling, alignment, cropping, and color consistency"
				}]
			}, {
				"id": "ch2-q8",
				"name": "Quiz 8: HDR, Panoramas, and Advanced Techniques",
				"questions": [{
					"question": "HDR stands for:",
					"options": ["High Detail Rendering", "High Dynamic Range", "High Depth Resolution", "Hyper Digital Rendering"],
					"answer": "High Dynamic Range"
				}, {
					"question": "Dynamic range refers to:",
					"options": ["Number of colors", "Range between darkest shadows and brightest highlights", "Resolution", "Sharpness"],
					"answer": "Range between darkest shadows and brightest highlights"
				}, {
					"question": "Bracketing exposure involves:",
					"options": ["Shooting one image", "Taking multiple exposures at different brightness levels", "Increasing ISO only", "Cropping photos"],
					"answer": "Taking multiple exposures at different brightness levels"
				}, {
					"question": "Lightroom’s HDR Merge tool combines:",
					"options": ["Different focal lengths", "Multiple exposures into one balanced image", "Multiple presets", "Different catalogs"],
					"answer": "Multiple exposures into one balanced image"
				}, {
					"question": "Tone mapping helps to:",
					"options": ["Rename files", "Balance highlights and shadows in HDR images", "Add noise", "Crop panoramas"],
					"answer": "Balance highlights and shadows in HDR images"
				}, {
					"question": "Over-processing HDR often results in:",
					"options": ["Natural look", "Halos and unrealistic colors", "Reduced clarity", "Lower exposure"],
					"answer": "Halos and unrealistic colors"
				}, {
					"question": "A natural HDR look aims to:",
					"options": ["Exaggerate every detail", "Mimic how the human eye sees contrast", "Maximize saturation", "Remove shadows completely"],
					"answer": "Mimic how the human eye sees contrast"
				}, {
					"question": "For best panorama results while shooting, you should:",
					"options": ["Change exposure between shots", "Keep consistent exposure and overlap frames", "Use flash randomly", "Tilt camera vertically"],
					"answer": "Keep consistent exposure and overlap frames"
				}, {
					"question": "Boundary Warp in Lightroom Panorama helps to:",
					"options": ["Add distortion", "Fill empty edges without heavy cropping", "Reduce noise", "Increase sharpness"],
					"answer": "Fill empty edges without heavy cropping"
				}, {
					"question": "Combining photobook design, HDR editing, and panorama creation demonstrates:",
					"options": ["Basic editing only", "Advanced finishing and storytelling capability", "File organization only", "Preset application"],
					"answer": "Advanced finishing and storytelling capability"
				}]
			}]
		}, {
			id: "chapter3",
			name: "Chapter 3: Master Photoshop",
			description: "Advanced Master Photoshop.",
			icon: "⭐",
			quizzes: [{
				"id": "ch3-q1",
				"name": "Quiz 1: Photoshop Interface and Basic Adjustments",
				"questions": [{
					"question": "Adobe Photoshop is primarily used for:",
					"options": ["Video editing", "Image editing and graphic design", "Database management", "Programming"],
					"answer": "Image editing and graphic design"
				}, {
					"question": "The Photoshop workspace includes:",
					"options": ["Only toolbar", "Toolbar, panels, and canvas area", "Only panels", "Only menus"],
					"answer": "Toolbar, panels, and canvas area"
				}, {
					"question": "The Toolbar in Photoshop is used to:",
					"options": ["Write code", "Access editing tools like brush, selection, etc.", "Save files", "Manage color profiles"],
					"answer": "Access editing tools like brush, selection, etc."
				}, {
					"question": "Panels in Photoshop help users to:",
					"options": ["Write code", "Manage layers, colors, and adjustments", "Export files", "Print images"],
					"answer": "Manage layers, colors, and adjustments"
				}, {
					"question": "Brightness and contrast adjustments are used to:",
					"options": ["Change image size", "Improve image lighting and clarity", "Remove background", "Add text"],
					"answer": "Improve image lighting and clarity"
				}, {
					"question": "Hue and saturation adjustments affect:",
					"options": ["Image resolution", "Color tone and intensity", "Image size", "File format"],
					"answer": "Color tone and intensity"
				}, {
					"question": "Color balance adjustment helps to:",
					"options": ["Resize image", "Adjust color tones (shadows, midtones, highlights)", "Add filters", "Crop images"],
					"answer": "Adjust color tones (shadows, midtones, highlights)"
				}, {
					"question": "Exposure adjustment is used to:",
					"options": ["Control brightness level of the image", "Add text", "Create layers", "Remove noise"],
					"answer": "Control brightness level of the image"
				}, {
					"question": "Layers in Photoshop allow users to:",
					"options": ["Combine all elements permanently", "Work on different elements independently", "Delete images", "Export files"],
					"answer": "Work on different elements independently"
				}, {
					"question": "Adjustment layers are used for:",
					"options": ["Permanent edits", "Non-destructive editing", "Cropping images", "Adding shapes"],
					"answer": "Non-destructive editing"
				}]
			}, {
				"id": "ch3-q2",
				"name": "Quiz 2: Layers, Selections, and Compositing",
				"questions": [{
					"question": "A layer mask is used to:",
					"options": ["Delete layers", "Hide or reveal parts of a layer", "Merge layers", "Resize images"],
					"answer": "Hide or reveal parts of a layer"
				}, {
					"question": "Selection tools are used to:",
					"options": ["Add text", "Select specific areas of an image for editing", "Export images", "Apply global filters"],
					"answer": "Select specific areas of an image for editing"
				}, {
					"question": "Which tool is best for selecting irregular shapes?",
					"options": ["Marquee tool", "Lasso tool", "Brush tool", "Eraser tool"],
					"answer": "Lasso tool"
				}, {
					"question": "Magic Wand tool selects areas based on:",
					"options": ["Shape", "Color similarity", "Size", "Position"],
					"answer": "Color similarity"
				}, {
					"question": "Photo compositing involves:",
					"options": ["Cropping images", "Combining multiple images into one", "Adjusting brightness only", "Removing noise"],
					"answer": "Combining multiple images into one"
				}, {
					"question": "Background removal is commonly done using:",
					"options": ["Brush tool", "Selection tools and masks", "Text tool", "Gradient tool"],
					"answer": "Selection tools and masks"
				}, {
					"question": "The Healing Brush tool is used for:",
					"options": ["Adding text", "Removing blemishes and imperfections", "Resizing images", "Creating shapes"],
					"answer": "Removing blemishes and imperfections"
				}, {
					"question": "Clone Stamp tool works by:",
					"options": ["Painting new colors", "Copying pixels from one area to another", "Blurring images", "Cropping images"],
					"answer": "Copying pixels from one area to another"
				}, {
					"question": "Black and white conversion helps to:",
					"options": ["Increase file size", "Focus on contrast and texture", "Remove layers", "Speed up exporting"],
					"answer": "Focus on contrast and texture"
				}, {
					"question": "Effects like double exposure are used to:",
					"options": ["Reduce quality", "Combine images creatively for artistic output", "Resize images", "Remove color"],
					"answer": "Combine images creatively for artistic output"
				}]
			}, {
				"id": "ch3-q3",
				"name": "Quiz 3: Advanced Selections and Blend Modes",
				"questions": [{
					"question": "Precise selections in Photoshop are important because they:",
					"options": ["Reduce file size", "Allow targeted editing without affecting the entire image", "Increase image resolution", "Replace layers"],
					"answer": "Allow targeted editing without affecting the entire image"
				}, {
					"question": "The Color Range tool selects areas based on:",
					"options": ["Shape", "Color similarity", "Size", "Brightness only"],
					"answer": "Color similarity"
				}, {
					"question": "Focus Range selection is useful for:",
					"options": ["Selecting all pixels", "Selecting areas based on sharpness or focus", "Removing noise", "Adjusting brightness"],
					"answer": "Selecting areas based on sharpness or focus"
				}, {
					"question": "Combining multiple selection tools helps to:",
					"options": ["Reduce editing accuracy", "Improve precision in complex selections", "Remove layers", "Avoid masking"],
					"answer": "Improve precision in complex selections"
				}, {
					"question": "Edge detection in Photoshop helps to:",
					"options": ["Blur image", "Improve selection boundaries around objects", "Remove colors", "Add filters"],
					"answer": "Improve selection boundaries around objects"
				}, {
					"question": "Refining selections is important for:",
					"options": ["Exporting files", "Accurate compositing and retouching", "Cropping images", "Adding text"],
					"answer": "Accurate compositing and retouching"
				}, {
					"question": "Preparing selections before compositing ensures:",
					"options": ["Lower image quality", "Seamless blending of images", "Larger file size", "Reduced layers"],
					"answer": "Seamless blending of images"
				}, {
					"question": "Blend modes control:",
					"options": ["File format", "How layers interact with each other", "Image size", "Export settings"],
					"answer": "How layers interact with each other"
				}, {
					"question": "Using blend modes can help in:",
					"options": ["Writing code", "Creating lighting and texture effects", "Removing layers", "Cropping images"],
					"answer": "Creating lighting and texture effects"
				}, {
					"question": "Advanced layer masking allows users to:",
					"options": ["Delete images permanently", "Hide or reveal parts of layers non-destructively", "Resize images", "Add filters"],
					"answer": "Hide or reveal parts of layers non-destructively"
				}]
			}, {
				"id": "ch3-q4",
				"name": "Quiz 4: Non-Destructive Editing, Masks, and Retouching",
				"questions": [{
					"question": "Non-destructive editing means:",
					"options": ["Permanently altering the original image", "Making edits without losing original data", "Deleting layers", "Reducing quality"],
					"answer": "Making edits without losing original data"
				}, {
					"question": "Combining multiple masks helps to:",
					"options": ["Reduce image quality", "Create complex compositions", "Delete layers", "Avoid editing"],
					"answer": "Create complex compositions"
				}, {
					"question": "Masks are primarily used to:",
					"options": ["Add effects globally", "Control visibility of specific areas", "Resize images", "Export files"],
					"answer": "Control visibility of specific areas"
				}, {
					"question": "Brush tools in Photoshop are used for:",
					"options": ["Coding", "Painting, retouching, and masking", "Exporting files", "Managing layers"],
					"answer": "Painting, retouching, and masking"
				}, {
					"question": "Brush hardness controls:",
					"options": ["Brush color", "Edge softness of the brush stroke", "Brush size", "Brush speed"],
					"answer": "Edge softness of the brush stroke"
				}, {
					"question": "Brush opacity affects:",
					"options": ["Brush size", "Transparency of brush strokes", "Color saturation", "Layer visibility"],
					"answer": "Transparency of brush strokes"
				}, {
					"question": "Custom brushes allow designers to:",
					"options": ["Reduce creativity", "Create unique textures and artistic effects", "Remove layers", "Avoid editing"],
					"answer": "Create unique textures and artistic effects"
				}, {
					"question": "Importing brush presets helps to:",
					"options": ["Replace Photoshop tools", "Expand available brush styles and effects", "Delete existing brushes", "Reduce image quality"],
					"answer": "Expand available brush styles and effects"
				}, {
					"question": "Professional retouching aims to:",
					"options": ["Over-edit images", "Enhance appearance while maintaining natural look", "Remove all textures", "Blur entire image"],
					"answer": "Enhance appearance while maintaining natural look"
				}, {
					"question": "Tools like Healing Brush and Clone Stamp are used to:",
					"options": ["Add text", "Remove blemishes and imperfections", "Resize images", "Adjust brightness"],
					"answer": "Remove blemishes and imperfections"
				}]
			}, {
				"id": "ch3-q5",
				"name": "Quiz 5: Typography and Layer Styles",
				"questions": [{
					"question": "Text layers in Photoshop allow designers to:",
					"options": ["Edit images only", "Add and format text independently", "Remove colors", "Resize canvas"],
					"answer": "Add and format text independently"
				}, {
					"question": "Typography in design primarily focuses on:",
					"options": ["Image resolution", "Arrangement and styling of text", "File size", "Color correction"],
					"answer": "Arrangement and styling of text"
				}, {
					"question": "Tracking in typography refers to:",
					"options": ["Line spacing", "Space between all characters in a word", "Space between lines", "Font size"],
					"answer": "Space between all characters in a word"
				}, {
					"question": "Kerning adjusts:",
					"options": ["Space between lines", "Space between individual letter pairs", "Alignment of text", "Font color"],
					"answer": "Space between individual letter pairs"
				}, {
					"question": "Leading controls:",
					"options": ["Character spacing", "Line spacing between text lines", "Text alignment", "Text size"],
					"answer": "Line spacing between text lines"
				}, {
					"question": "Text alignment determines:",
					"options": ["Font style", "Position of text relative to margins (left, center, right)", "Text size", "Text color"],
					"answer": "Position of text relative to margins (left, center, right)"
				}, {
					"question": "Drop shadow is used to:",
					"options": ["Blur text", "Add depth by creating a shadow behind text", "Change text color", "Resize text"],
					"answer": "Add depth by creating a shadow behind text"
				}, {
					"question": "Stroke layer style adds:",
					"options": ["Shadow", "Outline around text or object", "Gradient", "Blur effect"],
					"answer": "Outline around text or object"
				}, {
					"question": "Gradient overlay applies:",
					"options": ["Single color", "Smooth transition between colors", "Shadow effect", "Texture only"],
					"answer": "Smooth transition between colors"
				}, {
					"question": "Typography in advertisements should focus on:",
					"options": ["Random fonts", "Readability and visual appeal", "Large file sizes", "Avoiding alignment"],
					"answer": "Readability and visual appeal"
				}]
			}, {
				"id": "ch3-q6",
				"name": "Quiz 6: Content-Aware Tools, Warp, and Automation",
				"questions": [{
					"question": "Content-Aware Scale is used to:",
					"options": ["Resize an image while preserving important details", "Crop image", "Add filters", "Change color"],
					"answer": "Resize an image while preserving important details"
				}, {
					"question": "Puppet Warp allows users to:",
					"options": ["Rotate entire image", "Bend and distort specific parts of an object", "Add text", "Apply filters"],
					"answer": "Bend and distort specific parts of an object"
				}, {
					"question": "Moving objects realistically requires:",
					"options": ["Ignoring perspective", "Maintaining lighting and shadows consistency", "Changing colors randomly", "Removing layers"],
					"answer": "Maintaining lighting and shadows consistency"
				}, {
					"question": "Creating depth in an image involves:",
					"options": ["Flattening all layers", "Using perspective, shadows, and scaling", "Removing colors", "Cropping images"],
					"answer": "Using perspective, shadows, and scaling"
				}, {
					"question": "Adjusting perspective helps to:",
					"options": ["Reduce realism", "Create a 3D visual effect", "Blur images", "Remove layers"],
					"answer": "Create a 3D visual effect"
				}, {
					"question": "Photoshop automation helps to:",
					"options": ["Increase manual work", "Perform repetitive tasks efficiently", "Remove editing tools", "Avoid workflows"],
					"answer": "Perform repetitive tasks efficiently"
				}, {
					"question": "Creating panoramas involves:",
					"options": ["Cropping images", "Merging multiple images into a wide view", "Adding text", "Applying filters"],
					"answer": "Merging multiple images into a wide view"
				}, {
					"question": "Batch editing allows users to:",
					"options": ["Edit one image at a time", "Apply the same edits to multiple images automatically", "Delete images", "Resize manually"],
					"answer": "Apply the same edits to multiple images automatically"
				}, {
					"question": "Smart Objects allow:",
					"options": ["Permanent editing", "Non-destructive editing and easy transformations", "Deleting original image", "Reducing quality"],
					"answer": "Non-destructive editing and easy transformations"
				}, {
					"question": "Smart Filters are used to:",
					"options": ["Apply filters permanently", "Apply filters that can be edited or removed later", "Resize images", "Add layers"],
					"answer": "Apply filters that can be edited or removed later"
				}]
			}, {
				"id": "ch3-q7",
				"name": "Quiz 7: Photoshop Actions and Digital Illustration",
				"questions": [{
					"question": "Photoshop Actions are used to:",
					"options": ["Draw images", "Record and automate repetitive editing steps", "Resize images manually", "Add filters only"],
					"answer": "Record and automate repetitive editing steps"
				}, {
					"question": "Recording an action allows users to:",
					"options": ["Delete edits", "Save a sequence of steps for reuse", "Reduce file size", "Export images"],
					"answer": "Save a sequence of steps for reuse"
				}, {
					"question": "Applying an action to multiple images is called:",
					"options": ["Cropping", "Batch processing", "Masking", "Rendering"],
					"answer": "Batch processing"
				}, {
					"question": "Built-in Photoshop actions help users to:",
					"options": ["Avoid editing", "Quickly apply predefined effects", "Replace tools", "Remove layers"],
					"answer": "Quickly apply predefined effects"
				}, {
					"question": "Custom actions improve workflow by:",
					"options": ["Increasing manual effort", "Automating repetitive tasks efficiently", "Reducing productivity", "Avoiding editing"],
					"answer": "Automating repetitive tasks efficiently"
				}, {
					"question": "Digital illustration in Photoshop involves:",
					"options": ["Writing code", "Creating artwork using drawing tools and brushes", "Managing files", "Exporting images"],
					"answer": "Creating artwork using drawing tools and brushes"
				}, {
					"question": "Brush tools are essential for:",
					"options": ["File compression", "Drawing and painting digitally", "Image export", "Layer merging"],
					"answer": "Drawing and painting digitally"
				}, {
					"question": "Photoshop differs from Illustrator because Photoshop is:",
					"options": ["Vector-based only", "Raster-based and pixel-oriented", "Used only for animation", "Used only for coding"],
					"answer": "Raster-based and pixel-oriented"
				}, {
					"question": "Layered illustrations allow designers to:",
					"options": ["Combine all elements permanently", "Edit individual elements independently", "Reduce image quality", "Avoid shading"],
					"answer": "Edit individual elements independently"
				}, {
					"question": "Adding shading to illustrations helps to:",
					"options": ["Flatten image", "Create depth and realism", "Reduce clarity", "Remove colors"],
					"answer": "Create depth and realism"
				}]
			}, {
				"id": "ch3-q8",
				"name": "Quiz 8: Refinement, Calibration, and Final Optimization",
				"questions": [{
					"question": "Refining artwork using layers ensures:",
					"options": ["Loss of control", "Better editing flexibility", "Permanent edits", "Reduced creativity"],
					"answer": "Better editing flexibility"
				}, {
					"question": "Image sharpening is important to:",
					"options": ["Blur images", "Enhance details and clarity", "Reduce resolution", "Remove colors"],
					"answer": "Enhance details and clarity"
				}, {
					"question": "Screen calibration ensures:",
					"options": ["Faster editing", "Accurate color display on screen", "Smaller file size", "Better compression"],
					"answer": "Accurate color display on screen"
				}, {
					"question": "Printer profiling helps to:",
					"options": ["Increase printing speed", "Ensure accurate color output in prints", "Reduce ink usage", "Resize images"],
					"answer": "Ensure accurate color output in prints"
				}, {
					"question": "RGB color space is mainly used for:",
					"options": ["Printing", "Digital screens", "Scanning", "Photography only"],
					"answer": "Digital screens"
				}, {
					"question": "CMYK color space is mainly used for:",
					"options": ["Mobile screens", "Printing", "Web design", "Video editing"],
					"answer": "Printing"
				}, {
					"question": "Reducing noise in images is important for:",
					"options": ["Increasing blur", "Improving image quality, especially in low-light photos", "Reducing contrast", "Removing details"],
					"answer": "Improving image quality, especially in low-light photos"
				}, {
					"question": "Correct sharpening techniques help to:",
					"options": ["Add noise", "Enhance details without over-sharpening", "Blur images", "Remove textures"],
					"answer": "Enhance details without over-sharpening"
				}, {
					"question": "Final image optimization includes:",
					"options": ["Ignoring output format", "Adjusting size, quality, and format before export", "Removing layers", "Avoiding compression"],
					"answer": "Adjusting size, quality, and format before export"
				}, {
					"question": "Custom workflows in Photoshop help designers to:",
					"options": ["Work randomly", "Adapt tools and processes based on project needs", "Avoid planning", "Reduce efficiency"],
					"answer": "Adapt tools and processes based on project needs"
				}]
			}]
		}]
	}
};