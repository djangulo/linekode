import './../sass/services.sass'

import Snap from 'imports-loader?this=>window,fix=>module.exports=0!snapsvg/dist/snap.svg-min.js';

// import $ from 'jquery';

let ColorPalette = {
    init: function(name) {
        this.name = name || "";
        this.palette = {
            screen: "lightgrey",
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
    screen: "lightgrey",
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
    screen: "lightgrey",
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
    screen: "lightgrey",
    primaryn: "#795548",
    primaryl: "#D7CCC8",
    primaryd: "#5D4037",
    accentn: "#FF5722",
    accentl: "#FF2C0C",
    accentd: "#FFCDBD",
    textl: "#212121",
    textd: "#757575"
});
let indigoPink = Object.create(ColorPalette)
indigoPink.init('Indigo Pink');
indigoPink.set({
    screen: "lightgrey",
    primaryn: "#3F51B5",
    primaryl: "#C5CAE9",
    primaryd: "#303F9F",
    accentn: "#FF4081",
    accentl: "#FFC6D9",
    accentd: "#FF1C51",
    textl: "#212121",
    textd: "#757575"
});
let palettes = [amberGreen, blueGrayPurple, brownOrange, indigoPink]



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
            stroke: config.stroke || "transparent",
            strokeWidth: config.strokeWidth || 0,
            fill: config.fill || "#000",
            width: config.width || 100,
            height: config.height || 100,
            r: config.r || 20,
            rx: config.rx || 10,
            ry: config.ry || 10,
            animationDelay: config.animationDelay || 0,
            lineSpacing: config.lineSpacing || 1,
            lineCount: config.lineCount || 1,
            lineDirection: config.lineDirection || 'vertical',
            lineSwitch: config.lineSwitch || false,
            text: config.text || '',
            fontSize: config.fontSize || 8,
            fontFamily: config.fontFamily || 'open-sans'
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
        if (this._.self[0].type === 'rect' || this._.self[0].type === 'text') {
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
    moveAbsolute: function($x, $y) {
        // Moves the rectangle and its shadow $x units to the right
        // and $y units down. Use negative numbers for moving left
        // and up.
        self = this;
        if (this._.self[0].type === 'rect' || this._.self[0].type === 'text') {
            this._.set.forEach(function(e) {
                if (e.hasClass('svg-rect-shadow')) {
                    e.attr({
                        x: $x + self._.shadowOffset.x,
                        y: $y + self._.shadowOffset.y
                    })
                } else {
                    e.attr({
                        x: $x,
                        y: $y
                    })
                }
            });
            return
        } else if (this._.self[0].type === 'circle') {
            this._.set.forEach(function(e) {
                if (e.hasClass('svg-circle-shadow')) {
                    e.attr({
                        cx: $x + self._.shadowOffset.x,
                        cy: $y + self._.shadowOffset.y
                    })
                } else {
                    e.attr({
                        cx: $x,
                        cy: $y
                    })
                }
            });
            return
        } else {
            return false
        }
        this._.x = $x;
        this._.y = $y;
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
    recolor: function(fill=null, shadowFill=null) {
        if (fill !== null) {
            this._.set.forEach(function(e) {
                if ( !( e.hasClass('svg-rect-shadow') || e.hasClass('svg-circle-shadow') ) ) {
                    e.attr({fill: fill})
                }
            })
        }
        if (shadowFill !== null) {
            this._.set.forEach(function(e) {
                if ( !( e.hasClass('svg-rect-shadow') || e.hasClass('svg-circle-shadow') ) ) {
                    e.attr({fill: shadowFill})
                }
            })
        }
    },
    restroke: function(fill=null, width=null) {
        if (fill !== null) {
            this._.set.forEach(function(e) {
                if ( !( e.hasClass('svg-rect-shadow') || e.hasClass('svg-circle-shadow') ) ) {
                    e.attr({stroke: fill});
                }
            })
        }
        if (width !== null) {
            this._.set.forEach(function(e) {
                if ( !( e.hasClass('svg-rect-shadow') || e.hasClass('svg-circle-shadow') ) ) {
                    e.attr({strokeWidth: width});
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
    changeText: function(text) {
        if (this._.self[0].type === 'text') {
            this._.set.forEach(function(e) {
                e.attr({text: text});
            })
        }
    },
    animOff: function() {
        this._.set.forEach(function(e) {
            e.removeClass('hover-animation');
        })
    },
    destroy: function() {
        if (this._.self[0].type === 'rect') {
            this._.set.animate({x: 2000}, 500, mina.easeinout, () => {
                setTimeout(() => {this._.self.remove()}, 500)
            })
        } else if (this._.self[0].type === 'text') {
            this._.set.animate({x: 2000}, 500, mina.easeinout, () => {
                setTimeout(() => {this._.self.remove()}, 500)
            })
        } else if (this._.self[0].type === 'circle') {
            this._.set.animate({cx: 2000}, 500, mina.easeinout, () => {
                setTimeout(() => {this._.self.remove()}, 500)
            })
        }
    }
}
let RealText = Object.create(Shape);
RealText.build = function() {
    if(this._.paper !== null) {
        let fg = this._.paper.text(
            this._.x - 2000,
            this._.y,
            this._.text
        ).attr({
            'font-size': this._.fontSize,
            'font-family': this._.fontFamily,
            fill: this._.fill
        }).addClass('svg-text');
        window.text = fg;
        this._.self.add(fg);
        this._.set.push(fg);
        fg.animate({x: this._.x}, 500, mina.easeinout)
    }
}

let RealTextSmall = Object.create(Shape);
RealTextSmall.build = function() {
    if(this._.paper) {
        let fg = this._.paper.text(
            this._.x - 2000,
            this._.y,
            this._.text
        ).attr({
            'font-size': this._.fontSize,
            'font-family': this._.fontFamily,
            fill: this._.fill
        }).addClass('svg-text-small');
        this._.self.add(fg);
        this._.set.push(fg);
        fg.animate({x: this._.x}, 500, mina.easeinout)
    }
}
let Rectangle = Object.create(Shape);
Rectangle.build = function() {
    if (this._.paper) {
        if (this._.shadow) {
            let bg = this._.paper.rect(
                this._.x + this._.shadowOffset.x - 2000,
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
            bg.animate({x: this._.x + this._.shadowOffset.x}, 500, mina.easeinout)
        }
        let fg = this._.paper.rect(
            this._.x - 1000,
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
        if (this._.strokeWidth > 0) {
            fg.attr({
                stroke: this._.stroke,
                strokeWidth: this._.strokeWidth
            })
        }
        this._.self.add(fg)
        this._.set.push(fg)
        fg.animate({x: this._.x}, 500, mina.easeinout)
    }
    return true;
}
let Circle = Object.create(Shape)
Circle.build = function() {
    if (this._.paper) {
        if (this._.shadow) {
            let bg = this._.paper.circle(
                this._.x + this._.shadowOffset.x - 2000,
                this._.y + this._.shadowOffset.y,
                this._.r)
                .attr(
                    {
                    fill: this._.shadowFill,
                }
            ).addClass('svg-circle-shadow');
            this._.self.add(bg)
            this._.set.push(bg)
            bg.animate({x: this._.x + this._.shadowOffset.x}, 500, mina.easeinout)
        }
        let fg = this._.paper.circle(
            this._.x - 2000,
            this._.y,
            this._.r)
            .attr(
                {
                fill: this._.fill,
            }
        ).addClass('svg-circle');
        this._.self.add(fg)
        this._.set.push(fg)
        bg.animate({x: this._.x}, 500, mina.easeinout)
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
                    line = this._.paper.rect(
                        this._.x - 2000,
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
                } else {
                    if (this._.lineSwitch) {
                        if (i % 2 == 0 ) {
                            line = this._.paper.rect(
                                this._.x - 2000,
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
                        } else {
                            
                            line = this._.paper.rect(
                                this._.x - 2000,
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
                        }
                    } else {
                        line = this._.paper.rect(
                            this._.x - 2000,
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
                }
            } else if(this._.lineDirection == 'horizontal') {
                if(this._.shadow && i === 0){
                    line = this._.paper.rect(
                        this._.x - 2000,
                        this._.y,
                        this._.width,
                        this._.height)
                        .attr(
                            {
                            fill: this._.shadowFill,
                            rx: this._.rx,
                            ry: this._.ry
                        }
                    ).addClass('svg-mock-text-title')
                } else {
                    line = this._.paper.rect(
                        this._.x + (this._.lineSpacing * i) - 2000,
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
            }
            this._.self.add(line)
            this._.set.push(line)
            if (this._.lineDirection == 'vertical') {
                line.animate({x: this._.x}, 500, mina.easeinout)
            } else if (this._.lineDirection == 'horizontal') {
                line.animate({x: this._.x + (this._.lineSpacing * i)}, 500, mina.easeinout)
            }
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

// BlogConfig:
// - header banner
// - nav bottom right
// - textarea
// - aside with picture
var blogViewConfig = {
    desktop: function(paper){
        const width = parseFloat(paper.attr('width'));
        const height = parseFloat(paper.attr('height'));
        return {
            screen: {
                parent: Rectangle,
                x: width * 0.03,
                y: height * 0.03,
                shadow: true,
                fill: 'screen',
                width: width * 0.94,
                height: height * 0.94,
                animationDelay: 0
            },
            banner: {
                parent: Rectangle,
                x: width * 0.055,
                y: height * 0.0375,
                shadow: true,
                fill: 'primaryn',
                width: width * 0.89,
                height: height * 0.16,
                animationDelay: 0.1
            },
            bannerText: {
                parent: RealText,
                x: width * 0.11,
                y: height * 0.15,
                text: "Blog",
                fill: 'accentn',
                animationDelay: 0.1,
                fontSize: 100,
                fontFamily: 'Verdana'
            },
            bannerNav: {
                parent: MockText,
                x: width * 0.61,
                y: height * 0.16,
                fill: 'primaryl',
                shadow: false,
                lineDirection: 'horizontal',
                lineCount: 4,
                width: width * 0.07,
                height: height * 0.012,
                lineSpacing: width * 0.075,
                animationDelay: 0.1,
                rx: 5,
                ry: 5
            },
            textArea: {
                parent: Rectangle,
                x: width * 0.055,
                y: height * 0.22,
                fill: 'accentl',
                shadow: true,
                width: width * 0.65,
                height: height * 0.7,
                animationDelay: 0.3,
            },
            lines1: {
                parent: MockText,
                x: width * 0.065,
                y: height * 0.24,
                fill: 'textd',
                shadow: true,
                shadowFill: 'accentn',
                lineCount: 7,
                lineSwitch: true,
                width: width * 0.6,
                height: height * 0.014,
                lineSpacing: height * 0.045,
                animationDelay: 0.3,
                rx: 5,
                ry: 5
            },
            lines2: {
                parent: MockText,
                x: width * 0.065,
                y: height * 0.58,
                fill: 'textd',
                shadow: true,
                shadowFill: 'accentn',
                lineCount: 7,
                lineSwitch: true,
                width: width * 0.6,
                height: height * 0.014,
                lineSpacing: height * 0.045,
                animationDelay: 0.3,
                rx: 5,
                ry: 5
            },
            aside: {
                parent: Rectangle,
                x: width * 0.73,
                y: height * 0.22,
                fill: 'accentl',
                shadow: true,
                width: width * 0.216,
                height: height * 0.7,
                animationDelay: 0.5,
            },
            asidePicture: {
                parent: Rectangle,
                x: width * 0.74,
                y: height * 0.23,
                fill: 'accentd',
                shadow: true,
                width: width * 0.193,
                height: height * 0.18,
                animationDelay: 0.5,
            },
            asideText: {
                parent: MockText,
                x: width * 0.74,
                y: height * 0.45,
                fill: 'textd',
                lineCount: 23,
                lineSwitch: true,
                width: width * 0.193,
                height: height * 0.005,
                lineSpacing: height * 0.02,
                animationDelay: 0.3,
                rx: 6,
                ry: 6
            }
        }
    },
    mobile: function(paper){
        let width;
        if (parseFloat(paper.attr('width')) > 520) {
            width = 520;
        } else {
            width = parseFloat(paper.attr('width'));
        }
        width = parseFloat(paper.attr('width')) * 0.5;
        const height = parseFloat(paper.attr('height'));
        return {
            screen: {
                parent: Rectangle,
                x: width * 0.03,
                y: height * 0.03,
                shadow: true,
                fill: 'screen',
                width: width * 0.94,
                height: height * 0.94,
                animationDelay: 0
            },
            banner: {
                parent: Rectangle,
                x: width * 0.055,
                y: height * 0.0375,
                shadow: true,
                fill: 'primaryn',
                width: width * 0.89,
                height: height * 0.16,
                animationDelay: 0.1
            },
            bannerText: {
                parent: RealText,
                x: width * 0.11,
                y: height * 0.13,
                text: "Blog",
                fill: 'accentn',
                animationDelay: 0.1,
                fontSize: 100,
                fontFamily: 'Verdana'
            },
            bannerTextSmall: {
                parent: RealTextSmall,
                x: width * 0.38,
                y: height * 0.18,
                text: "mobile",
                fill: 'accentn',
                animationDelay: 0.1,
                fontSize: 100,
                fontFamily: 'Verdana'
            },
            navBox: {
                parent: Rectangle,
                x: width * 0.85,
                y: height * 0.12,
                fill: 'accentd',
                shadow: false,
                stroke: "accentd",
                strokeWidth: 2,
                width: width * 0.07,
                height: height * 0.06,
                animationDelay: 0.1,
            },
            bannerNav: {
                parent: MockText,
                x: width * 0.86,
                y: height * 0.13,
                fill: 'primaryl',
                shadow: false,
                lineDirection: 'vertical',
                lineCount: 3,
                width: width * 0.05,
                height: height * 0.0075,
                lineSpacing: height * 0.015,
                animationDelay: 0.1,
                rx: 5,
                ry: 5
            },
            textArea: {
                parent: Rectangle,
                x: width * 0.055,
                y: height * 0.22,
                fill: 'accentl',
                shadow: true,
                width: width * 0.89,
                height: height * 0.7,
                animationDelay: 0.3,
            },
            lines1: {
                parent: MockText,
                x: width * 0.065,
                y: height * 0.24,
                fill: 'textd',
                shadow: true,
                shadowFill: 'accentn',
                lineCount: 7,
                lineSwitch: true,
                width: width * 0.84,
                height: height * 0.014,
                lineSpacing: height * 0.045,
                animationDelay: 0.3,
                rx: 5,
                ry: 5
            },
            lines2: {
                parent: MockText,
                x: width * 0.065,
                y: height * 0.58,
                fill: 'textd',
                shadow: true,
                shadowFill: 'accentn',
                lineCount: 7,
                lineSwitch: true,
                width:width * 0.84,
                height: height * 0.014,
                lineSpacing: height * 0.045,
                animationDelay: 0.3,
                rx: 5,
                ry: 5
            }
        }
    }
}
// CatalogueConfig:
// - header banner
// - big picture in center
//      - pictures scrolling right to left
//      - thumbnails below big picture
var galleryViewConfig = {
    desktop: function(paper){
        const width = parseFloat(paper.attr('width'));
        const height = parseFloat(paper.attr('height'));
        return {
            screen: {
                parent: Rectangle,
                x: width * 0.03,
                y: height * 0.03,
                shadow: true,
                fill: 'screen',
                width: width * 0.94,
                height: height * 0.94,
                animationDelay: 0
            },
            banner: {
                parent: Rectangle,
                x: width * 0.055,
                y: height * 0.0375,
                shadow: true,
                fill: 'primaryn',
                width: width * 0.89,
                height: height * 0.16,
                animationDelay: 0.1
            },
            bannerText: {
                parent: RealText,
                x: width * 0.11,
                y: height * 0.15,
                text: "Picture",
                fill: 'accentn',
                animationDelay: 0.1,
                fontSize: 100,
                fontFamily: 'Verdana'
            },
            bannerTextSmall: {
                parent: RealTextSmall,
                x: width * 0.38,
                y: height * 0.18,
                text: "gallery",
                fill: 'accentn',
                animationDelay: 0.1,
                fontSize: 100,
                fontFamily: 'Verdana'
            },
            bannerNav: {
                parent: MockText,
                x: width * 0.61,
                y: height * 0.16,
                fill: 'primaryl',
                shadow: false,
                lineDirection: 'horizontal',
                lineCount: 4,
                width: width * 0.07,
                height: height * 0.012,
                lineSpacing: width * 0.075,
                animationDelay: 0.1,
                rx: 5,
                ry: 5
            },
            pictureArea: {
                parent: Rectangle,
                x: width * 0.055,
                y: height * 0.22,
                fill: 'accentl',
                shadow: true,
                width: width * 0.89,
                height: height * 0.5,
                animationDelay: 0.3,
            },
            aside: {
                parent: Rectangle,
                x: width * 0.055,
                y: height * 0.75,
                fill: 'accentl',
                shadow: true,
                width: width * 0.89,
                height: 120,
                animationDelay: 0.5,
            },
            bigPicture: {
                parent: Rectangle,
                x: width * 0.2,
                y: height * 0.25,
                fill: 'primaryn',
                shadow: true,
                width: width * 0.6,
                height: height * 0.45,
                animationDelay: 0.3,
            },
            asidePicture1: {
                parent: MockText,
                x: width * 0.07,
                y: height * 0.768,
                fill: 'accentd',
                shadow: true,
                shadowFill: 'primaryn',
                lineDirection: 'horizontal',
                lineCount: 4,
                lineSpacing: width * 0.22,
                width: width * 0.2,
                height: height * 0.15,
                animationDelay: 0.5
            }
        }
    },
    mobile: function(paper){
        let width;
        if (parseFloat(paper.attr('width')) > 520) {
            width = 520;
        } else {
            width = parseFloat(paper.attr('width'));
        }
        width = parseFloat(paper.attr('width')) * 0.5;
        const height = parseFloat(paper.attr('height'));
        return {
            screen: {
                parent: Rectangle,
                x: width * 0.03,
                y: height * 0.03,
                shadow: true,
                fill: 'screen',
                width: width * 0.94,
                height: height * 0.94,
                animationDelay: 0
            },
            banner: {
                parent: Rectangle,
                x: width * 0.055,
                y: height * 0.0375,
                shadow: true,
                fill: 'primaryn',
                width: width * 0.89,
                height: height * 0.12,
                animationDelay: 0.1
            },
            bannerText: {
                parent: RealText,
                x: width * 0.11,
                y: height * 0.115,
                text: "Gallery",
                fill: 'accentn',
                animationDelay: 0.1,
                fontSize: 100,
                fontFamily: 'Verdana'
            },
            bannerTextSmall: {
                parent: RealTextSmall,
                x: width * 0.38,
                y: height * 0.155,
                text: "mobile",
                fill: 'accentn',
                animationDelay: 0.1,
                fontSize: 100,
                fontFamily: 'Verdana'
            },
            navBox: {
                parent: Rectangle,
                x: width * 0.85,
                y: height * 0.09,
                fill: 'accentd',
                shadow: false,
                stroke: "accentd",
                strokeWidth: 2,
                width: width * 0.07,
                height: height * 0.06,
                animationDelay: 0.1,
            },
            bannerNav: {
                parent: MockText,
                x: width * 0.86,
                y: height * 0.1,
                fill: 'primaryl',
                shadow: false,
                lineDirection: 'vertical',
                lineCount: 3,
                width: width * 0.05,
                height: height * 0.0075,
                lineSpacing: height * 0.015,
                animationDelay: 0.1,
                rx: 5,
                ry: 5
            },
            pictureArea: {
                parent: Rectangle,
                x: width * 0.055,
                y: height * 0.18,
                fill: 'accentl',
                shadow: true,
                width: width * 0.89,
                height: height * 0.5,
                animationDelay: 0.3,
            },
            aside: {
                parent: Rectangle,
                x: width * 0.055,
                y: height * 0.71,
                fill: 'accentl',
                shadow: true,
                width: width * 0.89,
                height: 120,
                animationDelay: 0.5,
            },
            bigPicture: {
                parent: Rectangle,
                x: width * 0.065,
                y: height * 0.20,
                fill: 'primaryn',
                shadow: true,
                width: width * 0.86,
                height: height * 0.45,
                animationDelay: 0.3,
            },
            asidePictures: {
                parent: MockText,
                x: width * 0.07,
                y: height * 0.728,
                fill: 'accentd',
                shadow: true,
                shadowFill: 'primaryn',
                lineDirection: 'horizontal',
                lineCount: 4,
                lineSpacing: width * 0.22,
                width: width * 0.2,
                height: height * 0.15,
                animationDelay: 0.5
            }
        }
    }
}

let viewManager = {
    currentPalette: palettes[0],
    init: function(config) {
        this.objects = {};
        this.currentConfig = config;
        for (let obj in config) {
            if (obj !== 'objectSet') {
                this.objects[obj] = Object.create(config[obj].parent)
            }
        }
    },
    build: function(paper) {
        this.paper = paper;
        for (let obj in this.currentConfig) {
            if (obj !== 'objectSet') {
                this.objects[obj].init(paper, this.currentConfig[obj]);
                this.objects[obj].build();
                this.objects[obj].animOn();
            }
        }
        this.recolor();
    },
    recolor: function() {
        // recolors based on the objectSet passed; options are:
        // - blog
        // - gallery
        // - ecommerce
        // - webapp
        let fill, shadowFill;
        for (let obj in this.objects) {
            try { fill = this.currentConfig[obj].fill;
            } catch (e) { fill = undefined; }

            try { shadowFill = this.currentConfig[obj].shadowFill
            } catch (e) { shadowFill = undefined; }

            if (fill !== undefined && shadowFill !== undefined) {
                this.objects[obj].recolor(
                    this.currentPalette.get(fill),
                    this.currentPalette.get(shadowFill)
                )
            } else if (fill !== undefined && shadowFill === undefined) {
                this.objects[obj].recolor(
                    this.currentPalette.get(fill)
                )
            } else if (fill === undefined && shadowFill !== undefined) {
                this.objects[obj].recolor(
                    null,
                    this.currentPalette.get(shadowFill)
                )
            }
        }
    },
    reshape: function(config) {
        setTimeout(() => {
            for (let obj in this.objects) {
                this.objects[obj].destroy()
            }
        }, 1000)
        setTimeout(() => {
            for (let obj in config) {
                this.objects[obj] = Object.create(config[obj].parent)
                this.objects[obj].init(this.paper, config[obj])
                this.objects[obj].build()
                this.objects[obj].animOn()
            }
            this.recolor()
        }, 1000)
        this.currentConfig = config;
        // this.recolor();
    }
}
document.addEventListener("DOMContentLoaded", function() {
    // console.log('Initializing "paper" with w: ' + paperWidth + ', h: ' + paperHeight)
    // const $paper = Snap('#services-svg').attr({
    //     width: 1000,
    //     height: 800
    // });
    const $paper = Snap(window.innerWidth * 0.9, window.innerHeight * 0.9)
    viewManager.init(galleryViewConfig.mobile($paper));
    viewManager.build($paper);
    // let i;
    // // setInterval(() => {viewManager.reshape(blogViewConfig)}, 3000);
    
    // // setInterval(() => {
    // //     i = palettes.indexOf(viewManager.currentPalette);
    // //     if ((i+1) == palettes.length) {
    // //         viewManager.currentPalette = palettes[0];
    // //     } else {
    // //         viewManager.currentPalette = palettes[i + 1];
    // //     }
    // //     viewManager.recolor();
    // // }, 2500)
    let j = 0;
    let confs = [
        blogViewConfig.desktop($paper),
        blogViewConfig.mobile($paper),
        galleryViewConfig.desktop($paper),
        galleryViewConfig.mobile($paper)
    ]
    setInterval(() => {
        if ((j+1) == confs.length) {
            viewManager.reshape(confs[0]);
            j = 0;
        } else {
            viewManager.reshape(confs[j + 1]);
            j += 1;
        }
    }, 5000)
    
    // $(window).resize(function(){
    //     this.paperWidth = window.innerWidth * 0.9;
    //     this.paperHeight = window.innerHeight * 0.9;
    // });
})