import { randomNumber, isDOM, stringToHTML } from "../functions";

class InstagramIcon {

    static iconCssClass = "octo-instagram-icon"
    static allIcons = new Map();
    icon = document.querySelector( ".octo-instagram-icon" );
    
    size = 500;
    animationState = true;
    
    middleRingleCircles = [];
    static middleRingRelativeX = 0.5;
    static middleRingRelativeY = 0.5;
    static middleRingMinRelativeRadius = 0.166;
    static middleRingMaxRelativeRadius = 0.258;
    middleRingAccelerationX = 0.05;
    middleRingAccelerationY = 0.05;
    middleRingCirclesCount = 20;
    middleRingContextProperties = {
        strokeStyle: "rgba(255,255,255,0.8)",
        lineWidth: 2,
    };


    upRightCircleCircles = [];
    upRightCircleMinRelativeRadius = 0;
    upRightCircleMaxRelativeRadius = 0.062;
    upRightCircleRelativeX = 1 - 0.232;
    upRightCircleRelativeY = 0.232;
    upRightCircleAccelerationX = 0.025;
    upRightCircleAccelerationY = 0.025;
    upRightCircleCirclesCount = 20;
    upRightCircleContextProperties = {
        strokeStyle: "rgba(255,255,255,0.8)",
        lineWidth: 2,
    };


    outerCircles = [];
    borderMinRelativeRadius = 0;
    borderMaxRelativeRadius = 0.09;
    borderRelativeDistance = 0.5;
    borderRelativeSecondaryDistance = 0.152;
    borderCirclesCount = 350;
    borderAccelerationX = 0.05;
    borderAccelerationY = 0.05;
    borderContextProperties = {
        strokeStyle: "rgba(255,255,255, .8)",
        lineWidth: 2,
    };
    static borderSvgMask = `<svg class="${ InstagramIcon.iconCssClass }__mask" xmlns="http://www.w3.org/2000/svg" height="0" width="0">

        <clipPath id="instagram-border-mask" clipPathUnits="objectBoundingBox">
        <path d="M.921,32.119a.3.3,0,0,0-.081-.21.3.3,0,0,0-.209-.081c-.083,0-.33,0-.412,0a.3.3,0,0,0-.209.081.3.3,0,0,0-.081.21c0,.083,0,.33,0,.413a.3.3,0,0,0,.081.21.3.3,0,0,0,.209.081c.083,0,.33,0,.412,0a.3.3,0,0,0,.209-.081.3.3,0,0,0,.081-.21C.926,32.449.926,32.2.921,32.119Zm-.107.5a.169.169,0,0,1-.1.1,1.1,1.1,0,0,1-.295.02,1.11,1.11,0,0,1-.295-.02.169.169,0,0,1-.1-.1,2.174,2.174,0,0,1,0-.59.169.169,0,0,1,.1-.1,1.1,1.1,0,0,1,.295-.02,1.11,1.11,0,0,1,.295.02.169.169,0,0,1,.1.1,1.1,1.1,0,0,1,.02.295A1.1,1.1,0,0,1,.815,32.62Z" transform="translate(0.075 -31.825)"/>
        </clipPath>
    
    </svg>`;


    constructor( htmlIcon = false ) {

        if( htmlIcon && isDOM( htmlIcon ) ) {
            this.icon = htmlIcon
        }


        const { icon } = this

        
        /** Checking if the Icon Isn't already Animatable */

        if( InstagramIcon.allIcons.has( icon ) ) { 
            return null;
        }
        InstagramIcon.allIcons.set( icon, this );


        /** Setting Size */

        let htmlIconSize = icon.getAttribute( "size" );
        
        if( htmlIcon !== null && ( htmlIconSize = Math.trunc( htmlIconSize ) ) != NaN && htmlIconSize > 0 ) {
            this.size = htmlIconSize;
        } 
        
    
        /** Generating Necessary Html Elements */
    
        const { size } = this;

        let innerCanvas = document.createElement( 'canvas' );

        innerCanvas.classList.add( `${ InstagramIcon.iconCssClass }__inner` );

        innerCanvas.setAttribute( "height", size );
        innerCanvas.setAttribute( "width", size );

        this.innerCanvas = innerCanvas;

        icon.appendChild( this.innerCanvas );


        let outerCanvas = document.createElement( 'canvas' );

        outerCanvas.classList.add( `${ InstagramIcon.iconCssClass }__outer` );

        outerCanvas.setAttribute( "height", size );
        outerCanvas.setAttribute( "width", size );

        this.outerCanvas = outerCanvas;

        icon.appendChild( this.outerCanvas );

        this.draw();

    }

