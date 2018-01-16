import './../sass/services.sass'

import Snap from 'imports-loader?this=>window,fix=>module.exports=0!snapsvg/dist/snap.svg.js';

import $ from 'jquery';

// Skeleton views for different websites offered

// Build a blog, initially, later i can morph into others as needed
// - header banner
// - nav under banner
// - left column
// - picture on right with small text running along

let ColorPalette = {
    init: function(name) {
        this.name = name || "";
        this.palette = {
            primaryn: "#000",
            primaryl: "#000",
            primaryd: "#000",
            accentn: "#000",
            accentl: "#000",
            accentd: "#000",
            textl: "#000",
            textd: "#fff"
        }
    },
    set: function(key, val=null) {
        if (key instanceof Object) {
            for(let i in key) {
                this.palette[i] = key[i];
            }
        }
        this.palette[key] = val;
    },
    get: function(key) {
        return this.palette[key]
    }
}

let amberGreen = Object.create(ColorPalette)
amberGreen.init('Amber Green');
amberGreen.set({
    primaryn: "#4CAF50",
    primaryl: "#C8E6C9",
    primaryd: "#388E3C",
    accentn: "#FFC107",
    accentl: "#FFECB5",
    accentd: "#FF9E02",
    textl: "#212121",
    textd: "#757575"
})
let blueGrayPurple = Object.create(ColorPalette)
blueGrayPurple.init('Blue-Gray Purple');
blueGrayPurple.set({
    primaryn: "#607D8B",
    primaryl: "#CFD8DC",
    primaryd: "#455A64",
    accentn: "#E040FB",
    accentl: "#F6C6FE",
    accentd: "#CB1CF8",
    textl: "#212121",
    textd: "#757575"
})
let brownOrange = Object.create(ColorPalette)
brownOrange.init('Brown Orange');
brownOrange.set({
    primaryn: "#795548",
    primaryl: "#D7CCC8",
    primaryd: "#5D4037",
    accentn: "#FF5722",
    accentl: "#FF2C0C",
    accentd: "#FFCDBD",
    textl: "#212121",
    textd: "#757575"
})
let palettes = [amberGreen, blueGrayPurple, brownOrange]



