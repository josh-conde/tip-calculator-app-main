document.addEventListener('DOMContentLoaded', function () {
    const tipButtons = document.querySelectorAll('.percent-container button');
    const customPercent = document.getElementById('custom');
    const tipAmount = document.getElementById('tip-amount');
    const total = document.getElementById('total');
    const totalBill = document.querySelector('.bill-container input');
    const numberOfPeople = document.querySelector('.people-container input');
    const resetButton = document.getElementById('reset');
  
    function calculateTip(percent) {
      const bill = parseFloat(totalBill.value);
      const people = parseInt(numberOfPeople.value);
  
      if (isNaN(bill) || isNaN(people) || people <= 0) {
        tipAmount.textContent = '$0.00';
        total.textContent = '$0.00';
        return;
      }
  
      const tip = (bill * percent) / 100;
      const tipPerPerson = tip / people;
      const totalPerPerson = (bill + tip) / people;
  
      tipAmount.textContent = `$${tipPerPerson.toFixed(2)}`;
      total.textContent = `$${totalPerPerson.toFixed(2)}`;
    }
  
    function resetCalculator() {
      totalBill.value = '';
      numberOfPeople.value = '';
      customPercent.value = '';
      tipAmount.textContent = '$0.00';
      total.textContent = '$0.00';
      tipButtons.forEach(button => button.classList.remove('selected'));
    }
  
    function handleTipButtonClick(event, percent) {
      tipButtons.forEach(button => button.classList.remove('selected'));
      event.target.classList.add('selected');
      calculateTip(percent);
    }
  
    tipButtons.forEach(button => {
      const percent = parseFloat(button.textContent);
      button.addEventListener('click', (event) => handleTipButtonClick(event, percent));
    });
  
    customPercent.addEventListener('input', () => {
      const customTip = parseFloat(customPercent.value);
      if (!isNaN(customTip)) {
        tipButtons.forEach(button => button.classList.remove('selected'));
        calculateTip(customTip);
      }
    });
  
    totalBill.addEventListener('input', () => calculateTip(parseFloat(customPercent.value) || 0));
    numberOfPeople.addEventListener('input', () => calculateTip(parseFloat(customPercent.value) || 0));
  
    resetButton.addEventListener('click', resetCalculator);
  });