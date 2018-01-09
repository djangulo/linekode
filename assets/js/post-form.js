var Widget = {
	init: function(){
        this.$label = null
		this.$elem = null;
	},
	insert: function($where){
        if (this.$label) { this.$label.appendTo( $where );}
        if (this.$elem) { this.$elem.appendTo( $where );}
	}
};


// Inputs setup
var InputBox = Object.create( Widget );
InputBox.setup = function( name, label, type, placeholder, autocomplete) {
    this.init();
    this.name = name || 'Generic name';
    this.label = label || this.name;
    this.type = type || 'text';
    this.placeholder = placeholder || this.label;
    this.autocomplete = autocomplete || null;
    if (type == 'textarea') {
        this.$label = $("<label>").attr('for', this.name);
        this.$label.html(this.label);
        this.$elem = $("<textarea>").attr('name', this.name);
        this.$elem.attr('placeholder', this.placeholder);
    } else {
        this.$label = $("<label>").attr('for', this.name);
        this.$label.html(this.label);
        this.$elem = $("<input>").attr('name',this.name);
        this.$elem.attr('type', this.type);
        this.$elem.attr('placeholder', this.placeholder);
    }
    if (this.autocomplete) {this.$elem.attr('autocomplete', this.autocomplete)}
    
}
InputBox.build = function($where) {
    this.insert( $where );
};

// Buttons setup
var Button = Object.create( Widget );
Button.setup = function(type, label) {
    this.init();
    this.type = type || "button";
    this.label = label || "Button";
    this.$elem = $("<button>").text( this.label);
    this.$elem.attr('type', this.type);
}
Button.build = function($where) {
    this.insert( $where );
}


function send_message() {
    var data = new Object();
    var values = $(this).serializeArray();
    var $parent = $(this).parent();
    console.log(values)
    for (var i=0; i < values.length; i++) {
        console.log(i);
        console.log(data);
        console.log(values[i])
        data[values[i]['name']] = values[i]['value'];
    }
    console.log(data);
    console.log(JSON.stringify(data));
    $.ajax({
        url: 'api/v1/messages/',
        method: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json',
        processData: false,
        success: function(json) {
            $parent.children().each(function() {
                $(this).detach();
            })
            $parent.html("<p>" + json.response "</p>");
        },
        error: function(xhr, errmsg, err) {
            $parent.append(
                $("<p>").html("failed to send your message")
            );
        }
    })
}
$(document).ready( function() {
    var $contact = $('#contact-form');
    var firstName = Object.create( InputBox );
    firstName.setup('first_name', 'First Name', 'text', 'John', 'given-name')
    firstName.build( $contact );
    var lastName = Object.create( InputBox );
    lastName.setup('last_name', 'Last Name', 'text', 'Doe', 'family-name')
    lastName.build( $contact );
    var email = Object.create( InputBox );
    email.setup('email', 'Email', 'email', 'john.doe@example.com', 'email')
    email.build( $contact );
    var phone = Object.create( InputBox );
    phone.setup('phone', 'Phone', 'text', '+1(809) 123-4567', 'tel-national')
    phone.build( $contact );
    var message = Object.create( InputBox );
    message.setup('message', 'Message', 'textarea', 'Your description here')
    message.build( $contact );

    var submit = Object.create( Button );
    submit.setup('submit', 'Submit');
    submit.build($contact);
    var reset = Object.create( Button );
    submit.setup('reset', 'Clear');
    submit.build($contact);

    $contact.on('submit', function(event) {
        event.preventDefault();
        console.log('form submitted');
        var values = $(this).serializeArray();
        send_message.call($(this));
    })

});







$(function() {
    function getCookie(name) {
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
    var csrftoken = getCookie('csrftoken');

    /*
    The functions below will create a header with csrftoken
    */

    function csrfSafeMethod(method) {
        // these HTTP methods do not require CSRF protection
        return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
    }
    function sameOrigin(url) {
        // test that a given url is a same-origin URL
        // url could be relative or scheme relative or absolute
        var host = document.location.host; // host + port
        var protocol = document.location.protocol;
        var sr_origin = '//' + host;
        var origin = protocol + sr_origin;
        // Allow absolute or scheme relative URLs to same origin
        return (url == origin || url.slice(0, origin.length + 1) == origin + '/') ||
            (url == sr_origin || url.slice(0, sr_origin.length + 1) == sr_origin + '/') ||
            // or any other URL that isn't scheme relative or absolute i.e relative.
            !(/^(\/\/|http:|https:).*/.test(url));
    }

    $.ajaxSetup({
        beforeSend: function(xhr, settings) {
            if (!csrfSafeMethod(settings.type) && sameOrigin(settings.url)) {
                // Send the token to same-origin, relative URLs only.
                // Send the token only if the method warrants CSRF protection
                // Using the CSRFToken value acquired earlier
                xhr.setRequestHeader("X-CSRFToken", csrftoken);
            }
        }
    });

});