document.addEventListener('DOMContentLoaded', () => {
    const toolsList = document.querySelector('.tools-list');
    const filterButtons = document.querySelectorAll('.filter');
    const searchInput = document.getElementById('search-input');
    const listViewBtn = document.getElementById('list-view-btn');
    const tableViewBtn = document.getElementById('table-view-btn');
    const resetViewBtn = document.getElementById('reset-view-btn');
    let toolsData = [];
    let currentView = 'list'; // Track the current view
    let currentTools = []; // Track the current displayed tools

    fetch('tools.json')
        .then(response => response.json())
        .then(data => {
            toolsData = data;
            currentTools = [...toolsData];
            displayTools(currentTools);
            implementInfiniteScroll();
        });

    const displayTools = (tools, reset = false) => {
        if (reset || currentView === 'list') {
            toolsList.innerHTML = ''; // Clear the list first
            tools.forEach(tool => createToolElement(tool));
            toolsList.style.display = 'block'; // Ensure list view is visible
        } else {
            createTableView(tools);
        }
    };

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

    const createTableView = (tools) => {
        let tableView = document.querySelector('.table-view');
        if (!tableView) {
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
        tableView.style.display = 'table';
        toolsList.style.display = 'none'; // Hide list view
        currentView = 'table';
    };

    // Functionality to switch between list and table view
    listViewBtn.addEventListener('click', () => switchView('list'));
    tableViewBtn.addEventListener('click', () => switchView('table'));

    // Reset view to display all tools
    resetViewBtn.addEventListener('click', () => {
        currentTools = [...toolsData];
        displayTools(currentTools, true);
    });

    // Implement search functionality
    searchInput.addEventListener('input', () => {
        const searchText = searchInput.value.toLowerCase();
        currentTools = toolsData.filter(tool => tool.name.toLowerCase().includes(searchText));
        displayTools(currentTools);
    });

    // Filter functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const type = button.getAttribute('data-type');
            currentTools = toolsData.filter(tool => tool.type === type);
            displayTools(currentTools);
        });
    });

    const switchView = (view) => {
        currentView = view;
        displayTools(currentTools, true);
    };

    // Infinite scroll implementation
    const implementInfiniteScroll = () => {
        // Placeholder for infinite scroll logic
        // This would include adding an event listener to the scroll event and loading more items as needed
    };
});
