// var Rx = require('rxjs/Rx')
// import { Observable } from 'rxjs/Observable';
// import { of } from 'rxjs/observable/of';
// import { map } from 'rxjs/operator/map';

// Rx.Observable.of(1,2,3).map(x => x + '!!!'); // etc

var Widget = {
    init: function( width, height ) {
        this.$elem = null;
    },
    insert: function($parent) {
        if (this.$elem) {
            $parent.innerHTML += this.$elem;
        }
    }
};

var InputBox = Object.create( Widget );

InputBox.setup = function( width, height, name, label, type, placeholder) {
    this.init(width, height);
    this.name = name || 'Generic name';
    this.label = label || this.name;
    this.type = type || 'text';
    this.placeholder = placeholder || this.label;
    this.$elem = '<label for="' + this.name + '" >' + this.label + '</label>';
    this.$elem += '<input name="' + this.name + '" type="' + this.type + '" placeholder="' + this.placeholder + '" />';
}

InputBox.build = function($parent) {
    this.insert( $parent );
};

document.addEventListener("DOMContentLoaded", function() {
    var $body = document.getElementsByTagName('body');
    var $contact = document.getElementById('contact');
    var firstName = Object.create( InputBox );
    firstName.setup( 100, 50, 'first-name', 'First Name', 'text', 'John Doe')
    firstName.build( $contact );
});

