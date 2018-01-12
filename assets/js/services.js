import Snap from 'imports-loader?this=>window,fix=>module.exports=0!snapsvg/dist/snap.svg.js';
import './../sass/services.sass'

import $ from 'jquery';

// Skeleton views for different websites offered

// let Mockup = window.Mockup || {};

// Mockup = (function () {
//     function Mockup ()
// })


const shadowOffset = 15;

// Build a blog, initially, later i can morph into others as needed
// - header banner
// - nav under banner
// - left column
// - social media on right or something

let paperWidth = 1000;
let paperHeight = 1200;
let screenWidth = paperWidth * 2 / 3;
let screenHeight = paperHeight / 2;


const paper = Snap(paperWidth, paperHeight);
let screen = paper.g(
    paper.rect(65, 65, screenWidth, screenHeight).attr({     // shadow
            fill: "rgba(50, 50, 50, 0.2)",
            rx: 10,
            ry: 10
        }),
    paper.rect(50, 50, screenWidth, screenHeight).attr({
            fill: "#E9E9D6",
            rx: 10,
            ry: 10
        })
);


let banner = paper.g(
    paper.rect(
        screen[0].getBBox().x + screenWidth * 0.04,
        screen[0].getBBox().y + screenHeight * 0.03,
        screenWidth * 0.9,
        screenHeight * 0.14
    ).attr({ // shadow
        fill: "rgba(50, 50, 50, 0.2)",
        rx: 10,
        ry: 10
    }), paper.rect(
        screen[1].getBBox().x + screenWidth * 0.04,
        screen[1].getBBox().y + screenHeight * 0.03,
        screenWidth * 0.9,
        screenHeight * 0.14
    ).attr({ //top
        fill: "#389840",
        rx: 10,
        ry: 10
    })
)
let navLinks = {
    desktop: function() {paper.g(
        paper.rect(
            screen[1].getBBox().x + screenWidth * 0.58,
            screen[1].getBBox().y + screenHeight * 0.13,
            screenWidth * 0.07,
            screenHeight * 0.02
        ).attr({"fill": "#C1C7C2", rx: 6, ry: 6}),
        paper.rect(
            screen[1].getBBox().x + screenWidth * 0.66,
            screen[1].getBBox().y + screenHeight * 0.13,
            screenWidth * 0.07,
            screenHeight * 0.02
        ).attr({"fill": "#C1C7C2", rx: 6, ry: 6}),
        paper.rect(
            screen[1].getBBox().x + screenWidth * 0.74,
            screen[1].getBBox().y + screenHeight * 0.13,
            screenWidth * 0.07,
            screenHeight * 0.02
        ).attr({"fill": "#C1C7C2", rx: 6, ry: 6}),
        paper.rect(
            screen[1].getBBox().x + screenWidth * 0.82,
            screen[1].getBBox().y + screenHeight * 0.13,
            screenWidth * 0.07,
            screenHeight * 0.02
        ).attr({"fill": "#C1C7C2", rx: 6, ry: 6})
    )},
    mobile: function() {paper.g(
        paper.rect(
            screen[1].getBBox().x + screenWidth * 0.82,
            screen[1].getBBox().y + screenHeight * 0.12,
            screenWidth * 0.07,
            screenHeight * 0.04
        ).attr({"fill": "#C1C7C2", rx: 2, ry: 2}),
        paper.g(
            paper.rect(
                screen[1].getBBox().x + screenWidth * 0.835,
                screen[1].getBBox().y + screenHeight * 0.125,
                screenWidth * 0.04,
                screenHeight * 0.008
            ).attr({"fill": "#919191", rx: 2, ry: 2}),
            paper.rect(
                screen[1].getBBox().x + screenWidth * 0.835,
                screen[1].getBBox().y + screenHeight * 0.135,
                screenWidth * 0.04,
                screenHeight * 0.008
            ).attr({"fill": "#919191", rx: 2, ry: 2}),
            paper.rect(
                screen[1].getBBox().x + screenWidth * 0.835,
                screen[1].getBBox().y + screenHeight * 0.145,
                screenWidth * 0.04,
                screenHeight * 0.008
            ).attr({"fill": "#919191", rx: 2, ry: 2}),
        )
    )}
};
if (paperWidth <= 600) {
    banner.append(navLinks.mobile());
} else {
    banner.append(navLinks.desktop());
}

