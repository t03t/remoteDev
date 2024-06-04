import {
    state,
    paginationEl,
    paginationBtnNextEl,
    paginationNumberBackEl,
    paginationNumberNextEl,
    paginationBtnBackEl,
    RESULTS_PER_PAGE
} from '../common.js'

import renderJobList from './JobList.js'

const renderPaginationButtons = () => {
    if (state.currentPage > 1) {
        paginationBtnBackEl.classList.remove('pagination__button--hidden');
    } else {
        paginationBtnBackEl.classList.add('pagination__button--hidden');
    }

    // display next button if there are more job items
    if ((state.searchJobItems.length - state.currentPage * RESULTS_PER_PAGE) <= 0) {
        paginationBtnNextEl.classList.add('pagination__button--hidden');
    } else {
        paginationBtnBackEl.classList.remove('pagination__button--hidden');
    }

    // update page numbers
    paginationNumberNextEl.textContent = state.currentPage + 1;
    paginationNumberBackEl.textContent = state.currentPage - 1;

    // blur buttons
    paginationBtnBackEl.blur();
    paginationBtnNextEl.blur();
};

const clickHandler = event => {
    // get clicked button
    const clickedButtonEl = event.target.closest('.pagination__button');

    if (!clickedButtonEl) return;

    const nextPage = clickedButtonEl.className.includes('--next') ? true : false;

    // update state
    nextPage ? state.currentPage++ : state.currentPage--;

    // render pagination buttons
    renderPaginationButtons();

    // render job items for that page
    renderJobList();
};

paginationEl.addEventListener('click', clickHandler);

export default renderPaginationButtons;