import { 
    BASE_API_URL,
    state,
    jobListSearchEl,
    jobDetailsContentEl,
    getData,
    RESULTS_PER_PAGE,
    jobListBookmarksEl
} from "../common.js";

import renderSpinner from "./Spinner.js";
import renderJobDetails from "./jobDetails.js";
import renderError from "./Error.js";

// RENDER JOB LIST
// render job items in search job list
const renderJobList = (whichJobList = 'search') => {
    // determine the correct selector for job list
    const joblistEl = whichJobList === 'search' ? jobListSearchEl : jobListBookmarksEl;

    // remove previous job items
    joblistEl.innerHTML = '';

    //determine the job items that must be rendered
    let jobItems;
    if (whichJobList === 'search') {
        jobItems = state.searchJobItems.slice(state.currentPage * RESULTS_PER_PAGE  - RESULTS_PER_PAGE, state.currentPage * RESULTS_PER_PAGE);
    } else if (whichJobList === 'bookmarks') {
        jobItems = state.bookmarkJobItems;
    }

    jobItems.forEach(jobItem => {
        const newJobItemHTML = `
            <li class="job-item ${state.activeJobItem === jobItem.id ? 'job-item--active' : ''}">
                <a class="job-item__link" href="${jobItem.id}">
                    <div class="job-item__badge">${jobItem.badgeLetters}</div>
                    <div class="job-item__middle">
                        <h3 class="third-heading">${jobItem.title}</h3>
                        <p class="job-item__company">${jobItem.company}</p>
                        <div class="job-item__extras">
                            <p class="job-item__extra"><i class="fa-solid fa-clock job-item__extra-icon"></i> ${jobItem.duration}</p>
                            <p class="job-item__extra"><i class="fa-solid fa-money-bill job-item__extra-icon"></i> ${jobItem.salary}</p>
                            <p class="job-item__extra"><i class="fa-solid fa-location-dot job-item__extra-icon"></i> ${jobItem.location}</p>
                        </div>
                    </div>
                    <div class="job-item__right">
                        <i class="fa-solid fa-bookmark job-item__bookmark-icon"></i>
                        <time class="job-item__time">${jobItem.daysAgo}d</time>
                    </div>
                </a>
            </li>
        `;
        joblistEl.insertAdjacentHTML('beforeend', newJobItemHTML);
    });
}

// JOB LISTING COMPONENT
const clickHandler = async event => {
    // prevent default
    event.preventDefault();

    // get the job item that was clicked
    const jobItemEl = event.target.closest('.job-item');
    
    // remove the preexisting item--active class from job list element
    document.querySelectorAll('.job-item--active').forEach(jobItemWithActiveClass => jobItemWithActiveClass.classList.remove('job-item--active'));

    // add active class to jobItemEl
    jobItemEl.classList.add('job-item--active');

    // empty job details selection
    jobDetailsContentEl.innerHTML = '';

    // render spinner
    renderSpinner('job-details');

    // get the id
    const id = jobItemEl.children[0].getAttribute('href');

    // update state
    state.activeJobItem = state.searchJobItems.find(jobItem => jobItem.id === +id);

    // add id to URL
    history.pushState(null, '', `/#${id}`);

    try {
        // fetch job item data
        const data = await getData(`${BASE_API_URL}/jobs/${id}`);
        const { jobItem } = data;

        // update state
        state.activeJobItem = jobItem;

        // remove spinner visible
        renderSpinner('job-details');

        // render job details
        renderJobDetails(jobItem);
    } catch(error) {
        renderSpinner('job-details');
        renderError(error.message);
    }

};

jobListSearchEl.addEventListener('click', clickHandler);
jobListBookmarksEl.addEventListener('click', clickHandler);

export default renderJobList;