    animate() {

        
        let drawArrayOfCircles = ( circle, context ) => {

            let boundaries;

            context.beginPath();
            context.arc( circle.x, circle.y, circle.r, 0, 2 * Math.PI );
            context.closePath();
            context.stroke();

            circle.x += circle.ax;
            circle.y += circle.ay;

            if( typeof circle.boundaries != 'object' ) {

                boundaries = {
                    x : circle.boundaries,
                    y : circle.boundaries
                }

            } else {
                boundaries = circle.boundaries;
            }

            if( circle.x > circle.refX + boundaries.x || circle.x < circle.refX - boundaries.x ) {
                circle.ax = -circle.ax;
            }

            if( circle.y > circle.refY + boundaries.y || circle.y < circle.refY - boundaries.y ) {
                circle.ay = -circle.ay;
            }


        };



        const { 
            innerContext,
            size,
            middleRingContextProperties,
            middleRingleCircles,
        } = this;

        innerContext.clearRect( 0, 0, size, size);
        Object.assign( innerContext, middleRingContextProperties );
        middleRingleCircles.forEach( (circle) => drawArrayOfCircles( circle, innerContext ) );

        
        const { 
            upRightCircleContextProperties,
            upRightCircleCircles,
        } = this;

        Object.assign( innerContext, upRightCircleContextProperties );
        upRightCircleCircles.forEach( (circle) => drawArrayOfCircles( circle, innerContext ) );
        

        const {
            outerContext,
            borderContextProperties,
        } = this;

        outerContext.clearRect( 0, 0, size, size);
        Object.assign( outerContext, borderContextProperties );
        this.outerCircles.forEach( (circle) => drawArrayOfCircles( circle, outerContext ) );

        if( this.animationState ) {
            requestAnimationFrame( () => this.animate() );
        }

    }

