function calculate() {
    // Get input values
    const principal = parseFloat(document.getElementById('principal').value);
    const rate = parseFloat(document.getElementById('rate').value) / 100; // Convert % to decimal
    const time = parseFloat(document.getElementById('time').value);
    const compoundsPerYear = parseInt(document.getElementById('frequency').value);

    // Validate inputs
    if (isNaN(principal) || isNaN(rate) || isNaN(time) || principal <= 0 || rate < 0 || time <= 0) {
        alert("Please enter valid positive numbers.");
        return;
    }

    // Calculate compound interest
    const amount = principal * Math.pow(1 + rate / compoundsPerYear, compoundsPerYear * time);
    const interest = amount - principal;

    // Display results
    document.getElementById('final-amount').textContent = `$${amount.toFixed(2)}`;
    document.getElementById('interest-earned').textContent = `$${interest.toFixed(2)}`;
    document.getElementById('results').style.display = 'block';

    // Generate breakdown
    generateBreakdown(principal, rate, time, compoundsPerYear);
}

function generateBreakdown(principal, rate, time, compoundsPerYear) {
    const tbody = document.querySelector('#breakdown-table tbody');
    tbody.innerHTML = ''; // Clear previous breakdown

    const totalPeriods = Math.floor(time * compoundsPerYear);
    const step = compoundsPerYear > 12 ? Math.floor(compoundsPerYear / 12) : 1; // Show monthly steps for daily

    for (let period = 0; period <= totalPeriods; period += step) {
        const balance = principal * Math.pow(1 + rate / compoundsPerYear, period);
        const interestSoFar = balance - principal;

        const row = document.createElement('tr');
        const periodCell = document.createElement('td');
        const balanceCell = document.createElement('td');
        const interestCell = document.createElement('td');

        periodCell.textContent = period === 0 ? 'Start' : `Period ${period}`;
        if (period === totalPeriods) periodCell.textContent = 'End';
        balanceCell.textContent = `$${balance.toFixed(2)}`;
        interestCell.textContent = `$${interestSoFar.toFixed(2)}`;

        row.appendChild(periodCell);
        row.appendChild(balanceCell);
        row.appendChild(interestCell);
        tbody.appendChild(row);
    }

    document.getElementById('breakdown').style.display = 'block';
}
