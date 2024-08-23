document.getElementById('saveNumber').addEventListener('click', saveNumber);
document.getElementById('numberInput').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        saveNumber();
    }
});

// Specific colors for each number from 3 to 18
const numberColors = {
    3: '#FF6347',  // Red
    4: '#6A5ACD',  // Blue
    5: '#48D1CC',  // Cyan
    6: '#FFD700',  // Gold
    7: '#FF69B4',  // Pink
    8: '#8A2BE2',  // Purple
    9: '#A52A2A',  // Brown
    10: '#5F9EA0', // CadetBlue
    11: '#D2691E', // Chocolate
    12: '#DC143C', // Crimson
    13: '#00FFFF', // Aqua
    14: '#00008B', // DarkBlue
    15: '#006400', // DarkGreen
    16: '#8B008B', // DarkMagenta
    17: '#556B2F', // DarkOliveGreen
    18: '#FF8C00'  // DarkOrange
};

let numbers = [];

function saveNumber() {
    const numberInput = document.getElementById('numberInput');
    const numberList = document.getElementById('numberList');
    const numberValue = parseInt(numberInput.value.trim(), 10);
    
    if (numberValue >= 3 && numberValue <= 18) {
        const color = numberColors[numberValue];
        
        // Append the number with a comma
        const formattedNumber = numberValue + ', ';
        
        // Create a new element for the number
        const numberElement = document.createElement('span');
        numberElement.textContent = formattedNumber;
        numberElement.style.color = color;
        numberList.appendChild(numberElement);

        // Add the number to the array and update the chart
        numbers.push(numberValue);
        updateChart();
        
        // Clear the input field
        numberInput.value = '';
    } else {
        alert('Please enter a number between 3 and 18.');
    }
}

function updateChart() {
    const total = numbers.reduce((acc, num) => acc + num, 0);
    const percentages = numbers.map(num => (num / total * 100).toFixed(2));
    
    // Clear existing chart
    const chartCanvas = document.getElementById('percentageChart');
    const chart = Chart.getChart(chartCanvas);
    if (chart) chart.destroy();
    
    // Create Percentage Chart
    new Chart(chartCanvas, {
        type: 'doughnut',
        data: {
            labels: numbers.map((num, i) => `Number ${num}`),
            datasets: [{
                data: percentages,
                backgroundColor: numbers.map(num => numberColors[num])
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    callbacks: {
                        label: function(tooltipItem) {
                            return `Number ${numbers[tooltipItem.dataIndex]}: ${tooltipItem.raw}%`;
                        }
                    }
                }
            }
        }
    });
}
