class MyNotes {
	/* Constructor */
	constructor() {
		this.deleteButtons = document.querySelectorAll(".delete-note");
		this.editButtons = document.querySelectorAll(".edit-note");
		this.titleFields = document.querySelectorAll(".note-title-field");
		this.bodyfields = documents.querySelectorAll(".note-body-field");
		this.events();
	}

	fadeOut(element) {
		element.classList.add("fade-out");
	}
	fadeIn(element) {
		element.classList.add("fade-in");
	}

	/* Functions/methods */
	async deleteNote(event) {
		const thisNote = event.target.parentNode;
		const noteId = thisNote.dataset.noteId;

		try {
			const deleteResponse = await fetch(
				`${universalData.root_url}/wp-json/wp/v2/note/${noteId}`,
				{
					method: "DELETE",
					headers: {
						"X-WP-Nonce": universalData.nonce,
					},
				}
			);
			this.fadeOut(thisNote);
			console.log("success!");
			return deleteResponse.json();
		} catch (err) {
			console.log(err);
		}
	}

	async editNote(event) {
		const thisNote = event.target.parentNode;
		const noteId = thisNote.dataset.noteId;

		try {
			const editResponse = await fetch(
				`${universalData.root_url}/wp-json/wp/v2/note/${noteId}`,
				{
					method: "POST",
					headers: {
						"X-WP-Nonce": universalData.nonce,
					},
				}
			);
			this.fadeIn(thisNote);
			console.log("edited!");
			return editResponse.json();
		} catch (err) {
			console.log(err);
		}
	}

	/* Event listeners */
	events() {
		// this.deleteButtons.forEach((button) => {
		// 	this.button.addEventListener("click", this.deleteNote.bind(this));
		// });

		this.deleteButtons.forEach((button) =>
			button.addEventListener("click", (event) => this.deleteNote(event))
		);
		this.editButtons.forEach((button) =>
			button.addEventListener("click", (event) => this.editNote(event))
		);
		// this.titleFields.forEach((button) =>
		// 	button.addEventListener("click", (event) => this.editNote(event))
		// );
		// this.bodyFields.forEach((button) =>
		// 	button.addEventListener("click", (event) => this.editNote(event))
		// );
	}
}

export default MyNotes;
