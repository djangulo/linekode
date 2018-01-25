import './../sass/contact-form.sass'

var creationWrapper = function(el, options, event=null, eventFn=null) {
    var x = document.createElement(el);
    for (let o in options) {
        if(o === 'innerHTML') {
            x.innerHTML = options[o];
        } else {
            x.setAttribute(o, options[o]);
        }
    }
    if (event !== null) {
        x.addEventListener(event, eventFn)
    }
    return x
}

var ContactFormAsync = {
    init: function (id) {
        var form = creationWrapper('form', {id: id, method: 'POST'});
        form.onsubmit = function submitForm(event) {
            event.preventDefault();
            this.send();
        }
        var firstName, lastName, email, phone, description, submit, reset, buttonsDiv, reCaptchaContainer, reCaptchaScript;
        firstName = creationWrapper('input', {name: 'first_name', type: 'text', placeholder: 'John', autocomplete: 'given-name', class: 'form-control'});
        lastName = creationWrapper('input', {name: 'last_name', type: 'text', placeholder: 'Doe', autocomplete: 'family-name', class: 'form-control'});
        email = creationWrapper('input', {
            name: 'email',
            type: 'email',
            placeholder: 'john.doe@example.com',
            autocomplete: 'email',
            class: 'form-control',
            required: true
        });
        phone = creationWrapper('input', {name: 'phone', type: 'tel', placeholder: '+1(809)123-4567', autocomplete: 'tel-national', class: 'form-control'});
        description = creationWrapper('textarea', {name: 'description', type: 'text', placeholder: gettext('Your description here'), autocomplete: 'off', class: 'form-control'});
        submit = creationWrapper('input', {type: 'submit', value: "Submit", class: "btn btn-send",});
        reset = creationWrapper('input', {type: 'reset', value: "Clear", class: "btn btn-reset"});
        buttonsDiv = creationWrapper('div', {class: 'btn-container'});
        reCaptchaContainer = creationWrapper('div', {
            class: 'g-recaptcha',
            'data-sitekey': '6LcI9T8UAAAAAJYKpNvI3JBDRGssf8Zppx1ccXzE'
        });
        var fNameLabel, lNameLabel, emailLabel, phoneLabel, descriptionLabel;
        fNameLabel = creationWrapper('label', {for: 'first_name', class: "label", innerHTML: gettext('First name(s)')});
        lNameLabel = creationWrapper('label', {for: 'last_name', class: "label", innerHTML: gettext('Last name(s)')});
        emailLabel = creationWrapper('label', {for: 'email', class: "label", innerHTML: gettext('Email')});
        phoneLabel = creationWrapper('label', {for: 'phone', class: "label", innerHTML: gettext('Phone')});
        descriptionLabel = creationWrapper('label', {for: 'description', class: "label", innerHTML: gettext('Project description')});

        form.appendChild(fNameLabel);
        form.appendChild(firstName);
        form.appendChild(lNameLabel);
        form.appendChild(lastName);
        form.appendChild(emailLabel);
        form.appendChild(email);
        form.appendChild(phoneLabel);
        form.appendChild(phone);
        form.appendChild(descriptionLabel);
        form.appendChild(description);
        form.appendChild(reCaptchaContainer);
        buttonsDiv.appendChild(submit);
        buttonsDiv.appendChild(reset);
        form.appendChild(buttonsDiv);
        this.form = form;

    },
    renderForm: function(parentId) {
        this.parent = document.getElementById(parentId);
        this.parent.appendChild(this.form);
    },
    getCookie: function(_name) {
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = cookies[i].trim();
                if (cookie.substring(0, _name.length + 1) == (_name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(_name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    },
    csrfToken: function() {
        return this.getCookie('csrftoken')
    },
    csrfSafeMethod: function(method) {
        return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
    },
    sameOrigin: function(url) {
        var host = document.location.host; // host + port
        var protocol = document.location.protocol;
        var sr_origin = '//' + host;
        var origin = protocol + sr_origin;
        return (url == origin || url.slice(0, origin.length + 1) == origin + '/') ||
            (url == sr_origin || url.slice(0, sr_origin.length + 1) == sr_origin + '/') ||
            !(/^(\/\/|http:|https:).*/.test(url));
    },
    getData: function() {
        var data = new FormData();
        for (let el of this.form.elements) {
            if (el.type === 'text' || el.type == 'textarea' || el.type ==='email' || el.type === 'tel'){
                data.append(el.name, el.value)
            }
        }
        return data;
    },
    send: function (url) {
        var formData = this.getData();
        var xhr = new XMLHttpRequest();
        xhr.open('POST', url, true)
        if(this.sameOrigin(url)) {
            xhr.setRequestHeader("X-CSRFToken", this.csrfTokencsrftoken)
        } else {
            throw "SameOrigin check failed"
        }
        xhr.onreadystatechange = function() {
            if(this.readyState == this.DONE && xhr.status == 200) {
                var parentEl = this.form.parentElement;
                this.form.remove();
                parentEl.innerHTML = '<h3 class="confirm-sent">Your message was sent successfully.</h3>'
            }
            if(this.readyState == this.DONE && xhr.status == 200) {
                var parentEl = this.form.parentElement;
                this.form.remove();
                parentEl.innerHTML = '<h3 class="error">Your message was sent successfully.</h3>'
            }
        }
    }
}
document.addEventListener('DOMContentLoaded', function() {
    var contactFormAsync = Object.create(ContactFormAsync);
    contactFormAsync.init('contact-form')
    contactFormAsync.renderForm('contact');
})
