class MyNotes {
	/* Constructor */
	constructor() {
		this.noteList = document.querySelector(".note-list");
		this.deleteButtons = document.querySelectorAll(".delete-note");
		this.editButtons = document.querySelectorAll(".edit-note");
		this.titleFields = document.querySelectorAll(".note-title-field");
		this.bodyfields = document.querySelectorAll(".note-body-field");
		this.submitButton = document.querySelector(".submit-note");

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
			return deleteResponse.json();
		} catch (err) {
			console.log(err);
		}
	}

	editNote(event) {
		const thisNote = event.target.parentNode;
		const title = thisNote.querySelector(".note-title-field");
		const body = thisNote.querySelector(".note-body-field");
		const saveButton = thisNote.querySelector(".update-note");
		const editButton = thisNote.querySelector(".edit-note");

		if (thisNote.dataset.state === "editable") {
			this.makeNoteReadOnly(event, title, body, saveButton, editButton);
			thisNote.removeAttribute("data-state");
		} else {
			this.makeNoteEditable(event, title, body, saveButton, editButton);
			thisNote.setAttribute("data-state", "editable");
		}

		saveButton.addEventListener("click", () =>
			this.updateNote(event, thisNote, title, body, saveButton, editButton)
		);
	}

	makeNoteEditable(event, title, body, saveButton, editButton) {
		title.removeAttribute("readonly");
		title.classList.add("note-active-field");

		body.removeAttribute("readonly");
		body.classList.add("note-active-field");

		saveButton.classList.add("update-note--visible");
		editButton.innerHTML = `<i class="fa fa-times" aria-hidden="true"></i> Cancel`;
	}

	makeNoteReadOnly(event, title, body, saveButton, editButton) {
		title.setAttribute("readonly", "readonly");
		title.classList.remove("note-active-field");

		body.setAttribute("readonly", "readonly");
		body.classList.remove("note-active-field");

		saveButton.classList.remove("update-note--visible");
		editButton.innerHTML = `<i class="fa fa-pencil" aria-hidden="true"></i> Edit`;
	}

	async updateNote(event, thisNote, title, body, saveButton, editButton) {
		const noteId = thisNote.dataset.noteId;

		const updatedPost = {
			title: title.value,
			content: body.value,
		};
		try {
			const editResponse = await fetch(
				`${universalData.root_url}/wp-json/wp/v2/note/${noteId}`,
				{
					method: "POST",
					headers: {
						"X-WP-Nonce": universalData.nonce,
						"Content-Type": "application/json;charset=utf-8",
					},
					credentials: "same-origin",
					body: JSON.stringify(updatedPost),
				}
			);
			this.makeNoteReadOnly(event, title, body, saveButton, editButton);
			return editResponse;
		} catch (err) {
			console.log(err);
		}
	}

	async createNote(event) {
		const title = document.querySelector(".new-note-title");
		const content = document.querySelector(".new-note-body");

		const newNote = {
			title: title.value,
			content: content.value,
			status: "private",
		};

		try {
			const createResponse = await fetch(
				`${universalData.root_url}/wp-json/wp/v2/note/`,
				{
					method: "POST",
					headers: {
						"X-WP-Nonce": universalData.nonce,
						"Content-Type": "application/json;charset=utf-8",
					},
					credentials: "same-origin",
					body: JSON.stringify(newNote),
				}
			);

			const results = await createResponse.json();

			this.noteList.insertAdjacentHTML(
				"afterbegin",
				`
				<li data-note-id=${results.id}>
					<input class="note-title-field" readonly value="${results.title.raw}" />
					<span class="edit-note" ><i class="fa fa-pencil" aria-hidden="true"></i> Edit</span>
					<span class="delete-note" ><i class="fa fa-trash" aria-hidden="true"></i> Delete</span>
					<textarea class="note-body-field" readonly > ${results.content.raw} </textarea>
					<span class="update-note btn btn--blue btn--small" ><i class="fa fa-arrow-right" aria-hidden="true"></i> Save</span>
				</li>
				`
			);

			title.value = "";
			content.value = "";
			return createResponse;
		} catch (err) {
			console.log(err);
		}
	}

	/* Event listeners */
	events() {
		this.noteList.addEventListener("click", (event) => {
			if (event.target && event.target.matches(".delete-note")) {
				this.deleteNote(event);
			} else if (event.target && event.target.matches(".edit-note")) {
				this.editNote(event);
			}
		});

		this.submitButton.addEventListener("click", (event) =>
			this.createNote(event)
		);
	}
}

export default MyNotes;
