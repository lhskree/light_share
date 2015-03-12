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

function createGenericLink(o) {
	var d = getEncodedFormData(),
		l = dg(o.l),
		u = o.u,
		t = o.t + d.to,
		s = o.s + d.subject,
		b = o.b + d.body
		l.setAttribute("href", u + t + s + b);
}