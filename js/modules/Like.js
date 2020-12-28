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
							"X-WP-Nonce": universalData.nonce,
						},
						body: JSON.stringify(data),
					}
				);

				const responseData = await response.json();
				console.log(responseData);

				this.likeBox.dataset.exists = "yes";
				const likeBoxCount = this.likeBox.querySelector(".like-count");
				let likeCount = parseInt(likeBoxCount.innerText, 10);
				likeCount++;
				likeBoxCount.innerText = likeCount;

				this.likeBox.dataset.like = await responseData;
			} catch (error) {
				console.error(error);
			}
		};

		this.deleteLike = async (event, likeBox) => {
			const data = { like: this.likeBox.dataset.like };
			try {
				const response = await fetch(
					`${universalData.root_url}/wp-json/universal/v1/manageLike`,
					{
						method: "DELETE",
						headers: {
							"Content-Type": "application/json",
							"X-WP-Nonce": universalData.nonce,
						},
						body: JSON.stringify(data),
					}
				);
				this.likeBox.dataset.exists = "no";
				const likeBoxCount = this.likeBox.querySelector(".like-count");
				let likeCount = parseInt(likeBoxCount.innerText, 10);
				likeCount--;
				likeBoxCount.innerText = likeCount;

				this.likeBox.dataset.like = "";
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
