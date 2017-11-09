//INSPIRATION FOR THE ASSIGMENT AND ORIGINAL CODE PROPETY OF Bouncyballs.org CAN BE FOUND ON https://bouncyballs.org
	
//THIS CREATES THE MAIN STAGE AND THE RULOS AROUND THAT STAGE LIKE MOUSE MOVEMENT AND GRAB ELEMENTS
    var Stage = (function() {
        var Stage = {},
            init = false,
            enabled = false,
            stage;
        function Pointer(size) {
            this.x = 0;
            this.y = 0;
            this.dx = 0;
            this.dy = 0;
            this.offsetX = 0;
            this.offsetY = 0;
            this.down = false;
            this.size = 120;
        }
        Pointer.prototype.move = function(x, y) {
            this.dx = x - this.x;
            this.dy = y - this.y;
            this.x = x;
            this.y = y;
        };
        Pointer.prototype.setOffset = function(offsetX, offsetY, angle) {
            var a = angle / 180 * Math.PI,
                sa = Math.sin(a),
                ca = Math.cos(a);
            this.offsetX = ca * offsetX - sa * offsetY;
            this.offsetY = sa * offsetX + ca * offsetY;
        };
        Pointer.prototype.updateSize = function() {
            this.size = Stage.getSquareSize() < 600 ? 50 : 120;
        };
        Stage.pointer = new Pointer();
        function onMouseDown(event) {
            Stage.pointer.down = true;
            Stage.pointer.updateSize();
            Engine.bounceBalls(120);
            preventDefault(event);
        }
        function onMouseMove(event) {
            Stage.pointer.move(event.clientX, event.clientY);
        }
        function stopDrag(event) {
            Stage.pointer.down = false;
            Engine.releaseBalls();
        }
        function onTouchStart(event) {
            if (event.touches && event.touches.length === 1) {
                Stage.pointer.down = true;
                Stage.pointer.updateSize();
                Stage.pointer.move(event.touches[0].clientX, event.touches[0].clientY);
            }
            preventDefault(event);
        }
        function onTouchMove(event) {
            if (event.touches && event.touches.length === 1) {
                Stage.pointer.move(event.touches[0].clientX, event.touches[0].clientY);
            }
        }
        Stage.width = 0;
        Stage.height = 0;
        Stage.error = false;
        Stage.getSquareSize = function() {
            return Math.sqrt(Stage.width * Stage.height);
        };
        Stage.swapMode = function(newMode, oldMode) {
            if (stage) {
                stage.classList.remove(oldMode);
                stage.classList.add(newMode);
            }
        };
        Stage.add = function(div) {
            if (stage) {
                stage.appendChild(div);
            }
        };
        Stage.enable = function() {
            if (stage) {
                stage.classList.add('grab');
                enabled = true;
            }
        };
        Stage.isEnabled = function() {
            return enabled;
        };
        Stage.hide = function() {
            if (get) {
                get('.stage').style.display = 'none';
            }
        };
        Stage.init = function() {
            if (init) {
                return;
            }
            init = true;
            stage = get('.stage');
            if (stage) {
                stage.on('mousedown', onMouseDown, false);
                stage.on('mousemove', onMouseMove, false);
                stage.on('mouseup', stopDrag, false);
                stage.on('mouseleave', stopDrag, false);
                stage.on('contextmenu', preventDefault, false);
                stage.on('touchstart', onTouchStart, false);
                stage.on('touchmove', onTouchMove, false);
                stage.on('touchend', stopDrag, false);
                stage.on('touchcancel', stopDrag, false);
            }
        };
        return Stage;
    })();
	
