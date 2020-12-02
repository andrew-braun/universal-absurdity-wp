class Search {
	// 1. Initiate object
	constructor() {
		this.addSearchHTML();
		this.searchOpen = document.querySelector(".js-search-trigger");
		this.searchClose = document.querySelector(".search-overlay__close");
		this.searchOverlay = document.querySelector(".search-overlay");
		this.searchTerm = document.querySelector("#search-term");
		this.searchResults = document.querySelector("#search-overlay__results");
		this.events();
		this.typingTimer;
		this.isOverlayOpen = false;
		this.isSpinnerVisible = false;
		this.previousSearchValue;
	}

	// 2. Methods
	openOverlay() {
		this.searchOverlay.classList.add("search-overlay--active");
		document.querySelector("body").classList.add("body-no-scroll");
		this.searchTerm.value = "";
		setTimeout(() => this.searchTerm.focus(), 400);
		this.isOverlayOpen = true;
	}

	closeOverlay() {
		this.searchOverlay.classList.remove("search-overlay--active");
		document.querySelector("body").classList.remove("body-no-scroll");
		this.isOverlayOpen = false;
	}

	addSearchHTML() {
		const node = document.createElement("div");
		node.innerHTML = `
		<div class="search-overlay">

			<div class="search-overlay__top">
				<div class="container">
				<i class="fa fa-search search-overlay__icon aria-hidden="true"></i>
					<input type="text" class="search-term" placeholder="Everybody's looking for something" id="search-term"/>
					<i class="fa fa-window-close search-overlay__close aria-hidden="true"></i>
				</div>
			</div>
			<div class="container">
				<div id="search-overlay__results">
									
				</div>
			</div>
		</div>`;

		document.querySelector("body").appendChild(node);
	}

	keyPressHandler(event) {
		const activeElement = document.activeElement;
		const inputs = ["input", "select", "button", "textarea"];
		if (
			event.key === "s" &&
			this.isOverlayOpen === false &&
			!inputs.includes(activeElement.tagName.toLowerCase())
		) {
			this.openOverlay();
		}
		if (event.key === "Escape" && this.isOverlayOpen === true) {
			this.closeOverlay();
		}
	}

	searchHandler() {
		if (this.searchTerm.value !== this.previousSearchValue) {
			clearTimeout(this.typingTimer);

			if (this.searchTerm.value) {
				if (!this.isSpinnerVisible) {
					this.searchResults.innerHTML = "<div class='spinner-loader'></div>";
					this.isSpinnerVisible = true;
				}
				this.typingTimer = setTimeout(() => this.getSearchResults(), 400);
				this.previousSearchValue = this.searchTerm.value;
			}
		} else {
			this.searchResults.innerHTML = "";
			this.isSpinnerVisible = false;
		}
	}

	getSearchResults() {
		const generateSearchResults = (data) => {
			this.searchResults.innerHTML = `
				<div class="row">
					<div class="one-third">
						<h2 class="search-overlay__section-title">General Information</h2>
						${
							data.generalInfo.length
								? `<ul class="link-list min-list">${data.generalInfo
										.map(
											(entry) =>
												`<li><a href=${entry.permalink}>${entry.title}</a> ${
													entry.postType == "post" ? `by ${entry.author}` : ""
												}</li>`
										)
										.join("")}</ul>`
								: ""
						}

					</div>
					
					<div class="one-third">
						<h2 class="search-overlay__section-title">Programs</h2>
						${
							data.program.length
								? `<ul class="link-list min-list">${data.program
										.map(
											(entry) =>
												`<li><a href="${entry.permalink}">${entry.title}</a> </li>`
										)
										.join("")}</ul>`
								: `<a href="${universalData.root_url}/programs">View all programs</a>`
						}

						<h2 class="search-overlay__section-title">Professors</h2>
						${
							data.professor.length
								? `<ul class="professor-cards">${data.professor
										.map(
											(entry) =>
												`
												<li class="professor-card__list-item">
													<a class="professor-card" href="${entry.permalink}">
														<img class="professor-card__image" src="${entry.image}" />
														<span class="professor-card__name">${entry.title}</span>
													</a>
												</li>
							
												`
										)
										.join("")}</ul>`
								: ""
						}
					</div>
					<div class="one-third">
						<h2 class="search-overlay__section-title">Campuses</h2>
						${
							data.campus.length
								? `<ul class="link-list min-list">${data.campus
										.map(
											(entry) =>
												`<li><a href=${entry.permalink}>${entry.title}</a></li>`
										)
										.join("")}</ul>`
								: `<a href="${universalData.root_url}/campuses">View all campuses</a>`
						}

						<h2 class="search-overlay__section-title">Events</h2>
						${
							data.event.length
								? `<ul class="link-list min-list">${data.event
										.map(
											(entry) =>
												`
										<div class="event-summary">
										<a class="event-summary__date t-center" href="${entry.permalink}">
											<span class="event-summary__month">${entry.month}</span>
											<span class="event-summary__day">${entry.day}</span>
										</a>
										<div class="event-summary__content">
											<h5 class="event-summary__title headline headline--tiny"><a href="${entry.link}">${entry.title}</a></h5>
											<p> ${entry.description}
												<a href="${entry.permalink}" class="nu gray"> Learn more</a></p>
										</div>
										</div>
											`
										)
										.join("")}</ul>`
								: `<a href="${universalData.root_url}/events">View all events</a>`
						}
						</div>
				</div>
				`;
		};

		const generateError = () => {
			this.searchResults.innerHTML = `
			<div class="search-result">
				<p class="search-overlay__section-title">Uh-oh! You crashed the simulation. Your memory has been wiped, and you may try your search again.</p>
			</div>`;
		};

		async function getJSON(searchTerm) {
			try {
				const searchResponse = await fetch(
					`${universalData.root_url}/wp-json/content/v1/search?term=${searchTerm}`
				);

				const searchData = await searchResponse.json();

				generateSearchResults(searchData);
			} catch (err) {
				generateError();
				console.log(err);
			}
		}

		return getJSON(this.searchTerm.value);
	}

	// 3. Events
	events() {
		this.searchOpen.addEventListener("click", this.openOverlay.bind(this));
		this.searchClose.addEventListener("click", this.closeOverlay.bind(this));
		document.addEventListener("keyup", this.keyPressHandler.bind(this));
		this.searchTerm.addEventListener("keyup", this.searchHandler.bind(this));
	}
}

export default Search;
