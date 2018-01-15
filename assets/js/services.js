import './../sass/services.sass'

import Snap from 'imports-loader?this=>window,fix=>module.exports=0!snapsvg/dist/snap.svg.js';

import $ from 'jquery';

// Skeleton views for different websites offered

// Build a blog, initially, later i can morph into others as needed
// - header banner
// - nav under banner
// - left column
// - picture on right with small text running along


let paperWidth = 1000;
let paperHeight = 1200;

console.log('Initializing "paper" with w: ' + paperWidth + ', h: ' + paperHeight)
const $paper = Snap(paperWidth, paperHeight);
window.$paper = $paper;

let Rectangle = {
    init: function(paper, x, y, shadow, shadowOffset, fill, width, height, rx, ry, animating, hoverDuration, hoverStrength) {
        this._ = {
            paper: paper || null,
            self: null,
            set: null,
            intervalId: null,
            XY: {
                x: x || 0,
                y: y || 0
            },
            shadowOffset: shadowOffset || {
                x: 15,
                y: 15
            },
            shadow: shadow || false,
            fill: fill || "#000",
            width: width || 100,
            height: height || 100,
            rx: rx || 10,
            ry: ry || 10,
            animating: animating || false,
            hoverDuration: hoverDuration || 1200,
            hoverStrength: hoverStrength || 10
        }
        this._.self = this._.paper.g(),
        this._.set = Snap.set()
    },
    build: function() {
        if (this._.paper) {
            if (this._.shadow) {
                let bg = Snap().rect(
                    this._.XY.x + this._.shadowOffset.x,
                    this._.XY.y + this._.shadowOffset.y,
                    this._.width,
                    this._.height)
                    .attr(
                        {
                        fill: "rgba(50, 50, 50, 0.2)",
                        rx: this._.rx,
                        ry: this._.ry
                    }
                )
                this._.self.add(bg)
                this._.set.push(bg)
            }
            let fg = Snap().rect(
                this._.XY.x,
                this._.XY.y,
                this._.width,
                this._.height)
                .attr(
                    {
                    fill: this._.fill,
                    rx: this._.rx,
                    ry: this._.ry
                }
            )
            this._.self.add(fg)
            this._.set.push(fg)
        }
        return true;
    },
    move: function($x, $y) {
        // Moves the rectangle and its shadow $x units to the right
        // and $y units down. Use negative numbers for moving left
        // and up.
        this._.XY.x = $x;
        this._.XY.y = $y;
        this._.set.forEach(function(e) {
            e.attr({
                x: parseFloat(e.attr('x')) + $x,
                y: parseFloat(e.attr('y')) + $y
            })
        });
        return true;
    },
    resize: function(w, h) {
        this._.set.forEach(function(e) {
            e.attr({
                width: w,
                height: h
            })
        });
        return true;
    },
    // hover: function() {
    //     this._.set.forEach(function(e) {
    //         e.animate({y: parseFloat(e.attr('y')) + 20}, 1000, mina.easeinout, function() {
    //             e.animate({y: parseFloat(e.attr('y')) - 20}, 1000, mina.easeinout)
    //         })
    //     });
    // },
    animOn: function(set, duration, strength) {
        set.forEach(function(e){
            e.animate({y: parseFloat(e.attr('y')) + strength}, duration / 2, mina.easeinout, function() {
                e.animate({y: parseFloat(e.attr('y')) - strength}, duration / 2, mina.easeinout)
            })
        })
    },
    hover: function() {
        self = this;
        let duration = this._.hoverDuration;
        let strength = this._.hoverStrength;
        if(this._.animating) {
            this._.intervalId = setInterval(this.animOn, duration, self._.set, duration, strength)
        }
    },
    stopAnimation: function(w, h) {
        this._.animating = false;
        clearInterval(this._.intervalId);
        return true;
    }
}
let Circle = {
    init: function(paper, x, y, r, shadow, shadowOffset, fill, animating, hoverDuration, hoverStrength) {
        this._ = {
            paper: paper || null,
            self: null,
            set: null,
            intervalId: null,
            XYR: {
                x: x || 0,
                y: y || 0,
                r: r || 5
            },
            shadowOffset: shadowOffset || {
                x: 15,
                y: 15
            },
            shadow: shadow || false,
            fill: fill || "#000",
            animating: animating || false,
            hoverDuration: hoverDuration || 1200,
            hoverStrength: hoverStrength || 10
        }
        this._.self = this._.paper.g(),
        this._.set = Snap.set()
    },
    build: function() {
        if (this._.paper) {
            if (this._.shadow) {
                let bg = Snap().circle(
                    this._.XYR.x + this._.shadowOffset.x,
                    this._.XYR.y + this._.shadowOffset.y,
                    this._.XYR.r)
                    .attr(
                        {
                        fill: "rgba(50, 50, 50, 0.2)",
                    }
                )
                this._.self.add(bg)
                this._.set.push(bg)
            }
            let fg = Snap().circle(
                this._.XYR.x,
                this._.XYR.y,
                this._.XYR.r)
                .attr(
                    {
                    fill: this._.fill,
                }
            )
            this._.self.add(fg)
            this._.set.push(fg)
        }
        return true;
    },
    move: function($x, $y) {
        // Moves the rectangle and its shadow $x units to the right
        // and $y units down. Use negative numbers for moving left
        // and up.
        this._.XYR.x = $x;
        this._.XYR.y = $y;
        this._.set.forEach(function(e) {
            e.attr({
                x: parseFloat(e.attr('x')) + $x,
                y: parseFloat(e.attr('y')) + $y
            })
        });
        return true;
    },
    resize: function($r) {
        this._.set.forEach(function(e) {
            e.attr({
                r: $r,
            })
        });
        return true;
    },
    animOn: function(set, duration, strength) {
        set.forEach(function(e){
            e.animate({cy: parseFloat(e.attr('cy')) + strength}, duration / 2, mina.easeinout, function() {
                e.animate({cy: parseFloat(e.attr('cy')) - strength}, duration / 2, mina.easeinout)
            })
        })
    },
    hover: function() {
        self = this;
        let duration = this._.hoverDuration;
        let strength = this._.hoverStrength;
        if(this._.animating) {
            this._.intervalId = setInterval(this.animOn, duration, self._.set, duration, strength)
        }
    },
    stopAnimation: function(w, h) {
        this._.animating = false;
        clearInterval(this._.intervalId);
        return true;
    }
}

