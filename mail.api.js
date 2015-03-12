// Various mail APIs in digestible js
var dg = function(id){ return dg(id); }

function getEncodedFormData () {
	var to = dg('composer_to').value,
		subject = dg('composer_subject').value,
		body = dg('composer_body').value,
		data = {};
	data.to = encodeURI(to), // TO massage form data mmmmmmmmmmmmmmmmmm
	data.subject = escape(subject),
	data.body = escape(body);
	return data;
}

function createGenericLink(options) {
	var data = getEncodedFormData(),
		link = dg(options.link),
		url = options.url,
		to = options.to + data.to,
		subject = options.subject + data.subject,
		body = options.body + data.body
		link.setAttribute("href", url + to + subject + body);
}

createGenericLink({link:'ls_google_mail',url:'http://mail.google.com/mail?view=cm&fs=1&tf=1',to:'&to=',subject:'&su=',body:'&body='}); 							// Google
createGenericLink({link:'ls_yahoo_mail',url:'http://compose.mail.yahoo.com/?',to:'to=',subject:'&subject=',body:'&body='}); 												// Yahoo
createGenericLink({link:'ls_hotmail_mail',url:'http://mail.live.com/mail/EditMessageLight.aspx?n=',to:'&to=',subject:'&subject=',body:'&body='}); 	// Hotmail
createGenericLink({link:'ls_aol_mail',url:'http://webmail.aol.com/Mail/ComposeMessage.aspx?',to:'&to=',subject:'&subject=',body:'&body='});					// AOL
createGenericLink({link:'ls_default_client',url:'mailto:',to:'',subject:'?subject=',body:'&body='});																								// Native Client