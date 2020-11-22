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
			if (data.length) {
				this.searchResults.innerHTML = data
					.map(
						(result) =>
							`
				<div class="search-result">
				<h2 class="search-overlay__section-title"></h2>
				<ul class="link-list min-list">							
					<li>
						<a href="/${result.link}">${result.title}</a> ${
								result.type == "post" ? `by ${result.authorName}` : ""
							}
					</li>
							
				</ul>
				</div>
				`
					)
					.join("");
			} else {
				this.searchResults.innerHTML = `
				<div class="search-result">
				<h2 class="search-overlay__section-title">No results found</h2>
				</div>`;
			}
		};

		const generateError = () => {
			this.searchResults.innerHTML = `
			<div class="search-result">
				<p class="search-overlay__section-title">Uh-oh! You crashed the simulation. Your memory has been wiped, and you may try your search again.</p>
			</div>`;
		};

		async function getJSON(searchTerm) {
			try {
				const postResponse = await fetch(
					`${universalData.root_url}/wp-json/content/v1/search?term=${searchTerm}`
				);

				const postData = await postResponse.json();

				const pageResponse = await fetch(
					`${universalData.root_url}/wp-json/content/v1/search?term=${searchTerm}`
				);
				const pageData = await pageResponse.json();

				const resultsData = postData.concat(pageData);

				generateSearchResults(resultsData);
				console.log(resultsData);
			} catch (err) {
				generateError();
			}

			// return resultsData;
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

// while ($mainQuery->have_posts()) {
// 	$mainQuery->the_post(); //gets all the relevant data for the post ready to use

// 	$column = '';

// 	if (get_post_type() === 'post' || get_post_type() === 'page') {
// 		$column = 'generalInfo';
// 	} elseif (get_post_type() === 'professor') {
// 		$column = 'professors';
// 	} elseif (get_post_type() === 'campus') {
// 		$column = 'campuses';
// 	} elseif (get_post_type() === 'event') {
// 		$column = 'events';
// 	} elseif (get_post_type() === 'program') {
// 		$column = 'programs';
// 	}

// 	//push the data in the #2 parameter onto the $mainQueryResults array
// 	array_push($mainQueryResults[$column], [ //associative array to retrieve the data
// 		'title' => get_the_title(),
// 		'permalink' => get_the_permalink()
// 	]);
// }
