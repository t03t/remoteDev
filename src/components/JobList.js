import { 
    BASE_API_URL,
    state,
    jobListSearchEl,
    jobDetailsContentEl,
    getData
} from "../common.js";

import renderSpinner from "./Spinner.js";
import renderJobDetails from "./jobDetails.js";
import renderError from "./Error.js";

// RENDER JOB LIST
// render job items in search job list
const renderJobList = () => {
    // remove previous job items
    jobListSearchEl.innerHTML = '';

    state.searchJobItems.slice(0, 7).forEach(jobItem => {
        const newJobItemHTML = `
            <li class="job-item">
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
        jobListSearchEl.insertAdjacentHTML('beforeend', newJobItemHTML);
    });
}

// JOB LISTING COMPONENT
const clickHandler = async event => {
    // prevent default
    event.preventDefault();

    // get the job item that was clicked
    const jobItemEl = event.target.closest('.job-item');
    
    // remove the preexisting item--active class from job list element
    document.querySelector('.job-item--active')?.classList.remove('job-item--active');

    // add active class to jobItemEl
    jobItemEl.classList.add('job-item--active');

    // empty job details selection
    jobDetailsContentEl.innerHTML = '';

    // render spinner
    renderSpinner('job-details');

    // get the id
    const id = jobItemEl.children[0].getAttribute('href');

    try {
        // fetch job item data
        const data = await getData(`${BASE_API_URL}/jobs/${id}`);
        const { jobItem } = data;

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

export default renderJobList;