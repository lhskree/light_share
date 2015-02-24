window.onload = function () {

	// Sneaky min optimization
	var t = "target",
		h = "href",
		o = "onclick";


	var url = document.querySelector("link[rel='canonical']") ? document.querySelector("link[rel='canonical']").getAttribute(h) : // Looks for canonical URL first
						document.querySelector("meta[property='og:url']") ? document.querySelector("meta[property='og:url']").getAttribute("content") : // OG fallback
						document.URL; // Finally, just document.URL
	url = encodeURIComponent(url);

	// Opens links in a new window
	var newWindow = "window.open(this.href, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=500,width=500');return false;";

	// The sharing buttons
	var ls_mail = document.getElementById('ls_mail'),
		ls_fb = document.getElementById('ls_fb'),
		ls_gplus = document.getElementById('ls_gplus'),
		ls_tw = document.getElementById('ls_tw'),
		ls_lin = document.getElementById('ls_lin');

	// Email
	ls_mail.onclick = function () { var lsmi = document.getElementById('lightShareMailInterface'); lsmi.style.display = "block"; console.log("clicked");}
	ls_mail.setAttribute(h, "#");
	ls_mail.setAttribute(t, "");
	// TODO - integrate into various email clients

	// Facebook with App_ID
	var fb_api = "https://www.facebook.com/dialog/share?",
		id = "&app_id=787311388023796", // This is a unique id like Google Analytics API key
		display = "&display=popup",
		href = "&href=" + url,
		redirect = "&redirect_uri=" + url;
	ls_fb.setAttribute(h, fb_api + id + display + href + redirect);
	ls_fb.setAttribute(t, "");
	ls_fb.setAttribute(o, newWindow);

	// Gplus
	var gplus_api = "https://plus.google.com/share?",
		gplus_url = "url=" + url;
	ls_gplus.setAttribute(h, gplus_api + gplus_url);
	ls_gplus.setAttribute(t, "");
	ls_gplus.setAttribute(o, newWindow);

	// Twitter is already covered by the link
	ls_tw.setAttribute(t, "");
	ls_tw.setAttribute(o, newWindow);

	// LinkedIn
	// If no OG data is available, set these properties
	var lin_api = "https://www.linkedin.com/shareArticle?",
		lin_url = "&url=" + url;
	if (!document.querySelector("meta[property='og:title']")) {
		var title = "&title=" + encodeURI("Light Share lightweight sharing"),
			summary = "&summary=" + encodeURI("A minimally intrusive social sharing button group."),
			source = "&source=" + url;
		ls_lin.setAttribute(h, lin_api + lin_url + title + summary + source);
	} else {
		ls_lin.setAttribute(h, lin_api + lin_url);
	}
	ls_lin.setAttribute(t, "");
	ls_lin.setAttribute(o, newWindow);

	// Show / hide the light share section
	var threshold = 50;
	var lightShare = document.getElementsByClassName("lightShare")[0];
	lightShare.style.right = "-300px";
	window.onscroll = function () {
		lightShare.style.transition = "1s";
		// IE 9-
		if (window.pageYOffset == undefined) {
			window.pageYOffset = document.documentElement.scrollTop;
		}

		if (window.pageYOffset > threshold) {
			lightShare.style.right = 0;
		} else {
			lightShare.style.right = "-300px";
		}
	};

	// Google analytics binding
 	function addListener(element, type, callback) {
			if (element.addEventListener) element.addEventListener(type, callback);
			else if (element.attachEvent) element.attachEvent('on' + type, callback);
	}

	var shareLabel = ["mail", "facebook", "google plus", "twitter", "linkedin"],
		ls_buttons = [];
	ls_buttons.push(ls_mail);
	ls_buttons.push(ls_fb);
	ls_buttons.push(ls_gplus);
	ls_buttons.push(ls_tw);
	ls_buttons.push(ls_lin);

	for (var i = 0; i < ls_buttons.length; i++) {
		ls_buttons[i].setAttribute("data-label", shareLabel[i]);
			addListener(ls_buttons[i], 'click', function () {
				ga('send', 'event', 'social', 'light share', this.getAttribute("data-label"));
		});
	}

	// Register Light Share Mail Interface events
	var gm = document.getElementById('ls_google_mail'),
		ym = document.getElementById('ls_yahoo_mail'),
		hm = document.getElementById('ls_hotmail_mail'),
		am = document.getElementById('ls_aol_mail'),
		dc = document.getElementById('ls_default_client'),
		x = document.getElementById('close');

	gm.onclick = createGoogleLink,
	ym.onclick = createYahooLink,
	hm.onclick = createHotmailLink,
	am.onclick = createAOLLink,
	dc.onclick = createClientLink;
	x.onclick = closeLSMI;
}