let MockText = {
    init: function(paper, x, y, title, titleLineShade, lineDirection, lineWidth, lineHeight, lines, lineSpacing, fill, rx, ry, animating, hoverDuration, hoverStrength) {
        this._ = {
            paper: paper || null,
            self: null,
            set: null,
            intervalId: null,
            XY: {
                x: x || 0,
                y: y || 0,
            },
            title: title || false,
            titleLineShade: titleLineShade || "#000",
            lineDirection: lineDirection || 'vertical',
            lineWidth: lineWidth || 20,
            lineHeight: lineHeight || 4,
            lines: lines || 1,
            lineSpacing: lineSpacing || 1,
            fill: fill || "#000",
            rx: rx || 4,
            ry: ry || 4,
            animating: animating || false,
            hoverDuration: hoverDuration || 1200,
            hoverStrength: hoverStrength || 10
        }
        this._.self = this._.paper.g(),
        this._.set = Snap.set()
    },
    build: function() {
        if (this._.paper) {
            for(let i = 0; i < this._.lines; i++) {
                let line;
                let titleLineShade;
                if(this._.lineDirection == 'vertical') {
                    if(this._.title && i === 0){
                        line = Snap().rect(
                            this._.XY.x,
                            this._.XY.y,
                            this._.lineWidth * 0.6,
                            this._.lineHeight * 1.6)
                            .attr(
                                {
                                fill: this._.titleLineShade,
                                rx: this._.rx,
                                ry: this._.ry
                            }
                        )                    
                    } else if(i % 2 == 0) {
                        line = Snap().rect(
                            this._.XY.x,
                            this._.XY.y + (this._.lineSpacing * i),
                            this._.lineWidth * 0.9,
                            this._.lineHeight)
                            .attr(
                                {
                                fill: this._.fill,
                                rx: this._.rx,
                                ry: this._.ry
                            }
                        )
                    } else {
                        line = Snap().rect(
                            this._.XY.x,
                            this._.XY.y + (this._.lineSpacing * i),
                            this._.lineWidth,
                            this._.lineHeight)
                            .attr(
                                {
                                fill: this._.fill,
                                rx: this._.rx,
                                ry: this._.ry
                            }
                        )
                    }
                } else if(this._.lineDirection == 'horizontal') {
                    if(this._.title && i === 0){
                        line = Snap().rect(
                            this._.XY.x,
                            this._.XY.y,
                            this._.lineWidth * 0.6,
                            this._.lineHeight * 1.6)
                            .attr(
                                {
                                fill: this._.titleLineShade,
                                rx: this._.rx,
                                ry: this._.ry
                            }
                        )                    
                    } else if(i % 2 == 0) {
                        line = Snap().rect(
                            this._.XY.x + (this._.lineSpacing * i),
                            this._.XY.y,
                            this._.lineWidth * 0.9,
                            this._.lineHeight)
                            .attr(
                                {
                                fill: this._.fill,
                                rx: this._.rx,
                                ry: this._.ry
                            }
                        )
                    } else {
                        line = Snap().rect(
                            this._.XY.x + (this._.lineSpacing * i),
                            this._.XY.y,
                            this._.lineWidth,
                            this._.lineHeight)
                            .attr(
                                {
                                fill: this._.fill,
                                rx: this._.rx,
                                ry: this._.ry
                            }
                        )
                    }
                }
                this._.self.add(line)
                this._.set.push(line)
            }

        }
        return true;
    },
    move: function($x, $y) {
        // Moves the rectangle and its shadow $x units to the right
        // and $y units down. Use negative numbers for moving left
        // and up.
        this._.XYR.x = $x;
        this._.XYR.y = $y;
        this._.set.forEach(function(e) {
            e.attr({
                x: parseFloat(e.attr('x')) + $x,
                y: parseFloat(e.attr('y')) + $y
            })
        });
        return true;
    },
    resize: function($r) {
        this._.set.forEach(function(e) {
            e.attr({
                r: $r,
            })
        });
        return true;
    },
    animOn: function(set, duration, strength) {
        set.forEach(function(e){
            e.animate({y: parseFloat(e.attr('y')) + strength}, duration / 2, mina.easeinout, function() {
                e.animate({y: parseFloat(e.attr('y')) - strength}, duration / 2, mina.easeinout)
            })
        })
    },
    hover: function() {
        self = this;
        let duration = this._.hoverDuration;
        let strength = this._.hoverStrength;
        if(this._.animating) {
            this._.intervalId = setInterval(this.animOn, duration, self._.set, duration, strength)
        }
    },
    stopAnimation: function(w, h) {
        this._.animating = false;
        clearInterval(this._.intervalId);
        return true;
    }
}


