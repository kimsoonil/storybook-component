function openModal(modalname) {
  document.get;
  $('#modal').fadeIn(300);
  $(`.${modalname}`).fadeIn(300);
}

$('#modal, .close, .btn_close').on('click', () => {
  $('#modal').fadeOut(300);
  $('.modal_popup').fadeOut(300);
});

// Select
const selectBoxElements = document.querySelectorAll('.select');
function toggleSelectBox(selectBox) {
  selectBox.classList.toggle('active');
}
function selectOption(optionElement) {
  const selectBox = optionElement.closest('.select');
  const selectedElement = selectBox.querySelector('.selected-value');
  selectedElement.textContent = optionElement.textContent;
}
selectBoxElements.forEach((selectBoxElement) => {
  selectBoxElement.addEventListener('click', (e) => {
    const targetElement = e.target;
    const isOptionElement = targetElement.classList.contains('option');
    if (isOptionElement) {
      selectOption(targetElement);
    }
    toggleSelectBox(selectBoxElement);
  });
});

document.addEventListener('click', (e) => {
  const targetElement = e.target;
  const isSelect = targetElement.classList.contains('select') || targetElement.closest('.select');
  if (isSelect) {
    return;
  }
  const allSelectBoxElements = document.querySelectorAll('.select');
  allSelectBoxElements.forEach((boxElement) => {
    boxElement.classList.remove('active');
  });
});

const pass = document.querySelector('#password');
const btn = document.querySelector('#pass_view');
btn.addEventListener('click', () => {
  if (pass.type === 'text') {
    pass.type = 'password';
    btn.className = 'btn_input eyes';
  } else {
    pass.type = 'text';
    btn.className = 'btn_input eyes_show';
  }
});
