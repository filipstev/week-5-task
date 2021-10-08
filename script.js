const getById = (param) => document.getElementById(`${param}`);

const searchbar = document.querySelector('.searchbar-container');
const profilecontainer = document.querySelector('.profile-container');
const root = document.documentElement.style;
const github_api_url = 'https://api.github.com/users/';
const noresults = getById('no-results');
const btnTheme = getById('btn-theme');
const themetext = getById('theme-text');
const themeicon = getById('theme-icon');
const btnsubmit = getById('submit');
const input = getById('input');
const avatar = getById('avatar');
const userName = getById('name');
const user = getById('user');
const date = getById('date');
const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];
const bio = getById('bio');
const repos = getById('repos');
const followers = getById('followers');
const following = getById('following');
const user_location = getById('location');
const website = getById('website');
const twitter = getById('twitter');
const company = getById('company');
let darkMode = true;

btnsubmit.addEventListener('click', function () {
  if (input.value !== '') {
    getUserData(github_api_url + input.value);
  }
});
input.addEventListener(
  'keydown',
  (e) => {
    if (!e) {
      var e = window.event;
    }
    if (e.key == 'Enter') {
      if (input.value !== '') {
        getUserData(github_api_url + input.value);
      }
    }
  },
  false
);
input.addEventListener('input', () => {
  noresults.style.display = 'none';
  profilecontainer.classList.remove('active');
  searchbar.classList.add('active');
});
btnTheme.addEventListener('click', () => {
  if (darkMode == false) {
    darkModeProperties();
  } else {
    lightModeProperties();
  }
});

const getUserData = (gitUrl) => {
  fetch(gitUrl)
    .then((response) => response.json())
    .then((data) => {
      updateProfile(data);
    })
    .catch((error) => {
      console.log('Greska: ', error);
      throw error;
    });
};
const updateProfile = (data) => {
  if (data.message !== 'Not Found') {
    noresults.style.display = 'none';

    const checkIfExists = (param1, param2) => {
      if (param1 === '' || param1 === null) {
        param2.style.opacity = 0.5;
        param2.previousElementSibling.style.opacity = 0.5;
        return 'Not available';
      } else {
        return `${param1}`;
      }
    };
    avatar.src = `${data.avatar_url}`;
    userName.innerText = `${data.name}`;
    user.innerText = `@${data.login}`;
    datesegments = data.created_at.split('T').shift().split('-');
    date.innerText = `Joined ${datesegments[2]} ${
      months[datesegments[1] - 1]
    } ${datesegments[0]}`;
    bio.innerText =
      data.bio == null ? 'This profile has no bio' : `${data.bio}`;
    repos.innerText = `${data.public_repos}`;
    followers.innerText = `${data.followers}`;
    following.innerText = `${data.following}`;
    user_location.innerText = checkIfExists(data.location, user_location);
    website.innerText = checkIfExists(data.blog, website);
    website.href = checkIfExists(data.blog, website);
    twitter.innerText = checkIfExists(data.twitter_username, twitter);
    company.innerText = checkIfExists(data.company, company);
    searchbar.classList.toggle('active');
    profilecontainer.classList.toggle('active');
  } else {
    noresults.style.display = 'block';
  }
};
// Bonus u readme
if (
  window.matchMedia &&
  window.matchMedia('(prefers-color-scheme: dark)').matches
) {
  darkModeProperties();
}

//iPhone 5/SE da izgleda bolje
if (window.outerWidth <= 320) {
  input.placeholder = 'Search...';
  noresults.style.marginTop = '5rem';
  noresults.style.marginLeft = '2.5rem';
}

const darkModeProperties = () => {
  root.setProperty('--dm-bg', '#141D2F');
  root.setProperty('--dm-bg-content', '#1E2A47');
  root.setProperty('--dm-text', 'white');
  root.setProperty('--dm-text-alt', 'white');
  root.setProperty('--dm-shadow-xl', 'rgba(70,88,109,0.15)');
  themetext.innerText = 'LIGHT';
  themeicon.src = './assets/icon-sun.svg';
  root.setProperty('--dm-icon-bg', 'brightness(1000%)');
  root.setProperty(
    '--hover-filter',
    'invert(62%) sepia(98%) saturate(148%) hue-rotate(185deg) brightness(87%) contrast(89%)'
  );
  darkMode = true;
  root.setProperty('--box-shadow', 'none');
};
const lightModeProperties = () => {
  root.setProperty(
    '--box-shadow',
    '0px 16px 30px -10px rgba(70, 96, 187, 0.198567)'
  );
  root.setProperty('--dm-bg', '#F6F8FF');
  root.setProperty('--dm-bg-content', '#FEFEFE');
  root.setProperty('--dm-text', '#697C9A');
  root.setProperty('--dm-text-alt', '#2B3442');
  root.setProperty('--dm-shadow-xl', 'rgba(70, 88, 109, 0.25)');
  themetext.innerText = 'DARK';
  themeicon.src = './assets/icon-moon.svg';
  root.setProperty('--dm-icon-bg', 'brightness(100%)');
  root.setProperty('--hover-filter', 'brightness(0%)');
  darkMode = false;
};

profilecontainer.classList.toggle('active');
searchbar.classList.toggle('active');
getUserData(github_api_url + 'octocat');
