window.onload = function () {

	var url = document.querySelector("link[rel='canonical']") ? document.querySelector("link[rel='canonical']").getAttribute("href") : // Looks for canonical URL first
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

	// TODO - integrate into various email clients

	// Facebook with App_ID
	var fb_api = "https://www.facebook.com/dialog/share?",
		id = "&app_id=787311388023796", // This is a unique id like Google Analytics API key
		display = "&display=popup",
		href = "&href=" + url,
		redirect = "&redirect_uri=" + url;
	ls_fb.setAttribute("href", fb_api + id + display + href + redirect);
	ls_fb.setAttribute("target", "");
	ls_fb.setAttribute("onclick", newWindow);

	// Gplus
	var gplus_api = "https://plus.google.com/share?",
		url = "url=" + url;
	ls_gplus.setAttribute("href", gplus_api + url);
	ls_gplus.setAttribute("target", "");
	ls_gplus.setAttribute("onclick", newWindow);

	// Twitter is already covered by the link
	ls_tw.setAttribute("target", "");
	ls_tw.setAttribute("onclick", newWindow);

	// LinkedIn
	// If no OG data is available, set these properties
	var lin_api = "https://www.linkedin.com/shareArticle?",
		lin_url = "&url=" + url;
	if (!document.querySelector("meta[property='og:title']")) {
		var title = "&title=" + encodeURI("Light Share lightweight sharing"),
			summary = "&summary=" + encodeURI("A minimally intrusive social sharing button group."),
			source = "&source=" + url;
		ls_lin.setAttribute("href", lin_api + lin_url + title + summary + source);
	} else {
		ls_lin.setAttribute("href", lin_api + lin_url);
	}
	ls_lin.setAttribute("target", "");
	ls_lin.setAttribute("onclick", newWindow);

	// Show / hide the light share section
	var threshold = 375;
	var lightShare = document.getElementsByClassName("lightShare")[0];
	window.onscroll = function () {
		console.log(window.pageXOffset);

		// IE 9-
		if (window.pageYOffset == undefined) {
			window.pageYOffset = document.documentElement.scrollTop;
		}

		if (window.pageYOffset > threshold) {
			lightShare.style.display = "inherit";
		} else {
			lightShare.style.display = "none";
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
		setAttribute("data-label", shareLabel[i]);
			addListener(a, 'click', function () {
				ga('send', 'event', 'social', 'light share', this.getAttribute("data-label"));
		});
	}
}