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
});
