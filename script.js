document.addEventListener('DOMContentLoaded', () => {
    const toolsList = document.querySelector('.tools-list');
    const filterButtons = document.querySelectorAll('.filter');
    const searchInput = document.getElementById('search-input');
    let toolsData = [];

    fetch('tools.json')
        .then(response => response.json())
        .then(data => {
            toolsData = data; // Przechowuj dane narzędzi globalnie
            displayTools(toolsData);
        });

    searchInput.addEventListener('input', () => {
        const searchText = searchInput.value.toLowerCase();
        const filteredTools = toolsData.filter(tool => tool.name.toLowerCase().includes(searchText));
        displayTools(filteredTools);
    });

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const type = button.getAttribute('data-type');
            const filteredTools = toolsData.filter(tool => tool.type === type);
            displayTools(filteredTools);
        });
    });

    function displayTools(tools) {
        toolsList.innerHTML = ''; // Clear the list first
        tools.forEach(tool => {
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
        });
    }
	
	const listViewBtn = document.getElementById('list-view-btn');
    const tableViewBtn = document.getElementById('table-view-btn');
    const toolsList = document.querySelector('.tools-list');
    let tableView = document.createElement('table');
    tableView.className = 'table-view';
    
    // Funkcja do tworzenia widoku tabeli
    function createTableView(tools) {
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
    }

    // Obsługa przycisku widoku tabeli
    tableViewBtn.addEventListener('click', () => {
        toolsList.style.display = 'none'; // Ukryj widok listy
        tableView.style.display = 'table'; // Pokaż widok tabeli
        createTableView(toolsData); // Wywołaj funkcję tworzącą widok tabeli z aktualnymi danymi
        document.body.insertBefore(tableView, toolsList.nextSibling); // Wstaw tabelę za listą narzędzi
    });

    // Obsługa przycisku widoku listy
    listViewBtn.addEventListener('click', () => {
        tableView.style.display = 'none'; // Ukryj widok tabeli
        toolsList.style.display = 'block'; // Pokaż widok listy
    });
});