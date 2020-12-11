class MyNotes {
	/* Constructor */
	constructor() {
		this.deleteButtons = document.querySelectorAll(".delete-note");
		this.editButtons = document.querySelectorAll(".edit-note");
		this.events();
	}

	/* Functions/methods */
	deleteNote() {
		alert("Really delete?");
	}
	editNote() {
		alert("Really delete?");
	}

	/* Event listeners */
	events() {
		// this.deleteButtons.forEach((button) => {
		// 	this.button.addEventListener("click", this.deleteNote.bind(this));
		// });
		this.deleteButtons.forEach((button) =>
			button.addEventListener("click", this.deleteNote.bind(this))
		);
		this.editButtons.forEach((button) =>
			button.addEventListener("click", this.editNote.bind(this))
		);
	}
}

export default MyNotes;
