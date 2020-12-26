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

		this.createLike = async (event, likeBox) => {
			const data = { professorId: this.likeBox.dataset.professor };

			try {
				const response = await fetch(
					`${universalData.root_url}/wp-json/universal/v1/manageLike`,
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify(data),
					}
				);
				await console.log(response);
			} catch (error) {
				console.error(error);
			}
		};

		this.deleteLike = async (event, likeBox) => {
			try {
				const response = await fetch(
					`${universalData.root_url}/wp-json/universal/v1/manageLike`,
					{
						method: "DELETE",
					}
				);
				await console.log(response);
			} catch (error) {
				console.error(error);
			}
		};
	}

	events() {
		this.methods();

		this.likeBox.addEventListener("click", this.clickDispatcher.bind(this));
	}
}

export default Like;
