/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _interopRequireDefault = __webpack_require__(1)['default'];

	var _controllerRenderer = __webpack_require__(2);

	var _controllerRenderer2 = _interopRequireDefault(_controllerRenderer);

	var renderer = new _controllerRenderer2['default']();

	renderer.appendToElement(document.body);

	renderer.start();

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";

	exports["default"] = function (obj) {
	  return obj && obj.__esModule ? obj : {
	    "default": obj
	  };
	};

	exports.__esModule = true;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = __webpack_require__(3)['default'];

	var _classCallCheck = __webpack_require__(7)['default'];

	var _interopRequireDefault = __webpack_require__(1)['default'];

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _modelsPlayer = __webpack_require__(8);

	var _modelsPlayer2 = _interopRequireDefault(_modelsPlayer);

	var _modelsBall = __webpack_require__(9);

	var _modelsBall2 = _interopRequireDefault(_modelsBall);

	var _modelsPlayfield = __webpack_require__(10);

	var _modelsPlayfield2 = _interopRequireDefault(_modelsPlayfield);

	var _controllerAi = __webpack_require__(11);

	var _controllerAi2 = _interopRequireDefault(_controllerAi);

	var _controllerKeyboardinput = __webpack_require__(12);

	var _controllerKeyboardinput2 = _interopRequireDefault(_controllerKeyboardinput);

	var Renderer = (function () {
	    function Renderer() {
	        _classCallCheck(this, Renderer);

	        this._ctx = null;
	        this._lastRenderTime = null;

	        this.playField = new _modelsPlayfield2['default'](800, 600);
	        this.player1 = new _modelsPlayer2['default'](10, 270, 10, 60);
	        this.player2 = new _modelsPlayer2['default'](780, 270, 10, 60);
	        this.ball = new _modelsBall2['default'](400, 300, 5);

	        var player1KeyBoardInput = new _controllerKeyboardinput2['default'](this.player1);
	        var player2AI = new _controllerAi2['default'](this.player2, this.ball);

	        player1KeyBoardInput.apply();
	        player2AI.apply();
	    }

	    _createClass(Renderer, [{
	        key: 'appendToElement',
	        value: function appendToElement(aElement) {
	            var canvas = this.playField.getCanvasElement();

	            aElement.appendChild(canvas);

	            this._ctx = canvas.getContext('2d');
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            this.playField.render(this._ctx);
	            this.ball.render(this._ctx);
	            this.player1.render(this._ctx);
	            this.player2.render(this._ctx);

	            this._lastRenderTime = new Date().valueOf();
	        }
	    }, {
	        key: 'recalculateBall',
	        value: function recalculateBall(aTimeSinceLastFrame) {
	            var ball = this.ball;
	            var player1 = this.player1;
	            var player2 = this.player2;
	            var playField = this.playField;

	            var currentBallPosition = [ball.x, ball.y];
	            var ballPositionTransformation = ball.direction.map(function (aDirection) {
	                return aDirection * ball.speed * aTimeSinceLastFrame;
	            });
	            var nextEstimatedBallPosition = [currentBallPosition[0] + ballPositionTransformation[0], currentBallPosition[1] + ballPositionTransformation[1]];
	            var ballHitsPlayer = nextEstimatedBallPosition[0] < player1.x + player1.width || nextEstimatedBallPosition[0] > player2.x;
	            var ballHitsBorders = nextEstimatedBallPosition[1] < ball.radius || nextEstimatedBallPosition[1] > playField.height - ball.radius;

	            ball.speed = ball.speed + 0.000025 * aTimeSinceLastFrame;

	            if (ballHitsPlayer) {
	                (function () {
	                    var tmp = 0;

	                    if (nextEstimatedBallPosition[0] < player1.x + player1.width) {
	                        tmp = currentBallPosition[0] * ball.speed / (player1.x + player1.width);

	                        if (nextEstimatedBallPosition[1] < player1.y - ball.radius || nextEstimatedBallPosition[1] > player1.y + player1.height + ball.radius) {
	                            ball.speed = 0.3;
	                            ball.direction = [1, 0];
	                            currentBallPosition = [400, 300];
	                            tmp = 0;
	                        } else {
	                            ball.direction[1] = ball.direction[1] + player1.speed * player1.direction[1];
	                        }
	                    } else {
	                        tmp = currentBallPosition[0] * ball.speed / player2.x;

	                        if (nextEstimatedBallPosition[1] < player2.y - ball.radius || nextEstimatedBallPosition[1] > player2.y + player2.height + ball.radius) {
	                            ball.speed = 0.3;
	                            ball.direction = [-1, 0];
	                            currentBallPosition = [400, 300];
	                            tmp = 0;
	                        } else {
	                            ball.direction[1] = ball.direction[1] + player1.speed * player1.direction[1];
	                        }
	                    }

	                    ballPositionTransformation = ball.direction.map(function (aDirection) {
	                        return aDirection * ball.speed * tmp;
	                    });

	                    ball.direction[0] = -1 * ball.direction[0];
	                })();
	            }

	            if (ballHitsBorders) {
	                (function () {
	                    var tmp = 0;

	                    if (nextEstimatedBallPosition[1] < 0) {
	                        tmp = currentBallPosition[1] * ball.speed / ball.radius;
	                    } else {
	                        tmp = currentBallPosition[1] * ball.speed / (playField.height - ball.radius);
	                    }

	                    ballPositionTransformation = ball.direction.map(function (aDirection) {
	                        return aDirection * ball.speed * tmp;
	                    });

	                    ball.direction[1] = -1 * ball.direction[1];
	                })();
	            }

	            ball.x = currentBallPosition[0] + ballPositionTransformation[0];
	            ball.y = currentBallPosition[1] + ballPositionTransformation[1];
	        }
	    }, {
	        key: 'recalculatePlayer',
	        value: function recalculatePlayer(aTimeSinceLastFrame, aPlayer) {
	            var playField = this.playField;
	            var currentPosition = [aPlayer.x, aPlayer.y];
	            var playerTransformation = aPlayer.direction.map(function (aDirection) {
	                return aDirection * aPlayer.speed * aTimeSinceLastFrame;
	            });
	            var nextPosition = [currentPosition[0] + playerTransformation[0], currentPosition[1] + playerTransformation[1]];

	            if (nextPosition[1] < 0) {
	                nextPosition[1] = 0;
	            } else if (nextPosition[1] + aPlayer.height > playField.height) {
	                nextPosition[1] = playField.height - aPlayer.height;
	            }

	            aPlayer.x = nextPosition[0];
	            aPlayer.y = nextPosition[1];
	        }
	    }, {
	        key: 'loop',
	        value: function loop() {
	            if (this._lastRenderTime === null) {
	                this.render();
	            }
	            var timeSinceLastFrame = new Date().valueOf() - this._lastRenderTime;

	            this.recalculatePlayer(timeSinceLastFrame, this.player1);
	            this.recalculatePlayer(timeSinceLastFrame, this.player2);
	            this.recalculateBall(timeSinceLastFrame);
	            this.render();

	            window.requestAnimationFrame(this.loop.bind(this));
	        }
	    }, {
	        key: 'start',
	        value: function start() {
	            window.requestAnimationFrame(this.loop.bind(this));
	        }
	    }]);

	    return Renderer;
	})();

	exports['default'] = Renderer;
	module.exports = exports['default'];

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _Object$defineProperty = __webpack_require__(4)["default"];

	exports["default"] = (function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];
	      descriptor.enumerable = descriptor.enumerable || false;
	      descriptor.configurable = true;
	      if ("value" in descriptor) descriptor.writable = true;

	      _Object$defineProperty(target, descriptor.key, descriptor);
	    }
	  }

	  return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);
	    if (staticProps) defineProperties(Constructor, staticProps);
	    return Constructor;
	  };
	})();

	exports.__esModule = true;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	module.exports = { "default": __webpack_require__(5), __esModule: true };

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var $ = __webpack_require__(6);
	module.exports = function defineProperty(it, key, desc) {
	  return $.setDesc(it, key, desc);
	};