//THIS IS USED AS THE MAIN  GENERATOR THE BALLS SHAPE, FORCES AND GRAVITY      

    var Ball = (function() {

        function Ball(x, y, px, py, radius, id) {
            this.x = x;
            this.y = y;
            this.px = px;
            this.py = py;
            this.radius = radius;
            this.overlap = 0;
            this.id = id;
            this.draggable = false;
            this.drag = false;
            this.roll = false;
            this.angle = 0;
            this.el = null;
        }
        function onMouseDown(event) {
            if (event) {
                if (this.draggable) {
                    this.drag = true;
                    Stage.pointer.setOffset((event.offsetX || event.layerX) + parseFloat(this.el.style.left), (event.offsetY || event.layerY) + parseFloat(this.el.style.top), this.angle);
                } else {
                    Engine.popBubble(this);
                }
                stopImmediatePropagation(event);
            }
        }
        function onTouchStart(event) {
            if (event) {
                if (event.touches && event.touches.length === 1) {
                    this.drag = true;
                    var x = event.touches[0].clientX;
                    var y = event.touches[0].clientY;
                    Stage.pointer.x = x;
                    Stage.pointer.y = y;
                    Stage.pointer.setOffset(x - this.x, y - this.y, 0);
                }
                preventDefault(event);
                stopImmediatePropagation(event);
            }
        }
        function initElement(ball) {
            var el = document.createElement('div');
            el.onScope(ball, 'mousedown', onMouseDown);
            el.onScope(ball, 'mouseup', ball.release);
            el.onScope(ball, 'touchstart', onTouchStart);
            el.onScope(ball, 'touchend', ball.release);
            el.onScope(ball, 'touchcancel', ball.release);
            return el;
        }
        Ball.prototype.setRadius = function(radius) {
            this.radius = radius;
            var r = radius + this.overlap;
            this.el.style.width = this.el.style.height = (r * 2) + 'px';
            this.el.style.left = this.el.style.top = (-r) + 'px';
        };
        Ball.prototype.setMode = function(mode) {
            this.el = this.el || initElement(this);
            this.el.innerHTML = '';
            this.el.style.backgroundPosition = '';
            this.el.className = 'ball';
            this.roll = false;
            this.drag = false;
            this.draggable = true;
            this.angle = 0;
            this.overlap = 0;
            switch (mode) {
            case 'emoji':
                this.el.style.backgroundPosition = (this.id % 6) * 20 + '% ' + (Math.floor(this.id / 6) % 6) * 20 + '%';
                this.roll = true;
                this.overlap = Math.round(this.radius / 10);
                break;

            }
            this.setRadius(this.radius);
            this.move();
        };
        Ball.prototype.force = function(fx, fy) {
            this.x += fx;
            this.y += fy;
            if (this.roll) {
                this.angle += (this.x - this.px) / this.radius * 36;
            }
            var x = this.x * 2 - this.px;
            var y = this.y * 2 - this.py;
            this.px = this.x;
            this.py = this.y;
            this.x = x;
            this.y = y;
        };
        Ball.prototype.release = function() {
            if (this.drag) {
                this.drag = false;
                this.px = this.x - Stage.pointer.dx * 0.3;
                this.py = this.y - Stage.pointer.dy * 0.3;
            }
        };
        Ball.prototype.move = function(angle) {
            var transform = 'translate3d(' + this.x + 'px,' + this.y + 'px,0)';
            if (!this.roll) {
                this.angle = angle;
            }
            if (this.angle) {
                transform += 'rotateZ(' + this.angle + 'deg)';
            }
            this.el.style.webkitTransform = this.el.style.transform = transform;
        };
        return Ball;
    })();
	
// THIS VARIABLE CREATE THE BACKGROUND IN THE SCENE
    
    var Background = (function() {
        var Background = {},
            init = false,
            backgrounds;
        function onBackgroundSwapped() {
            backgrounds[1].className = 'bg';
            backgrounds[1].hide();
        }
        Background.show = function(mode, swap) {
            backgrounds[0].classList.add(mode);
            backgrounds[1].classList.add('fade');
            backgrounds[1].style.opacity = 0;
            if (!swap) {
                onBackgroundSwapped();
            }
        };
        Background.init = function() {
            if (init) {
                return;
            }
            init = true;
            backgrounds = getAll('.bg');
            backgrounds[1].on('transitionend', onBackgroundSwapped, false);
        };
        return Background;
    })();
	
