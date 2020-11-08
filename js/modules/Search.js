class Search {
	// 1. Initiate object
	constructor() {
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
				this.typingTimer = setTimeout(() => this.getSearchResults(), 750);
				this.previousSearchValue = this.searchTerm.value;
			}
		} else {
			this.searchResults.innerHTML = "";
			this.isSpinnerVisible = false;
		}
	}

	getSearchResults() {
		const generateSearchResults = (data) => {
			this.searchResults.innerHTML = data
				.map(
					(result) =>
						`
				<div class="search-result">
				<h2 class="search-overlay__section-title">
					<ul class="link-list min-list">
						<li><a href="/${result.slug}">${result.title.rendered}</a></li>
					</ul>
				</div>
				`
				)
				.join("");
		};

		async function getJSON(searchTerm) {
			const response = await fetch(
				`http://universal-absurdity.local/wp-json/wp/v2/posts?search=${searchTerm}`
			);
			const data = await response.json();
			generateSearchResults(data);
			console.log(data);
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