/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";

	var $Object = Object;
	module.exports = {
	  create: $Object.create,
	  getProto: $Object.getPrototypeOf,
	  isEnum: ({}).propertyIsEnumerable,
	  getDesc: $Object.getOwnPropertyDescriptor,
	  setDesc: $Object.defineProperty,
	  setDescs: $Object.defineProperties,
	  getKeys: $Object.keys,
	  getNames: $Object.getOwnPropertyNames,
	  getSymbols: $Object.getOwnPropertySymbols,
	  each: [].forEach
	};

/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";

	exports["default"] = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

	exports.__esModule = true;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = __webpack_require__(3)['default'];

	var _classCallCheck = __webpack_require__(7)['default'];

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var Player = (function () {
	    function Player(aX, aY, aWidth, aHeight) {
	        _classCallCheck(this, Player);

	        this.x = aX;
	        this.y = aY;
	        this.width = aWidth;
	        this.height = aHeight;

	        this.color = '#ff0000';

	        this.speed = 0.2;
	        this.direction = [0, 0];
	    }

	    _createClass(Player, [{
	        key: 'render',
	        value: function render(aCtx) {
	            if (!aCtx) {
	                return;
	            }

	            aCtx.fillStyle = this.color;
	            aCtx.fillRect(this.x, this.y, this.width, this.height);
	        }
	    }]);

	    return Player;
	})();

	exports['default'] = Player;
	module.exports = exports['default'];

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = __webpack_require__(3)['default'];

	var _classCallCheck = __webpack_require__(7)['default'];

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var Ball = (function () {
	    function Ball(aX, aY, aRadius) {
	        _classCallCheck(this, Ball);

	        this.x = aX;
	        this.y = aY;
	        this.radius = aRadius;

	        this.color = '#0000ff';

	        this.speed = 0.3;
	        this.direction = [-1, 0];
	    }

	    _createClass(Ball, [{
	        key: 'render',
	        value: function render(aCtx) {
	            if (!aCtx) {
	                return;
	            }

	            aCtx.fillStyle = this.color;

	            aCtx.beginPath();
	            aCtx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
	            aCtx.fill();
	        }
	    }]);

	    return Ball;
	})();

	exports['default'] = Ball;
	module.exports = exports['default'];

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = __webpack_require__(3)['default'];

	var _classCallCheck = __webpack_require__(7)['default'];

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var PlayField = (function () {
	    function PlayField(aWidth, aHeight) {
	        _classCallCheck(this, PlayField);

	        this.width = aWidth;
	        this.height = aHeight;

	        this.color = '#aaaaaa';
	    }

	    _createClass(PlayField, [{
	        key: 'getCanvasElement',
	        value: function getCanvasElement() {
	            var canvasElement = document.createElement('canvas');

	            canvasElement.setAttribute('height', this.height);
	            canvasElement.setAttribute('width', this.width);

	            return canvasElement;
	        }
	    }, {
	        key: 'render',
	        value: function render(aCtx) {
	            if (!aCtx) {
	                return;
	            }

	            aCtx.fillStyle = this.color;
	            aCtx.fillRect(0, 0, this.width, this.height);
	        }
	    }]);

	    return PlayField;
	})();

	exports['default'] = PlayField;
	module.exports = exports['default'];

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = __webpack_require__(3)["default"];

	var _classCallCheck = __webpack_require__(7)["default"];

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var AI = (function () {
	    function AI(aPlayer, aBall) {
	        _classCallCheck(this, AI);

	        this.player = aPlayer;
	        this.ball = aBall;
	        this.intervalPointer = null;
	    }

	    _createClass(AI, [{
	        key: "apply",
	        value: function apply() {
	            var _this = this;

	            this.intervalPointer = window.setInterval(function () {
	                _this.player.speed = 0.3;
	                if (_this.ball.y > _this.player.y + _this.player.height - _this.ball.radius) {
	                    _this.player.direction[1] = 1;
	                } else if (_this.ball.y < _this.player.y - _this.ball.radius) {
	                    _this.player.direction[1] = -1;
	                } else {
	                    _this.player.direction[1] = 0;
	                }
	            }, 25);
	        }
	    }]);

	    return AI;
	})();

	exports["default"] = AI;
	module.exports = exports["default"];

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = __webpack_require__(3)['default'];

	var _classCallCheck = __webpack_require__(7)['default'];

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var KeyboardInput = (function () {
	    function KeyboardInput(aPlayer) {
	        _classCallCheck(this, KeyboardInput);

	        this.player = aPlayer;
	    }

	    _createClass(KeyboardInput, [{
	        key: 'handleKeyDown',
	        value: function handleKeyDown(aEvent) {
	            if (aEvent.keyCode === 38) {
	                this.player.speed = 0.2;
	                this.player.direction[1] = -1;
	            }

	            if (aEvent.keyCode === 40) {
	                this.player.speed = 0.2;
	                this.player.direction[1] = 1;
	            }
	        }
	    }, {
	        key: 'handleKeyUp',
	        value: function handleKeyUp(aEvent) {
	            if (aEvent.keyCode === 38 || aEvent.keyCode === 40) {
	                this.player.speed = 0;
	                this.player.direction[1] = 0;
	            }
	        }
	    }, {
	        key: 'apply',
	        value: function apply() {
	            document.body.addEventListener('keydown', this.handleKeyDown.bind(this));
	            document.body.addEventListener('keyup', this.handleKeyUp.bind(this));
	        }
	    }]);

	    return KeyboardInput;
	})();

	exports['default'] = KeyboardInput;
	module.exports = exports['default'];

/***/ }
/******/ ]);