let Shape = {
    init: function(paper, config) {
        this._ = {  // settings
            paper: paper || null,
            self: null,
            set: null,
            x: config.x || 0,
            y: config.y || 0,
            shadowOffset: config.shadowOffset || {
                x: 15,
                y: 15
            },
            shadow: config.shadow || false, // takes place of "title" row in MockText
            shadowFill: config.shadowFill || "rgba(50, 50, 50, 0.2)", // MockText's "title" color
            fill: config.fill || "#000",
            width: config.width || 100,
            height: config.height || 100,
            r: config.r || 20,
            rx: config.rx || 10,
            ry: config.ry || 10,
            animationDelay: config.animationDelay || 0,
            lineSpacing: config.lineSpacing || 1,
            lineCount: config.lineCount || 1,
            lineDirection: config.lineDirection || 'vertical'
        }
        this._.self = this._.paper.g(),
        this._.set = Snap.set()
    },
    build: function() { },
    move: function($x, $y) {
        // Moves the rectangle and its shadow $x units to the right
        // and $y units down. Use negative numbers for moving left
        // and up.
        this._.x = $x;
        this._.y = $y;
        if (this._.self[0].type === 'rect') {
            this._.set.forEach(function(e) {
                e.attr({
                    x: parseFloat(e.attr('x')) + $x,
                    y: parseFloat(e.attr('y')) + $y
                })
            });
            return
        } else if (this._.self[0].type === 'circle') {
            this._.set.forEach(function(e) {
                e.attr({
                    cx: parseFloat(e.attr('cx')) + $x,
                    cy: parseFloat(e.attr('cy')) + $y
                })
            });
            return
        } else {
            return false
        }
    },
    resize: function(wr=null, h=null) {
        if (this._.self[0].type === 'rect') {
            this._.set.forEach(function(e) {
                if (wr !== null) { e.attr({width: wr}); }
                if (h !== null) { e.attr({height: h}); }
            })
            return ;
        } else if (this._.self[0].type === 'circle') {
            this._.set.forEach(function(e) {
                if (wr !== null) { e.attr({r: wr}); }
            })
            return ;
        }
    },
    recolor: function(color=null, strokeColor=null) {
        if (color) {
            this._.set.forEach(function(e) {
                if ( !( e.hasClass('svg-rect-shadow') || e.hasClass('svg-circle-shadow') ) ) {
                    e.attr({fill: color})
                }
            })
        }
        if (strokeColor) {
            this._.set.forEach(function(e) {
                if ( !( e.hasClass('svg-rect-shadow') || e.hasClass('svg-circle-shadow') ) ) {
                    e.attr({stroke: strokeColor})
                }
            })
        }
    },
    animOn: function(delay=null) {
        let animDelay = this._.animationDelay;
        if (delay != animDelay && delay != null) {
            this._.set.forEach(function(e) {
                e.addClass('hover-animation');
                e.attr({style: 'animation-delay: ' + JSON.stringify(delay) + 's;'})
            })
        } else {
            this._.set.forEach(function(e) {
                e.addClass('hover-animation');
                e.attr({style: 'animation-delay: ' + JSON.stringify(animDelay) + 's;'})
            })
        }
    },
    animOff: function() {
        this._.set.forEach(function(e) {
            e.removeClass('hover-animation');
        })
    }
}
let Rectangle = Object.create(Shape);
Rectangle.build = function() {
    if (this._.paper) {
        if (this._.shadow) {
            let bg = Snap().rect(
                this._.x + this._.shadowOffset.x,
                this._.y + this._.shadowOffset.y,
                this._.width,
                this._.height)
                .attr(
                    {
                    fill: this._.shadowFill,
                    rx: this._.rx,
                    ry: this._.ry
                }
            ).addClass('svg-rect-shadow');
            this._.self.add(bg)
            this._.set.push(bg)
        }
        let fg = Snap().rect(
            this._.x,
            this._.y,
            this._.width,
            this._.height)
            .attr(
                {
                fill: this._.fill,
                rx: this._.rx,
                ry: this._.ry
            }
        ).addClass('svg-rect');
        this._.self.add(fg)
        this._.set.push(fg)
    }
    return true;
}
let Circle = Object.create(Shape)
Circle.build = function() {
    if (this._.paper) {
        if (this._.shadow) {
            let bg = Snap().circle(
                this._.x + this._.shadowOffset.x,
                this._.y + this._.shadowOffset.y,
                this._.r)
                .attr(
                    {
                    fill: this._.shadowFill,
                }
            ).addClass('svg-circle-shadow');
            this._.self.add(bg)
            this._.set.push(bg)
        }
        let fg = Snap().circle(
            this._.x,
            this._.y,
            this._.r)
            .attr(
                {
                fill: this._.fill,
            }
        ).addClass('svg-circle');
        this._.self.add(fg)
        this._.set.push(fg)
    }
    return true;
}
let MockText = Object.create(Shape);
MockText.build = function() {
    if (this._.paper) {
        let line;
        for(let i = 0; i < this._.lineCount; i++) {
            if(this._.lineDirection == 'vertical') {
                if(this._.shadow && i === 0){
                    line = Snap().rect(
                        this._.x,
                        this._.y,
                        this._.width * 0.6,
                        this._.height * 1.6)
                        .attr(
                            {
                            fill: this._.shadowFill,
                            rx: this._.rx,
                            ry: this._.ry
                        }
                    ).addClass('svg-mock-text-title')
                } else if(i % 2 == 0) {
                    line = Snap().rect(
                        this._.x,
                        this._.y + (this._.lineSpacing * i),
                        this._.width * 0.9,
                        this._.height)
                        .attr(
                            {
                            fill: this._.fill,
                            rx: this._.rx,
                            ry: this._.ry
                        }
                    ).addClass('svg-mock-text')
                } else {
                    line = Snap().rect(
                        this._.x,
                        this._.y + (this._.lineSpacing * i),
                        this._.width,
                        this._.height)
                        .attr(
                            {
                            fill: this._.fill,
                            rx: this._.rx,
                            ry: this._.ry
                        }
                    ).addClass('svg-mock-text')
                }
            } else if(this._.lineDirection == 'horizontal') {
                line = Snap().rect(
                    this._.x + (this._.lineSpacing * i),
                    this._.y,
                    this._.width,
                    this._.height)
                    .attr(
                        {
                        fill: this._.fill,
                        rx: this._.rx,
                        ry: this._.ry
                    }
                ).addClass('svg-mock-text')
            }
            this._.self.add(line)
            this._.set.push(line)
        }
    }
}
MockText.recolor =  function(color=null, titleColor=null) {
    this._.set.forEach(function(e) {
        if ( e.hasClass('svg-mock-text-title') ) {
            e.attr({fill: titleColor})
        } else {
            e.attr({fill: color})
        }
    })
    return true;
}