    draw() {

        this.middleRingleCircles = [];
        this.upRightCircleCircles = [];
        this.outerCircles = [];
    

        const { 
            size,
            middleRingAccelerationX,
            middleRingAccelerationY,
            middleRingCirclesCount,
        } = this;

        const {
            middleRingRelativeX,
            middleRingRelativeY,
            middleRingMinRelativeRadius,
            middleRingMaxRelativeRadius,
        } = InstagramIcon;

        
        /** Generating Middle Ring Circles */

        const   middleRingMaxRaduis = size * middleRingMaxRelativeRadius,
                middleRingMinRaduis = size * middleRingMinRelativeRadius,
                middleRingCenterX = size * middleRingRelativeX,
                middleRingCenterY = size * middleRingRelativeY;

        for( let i = 0; i < middleRingCirclesCount; i++ ) {


            let randomCircleRaduis = randomNumber( middleRingMinRaduis, middleRingMaxRaduis );
            let boundaries = Math.min( randomCircleRaduis - middleRingMinRaduis, middleRingMaxRaduis - randomCircleRaduis );    

            let positioningX = randomNumber( -boundaries, boundaries );
            let positioningY = randomNumber( -boundaries, boundaries );

            this.middleRingleCircles.push({

                refX: middleRingCenterX,
                refY: middleRingCenterY,
                x: middleRingCenterX + positioningX,
                y: middleRingCenterY + positioningY,
                r: randomCircleRaduis,
                ax: randomNumber( -middleRingAccelerationX, middleRingAccelerationX ),
                ay: randomNumber( -middleRingAccelerationY, middleRingAccelerationY ),
                boundaries,

            });



        }


        /** Generating Up right circle circles */

        const {
            upRightCircleRelativeX,
            upRightCircleRelativeY,
            upRightCircleMinRelativeRadius,
            upRightCircleMaxRelativeRadius,
            upRightCircleCirclesCount,
            upRightCircleAccelerationX,
            upRightCircleAccelerationY,
        } = this;

        const   upRightMinRadius = upRightCircleMinRelativeRadius * size,
                upRightMaxRadius = upRightCircleMaxRelativeRadius * size,
                upRightCenterX = upRightCircleRelativeX * size,
                upRightCenterY = upRightCircleRelativeY * size;


        for( let i = 0; i < upRightCircleCirclesCount; i++ ) {

            let randomCircleRaduis = randomNumber( upRightMinRadius, upRightMaxRadius );
            let boundaries = upRightMaxRadius - randomCircleRaduis;

            let positioningX = randomNumber( -boundaries, boundaries );
            let positioningY = randomNumber( -boundaries, boundaries );

            this.upRightCircleCircles.push({

                refX: upRightCenterX,
                refY: upRightCenterY,
                x: upRightCenterX + positioningX,
                y: upRightCenterY + positioningY,
                r: randomCircleRaduis,
                ax: randomNumber( -upRightCircleAccelerationX, upRightCircleAccelerationX ),
                ay: randomNumber( -upRightCircleAccelerationY, upRightCircleAccelerationY ),
                boundaries,

            });

        }



        /** Generating Border Circles */

        const {
            borderMinRelativeRadius,
            borderMaxRelativeRadius,
            borderRelativeDistance,
            borderRelativeSecondaryDistance,
            borderAccelerationX,
            borderAccelerationY,
        } = this;

        const   borderMinRadius = size * borderMinRelativeRadius ,
                borderMaxRadius = size * borderMaxRelativeRadius;


        for( let i = 0; i < 250; i++ ) {


            let side = parseInt( i / ( 250 / 4 ) );
            let refX = borderRelativeSecondaryDistance;
            let refY = borderRelativeDistance;
            
           
            
            let randomCircleRaduis = randomNumber( borderMinRadius, borderMaxRadius );


            switch( side ) {

                case 0:

                    refX = borderRelativeSecondaryDistance;
                    refY = borderRelativeDistance;
    
                break;
                
                case 1:

                    refX = borderRelativeDistance;
                    refY = borderRelativeSecondaryDistance;
    
                break;

                
                case 2:

                    refX = ( 1 - borderRelativeSecondaryDistance );
                    refY = borderRelativeDistance;
    
                break;

                case 3:
                
                    refX = borderRelativeDistance;
                    refY = ( 1 - borderRelativeSecondaryDistance );

                break;


            }


            let boundariesX = ( refX == borderRelativeDistance ? refX : borderRelativeSecondaryDistance ) * size - randomCircleRaduis;
            let boundariesY = ( refY == borderRelativeDistance ? refY : borderRelativeSecondaryDistance ) * size - randomCircleRaduis;
            let positioningX = randomNumber( -boundariesX, boundariesX );
            let positioningY = randomNumber( -boundariesY, boundariesY );

            refX *= size;
            refY *= size;


            

            this.outerCircles.push({

                refX,
                refY,
                x: refX + positioningX,
                y: refY + positioningY,
                r: randomCircleRaduis,
                ax: randomNumber( -borderAccelerationX, borderAccelerationX ),
                ay: randomNumber( -borderAccelerationY, borderAccelerationY ),
                boundaries: {
                    x: boundariesX,
                    y: boundariesY,
                }


            });



        }


        this.animate();


    }

    pauseAnimation() {
        this.animationState = false;
    }

    resumeAnimation() {   
        this.animationState = true;
        this.animate();

    }

    get innerContext() {

        return this.innerCanvas.getContext( "2d" );

    }
    
    get outerContext() {

        return this.outerCanvas.getContext( "2d" );

    }

    static refreshNodes() {

        let nodes = [ ...document.querySelectorAll( `.${InstagramIcon.iconCssClass}` ) ];

        return nodes.map( (element) => new InstagramIcon( element ) );

    }

    static getInstance( htmlIcon = false ) {

        return InstagramIcon.allIcons.get( htmlIcon );

    }

    static init() {
        
        if( document.readyState == "loading" ) {
            document.addEventListener( "DOMContentLoaded", InstagramIcon.init );
            return;
        }

        let svgMask = stringToHTML( InstagramIcon.borderSvgMask )?.firstChild;

        document.body.appendChild( svgMask );

        InstagramIcon.refreshNodes();

    }

}


InstagramIcon.init();

export default InstagramIcon;


