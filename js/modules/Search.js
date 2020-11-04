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
		if (
			event.key === "s" &&
			this.isOverlayOpen === false &&
			!$("input, textarea").is(":focus")
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
				this.typingTimer = setTimeout(this.getSearchResults.bind(this), 750);
				this.previousSearchValue = this.searchTerm.value;
			}
		} else {
			this.searchResults.innerHTML = "";
			this.isSpinnerVisible = false;
		}
	}

	getSearchResults() {
		this.searchResults.innerHTML = "Search results here";
		this.isSpinnerVisible = false;
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
