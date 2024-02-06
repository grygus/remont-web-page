document.addEventListener('DOMContentLoaded', () => {
    const toolsList = document.querySelector('.tools-list');
    const filterButtons = document.querySelectorAll('.filter');
    const searchInput = document.getElementById('search-input');
    const listViewBtn = document.getElementById('list-view-btn');
    const tableViewBtn = document.getElementById('table-view-btn');
    const resetViewBtn = document.getElementById('reset-view-btn');
    let toolsData = [];
    let currentView = 'list'; // Initialize with list view
    let currentTools = []; // To keep track of the currently displayed tools

    // Load tools data
    fetch('tools.json')
        .then(response => response.json())
        .then(data => {
            toolsData = data;
            currentTools = [...toolsData];
            displayTools(currentTools); // Display tools in the list view by default
        });

    // Display tools based on the current view
    const displayTools = (tools) => {
        if (currentView === 'list') {
            toolsList.innerHTML = ''; // Clear the list first
            tools.forEach(tool => createToolElement(tool));
            toolsList.style.display = 'block'; // Show list view
            if (tableView) tableView.style.display = 'none'; // Hide table view if it exists
        } else {
            createTableView(tools);
        }
    };

    // Create individual tool elements for list view
    const createToolElement = (tool) => {
        const toolElement = document.createElement('div');
        toolElement.classList.add('tool');
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
    let tableView; // Declare tableView outside to check its existence
    const createTableView = (tools) => {
        if (!tableView) { // Check if tableView doesn't exist, then create it
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
                <td><img src="${tool.image}" alt="${tool.name}"></td>
                <td>${tool.name}</td>
                <td>${tool.netPrice} PLN</td>
                <td>${tool.grossPrice} PLN</td>
                <td>${tool.deposit} PLN</td>
            `;
        });
        tableView.style.display = 'table'; // Show table view
        toolsList.style.display = 'none'; // Hide list view
    };

    // View toggle buttons
    listViewBtn.addEventListener('click', () => switchView('list'));
    tableViewBtn.addEventListener('click', () => switchView('table'));

    // Reset view to display all tools
    resetViewBtn.addEventListener('click', () => {
        currentTools = [...toolsData];
        displayTools(currentTools);
    });

    // Implement search functionality for both views
    searchInput.addEventListener('input', () => {
        const searchText = searchInput.value.toLowerCase();
        currentTools = toolsData.filter(tool => tool.name.toLowerCase().includes(searchText));
        displayTools(currentTools);
    });

    // Implement filter functionality for both views
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const type = button.getAttribute('data-type');
            currentTools = toolsData.filter(tool => tool.type === type);
            displayTools(currentTools);
        });
    });

    const switchView = (view) => {
        currentView = view;
        displayTools(currentTools);
    };
});
