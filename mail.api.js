// Various mail APIs in digestible js
function getEncodedFormData () {
	var to = document.getElementById('composer_to').value,
		subject = document.getElementById('composer_subject').value,
		body = document.getElementById('composer_body').value,
		data = {};
	data.to = encodeURI(to), // TO massage form data mmmmmmmmmmmmmmmmmm
	data.subject = escape(subject),
	data.body = escape(body);
	return data;
}

function createGoogleLink () {
	var data = getEncodedFormData(),
		link = document.getElementById('ls_google_mail'),
		url = "http://mail.google.com/mail?view=cm&fs=1&tf=1",
		to = "&to=" + data.to,
		subject = "&su=" + data.subject,
		body = "&body=" + data.body;
	link.setAttribute("href", url + to + subject + body);
}

function createYahooLink () {
	var data = getEncodedFormData(),
		link = document.getElementById('ls_yahoo_mail'),
		url = "http://compose.mail.yahoo.com/?",
		to = "to=" + data.to,
		subject = "&subject=" + data.subject,
		body = "&body=" + data.body;
	link.setAttribute("href", url + to + subject + body);
}

function createHotmailLink () {
	var data = getEncodedFormData(),
		link = document.getElementById('ls_hotmail_mail'),
		url = "http://mail.live.com/mail/EditMessageLight.aspx?n=",
		to = "&to=" + data.to,
		subject = "&subject=" + data.subject,
		body = "&body=" + data.body;
	link.setAttribute("href", url + to + subject + body);
}

function createAOLLink () {
	var data = getEncodedFormData(),
		link = document.getElementById('ls_aol_mail'),
		url = "http://webmail.aol.com/Mail/ComposeMessage.aspx?",
		to = "to=" + data.to,
		subject = "&subject=" + data.subject,
		body = "&body=" + data.body;
	link.setAttribute("href", url + to + subject + body);
}

function createClientLink () {
	var data = getEncodedFormData(),
		link = document.getElementById('ls_default_client'),
		url = "mailto:",
		to = data.to + "?",
		subject = "subject=" + data.subject,
		body = "&body=" + data.body;
	link.setAttribute("href", url + to + subject + body);
}