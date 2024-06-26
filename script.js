$(document).ready(function() {
   
    $('#grossAnnualIncome, #extraIncome, #deductions').on('input', validateInput);
    $('#age').on('change', validateInput);
    $('#taxCalculatorForm').on('submit', calculateTax);

    $('.error-icon').addClass('d-none');

    function validateInput() {
      
      validateField('grossAnnualIncome', 'grossAnnualIncomeError');
      validateField('extraIncome', 'extraIncomeError');
      validateField('deductions', 'deductionsError');
      validateAge('age', 'ageError');
    }

    function validateField(fieldId, errorId) {
      const fieldValue = $('#' + fieldId).val();
      const errorIcon = $('#' + errorId);

      if (isNaN(fieldValue) || fieldValue < 0 || fieldValue === '') {
        errorIcon.removeClass('d-none'); 
      } else {
        errorIcon.addClass('d-none'); 
      }
    }

    function validateAge(fieldId, errorId) {
      const ageValue = $('#' + fieldId).val();
      const errorIcon = $('#' + errorId);

      if (ageValue === '') {
        errorIcon.removeClass('d-none'); 
      } else {
        errorIcon.addClass('d-none'); 
      }
    }

    function calculateTax(event) {
      event.preventDefault();

      
      const grossAnnualIncome = parseFloat($('#grossAnnualIncome').val());
      const extraIncome = parseFloat($('#extraIncome').val());
      const deductions = parseFloat($('#deductions').val());
      const age = $('#age').val();

      // Calculate the overall income and tax
      const overallIncome = grossAnnualIncome + extraIncome - deductions;
      let tax = 0;

      if (overallIncome <= 800000) {
        tax = 0;
      } else {
        const taxableIncome = overallIncome - 800000;
        switch (age) {
          case 'under40':
            tax = taxableIncome * 0.3;
            break;
          case 'between40and60':
            tax = taxableIncome * 0.4;
            break;
          case 'over60':
            tax = taxableIncome * 0.1;
            break;
        }
      }

     // result
      $('#taxResult').text(tax.toFixed(2) + ' Lakhs');
      $('#taxResultModal').modal('show');
    }
});

const darkModeToggle = document.getElementById('darkModeToggle');
const body = document.body;

darkModeToggle.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
});
