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

	searchHandler(event) {
		if (this.searchTerm.value !== this.previousSearchValue) {
			clearTimeout(this.typingTimer);

			if (this.searchTerm.value) {
				if (!this.isSpinnerVisible) {
					this.searchResults.innerHTML = "<div class='spinner-loader'></div>";
					this.isSpinnerVisible = true;
				}
				this.typingTimer = setTimeout(() => this.getSearchResults(), 350);
				this.previousSearchValue = this.searchTerm.value;
			}
		} else {
			this.searchResults.innerHTML = "";
			this.isSpinnerVisible = false;
		}
	}

	getSearchResults() {
		const generateSearchResults = (data) => {
			console.log(data.length);
			if (data.length) {
				this.searchResults.innerHTML = data
					.map(
						(result) =>
							`
				<div class="search-result">
				<h2 class="search-overlay__section-title"></h2>
				<ul class="link-list min-list">							
					<li>
						<a href="/${result.slug}">${result.title.rendered}</a>
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

		async function getJSON(searchTerm) {
			const response = await fetch(
				`${universalData.root_url}/wp-json/wp/v2/posts?search=${searchTerm}`
			);
			const data = await response.json();
			generateSearchResults(data);
			return data;
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
