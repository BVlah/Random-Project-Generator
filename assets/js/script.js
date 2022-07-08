var project = {};

document.addEventListener('DOMContentLoaded', () => {
  // Functions to open and close a modal
  function openModal($el) {
    $el.classList.add('is-active');
  }
  
  function closeModal($el) {
    $el.classList.remove('is-active');
  }
  
  // Add a click event to open modal
  (document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
    var modal = $trigger.dataset.target;
    var $target = document.getElementById(modal);
  
    $trigger.addEventListener('click', () => {
      openModal($target);
      console.log($target);
    });
  });
  
  // Add a click events to close modal
  (document.querySelectorAll('.modal-background, .modal-close, .button') || []).forEach(($close) => {
    var $target = $close.closest('.modal');

    $close.addEventListener('click', () => {
      closeModal($target);
    });
  });
});