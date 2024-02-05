document.addEventListener('DOMContentLoaded', () => {
    // Pozostały kod wczytywania i wyświetlania narzędzi...
    
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