// var rect2 = Object.create(Rectangle);
// rect2.init($paper, 0, 0, true, {x: 15, y: 15}, '#389840', 300, 200, 10, 10, true, 1200, 30);
// rect2.build();
// rect2.hover();

// var rect = Object.create(Rectangle);
// rect.init($paper, 500, 0, true, {x: 50, y: 50}, '#389840', 300, 200, 10, 10, true, 1100, 30);
// rect.build();
// rect.hover();

// window.rect = rect;
// window.rect2 = rect2;




// var c3 = Object.create(Circle);
// c3.init($paper, 500, 500, 60, true, {x: 15, y: 15}, 'red', true, 1100, 30);
// c3.build();
// c3.hover();

// var c2 = Object.create(Circle);
// c2.init($paper, 500, 500, 30, false, {x: 15, y: 15}, 'white', true, 1100, 30);
// c2.build();
// c2.hover();

// var circle = Object.create(Circle);
// circle.init($paper, 500, 500, 10, false, {x: 15, y: 15}, 'red', true, 1100,500);
// circle.build();
// circle.hover();

// var logo = Snap.set(circle, c2, c3);

// window.circle = circle;
// window.logo = logo;

// var text = Object.create(MockText);
// text.init($paper, 100, 400, true, 'darkred', 450, 10, 10, 10, 'red', 6, 6, true, 1100, 100)    
// // paper, x, y, title, titleLineShade, lineWidth, lineHeight, lines, lineSpacing, fill, rx, ry, animating, hoverDuration
// text.build();
// text.hover();

var createView = function() {
    var screen = Object.create(Rectangle);
    screen.init($paper, 10, 10, true, {x: 15, y: 15}, '#D2CBB1', 800, 600, 10, 10, true, 1200, 10);
    screen.build();
    screen.hover();

    var banner = Object.create(Rectangle);
    banner.init($paper, 60, 30, true, {x: 15, y: 15}, '#1F6217', 700, 120, 10, 10, true, 1100, 10);
    banner.build();
    banner.hover();

    // Nav
    var nav1 = Object.create(MockText);
    nav1.init($paper, 500, 120, false, '#C0C9BF', 'horizontal', 50, 10, 4, 60, '#C0C9BF', 6, 6, true, 1100, 10)
    nav1.build();
    nav1.hover();

    var textArea = Object.create(Rectangle);
    textArea.init($paper, 60, 170, true, {x: 15, y: 15}, '#ECEDEC', 500, 400, 10, 10, true, 1150, 10);
    textArea.build();
    textArea.hover();

    var lines1 = Object.create(MockText);
    lines1.init($paper, 70, 180, true, '#1F6217', 'vertical', 450, 10, 6, 32, '#B7BCB7', 6, 6, true, 1150, 10)
    lines1.build();
    lines1.hover();

    var lines2 = Object.create(MockText);
    lines2.init($paper, 70, 370, true, '#1F6217', 'vertical', 450, 10, 6, 32, '#B7BCB7', 6, 6, true, 1150, 10)
    lines2.build();
    lines2.hover();

    var aside = Object.create(Rectangle);
    aside.init($paper, 600, 170, true, {x: 15, y: 15}, '#618400', 160, 400, 10, 10, true, 1120, 10);
    aside.build();
    aside.hover();

    var asidePicture = Object.create(Rectangle);
    asidePicture.init($paper, 620, 180, true, {x: 15, y: 15}, '#CCBC8E', 120, 100, 10, 10, true, 1120, 10);
    asidePicture.build();
    asidePicture.hover();

    var asideText = Object.create(MockText);
    asideText.init($paper, 620, 300, true, '#1F6217', 'vertical', 100, 5, 18, 16, '#B7BCB7', 6, 6, true, 1120, 10)
    asideText.build();
    asideText.hover();

}();





$( document ).ready( function() {
    const $body = $( document.body );
    // $(window).resize(function(){
    //     this.paperWidth = window.innerWidth * 0.9;
    //     this.paperHeight = window.innerHeight * 0.9;
    // });
})