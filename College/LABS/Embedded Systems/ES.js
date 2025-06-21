   async function generateContent() {
        const tocList = document.getElementById("toc-list");
        const programsContainer = document.getElementById("programs-container");

        try {
            // Fetch the JSON file containing the programs
            const response = await fetch("https://raw.githubusercontent.com/Runarok/Guides/refs/heads/main/Code%20Reference/GenAI-plus/College-LABS/ES.json"); // Change the path if needed
            const programs = await response.json();

            programs.forEach((program, index) => {
                const programId = `program${index + 1}`;

                // Create TOC item
                const li = document.createElement("li");
                const a = document.createElement("a");
                a.href = `#${programId}`;
                a.textContent = program.title;
                li.appendChild(a);
                tocList.appendChild(li);

                // Create section
                const section = document.createElement("section");
                section.id = programId;

                const h2 = document.createElement("h2");
                h2.textContent = program.title;
                section.appendChild(h2);

                // Copy button
                const copyBtn = document.createElement("button");
                copyBtn.textContent = "Copy Code";
                copyBtn.className = "copy-btn";

                const pre = document.createElement("pre");
                pre.textContent = program.code;

                copyBtn.addEventListener("click", () => {
                    navigator.clipboard.writeText(program.code)
                        .then(() => {
                            copyBtn.textContent = "Copied!";
                            setTimeout(() => {
                                copyBtn.textContent = "Copy Code";
                            }, 1500);
                        })
                        .catch(err => {
                            console.error("Copy failed:", err);
                        });
                });

                section.appendChild(copyBtn);
                section.appendChild(pre);
                programsContainer.appendChild(section);
            });

        } catch (error) {
            console.error("Error loading program list:", error);
        }
    }

    document.addEventListener("DOMContentLoaded", generateContent);