let logo = paper.g(
    paper.rect(
        screen[0].getBBox().x + screenWidth * 0.05,
        screen[0].getBBox().y + screenHeight * 0.05,
        screenWidth * 0.3,
        screenHeight * 0.1
    ).attr({ // shadow
        fill: "rgba(50, 50, 50, 0.2)",
        rx: 10,
        ry: 10
    }), paper.rect(
        screen[1].getBBox().x + screenWidth * 0.05,
        screen[1].getBBox().y + screenHeight * 0.05,
        screenWidth * 0.3,
        screenHeight * 0.1
    ).attr({ //top
        fill: "#95650D",
        rx: 10,
        ry: 10
    })
);
let panel = paper.g(
    paper.rect(
        screen[0].getBBox().x + screenWidth * 0.04,
        screen[0].getBBox().y + screenHeight * 0.2,
        screenWidth * 0.7,
        screenHeight * 0.75
    ).attr({ // shadow
        fill: "rgba(50, 50, 50, 0.2)",
        rx: 10,
        ry: 10
    }), paper.rect(
        screen[1].getBBox().x + screenWidth * 0.04,
        screen[1].getBBox().y + screenHeight * 0.2,
        screenWidth * 0.7,
        screenHeight * 0.75
    ).attr({ //top
        fill: "#E7E7E7",
        rx: 10,
        ry: 10
    }),
    paper.g(
        paper.rect(
            screen[1].getBBox().x + screenWidth * 0.08,
            screen[1].getBBox().y + screenHeight * 0.24 ,
            screenWidth * 0.4,
            screenHeight * 0.04
        ).attr({"fill": "#919191", rx: 6, ry: 6}),
        paper.rect(
            screen[1].getBBox().x + screenWidth * 0.08,
            screen[1].getBBox().y + screenHeight * 0.58,
            screenWidth * 0.4,
            screenHeight * 0.04
        ).attr({"fill": "#919191", rx: 6, ry: 6})
    )
)


for(let i = 0; i < 5; i++) {
    let l;
    if (i % 2 === 0) {
        l = paper.rect(
            screen[1].getBBox().x + screenWidth * 0.08,
            screen[1].getBBox().y + screenHeight * 0.32 + (i * 30),
            screenWidth * 0.55,
            screenHeight * 0.02
        ).attr({"fill": "#C1C7C2", rx: 6, ry: 6});
    } else {
        l = paper.rect(
            screen[1].getBBox().x + screenWidth * 0.08,
            screen[1].getBBox().y + screenHeight * 0.32 + (i * 30),
            screenWidth * 0.62,
            screenHeight * 0.02
        ).attr({"fill": "#C1C7C2", rx: 6, ry: 6});
    }
    panel.append(l);
}

for(let i = 0; i < 5; i++) {
    let l;
    if (i % 2 === 0) {
        l = paper.rect(
            screen[1].getBBox().x + screenWidth * 0.08,
            screen[1].getBBox().y + screenHeight * 0.66 + (i * 30),
            screenWidth * 0.55,
            screenHeight * 0.02
        ).attr({"fill": "#C1C7C2", rx: 6, ry: 6});
    } else {
        l = paper.rect(
            screen[1].getBBox().x + screenWidth * 0.08,
            screen[1].getBBox().y + screenHeight * 0.66 + (i * 30),
            screenWidth * 0.62,
            screenHeight * 0.02
        ).attr({"fill": "#C1C7C2", rx: 6, ry: 6});
    }
    panel.append(l);
}

window.paper = paper;

// let s = Screen.rect(20, 20, 300, 200)

$( document ).ready( function() {
    const $body = $( document.body );
    // $(window).resize(function(){
    //     this.paperWidth = window.innerWidth * 0.9;
    //     this.paperHeight = window.innerHeight * 0.9;
    // });
})