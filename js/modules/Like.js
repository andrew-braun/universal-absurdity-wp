class Like {
	constructor() {
		this.likeBox = document.querySelector(".like-box");
		this.events();
	}

	methods() {
		this.clickDispatcher = (event) => {
			let likeBox = event.target.closest(".like-box");

			if (likeBox.dataset.exists === "yes") {
				this.deleteLike();
			} else {
				this.createLike();
			}
		};

		this.createLike = (event) => {
			alert("Create");
		};

		this.deleteLike = (event) => {
			alert("Delete");
		};
	}

	events() {
		this.methods();

		this.likeBox.addEventListener("click", this.clickDispatcher.bind(this));
	}
}

export default Like;
