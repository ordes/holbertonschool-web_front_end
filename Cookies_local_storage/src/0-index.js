document.getElementById("login").addEventListener("click", setCookies);
document.getElementById("showCookies").addEventListener("click", showCookies);

function setCookies() {
	const firstname = document.getElementById("name").value;
	const email = document.getElementById("email").value;

	const date = new Date();
	date.setDate(date.getDate() + 10);
	const expire = date.toUTCString();

	document.cookie = `firstname=${encodeURIComponent(firstname)}; expires=${expire}; path=/`;
	document.cookie = `email=${encodeURIComponent(email)}; expires=${expire}; path=/`;

	showWelcomeMessageOrForm();
}

function showCookies() {
	const paragraph = document.createElement("p");
	if (document.cookie) {
		const cookies = document.cookie.split("; ").map(cookie => {
			const [name, value] = cookie.split("=");
			return `${name}=${decodeURIComponent(value)}`;
		}).join("; ");
		paragraph.innerHTML = "Cookies: " + cookies;
	} else {
		paragraph.innerHTML = "No cookies set";
	}
	document.body.appendChild(paragraph);
}

function showForm() {
	const welcomeMessage = document.getElementById("welcomeMessage");
	if (welcomeMessage) {
		welcomeMessage.innerHTML = "";
	}
	const formContainer = document.getElementById("loginFormContainer");
	formContainer.style.display = "block";
}

function hideForm() {
	const formContainer = document.getElementById("loginFormContainer");
	formContainer.style.display = "none";
}

function deleteCookiesAndShowForm() {
	document.cookie = "firstname=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
	document.cookie = "email=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
	showForm();
}

function showWelcomeMessageOrForm() {
	const cookies = document.cookie.split("; ").reduce((acc, cookie) => {
		if (cookie) {
			const [name, value] = cookie.split("=");
			acc[name] = decodeURIComponent(value);
		}
		return acc;
	}, {});

	const firstname = cookies.firstname;

	if (!firstname) {
		showForm();
	} else {
		hideForm();

		const welcomeDiv = document.getElementById("welcomeMessage");
		welcomeDiv.innerHTML = `<h1>Welcome ${firstname} 
            <span id="logoutLink">(logout)</span>
        </h1>`;
		document.getElementById("logoutLink").addEventListener("click", function () {
			deleteCookiesAndShowForm();
		});
	}
}
showWelcomeMessageOrForm();
