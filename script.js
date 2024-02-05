document.addEventListener('DOMContentLoaded', () => {
    const toolsList = document.querySelector('.tools-list');
    const filterButtons = document.querySelectorAll('.filter');

    fetch('tools.json')
        .then(response => response.json())
        .then(data => {
            displayTools(data);

            filterButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const type = button.getAttribute('data-type');
                    const filteredTools = data.filter(tool => tool.type === type);
                    displayTools(filteredTools);
                });
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