//THIS IS THE MAIN ENGINE THAT CALL ALL THE FUNCTIONS TO INTERACT WITH EACH OTHER
    
    var Engine = (function() {
        var Engine = {},
            init = false,
            useFloor = true,
            updateID,
            mode,
            modeNext,
            balls = [],
            size = {
                min: 0,
                max: 0
            },
            magnitude,
            speed,
            elasticity = 1,
            tick = 0,
            fps = 0,
            total = 0,
            totalNext = 0,
            MIN = 25,
            MAX = 250,
            DAMPING = 0.8,
            ACCURACY = 3;
        function setMode(newMode, drop) {
            Stage.swapMode(newMode, mode);
            Background.show(newMode, drop);
            mode = newMode;
            addBalls(drop);
            useFloor = true;
            Menu.enable();
            Menu.setMode(newMode);
        }
        
        function setSpeed(value) {
            speed = value;
            magnitude = Math.pow(speed / ACCURACY, 2);
        }
        Engine.swapMode = function(value) {
            if (mode && useFloor) {
                Engine.bounceBalls(20 * Device.getGravity());
                modeNext = value;
                totalNext = 0;
                useFloor = Device.isMobile;
                Background.swap(mode);
                if (Device.isMobile) {
                    setTimeout(setMode, 20, value, true);
                }
            } else
                setMode(value, false);
        };
        
        
        function resolveCollisions() {
            for (var i = total; i--;) {
                var b1 = balls[i],
                    dx,
                    dy,
                    dist,
                    distEdge;
                if (Stage.pointer.down) {
                    dx = b1.x - Stage.pointer.x;
                    dy = b1.y - Stage.pointer.y;
                    dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist > 0) {
                        distEdge = dist - b1.radius - Stage.pointer.size;
                        if (distEdge < 0) {
                            b1.x -= dx * distEdge / dist / 2;
                            b1.y -= dy * distEdge / dist / 2;
                        }
                    } else {
                        b1.x += Math.random();
                        b1.y -= Math.random();
                    }
                }
                for (var j = total; j--;) {
                    if (j !== i) {
                        var b2 = balls[j];
                        dx = b1.x - b2.x;
                        dy = b1.y - b2.y;
                        dist = Math.sqrt(dx * dx + dy * dy);
                        if (dist > 0) {
                            distEdge = dist - b1.radius - b2.radius;
                            if (distEdge < 0) {
                                var bx = dx * distEdge / dist / 2;
                                var by = dy * distEdge / dist / 2;
                                b1.x -= bx;
                                b1.y -= by;
                                b2.x += bx;
                                b2.y += by;
                            }
                        } else {
                            b1.x += Math.random();
                            b1.y -= Math.random();
                        }
                    }
                }
            }
        }
 
//THIS FUNCTION IS USED TO LIMIT THE BOUNDARIES OF THE EDGES OF THE SCREEN     
        function checkWalls() {
            var upsideDown = Device.getGravity() < 0,
                dropped = 0;
            for (var i = total; i--;) {
                var ball = balls[i];
                if (ball && !ball.drag) {
                    var vx = ball.px - ball.x,
                        vy = ball.py - ball.y;
                    if (ball.x < ball.radius) {
                        ball.x = ball.radius;
                        ball.px = ball.x - vx * DAMPING;
                    } else if (ball.x > Stage.width - ball.radius) {
                        ball.x = Stage.width - ball.radius;
                        ball.px = ball.x - vx * DAMPING;
                    }
                    if ((Device.isMobile || upsideDown) && ball.y < ball.radius) {
                        if (useFloor) {
                            ball.y = ball.radius;
                            ball.py = ball.y - vy * DAMPING;
                        } else if (ball.y < ball.radius * -2) {
                            dropped++;
                        }
                    } else if (ball.y < Stage.height * -2 - ball.radius) {
                        ball.y = Stage.height * -2 - ball.radius;
                        ball.py = ball.y - vy * DAMPING;
                    } else if ((Device.isMobile || !upsideDown) && ball.y > Stage.height - ball.radius) {
                        if (useFloor) {
                            ball.y = Stage.height - ball.radius;
                            ball.py = ball.y - vy * DAMPING;
                        } else if (ball.y > Stage.height + ball.radius * 2) {
                            dropped++;
                        }
                    } else if (ball.y > Stage.height * 3 - ball.radius) {
                        ball.y = Stage.height * 3 - ball.radius;
                    }
                }
            }
            if (!useFloor && dropped > total - 1) {
                setMode(modeNext, true);
            }
        }

 //THIS SET OF FUNCTIONS INITIALIZE AND CONTROL THE BALLS SHAPE, AMOUNT, ELASTICITY AND BOUNCE      
        function initBalls() {
            for (var i = MAX; i--;) {
                var ball = new Ball(-200, -200, -200, -200, 50, balls.length);
                ball.setMode(mode);
                balls.push(ball);
                Stage.add(ball.el);
            }
        }
        

        
        function addBall(n, radius, drop) {
            drop = drop && !Device.isMobile;
            var attempt = 50;
            while (attempt) {
                var x = Math.random() * (Stage.width - radius * 2) + radius,
                    y = Math.random() * (Stage.height * (drop ? 2 : 1) - radius * 2) + radius;
                if (drop) {
                    y += Stage.height * (Device.getGravity() < 0 ? 1 : -2);
                }
                if (testOverlap(x, y, radius) || Intro.hitTest(x, y, radius)) {
                    attempt--;
                } else {
                    var ball = balls[n];
                    if (ball) {
                        ball.x = x;
                        ball.y = y;
                        ball.px = x + (Math.random() - 0.5) * 2 * speed;
                        ball.py = y + (Math.random() - 0.5) * speed;
                        ball.setRadius(radius);
                        ball.setMode(mode);
                    }
                    return true;
                }
            }
            return false;
        }
        function clampTotal(value) {
            return Math.ceil(Math.clamp(value, MIN, getMax()));
        }
        function getMax() {
            return Math.clamp(Math.ceil(Stage.getSquareSize() / 120) * 25 - MIN, MIN * 2, MAX);
        }
        function addBalls(drop) {
            if (totalNext) {
                total = clampTotal(totalNext);
            }
            var stageSize = Math.ceil(Stage.getSquareSize()),
                pow = 3,
                n = 0,
                i;
            switch (mode) {
            case 'emoji':
                if (!totalNext) {
                    total = clampTotal(stageSize < 800 ? 36 : stageSize / 16);
                }
                size.min = size.max = stageSize < 800 ? 22 : 28;
                Device.setGravity(1.5);
                break;
            }
            for (i = MAX; i--;) {
                hideBall(i);
            }
            for (i = MAX; i--;) {
                if (i < total) {
                    var radius = Math.pow(i, pow) / (Math.pow(total, pow) / (size.max - size.min)) + size.min;
                    if (addBall(n, radius, drop)) {
                        n++;
                    } else {
                        total--;
                    }
                }
            }
            Menu.setTotal(total, getMax());
        }
        Engine.setTotal = function(value) {
            Engine.swapMode(mode);
            totalNext = value;
        };
        Engine.setElasticity = function(value) {
            elasticity = Math.clamp(value, 0.2, 2);
        };
        
        function forceBalls() {
            var o = Device.getForces(Microphone.isOn() ? 0 : window.orientation);
            for (var i = total; i--;) {
                var ball = balls[i];
                if (ball) {
                    if (ball.drag) {
                        ball.x = Stage.pointer.x - Stage.pointer.offsetX;
                        ball.y = Stage.pointer.y - Stage.pointer.offsetY;
                    } else {
                        ball.force(o.x * magnitude, o.y * magnitude);
                    }
                }
            }
        }
        
        function moveBalls() {
            var roll = Device.getRoll(Microphone.isOn() ? 0 : window.orientation);
            for (var i = total; i--;) {
                var ball = balls[i];
                if (ball) {
                    ball.move(roll);
                }
            }
        }
        
        Engine.bounceBalls = function(fy) {
            if (!fy || !useFloor) {
                return;
            }
            fy = Math.abs(fy) / speed * magnitude * elasticity;
            for (var i = total; i--;) {
                var ball = balls[i];
                if (ball) {
                    if (Device.getGravity() < 0 && ball.y < ball.radius * 2) {
                        ball.force(0, fy + Math.random());
                    } else if (ball.y > Stage.height - ball.radius * 2) {
                        ball.force(0, -fy - Math.random());
                    }
                }
            }
        };
        
        Engine.fitBalls = function() {
            if (!Stage.error && Stage.width && Stage.height) {
                var dy = (window.innerHeight - Stage.height) || 0,
                    dx = (window.innerWidth - Stage.width) || 0,
                    ball;
                for (var i = total; i--;) {
                    ball = balls[i];
                    if (ball) {
                        if (Stage.isEnabled()) {
                            if (dx < 0 || dy < 0) {
                                ball.x += dx;
                                ball.y += dy;
                            }
                        } else {
                            ball.x += dx / 2;
                            ball.y += dy / 2;
                        }
                    }
                }
                for (i = ACCURACY; i--;) {
                    resolveCollisions();
                    checkWalls();
                }
                for (i = total; i--;) {
                    ball = balls[i];
                    if (ball) {
                        ball.px = ball.x;
                        ball.py = ball.y;
                    }
                }
                moveBalls();
                Menu.setTotal(total, getMax());
                Menu.setElasticity(elasticity);
            }
        };
        
        Engine.releaseBalls = function() {
            for (var i = total; i--;) {
                var ball = balls[i];
                if (ball) {
                    ball.release();
                }
            }
        };

	
    
//THIS FUNCTION CREATE A INTRO CODE TO START THE ANIMATION OF BALLS FALLING
	
    var Intro = (function() {
        var Intro = {},
        
        Intro.hitTest = function(x, y) {
            if (Stage.isEnabled() || Stage.width < 601 || Stage.height < 481) {
                return false;
            }
            var introX = Stage.width / 2,
                introY = Stage.height / 2,
                introWidth = 380,
                introHeight = 190;
            if (x > introX - introWidth && x < introX + introWidth && y > introY - introHeight && y < introY + introHeight) {
                return true;
            }
            return false;
        };

        
        return Intro;
    })();
	
// THIS FUNCTION INITIALIZE THE ENGINE WITH THE DINAMICS AND THE BALL GENERATION
    function init() {
        if (Device.init()) {
            Stage.init();
            Menu.init();
            Engine.init('emoji');
			Engine.play();
            return true;
        } 
    }
    if (on) {
        on('DOMContentLoaded', function(event) {
            if (window.innerWidth) {
                if (init()) {
                    window.onload = Engine.init;
                }
            } 
        });
    }

})();

