document.addEventListener('DOMContentLoaded', () => {
    const toolsList = document.querySelector('.tools-list');
    const filterButtons = document.querySelectorAll('.filter');
    const searchInput = document.getElementById('search-input');
    const listViewBtn = document.getElementById('list-view-btn');
    const tableViewBtn = document.getElementById('table-view-btn');
    const resetViewBtn = document.getElementById('reset-view-btn');
    let toolsData = [];
    let currentView = 'tile'; // Set tile view as default
    let currentTools = []; // To keep track of the currently displayed tools
    let tableView; // Declare tableView outside to ensure it's dynamically created only when needed

    // Load tools data
    fetch('tools.json')
        .then(response => response.json())
        .then(data => {
            toolsData = data;
            currentTools = [...toolsData];
            displayTools(currentTools); // Display tools in the tile view by default
        });

    // Function to display tools based on the current view
    const displayTools = (tools) => {
        toolsList.innerHTML = ''; // Clear the list first
        if (currentView === 'tile') {
            tools.forEach(tool => createToolElement(tool, 'tile'));
        } else if (currentView === 'list') {
            tools.forEach(tool => createToolElement(tool, 'list'));
        } else {
            createTableView(tools);
        }
    };

    // Create individual tool elements for tile and list views
    const createToolElement = (tool, viewType) => {
        const toolElement = document.createElement('div');
        toolElement.classList.add(viewType === 'tile' ? 'tool' : 'tool-list');
        toolElement.innerHTML = `
            <img src="${tool.image}" alt="${tool.name}" style="width: 100%;">
            <h3>${tool.name}</h3>
            <p>Cena netto: ${tool.netPrice} PLN</p>
            <p>Cena brutto: ${tool.grossPrice} PLN</p>
            <p>Kaucja: ${tool.deposit} PLN</p>
        `;
        toolsList.appendChild(toolElement);
    };

    // Dynamically create the table view
    const createTableView = (tools) => {
        if (!tableView) { // Create tableView if it doesn't exist
            tableView = document.createElement('table');
            tableView.className = 'table-view';
            toolsList.parentNode.insertBefore(tableView, toolsList.nextSibling);
        }
        tableView.innerHTML = `<tr>
            <th>Obraz</th>
            <th>Nazwa</th>
            <th>Cena netto</th>
            <th>Cena brutto</th>
            <th>Kaucja</th>
        </tr>`;
        tools.forEach(tool => {
            const row = tableView.insertRow(-1);
            row.innerHTML = `
                <td><img src="${tool.image}" alt="${tool.name}" style="width: 50px;"></td>
                <td>${tool.name}</td>
                <td>${tool.netPrice} PLN</td>
                <td>${tool.grossPrice} PLN</td>
                <td>${tool.deposit} PLN</td>
            `;
        });
        tableView.style.display = 'table'; // Show table view
        toolsList.style.display = 'none'; // Hide div and list views
    };

    // View toggle buttons
    listViewBtn.addEventListener('click', () => switchView('list'));
    tableViewBtn.addEventListener('click', () => switchView('table'));
    resetViewBtn.addEventListener('click', () => {
    currentView = 'tile'; // Explicitly set to 'tile' view
    currentTools = [...toolsData];
    displayTools(currentTools);
});

    // Search and filter functionality for all views
    searchInput.addEventListener('input', () => {
        const searchText = searchInput.value.toLowerCase();
        currentTools = toolsData.filter(tool => tool.name.toLowerCase().includes(searchText));
        displayTools(currentTools);
    });

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const type = button.getAttribute('data-type');
            currentTools = toolsData.filter(tool => tool.type === type);
            displayTools(currentTools);
        });
    });

    // Function to switch between views
    const switchView = (view) => {
        currentView = view;
        if (tableView) tableView.style.display = 'none'; // Hide table view if switching away from it
        toolsList.style.display = 'block'; // Show div or list view
        displayTools(currentTools);
    };
});
