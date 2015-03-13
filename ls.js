window.onload = function () {

	// Sneaky min optimization
	var t = "target",
		h = "href",
		o = "onclick",
		dg = function(id){ return document.getElementById(id); }

	// Get the current page's URL, through various means
						// Looks for canonical URL first
	var url = document.querySelector("link[rel='canonical']") ? document.querySelector("link[rel='canonical']").getAttribute(h) :
						// Open Graph Fallback
						document.querySelector("meta[property='og:url']") ? document.querySelector("meta[property='og:url']").getAttribute("content") :
						// Finally, just document.URL
						document.URL;
	url = encodeURIComponent(url);

	// Opens links in a new window
	var newWindow = "window.open(this.href, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=500,width=500');return false;";

	// The sharing buttons
	var ls_mail = dg('ls_mail'),
		ls_fb = dg('ls_fb'),
		ls_gplus = dg('ls_gplus'),
		ls_tw = dg('ls_tw'),
		ls_lin = dg('ls_lin'),
		ls_pin = dg('ls_pin');

	// Email
	ls_mail.onclick = function () { var lsmi = dg('lightShareMailInterface'); lsmi.style.display = "block";}
	ls_mail.setAttribute(h, "#");
	ls_mail.setAttribute(t, "");

	// Facebook with App_ID
	var fb_api = "https://www.facebook.com/dialog/share?",
		id = "&app_id=787311388023796", // <<<----------------------------- Set Me, Please! ----
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
	// If no Open data is available, set these properties as a fallback with the general settings for the page
	var lin_api = "https://www.linkedin.com/shareArticle?",
		lin_url = "&url=" + url;
	if (!document.querySelector("meta[property='og:title']")) {
		var title = "&title=" + encodeURI("Light Share lightweight sharing"), // <<<----------------------------- Set Me, Please! ----
			summary = "&summary=" + encodeURI("Social sharing for Chinchilla friends."), // <<<----------------------------- Set Me, Please! ----
			source = "&source=" + url;
		ls_lin.setAttribute(h, lin_api + lin_url + title + summary + source);
	} else {
		ls_lin.setAttribute(h, lin_api + lin_url);
	}
	ls_lin.setAttribute(t, "");
	ls_lin.setAttribute(o, newWindow);

	// Pinterest
	var pin_api = "https://www.pinterest.com/pin/create/button/?",
		pin_url = "url=" + url,
		// Pinterest doesn't automatically look at Open Graph data
		media =  "&media=" + document.querySelector("meta[property='og:image']").getAttribute("content"),
		description = "&description=" + document.querySelector("meta[property='og:description']").getAttribute("content");
	ls_pin.setAttribute(h, pin_api + pin_url + media + description);
	ls_pin.setAttribute(t, "");
	ls_pin.setAttribute(o, newWindow);

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

	var shareLabel = ["mail", "facebook", "google plus", "twitter", "linkedin", "pinterest"],
		ls_buttons = [];
	ls_buttons.push(ls_mail);
	ls_buttons.push(ls_fb);
	ls_buttons.push(ls_gplus);
	ls_buttons.push(ls_tw);
	ls_buttons.push(ls_lin),
	ls_buttons.push(ls_pin);

	for (var i = 0; i < ls_buttons.length; i++) {
		ls_buttons[i].setAttribute("data-label", shareLabel[i]);
			addListener(ls_buttons[i], 'click', function () {
				ga('send', 'event', 'social', 'light share', this.getAttribute("data-label"));
		});
	}

	// Register Light Share Mail Interface events
	var gm = dg('ls_google_mail'),
		ym = dg('ls_yahoo_mail'),
		hm = dg('ls_hotmail_mail'),
		am = dg('ls_aol_mail'),
		dc = dg('ls_default_client'),
		x = dg('close'),
		lsmi = dg('lightShareMailInterface');

	// Google
	gm.onclick = function(){createGenericLink({l:'ls_google_mail',u:'http://mail.google.com/mail?view=cm&fs=1&tf=1',t:'&to=',s:'&su=',b:'&body='});},
	// Yahoo
	ym.onclick = function(){createGenericLink({l:'ls_yahoo_mail',u:'http://compose.mail.yahoo.com/?',t:'to=',s:'&subject=',b:'&body='});},
	// Hotmail
	hm.onclick = function(){createGenericLink({l:'ls_hotmail_mail',u:'http://mail.live.com/mail/EditMessageLight.aspx?n=',t:'&to=',s:'&subject=',b:'&body='});},
	// AOL
	am.onclick = function(){createGenericLink({l:'ls_aol_mail',u:'http://webmail.aol.com/Mail/ComposeMessage.aspx?',t:'&to=',s:'&subject=',b:'&body='});},
	// Default Client
	dc.onclick = function(){createGenericLink({l:'ls_default_client',u:'mailto:',t:'',s:'?subject=',b:'&body='});};
	x.onclick = function () { lsmi.style.display = "none"; };
	window.onkeydown = function (key) {
		if (key.keyCode == "27") {
			if (lsmi.style.display !== "none") {
				lsmi.style.display = "none";
			}
		}
	};
}