var Form = function(selector) {

	this.el     = null;
	this.action = null;
	this.method = null;
	this.button = null;
	this.errors = null;

	this.init = function() {
		this.el     = document.querySelector(selector);
		this.action = this.el.getAttribute('action');
		this.method = this.el.getAttribute('method');
		this.button = document.querySelector(selector + ' button[type=submit]');

		this.button.addEventListener('click', this.submit.bind(this));
	};

	this.submit = function(e) {
		e.preventDefault();

		this.disable();

		var data    = new FormData(this.el);
		var request = new XMLHttpRequest();
		var self    = this;

		request.open(this.method, this.action);
		request.setRequestHeader('X-Requested-With','XMLHttpRequest');
		request.addEventListener('load', function() { self.handleResponse(this); });
		request.addEventListener('error', function() { self.handleError(this); });
		request.send(data);
	};

	this.disable = function() {
		var elements = this.el.elements;
		for(var i in elements) {
			elements[i].readOnly = true;
		}
	};

	this.enable = function() {
		var elements = this.el.elements;
		for(var i in elements) {
			elements[i].readOnly = false;
		}
	};

	this.reset = function() {
		this.el.reset();
	};

	this.handleResponse = function(response) {
		if(response.status == 200) {
			this.handleSuccess(response);
		} else {
			this.handleError(response);
		}
	};

	this.handleSuccess = function(response) {
		var jsonData = JSON.parse(response.responseText);
		var event = new CustomEvent('success', { detail: jsonData });
		this.reset();
		this.enable();
		this.el.dispatchEvent(event);
	};

	this.handleError = function(response) {
	    var event = null;
		if(response.status == 422) {
			var data    = JSON.parse(response.responseText);
			this.el.classList.add('hasErrors');
			this.processValidationErrors(data);
			event = new CustomEvent('invalid', { detail: this.errors });
		} else {
			this.errors = 'An error was encountered while attempting to process your request.';
			event = new CustomEvent('error', { detail: this.errors });
		}
		this.enable();
		this.el.dispatchEvent(event);
	};

	this.processValidationErrors = function(errors) {
		var e = [];
		for(var prop in errors) {
			var error = {
				el      : document.querySelector(selector + ' input[name=' + prop + ']'),
				field   : prop,
				message: errors[prop][0]
			};
			e.push(error);
		}
		this.errors = e;
	};

	this.init();

};
