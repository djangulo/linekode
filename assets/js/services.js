import './../sass/services.sass'

import Snap from 'imports-loader?this=>window,fix=>module.exports=0!snapsvg/dist/snap.svg.js';

import $ from 'jquery';

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
    "post-form": './assets/js/post-form.js',
    accentd: "#FFCDBD",
    textl: "#212121",
    textd: "#757575"
});
let indigoPink = Object.create(ColorPalette)
indigoPink.init('Indigo Pink');
indigoPink.set({
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
            stroke: config.stroke || "#000",
            strokeWidth: config.strokeWidth || 1,
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
    recolor: function(color=null, strokeColor=null) {
        if (color !== null) {
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
        this._.set.forEach(function(e) {
            if (e.type === 'circle') {
                e.animate({cx: 1000}, 1000, mina.easeInOut, e.remove);
            }
            if (e.type === 'rect' || e.type === 'text') {
                e.animate({x: 1000}, 500, mina.easeInOut, e.remove)
            }
        })
    }
}
let RealText = Object.create(Shape);
RealText.build = function() {
    if(this._.paper) {
        let fg = Snap().text(
            this._.x,
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
    }
}

let RealTextSmall = Object.create(Shape);
RealTextSmall.build = function() {
    if(this._.paper) {
        let fg = Snap().text(
            this._.x,
            this._.y,
            this._.text
        ).attr({
            'font-size': this._.fontSize,
            'font-family': this._.fontFamily,
            fill: this._.fill
        }).addClass('svg-text-small');
        this._.self.add(fg);
        this._.set.push(fg);
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

// BlogConfig:
// - header banner
// - nav bottom right
// - textarea
// - aside with picture
var blogViewConfig = {
    objectSet: 'blog',
    screen: {
        parent: Rectangle,
        x: 10,
        y: 10,
        shadow: true,
        fill: "lightgrey",
        width: 800,
        height: 600,
        animationDelay: 0
    },
    banner: {
        parent: Rectangle,
        x: 60,
        y: 30,
        shadow: true,
        fill: palettes[0].palette.primaryn,
        width: 700,
        height: 120,
        animationDelay: 0.1
    },
    bannerText: {
        parent: RealText,
        x: 100,
        y: 120,
        text: "Blog",
        fill: palettes[0].palette.accentn,
        animationDelay: 0.1,
        fontSize: 100,
        fontFamily: 'Verdana'
    },
    bannerNav: {
        parent: MockText,
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
        parent: Rectangle,
        x: 60,
        y: 170,
        fill: palettes[0].palette.accentl,
        shadow: true,
        width: 500,
        height: 400,
        animationDelay: 0.3,
    },
    lines1: {
        parent: MockText,
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
        parent: MockText,
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
        parent: Rectangle,
        x: 600,
        y: 170,
        fill: palettes[0].palette.accentl,
        shadow: true,
        width: 160,
        height: 400,
        animationDelay: 0.5,
    },
    asidePicture: {
        parent: Rectangle,
        x: 620,
        y: 180,
        fill: palettes[0].palette.accentd,
        shadow: true,
        width: 120,
        height: 100,
        animationDelay: 0.5,
    },
    asideText: {
        parent: MockText,
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
// CatalogueConfig:
// - header banner
// - big picture in center
//      - pictures scrolling right to left
//      - thumbnails below big picture
var galleryViewConfig = {
    objectSet: 'gallery',
    screen: {
        parent: Rectangle,
        x: 10,
        y: 10,
        shadow: true,
        fill: "lightgrey",
        width: 800,
        height: 600,
        animationDelay: 0
    },
    banner: {
        parent: Rectangle,
        x: 60,
        y: 30,
        shadow: true,
        fill: palettes[0].palette.primaryn,
        width: 700,
        height: 120,
        animationDelay: 0.1
    },
    bannerText: {
        parent: RealText,
        x: 100,
        y: 120,
        text: "Picture",
        fill: palettes[0].palette.accentn,
        animationDelay: 0.1,
        fontSize: 100,
        fontFamily: 'Verdana'
    },
    bannerTextSmall: {
        parent: RealTextSmall,
        x: 240,
        y: 140,
        text: "gallery",
        fill: palettes[0].palette.accentd,
        animationDelay: 0.1,
        fontSize: 50,
        fontFamily: 'Verdana'
    },
    bannerNav: {
        parent: MockText,
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
    pictureArea: {
        parent: Rectangle,
        x: 60,
        y: 170,
        fill: palettes[0].palette.accentl,
        shadow: true,
        width: 700,
        height: 260,
        animationDelay: 0.3,
    },
    aside: {
        parent: Rectangle,
        x: 60,
        y: 450,
        fill: palettes[0].palette.accentl,
        shadow: true,
        width: 700,
        height: 120,
        animationDelay: 0.5,
    },
    asidePicture: {
        parent: Rectangle,
        x: 160,
        y: 180,
        fill: palettes[0].palette.primaryn,
        shadow: true,
        width: 500,
        height: 220,
        animationDelay: 0.3,
    },
    asidePicture1: {
        parent: Rectangle,
        x: 100,
        y: 460,
        fill: palettes[0].palette.primaryn,
        shadow: true,
        width: 140,
        height: 100,
        animationDelay: 0.5,
    },
    asidePicture2: {
        parent: Rectangle,
        x: 260,
        y: 460,
        fill: palettes[0].palette.accentd,
        shadow: true,
        width: 140,
        height: 100,
        animationDelay: 0.5,
    },
    asidePicture3: {
        parent: Rectangle,
        x: 420,
        y: 460,
        fill: palettes[0].palette.accentd,
        shadow: true,
        width: 140,
        height: 100,
        animationDelay: 0.5,
    },
    asidePicture4: {
        parent: Rectangle,
        x: 580,
        y: 460,
        fill: palettes[0].palette.accentd,
        shadow: true,
        width: 140,
        height: 100,
        animationDelay: 0.5,
    },
}

let viewManager = {
    currentPalette: palettes[0],
    currentConfig: {},
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
    },
    _recolor: function(objectSet) {
        // recolors based on the objectSet passed; options are:
        // - blog
        // - gallery
        // - ecommerce
        // - webapp
        this.colors = {
            blog: {
                screen: { fill: "lightgrey" },
                banner: { fill: this.currentPalette.palette.primaryn },
                bannerNav: { fill: this.currentPalette.palette.primaryl },
                bannerText: { fill: this.currentPalette.palette.accentn },
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
            },
            gallery: {
                screen: { fill: "lightgrey" },
                banner: { fill: this.currentPalette.palette.primaryn },
                bannerText: { fill: this.currentPalette.palette.accentn },
                bannerTextSmall: { fill: this.currentPalette.palette.accentd },
                bannerNav: { fill: this.currentPalette.palette.primaryl },
                pictureArea: { fill: this.currentPalette.palette.accentl },
                asidePicture: { fill: this.currentPalette.palette.primaryn },
                aside: { fill: this.currentPalette.palette.accentl },
                asidePicture1: { fill: this.currentPalette.palette.primaryn },
                asidePicture2: { fill: this.currentPalette.palette.accentd },
                asidePicture3: { fill: this.currentPalette.palette.accentd },
                asidePicture4: { fill: this.currentPalette.palette.accentd },
            }
        }
        for (let obj in this.objects) {
            if (obj !== 'objectSet'){
                this.objects[obj].recolor(
                    this.colors[objectSet][obj].fill,
                    this.colors[objectSet][obj].shadowFill
                );
            }
        }
    },
    recolor: function() {
        this._recolor(this.currentConfig.objectSet)
    },
    reshape: function(toConfig) {
        // objectsets:
        // blog:                Gallery
            // screen:              screen
            // banner:              banner
            // bannerNav:           BannerNav
            // bannerText:          BannerText
            //                      BannerTextsmall
            // textArea:            pictureArea
            // lines1:              bigPicture1
            // lines2: 
            // aside:               ASIDE
            // asidePicture:        aside1
            // asideText:           aside2
            //                      aside3
            //                      aside4
        for (let obj in this.currentConfig) {
            if (!(obj in toConfig)) {
                this.objects[obj].destroy();
                delete this.objects[obj]
            } else if (obj in toConfig && obj !== 'objectSet') {
                let self = this;
                    if (self.objects[obj]._.self[0].type === 'rect') {
                        self.objects[obj].resize(
                            toConfig[obj].width,
                            toConfig[obj].height
                        );
                        self.objects[obj].moveAbsolute(
                            toConfig[obj].x,
                            toConfig[obj].y
                        );
                    } else if (self.objects[obj]._.self[0].type === 'text') {
                        self.objects[obj].resize(
                            toConfig[obj].width,
                            toConfig[obj].height
                        );
                        self.objects[obj].moveAbsolute(
                            toConfig[obj].x,
                            toConfig[obj].y
                        );
                        self.objects[obj].changeText(toConfig[obj].text);
                    } else if (self.objects[obj]._.self[0].type === 'circle') {
                        self.objects[obj].resize(
                            toConfig[obj].r
                        );
                        self.objects[obj].moveAbsolute(
                            toConfig[obj].cx,
                            toConfig[obj].cy
                        );
                    }
            }
            for (let obj in toConfig) {
                if (!(obj in this.objects)) {
                    if (obj !== 'objectSet') {
                        this.objects[obj] = Object.create(toConfig[obj].parent);
                        this.objects[obj].init(this.paper, toConfig[obj]);
                        this.objects[obj].build();
                        this.objects[obj].animOn();
                    }
                }
            }
            this.currentConfig = toConfig
        }
    }
}




let paperWidth = 1000;
let paperHeight = 1200;
window.vm = viewManager
window.confs = [blogViewConfig, galleryViewConfig]
$( document ).ready( function() {
    const $body = $( document.body );
    console.log('Initializing "paper" with w: ' + paperWidth + ', h: ' + paperHeight)
    const $paper = Snap('#services-svg').attr({
        width: 1000,
        height: 800
    });
    // window.vm.init(galleryViewConfig);
    // window.vm.build($paper);
    let i;
    // viewManager.reshape(blogViewConfig);
    
    // setInterval(function(){
    //     i = palettes.indexOf(window.vm.currentPalette);
    //     if ((i+1) == palettes.length) {
    //         window.vm.currentPalette = palettes[0];
    //     } else {
    //         window.vm.currentPalette = palettes[i + 1];
    //     }
    //     window.vm.recolor();
    // }, 5000)
    
    let j
    // setInterval(function(){
    //     j = confs.indexOf(window.vm.currentConfig);
    //     if ((j+1) == confs.length) {
    //         window.vm.currentConfig = confs[0];
    //     } else {
    //         window.vm.currentConfig = confs[j + 1];
    //     }
    //     window.vm.reshape(window.vm.currentConfig);
    // }, 5000)
    
    // $(window).resize(function(){
    //     this.paperWidth = window.innerWidth * 0.9;
    //     this.paperHeight = window.innerHeight * 0.9;
    // });
})