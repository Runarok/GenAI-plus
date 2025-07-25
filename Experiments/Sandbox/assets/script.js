const sandboxData = [{
    category: 'Sandbox Prototypes',
    items: [{
        name: 'Basic Simulation',
        description: 'Introduced simple sand behavior',
        link: 'Files/Prototype1/index.html'
    }, {
        name: 'Color Selection',
        description: 'Added sand color customization',
        link: 'Files/Prototype2/index.html'
    }, {
        name: 'Drawing Tools',
        description: 'Added brush and eraser functionality',
        link: 'Files/Prototype3/index.html'
    }, {
        name: 'Tool Improvements',
        description: 'Refined drawing tools and interactions',
        link: 'Files/Prototype4/index.html'
    }, {
        name: 'UI Enhancements',
        description: 'Improved interface layout and usability',
        link: 'Files/Prototype5/index.html'
    }]
}];

    // Get the container div
    const container = document.getElementById('container');

    // Function to create a sandbox category
    function createSandboxCategory(categoryData) {
        const categoryDiv = document.createElement('div');
        categoryDiv.classList.add('sandbox-category');

        const categoryTitle = document.createElement('div');
        categoryTitle.classList.add('category-title');
        categoryTitle.textContent = categoryData.category;
        categoryDiv.appendChild(categoryTitle);

        const sandboxList = document.createElement('ul');
        sandboxList.classList.add('sandbox-list');

        categoryData.items.forEach(item => {
            const sandboxItem = document.createElement('li');
            sandboxItem.classList.add('sandbox-item');

            const description = document.createElement('div');
            description.classList.add('description');
            description.textContent = `${item.name}: ${item.description}`; // <-- Fixed here

            const buttonContainer = document.createElement('div');
            buttonContainer.classList.add('button-container');

            const tryButton = document.createElement('a');
            tryButton.href = item.link;
            tryButton.classList.add('try-button');
            tryButton.textContent = 'Try';

            buttonContainer.appendChild(tryButton);
            sandboxItem.appendChild(description);
            sandboxItem.appendChild(buttonContainer);
            sandboxList.appendChild(sandboxItem);
        });

        categoryDiv.appendChild(sandboxList);
        return categoryDiv;
    }

    // Create the entire body content dynamically
    sandboxData.forEach(categoryData => {
        const categoryDiv = createSandboxCategory(categoryData);
        container.appendChild(categoryDiv);
    });