var blogViewConfig = {
    screen: {
        x: 10,
        y: 10,
        shadow: true,
        fill: "lightgrey",
        width: 800,
        height: 600,
        animationDelay: 0
    },
    banner: {
        x: 60,
        y: 30,
        shadow: true,
        fill: palettes[0].palette.primaryn,
        width: 700,
        height: 120,
        animationDelay: 0.1
    },
    bannerNav: {
        x: 520,
        y: 120,
        fill: palettes[0].palette.primaryl,
        shadow: false,
        lineDirection: 'horizontal',
        lineCount: 4,
        width: 45,
        height: 10,
        lineSpacing: 50,
        animationDelay: 0.1,
        rx: 5,
        ry: 5
    },
    textArea: {
        x: 60,
        y: 170,
        fill: palettes[0].palette.accentl,
        shadow: true,
        width: 500,
        height: 400,
        animationDelay: 0.3,
    },
    lines1: {
        x: 70,
        y: 180,
        fill: palettes[0].palette.textd,
        shadow: true,
        shadowFill: palettes[0].palette.accentn,
        lineCount: 6,
        width: 450,
        height: 10,
        lineSpacing: 32,
        animationDelay: 0.3,
        rx: 5,
        ry: 5
    },
    lines2: {
        x: 70,
        y: 370,
        fill: palettes[0].palette.textd,
        shadow: true,
        shadowFill: palettes[0].palette.accentn,
        lineCount: 6,
        width: 450,
        height: 10,
        lineSpacing: 32,
        animationDelay: 0.3,
        rx: 5,
        ry: 5
    },
    aside: {
        x: 600,
        y: 170,
        fill: palettes[0].palette.accentl,
        shadow: true,
        width: 160,
        height: 400,
        animationDelay: 0.5,
    },
    asidePicture: {
        x: 620,
        y: 180,
        fill: palettes[0].palette.accentd,
        shadow: true,
        width: 120,
        height: 100,
        animationDelay: 0.5,
    },
    asideText: {
        x: 620,
        y: 300,
        fill: palettes[0].palette.textd,
        lineCount: 17,
        width: 120,
        height: 5,
        lineSpacing: 16,
        animationDelay: 0.3,
        rx: 6,
        ry: 6
    },
}

let viewManager = {
    currentPalette: palettes[0],
    init: function() {
        this.objects = {
            screen: Object.create(Rectangle),
            banner: Object.create(Rectangle),
            bannerNav: Object.create(Rectangle),
            textArea: Object.create(Rectangle),
            lines1: Object.create(MockText),
            lines2: Object.create(MockText),
            aside: Object.create(Rectangle),
            asidePicture: Object.create(Rectangle),
            asideText: Object.create(MockText)           
        }
    },
    build: function(paper, config) {
        for (let obj in this.objects) {
            this.objects[obj].init(paper, config[obj]);
            this.objects[obj].build();
            this.objects[obj].animOn();
        }
    },
    recolor: function() {
        this.colors = {
            screen: { fill: "lightgrey" },
            banner: { fill: this.currentPalette.palette.primaryn },
            bannerNav: { fill: this.currentPalette.palette.primaryl },
            textArea: {fill: this.currentPalette.palette.primaryl },
            lines1: {
                fill: this.currentPalette.palette.textd,
                shadowFill: this.currentPalette.palette.accentn,
            },
            lines2: {
                fill: this.currentPalette.palette.textd,
                shadowFill: this.currentPalette.palette.accentn,
            },
            aside: { fill: this.currentPalette.palette.primaryl },
            asidePicture: { fill: this.currentPalette.palette.primaryd },
            asideText: { fill: this.currentPalette.palette.textd }
        }
        for (let obj in this.objects) {
            this.objects[obj].recolor(this.colors[obj].fill, this.colors[obj].shadowFill);
        }
    },
    reshape: function(config) {

    }
}




let paperWidth = 1000;
let paperHeight = 1200;

console.log('Initializing "paper" with w: ' + paperWidth + ', h: ' + paperHeight)
const $paper = Snap(paperWidth, paperHeight);
window.$paper = $paper;


$( document ).ready( function() {
    const $body = $( document.body );
    viewManager.init();
    viewManager.build($paper, blogViewConfig);
    let i;
    setInterval(function(){
        i = palettes.indexOf(createBlogView.currentPalette);
        if ((i+1) == palettes.length) {
            createBlogView.currentPalette = palettes[0];
        } else {
            createBlogView.currentPalette = palettes[i + 1];
        }
        createBlogView.recolor();
    }, 5000)

    // $(window).resize(function(){
    //     this.paperWidth = window.innerWidth * 0.9;
    //     this.paperHeight = window.innerHeight * 0.9;
    // });
})