// Various mail APIs in digestible js
var dg = function(id){ return document.getElementById(id); }

function getEncodedFormData () {
	var to = dg('composer_to').value,
		subject = dg('composer_subject').value,
		body = dg('composer_body').value,
		data = {};
	data.to = encodeURI(to), // TO massage form data mmmmmmmmmmmmmmmmmm
	data.subject = escape(subject), // MORE MASSAGE PLEASE
	data.body = escape(body); // The rational for using escape rather than encodeURI is that some email query strings will ignore encoded <> characters
	return data;
	/* The rationale for using escape rather than encodeURI is that some email query strings will ignore encoded <> characters
	* Since you have to send this message through a webmail client or a native client anyways, it can't be abused by robots
	* any more than a webmail client can be abused by robots
	*/
}

function createGenericLink(o) {
	var d = getEncodedFormData(),
		l = dg(o.l), // Link
		u = o.u, // URL
		t = o.t + d.to, // To
		s = o.s + d.subject, // Subject
		b = o.b + d.body // Body
		l.setAttribute("href", u + t + s + b); // href =  url to subject body
}