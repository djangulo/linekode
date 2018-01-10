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
        url: '/api/v1/messages/',
        method: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json',
        processData: false,
        success: function(json) {
            $parent.children().each(function() {
                $(this).detach();
            })
            $parent.html("<p>" + json.response + "</p>");
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
    $contact.on('submit', function(event) {
        event.preventDefault();
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