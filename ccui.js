if(typeof CCUI === 'undefined') {

var CCUI = {};

// Please note that until we use the real clipboard we simulate the clipboard locally using this variable.
/*string*/ CCUI._clipboardContent = '';

/*
* Functions
*/

// Returns the clipboard's content.
// Please note that until we use the real clipboard we simulate the clipboard locally in CCUI.
/*string*/ CCUI.getClipboardContent = function() {
	return CCUI._clipboardContent;
}

// Sets the clipboard's content.
// Please note that until we use the real clipboard we simulate the clipboard locally in CCUI.
CCUI.setClipboardContent = function(/*string*/ clipboardContent) {
	CCUI._clipboardContent = clipboardContent;
}

// Tells whether the point (x,y) is inside the circle (ox,oy,r) or not.
/*bool*/ CCUI.isInsideCircle = function(/*num*/ x, /*num*/ y, /*num*/ ox, /*num*/ oy, /*num*/ r) {
	var dx = x-ox, dy = y-oy;
	return dx*dx + dy*dy <= r*r; 
}

// Tells whether the point (x,y) is inside the rectangle (x1,y1,x2,y2) or not.
/*bool*/ CCUI.isInsideRect = function(/*num*/ x, /*num*/ y, /*num*/ x1, /*num*/ y1, /*num*/ x2, /*num*/ y2) {
	return x >= x1 && x < x2 && y >= y1 && y < y2;
}

// Tells whether the point (x,y) is inside the rounded rectangle (x1,y1,x2,y2,r) or not.
/*bool*/ CCUI.isInsideRoundedRect = function(/*num*/ x, /*num*/ y, /*num*/ x1, /*num*/ y1, /*num*/ x2, /*num*/ y2, /*num*/ r) {
	if(x2 < x1 || y2 < y1) {
		return false;
	}
	r = Math.min(r, Math.floor((x2 - x1) / 2));
	r = Math.min(r, Math.floor((y2 - y1) / 2));

	var iX1 = x1 + r, iY1 = y1 + r, iX2 = x2 - r, iY2 = y2 - r;
	
	return CCUI.isInsideRect(x, y, x1, iY1, x2, iY2) ||
		CCUI.isInsideRect(x, y, iX1, y1, iX2, y2) ||
		CCUI.isInsideCircle(x, y, iX1, iY1, r) ||
		CCUI.isInsideCircle(x, y, iX2, iY1, r) ||
		CCUI.isInsideCircle(x, y, iX1, iY2, r) ||
		CCUI.isInsideCircle(x, y, iX2, iY2, r);
}

// Logs 'msg' to the console.
CCUI.log = function(/*string*/ msg) {
	console.log(msg);
}

// Creates an array with 'numOfElements' number of elements, each element set to the value: 'initial'.
/*array*/ CCUI.createArray = function(/*int*/ numOfElements, initial) {
	var i, ret = [];
	for(i=0; i<numOfElements; i++) {
		ret.push(initial);
	}
	return ret;
}

// Clones the array 'arr'. It is a shallow copy, so the elements of the array are not cloned.
/*array*/ CCUI.cloneArray = function(/*array*/ arr) {
	var numOfElements = arr.length, i, ret = [];
	for(i=0; i<numOfElements; i++) {
		ret.push(arr[i]);
	}
	return ret;
}

// Returns the index of the first element which equals to 'element' in 'arr'.
// Returns -1 if not found.
/*int*/ CCUI.find = function(/*array*/ arr, element) {
	var length = arr.length, i;
	for(i=0; i<length; i++) {
		if(arr[i] === element) {
			return i;
		}
	}
	return -1;
}

// Removes the first element from 'arr' which equals to 'element' (if found).
/*array*/ CCUI.remove = function(/*array*/ arr, element) {
	var index = CCUI.find(arr, element);
	if(index !== (-1)) {
		arr.splice(index, 1);
	}
	return arr;
}

// Inserts 'what' into 'into' starting at position 'at' and returns the result.
/*string*/ CCUI.stringInsert = function(/*string*/ into, /*int*/ at, /*string*/ what) {
	return into.slice(0, at) + what + into.slice(at, into.length);
}

// Returns a string containing 2 * 'num' spaces.
/*string*/ CCUI.indentation = function(/*int*/ num) {
	var buf = [], i;
	for(i=0; i<num; i++) {
		buf.push('  ');
	}
	return buf.join('');
}

// Converts a string to an integer.
// If 'param' is falsy (e.g. undefined) or a string not containing a valid integer then 'dflt' is returned.
// If 'param' is a string containing a valid integer then that integer is returned.
/*int*/ CCUI.stringToInt = function(/*string*/ param, /*int*/ dflt) {
	if(param) {
		var i = parseInt(param);
		return isNaN(i) ? dflt : i;
	} else {
		return dflt;
	}
}

// Returns a string which is identical to 'str' other than that the first character is made uppercase.
/*string*/ CCUI.firstCharUp = function(/*string*/ str) {
	return (str.length === 0) ? '' : str.charAt(0).toUpperCase() + str.slice(1, str.length);
}

// Gets the 'propertyName' property of 'obj'.
// If there is a getter method it calls that, otherwise directly returns the member named 'propertyName'.
/*any*/ CCUI.getProperty = function(obj, /*string*/ propertyName) {
	var getterMethodName = 'get' + CCUI.firstCharUp(propertyName), getterMethod = obj[getterMethodName];
	if(typeof getterMethod === 'function') {
		return getterMethod.call(obj);
	} else {
		return obj[propertyName];
	}
}

// Sets the 'propertyName' property of 'obj' to the value 'value'.
// If there is a setter method it calls that, otherwise directly sets the member named 'propertyName'.
CCUI.setProperty = function(obj, /*string*/ propertyName, value) {
	var setterMethodName = 'set' + CCUI.firstCharUp(propertyName), setterMethod = obj[setterMethodName];
	if(typeof setterMethod === 'function') {
		setterMethod.call(obj, value);
	} else {
		obj[propertyName] = value;
	}
}


// Returns 'dflt' if 'param' is undefined and returns 'param' otherwise.
// Very handy to implement default function argument values.
/*any*/ CCUI.dflt = function(param, dflt) {
	return (param === undefined) ? dflt : param;
}

// Returns 'min' if 'param' is smaller than 'min', returns 'max' if 'param' is bigger than 'max', and returns 'param' otherwise.
/*num*/ CCUI.clamp = function(/*num*/ param, /*num*/ min, /*num*/ max) {
	if(param < min) return min;
	else if(param > max) return max;
	else return param;
}

// Returns the sum of the elements in 'arr'.
/*num*/ CCUI.sum = function(/*array of num*/ arr) {
	var i, length = arr.length, ret = 0;
	for(i=0; i<length; i++) {
		ret += arr[i];
	}
	return ret;
}

// Tells whether 'a' is bigger than 'b' where 'a' and 'b' are positive numbers or -1, where -1 means positive infinity.
/*bool*/ CCUI.posBigger = function (/*num*/ a, /*num*/ b) {
	if(b === (-1)) {
		return false;
	} else if(a === (-1)) {
		return true;
	} else {
		return a > b;
	}
}

// Returns how much elements are the same at the start of the two arrays.
/*int*/ CCUI.sameStartLength = function(/*array*/ arr1, /*array*/ arr2) {
	var length = Math.min(arr1.length, arr2.length), i;
	for(i=0; i<length; i++) {
		if(arr1[i] !== arr2[i]) {
			return i;
		}
	}
	return length;
}

// Returns whether 'c' is a whitespace character or not.
/*bool*/ CCUI.isWhiteSpace = function(/*char*/ c) {
	return c === ' ' || c === '\t' || c === '\r' || c === '\n';
}

// Returns how much spaces the whitespace character 'c' represent.
// (Tab characters represent 4 spaces.)
/*int*/ CCUI.numOfSpaces = function(/*char*/ c) {
	switch(c) {
	case ' ':
		return 1;
	case '\t':
		return 4;
	default:
		return 0;
	}
}

// Returns the length of 'text' in a way that whitespace characters are counted in according to how much spaces they represent.
// (Tab characters represent 4 spaces.)
/*int*/ CCUI.spacedTextLength = function(/*string*/ text) {
	var textLength = text.length, i, ch, ret = 0;
	for(i=0; i<textLength; i++) {
		ch = text.charAt(i);
		ret += (CCUI.isWhiteSpace(ch) ? CCUI.numOfSpaces(ch) : 1);
	}
	return ret;
}

// Splits 'txt' into an array of strings using 'delimiterChar' as the delimiter character.
// In case of subsequent delimiter characters there will be an emtpy string between them.
// If the first character is a delimiter character, there will be an emtpy string before that, and if the last character is a delimiter
// character, there will be an empty string after that.
/*array of string*/ CCUI.split = function(/*string*/ txt, /*char*/ delimiterChar) {
	var parts = [], txtLength = txt.length, i, ch, lastPartStart = 0;
	if(txtLength === 0) return parts;
	for(i=0; i<txtLength; i++) {
		ch = txt.charAt(i);
		if(ch === delimiterChar) {
			parts.push(txt.slice(lastPartStart, i));
			lastPartStart = i + 1;
		}
	}
	parts.push(txt.slice(lastPartStart, txtLength));
	return parts;
}

// Splits 'txt' into an array of strings using (sequences of) whitespaces as delimiters.
// Returns an empty array if the input text is empty.
// If the text starts or ends with whitespace, it is ignored (only whitespaces between non-whitespaces are considered.)
// Subsequent whitespace characters are considered one whitspace ( which means that no empty strings are created between whitespace characters).
// Returns an array of non-whitespace 'words'.
/*array of string*/ CCUI.whiteSpaceSplit = function(/*string*/ txt) {
	var length = txt.length, i, ch, wasWhiteSpace = true, isWhiteSpace, lastStringStart, ret = [];
	for(i=0; i<length; i++) {
		ch = txt.charAt(i);
		isWhiteSpace = CCUI.isWhiteSpace(ch);
		if(wasWhiteSpace && !isWhiteSpace) {
			lastStringStart = i;
		}
		if(!wasWhiteSpace && isWhiteSpace) {
			ret.push(txt.slice(lastStringStart, i));
		}
		wasWhiteSpace = isWhiteSpace;
	}
	if(!wasWhiteSpace) {
		ret.push(txt.slice(lastStringStart, length));
	}
	return ret;
}

// This function parses (CCUI flavoured) XML from the string 'txt'.
// Returns an array which can contain string-s and XMLElement-s.
// If any error occures during parsing it throws an exception.
//
// What we mean by CCUI flavoured XML:
// - tag names, and attribute names are case sensitive.
// - comments are allowed.
// - processing instructions are allowed although ignored.
// - the following entity references are supported: &amp; &lt; &gt; &quot; &apos;
// - unicode character references are supported.
/*array of (string or XMLElement)*/ CCUI.parseXML = function(/*string*/ txt) {
	var state = 1, isStartTag, elementStack = [], ret = [];
	var length = txt.length, i, ch, lastStringStart = 0, lineNumber = 1;

	var addElement = function(element) {
		if(elementStack.length === 0) {
			ret.push(element);
		} else {
			elementStack[elementStack.length - 1].addChild(element);
		}
	}

	var startElement = function(tagName) {
		var element = new CCUI.XMLElement(tagName);
		addElement(element);
		elementStack.push(element);		
		return element;
	}
	
	var isSpecialChar = function(c) {
		return c === '<' || c === '>' || c === '/' || c === '\"';
	}
	
	var err = function(errTxt) {
		throw {name: 'xml_parse_error', message: "XML syntax error: " + errTxt + " (at line " + lineNumber + ")"}
	}

	var decodeCharRef = function(str) {
		var num = parseInt(str, 10);
		if(isNaN(num)) {
			return '&#' + str + ';'
		} else {
			return String.fromCharCode(num);
		}
	}
	
	var decodeEntity = function(str) {
		switch(str) {
			case 'amp':
				return '&';
			case 'lt':
				return '<';
			case 'gt':
				return '>';
			case 'quot':
				return '\"';
			case 'apos':
				return '\'';
			default:
				return '&' + str + ';';				
		}
	}
	
	var decodeText = function(endIndex) {
	
		var comesAt = function(k, t) {
			var tLength = t.length;
			return k <= endIndex - tLength && txt.slice(k, k + tLength) === t;
		}
	
		var buf = [], j, st = 1, lastStart = lastStringStart, c;
		for(j=lastStringStart; j<endIndex; j++) {
			c = txt.charAt(j);
			switch(st) {
				case 1: // --- normal text
					if(c === '&') {
						st = 2;
						if(lastStart !== j) {
							buf.push(txt.slice(lastStart, j));
						}						
						lastStart = j + 1;
					} else if(comesAt(j, '<?')) {
						state = 4;
						if(lastStart !== j) {
							buf.push(txt.slice(lastStart, j));
						}
						j += 1;
					} else if(comesAt(j, '<!--')) {
						state = 5;
						if(lastStart !== j) {
							buf.push(txt.slice(lastStart, j));
						}
						j += 2;
					}
					break;
				case 2: // --- entity reference
					if(c === '#' && lastStart === j) {
						st = 3;
						lastStart = j + 1;
					} else if(c === ';') {
						st = 1;
						if(lastStart !== j) {
							buf.push(decodeEntity(txt.slice(lastStart, j)));
						}
						lastStart = j + 1;
					}
					break;
				case 3: // --- unicode character reference
					if(c === ';') {
						st = 1;
						if(lastStart !== j) {
							buf.push(decodeCharRef(txt.slice(lastStart, j)));
						}
						lastStart = j + 1;
					}
					break;
				case 4: // --- inside processing instruction
					if(comesAt(j, '?>')) {
						state = 1;
						lastStart = j + 1;
					}
					break;
				case 5: // --- inside comment
					if(comesAt(j, '-->')) {
						state = 1;
						lastStart = j + 1;
					}
					break;					
			}
		}
		switch(st) {
			case 1: // normal text
				if(lastStart < endIndex) {
					buf.push(txt.slice(lastStart, endIndex));
				}
				break;
			case 2: // entity reference
				buf.push('&' + txt.slice(lastStart, endIndex));
				break;
			case 3: // unicode character reference
				buf.push('&#' + txt.slice(lastStart, endIndex));
				break;
		}
		return buf.join('');
	}

	var tagName, attrName, attrValue;

	for(i=0; i<length; i++) {
		ch = txt.charAt(i);
		switch(state) {
		case 1: // ----------------------- outside of tags
			if(ch === '<') {
				state = 2;
				isStartTag = true;
			}
			break;
		case 2: // ----------------------- after a '<' or '</'
			if(isStartTag && ch === '/') {
				isStartTag = false;
				if(i-1 > lastStringStart) {
					addElement(decodeText(i-1));
				}				
			} else if(isStartTag && ch === '?') {
				state = 10;
			} else if(isStartTag && ch === '!') {
				state = 12;
			} else if(CCUI.isWhiteSpace(ch) || isSpecialChar(ch)) {
				err('Invalid character after tag start.');
			} else {
				if(isStartTag && i-1 > lastStringStart) {
					addElement(decodeText(i-1));
				}			
				state = 3;
				lastStringStart = i;
			}
			break;
		case 3: // ----------------------- after a '<' or '</' and non-whitespace non-special characters (characters of the tag name)
			if(ch === '>') {
				tagName = decodeText(i);
				if(isStartTag) { // start tag is closed.
					startElement(tagName);
					lastStringStart = i + 1;
					state = 1;
				} else { // end tag is closed.
					if(elementStack.length > 0 && elementStack[elementStack.length - 1].eName === tagName) {
						elementStack.pop();
						lastStringStart = i + 1;
						state = 1;
					} else {
						err('End tag name does not match start tag name.');
					}
				}
			} else if(ch === '/') {
				if(isStartTag) {
					tagName = decodeText(i);
					startElement(tagName);
					elementStack.pop();
					state = 8;
				} else {
					err('End tag cannot contain a second \"/\" character.');
				}
			} else if(CCUI.isWhiteSpace(ch)) {
				tagName = decodeText(i);
				if(isStartTag) {
					startElement(tagName);
					state = 4;
				} else {
					err('End tag cannot contain white space.');
				}
			} else if(isSpecialChar(ch)) {
				throw err('Unexpected character: \"' + ch + '\"');
			}
			break;
		case 4: // ----------------------- inside a tag
			if(CCUI.isWhiteSpace(ch)) {
				// nothing happens
			} else if(ch === '>') {
				state = 1;
				lastStringStart = i + 1;
			} else if(isSpecialChar(ch)) {
				err('Unexpected character: \"' + ch + '\"');
			} else {
				lastStringStart = i; // the name of an attribute starts here...
				state = 5;
			}
			break;
		case 5: // ----------------------- inside an attribute name
			if(ch === '=') {
				attrName = decodeText(i);
				state = 6;
			} else if(CCUI.isWhiteSpace(ch)) {
				attrName = decodeText(i);
				state = 9;
			} else if(isSpecialChar(ch)) {
				err('Unexpected character: \"' + ch + '\"');
			}
			break;
		case 6: // ----------------------- after '='
			if(ch === '\"') {
				state = 7;
				lastStringStart = i + 1;
			} else if(CCUI.isWhiteSpace(ch)) {
				// Do nothing.
			} else {
				err('Unexpected character: \"' + ch + '\"');
			}
			break;
		case 7: // ----------------------- inside attribute value (after '"')
			if(ch === '\"') {
				attrValue = decodeText(i);
				elementStack[elementStack.length - 1][attrName] = attrValue;
				state = 4;
			}
			break;
		case 8: // ----------------------- after / at the end of the tag...
			if(ch === '>') {
				state = 1;
				lastStringStart = i + 1;
			} else {
				err('Unexpected character: \"' + ch + '\"');
			}
			break;
		case 9: // ------------------------ after attribute name and whitespace(s)
			if(ch === '=') {
				state = 6;
			} else if(CCUI.isWhiteSpace(ch)) {
				// Do nothing
			} else {
				err('Unexpected character: \"' + ch + '\"');
			}
			break;
		case 10: // ---------- inside processing instruction -------------------------
			if(ch === '?') {
				state = 11;
			}
			break;
		case 11: // ---------- inside processing instruction after '?' -------------------------
			if(ch === '?') {
				state = 11;
			} else if(ch === '>') {
				state = 1;
			} else {
				state = 10;
			}
			break;
		case 12: // -------- after '<!' ----------
			if(ch === '-') {
				state = 13;
			} else {
				err('Unexpected character: \"' + ch + '\"');
			}
			break;
		case 13: // --------- after '<!-' --------
			if(ch === '-') {
				state = 14;
			} else {
				err('Unexpected character: \"' + ch + '\"');			
			}
			break;
		case 14: // --------- inside comment --------
			if(ch === '-') {
				state = 15;
			}
			break;
		case 15: // --------- inside comment after '-' --------
			state = (ch === '-') ? 16 : 14;
			break;
		case 16: // --------- inside comment after '--' --------
			state = (ch === '>') ? 1 : 14;
			break;			
		} // end of switch state.
		if(ch === '\n') {
			lineNumber++;
		}
	} // end of for characters in txt.
	if(length > lastStringStart) {
		addElement(decodeText(length));
	}
	if(elementStack.length > 0) {
		err('No end tag found for start tag: \"' + elementStack[elementStack.length - 1].eName + '\"');
	}
	return ret;
}



// This function returns a newly created HSLAColor instance.
// 'h' is the hue represented in degrees (0-360)
// 's' is saturation represented in percentages (0-100)
// 'l' is lightness represented in percentages (0-100)
// 'a' is alpha from 0 to 1
/*HSLAColor*/ CCUI.hsla = function(/*num*/ h, /*num*/ s, /*num*/ l, /*num*/ a) {
	return new CCUI.HSLAColor(h, s, l, a);
}

// This function creates a default doc style injector.
// This injector supports the following XML elements:
// b: bold 
// i: italic
// bigger: makes the font size bigger with what is specified in the XML element's 'diff' attribute (or with 2 if the 'diff' attribute is not specified).
// smaller: makes the font size smaller with what is specified in the XML element's 'diff' attribute (or with 2 if the 'diff' attribute is not specified).
// em: same as i
// cite: same as i
// strong: same as b
//
// After you have created a default doc style injector, you can add additional 'onElement'-s to it using the method 'addOnElement'.
/*SimpleDocStyleInjector*/ CCUI.createDefaultDCI = function() {
	var b = {
		onStart: function(renderCtx) {
			this._savedFontWeight = renderCtx.getFontWeight(); 
			renderCtx.setFontWeight(700);
		},
		onEnd: function(renderCtx) {
			renderCtx.setFontWeight(this._savedFontWeight);
		}	
	};
	var i = {
		onStart: function(renderCtx) {
			this._savedFontStyle = renderCtx.getFontStyle(); 
			renderCtx.setFontStyle('italic');
		},
		onEnd: function(renderCtx) {
			renderCtx.setFontStyle(this._savedFontStyle);
		}
	};

	return new CCUI.SimpleDocStyleInjector({
		bigger: {
			onStart: function(renderCtx) {
				renderCtx.setFontSize(renderCtx.getFontSize() + CCUI.stringToInt(this.diff, 2));
			},
			onEnd: function(renderCtx) {
				renderCtx.setFontSize(renderCtx.getFontSize() - CCUI.stringToInt(this.diff, 2));
			}			
		},
		smaller: {
			onStart: function(renderCtx) {
				renderCtx.setFontSize(renderCtx.getFontSize() - CCUI.stringToInt(this.diff, 2));
			},
			onEnd: function(renderCtx) {
				renderCtx.setFontSize(renderCtx.getFontSize() + CCUI.stringToInt(this.diff, 2));
			}			
		},
		b : b,
		i : i,
		em : i,
		cite : i,
		strong : b
	});
}


/*
* class Shadow
*
* This class represents shadow in CCUI.
*/
CCUI.Shadow = function(/*string*/ color, /*num*/ blur, /*positive num*/ offsetX, /*positive num*/ offsetY) {
	/*string*/ this.color = color; // Can take the same values as the property shadowColor in the CanvasRenderingContext2D interface in the HTML5 spec. (a string representing a CSS color.)
	/*num*/ this.blur = blur; // Can take the same values as the property shadowBlur in the CanvasRenderingContext2D interface in the HTML5 spec.
	/*positive num*/ this.offsetX = offsetX; // Similar to CanvasRenderingContext2D's shadowOffsetX, but in CCUI we only allow positive values.
	/*positive num*/ this.offsetY = offsetY; // Similar to CanvasRenderingContext2D's shadowOffsetY, but in CCUI we only allow positive values.
}

// When this shadow is applied to a filled rectangle, maximum this number of pixels can be affected by the shadow from the left of the rectangle.
/*num*/ CCUI.Shadow.prototype.getMaxAffectedLeft = function () {
	return Math.max(this.blur - this.offsetX, 0);
}

// When this shadow is applied to a filled rectangle, maximum this number of pixels can be affected by the shadow from the right of the rectangle.
/*num*/ CCUI.Shadow.prototype.getMaxAffectedRight = function () {
	return Math.max(this.offsetX + this.blur, 0);
}

// When this shadow is applied to a filled rectangle, maximum this number of pixels can be affected by the shadow from the top of the rectangle.
/*num*/ CCUI.Shadow.prototype.getMaxAffectedTop = function () {
	return Math.max(this.blur - this.offsetY, 0);
}

// When this shadow is applied to a filled rectangle, maximum this number of pixels can be affected by the shadow from the bottom of the rectangle.
/*num*/ CCUI.Shadow.prototype.getMaxAffectedBottom = function () {
	return Math.max(this.offsetY + this.blur, 0);
}

/*
* class XMLElement
* Represents an XML element.
* Attributes are simply string valued members (the member name is simply the attribute name).
*/
CCUI.XMLElement = function(/*string*/ eName) {
	/*string*/ this.eName = eName; // element (tag) name
	/*array of (string or XMLElement)*/ this.children = [];
	// XMLElement-s are the child elements, string-s are continuous free-text chunks inside this element.
}

// Adds a child element or a free-text chunk to this element.
CCUI.XMLElement.prototype.addChild = function (/*XMLElement or string*/ child) {
	this.children.push(child);
	return this;
}

/*
* class Tag
*
* Represents the starting or ending tag of an xml element.
*/
CCUI.Tag = function(/*bool*/ isStartTag, /*XMLElement*/ xmlElement) {
	/*bool*/ this.isStartTag = isStartTag; // Tells whether this is a start tag or an end tag.
	/*XMLElement*/ this.xmlElement = xmlElement;
}

// Creates a debug string from this tag.
/*string*/ CCUI.Tag.prototype.dbgStr = function(/*int*/ indent) {
	var buf = [];
	buf.push(CCUI.indentation(indent));
	buf.push('Tag ');
	buf.push(this.isStartTag ? 'start ' : 'end ');
	buf.push(this.xmlElement.eName);
	buf.push('\n');
	return buf.join('');
}

/*
* class HSLAColor
* Represents a HSLA color.
*/
CCUI.HSLAColor = function(/*num*/ h, /*num*/ s, /*num*/ l, /*num*/ a) {
	/*num*/ this.h = h; // the hue represented in degrees (0-360)
	/*num*/ this.s = s; // saturation represented in percentages (0-100)
	/*num*/ this.l = l; // lightness represented in percentages (0-100)
	/*num*/ this.a = a; // alpha from 0 to 1
}

// Returns the css-textual representation of this hsla-color.
/*string*/ CCUI.HSLAColor.prototype.toStr = function() {
	var buf = [];
	buf.push('hsla(');
	buf.push(this.h);
	buf.push(', ');
	buf.push(this.s);
	buf.push('%, ');
	buf.push(this.l);
	buf.push('%, ');
	buf.push(this.a);
	buf.push(')');
	return buf.join('');
}

// Returns a new HSLAColor, which is the sum of this color and 'otherColor'.
/*HSLAColor*/ CCUI.HSLAColor.prototype.add = function(/*HSLAColor*/ otherColor) {
	return new CCUI.HSLAColor(this.h + otherColor.h, this.s + otherColor.s,
		this.l + otherColor.l, this.a + otherColor.a);
}

// Returns a new hsla-color in which everything is in its normal range, and h,s,l values are whole numbers.
/*HSLAColor*/ CCUI.HSLAColor.prototype.norm = function() {
	return new CCUI.HSLAColor(
		Math.floor(((this.h % 360) + 360) % 360),
		Math.floor(CCUI.clamp(this.s, 0, 100)),
		Math.floor(CCUI.clamp(this.l, 0, 100)),
		CCUI.clamp(this.a, 0, 1));
}

// Returns the css-textual representation of the norm of this color.
/*string*/ CCUI.HSLAColor.prototype.normStr = function() {
	return this.norm().toStr();
}

/*
* class DocStyleInjector
* A DocStyleInjector's task is to style a StaticDoc by injecting members into the XML elements it is made of.
* Any member can be injected, but most typically an appropriate onStart and onEnd methods are injected, which are called when painting the component.
*/
CCUI.DocStyleInjector = function() {
}

// Injects the appropriate members into 'doc'.
// 'doc' is a RichDocument, which is the 'model class' behind the component class StaticDoc.
CCUI.DocStyleInjector.prototype.injectIntoDoc = function(/*RichDocument*/ doc) {
	if(doc.xml) {
		this.injectIntoXml(doc.xml);
	}
	return this;
}

// Injects members into 'xmlElement'.
// abstract injectIntoElement(XMLElement xmlElement)

// Injects the appropriate members into the XML document represented by 'elementArr'.
CCUI.DocStyleInjector.prototype.injectIntoXml = function(/*array of (XMLElement or string)*/ elementArr) {
	var length = elementArr.length, i, element;
	for(i=0; i<length; i++) {
		element = elementArr[i];
		if(typeof element !== 'string') {
			this.injectIntoElement(element);
			if(element.children) {
				this.injectIntoXml(element.children);
			}
		}
	}
	return this;
}

/*
* class SimpleDocStyleInjector extends DocStyleInjector
*
* Typically we don't want to inject stuff arbitrarily into XML elements.
* We typically want to inject onStart and onEnd methods depending on the name of the XML element.
* This can be done simply with SimpleDocStyleInjector.
* Its constructor takes an object called 'onElements'.
* Member names in this object are the appropriate XML element names, and values are objects which themselves contain
* onStart and onEnd members. These onStart and onEnd members are then injected during styling
* into the XML elements with the appropriate element names.
* 
* After you have instantiated a SimpleDocStyleInjector, you can add further onElement-s to it using the method addOnElement.
*/
CCUI.SimpleDocStyleInjector = function(/*map of (string => {onStart:function, onEnd:function})*/ onElements/*=empty map*/) {
	CCUI.DocStyleInjector.call(this); // super constructor
	this._onElements = onElements;
}
CCUI.SimpleDocStyleInjector.prototype = new CCUI.DocStyleInjector();

CCUI.SimpleDocStyleInjector.prototype.addOnElement = function(/*string*/ elementName, /*{onStart:function, onEnd:function}*/ onElement) {
	this._onElements[elementName] = onElement;
	return this;
}

CCUI.SimpleDocStyleInjector.prototype.injectIntoElement = function(/*XMLElement*/ xmlElement) {
	var onElement = this._onElements[xmlElement.eName];
	var onStart, onEnd;
	if(onElement) {
		onStart = onElement.onStart;
		if(onStart) {
			xmlElement.onStart = onStart;
		}
		onEnd = onElement.onEnd;		
		if(onEnd) {
			xmlElement.onEnd = onEnd;
		}		
	}
	return this;
}


/*
* class DefaultStyleSheet
*
* DefaultStylesheet is the stlyesheet which is applied to your components if you don't specify a stylesheet explicitly.
*/
CCUI.DefaultStyleSheet = function() {
	/*DocStyleInjector*/ this.docStyleInjector = CCUI.createDefaultDCI();
}

// Styles 'component'.
CCUI.DefaultStyleSheet.prototype.style = function(/*Component*/ component) {
	if(component instanceof CCUI.StaticDoc) {		
		component.setTextFillStyle('#000000');
		component.setFontSize(12);
		component.setLineHeight(1.5);
		component.setFontFamily('arial,sans-serif');
		component.receiveDocStyleInjectionFrom(this.docStyleInjector);
	}
	if(component instanceof CCUI.TextEditor) {
		component.setTextFillStyle('#000000');
		component.setFontSize(12);
		component.setLineHeight(1.5);
		component.setFontFamily('arial,sans-serif');
		component.setBorderStyle("#000000");
		component.setActiveBorderStyle('#6060C0');
		component.setBackgroundStyle("#FFFFFF");
		component.setPadding({top: 3, bottom: 3, left: 3, right: 3});
		component.preProcess();
		component.setCursorStyle("#000000");
		component.setSelectedBackgroundStyle("#3399FF");
	}
	if(component instanceof CCUI.AbstractButton) {
		component.setColor(CCUI.hsla(0, 0, 10, 1));		
		component.setGradientAdditions([CCUI.hsla(0, 0, 25, 0), CCUI.hsla(0, 0, 17, 0), CCUI.hsla(0, 0, 0, 0), CCUI.hsla(0, 0, -8, 0)]);
		component.setBorderColorAddition(CCUI.hsla(0, 0, 20, 0));
		component.setRoundRadius(3);
		component.setHoveredColorAddition(CCUI.hsla(0, 0, 12, 0));
		component.setPressedColorAddition(CCUI.hsla(0, 0, 0, 0));
		component.setShadow(new CCUI.Shadow('rgba(0,0,0,0.6)', 2, 3, 3));
		component.setBorderOffset(0);
	}
	if(component instanceof CCUI.Button) {
		component.setMinPadding({top: 2, bottom:2, left: 2, right: 2});
		component.setPreferredPadding({top: 5, bottom:2, left: 10, right: 10});
		component.setBorderOffset(2);
		component.setRoundRadius(5);
		var label = component.getLabel();
		if(label) {
			label.setTextFillStyle('#ffffff');
		}
	}
	if(component instanceof CCUI.ArrowButton) {		
		component.firstActionRepeatTime = 300;
		component.subsequentActionRepeatTime = 20;
		component.setArrowColor('#ffffff');
		component.setShadow(null);
		component.setBorderColorAddition(null);
	}
	if(component instanceof CCUI.ScrollTrackerButton) {
		component.setShadow(null);
		component.setBorderColorAddition(null);
		component.setPressedColorAddition(CCUI.hsla(0, 0, 12, 0));
	}
	if(component instanceof CCUI.ScrollBar) {
		component.setBackgroundStyle('#C0C0C0');
		component.setBorderStyle('#888888');
	}

	if(component instanceof CCUI.Window) {
		component.setTitlePadding({top: 5, bottom:2, left: 10, right: 10});
		component.setStrokeStyle('#000000');
		component.setFillStyle('#161616');
		component.setActiveFillStyle('#101060');
		component.setBorderWidth(5);
		component.setRoundRadius(5);
		component.setShadow(new CCUI.Shadow('rgba(0,0,0,0.6)', 2, 3, 3));
		var titleLabel = component.getTitleLabel();
		if(titleLabel) {
			titleLabel.setTextFillStyle('#ffffff');
		}
	}
	if(component instanceof CCUI.GridPanel) {
		component.setBackgroundStyle("#FFFFFF");
	}
	return this;
}

/*
* class Rectangle
*/
CCUI.Rectangle = function(/*num*/ x, /*num*/ y, /*num*/ width, /*num*/ height) {
	/*num*/ this.x = x;
	/*num*/ this.y = y;
	/*num*/ this.width = width;
	/*num*/ this.height = height;
}

// Creates a debug string from this rectangle.
/*string*/ CCUI.Rectangle.prototype.dbgStr = function(/*int*/ indent) {
	var buf = [];
	buf.push(CCUI.indentation(indent));
	buf.push('Rectangle x: ' + this.x + ' y: ' + this.y + ' width: ' + this.width + ' height: ' + this.height + '\n');
	return buf.join('');
}

// static Rectangle bounding(array of Rectangle rects)
// Returns the bounding rectangle of the rectangles in the array 'rects'. If 'rects' is empty it returns 'null'.
// static Rectangle bounding(num x1, num y1, num width1, num height1, num x2, num y2, num width2, num height2)
// Returns the bounding rectangle of the two rectangles determined by the parameters.
/*static Rectangle*/ CCUI.Rectangle.bounding = function(/*num*/ x1, /*num*/ y1, /*num*/ width1, /*num*/ height1,
		/*num*/ x2, /*num*/ y2, /*num*/ width2, /*num*/ height2) {
	if(typeof x1 === 'number') {
		var x = Math.min(x1, x2), y = Math.min(y1, y2), xEnd = Math.max(x1 + width1, x2 + width2), yEnd = Math.max(y1 + height1, y2 + height2);
		return new CCUI.Rectangle(x, y, xEnd - x, yEnd - y);
	} else {
		var rects = x1, rectsLength = rects.length, i;
		if(rectsLength === 0) {
			return null;
		}
		var rect0 = rects[0], minX = rect0.x, maxX = rect0.x + rect0.width, minY = rect0.y, maxY = rect0.y + rect0.height, rect; 
		for(i=1; i<rectsLength; i++) {
			rect = rects[i];
			minX = Math.min(minX, rect.x);
			maxX = Math.max(maxX, rect.x + rect.width);
			minY = Math.min(minY, rect.y);
			maxY = Math.max(maxY, rect.y + rect.height);			
		}
		return new CCUI.Rectangle(minX, minY, maxX - minX, maxY - minY);
	}
}

// Returns the bounding rectangle of this rectangle and 'otherRect'.
/*Rectangle*/ CCUI.Rectangle.prototype.bounding = function(/*Rectangle*/ otherRect) {
	return CCUI.Rectangle.bounding(this.x, this.y, this.width, this.height, otherRect.x, otherRect.y, otherRect.width, otherRect.height);
}

// Return the intersection of this rectangle and 'otherRect'.
// If there is no intersection it returns a rectangle at the upper left corner of this rectangle.
/*Rectangle*/ CCUI.Rectangle.prototype.intersect = function(/*Rectangle*/ otherRect) {
	var horizIns = this._oneDimIntersect(this.x, this.x + this.width, otherRect.x, otherRect.x + otherRect.width);
	var vertIns = this._oneDimIntersect(this.y, this.y + this.height, otherRect.y, otherRect.y + otherRect.height);
	return (horizIns && vertIns) ? new CCUI.Rectangle(horizIns.start, vertIns.start, horizIns.end - horizIns.start, vertIns.end - vertIns.start) :
		new CCUI.Rectangle(this.x, this.y, 0, 0);
}

// Returns whether the two specified rectangles intersect or not.
/*static bool*/ CCUI.Rectangle.doesIntersect = function(/*num*/ x1, /*num*/ y1, /*num*/ width1, /*num*/ height1,
		/*num*/ x2, /*num*/ y2, /*num*/ width2, /*num*/ height2) {
	return CCUI.Rectangle._doesOneDimIntersect(x1, width1, x2, width2) &&
		CCUI.Rectangle._doesOneDimIntersect(y1, height1, y2, height2);
}

// Returns whether this rectangle intersects 'otherRect' or not.
/*bool*/ CCUI.Rectangle.prototype.doesIntersect = function(/*Rectangle*/ otherRect) {
	return CCUI.Rectangle._doesOneDimIntersect(this.x, this.width, otherRect.x, otherRect.width) &&
		CCUI.Rectangle._doesOneDimIntersect(this.y, this.height, otherRect.y, otherRect.height);
}

// Returns whether this rectangle contains 'otherRect' or not.
/*bool*/ CCUI.Rectangle.prototype.contains = function(/*Rectangle*/ otherRect) {
	return this.x <= otherRect.x && this.x + this.width >= otherRect.x + otherRect.width &&
		this.y <= otherRect.y && this.y + this.height >= otherRect.y + otherRect.height;
}

/*static bool*/ CCUI.Rectangle._doesOneDimIntersect = function(/*num*/ pos1, /*num*/ length1, /*num*/ pos2, /*num*/ length2) {
	return (pos1 < pos2) ? (length1 > pos2 - pos1) : (length2 > pos1 - pos2);
}

// Returns whether this rectangle is empty or not. A rectangle is empty if its area is 0.
/*bool*/ CCUI.Rectangle.prototype.isEmpty = function() {
	return this.width === 0 || this.height === 0;
}

// Returns falsy if there is no intersection, returns an object {start: num, end: num} otherwise
CCUI.Rectangle.prototype._oneDimIntersect = function(/*num*/ s1, /*num*/ e1, /*num*/ s2, /*num*/ e2) {
	if(s2 < s1) { // swap them
		var sTemp = s1;
		var eTemp = e1;
		s1 = s2;
		e1 = e2;
		s2 = sTemp;
		e2 = eTemp;
	}
	return (e1 <= s2) ? null : {start: s2, end: (e1 > e2) ? e2 : e1 };
}

/*
* class RenderContext
*
* Represents a render context in CCUI. This is in fact a wrapper class over HTML5's CanvasRenderingContext2D class.
* It offers the following additional functionality compared to HTML5's CanvasRenderingContext2D:
*
* - Supports some convenience methods to draw rounded-corner rectangles. 
* - Supports a higher level clipping region handling than HTML5's CanvasRenderingContext2D. In this clipping region handling
* you can set an array of rectangles, the union of them will be the clipping region. The bounding box of these rectangles is automatically calculated.
* - Supports more convenient font handling than HTML5's CanvasRenderingContext2D. In CanvasRenderingContext2D you can set the font as a string.
* In RenderContext you can set different properties of the font separately.
* - Supports 'early rejection' when painting. This means that if the rectangular bounds of the drawn shape does not intersect with the defined
* clipping region then it may not even try to draw the shape (depending on the 'rejection strategy' which can be controlled by the 'rejectionStrategy' property).
*/
CCUI.RenderContext = function(/*CanvasRenderingContext2D*/ ctx2D) {
	//TODO: maybe support letter spacing? (at least to calculate with that between parts?)

	/*CanvasRenderingContext2D*/ this.ctx2D = ctx2D; // The underlying HTML5 canvas render context.

	/*num or string*/ this._lineHeight = 1.5; // The height of a line of text.
	// if a number or a string not ending with the 'px' suffix, this
	// is relative to the font size. if a string ending with 'px', that means absolute pixels.

	/*string*/ this._fontFamily = 'arial,sans-serif';
	/*num*/ this._fontSize = 12; // font size in pixels.
	/*string*/ this._fontStyle = 'normal'; // can be 'normal', 'italic' or 'oblique'.
	/*num*/ this._fontWeight = 400;

	this._font = null;

	// (this._ox, this._oy) specifies the origo of the actual drawing coordinate system in canvas-absolute coordinates.
	/*num*/ this._ox = 0; 
	/*num*/ this._oy = 0;

	/*const array of Rectangle*/ this._cr = []; // current clipping region (assembled from rectangles).
	// Each rectangle is meant relative to the current origo. Can be an empty array if no clipping region is set.
	
	/*Rectangle*/ this._crBounds = null; // The rectangular bounds of the current clipping region meant relative to the current origo.
	// null if no clipping region is set.

	this._rejectionStrategy = 1; // 0: none, 1: rejection by clipping region bounds, 2: rejection by clipping region. The default is 1.
}

CCUI.RenderContext.prototype.setRejectionStrategy = function(/*int*/ rejectionStrategy) {
	this._rejectionStrategy = rejectionStrategy;
	return this;
}

CCUI.RenderContext.prototype.fillText = function(/*string*/ text, /*num*/ x, /*num*/ y) {
	this.ensureFont();
	this.ctx2D.fillText(text, x, y);
	return this;
}

/*num*/ CCUI.RenderContext.prototype.measureText = function(/*string*/ text) {
	this.ensureFont();
	return this.ctx2D.measureText(text).width;
}

/*bool*/ CCUI.RenderContext.prototype._reject = function(/*num*/ rx, /*num*/ ry, /*num*/ rWidth, /*num*/ rHeight) {
	switch(this._rejectionStrategy) {
	case 1: // rejection by clipping region bounds (_crBounds)
		return this._crBounds && (!CCUI.Rectangle.doesIntersect(this._crBounds.x, this._crBounds.y, this._crBounds.width, this._crBounds.height,
			rx, ry, rWidth, rHeight));
	case 2: // rejection by clipping region (_cr)
		if(this._cr.length === 0) {
			return false;
		}
		var length = this._cr.length, i, rect;
		for(i=0; i<length; i++) {
			rect = this._cr[i];
			if(CCUI.Rectangle.doesIntersect(rect.x, rect.y, rect.width, rect.height, rx, ry, rWidth, rHeight)) {
				return false;
			}
		}
		return true;
	default:
		return false;
	}
}

// Creates a closed rectangle-shaped subpath in this render context with clockwise winding.
CCUI.RenderContext.prototype.createRectSubPath = function(/*num*/ x1, /*num*/ y1, /*num*/ x2, /*num*/ y2) {
	this.ctx2D.moveTo(x1, y1);
	this.ctx2D.lineTo(x2, y1);
	this.ctx2D.lineTo(x2, y2);
	this.ctx2D.lineTo(x1, y2);
	this.ctx2D.lineTo(x1, y1);
	this.ctx2D.closePath();
	return this;
}

// Creates a closed rounded-rectangle sub-path in this render context with clockwise winding.
// Automatically adjusts the round-radius 'r' if the rectangle is too small to be drawn with round-radius 'r'.
CCUI.RenderContext.prototype.createRoundedRectSubPath = function(/*num*/ x1, /*num*/ y1, /*num*/ x2, /*num*/ y2, /*num*/ r) {
	if(x2 < x1 || y2 < y1) {
		return this;
	}
	r = Math.min(r, Math.floor((x2 - x1) / 2));
	r = Math.min(r, Math.floor((y2 - y1) / 2));
	
	this.ctx2D.moveTo(x1 + r, y1);
	this.ctx2D.lineTo(x2 - r, y1);
	if(r > 0) {
		this.ctx2D.arcTo(x2, y1, x2, y1 + r, r);
	}
	this.ctx2D.lineTo(x2, y2 - r);
	if(r > 0) {
		this.ctx2D.arcTo(x2, y2, x2 - r, y2, r);
	}
	this.ctx2D.lineTo(x1 + r, y2);
	if(r > 0) {
		this.ctx2D.arcTo(x1, y2, x1, y2 - r, r);
	}
	this.ctx2D.lineTo(x1, y1 + r);
	if(r > 0) {
		this.ctx2D.arcTo(x1, y1, x1 + r, y1, r);
	}
	this.ctx2D.closePath();
	return this;	
}


// Creates the sub-paths of a 'frame' (e.g. the 'border' of a window) in this render context.
// 'topFrameWidth' is the width of the frame at the top side.
// 'otherFrameWidth' is the width of the frame at the other 3 sides.
CCUI.RenderContext.prototype.createFrameSubPaths = function(/*num*/ x1, /*num*/ y1, /*num*/ x2, /*num*/ y2, /*num*/ r, /*num*/ topFrameWidth, /*num*/ otherFrameWidth) { 
	this.createRoundedRectSubPath(x1, y1, x2, y2, r);
	// draw a rectangle path with opposite (anti-clockwise) winding (to cancel out its territory when filling).
	var innerX1 = x1 + otherFrameWidth, innerX2 = x2 - otherFrameWidth,
		innerY1 = y1 + topFrameWidth, innerY2 = y2 - otherFrameWidth;
	if(innerX2 < innerX1 || innerY2 < innerY1) {
		return this;
	}
	this.ctx2D.moveTo(innerX1, innerY1);
	this.ctx2D.lineTo(innerX1, innerY2);
	this.ctx2D.lineTo(innerX2, innerY2);
	this.ctx2D.lineTo(innerX2, innerY1);
	this.ctx2D.lineTo(innerX1, innerY1);
	this.ctx2D.closePath();
	return this;
}

// Draws a filled rectangle (as a separate path).
// If you don't provide a truthy 'fillStyle', the actual fillStyle in the context will be used.
// 'checkReject' specifies whether or not you want 'early rejection' to be executed for this operation (according to the current rejection strategy).
CCUI.RenderContext.prototype.fillRect = function(/*num*/ x1, /*num*/ y1, /*num*/ x2, /*num*/ y2,
		/*fill-style*/ fillStyle/*=undefined*/, /*bool*/ checkReject/*=true*/) {
	if(x2 < x1 || y2 < y1) {
		return this;
	}
	// TODO: experiment with only drawing a smaller part which may be visible...
	if(CCUI.dflt(checkReject, true) && this._reject(x1, y1, x2 - x1 + this.ctx2D.shadowOffsetX, y2 - y1 + this.ctx2D.shadowOffsetY)) return this;
	if(fillStyle) {
		this.ctx2D.fillStyle = fillStyle;
	}
	this.ctx2D.fillRect(x1, y1, x2-x1, y2-y1);
	return this;
}


// Draws a filled rounded rectangle (as a separate path).
// If you don't provide a truthy 'fillStyle', the actual fillStyle in the context will be used.
// 'checkReject' specifies whether or not you want 'early rejection' to be executed for this operation (according to the current rejection strategy).
CCUI.RenderContext.prototype.fillRoundedRect = function(/*num*/ x1, /*num*/ y1, /*num*/ x2, /*num*/ y2, /*num*/ r,
		/*fill-style*/ fillStyle/*=undefined*/, /*bool*/ checkReject/*=true*/) {
	if(x2 < x1 || y2 < y1) {
		return this;
	}
	// TODO: experiment with only drawing a smaller part which may be visible...	
	if(CCUI.dflt(checkReject, true) && this._reject(x1, y1, x2 - x1 + this.ctx2D.shadowOffsetX, y2 - y1 + this.ctx2D.shadowOffsetY)) return this;
	if(fillStyle) {
		this.ctx2D.fillStyle = fillStyle;
	}
	if(r === 0) {
		this.ctx2D.fillRect(x1, y1, x2-x1, y2-y1);
	} else {
		this.ctx2D.beginPath();
		this.createRoundedRectSubPath(x1, y1, x2, y2, r);
		this.ctx2D.fill();	
	}
	return this;
}

// Draws a non-filled rectangle (as a separate path).
// If you don't provide a truthy 'strokeStyle', the actual strokeStyle in the context will be used.
// 'checkReject' specifies whether or not you want 'early rejection' to be executed for this operation (according to the current rejection strategy).
CCUI.RenderContext.prototype.strokeRect = function(/*num*/ x1, /*num*/ y1, /*num*/ x2, /*num*/ y2,
		/*fill-style*/ strokeStyle/*=undefined*/, /*bool*/ checkReject/*=true*/) {
	if(x2 < x1 || y2 < y1) {
		return this;
	}
	var lineWidth = this.ctx2D.lineWidth;
	if(CCUI.dflt(checkReject, true) && this._reject(x1 - lineWidth * 0.5, y1 - lineWidth * 0.5,
		x2 - x1 + lineWidth + this.ctx2D.shadowOffsetX, y2 - y1 + lineWidth + this.ctx2D.shadowOffsetY)) return this;
	if(strokeStyle) {
		this.ctx2D.strokeStyle = strokeStyle;
	}		
	this.ctx2D.strokeRect(x1, y1, x2-x1, y2-y1);
}

// Draws a non-filled rounded rectangle (as a separate path).
// If you don't provide a truthy 'strokeStyle', the actual strokeStyle in the context will be used.
// 'checkReject' specifies whether or not you want 'early rejection' to be executed for this operation (according to the current rejection strategy).
CCUI.RenderContext.prototype.strokeRoundedRect = function(/*num*/ x1, /*num*/ y1, /*num*/ x2, /*num*/ y2, /*num*/ r,
		/*fill-style*/ strokeStyle/*=undefined*/, /*bool*/ checkReject/*=true*/) {
	if(x2 < x1 || y2 < y1) {
		return this;
	}
	var lineWidth = this.ctx2D.lineWidth;
	if(CCUI.dflt(checkReject, true) && this._reject(x1 - lineWidth * 0.5, y1 - lineWidth * 0.5,
		x2 - x1 + lineWidth + this.ctx2D.shadowOffsetX, y2 - y1 + lineWidth + this.ctx2D.shadowOffsetY)) return this;	
	if(strokeStyle) {
		this.ctx2D.strokeStyle = strokeStyle;
	}
	if(r <= 0) {
		this.ctx2D.strokeRect(x1, y1, x2-x1, y2-y1);
	} else {
		this.ctx2D.beginPath();
		this.createRoundedRectSubPath(x1, y1, x2, y2, r);
		this.ctx2D.stroke();	
	}
	return this;
}

// Draws a 'frame' (e.g. the 'border' of a window).
// It is only stroked (using strokeStyle) if 'strokeStyle' is truthy,
// and it is only filled(using fillStyle) if 'fillStyle' is truthy.
// 'checkReject' specifies whether or not you want 'early rejection' to be executed for this operation (according to the current rejection strategy).
CCUI.RenderContext.prototype.drawFrame = function(/*num*/ x1, /*num*/ y1, /*num*/ x2, /*num*/ y2, /*num*/ r,
		/*num*/ topFrameWidth, /*num*/ otherFrameWidth, /*draw-style*/ strokeStyle, /*fill-style*/fillStyle, /*Shadow*/ shadow,
		/*bool*/ checkReject/*=true*/) {
	if(x2 < x1 || y2 < y1) {
		return this;
	}

	var cx = x1, cy = y1, cw = x2 - x1, ch = y2 - y1;
	if(strokeStyle) {
		var lineWidth = this.ctx2D.lineWidth;
		cx -= lineWidth * 0.5;
		cy -= lineWidth * 0.5;
		cw += lineWidth;
		ch += lineWidth;
	}

	if(CCUI.dflt(checkReject, true) && this._reject(cx, cy, cw + shadow.offsetX, ch +shadow.offsetY)) return this;		

	if(fillStyle) {
		this.ctx2D.beginPath();
		this.createFrameSubPaths(x1, y1, x2, y2, r, topFrameWidth, otherFrameWidth);
		this.setShadow(shadow);
		this.ctx2D.fillStyle = fillStyle;
		this.ctx2D.fill();
		this.clearShadow();
	}

	if(strokeStyle) {
		this.ctx2D.beginPath();
		this.createFrameSubPaths(x1 + 0.5, y1 + 0.5, x2 - 0.5, y2 - 0.5, r, topFrameWidth - 1, otherFrameWidth - 1);
		this.ctx2D.strokeStyle = strokeStyle;
		this.ctx2D.stroke();
	}
	return this;
}

// Clears the shadow settings in this render context.
CCUI.RenderContext.prototype.clearShadow = function() {
	this.ctx2D.shadowColor = 'rgba(0,0,0,0)';
	this.ctx2D.shadowBlur = 0;
	this.ctx2D.shadowOffsetX = 0;
	this.ctx2D.shadowOffsetY = 0;
	return this;
}

// Sets the shadow settings according to 'shadow' in this render context.
// If 'shadow' is falsy, it calls clearShadow.
CCUI.RenderContext.prototype.setShadow = function(/*Shadow*/ shadow) {
	if(shadow) {
		this.ctx2D.shadowColor = shadow.color;
		this.ctx2D.shadowBlur = shadow.blur;
		this.ctx2D.shadowOffsetX = shadow.offsetX;
		this.ctx2D.shadowOffsetY = shadow.offsetY;
	} else {
		this.clearShadow();
	}
	return this;	
}

// Translates the origo of the actual drawing coordinate system by (x,y).
// All drawing operations are intended in this drawing coordinate system.
CCUI.RenderContext.prototype.translate = function(/*num*/ x, /*num*/ y) {
	this.ctx2D.translate(x, y);
	this._ox += x;
	this._oy += y;
	var i, length = this._cr.length, rect;
	for(i=0; i<length; i++) {
		rect = this._cr[i];
		rect.x -= x;
		rect.y -= y;
	}
	if(this._crBounds) {
		this._crBounds.x -= x;
		this._crBounds.y -= y;
	}
	return this;
}

// Sets the current clipping region as an array of rectangles.
CCUI.RenderContext.prototype.setCr = function(/*const array of Rectangle*/ cr) {
	this.clearCr();
	this.ctx2D.beginPath();
	this._cr = cr;
	var length = cr.length, i, rect;
	for(i=0; i<length; i++) {
		rect = cr[i];
		this.createRectSubPath(rect.x, rect.y, rect.x + rect.width, rect.y + rect.height);
	}
	this._crBounds = CCUI.Rectangle.bounding(cr);
	this.ctx2D.clip();
	return this;	
}

// Gets the current clipping region as an array of rectangles.
/*const array of Rectangle*/ CCUI.RenderContext.prototype.getCr = function() {
	return this._cr;
}

// Gets the bounding rectangle of the current clipping region. null if there is no clipping region set.
/*Rectangle*/ CCUI.RenderContext.prototype.getCrBounds = function() {
	return this._crBounds;
}

// Clears the actual cliping region.
// (It does this by restoring the context, and saving again so that it can be restored next time...)
CCUI.RenderContext.prototype.clearCr = function() {
	if(this._cr.length > 0) {
		this._cr = [];
		this._crBounds = null;
		// trick to undo clip()
		this.ctx2D.restore();
		this.ctx2D.save();
		this.ctx2D.translate(this._ox, this._oy);
	}
	return this;
}

CCUI.RenderContext.prototype.getFontStyle = function() {
	return this._fontStyle;
}

CCUI.RenderContext.prototype.setFontStyle = function(fontStyle) {
	this._fontStyle = fontStyle;
	this._font = null;
	return this;
}

CCUI.RenderContext.prototype.getFontWeight = function() {
	return this._fontWeight;
}

CCUI.RenderContext.prototype.setFontWeight = function(fontWeight) {
	this._fontWeight = fontWeight;
	this._font = null;
	return this;
}

CCUI.RenderContext.prototype.getFontSize = function() {
	return this._fontSize;
}

CCUI.RenderContext.prototype.setFontSize = function(fontSize) {
	this._fontSize = fontSize;
	this._font = null;
	return this;
}

CCUI.RenderContext.prototype.getFontFamily = function() {
	return this._fontFamily;
}

CCUI.RenderContext.prototype.setFontFamily = function(fontFamily) {
	this._fontFamily = fontFamily;
	this._font = null;
	return this;
}

// get the line height in pixels.
CCUI.RenderContext.prototype.getPixelLineHeight = function() {
	if(typeof this._lineHeight === 'number') {
		return Math.ceil(this._lineHeight * this._fontSize);
	} else if(typeof this._lineHeight === 'string') {
		if(this._lineHeight.length >= 3 && this._lineHeight.slice(this._lineHeight.length - 2, this._lineHeight.length) === 'px') {
			return parseInt(this._lineHeight.slice(0, this._lineHeight.length - 2));
		} else {
			return Math.ceil(parseFloat(this._lineHeight) * this._fontSize);
		}
	}
}

CCUI.RenderContext.prototype.getLineHeight = function() {
	return this._lineHeight;
}

// Sets the line-height.
// 'lineHeight' can be a (real) number or a string. if it is a real number or a string not ending with the 'px' suffix,
// then it is relative to the font size. if it is a string ending with 'px', that means absolute pixels.
CCUI.RenderContext.prototype.setLineHeight = function(lineHeight) {
	this._lineHeight = lineHeight;
	return this;
}

// Similar to ensureFont, but applies font settings even if the cache is not dirty.
CCUI.RenderContext.prototype.forceFont = function() {
	this._font = this._fontStyle + ' ' + this._fontWeight + ' ' +  this._fontSize + 'px ' + this._fontFamily;
	this.ctx2D.font = this._font;
	return this;
}

// When you set font settings on RenderContext those are maintained only in RenderContext.
// You must call this method to actually apply the current font settings on the underlying HTML5 canvas render context.
CCUI.RenderContext.prototype.ensureFont = function() {
	if(this._font === null) {
		this.forceFont();
	}
	return this;
}

/*
 * class CachedArea
 */
CCUI.CachedArea = function(/*Rectangle*/ rect) {
	/*Rectangle*/ this.rect = rect;
	var can = document.createElement('canvas');
	can.width = rect.width;
	can.height = rect.height;
	/*RenderContext*/ this.renderCtx = new CCUI.RenderContext(can.getContext('2d'));
	/*html5 Canvas*/ this.canvas = can;
	this.renderCtx.ctx2D.save();
}

/*
 * class Matrix
 *
 * Represents a two dimensional array.
 *
 * After construction all the elements in the Matrix are 'null'.
 */
CCUI.Matrix = function(/*int*/ width, /*int*/ height) {
	/*int*/ this._width = width;
	/*int*/ this._height = height;

	// internally we represent the matrix as an array of arrays. ('rows' is an array of arrays.)
	// every cell has a real entry in the approperiate row array: if a cell is empty it contains null.
	this._rows = [];
	var r,c, row;
	
	for(r=0; r<height; r++) {
		row = [];
		for(c=0; c<width; c++) {
			row.push(null);
		}
		this._rows.push(row);
	}
}

// Returns the element at the (x,y) coordinates of the matrix.
/*any*/ CCUI.Matrix.prototype.get = function(/*int*/ x, /*int*/ y) {
	return this._rows[y][x];
}

// Sets the element at (x,y) to the value 'value'.
CCUI.Matrix.prototype.set = function(/*int*/ x, /*int*/ y, /*any*/ value) {
	this._rows[y][x] = value;
	return this;
}

/*int*/ CCUI.Matrix.prototype.getWidth = function() {
	return this._width;
}

/*int*/ CCUI.Matrix.prototype.getHeight = function() {
	return this._height;
}

/*
 * class EventTarget
 * 
 * Represents anything on which an event can be fired.
 * Listener functions can be registered to listen on those events.
 */
CCUI.EventTarget = function() {
	this._listeners = {}; // map of arrays
}

// Adds a listener function 'listener' which will be called when an event with 'event.type === eventType' is fired.
CCUI.EventTarget.prototype.addListener = function (/*string*/ eventType, /*function(event)*/ listener) {
	var lArr = this._listeners[eventType];
	if(!lArr) {
		lArr = [];
		this._listeners[eventType] = lArr;
	}
	lArr.push(listener);
}

// Removes the listener function 'listener' from listening to events with 'event.type === eventType'.
CCUI.EventTarget.prototype.removeListener = function (/*string*/ eventType, /*function(event)*/ listener) {
	var lArr = this._listeners[eventType];
	if(lArr) {
		CCUI.remove(lArr, listener);
	}
}

// Fires the event 'event'.
// Two things happen during fireing the event:
// - The 'handler' method is called on this EventTarget if defined.
//   The naming convention is the following: For an event with event type 'xyz' the following method is called: onXyz(event).
// - The added listener functions are called.
// 'event' can be any object with a string member named 'type'.
CCUI.EventTarget.prototype.fire = function (/*{type: string}*/ event) {
	event.target = this;
	//CCUI.log('event fired' + (this.id ? (' on ' + this.id + ': ') : ': ') + event.type);

	var handlerMethodName = 'on' + CCUI.firstCharUp(event.type);

	if(this[handlerMethodName]) {
		this[handlerMethodName](event);
	}

	var lArr = this._listeners[event.type];
	var length, i;
	if(lArr) {
		length = lArr.length;
		for(i=0; i<length; i++) {
			(lArr[i])(event);
		}
	}
}

/*
 * class PropertyNameValue
 */
CCUI.PropertyNameValue = function(/*string*/ propertyName, value) {
	/*string*/ this.propertyName = propertyName;
	this.value = value;
}

/*
 * class Component extends EventTarget
 *
 * Base class of all the component classes in CCUI.
 */
CCUI.Component = function() {

	// memory optimization idea: try to reduce the number of members actually attached to a component instance by
	// removing the member when supposed to be set to its default value, and write an accessor (getXYZ) which accesses the
	// member in a way that when not found returning the default value. (using the 'dflt' function).
	// (only do this for a member if it does not lead to serious performance decrease because of the usage of the getter).
	// other idea: booleans could be represented as bits of an int.

	CCUI.EventTarget.call(this); // super constructor

	// (function(Component) or {style: function(Component)}) _styleSheet 
	// if it is falsy then it is styled based on its parent's _stlylesheet (and so on recursively)

	// if calculated stuff is null then it needs to be calculated
	// if user-specified stuff is null it means that no user-specified stuff was specified

	// in case of max values -1 means that there is no max value.
	// as min and preferred values are mandatory, min and preferred values cannot be -1.
	
	/*num*/ this._specdPreferredWidth = null; // user-specified preferred width
	/*num*/ this._specdPreferredHeight = null; // user-specified preferred height
	/*num*/ this._calcdPreferredWidth = null; // calculated preferred width
	/*num*/ this._calcdPreferredHeight = null; // calculated preferred height

	/*num*/ this._specdMinWidth = null; // user-specified minimum width
	/*num*/ this._specdMinHeight = null; // user-specified minimum height
	/*num*/ this._calcdMinWidth = null; // calculated minimum width
	/*num*/ this._calcdMinHeight = null; // calculated minimum height

	/*num*/ this._specdMaxWidth = null; // user-specified maximum width
	/*num*/ this._specdMaxHeight = null; // user-specified maximum height
	/*num*/ this._calcdMaxWidth = null; // calculated maximum width
	/*num*/ this._calcdMaxHeight = null; // calculated maximum height	
	
	// this._x, this._y : x,y coordinates of the upper-left corner (in the parent component's coordinate system)
	/*num*/ this._x = 0;
	/*num*/ this._y = 0;
	/*num*/ this._z = 0; // z coordinate of the component. The closer a component is, the bigger z is.
	/*num*/ this._w = 0; // its function is similar to z, but w is more 'significant' than z. {w:1,z:1} is closer than {w:0,z:100}
						// (as z is always incremented when child windows are brought to front, a bigger w value can be used
						// to bring something surely in front of those windows.)

	/*num*/ this._width = 0; // width of the component
	/*num*/ this._height = 0; // height of the component

	/*bool*/ this._hLocked = false;
	/*bool*/ this._vLocked = false;

	/*bool*/ this._needsLayout = true; // if this is false, and the Component should be layed out to the width and height as last time,
	// then 'layout' will not do anything on this component (for performance optimization purposes).
	
	/*num*/ this._lastLayedOutWidth = -1;
	/*num*/ this._lastLayedOutHeight = -1;

	// These are undefined in the beginning.
	//num this._lastPaintedX
	//num this._lastPaintedY
	//num this._lastPaintedWidth
	//num this._lastPaintedHeight

	// undefined in the beginning.
	//CachedArea this._cachedArea
	
	/*bool*/ this.cacheable = false;

	/*bool*/ this._canComeFromCache = false;

	// true if any of this component's descendant is moved since it was last painted or has at least one dirty area.
	/*bool*/ this._descendantDirty = true;
	/*'all' or (array of Rectangle)*/ this._dirtyAreas = [];

	/*bool*/ this._needsStyling = true; // true if this component needs styling to be displayed.
	/*bool*/ this._descendantNeedsStyling = false; // true if any descendant of this component needs styling to be displayed.

	/*bool*/ this.takesClicks = true; // If false then the clicks on this component will be handled by its parent.

	// any component can have free children. (these are called 'absolutely positioned components' in other frameworks.)
	// Component lays them out by not modifying their original x,y coordinates, but setting their width and height properties by totally
	// respecting their preferreWidth and preferredHeight properties.
	/*array of Component*/ this._freeChildren = [];

	// All the children of this component are in this array. This is necessary to be able to enumerate through a component's children
	// for example at painting.
	/*array of Component*/ this._children = [];

	/*Component*/ this._parent = null; // The parent of this component, or null if does not have a parent (root component, or not attached to the hierarchy (yet)).

	/*Canvas*/ this._canvas = null; //  The canvas the component is in. this is automatically set inside _addChild and setRootComponent.
	
	/*bool*/ this._active = false; // The focused component and its anchestors are active.

	/*bool*/ this._focused = false; // At most one component can be focused at a time in a Canvas.

	/*bool*/ this._visible = true; // Tells whether this component should be painted or not. Note that this property can be set from both styling and layout, and it only affects painting.

	/*array of (PropertyNameValue or function)*/ this._forces = {}; // this array contains all the assigned 'forces'. (See method: 'force')
	/*int*/ this._forceKeyCounter = 1; // used to generate force-keys. (See method: 'force')

	// string this.id: identifier of the component. It is up to you how you use it; you may even not assign any value to it (by default it is undefined).
	// A common usage is to assign identifiers which are unique amongst the component's siblings.
	// Can be set or get directly; the setId method is available only to allow chaining.
}
CCUI.Component.prototype = new CCUI.EventTarget();

/*array of Component*/ CCUI.Component.prototype.getChildren = function() {
	return this._children;
}

CCUI.Component.prototype.setId = function(/*string*/ id) {
	this.id = id;
	return this;
}

// Locks the calculated minimum width to the preferred width. 
CCUI.Component.prototype.hLock = function() {
	this._hLocked = true;
	return this;
}

// Unlocks the calculated minimum width from the preferred width. 
CCUI.Component.prototype.hUnlock = function() {
	this._hLocked = false;
	return this;
}

// Locks the calculated minimum height to the preferred height. 
CCUI.Component.prototype.vLock = function() {
	this._vLocked = true;
	return this;
}

// Unlocks the calculated minimum height from the preferred height. 
CCUI.Component.prototype.vUnlock = function() {
	this._vLocked = false;
	return this;
}

// Locks the calculated minimum width and height to the preferred width and height. 
CCUI.Component.prototype.lock = function() {
	this.hLock();
	this.vLock();
	return this;
}

// Unlocks the calculated minimum width and height from the preferred width and height.
CCUI.Component.prototype.unlock = function() {
	this.hUnlock();
	this.vUnlock();
	return this;
}

// Gets the 'x' coordinate of the upper-left corner of the area which can be affected by painting this component. (with respect to its parent component.)
/*num*/ CCUI.Component.prototype.getPaintingX = function() {
	return this._x;
}

// Gets the 'y' coordinate of the upper-left corner of the area which can be affected by painting this component. (with respect to its parent component.)
/*num*/ CCUI.Component.prototype.getPaintingY = function() {
	return this._y;
}

// Gets the width of the area which can be affected by painting this component.
/*num*/ CCUI.Component.prototype.getPaintingWidth = function() {
	return this._width;
}

// Gets the height of the area which can be affected by painting this component.
/*num*/ CCUI.Component.prototype.getPaintingHeight = function() {
	return this._height;
}

// Sets the position of this component. (all parameters are optional; if a parameter is not specified than the corresponding property do not change.)
CCUI.Component.prototype.setPosition = function(/*opt num*/ x, /*opt num*/ y, /*opt num*/ width, /*opt num*/ height, /*opt num*/ z, /*opt num*/ w) {
	if(x !== undefined) {
		this.setX(x);
	}
	if(y !== undefined) {
		this.setY(y);
	}
	if(width !== undefined) {
		this.setWidth(width);
	}
	if(height !== undefined) {
		this.setHeight(height);
	}
	if(z !== undefined) {
		this.setZ(z);
	}
	if(w !== undefined) {
		this.setW(w);
	}
	return this;
}

/*bool*/ CCUI.Component.prototype.getVisible = function() {
	return this._visible;
}

CCUI.Component.prototype.setVisible = function(/*bool*/ visible) {
	this._visible = visible;
	this.makeAreaDirty();
	return this;
}

/*num*/ CCUI.Component.prototype.getX = function() {
	return this._x;
}

CCUI.Component.prototype.setX = function(/*num*/ x) {
	if(x !== this._x) {
		this._x = x;
		if(this._parent) {
			this._parent._setRecDescendantDirty();
		}
	}
	return this;
}

/*num*/ CCUI.Component.prototype.getY = function() {
	return this._y;
}

CCUI.Component.prototype.setY = function(/*num*/ y) {
	if(y !== this._y) {
		this._y = y;
		if(this._parent) {
			this._parent._setRecDescendantDirty();
		}
	}
	return this;
}

/*num*/ CCUI.Component.prototype.getWidth = function() {
	return this._width;
}

CCUI.Component.prototype.setWidth = function(/*num*/ width) {
	if(width !== this._width) {
		this._width = width;
		if(this._parent) {
			this._parent._setRecDescendantDirty();
		}
	}
	return this;
}

/*num*/ CCUI.Component.prototype.getHeight = function() {
	return this._height;
}

CCUI.Component.prototype.setHeight = function(/*num*/ height) {
	if(height !== this._height) {
		this._height = height;
		if(this._parent) {
			this._parent._setRecDescendantDirty();
		}
	}
	return this;
}

/*num*/ CCUI.Component.prototype.getZ = function() {
	return this._z;
}

CCUI.Component.prototype.setZ = function(/*num*/ z) {
	if(z !== this._z) {
		this._z = z;
		this.makeAreaDirty();
	}
	return this;
}

/*num*/ CCUI.Component.prototype.getW = function() {
	return this._w;
}

CCUI.Component.prototype.setW = function(/*num*/ w) {
	if(w !== this._w) {
		this._w = w;
		this.makeAreaDirty();
	}
	return this;
}

CCUI.Component.prototype.setActive = function(/*bool*/ active) {
	this._active = active;
	this.makeAreaDirty();
	//TODO: maybe fire an 'activate(/deactivate)' event...
	return this;
}

/*bool*/ CCUI.Component.prototype.getActive = function() {
	return this._active;
}

CCUI.Component.prototype.setFocused = function(/*bool*/ focused) {
	this._focused = focused;
	this.makeAreaDirty();
	//TODO: maybe fire an 'focused(/defocused)' event...
	return this;
}

/*bool*/ CCUI.Component.prototype.getFocused = function() {
	return this._focused;
}

// Recursively sets the canvas of this component and its whole sub-hierarchy.
// Normally need not be called by application programmers, as this is automatically handled when setting the canvas's rootComponent property
// and when adding a child or a sub-hierarchy to the hierarchy.
CCUI.Component.prototype.recSetCanvas = function(/*Canvas*/ canvas) {
	var length = this._children.length, i;
	this._canvas = canvas;
	for(i=0; i<length; i++) {
		this._children[i].recSetCanvas(canvas);
	}
	return this;
}

/*function(Component) or {style: function(Component)}*/ CCUI.Component.prototype.getStyleSheet = function() {
	return this._styleSheet;
}

CCUI.Component.prototype.setStyleSheet = function(/*function(Component) or {style: function(Component)}*/ styleSheet) {
	this._styleSheet = styleSheet;
	this.setNeedsStyling();
	var length = this._children.length, i;
	for(i=0; i<length; i++) {
		this._children[i].parentStyleSheetChanged();
	}
	return this;
}

// Propagates down setNeedsStyling() until descendants have explicit style sheet set.
// Called by Canvas and Component; need not be called from outside of the CCUI lib.
CCUI.Component.prototype.parentStyleSheetChanged = function() {
	if(!this._styleSheet) {
		this.setNeedsStyling();
		var length = this._children.length, i;
		for(i=0; i<length; i++) {
			this._children[i].parentStyleSheetChanged();
		}
	}
	return this;
}

// Translates the absolute canvas coordinates rootX, rootY to coordinates which are relative to this component.
/*{x: num, y: num}*/ CCUI.Component.prototype.translateRootCoords = function(/*num*/ rootX, /*num*/ rootY) {
	if(this._parent) {
		var pc = this._parent.translateRootCoords(rootX, rootY);
		return {x: pc.x - this._x, y: pc.y - this._y};
	} else {
		return {x: rootX, y: rootY};
	}
}

/*Component*/ CCUI.Component.prototype.getParent = function() {
	return this._parent;
}

// Returns an array with all the ancestors of this component:
// The first element of the returned array is the root component (the one with _parent === null),
// and the last element is this component.
/*array of Component*/ CCUI.Component.prototype.getAncestorStack = function() {
	var ret = [], co = this;
	while(co) {
		ret.push(co);
		co = co.getParent();
	}
	return ret.reverse();
}

// Returns whether the point (x,y) is inside this component. (x,y) are given in the parent's coordinate system.
/*bool*/ CCUI.Component.prototype.isPointInside = function (/*num*/ x, /*num*/ y) {
	return this._x <= x && x < (this._x + this._width) && this._y <= y && y < (this._y + this._height);
}

// Returns whether the ray (x,y) hits this component's (w=0,z=0) main wall or not.
// By default this returns constant true.
// Some special components may exist, for which not the whole bounding rectangle belongs to their area. (For example a rounded corner can cause this.)
// They should override this method.
/*bool*/ CCUI.Component.prototype.doesHit = function(/*num*/ x, /*num*/ y) {
	return true;
}

// Returns the appropriate mouse cursor style when the mouse cursor is at (x,y) (in this component's coordinate system).
// Component's implementation returns 'default', should be overridden in descendants if other cursor styles are needed.
/*string*/ CCUI.Component.prototype.getMouseCursorStyle = function(/*num*/ x, /*num*/ y) {
	return 'default';
}

// Casts a ray at (x,y).
// The parameters 'x' and 'y' are relative to this component's upper left corner.
// Returns null if the ray did not hit any component.
// Otherwise returns the component which is the deepest component in the stack of the closest (biggest w,z) hit.
/*Component*/ CCUI.Component.prototype.castRay = function (/*num*/ x, /*num*/ y) {
	// first put those children which can possibly be hit into the array 'canBeHit'.
	var length = this._children.length, i, child, canBeHit = [];
	for(i=0; i<length; i++) {
		child = this._children[i];
		if(child.isPointInside(x,y)) {
			canBeHit.push(child);
		}
	}

	// sort them by w-z
	this._zSortComponents(canBeHit);
	
	// go through canBeHit from top to bottom (reverse order).
	length = canBeHit.length;
	var isPositive = true, c, ret;
	for(i=length-1; i>=0; i--) {
		c = canBeHit[i];
		if(isPositive && (c._w < 0 || (c._w === 0 && c._z < 0))) {
			isPositive = false;
			if(this.doesHit(x,y)) {
				return this;
			}
		}
		ret = c.castRay(x - c._x, y - c._y);
		if(ret) {
			return ret;
		}
	}
	if(isPositive) {
		if(this.doesHit(x,y)) {
			return this;
		}
	}
	return null;
}

// Adds a free child to this component with the appropriate coordinates.
// x,y,z,w are optional: if not specified, the child's original coordinates remain.
CCUI.Component.prototype.addFreeChild = function (/*Component*/ child, /*opt num*/ x, /*opt num*/ y, /*opt num*/ z, /*opt num*/ w) {
	if(typeof x === 'number') {
		child.setX(x);
	}
	if(typeof y === 'number') {
		child.setY(y);
	}
	if(typeof z === 'number') {
		child.setZ(z);
	}
	if(typeof w === 'number') {
		child.setW(w);
	}
	this._addChild(child);
	this._freeChildren.push(child);
	return this;
}

// Forces the property 'properyName' of this component to be equal to 'value'.
// This means that every time this component is styled, this property will be set to this value afterwards. (Overriding what the stlyesheet has done).
// If 'alsoDoNow' is true the property is also set right now.
// Returns the force-key (which is the property name in this case) which can be used later to remove this 'force'.
// string force(string properyName, value, bool alsoDoNow=true)
//
// Forces the function 'fun' to be executed after every styling.
// Returns the force-key (a unique identfier of this 'force') which can be used later to remove this 'force'.
// string force(function fun, bool alsoDoNow=true)
/*string*/ CCUI.Component.prototype.force = function () {
	var alsoDoNow, forceKey;
	if(typeof arguments[0] === 'string') {
		var propertyName = arguments[0], value = arguments[1];
		forceKey = propertyName;
		this._forces[forceKey] = new CCUI.PropertyNameValue(propertyName, value);
		alsoDoNow = CCUI.dflt(arguments[2], true);
	} else if(typeof arguments[0] === 'function') {
		var fun = arguments[0];
		forceKey = '' + this._forceKeyCounter;
		this._forceKeyCounter += 1;
		this._forces[forceKey] = fun;
		alsoDoNow = CCUI.dflt(arguments[1], true);
	}
	if(alsoDoNow) {
		this.executeForce(forceKey);
	}
	return forceKey;
}


// Removes the force identified by 'force-key'.
CCUI.Component.prototype.removeForce = function (/*string*/ forceKey) {
	delete this._forces[forceKey];
	return this;
}

// Removes all the forces from this component.
CCUI.Component.prototype.removeAllForces = function () {
	this._forces = [];
	return this;
}

// Executes the force identified by 'forceKey'.
CCUI.Component.prototype.executeForce = function (/*string*/ forceKey) {
	var force = this._forces[forceKey];
	if(force instanceof CCUI.PropertyNameValue) {
		CCUI.setProperty(this, force.propertyName, force.value);
	} else if(typeof force === 'function') {
		force();
	}
	return this;
}

// Executes all the forces assigned to this component.
CCUI.Component.prototype.executeAllForces = function () {
	var forceKey;
	for(forceKey in this._forces) {
		if(this._forces.hasOwnProperty(forceKey)) {
			this.executeForce(forceKey);
		}
	}
	return this;
}

CCUI.Component.prototype._setDescendantNeedsStyling = function () {
	if(!this._descendantNeedsStyling) {
		this._descendantNeedsStyling = true;
		if(this._parent) {
			this._parent._setDescendantNeedsStyling(); // propagate upwards.
		}
	}
}

// Calling this method you can tell CCUI that this component needs to be styled at the next styling.
CCUI.Component.prototype.setNeedsStyling = function () {
	this._needsStyling = true;
	if(this._parent) {
		this._parent._setDescendantNeedsStyling();
	}
}

// Adds a child to this component.
CCUI.Component.prototype._addChild = function (/*Component*/ child) {
	this._children.push(child);
	child._parent = this;
	if(this._canvas && (!child._canvas)) {
		child.recSetCanvas(this._canvas);
	}

	if(child._descendantNeedsStyling || child._needsStyling) {
		this._setDescendantNeedsStyling();
	}

	child.setNeedsLayout();
	return this;
}

// Removes this child from this component.
CCUI.Component.prototype._removeChild = function (/*Component*/ child) {
	CCUI.remove(this._children, child);
	child._parent = null;
	child.recSetCanvas(null);
	this.setNeedsLayout();
	return this;
}

// Calculates the preferred width of the component.
// In 'Component' it returns a pretty arbitrary value: 50. Should be overridden in most descendants.
/*num*/ CCUI.Component.prototype._calcPreferredWidth = function () {
	return 50; // pretty arbitrary value... but there has to be a default.
}

// Calculates the preferred height of the component.
// In 'Component' it returns a pretty arbitrary value: 50. Should be overridden in most descendants.
/*num*/ CCUI.Component.prototype._calcPreferredHeight = function (/*opt num*/ forWidth) {
	return 50; // pretty arbitrary value... but there has to be a default.
}

CCUI.Component.prototype._getCalcdPreferredWidth = function () {
	if(this._calcdPreferredWidth === null) {
		this._calcdPreferredWidth = this._calcPreferredWidth();
	}
	return this._calcdPreferredWidth;
}

CCUI.Component.prototype._getCalcdPreferredHeight = function (forWidth) {
	if(forWidth !== undefined) {
		return this._calcPreferredHeight(forWidth);
	}
	if(this._calcdPreferredHeight === null) {
		this._calcdPreferredHeight = this._calcPreferredHeight();
	}
	return this._calcdPreferredHeight;
}

/*num*/ CCUI.Component.prototype.getPreferredWidth = function () {
	return (this._specdPreferredWidth === null) ? this._getCalcdPreferredWidth() : this._specdPreferredWidth;
}

CCUI.Component.prototype.setPreferredWidth = function (/*num*/ w) {
	this.setNeedsLayout();
	this._specdPreferredWidth = w;
	return this;
}

/*num*/ CCUI.Component.prototype.getPreferredHeight = function (/*opt num*/ forWidth) {
	return (this._specdPreferredHeight === null) ? this._getCalcdPreferredHeight(forWidth) : this._specdPreferredHeight;
}

CCUI.Component.prototype.setPreferredHeight = function (/*num*/ h) {
	this.setNeedsLayout();
	this._specdPreferredHeight = h;
	return this;
}

CCUI.Component.prototype.setPreferredSize = function (/*num*/ w, /*num*/ h) {
	this.setPreferredWidth(w);
	this.setPreferredHeight(h);
	return this;
}

// Sets the preferred width if it is in the [min-width ... max-width] interval and returns whether it was set or not.
/*bool*/ CCUI.Component.prototype.setPreferredWidthChecked = function (/*num*/ w) {
	var miw = this.getMinWidth(), maw = this.getMaxWidth();
	if((miw === (-1) || miw <= w) && (maw === (-1) || maw >= w)) {
		this.setPreferredWidth(w);
		return true;
	} else {
		return false;
	}
}

// Sets the preferred height if it is in the [min-height ... max-height] interval and returns whether it was set or not.
/*bool*/ CCUI.Component.prototype.setPreferredHeightChecked = function (/*num*/ h) {
	var mih = this.getMinHeight(), mah = this.getMaxHeight();
	if((mih === (-1) || mih <= h) && (mah === (-1) || mah >= h)) {
		this.setPreferredHeight(h);
		return true;
	} else {
		return false;
	}
}

// Calls setPreferredWidthChecked with 'w' and setPreferredHeightChecked with 'h'.
CCUI.Component.prototype.setPreferredSizeChecked = function (/*num*/ w, /*num*/ h) {
	this.setPreferredWidthChecked(w);
	this.setPreferredHeightChecked(h);
	return this;
}

// Calculates the minimum width of the component.
// In 'Component' it returns the preferred width if horizontally locked, otherwise returns 0.
// It is overridden in lots of descendants.
/*num*/ CCUI.Component.prototype._calcMinWidth = function () {
	return this._hLocked ? this.getPreferredWidth() : 0;
}

// Calculates the minimum height of the component.
// In 'Component' it returns the preferred height if vertically locked, otherwise returns 0.
// It is overridden in lots of descendants.
/*num*/ CCUI.Component.prototype._calcMinHeight = function () {
	return this._vLocked ? this.getPreferredHeight() : 0;
}

CCUI.Component.prototype._getCalcdMinWidth = function () {
	if(this._calcdMinWidth === null) {
		this._calcdMinWidth = this._calcMinWidth();
	}
	return this._calcdMinWidth;
}

CCUI.Component.prototype._getCalcdMinHeight = function () {
	if(this._calcdMinHeight === null) {
		this._calcdMinHeight = this._calcMinHeight();
	}
	return this._calcdMinHeight;
}

CCUI.Component.prototype.getMinWidth = function () {
	return (this._specdMinWidth === null) ? this._getCalcdMinWidth() : this._specdMinWidth;
}

CCUI.Component.prototype.setMinWidth = function (/*num*/ w) {
	this.setNeedsLayout();
	this._specdMinWidth = w;
	return this;
}

/*num*/ CCUI.Component.prototype.getMinHeight = function () {
	return (this._specdMinHeight === null) ? this._getCalcdMinHeight() : this._specdMinHeight;
}

CCUI.Component.prototype.setMinHeight = function (/*num*/ h) {
	this.setNeedsLayout();
	this._specdMinHeight = h;
	return this;
}

CCUI.Component.prototype.setMinSize = function (/*num*/ w, /*num*/ h) {
	this.setMinWidth(w);
	this.setMinHeight(h);
	return this;
}

// Calculates the maximum width of the component.
// In 'Component' it returns -1, which means no max-width. It can be overridden in descendants.
/*num*/ CCUI.Component.prototype._calcMaxWidth = function () {
	return -1; // no max width by default
}

// Calculates the maximum height of the component.
// In 'Component' it returns -1, which means no max-height. It can be overridden in descendants.
/*num*/ CCUI.Component.prototype._calcMaxHeight = function () {
	return -1; // no max height by default
}

CCUI.Component.prototype._getCalcdMaxWidth = function () {
	if(this._calcdMaxWidth === null) {
		this._calcdMaxWidth = this._calcMaxWidth();
	}
	return this._calcdMaxWidth;
}

CCUI.Component.prototype._getCalcdMaxHeight = function () {
	if(this._calcdMaxHeight === null) {
		this._calcdMaxHeight = this._calcMaxHeight();
	}
	return this._calcdMaxHeight;
}

/*num*/ CCUI.Component.prototype.getMaxWidth = function () {
	return (this._specdMaxWidth === null) ? this._getCalcdMaxWidth() : this._specdMaxWidth;
}

CCUI.Component.prototype.setMaxWidth = function (/*num*/ w) {
	this.setNeedsLayout();
	this._specdMaxWidth = w;
	return this;
}

/*num*/ CCUI.Component.prototype.getMaxHeight = function () {
	return (this._specdMaxHeight === null) ? this._getCalcdMaxHeight() : this._specdMaxHeight;
}

CCUI.Component.prototype.setMaxHeight = function (/*num*/ h) {
	this.setNeedsLayout();
	this._specdMaxHeight = h;
	return this;
}

CCUI.Component.prototype.setMaxSize = function (/*num*/ w, /*num*/ h) {
	this.setMaxWidth(w);
	this.setMaxHeight(h);
	return this;
}

CCUI.Component.prototype._resizeFreeChildren = function () {
	var length = this._freeChildren.length, i, fc;
	for(i=0; i<length; i++) {
		fc = this._freeChildren[i];
		fc.setWidth(fc.getPreferredWidth());
		fc.setHeight(fc.getPreferredHeight());
	}
	return this;	
}

CCUI.Component.prototype._callLayoutComponentOnChildren = function () {
	var length = this._children.length, i;
	for(i=0; i<length; i++) {
		this._children[i].layoutComponent();
	}
	return this;
}

// Override this method to set the 'x', 'y', 'width', 'height' properties of the non-free children of this component.
// Do not call this method or 'layoutComponent' recursively, and do not do optimization on _needsLayout flag:
// these things are handled by 'layoutComponent'.
// Don't call this method directly, this will be called by 'layoutComponent'.
// Component's 'layout' method is empty.
CCUI.Component.prototype.layout = function () {
	return this;
}



// Recursively styles components down the hierarchy if needed to be styled.
// The passed 'parentStyleSheet' is used if the component does not have an explicitly set stylesheet,
// otherwise the explicitly set stylesheet is used, and that is the one which is propagated downward as 'parentStyleSheet'.
// Please note that the children are styled before their parent.
CCUI.Component.prototype.styleComponent = function (/*function(Component) or {style: function(Component)}*/ parentStyleSheet) {
	var styleSheet = this._styleSheet ? this._styleSheet : parentStyleSheet;
	var child;

	if(this._descendantNeedsStyling) {
		var length = this._children.length, i;
		for(i=0; i<length; i++) {
			child = this._children[i];
			if(child._needsStyling || child._descendantNeedsStyling) {
				child.styleComponent(styleSheet);
			}
		}
	}	
	
	if(this._needsStyling && styleSheet) {
		if(typeof styleSheet === 'function') {
			styleSheet(this);
		} else {
			styleSheet.style(this);
		}
		this.executeAllForces();
	}

	this._descendantNeedsStyling = false;
	this._needsStyling = false;
	return this;
}

// This method is responsible for setting the 'x', 'y', 'width', 'height' properties of the children of this component
// and calling itself on them recursively.
// It is assumed that this method is only called after the 'width' and 'height' properties of this component are already set.
// In Component this method method does the following:
// - resizes free children 
// - calls itself on all the children recursively
// - calls 'layout' on this component
// - based on the '_needsLayout' flag it may decide not to call the above mentioned things at all (for performance reasons).
// This method should not be overridden: 'layout' should be overridden instead (which is empty in Component).
// You should not call this method. The 'Canvas.display' method will call this recursively on children.
CCUI.Component.prototype.layoutComponent = function () {
	if(this._needsLayout || (this._width !== this._lastLayedOutWidth) || (this._height !== this._lastLayedOutHeight)) {
		this.layout();
		this._resizeFreeChildren();
		this._callLayoutComponentOnChildren();
		this._needsLayout = false;
		this._lastLayedOutWidth = this._width;
		this._lastLayedOutHeight = this._height;
	}
	return this;
}

// Calls setNeedsLayout() and makeAreaDirty().
CCUI.Component.prototype.invalidate = function () {
	this.setNeedsLayout();
	this.makeAreaDirty();
	return this;
}

// Invalidates the layout of this Component by setting the _needsLayout flag to true, invalidating the cache of calculated min/preferred/max sizes, and
// calling setNeedsLayout recursively on all ancestors in the component hierarchy.
// This method should be called intelligently by descendant component classes when something changes on the component
// which could change its layout.
// TODO: handle this in removeChild and in 'hide from layout / show'.
CCUI.Component.prototype.setNeedsLayout = function () {
	if(!this._needsLayout) {
		this.setNeedsLayoutNonRec();
		if(this._parent) {
			this._parent.setNeedsLayout();
		}
	}
}

// Like setNeedsLayout, but does not touch ancestors. Use this method only if you really need this. Otherwise use 'setNeedsLayout'.
CCUI.Component.prototype.setNeedsLayoutNonRec = function () {
	if(!this._needsLayout) {
		this._needsLayout = true;
		this._calcdPreferredWidth = null;
		this._calcdPreferredHeight = null;
		this._calcdMinWidth = null;
		this._calcdMinHeight = null;
		this._calcdMaxWidth = null;
		this._calcdMaxHeight = null;		
	}
}

// Sort child components into drawing order by 'w', 'z'
CCUI.Component.prototype.zSort = function () {
	//TODO: caching
	this._zSortComponents(this._children);
}

CCUI.Component.prototype._zSortComponents = function (components) {
	components.sort(function(c1, c2) {
		var d = c1._w - c2._w;
		return (d === 0) ? (c1._z - c2._z) : d;
	});
}

// This method does the custom painting of a component at w=0,z=0.
// 'renderCtx' is the render context on which painting can be done.
// renderCtx's transformation matrix is already set up so that the upper left corner of the component
// is (0,0) in this paint function. 
// This method is empty for Component, so it is overridden in lots of descendants. 
//
// Guidelines for context state management:
// - The transformation matrix's state, and the clipping-region have to be set back to the starting value at the end of the paint.
// - States with very typically used default values can be assumed to have that value at the beginning of the paint, and
// should be set back to that value at the end (if changed during paint).
// Examples: globalAlpha (to 1.0), globalCompositeOperation (to 'source-over')
// - States with arbitrary default values can be changed arbitrarily and need not be set back to any value at the end of the paint.
// Examples: strokeStyle, fillStyle
// 
// Guidelines for speed optimization:
// CCUI's painting system sets the clipping region of the 'renderCtx' intelligently (based on dirty areas).
// This leads to speed improvement without the component's programmer doing anything about it, as a drawing operation
// will return immediately if it is outside the clipping region.
// However it can happen that the component programmer want to further optimize painting by avoiding to even calculate some values or
// to call otherwise immediately returning drawing operations.
// This can be achived usually using rendeCtx.getCrBounds(). Very subtle optimizations can even use renderCtx.getCr().
CCUI.Component.prototype.paint = function (/*RenderContext*/ renderCtx) {
}

// Paints the component at dirty rectangles.
// The dirty rectangles are meant in the coordinate space of this component's parent component.
// It is assumed that this method is called in such a way that 'renderCtx' is transformed to this component's coordinate system.
// This method guarantees that after the method is run 'renderCtx' will be transformed to the coordinate system it was called with.
// Internally this paints all the children in the appropriate w,z order, and calls paint() after children at w=0,z=0, before anything
// greater than w=0,z=0.
CCUI.Component.prototype.paintComponent = function (/*RenderContext*/ renderCtx, /*array of Rectangle*/ dirtyRects) {
	var dirtyBounds, newCachedArea;
	if(this._visible && dirtyRects.length > 0) {
		var localDirtyRects = this._calcLocalDirtyRects(dirtyRects);
		if(localDirtyRects.length > 0) {
			if(this._canComeFromCache) {
				//TODO: heuristics (especially when scrolling) about which territory to cache (e.g. recognize scrolling direction, scrolling speed...)
				//TODO: work on real smooth scrolling with rendering into cache using worker threads
				//TODO: consider also using cache if there was change but at least not in the territory which we cache...
				dirtyBounds = CCUI.Rectangle.bounding(localDirtyRects);
				newCachedArea = (!this._cachedArea) || (!this._cachedArea.rect.contains(dirtyBounds));
				if(newCachedArea) {
					// TODO: parametrize 100
					var x1 = Math.max(this.getPaintingX() - this._x, dirtyBounds.x - 100),
						y1 = Math.max(this.getPaintingY() - this._y, dirtyBounds.y - 100),
						x2 = Math.min(this.getPaintingWidth() + x1, dirtyBounds.x + dirtyBounds.width + 100),
						y2 = Math.min(this.getPaintingHeight() + y1, dirtyBounds.y + dirtyBounds.height + 100);
					var area = new CCUI.Rectangle(x1, y1, x2 - x1, y2 - y1);
					this._cachedArea = new CCUI.CachedArea(area);
					// fill the cache
					this._cachedArea.renderCtx.translate(-area.x, -area.y);
					this._paintComponentCore(this._cachedArea.renderCtx, [area]);
					this._cachedArea.renderCtx.translate(area.x, area.y);
				}
				this._paintFromCache(renderCtx, localDirtyRects);
			} else {
				this._paintComponentCore(renderCtx, localDirtyRects);
			}
			this._updateLastPainted();
		}
	}
	return this;
}

// The dirty rectangle's are meant in the coordinate space of this component.
// It is assumed that this method is called in such a way that renderCtx is transformed to this component's coordinate system.
// This method guarantees that after the method is run renderCtx will be transformed to the coordinate system it was called with.
CCUI.Component.prototype._paintComponentCore = function (/*RenderContext*/ renderCtx, /*array of Rectangle*/ localDirtyRects) {
	this.zSort();
	var length = this._children.length, i, c, isPositive = false;
	for(i=0; i<length; i++) {
		c = this._children[i];
		if(!isPositive && (c._w > 0 || (c._w === 0 && c._z >= 0))) {
			isPositive = true;
			this._paintLDR(renderCtx, localDirtyRects);
		}
		renderCtx.translate(c._x, c._y);
		c.paintComponent(renderCtx, localDirtyRects);
		renderCtx.translate(-c._x, -c._y);
	}
	if(!isPositive) {
		this._paintLDR(renderCtx, localDirtyRects);
	}	
}

// It is assumed that this method is called in such a way that renderCtx is transformed to this component's coordinate system.
CCUI.Component.prototype._paintFromCache = function (/*RenderContext*/ renderCtx, /*array of Rectangle*/ localDirtyRects) {
	var length = localDirtyRects.length, i, dRect, cacheRect = this._cachedArea.rect, canvas = this._cachedArea.canvas;	
	for(i=0; i<length; i++) {
		dRect = localDirtyRects[i];
		renderCtx.ctx2D.drawImage(canvas, dRect.x - cacheRect.x, dRect.y - cacheRect.y, dRect.width, dRect.height,
			dRect.x, dRect.y, dRect.width, dRect.height);
		//renderCtx.fillRect(dRect.x, dRect.y, dRect.x + dRect.width, dRect.y + dRect.height, 'rgba(0,0,200,0.4)');
	}
}

// Makes an area inside the component dirty.
// The parameter 'dirtyArea' can be the string 'all' or it can be a Rectangle (meant in the coordinate system of this component).
CCUI.Component.prototype.makeAreaDirty = function (/*Rectangle or 'all'*/ dirtyArea/*='all'*/) {
	dirtyArea = CCUI.dflt(dirtyArea, 'all');
	if(this._dirtyAreas !== 'all') {
		if(dirtyArea === 'all') {
			this._dirtyAreas = 'all';
		} else {
			this._dirtyAreas.push(dirtyArea);
		}
		if(this._parent) {
			this._parent._setRecDescendantDirty();
		}
	}
}

// Recursively sets the 'descendantDirty' property of this component and its anchestors.
CCUI.Component.prototype._setRecDescendantDirty = function () {
	if(!this._descendantDirty) {
		this._descendantDirty = true;
		if(this._parent) {
			this._parent._setRecDescendantDirty();
		}
	}
	return this;
}

CCUI.Component.prototype._updateLastPainted = function () {
	this._lastPaintedX = this.getPaintingX();
	this._lastPaintedY = this.getPaintingY();
	this._lastPaintedWidth = this.getPaintingWidth();
	this._lastPaintedHeight	= this.getPaintingHeight();
	return this;
}

// Paints this component at local dirty rectangles.
// 'dirtyRects' are local rectangles where we want to paint.
// 'renderCtx' must be already transformed to this component's coordinate system when calling this method.
CCUI.Component.prototype._paintLDR = function (/*RenderContext*/ renderCtx, /*const array of Rectangle*/ dirtyRects) {
	renderCtx.setCr(dirtyRects);
	this.paint(renderCtx);
	renderCtx.clearCr();
}


// 'dirtyRects' are dirty rectangles in the parent's coordinate system.
// This method returns the intersection of these with this component's painting bounds in this component's coordinate system.
/*array of Rectangle*/ CCUI.Component.prototype._calcLocalDirtyRects = function (/*array of Rectangle*/ dirtyRects) {
	var dirtyRectsLength = dirtyRects.length, i, dr, is, ldr, localDirtyRects = [];
	var paintingBounds = new CCUI.Rectangle(this.getPaintingX(), this.getPaintingY(), this.getPaintingWidth(), this.getPaintingHeight());
	for(i=0; i<dirtyRectsLength; i++) {
		dr = dirtyRects[i];
		if(dr.doesIntersect(paintingBounds)) {
			is = dr.intersect(paintingBounds);
			ldr = new CCUI.Rectangle(is.x - this._x, is.y - this._y, is.width, is.height);
			localDirtyRects.push(ldr);
		}
	}
	return localDirtyRects;
}

// Returns an array with the dirty rectangles which are caused by this component and its descendants.
// The rectangles are meant in this component's parent's coordinate system.
/*array of Rectangle*/ CCUI.Component.prototype.determineCausedDirtyRectangles = function () {
	var ret = [], i, thisRect, rect, child, childResults, childResultsLength, j, childResult;
	var thisPaintingBound = new CCUI.Rectangle(this.getPaintingX(), this.getPaintingY(), this.getPaintingWidth(), this.getPaintingHeight());

	this._determineCanComeFromCache();
	
	if(this._isMoved()) {
		// In this case we don't have to worry about dirtyAreas and descendants as they cannot reach out of this returned region.
		if(this._lastPaintedX === undefined) {
			ret.push(thisPaintingBound);
		} else {
			ret.push(new CCUI.Rectangle.bounding(this.getPaintingX(), this.getPaintingY(), this.getPaintingWidth(), this.getPaintingHeight(),
				this._lastPaintedX, this._lastPaintedY, this._lastPaintedWidth, this._lastPaintedHeight));
		}
		this._recClearDirtyAreas();
	} else {
		// determine dirty rectangles caused by dirtyAreas.
		if(this._dirtyAreas === 'all') {
			// In this case we don't have to worry about descendants
			ret.push(thisPaintingBound);
			this._recClearDirtyAreas();
		} else  {
			thisRect = new CCUI.Rectangle(this._x, this._y, this._width, this._height);
			for(i=0; i<this._dirtyAreas.length; i++) {
				rect = this._dirtyAreas[i];
				var is1 = new CCUI.Rectangle(rect.x + this._x, rect.y + this._y, rect.width, rect.height).intersect(thisPaintingBound);
				if(!is1.isEmpty()) {
					ret.push(is1);
				}
			}
			// determine dirty rectangles caused by descendants.
			if(this._descendantDirty) {
				var childrenLength = this._children.length;
				for(i=0; i<childrenLength; i++) {
					child = this._children[i];
					childResults = child.determineCausedDirtyRectangles();
					childResultsLength = childResults.length;
					for(j=0; j<childResultsLength; j++) {
						childResult = childResults[j];
						var is2 = new CCUI.Rectangle(childResult.x + this._x, childResult.y + this._y, childResult.width, childResult.height).intersect(thisRect);
						if(!is2.isEmpty()) {
							ret.push(is2);
						}
					}
				}
			}
			if(this._canvas && ret.length > 0 && this._canvas.isTooCrowded(this, ret)) {
				var bo = Rectangle.bounding(ret);
				ret = [];
				ret.push(bo);
			}
		}
	}
	this._dirtyAreas = [];
	this._descendantDirty = false;
	return ret;	
}

CCUI.Component.prototype._determineCanComeFromCache = function() {
	this._canComeFromCache = this.cacheable && this.getPaintingWidth() === this._lastPaintedWidth && this.getPaintingHeight() === this._lastPaintedHeight
			&& this._dirtyAreas != 'all' && this._dirtyAreas.length === 0 && (!this._descendantDirty);
			
	if(!this._canComeFromCache) {
		this._cachedArea = null;
	}
}

CCUI.Component.prototype._recClearDirtyAreas = function() {
	this._dirtyAreas = [];
	if(this._descendantDirty) {
		var childrenLength = this._children.length, i, child;
		for(i=0; i<childrenLength; i++) {
			child = this._children[i];
			child._determineCanComeFromCache();
			child._recClearDirtyAreas();
		}
	}
	this._descendantDirty = false;
}

/*bool*/ CCUI.Component.prototype._isMoved = function() {
	return this.getPaintingX() !== this._lastPaintedX || this.getPaintingY() !== this._lastPaintedY ||
		this.getPaintingWidth() !== this._lastPaintedWidth || this.getPaintingHeight() !== this._lastPaintedHeight;
}


// TODO: Textual GridPanel specification in case of non overlapping cells.
// suport a multiline string, which represents the grid.
// homes of components are represented with uppercase letters, non home positions with the same letter only lowercase. 
// Then you can bind components to letters, meanwhile specifying alignment and fill the following way:
// l: left L: left align and horiz. fill
// r: right R: right align and horiz. fill
// t: top T: top align and vert. fill
// b: bottom B: bottom align and vert. fill


/*
 * class GridCell
 *
 * Represents a cell of a GridPanel. A cell contains zero or one component.
 *
 * GridCell(argObj)
 * argObj contains all the arguments as members.
 */
CCUI.GridCell = function(/*Component*/ component,
		/*string*/ horizAlign/*='left'*/, /*bool*/ horizFill/*=false*/, /*string*/ vertAlign/*='top'*/, /*bool*/ vertFill/*=false*/,
		/*int*/ topSpan/*=0*/, /*int*/ bottomSpan/*=0*/, /*int*/ leftSpan/*=0*/, /*int*/ rightSpan/*=0*/) {
	var direct = (component instanceof CCUI.Component);
	var obj = arguments[0];
	/*Component*/ this.component = direct ? component : obj.component;
	/*string*/ this.horizAlign = CCUI.dflt(direct ? horizAlign : obj.horizAlign, 'left'); // Tells how the component aligns in the cell horizontally. Possible values: 'left', 'right'.
	/*bool*/ this.horizFill = CCUI.dflt(direct ? horizFill : obj.horizFill, false); // Tells whether the component tries to fill the cell's space horizontally when the cell is wider than the component's preferred width.
	/*string*/ this.vertAlign = CCUI.dflt(direct ? vertAlign : obj.vertAlign, 'top'); // Tells how the component aligns in the cell vertically. Possible values: 'top', 'bottom'.
	/*bool*/ this.vertFill = CCUI.dflt(direct ? vertFill : obj.vertFill, false); // Tells whether the component tries to fill the cell's space vertically when the cell is taller than the component's preferred height.
	/*int*/ this.topSpan = CCUI.dflt(direct ? topSpan : obj.topSpan, 0); // This cell spans this amount of cell units in the 'top' direction.
	/*int*/ this.bottomSpan = CCUI.dflt(direct ? bottomSpan : obj.bottomSpan, 0); // This cell spans this amount of cell units in the 'bottom' direction.
	/*int*/ this.leftSpan = CCUI.dflt(direct ? leftSpan : obj.leftSpan, 0); // This cell spans this amount of cell units in the 'left' direction.
	/*int*/ this.rightSpan = CCUI.dflt(direct ? rightSpan : obj.rightSpan, 0); // This cell spans this amount of cell units in the 'right' direction.
}

// Returns how many cell units this cell spans vertically.
/*int*/ CCUI.GridCell.prototype.getRowSpan = function() {
	return this.topSpan + this.bottomSpan + 1;
}

// Returns how many cell units this cell spans horizontally.
/*int*/ CCUI.GridCell.prototype.getColumnSpan = function() {
	return this.leftSpan + this.rightSpan + 1;
}


/*
 * class CRSpec
 * Column or row specification.
 */
CCUI.CRSpec = function(/*num*/ priority/*=1*/, /*num*/ strength/*=1*/) {
	/*num*/ this.priority = CCUI.dflt(priority, 1);
	/*num*/ this.strength = CCUI.dflt(strength, 1);
}

/*
 * class Stretchable
 *
 * Stretchable is an abstract concept. It represents something which can be stretched in one dimension.
 */
CCUI.Stretchable = function(/*num*/ priority, /*num*/ strength, /*num*/ stretchLimit) {
	/*num*/ this.priority = priority; 	// higher priority Stretchable-s are stretched only if lower priority
										// Stretchable-s are already stretched to their limits.
	/*num*/ this.strength = strength; // how hard it is to stretch it by one unit
	/*num*/ this.stretchLimit = stretchLimit; // how much it can stretch
	/*num*/ this.stretch = 0; // how much it has stretched
}

/*
 * class StretchCalculator
 */
CCUI.StretchCalculator = function() {
}

// This method takes an array of Stretchable-s, and a number which tells how much they must stretch alltogether.
// It sets the 'stretch' member of the the Stretchable-s, which means how much those individual pieces will stretch.
// When a Stretcheble stretches we also say it 'consumes' a certain amount of stretch.
// Returns the remaining amount of stretch that was not consumed (because of the stretchLimit mebers of the stretchables).
// Time complexity: O(n * log(n)) where 'n' is the number of stretchables.
/*num*/ CCUI.StretchCalculator.prototype.calcStretches = function(/*array of Stretchable*/ stretchables, /*num*/ toStretchSum, /*bool*/ considerStretchLimits) {
	stretchables = CCUI.cloneArray(stretchables); // we clone the stretchables array because we don't want to modify its order by sorting.

	// sort stretchables by priority (ascending).
	stretchables.sort(function(s1, s2) {
		return s1.priority - s2.priority;
	});	

	// Stretchables with the same priority constitute a priority-group.
	// Priority groups consume the stretch separately.
	var length = stretchables.length, i, stretchable, lastPriority = null, actGroupStartIndex = 0;
	for(i=0; i<length; i++) {
		stretchable = stretchables[i];
		if(stretchable.priority !== lastPriority) { // start a new priority-group
			if(lastPriority !== null) {
				toStretchSum = this._consumeStretches(stretchables.slice(actGroupStartIndex, i), toStretchSum, considerStretchLimits);
				if(toStretchSum <= 0) {
					break;
				}
			}
			actGroupStartIndex = i;
			lastPriority = stretchable.priority;
		}
	}
	if(toStretchSum > 0 && lastPriority !== null) {
		toStretchSum = this._consumeStretches(stretchables.slice(actGroupStartIndex, length), toStretchSum, considerStretchLimits);
	}

	return toStretchSum;
}

// Tries to consume as much stretch from 'toStretchSum' as possible using weighted stretching.
// fills the 'stretch' member of the stretchables.
// Returns the remaining stretch which was not consumed.
// Note that this method reorders the 'stretchables' array.
// Time complexity: O(n * log(n)) where 'n' is the number of stretchables.
/*num*/ CCUI.StretchCalculator.prototype._consumeStretches = function(/*array of Stretchable*/ stretchables, /*num*/ toStretchSum, /*bool*/ considerStretchLimits) {
	var length = stretchables.length, i, s;
	
	if(considerStretchLimits) {
		for(i=0; i<length; i++) {
			s = stretchables[i];
			s.weightedStretchLimit = s.strength * s.stretchLimit;
		}
		// sort pieces by 'weightedStretchLimit'.
		stretchables.sort(function(s1, s2) {
			return s1.weightedStretchLimit - s2.weightedStretchLimit;
		});

		// We use the following theorem: resultant strength of p1 and p2 = 1/(average(1/p1.strength, 1/p2.strength))
		var avgRecStrengthFroms = [], // array for each position: average reciproc-strengths from the given position.
		sumRecStrengths = 0, pos;
		for(i=0; i<length; i++) {
			pos = length - 1 - i;
			sumRecStrengths += ( 1 / stretchables[pos].strength);
			avgRecStrengthFroms[pos] = sumRecStrengths / (i+1);
		}

		var weightedStretchLimitSumStage, // the remaining pieces can altogether stretch this amount in weighted space at the given stage.
			stretchLimitSumStage, // the remaining pieces can altogether stretch this amount in real space at the given stage.
			toStretchSumStage, // the remaining pieces will altogether stretch this amount in real space at the given stage.
			weightedToStretchSumStage, // the remaining pieces will altogether stretch this amount in weighted space at the given stage.
			weightedToStretchSoFar = 0, // a piece attending in all stages so far stretches this amount in weighted space so far.
			ready = false; // if true, no more stages necessary, we only have to give the remaining pieces the stretch calculated so far.
		// Each value of 'i' represents a stage.
		for(i=0; i<length; i++) {
			s = stretchables[i];
			if(!ready) {
				weightedStretchLimitSumStage = (length - i) * (s.weightedStretchLimit - weightedToStretchSoFar);
				stretchLimitSumStage = weightedStretchLimitSumStage * avgRecStrengthFroms[i];
				toStretchSumStage = (stretchLimitSumStage < toStretchSum) ? stretchLimitSumStage : toStretchSum;
				weightedToStretchSumStage = toStretchSumStage / avgRecStrengthFroms[i];
				if(toStretchSum === toStretchSumStage) ready = true;
				toStretchSum -= toStretchSumStage;
				weightedToStretchSoFar += (weightedToStretchSumStage / (length - i));
			}
			s.stretch = weightedToStretchSoFar / s.strength;	
		}
		return toStretchSum;
	} else { // no stretch limits.
		var sumRecStrengths = 0;
		for(i=0; i<length; i++) {
			s = stretchables[i];
			sumRecStrengths += 1/s.strength;
		}
		var x = toStretchSum / sumRecStrengths;
		for(i=0; i<length; i++) {
			s = stretchables[i];
			s.stretch = x / s.strength;
		}
		return 0; // we consumed everything.
	}
}


/*
 * class GridPanel extends Component
 *
 * GridPanel is a container component which lays out its children in a dynamic grid.
 *
 * A GridPanel is a matrix of cells.  Each cell can have zero or one component in it.
 * You can specify gaps between the rows and columns, and padding around the matrix of cells.
 * You can specify padding and gap values in pixels. These do not change dynamically, they are always set to the fix value you specified.
 *
 * When you add a component, in both directions you can set its alignment and whether it fills the cell or not when the cell is bigger than the component's preferred size in the appropriate direction.
 *
 * Components can span across multiple columns and rows, but there are some restrictions:
 *
 * Every component has a 'home cell', but can also span out of it in all directions. The following properties determine this: topSpan, bottomSpan, leftSpan, rightSpan.
 * (All are 0 by default).
 *
 * Although a component can span into several rows/columns, every component can affect only its home column's / row's size during the layout process.
 *
 * Let's define a directed graph, where nodes are the columns of the GridPanel, and an edge is drawn from
 * column A to column B if a component with home B spans into A. (B depends on A)  
 * Let's also define a similar graph for the rows.
 * A GridPanel is valid only if there is no directed circle in these graphs.
 *
 * The minimum/preferred/maximum size calculator algorithm first creates an order of the columns (and rows),
 * in which if A -> B in the graph, then A < B in this order.
 * Minimum/preferred/maximum size is determined for all columns (and rows) in this order.
 * When calculating minimum/preferred/maximum sizes of a column, first the components' home-minimum/preferred/maximum size is calculated.
 * This is the component's minimum/preferred/maximum size minus the minimum/preferred/maximum size of the spanned columns (which are already calculated
 * as they are above in the order.)
 *
 * The minimum size of a column (or row) is the maximum of all the components' home-minimum sizes in it.
 *
 * The preferred size of a column (or row) is the maximum of all the components'  home-preferred sizes in it.
 *
 * GridPanel does not maintain the maximum size of columns/rows (maxSize is -1).
 * Of course it takes into account the max size of components. If fill=true, but max size is reached, the component is treated
 * as if fill=false (in the appropriate direction). 
 *
 * The minimum size of a (column or row) can be specified directly in GridPanel.
 * This specified value will be just used as one of the values of which we calculate maximum from.
 *
 * The preferred size of a (column or row) also can be specified directly in GridPanel.
 * This will override all the component preferred sizes for that row/column.
 *
 * All columns and rows have a priority and a strength value.
 * During layout the lowest priority columns are stretched away from their preferred widths as much as possible,
 * columns with higher priority are stretched later only if still needed.
 * Between columns with the same priority the strength property is used to distribute space.
 * The same is true for rows.
 *
 * Constructor: Creates a GridPanel with 'numOfColumns' number of columns and 'numOfRows' number of rows.
 */
CCUI.GridPanel = function(/*int*/ numOfColumns, /*int*/ numOfRows) {
	CCUI.Component.call(this); // super constructor
	this._gridCells = new CCUI.Matrix(numOfColumns, numOfRows);
	
	/*array of CRSpec*/ this._columnSpecs = this._createDefaultCRSpecs(numOfColumns);
	/*array of CRSpace*/ this._rowSpecs = this._createDefaultCRSpecs(numOfRows);

	this._stretchCalculator = new CCUI.StretchCalculator();

	this.setPadding({top: 8, bottom: 8, left: 8, right: 8});
	this.setDefaultGaps(10, 10);
	// {top: num, bottom: num, left:num, right:num} _padding
	// num this._horizDefaultGap : The default gap between columns. All the horizontal gaps become this value when calling resetHorizGaps.
	// num this._vertDefaultGap : The default gap between rows. All the vertical gaps become this value when calling resetVertGaps.
	// array of num this._horizGaps : Gaps between columns.
	// array of num this._vertGaps : Gaps between rows.

	/*fill-style*/ this._backgroundStyle = null; // Specifies the background of this GridPanel. A falsy value means that there is no background. (This is the default.)

	this._calcLayoutOrdersNeeded = true;
}
CCUI.GridPanel.prototype = new CCUI.Component();

/*fill-style*/ CCUI.GridPanel.prototype.getBackgroundStyle = function () {
	return this._backgroundStyle;
}

CCUI.GridPanel.prototype.setBackgroundStyle = function (/*fill-style*/ backgroundStyle) {
	this._backgroundStyle = backgroundStyle;
	this.makeAreaDirty();
	return this;
}

/*array of CRSpec*/ CCUI.GridPanel.prototype._createDefaultCRSpecs = function(/*int*/ count) {
	var ret = [], i;
	for(i=0; i<count; i++) {
		ret.push(new CCUI.CRSpec(1, 1));
	}
	return ret;
}


// Makes 'cell' the home cell at coordinates: (column, row).
// setCell(int column, int row, GridCell cell)
//
// argObj is an object with the arguments of setCell(...) as members (except 'column' and 'row').
// setCell(int column, int row, argObj)
//
// Sets 'component' into the home-cell with coordinates: (column, row).
// There can be only one component in a cell. If there were already a component at this cell, then that is removed.
// The attributes of the cell are determined by the string 'cellSpec'.
// It has the following syntax:
// The specifier string is made up of one or two chunks (separated by whitespace).
// A chunk contains one alphanumeric character (specifier character) among the following characters: 'l', 'L', 'r', 'R', 't', 'T', 'b', 'B'.
// - 'l' and 'L' means left horizontal alignment 
// - 'r' and 'R' means right horizontal alignment 
// - 't' and 'T' means top vertical alignment 
// - 'b' and 'B' means bottom vertical alignment
// The uppercase character always means fill=true in that direction.
// There can be a number before and/or after the alphanumeric character.
// In case of a horizontal specifier ('l', 'L', 'r', 'R') the number before the specifier character means 'leftSpan',
// the number after the specifier character means 'rightSpan'.
// In case of a vertical specifier ('t', 'T', 'b', 'B') the number before the specifier character means 'topSpan',
// the number after the specifier character means 'bottomSpan'.
// The default value of anything unspecified is the same as in the GridCell constructor.
// setCell(int column, int row, Component component, string cellSpec)
//
// Sets 'component' into the home-cell with coordinates: (column, row).
// There can be only one component in a cell. If there were already a component at this cell, then that is removed.
// For the meaning of the parameters see the properties of GridCell.
CCUI.GridPanel.prototype.setCell = function (/*int*/ column, /*int*/ row, /*Component*/ component,
		/*string*/ horizAlign/*='left'*/, /*bool*/ horizFill/*=false*/, /*string*/ vertAlign/*='top'*/, /*bool*/ vertFill/*=false*/,
		/*int*/ topSpan/*=0*/, /*int*/ bottomSpan/*=0*/, /*int*/ leftSpan/*=0*/, /*int*/ rightSpan/*=0*/) {
	this._calcLayoutOrdersNeeded = true;
	if(component instanceof CCUI.GridCell) {
		var cell = component;
		var oldCell = this._gridCells.get(column, row);
		if(oldCell) {
			this.clearCell(column, row);
		}
		this._gridCells.set(column, row, cell);
		this._addChild(cell.component);		
	} else if(component instanceof CCUI.Component) {
		if((!horizAlign) || horizAlign === 'left' || horizAlign === 'right') {
			this.setCell(column, row, new CCUI.GridCell(component, horizAlign, horizFill, vertAlign, vertFill,
				topSpan, bottomSpan, leftSpan, rightSpan));
		} else {
			this._setCellByText(column, row, component, horizAlign);
		}
	} else {
		var argObj = component;
		this.setCell(column, row, new CCUI.GridCell(argObj));
	}
	return this;
}

CCUI.GridPanel._specifierChars = ['l', 'L', 'r', 'R', 't', 'T', 'b', 'B'];

CCUI.GridPanel.prototype._setCellByText = function(/*int*/ column, /*int*/ row, /*Component*/ component, /*string*/ cellSpec) {
	var err = function() {
		throw {name: 'cell_spec_syntax_error', message: "Cell specifier syntax error in: [" + cellSpec + ']'};
	}

	// returns the specifier char found in 'str' or null if not found.
	var findSpecifierChar = function(str) {
		var sChars = CCUI.GridPanel._specifierChars, sChar, j;
		for(j=0; j<sChars.length; j++) {
			sChar = sChars[j];
			if(str.indexOf(sChar) !== (-1)) {
				return sChar;
			}
		}
		return null;
	}
	
	var gridCell = new CCUI.GridCell(component), chunks = CCUI.whiteSpaceSplit(cellSpec), i, chunk;
	if(chunks.length > 2) {
		err();
	}
	for(i=0; i<chunks.length; i++) {
		chunk = chunks[i];
		var ch = findSpecifierChar(chunk);
		if(!ch) {
			err();
		}
		var index = chunk.indexOf(ch);
		if(ch === 'l') {
			gridCell.horizAlign = 'left';
			gridCell.horizFill = false;
		} else if(ch === 'L') {
			gridCell.horizAlign = 'left';
			gridCell.horizFill = true;		
		} else if(ch === 'r') {
			gridCell.horizAlign = 'right';
			gridCell.horizFill = false;		
		} else if(ch === 'R') {
			gridCell.horizAlign = 'right';
			gridCell.horizFill = true;		
		} else if(ch === 't') {
			gridCell.vertAlign = 'top';
			gridCell.vertFill = false;		
		} else if(ch === 'T') {
			gridCell.vertAlign = 'top';
			gridCell.vertFill = true;		
		} else if(ch === 'b') {
			gridCell.vertAlign = 'bottom';
			gridCell.vertFill = false;		
		} else if(ch === 'B') {
			gridCell.vertAlign = 'bottom';
			gridCell.vertFill = true;	
		}
		var span1 = 0, span2 = 0;
		if(index !== 0) {
			span1 = parseInt(chunk.slice(0, index));
			if(isNaN(span1)) {
				err();
			}
		}
		if(index !== (chunk.length - 1)) {
			span2 = parseInt(chunk.slice(index+1, chunk.length));
			if(isNaN(span1)) {
				err();
			}		
		}
		if(ch === 'l' || ch === 'L' || ch === 'r' || ch === 'R') {
			gridCell.leftSpan = span1;
			gridCell.rightSpan = span2;
		} else {
			gridCell.topSpan = span1;
			gridCell.bottomSpan = span2;
		}
	}
	this.setCell(column, row, gridCell);
	return this;
}

// If there is a component in the cell at coordinates ('column', 'row'), this method removes it. 
CCUI.GridPanel.prototype.clearCell = function (/*int*/ column, /*int*/ row) {
	var cell = this._gridCells.get(column, row);
	if(cell && cell.component) {
		this._removeChild(cell.component);
		this._gridCells.set(column, row, null);
	}
	return this;
}

CCUI.GridPanel.prototype.setColumnSpecs = function(/*array of CRSpec*/ columnSpecs) {
	this._columnSpecs = columnSpecs;
	return this;
}

// Sets the index-th column-spec.
// setColumnSpec(int index, CRSpec columnSpec)
//
// Sets the index-th column-spec.
// setColumnSpec(int index, num priority=1, num strength=1)
CCUI.GridPanel.prototype.setColumnSpec = function() {
	var index = arguments[0];
	this._columnSpecs[index] = (arguments[1] instanceof CCUI.CRSpec) ? arguments[1] : new CCUI.CRSpec(arguments[1], arguments[2]);
	return this;
}

CCUI.GridPanel.prototype.setRowSpecs = function(/*array of CRSpec*/ rowSpecs) {
	this._rowSpecs = rowSpecs;
	return this;
}

// Sets the index-th row-spec.
// setRowSpec(int index, CRSpec columnSpec)
//
// Sets the index-th row-spec.
// setRowSpec(int index, num priority=1, num strength=1)
CCUI.GridPanel.prototype.setRowSpec = function() {
	var index = arguments[0];
	this._rowSpecs[index] = (arguments[1] instanceof CCUI.CRSpec) ? arguments[1] : new CCUI.CRSpec(arguments[1], arguments[2]);
	return this;
}

// Sets column and row specs.
CCUI.GridPanel.prototype.setCRSpecs = function(/*array of CRSpec*/ columnSpecs, /*array of CRSpec*/ rowSpecs) {
	this.setColumnSpecs(columnSpecs);
	this.setRowSpecs(rowSpecs);
	return this;
}

// Sets the padding of this GridPanel.
CCUI.GridPanel.prototype.setPadding = function(/*{top: num, bottom: num, left:num, right:num}*/ padding) {
	this._padding = padding;
	return this;
}

// Sets the horizontal default gap. If 'resetGaps'=true then also calls resetHorizGaps().
CCUI.GridPanel.prototype.setHorizDefaultGap = function(/*num*/ horizDefaultGap, /*bool*/ resetGaps/*=true*/) {
	resetGaps = CCUI.dflt(resetGaps, true);
	this._horizDefaultGap = horizDefaultGap;
	if(resetGaps) {
		this.resetHorizGaps();
	}
	return this;
}

// Makes all the horizontal gaps equal to the default horizontal gap.
CCUI.GridPanel.prototype.resetHorizGaps = function() {
	var numOfGaps = this._gridCells.getWidth() - 1, i;
	this._horizGaps = [];
	for(i=0; i<numOfGaps; i++) {
		this._horizGaps.push(this._horizDefaultGap);
	}
	return this;
}

// Sets the vertical default gap. If 'resetGaps'=true then also calls resetVertGaps().
CCUI.GridPanel.prototype.setVertDefaultGap = function(/*num*/ vertDefaultGap, /*bool*/ resetGaps/*=true*/) {
	resetGaps = CCUI.dflt(resetGaps, true);
	this._vertDefaultGap = vertDefaultGap;
	if(resetGaps) {
		this.resetVertGaps();
	}
	return this;
}

// Makes all the vertical gaps equal to the default vertical gap.
CCUI.GridPanel.prototype.resetVertGaps = function() {
	var numOfGaps = this._gridCells.getHeight() - 1, i;
	this._vertGaps = [];
	for(i=0; i<numOfGaps; i++) {
		this._vertGaps.push(this._vertDefaultGap);
	}
	return this;
}

// Sets the horizontal and vertical default gaps, and if 'resetGaps=true' then calls resetHorizGaps() and resetVertGaps().
CCUI.GridPanel.prototype.setDefaultGaps = function(/*num*/ horizDefaultGap, /*num*/ vertDefaultGap, /*bool*/ resetGaps/*=true*/) {
	this.setHorizDefaultGap(horizDefaultGap, resetGaps);
	this.setVertDefaultGap(vertDefaultGap, resetGaps);
	return this;
}

CCUI.GridPanel.prototype.setHorizGaps = function(/*array of num*/ horizGaps) {
	this._horizGaps = horizGaps;
	return this;
}

CCUI.GridPanel.prototype.setVertGaps = function(/*array of num*/ vertGaps) {
	this._vertGaps = vertGaps;
	return this;
}

// Sets the horizontal and vertical gaps.
CCUI.GridPanel.prototype.setGaps = function(/*array of num*/ horizGaps, /*array of num*/ vertGaps) {
	this.setHorizGaps(horizGaps);
	this.setVertGaps(vertGaps);
	return this;
}

// Sets the 'index'-th horizontal gap.
CCUI.GridPanel.prototype.setHorizGap = function(/*int*/ index, /*num*/ gap) {
	this._horizGaps[index] = gap;
	return this;
}

// Sets the 'index'-th vertical gap.
CCUI.GridPanel.prototype.setVertGap = function(/*int*/ index, /*num*/ gap) {
	this._vertGaps[index] = gap;
	return this;
}

CCUI.GridPanel.prototype._calcLayoutOrders = function() {
	var w = this._gridCells.getWidth(), h = this._gridCells.getHeight(), i, columnSpans = [], rowSpans = [];
	for(i=0; i<w; i++) {
		columnSpans.push({startSpan: 0, endSpan: 0});
	}
	for(i=0; i<h; i++) {
		rowSpans.push({startSpan: 0, endSpan: 0});
	}

	this._forAllNonEmptyCells(function(cell, x, y) {
		var cSpan = columnSpans[x];
		if(cell.leftSpan > cSpan.startSpan) {
			cSpan.startSpan = cell.leftSpan;
		}
		if(cell.rightSpan > cSpan.endSpan) {
			cSpan.endSpan = cell.rightSpan;
		}
		
		var rSpan = rowSpans[y];
		if(cell.topSpan > rSpan.startSpan) {
			rSpan.startSpan = cell.topSpan;
		}
		if(cell.bottomSpan > rSpan.endSpan) {
			rSpan.endSpan = cell.bottomSpan;
		}		
	});

	try {
		this._columnLayoutOrder = this._calcCRLayoutOrder(columnSpans);
	} catch(e) {
		if(e.name === 'invalid_layout') {
			e.message = 'Invalid layout. Column ' + e.inCircleIndex + ' is in a span-dependency circle.'
		}
		throw e;
	}

	try {
		this._rowLayoutOrder = this._calcCRLayoutOrder(rowSpans);
	} catch(e) {
		if(e.name === 'invalid_layout') {
			e.message = 'Invalid layout. Row ' + e.inCircleIndex + ' is in a span-dependency circle.'
		}
		throw e;
	}
	this._calcLayoutOrdersNeeded = false;
	return this;
}

// Time complexity: O(c*r) where c is the number of columns and r is the number of rows.
CCUI.GridPanel.prototype._calcMinWidth = function () {
	return CCUI.sum(this._calcCRLengths('min', false)) + this._getAdditionalLength(false);
}

// Time complexity: O(c*r) where c is the number of columns and r is the number of rows.
CCUI.GridPanel.prototype._calcMinHeight = function () {
	return CCUI.sum(this._calcCRLengths('min', true)) + + this._getAdditionalLength(true);
}

// Time complexity: O(c*r) where c is the number of columns and r is the number of rows.
CCUI.GridPanel.prototype._calcPreferredWidth = function () {
	return CCUI.sum(this._calcCRLengths('pref', false)) + this._getAdditionalLength(false);
}

// TODO: what to do with forWidth in case of GridPanel?
// Time complexity: O(c*r) where c is the number of columns and r is the number of rows.
CCUI.GridPanel.prototype._calcPreferredHeight = function (/*opt num*/ forWidth) {
	return CCUI.sum(this._calcCRLengths('pref', true)) + this._getAdditionalLength(true);
}

CCUI.GridPanel.prototype._calcMaxWidth = function () {
	return -1;
}

CCUI.GridPanel.prototype._calcMaxHeight = function () {
	return -1;
}

// Time complexity: O(c*r) where c is the number of columns and r is the number of rows.
CCUI.GridPanel.prototype.layout = function () {
	CCUI.Component.prototype.layout.call(this); // super.layout()

	// horizontal layout	
	// if minimal width is greater than width, we have to lay out to minimal width, but it will be of course clipped at width when painted.
	this._oneDimLayout(false, Math.max(this.getMinWidth(), this._width));

	// vertical layout	
	// if minimal height is greater than height, we have to lay out to minimal height, but it will be of course clipped at height when painted.
	this._oneDimLayout(true, Math.max(this.getMinHeight(), this._height));

	return this;
}

CCUI.GridPanel.prototype.paint = function (renderCtx) {
	renderCtx.fillRect(0, 0, this._width, this._height, this._backgroundStyle);
}


// Calculates the layout order of colums/rows by the information how these columns/rows span into each other.
// If there is a circle in the span graph an exception is thrown with a member 'inCircleIndex'.
// 'inCircleIndex' is the index of a column/row which is in a circle in the span graph.
/*array of int*/ CCUI.GridPanel.prototype._calcCRLayoutOrder = function (/*array of {int startSpan, int endSpan}*/ spans) {

	var orderArr = [], processedStates = [], spansLength = spans.length, i, counter = 0;
	
	// processedStates contain ProcessedState  elements, which are the following:
	// 0: not processed
	// 1: considered
	// 2: processed

	var process = function(index) {
		var origState = processedStates[index], spanObj = spans[index], j;
		
		switch(origState) {
		case 0:
			processedStates[index] = 1; // make it considered
			// process 'children'
			for(j=0; j<spanObj.startSpan; j++) {
				process(index - 1 - j);
			}
			for(j=0; j<spanObj.endSpan; j++) {
				process(index + 1 + j);
			}
			processedStates[index] = 2; // make it processed
			orderArr.push(index);
			return;
		case 1:
			throw {
				name: 'invalid_layout',
				message: 'Te layout is invalid, because there is a circle in the span-dependencies graph.',
				inCircleIndex: index
			};
		case 2:
			return;
		}
	}
	
	for(i=0; i<spansLength; i++) {
		processedStates.push(0); // non of the columns/rows is processed in the beginning.
	}
	
	for(i=0; i<spansLength; i++) {
		process(i);
	}

	return orderArr;
}

CCUI.GridPanel.prototype._getColumnLayoutOrder = function() {
	if(this._calcLayoutOrdersNeeded) {
		this._calcLayoutOrders();
	}
	return this._columnLayoutOrder;
}

CCUI.GridPanel.prototype._getRowLayoutOrder = function() {
	if(this._calcLayoutOrdersNeeded) {
		this._calcLayoutOrders();
	}
	return this._rowLayoutOrder;
}

// Returns an array containing the min/preferred widths/heights of the columns/rows of this GridPanel.
// 'kind' can be: 'min' or 'pref'.
// if 'isVert' is true we calculate the heights of the rows, otherwise the widths of the columns.
// Time complexity: O(c*r) where c is the number of columns and r is the number of rows.
/*array of num*/ CCUI.GridPanel.prototype._calcCRLengths = function(/*string*/ kind, /*bool*/ isVert) {
	var ret = [], numOfCRs = isVert ? this._gridCells.getHeight() : this._gridCells.getWidth(),
		layoutOrder = isVert ? this._getRowLayoutOrder() : this._getColumnLayoutOrder(), i, index;
	for(i=0; i<numOfCRs; i++) {
		ret.push(0);
	}
	for(i=0; i<numOfCRs; i++) {
		index = layoutOrder[i];
		ret[index] = this._calcCRLength(kind, isVert, index, ret);
	}

	// correct 'pref' values if they are smaller than 'min' values.
	if(kind === 'pref') {
		var minLengths = this._calcCRLengths('min', isVert);
		for(i=0; i<numOfCRs; i++) {
			ret[i] = Math.max(ret[i], minLengths[i]);
		}
	}
	return ret;
}

// Calculates the min/pref width/height of the column/row at column/row index 'index'. 
// Time complexity: O(n) where n is the number of rows/columns
/*num*/ CCUI.GridPanel.prototype._calcCRLength = function(/*string*/ kind, /*bool*/ isVert, /*int*/ index, /*array of num*/ lengthsSoFar) {
	var numOfOrthos = isVert ? this._gridCells.getWidth() : this._gridCells.getHeight(), orthoIndex, cell, bestLength = 0, length;
	for(orthoIndex=0; orthoIndex<numOfOrthos; orthoIndex++) {
		cell = this._gridCells.get(isVert ? orthoIndex : index, isVert ? index : orthoIndex);
		if(cell && cell.component) {
			length = this._calcHomeCellLength(kind, isVert, index, orthoIndex, lengthsSoFar);
			if(length > bestLength) {
				bestLength = length;
			}
		}
	}
	return bestLength;
}

// Calculates the min/pref width/height of the home cell at the specified cell.
/*num*/ CCUI.GridPanel.prototype._calcHomeCellLength = function(/*string*/ kind, /*bool*/ isVert, /*int*/ index, /*int*/ orthoIndex, /*array of num*/ lengthsSoFar) {
	var cell = this._gridCells.get(isVert ? orthoIndex : index, isVert ? index : orthoIndex), component = cell.component, length = 0, i;
	if(kind === 'min') {
		length = isVert ? component.getMinHeight() : component.getMinWidth();
	} else if(kind === 'pref') {
		length = isVert ? component.getPreferredHeight() : component.getPreferredWidth();
	}
	var startSpan = isVert ? cell.topSpan : cell.leftSpan, endSpan = isVert ? cell.rightSpan : cell.bottomSpan;
	for(i=0; i<startSpan; i++) {
		length -= lengthsSoFar[index - 1 - i];
	}
	for(i=0; i<endSpan; i++) {
		wlength -= lengthsSoFar[index + 1 + i];
	}
	return Math.max(length, 0);
}

// invokes the function 'f' for all the non empty cells with paramters: cell, x, y
CCUI.GridPanel.prototype._forAllNonEmptyCells = function (/*function(cell, x, y)*/ f) {
	var width = this._gridCells.getWidth(), height = this._gridCells.getHeight(), x, y, cell;
	for(y=0; y<height; y++) {
		for(x=0; x<width; x++) {
			cell = this._gridCells.get(x,y);
			if(cell && cell.component) {
				f(cell, x, y);
			}
		}
	}
	return this;
}

// TODO: call the appropriate stuff from the unit test.
// Layout the children of this GridPanel in the horizontal/vertical direction to the overall width/height 'length'.
// Time complexity: O(c*r) where c is the number of columns and r is the number of rows.
CCUI.GridPanel.prototype._oneDimLayout = function (/*bool*/ isVert, /*num*/ length) {
	var preferredLength = isVert ? this.getPreferredHeight() : this.getPreferredWidth();
	var toGrow = (length >= preferredLength); // determine whether to grow or to shrink
	var minLengths;
	if(!toGrow) {
		minLengths = this._calcCRLengths('min', isVert);
	}
	var preferredLengths = this._calcCRLengths('pref', isVert);

	var stretchables = [], crSpecs = isVert ? this._rowSpecs : this._columnSpecs, numOfCrs = crSpecs.length, i, crSpec;
	for(i=0; i<numOfCrs; i++) {
		crSpec = crSpecs[i];
		stretchables.push(new CCUI.Stretchable(crSpec.priority, crSpec.strength, toGrow ? 0 : preferredLengths[i] - minLengths[i]));
	}
	this._stretchCalculator.calcStretches(stretchables, Math.abs(length - preferredLength));
	
	// calculate lengths and positions.
	var lengths = [], positions = [], ll, position = (isVert ? this._padding.top : this._padding.left);
	for(i=0; i<numOfCrs; i++) {
		ll = toGrow ? preferredLengths[i] + stretchables[i].stretch : preferredLengths[i] - stretchables[i].stretch;
		lengths.push(ll);
		positions.push(position);
		position += ll;
		if(i < numOfCrs - 1) {
			position += (isVert ? this._vertGaps : this._horizGaps)[i];
		}
	}

	this._oneDimLayoutChildren(isVert, lengths, positions);
}

// actually layout the components in this direction.
// Time complexity: O(c*r) where c is the number of columns and r is the number of rows.
CCUI.GridPanel.prototype._oneDimLayoutChildren = function (/*bool*/ isVert, /*array of num*/ lengths, /*array of num*/ positions) {
	this._forAllNonEmptyCells(function(cell, c, r) {
		var co = cell.component;
		var /*int*/ startIndex = isVert ? r - cell.topSpan : c - cell.leftSpan;
		var /*int*/ span = isVert ? cell.getRowSpan() : cell.getColumnSpan();
		var /*int*/ lastIndex = startIndex + span - 1;
		
		var /*num*/ cellStartPosition = positions[startIndex];
		var /*num*/ cellLength = positions[lastIndex] + lengths[lastIndex] - cellStartPosition;
		
		var /*bool*/ endAlign = isVert ? (cell.vertAlign === 'bottom') : (cell.horizAlign === 'right');
		var /*bool*/ fill = isVert ? cell.vertFill : cell.horizFill;
		
		var preferredLength = isVert ? co.getPreferredHeight() : co.getPreferredWidth();
		var maxLength = isVert ? co.getMaxHeight() : co.getMaxWidth();
		var length;
		
		if(fill) {
			if(CCUI.posBigger(cellLength, maxLength)) {
				fill = false;
				length = maxLength;
			} else {
				length = cellLength;
			}			
		} else {
			if(cellLength > preferredLength) {
				length = preferredLength;
			} else {
				length = cellLength;
				fill = true;
			}		
		}
		
		var position = (endAlign && (!fill)) ? (cellStartPosition + cellLength - length) : cellStartPosition;
		
		if(isVert) {
			co.setHeight(length);
			co.setY(position);
		} else {
			co.setWidth(length);
			co.setX(position);				
		}
	});
}

CCUI.GridPanel.prototype._getAdditionalLength = function (/*bool*/ isVert) {
	var pa = this._padding;
	return CCUI.sum(isVert ? this._vertGaps : this._horizGaps) + (isVert ? pa.top + pa.bottom : pa.left + pa.right);
}


/*
 * class RectComponent extends Component
 *
 * This is one of the simplest components, which is excellent for learning or testing purposes.
 * This component simply represents a filled rectangle, which is filled with fillStyle.
 * fillStyle can be anything you can pass to the canvas context-s fillStyle property (color (as string), CanvasGradient or CanvasPattern)
 * preferredWidth and preferredHeight are optional parameters.
 */
CCUI.RectComponent = function(fillStyle, preferredWidth, preferredHeight) {
	CCUI.Component.call(this); // super constructor
	this._fillStyle = fillStyle;
	if(typeof preferredWidth === 'number') {
		this.setPreferredWidth(preferredWidth);
	}
	if(typeof preferredHeight === 'number') {
		this.setPreferredHeight(preferredHeight);
	}	
}
CCUI.RectComponent.prototype = new CCUI.Component();

CCUI.RectComponent.prototype.paint = function (renderCtx) {
	renderCtx.fillRect(0, 0, this._width, this._height, this._fillStyle);
}

/*
* class RichWord
*/
CCUI.RichWord = function() {
	/*array of (Tag or string)*/ this.parts = [];
	//this.spacesBefore, this.beforeSpaceWidth
	// this.width, this.height, this.maxFontHeight, this.afterSpaceWidth, this.afterSpaceHeight, this.afterSpaceFontHeight
}

/*num*/ CCUI.RichWord.prototype.getStartX = function() {
	return this.x - this.spacesBefore * this.beforeSpaceWidth;
}

// Moves the cursor 'cursorPos' to the end of this word.
CCUI.RichWord.prototype.cursorToEnd = function(/*RichTextPosition*/ cursorPos, /*int*/ leftOffset/*=0*/) {
	cursorPos.inWordIndex = this.getNumOfChars() - CCUI.dflt(leftOffset, 0);
	return this;
}

// Returns whether moved or not.
/*bool*/ CCUI.RichWord.prototype.cursorLeft = function(/*RichTextPosition*/ cursorPos) {
	if(cursorPos.inWordIndex > (-this.spacesBefore)) {
		cursorPos.inWordIndex -= 1;
		return true;
	} else return false;
}

CCUI.RichWord.prototype.dbgStr = function(indent) {
	var buf = [], i, part;
	buf.push(CCUI.indentation(indent));
	buf.push('RichWord width: ' + this.width + ' afterSpaceWidth: ' + this.afterSpaceWidth + ' height: ' + this.height + ' x: ' + this.x + '\n');
	for(i=0; i<this.parts.length; i++) {
		part = this.parts[i];
		if(typeof part === 'string') {
			buf.push(CCUI.indentation(indent + 1));
			buf.push(part);
			buf.push('\n');
		} else {
			buf.push(part.dbgStr(indent + 1));
		}
	}
	return buf.join('');
}

CCUI.RichWord.prototype.isOrphan = function(indent) {
	var length = this.parts.length, i;
	for(i=0; i<length; i++) {
		if((typeof this.parts[i]) === 'string') {
			return false;
		}
	}
	return true;
}

CCUI.RichWord.prototype.concat = function(otherWord) {
	this.parts = this.parts.concat(otherWord.parts);
	return this;
}

// Determines the following members by measuring the word according to 'renderCtx':
// this.width, this.height, this.maxFontHeight, this.afterSpaceWidth, this.beforeSpaceWidth, this.afterSpaceHeight, this.afterSpaceFontHeight
CCUI.RichWord.prototype.measure = function (renderCtx) {
	// First capture font-size specific render context-settings at the start of the line
	this._fontFamily = renderCtx.getFontFamily();
	this._fontSize = renderCtx.getFontSize();
	this._fontStyle = renderCtx.getFontStyle();
	this._fontWeight = renderCtx.getFontWeight();

	// Now measure the word.
	var length = this.parts.length, i, part, h, fh;
	this.width = 0;
	this.height = 0;
	this.maxFontHeight = 0;
	this.beforeSpaceWidth = renderCtx.measureText(' '); // TODO: speed up by only calculating this if font changed...
	for(i=0; i<length; i++) {
		part = this.parts[i];
		if(typeof part === 'string') {
			this.width += renderCtx.measureText(part);
			h = renderCtx.getPixelLineHeight();
			if(h > this.height) this.height = h;
			fh = renderCtx.getFontSize();
			if(fh > this.maxFontHeight) this.maxFontHeight = fh;
		} else if(part.isStartTag) {
			if(part.xmlElement.onStart) {
				part.xmlElement.onStart(renderCtx);
			}
		} else { // end tag
			if(part.xmlElement.onEnd) {
				part.xmlElement.onEnd(renderCtx);
			}
		}
	}
	this.afterSpaceWidth = renderCtx.measureText(' '); // TODO: speed up by only calculating this if the font changed...
	this.afterSpaceHeight = renderCtx.getPixelLineHeight();
	this.afterSpaceFontHeight = renderCtx.getFontSize();
}

// Reconstructs the font-size specific settings at the start of the word into the render context. 
CCUI.RichWord.prototype.reconstructRC = function(/*RenderContext*/ renderCtx) {
	renderCtx.setFontFamily(this._fontFamily).setFontSize(this._fontSize).setFontStyle(this._fontStyle).setFontWeight(this._fontWeight);	
}

CCUI.RichWord.prototype.getNumOfChars = function() {
	var length = this.parts.length, i, ret = 0, part;
	for(i=0; i<length; i++) {
		part = this.parts[i];
		if((typeof part) === 'string') {
			ret += part.length;
		}
	}
	return ret;
}

/*
* class RichLine
*/
CCUI.RichLine = function() {
	/*array of RichWord*/ this.words = [];
}

// Returns whether moved or not.
/*bool*/ CCUI.RichLine.prototype.cursorLeft = function(/*RichTextPosition*/ cursorPos) {
	if(this.words.length === 0) return false;
	var word = this.words[cursorPos.wordIndex];
	if(!word.cursorLeft(cursorPos)) {
		if(cursorPos.wordIndex > 0) {
			cursorPos.wordIndex--;
			this.words[cursorPos.wordIndex].cursorToEnd(cursorPos, 1);
			return true;
		} else return false;
	} else return true;
}

// Moves the cursor 'cursorPos' to the end of this line.
CCUI.RichLine.prototype.cursorToEnd = function(/*RichTextPosition*/ cursorPos) {
	if(this.words.length === 0) {
		cursorPos.wordIndex = 0;
		cursorPos.inWordIndex = 0;
	} else {
		cursorPos.wordIndex = this.words.length - 1;
		this.words[cursorPos.wordIndex].cursorToEnd(cursorPos);
	}
	return this;
}

CCUI.RichLine.prototype.dbgStr = function(indent) {
	var buf = [], i, word;
	buf.push(CCUI.indentation(indent));
	buf.push('RichLine\n');
	for(i=0; i<this.words.length; i++) {
		buf.push(this.words[i].dbgStr(indent + 1));
	}
	return buf.join('');
}

// Concatenates those words which consist only of Tag-s to the previous word.
// Of course if the first word contains only Tag-s, it remains.
CCUI.RichLine.prototype.eliminateOrphanWords = function() {
	var newWords = [], length = this.words.length, i, word;
	if(length !== 0) {
		newWords.push(this.words[0]);
		for(i=1; i<length; i++) {
			word = this.words[i];
			if(word.isOrphan()) {
				newWords[newWords.length - 1].concat(word);
			} else {
				newWords.push(word);
			}
		}
	}
	this.words = newWords;
	return this;
}

// Measures the words of this line.
CCUI.RichLine.prototype.measureWords = function(/*RenderContext*/ renderCtx) {
	var length = this.words.length, i;
	for(i=0; i<length; i++) {
		this.words[i].measure(renderCtx);
	}
	return this;	
}

/*
* class RichTextPosition
*
* 'lineIndex === -1' means that this position points to nowhere.
* 'wordIndex' is irrelevant in case of an empty line.
* 'inWordIndex' can be negative: in this case the position refers to a space character before the word.
*/
CCUI.RichTextPosition = function(/*int*/ lineIndex/*=-1*/, /*int*/ wordIndex/*=0*/, /*int*/ inWordIndex/*=0*/) {
	this.lineIndex = CCUI.dflt(lineIndex, -1);
	this.wordIndex = CCUI.dflt(wordIndex, 0);
	this.inWordIndex = CCUI.dflt(inWordIndex, 0);
}

// Returns 1 if this is bigger than the other, -1 if smaller than the other, 0 if they are equal.
/*int*/ CCUI.RichTextPosition.prototype.compare = function(/*RichTextPosition*/ other) {
	if(this.lineIndex < other.lineIndex) return -1;
	else if(this.lineIndex > other.lineIndex) return 1;
	else if(this.wordIndex < other.wordIndex) return -1;
	else if(this.wordIndex > other.wordIndex) return 1;
	else if(this.inWordIndex < other.inWordIndex) return -1;
	else if(this.inWordIndex > other.inWordIndex) return 1;
	else return 0;
}

/*
* class RichDocument
* A rich-document is a set of rich-lines.
*/
CCUI.RichDocument = function() {
	/*array of RichLine*/ this.lines = [];
	this._sizeCalcDirty = true;
}

// Returns whether moved or not.
/*bool*/ CCUI.RichDocument.prototype.cursorLeft = function(/*RichTextPosition*/ cursorPos) {
	if(cursorPos.lineIndex === (-1)) return false;
	var line = this.lines[cursorPos.lineIndex];
	if(!line.cursorLeft(cursorPos)) {
		if(cursorPos.lineIndex === 0) return false;
		else {
			cursorPos.lineIndex -= 1;
			this.lines[cursorPos.lineIndex].cursorToEnd(cursorPos);
			return true;
		}
	} else return true;
}

CCUI.RichDocument.prototype.getWidth = function() {
	if(this._sizeCalcDirty) {
		this._calcSizes();
	}
	return this._width;
}

CCUI.RichDocument.prototype.getHeight = function() {
	if(this._sizeCalcDirty) {
		this._calcSizes();
	}
	return this._height;
}

/*array of {start: num, base: num, end: num}*/ CCUI.RichDocument.prototype.getLineYs = function() {
	if(this._sizeCalcDirty) {
		this._calcSizes();
	}
	return this._lineYs;
}

CCUI.RichDocument.prototype.makeSizeCalcDirty = function() {
	this._sizeCalcDirty = true;
}

CCUI.RichDocument.prototype._calcSizes = function() {
	var linesLength = this.lines.length, i, line, wordsLength, j, word, maxLineWidth = 0, lineWidth, height = 0,
	maxWordHeight, maxFontHeight, lastLineEndSpaceHeight = null;
	/*array of {start: num, base: num, end: num}*/ this._lineYs = [];
	for(i=0; i<linesLength; i++) {
		line = this.lines[i];
		wordsLength = line.words.length;
		if(wordsLength === 0) { // totally empty line
			var heightInc = (lastLineEndSpaceHeight ? lastLineEndSpaceHeight : this._initialLineHeight);
			this._lineYs.push({start: height, base: height, end: height + heightInc}); // this value is not used, but something must be pushed to this index too.
			height += heightInc;
		} else { // non-empty line
			lineWidth = 0;
			maxWordHeight = 0;
			maxFontHeight = 0;
			for(j=0; j<wordsLength; j++) {
				word = line.words[j];
				lineWidth += (word.width + word.beforeSpaceWidth * ((line.wrapped && j === 0) ? 0 : word.spacesBefore));
				if(word.height > maxWordHeight) {
					maxWordHeight = word.height;
				}
				if(word.maxFontHeight > maxFontHeight) {
					maxFontHeight = word.maxFontHeight;
				}
				if(j<wordsLength-1) { // if not the last word
					if(word.afterSpaceHeight > maxWordHeight) {
						maxWordHeight = word.afterSpaceHeight;
					}
					if(word.afterSpaceFontHeight > maxFontHeight) {
						maxFontHeight = word.afterSpaceFontHeight;
					}				
				} else { // last word
					lastLineEndSpaceHeight = word.afterSpaceHeight;
				}
			}
			this._lineYs.push({start: height, base: height + maxFontHeight, end: height + maxWordHeight});
			height += maxWordHeight;
			if(lineWidth > maxLineWidth) {
				maxLineWidth = lineWidth;
			}
			wasNonEmptyLine = true;
		}
	}

	this._width = maxLineWidth;
	this._height = height;
	this._sizeCalcDirty = false;
	return this;
}


CCUI.RichDocument.prototype.dbgStr = function(indent) {
	var buf = [], i, line;
	buf.push(CCUI.indentation(indent));
	buf.push('RichDocument\n');
	for(i=0; i<this.lines.length; i++) {
		buf.push(this.lines[i].dbgStr(indent + 1));
	}
	return buf.join('');
}

// Wraps the lines so that none of the lines is longer than width.
// (with the exception when a word is longer than width, as in-word breaking is not supported yet.)
// This method does not change this document: it creates a new wrapped document which shares the RichWord-s with this document.
/*RichDocument*/ CCUI.RichDocument.prototype.wrap = function (/*num*/ width) {
	var wrappedDoc = new CCUI.RichDocument();
	var length = this.lines.length, i, line, wrappedLine, wordsLength, j, word, x;

	var addWord = function(word, wrappedLineStarter) {
		wrappedLine.words.push(word);
		if(!wrappedLineStarter) {
			x += word.beforeSpaceWidth * word.spacesBefore;
		}
		word.x = x;
		x += word.width;
	}
	
	var startNewLine = function() {
		wrappedDoc.lines.push(wrappedLine);
		wrappedLine = new CCUI.RichLine();
		x = 0;
	}

	wrappedLine = new CCUI.RichLine();
	x = 0;	
	for(i=0; i<length; i++) {
		line = this.lines[i];
		wordsLength = line.words.length;
		for(j=0; j<wordsLength; j++) {
			word = line.words[j];
			if(wrappedLine.words.length === 0) { // add the word unconditionally if this is the first.
				addWord(word, false);
			} else { // otherwise add only if fits. If does not fit, then start a new line.
				if(x + word.width + word.beforeSpaceWidth * word.spacesBefore > width) {
					startNewLine();
					wrappedLine.wrapped = true;
					addWord(word, true);
				} else {
					addWord(word, false);
				}
			}
		}
		startNewLine();
	}
	return wrappedDoc;
}

// Measures the words in the lines of this document.
CCUI.RichDocument.prototype.measureWords = function (renderCtx) {
	var length = this.lines.length, i;
	this._initialLineHeight = renderCtx.getPixelLineHeight()
	for(i=0; i<length; i++) {
		this.lines[i].measureWords(renderCtx);
	}
	this._sizeCalcDirty = true;
	return this;
}

// TODO: error handling
CCUI.RichDocument.prototype.fromXML = function (elementArr) {
	this.lines = [];
	this.xml = elementArr;
	var that = this;

	var line = new CCUI.RichLine(), word = new CCUI.RichWord();

	// we have to start a new word if the current is not empty
	function startNewWord() {
		if(word.parts.length > 0) {
			word.spacesBefore = (line.words.length > 0) ? 1 : 0;
			line.words.push(word);
			word = new CCUI.RichWord();
		}
	}

	function startNewLine() {
		startNewWord();
		that.lines.push(line);
		line = new CCUI.RichLine();
	}	
	
	function processText(txt) {
		if(txt.length === 0) return;
		var arr = CCUI.whiteSpaceSplit(txt);
		if(arr.length === 0) { // the whole string is whitespace
			startNewWord();
		} else {
			if(CCUI.isWhiteSpace(txt.charAt(0))) {
				startNewWord();
			}
			var length = arr.length, i;
			for(i=0; i<length; i++) {
				word.parts.push(arr[i]);
				if(i < length-1) {
					startNewWord();
				}
			}
			if(CCUI.isWhiteSpace(txt.charAt(txt.length - 1))) {
				startNewWord();
			}
		}
	}

	function traverseArr(elementArr) {
		var length = elementArr.length, i, element;
		for(i=0; i<length; i++) {
			element = elementArr[i];
			if(typeof element === 'string') {
				processText(element);
			} else if(element.eName === 'br') {
				startNewLine();
			} else { // other element
				word.parts.push(new CCUI.Tag(true, element)); // start tag
				if(element.children) {
					traverseArr(element.children);
				}
				word.parts.push(new CCUI.Tag(false, element)); // end tag
			}
		}
	}

	traverseArr(elementArr);
	startNewLine();
	
	// eliminate orphan words
	var length = this.lines.length, i;
	for(i=0; i<length; i++) {
		this.lines[i].eliminateOrphanWords();
	}

	this._sizeCalcDirty = true;

	return this;
}

CCUI.RichDocument.prototype.fromPlainText = function (text) {
	var that = this;
	this.lines = [];
	var textLength = text.length, actLine, i, ch, inWord = false, numOfSpaces = 0, wordStartIndex;
	
	// adds a word to the actual line.
	var addWord = function(str, spacesBefore) {
		var word = new CCUI.RichWord();
		word.parts.push(str);
		word.spacesBefore = spacesBefore;
		actLine.words.push(word);
	}

	// creates a new line, makes it the actual and pushes it to the end of this.lines
	var newLine = function() {
		actLine = new CCUI.RichLine();
		that.lines.push(actLine);
	}
	
	newLine();
	for(i=0; i<textLength; i++) {
		ch = text.charAt(i);
		if(ch === '\n') {
			if(inWord) {
				addWord(text.slice(wordStartIndex, i), numOfSpaces);
			}
			inWord = false;
			numOfSpaces = 0;
			newLine();
		} else if(CCUI.isWhiteSpace(ch)) {
			if(inWord) {
				addWord(text.slice(wordStartIndex, i), numOfSpaces);
				inWord = false;
				numOfSpaces = 0;				
			}
			numOfSpaces += CCUI.numOfSpaces(ch);
		} else {
			if(!inWord) {
				inWord = true;
				wordStartIndex = i;
			}
		}
	}
	if(inWord) {
		addWord(text.slice(wordStartIndex, textLength), numOfSpaces);
	}
}


/*
 * class StaticDoc extends Component
 *
 * A non-editable rich text component. (Can be also used as a label.)
 *
 * You specify its content either as a (semantically) marked up text (XML) or plain text.
 * During painting the following things happen:
 *
 * - If this StaticDoc has an onStart(RenderContext renderCtx) method then it is called.
 *   (The 'onStart' method of StaticDoc sets the font properties into the RenderContext, so even if you override this method you probably want to call the 'super' method.)
 * - When reaching an XML element then its onStart(RenderContext renderCtx) method is called if defined.
 * - When leaving an XML element then its onEnd(RenderContext renderCtx) method is called if defined.
 * - If this StaticDoc has an onEnd(RenderContext renderCtx) method then it is called at the end of the paint. 
 *
 * Please note that the onStart and onEnd methods of XML elements are injected using a DocStyleInjector. (see 'receiveDocStyleInjectionFrom')
 *
 * The constructor calls 'setContent'.
 */
CCUI.StaticDoc = function(/*string*/ content, /*bool*/ isPlainText/*=false*/) {
	CCUI.Component.call(this); // super constructor
	this.setContent(content, isPlainText);
	/*fill-style*/ this._textFillStyle = '#000000';
	/*num*/ this._fontSize = 12; // Font size in pixels.
	/*num or string*/ this._lineHeight = 1.5; // The height of a line of text. If a number or a string not ending with the 'px' suffix, this is relative to the font size. If a string ending with 'px', that means absolute pixels.
	/*string*/ this._fontFamily = 'arial,sans-serif'; // Font family as in CSS.
	/*string*/ this._fontStyle = 'normal'; // can be 'normal', 'italic' or 'oblique'.
	/*num*/ this._fontWeight = 400; // The weight of the font as in CSS.
	
	/*RichTextPosition*/ this._cursorPos = new CCUI.RichTextPosition();
	/*RichTextPosition*/ this._secondaryCursorPos = new CCUI.RichTextPosition();

	/*bool*/ this._mouseSelectInProgress = false; // Tells whether a mouse text selection operation is in progress or not.	
}
CCUI.StaticDoc.prototype = new CCUI.Component();

// Sets the content of this StaticDoc.
// 'content' can be either plain text or marked-up text (XML). (You specify this with 'isPlainText'.)
// The costly 'preProcess' is not called yet, because its behaviour depends on the actual styling,
// so it is assumed it will be called later during styling.
// 'preProcess' is called from 'receiveDocStyleInjectionFrom', so calling either 'receiveDocStyleInjectionFrom' or 'preProcess' is mandatory
// at the end of styling.
CCUI.StaticDoc.prototype.setContent = function (/*string*/ content, /*bool*/ isPlainText/*=false*/) {
	var xml;
	this._doc = new CCUI.RichDocument();
	if(content) {
		if(isPlainText) {
			this._doc.fromPlainText(content);
		} else {
			xml = (typeof content === 'string') ? CCUI.parseXML(content) : content;
			this._doc.fromXML(xml);
		}
	}
	this.setNeedsStyling();
	return this;
}

CCUI.StaticDoc.prototype.onKeydown = function (event) {
	if(event.keyCode === 35) { // end
		
	} else if(event.keyCode === 36) { // home
		
	} else if(event.keyCode === 37 && event.shiftKey) { // left
		this.cursorLeft();
	} else if(event.keyCode === 38) { // up
		
	} else if(event.keyCode === 39) { // right
		
	} else if(event.keyCode === 40) { // down
		
	} else if(event.keyCode === 67 && event.ctrlKey) { // Ctrl C
		
	}
}

CCUI.StaticDoc.prototype.cursorLeft = function() {
	if(this._wrappedDoc.cursorLeft(this._cursorPos)) {
		this.makeAreaDirty();
	}
	return this;
}

CCUI.StaticDoc.prototype.onMousedown = function(event) {
	var cPos = this.mousePosToCursorPos(event.x, event.y);
	this.setCursorPos(cPos);
	this.setSecondaryCursorPos(cPos);
	this._mouseSelectInProgress = true;
	this._canvas.mouseLockedTo = this;
	return this;
}

CCUI.StaticDoc.prototype.onMousemove = function(event) {
	if(this._mouseSelectInProgress) {
		var cPos = this.mousePosToCursorPos(event.x, event.y);
		this.setCursorPos(cPos);
	}
	return this;
}

CCUI.StaticDoc.prototype.onMouseup = function(event) {
	this._mouseSelectInProgress = false;
	this._canvas.mouseLockedTo = null;
}

CCUI.StaticDoc.prototype.setCursorPos = function(/*RichTextPosition*/ cursorPos) {
	if(this._cursorPos.compare(cursorPos) !== 0) {
		this.makeAreaDirty();
	}
	this._cursorPos = cursorPos;
}

CCUI.StaticDoc.prototype.setSecondaryCursorPos = function(/*RichTextPosition*/ secondaryCursorPos) {
	if(this._secondaryCursorPos.compare(secondaryCursorPos) !== 0) {
		this.makeAreaDirty();	
	}
	this._secondaryCursorPos = secondaryCursorPos;
}

//TODO: document this in the html documentation...
/*RichTextPosition*/ CCUI.StaticDoc.prototype.mousePosToCursorPos = function(/*num*/ x, /*num*/ y) {
	if((!this._wrappedDoc) || this._wrappedDoc.lines.length === 0) {
		return new CCUI.RichTextPosition();
	}
	var lineIndex = this._mouseYToLineIndex(y), line = this._wrappedDoc.lines[lineIndex],
	wordIndex = this._mouseXToWordIndex(x, line),
	inWordIndex = this._mouseXToInWordIndex(x, line.words.length> 0 ? line.words[wordIndex] : null);
	return new CCUI.RichTextPosition(lineIndex, wordIndex, inWordIndex);
}

/*int*/ CCUI.StaticDoc.prototype._mouseXToWordIndex = function(/*num*/ x, /*RichLine*/ line) {
	var wordsLength = line.words.length, i, word;
	for(i=0; i<wordsLength; i++) {
		word = line.words[i];
		if(x <= word.x + word.width) {
			return i;
		}
	}
	return (wordsLength === 0) ? 0 : wordsLength - 1;
}

/*int*/ CCUI.StaticDoc.prototype._mouseXToInWordIndex = function(/*num*/ x, /*RichWord*/ word) {
	if(word === null) return 0;
	var relX = x - word.x;
	if(relX < 0) {
		return  Math.floor((- relX) / word.beforeSpaceWidth);
	}
	var renderCtx = this._canvas.getRenderCtx();
	word.reconstructRC(renderCtx);
	var partsLength = word.parts.length, xx = 0, index = 0, w, part, i, j;
	for(i=0; i<partsLength; i++) {
		part = word.parts[i];
		if(typeof part === 'string') {
			for(j=1; j<=part.length; j++) {
				w = renderCtx.measureText(part.slice(0, j));
				if(xx + w > relX) {
					return index + j - 1;
				}
			}
			xx += w;
			index += part.length;
		} else if(part.isStartTag) {
			if(part.xmlElement.onStart) {
				part.xmlElement.onStart(renderCtx);
			}
		} else { // end tag
			if(part.xmlElement.onEnd) {
				part.xmlElement.onEnd(renderCtx);
			}
		}
	}
	return index;
}

/*num*/ CCUI.StaticDoc.prototype._inWordIndexToMouseX = function(/*int*/ inWordIndex, /*RichWord*/ word, /*bool*/ center/*=false*/) {
	if(word === null) return x;
	
	var numOfChars = word.getNumOfChars();
	if(center && inWordIndex < numOfChars) {
		return (this._inWordIndexToMouseX(inWordIndex, word, false) + this._inWordIndexToMouseX(inWordIndex + 1, word, false)) / 2;
	}

	if(inWordIndex <= 0) {
		return word.beforeSpaceWidth * inWordIndex + word.x;
	}
	var renderCtx = this._canvas.getRenderCtx();
	word.reconstructRC(renderCtx);		
	var partsLength = word.parts.length, i, part, x = word.x, index = 0;
	for(i=0; i<partsLength; i++) {
		part = word.parts[i];
		if(typeof part === 'string') {
			if(inWordIndex - index > part.length) {
				index += part.length;
				x += renderCtx.measureText(part);
			} else {
				return x + ((inWordIndex - index === 0) ? 0 : renderCtx.measureText(part.slice(0, inWordIndex - index)) );
			}
		} else if(part.isStartTag) {
			if(part.xmlElement.onStart) {
				part.xmlElement.onStart(renderCtx);
			}
		} else { // end tag
			if(part.xmlElement.onEnd) {
				part.xmlElement.onEnd(renderCtx);
			}
		}
	}
}

/*int*/ CCUI.StaticDoc.prototype._mouseYToLineIndex = function(/*num*/ y) {
	//TODO: now we search linearly, we might do logarithmic search...
	var lineYs = this._wrappedDoc.getLineYs(), linesLength = lineYs.length, i;
	for(i=0; i<linesLength; i++) {
		if(y < lineYs[i].end) {
			return i;
		}
	}
	return linesLength - 1;
}

CCUI.StaticDoc.prototype.setFontStyle = function(/*string*/ fontStyle) {
	this._fontStyle = fontStyle;
	this.invalidate();
	return this;
}

CCUI.StaticDoc.prototype.setFontWeight = function(/*num*/ fontWeight) {
	this._fontWeight = fontWeight;
	this.invalidate();
	return this;
}

CCUI.StaticDoc.prototype.setTextFillStyle = function(/*fill-style*/ textFillStyle) {
	this._textFillStyle = textFillStyle;
	this.invalidate();
	return this;
}

CCUI.StaticDoc.prototype.setFontSize = function(/*num*/ fontSize) {
	this._fontSize = fontSize;
	this.invalidate();
	return this;
}

CCUI.StaticDoc.prototype.setLineHeight = function(/*num or string*/ lineHeight) {
	this._lineHeight = lineHeight;
	this.invalidate();
	return this;
}

CCUI.StaticDoc.prototype.setFontFamily = function(/*string*/ fontFamily) {
	this._fontFamily = fontFamily;
	this.invalidate();
	return this;
}

// Receives doc style injection from 'docStyleInjector'.
// 'docStyleInjector' injects 'onStart' and 'onEnd' methods (and possibly other members) into the XML element from which this StaticDoc is made of.
// During painting the 'onStart' and 'onEnd' methods are called on those elements.
// This is an extremely flexible way to style a StaticDoc marked up with semantic tagging.
CCUI.StaticDoc.prototype.receiveDocStyleInjectionFrom = function(/*DocStyleInjector*/ docStyleInjector) {
	docStyleInjector.injectIntoDoc(this._doc);
	if(this._canvas) {
		this.preProcess();
	}
	return this;
}

// Does preprocessing based on content, style properties and render context (for efficient layout and painting).
// Must be called at the end of styling (or can be indirectly called by calling 'receiveDocStyleInjectionFrom').
CCUI.StaticDoc.prototype.preProcess = function () {
	var renderCtx = this._canvas.getRenderCtx();
	if(this.onStart) {
		this.onStart(renderCtx);
	}
	this._doc.measureWords(renderCtx);
	if(this.onEnd) {
		this.onEnd(renderCtx);
	}	
	this.setNeedsLayout();
	return this;
}

CCUI.StaticDoc.prototype._calcPreferredWidth = function () {
	return this._doc.getWidth();
}

CCUI.StaticDoc.prototype._calcPreferredHeight = function (/*opt num*/ forWidth) {
	if(forWidth === undefined) {
		return this._doc.getHeight();
	} else {
		var wrappedDoc = this._doc.wrap(forWidth);
		return wrappedDoc.getHeight();
	}
}

CCUI.StaticDoc.prototype.layout = function () {
	this._wrappedDoc = this._doc.wrap(this._width);
	CCUI.Component.prototype.layout.call(this); // super.layout()
	return this;
}

CCUI.StaticDoc.prototype._drawLine = function (line, renderCtx, /*{start: num, base: num, end: num}*/ y) {
	var length = line.words.length, i, word;
	for(i=0; i<length; i++) {
		word = line.words[i];
		this._drawWord(word, renderCtx, word.x, y);
	}
}

CCUI.StaticDoc.prototype._drawWord = function (word, renderCtx, /*num*/ x, /*{start: num, base: num, end: num}*/ y) {
	var length = word.parts.length, i, part;
	for(i=0; i<length; i++) {
		part = word.parts[i];
		if(typeof part === 'string') {
			renderCtx.fillText(part, x, y.base);
			x += renderCtx.measureText(part);
		} else if(part.isStartTag) {
			if(part.xmlElement.onStart) {
				part.xmlElement.onStart(renderCtx);
			}
		} else { // end tag
			if(part.xmlElement.onEnd) {
				part.xmlElement.onEnd(renderCtx);
			}
		}
	}
}

CCUI.StaticDoc.prototype.paint = function (renderCtx) {
	var length = this._wrappedDoc.lines.length, i,
	line, lineYs = this._wrappedDoc.getLineYs();
	renderCtx.ctx2D.textAlign = 'left';
	renderCtx.ctx2D.textBaseline = 'alphabetic';
	
	// Draw selection
	if((this._cursorPos.lineIndex !== (-1) && this._secondaryCursorPos.lineIndex !== (-1))) {
		var startCPos, endCPos,
		cmp = this._cursorPos.compare(this._secondaryCursorPos);
		if(cmp !== 0) { // There is a selection to draw
			if(cmp < 0) {
				startCPos = this._cursorPos;
				endCPos = this._secondaryCursorPos;
			} else {
				startCPos = this._secondaryCursorPos;
				endCPos = this._cursorPos;
			}
			var startLine = this._wrappedDoc.lines[startCPos.lineIndex],
				startWord = (startLine.words.length === 0) ? null : startLine.words[startCPos.wordIndex],
				startX = this._inWordIndexToMouseX(startCPos.inWordIndex, startWord),
				startLy = lineYs[startCPos.lineIndex],
				endLine = this._wrappedDoc.lines[endCPos.lineIndex],
				endWord = (endLine.words.length === 0) ? null : endLine.words[endCPos.wordIndex],
				endX = this._inWordIndexToMouseX(endCPos.inWordIndex, endWord),
				endLy = lineYs[endCPos.lineIndex],
				lineDiff = endCPos.lineIndex - startCPos.lineIndex;
			
			// Draw the first line
			renderCtx.fillRect(startX, startLy.start, (lineDiff === 0) ? endX : this._width, startLy.end, '#4040E0');
				
			// Draw the middle lines if necessary
			if(lineDiff > 1) {
				renderCtx.fillRect(0, lineYs[startCPos.lineIndex + 1].start, this._width, lineYs[endCPos.lineIndex - 1].end, '#4040E0');
			}
			
			// Draw the last line if necessary
			if(lineDiff > 0) {
				renderCtx.fillRect(0, endLy.start, endX, endLy.end, '#4040E0');
			}
		}
	}

	if(this.onStart) {
		this.onStart(renderCtx);
	}
	for(i=0; i<length; i++) {
		line = this._wrappedDoc.lines[i];
		this._drawLine(line, renderCtx, lineYs[i]);
	}
	if(this.onEnd) {
		this.onEnd(renderCtx);
	}	
	return this;
}

// This method is called at the start of painting. It sets all the font properties into 'renderCtx'.
// If you add an onEnd(/*RenderContext*/ renderCtx) method to a StaticDoc (either by 'subclassing' or just dynamically injecting)
// it will be called at the end of painting.
CCUI.StaticDoc.prototype.onStart = function (/*RenderContext*/ renderCtx) {
	renderCtx.ctx2D.fillStyle = this._textFillStyle;
	renderCtx.setFontSize(this._fontSize);
	renderCtx.setLineHeight(this._lineHeight);
	renderCtx.setFontFamily(this._fontFamily);			
	renderCtx.setFontStyle(this._fontStyle);
	renderCtx.setFontWeight(this._fontWeight);
}

/*
 * class PlainTextWord
 *
 * Represents a word in a plain text document.
 * A word is a nonempty string which does not contain whitespaces.
 * A RenderContext is needed in the constructor because the width of the word (in pixels)
 * is measured in the constructor.
 */
CCUI.PlainTextWord = function(/*RenderContext*/ renderCtx, /*string*/ text) {
	/*string*/ this._text = text;
	/*num*/ this._width = renderCtx.measureText(text); // The width of this word in pixels.
	/*PlainTextWord*/ this.original = this;
	/*int*/ this.inOrigStartIndex = 0;
}

/*string*/ CCUI.PlainTextWord.prototype.getText = function () {
	return this._text;
}

/*num*/ CCUI.PlainTextWord.prototype.getWidth = function () {
	return this._width;
}

// Returns the text length in characters.
/*int*/ CCUI.PlainTextWord.prototype.getLength = function () {
	return this._text.length;
}

/*string*/ CCUI.PlainTextWord.prototype.dbgStr = function() {
	return this._text + ' x: ' + this.x;
}

/*
 * class Spaces
 * Represent consecutive spaces.
 */
CCUI.Spaces = function(/*int*/ numOfSpaces) {
	/*int*/ this.numOfSpaces = numOfSpaces;
	/*Spaces*/ this.original = this;
	/*int*/ this.inOrigStartIndex = 0;	
}

// Returns the text length in characters.
/*int*/ CCUI.Spaces.prototype.getLength = function () {
	return this.numOfSpaces;
}

/*string*/ CCUI.Spaces.prototype.getText = function () {
	var buf = [], i;
	for(i=0; i<this.numOfSpaces; i++) {
		buf.push(' ');
	}
	return buf.join('');
}

CCUI.Spaces.prototype.dbgStr = function() {
	var buf = [], i;
	buf.push('[');
	for(i=0; i<this.numOfSpaces; i++) {
		buf.push(' ');
	}
	buf.push('] x: ' + this.x);
	return buf.join('');
}

/*
 * class PlainTextLine
 *
 * Represents a physical line of text in a plain text document.
 */
CCUI.PlainTextLine = function() {
	/*array of (PlainTextWord or Space)*/ this._words = [];
}

/*array of (PlainTextWord or Space)*/ CCUI.PlainTextLine.prototype.getWords = function () {
	return this._words;
}

// Returns the length of this line in characters.
CCUI.PlainTextLine.prototype.getLength = function () {
	var wordsLength = this._words.length, i, ret = 0;
	for(i=0; i<wordsLength; i++) {
		ret += this._words[i].getLength();
	}
	return ret;
}

// Gets the 'word-char' position regarding to a horizontal physical position (measured in pixels).
/*{word: (PlainTextWord or Spaces), inWordCharIndex: int}*/ CCUI.PlainTextLine.prototype.getWCPosAtX = function(/*num*/ x) {
	var wordsLength = this._words.length, i, word, xx = 0;
	for(i=0; i<wordsLength; i++) {
		word = this._words[i];
		if(x < xx + word.getLength()) {
			return {word: word, inWordCharIndex: x - xx};
		}
		xx += word.getLength();
	}
	return (wordsLength === 0) ? {word: null, inWordCharIndex: 0} : {word: word, inWordCharIndex: word.getLength()};
}


/*
 * class PlainTextBlock
 *
 * Represents a block of text in a plain text document.
 * A block is in fact a 'logical line': on line if no wrapping occured.
 */
CCUI.PlainTextBlock = function() {
	/*array of (PlainTextWord or Spaces)*/ this._words = [];
	/*array of PlainTextLine*/ this._wrappedLines = [];
}

// This method creates the words of this block based on 'text' 
CCUI.PlainTextBlock.prototype.setText = function (/*string*/ text, /*RenderContext*/ renderCtx) {

	this._words = [];
	this._wrappedLines = [];

	var that = this, textLength = text.length, i, ch, inWord = false, numOfSpaces = 0, wordStartIndex;

	// adds a word to this block.
	var addWord = function(str) {
		var word = new CCUI.PlainTextWord(renderCtx, str);
		that._words.push(word);
	}

	// adds a sequence of spaces to this block.
	var addSpaces = function(numOfSpaces) {
		var spaces = new CCUI.Spaces(numOfSpaces);
		that._words.push(spaces);	
	}

	for(i=0; i<textLength; i++) {
		ch = text.charAt(i);
		if(CCUI.isWhiteSpace(ch)) {
			if(inWord) {
				addWord(text.slice(wordStartIndex, i));
				inWord = false;
				numOfSpaces = 0;
			}
			numOfSpaces += CCUI.numOfSpaces(ch);
		} else {
			if(!inWord) {
				if(numOfSpaces > 0) {
					addSpaces(numOfSpaces);
				}
				inWord = true;
				wordStartIndex = i;
			}
		}
	}
	if(inWord) {
		addWord(text.slice(wordStartIndex, textLength));
	} else if(numOfSpaces > 0) {
		addSpaces(numOfSpaces);
	}

	return this;
}

/*array of (PlainTextWord or Spaces)*/ CCUI.PlainTextBlock.prototype.getWords = function () {
	return this._words;
}

/*array of PlainTextLine*/ CCUI.PlainTextBlock.prototype.getWrappedLines = function () {
	return this._wrappedLines;
}

// Returns the preferred width of the block where the width of a space character is 'spaceWidth' pixels.
/*num*/ CCUI.PlainTextBlock.prototype.getPreferredWidth = function (/*num*/ spaceWidth) {
	var wordsLength = this._words.length, i, word, ret = 0;
	for(i=0; i<wordsLength; i++) {
		word = this._words[i];
		if(word instanceof CCUI.PlainTextWord) {			
			ret += word.getWidth();
		} else if(word instanceof CCUI.Spaces) {
			ret += word.numOfSpaces * spaceWidth;
		}
	}
	return ret;
}

/*string*/ CCUI.PlainTextBlock.prototype.getText = function () {
	var buf = [], wordsLength = this._words.length, i, word;
	for(i=0; i<wordsLength; i++) {
		word = this._words[i];
		buf.push(word.getText());
	}
	return buf.join('');
}

// Return the cursor position according to 'charIndex' relative to this block.
/*PlainTextPosition*/ CCUI.PlainTextBlock.prototype.getXYAtCharIndex = function (/*int*/ charIndex) {
	var wrappedLinesLength = this._wrappedLines.length, i, line, lineLength;
	for(i=0; i<wrappedLinesLength; i++) {
		line = this._wrappedLines[i];
		lineLength = line.getLength();
		if(charIndex < lineLength) {
			return new CCUI.PlainTextPosition(charIndex, i);
		}
		charIndex -= lineLength;
	}
	return new CCUI.PlainTextPosition(lineLength, wrappedLinesLength - 1);
}

// Returns the character index (in the text returned by getText) of the position determined by 'word' and 'inWordCharIndex'.
/*int*/ CCUI.PlainTextBlock.prototype.getCharIndex = function (/*PlainTextWord or Spaces*/ word, /*int*/ inWordCharIndex) {
	var wordsLength = this._words.length, i, w, pos = 0;
	for(i=0; i<wordsLength; i++) {
		w = this._words[i];
		if(w === word) {
			return pos + inWordCharIndex;
		}
		pos += w.getLength();
	}
	// can come here only if the block is empty
	return 0;
}

// (re)creates 'wrappedLines' inside this PlainTextBlock.
// 'allowedWidth' is the available horizontal space in pixels, 'spaceWidth' is the width of a space character.
CCUI.PlainTextBlock.prototype.wrap = function (/*num*/ allowedWidth, /*num*/ spaceWidth) {
	var that = this, wordsLength = this._words.length, i, word, x = 0, actLine, remainingSpaces, sp, fits;
	
	// creates a new line, makes it the actual and pushes it to the end of this._wrappedLines
	var newLine = function() {
		actLine = new CCUI.PlainTextLine();
		that._wrappedLines.push(actLine);
		x = 0;
	}	

	//TODO: wrap very long words also...
	
	this._wrappedLines = [];
	newLine();
	for(i=0; i<wordsLength; i++) {
		word = this._words[i];
		if(word instanceof CCUI.PlainTextWord) {
			if(x + word.getWidth() > allowedWidth) {
				newLine();
			}
			actLine.getWords().push(word);
			word.x = x;
			x += word.getWidth();
		} else if(word instanceof CCUI.Spaces) {
			remainingSpaces = word.numOfSpaces;
			while(x + remainingSpaces*spaceWidth > allowedWidth) {
				fits = Math.floor((allowedWidth - x) / spaceWidth);
				if(fits > 0) {
					sp = new CCUI.Spaces(fits);
					sp.original = word;
					sp.inOrigStartIndex = word.numOfSpaces - remainingSpaces;
					sp.x = x;
					x += fits*spaceWidth;
					actLine.getWords().push(sp);
					remainingSpaces -= fits;
				}
				newLine();
			}
			if(remainingSpaces === word.numOfSpaces) {
				sp = word;
			} else {
				sp = new CCUI.Spaces(remainingSpaces);
				sp.original = word;
				sp.inOrigStartIndex = word.numOfSpaces - remainingSpaces;
			}
			sp.x = x;
			x += remainingSpaces*spaceWidth;
			actLine.getWords().push(sp);
		}
	}

/*	
	CCUI.log('--wrap--');
	var wl = this._wrappedLines[0], k;
	for(k=0; k<wl.getWords().length; k++) {
		CCUI.log((wl.getWords()[k]).dbgStr());
	}
*/
	
	return this;
}

/*
 * class PlainDocument
 *
 * Represents a plain text document.
 * This is the 'model' class behind TextEditor.
 *
 * The internal representation is the following:
 * A document consists of logical lines: lines at the end of which there is an explicit end-of-line character.
 * We call these logical lines 'blocks'. The class PlainTextBlock represents such a block.
 * On the logical level a PlainTextBlock contains whitespaces and words. 
 * Whitespaces are represented with the class Spaces, and words are represented with the class PlainTextWord.
 * On the physical level blocks are wrapped into physical lines depending on the available horizontal space.
 * A physical line is represented with the class PlainTextLine.
 * A PlainTextLine like a PlainTextBlock consists of whitespaces and words (Spaces and PlainTextWord).
 */
CCUI.PlainDocument = function(/*string*/ text, /*bool*/ oneLiner) {
	this._oneLiner = oneLiner;
	this.setText(text);
	/*PlainTextPosition*/ this._cursorPos = new CCUI.PlainTextPosition();
	/*PlainTextPosition*/ this._secondaryCursorPos = new CCUI.PlainTextPosition();
	/*num*/ this.lastAllowedWidth = 100; // Last time this document was wrapped to this allowed width.

	// (array of string) _blockTexts
	// (array of PlainTextBlock) _blocks
	// num _preferredWidth : the preferred width of this document.
}

CCUI.PlainDocument.prototype.setText = function (/*string*/ text) {
	this._blockTexts = (!text) ? [] : CCUI.split(text, '\n');
	if(this._oneLiner && this._blockTexts.length > 1) {
		this._blockTexts = [this._blockTexts[0]];
	}
	this._blocks = [];
	return this;
}

/*PlainTextPosition*/ CCUI.PlainDocument.prototype.getCursorPos = function () {
	return this._cursorPos;
}

CCUI.PlainDocument.prototype.setCursorPos = function (/*PlainTextPosition*/ cursorPos) {
	this._cursorPos = cursorPos;
}

/*PlainTextPosition*/ CCUI.PlainDocument.prototype.getSecondaryCursorPos = function () {
	return this._secondaryCursorPos;
}

CCUI.PlainDocument.prototype.setSecondaryCursorPos = function (/*PlainTextPosition*/ secondaryCursorPos) {
	this._secondaryCursorPos = secondaryCursorPos;
}

/*{start: PlainTextPosition, end: PlainTextPosition}*/ CCUI.PlainDocument.prototype.getStartEndCursorPos = function () {
	return (this._cursorPos.compare(this._secondaryCursorPos) > 0) ?
		{start: this._secondaryCursorPos, end: this._cursorPos} :
		{start: this._cursorPos, end: this._secondaryCursorPos};
}

/*array of PlainTextBlock*/ CCUI.PlainDocument.prototype.getBlocks = function () {
	return this._blocks;
}

/*array of string*/
CCUI.PlainDocument.prototype.getBlockTexts = function () {
	return this._blockTexts;
}

/*int*/ CCUI.PlainDocument.prototype.getNumOfLines = function () {
	var blocksLength = this._blocks.length, i, block, ret = 0;
	for(i=0; i<blocksLength; i++) {
		block = this._blocks[i];
		ret += block.getWrappedLines().length;
	}
	return ret;
}

// Returns the y-th (wrapped) PlainTextLine. (indexing starts from 0). 
/*PlainTextLine*/ CCUI.PlainDocument.prototype.getLineAtY = function(y) {
	//TODO: now we do this using linear search, but it should be done using precalculated block y-s and logarithmic search.
	var blocksLength = this._blocks.length, i, block, lines, linesLength, blockStart = 0;
	for(i=0; i<blocksLength; i++) {
		block = this._blocks[i];
		lines = block.getWrappedLines();
		linesLength = lines.length;
		if(y < blockStart + linesLength) {
			return lines[y - blockStart];
		}
		blockStart += linesLength;
	}
	return lines[linesLength - 1];	
}

// Gets the 'block-char' position.
// Returns an object with the following members:
// - blockIndex (-1 if the document is empty)
// - inBlockCharIndex (0 if the block is empty or the document is empty)
CCUI.PlainDocument.prototype.getBCPosAtXY = function(x, y) {
	var bwc = this.getBWCPosAtXY(x, y);
	if(bwc.blockIndex === (-1)) {
		return {blockIndex: -1, inBlockCharIndex: 0};
	} else {
		var block = this._blocks[bwc.blockIndex],
			inBlockCharIndex = block.getCharIndex(bwc.inBlockWord, bwc.inWordCharIndex);
		return {blockIndex: bwc.blockIndex, inBlockCharIndex: inBlockCharIndex};		
	}
}

// Gets the 'block-word-char' position.
// Returns an object with the following members:
// - blockIndex (-1 if the document is empty)
// - inBlockWord (null if the block is empty)
// - inWordCharIndex (0 if the block is empty)
/*{blockIndex: int, inBlockWord: (PlainTextWord or Spaces), inWordCharIndex: int}*/ CCUI.PlainDocument.prototype.getBWCPosAtXY = function(/*int*/ x, /*int*/ y) {
	//TODO: now we do this using linear search, but it should be done using precalculated block y-s and logarithmic search.
	var blocksLength = this._blocks.length, i, block, lines, linesLength, blockStart = 0, line, wc;
	for(i=0; i<blocksLength; i++) {
		block = this._blocks[i];
		lines = block.getWrappedLines();
		linesLength = lines.length;
		if(y < blockStart + linesLength) {
			line = lines[y - blockStart];
			wc = line.getWCPosAtX(x);
			return {
				blockIndex: i,
				inBlockWord: (wc.word ? wc.word.original : null),
				inWordCharIndex: (wc.word ? (wc.word.inOrigStartIndex + wc.inWordCharIndex) : 0)
			};
		}
		blockStart += linesLength;
	}
	// can only come here if the document is empty.
	return {blockIndex: -1, inBlockWord: null, inWordCharIndex: 0};
}

/*int*/ CCUI.PlainDocument.prototype.getYAtBlock = function(/*int*/ blockIndex) {
	var i, ret = 0;
	for(i=0; i<blockIndex; i++) {	
		ret += this._blocks[i].getWrappedLines().length;
	}
	return ret;
}

/*PlainTextPosition*/ CCUI.PlainDocument.prototype.getXYAtBC = function(/*int*/ blockIndex, /*int*/ charIndex) {
	var relXY = this._blocks[blockIndex].getXYAtCharIndex(charIndex);
	return new CCUI.PlainTextPosition(relXY.x, this.getYAtBlock(blockIndex) + relXY.y);
}

// Wraps the document so that the physical lines of this document are not longer than 'allowedWidth' pixels.
CCUI.PlainDocument.prototype.wrap = function (/*num*/ allowedWidth) {
	this.lastAllowedWidth = allowedWidth;
	if(!this._oneLiner) {
		var blocksLength = this._blocks.length, i, block;
		for(i=0; i<blocksLength; i++) {
			block = this._blocks[i];
			block.wrap((this._oneLiner === 1) ? 999999999 : allowedWidth, this._spaceWidth);
		}
	}
	return this;
}

CCUI.PlainDocument.prototype.preProcess = function (/*RenderContext*/ renderCtx) {
	var that = this, blockTextsLength = this._blockTexts.length, i, blockText, block;

	this._spaceWidth = renderCtx.measureText(' ');

	for(i=0; i<blockTextsLength; i++) {
		blockText = this._blockTexts[i];
		block = new CCUI.PlainTextBlock();
		block.setText(blockText, renderCtx);
		that._blocks.push(block);
	}

	this._calcPreferredWidth();

	return this;
}

CCUI.PlainDocument.prototype.setPreferredWidth = function (/*num*/ preferredWidth) {
	this._preferredWidth = preferredWidth;
	return this;
}

// Calculates sets and returns the preferred width.
/*num*/ CCUI.PlainDocument.prototype._calcPreferredWidth = function () {
	var blocksLength = this._blocks.length, i, block;
	this._preferredWidth = 0;
	for(i=0; i<blocksLength; i++) {
		block = this._blocks[i];
		pw = block.getPreferredWidth(this._spaceWidth);
		if(pw > this._preferredWidth) {
			this._preferredWidth = pw;
		}					
	}
	return this._preferredWidth;
}

/*num*/ CCUI.PlainDocument.prototype.getPreferredWidth = function () {
	return this._preferredWidth;
}

/*num*/ CCUI.PlainDocument.prototype.getSpaceWidth = function () {
	return this._spaceWidth;
}


/*
 * class PlainTextPosition
 */
CCUI.PlainTextPosition = function(/*int*/ x/*=0*/, /*int*/ y/*=0*/) {
	this.x = CCUI.dflt(x, 0);
	this.y = CCUI.dflt(y, 0);
}

// Returns 1 if this is bigger than the other, -1 if smaller than the other, 0 is they are equal.
/*int*/ CCUI.PlainTextPosition.prototype.compare = function(/*PlainTextPosition*/ other) {
	if(this.y > other.y) {
		return 1;
	} else if (this.y < other.y) {
		return -1;
	} else {
		if(this.x > other.x) {
			return 1;
		} else if(this.x < other.x) {
			return -1;
		} else return 0;
	}
}

CCUI.PlainTextPosition.prototype.dbgStr = function() {
	return 'PlainTextPosition x: ' + this.x + ' y: ' + this.y;
}

/*
 * class InnerTextEditor extends Component
 * This is a helper class for TextEditor. It is its 'friend class' so it accesses its private members directly. 
 */
CCUI.InnerTextEditor = function(containerEditor) {
	CCUI.Component.call(this); // super constructor
	this.containerEditor = containerEditor;
	this._mouseSelectInProgress = false; // Tells whether a mouse text selection operation is in progress or not.
}
CCUI.InnerTextEditor.prototype = new CCUI.Component();

CCUI.InnerTextEditor.prototype.onKeypress = function (event) {
	this.containerEditor.insertAtCursor(event.chr);
	return this;
}

CCUI.InnerTextEditor.prototype.onKeydown = function (event) {
	if(event.keyCode === 8) { // backspace
		this.containerEditor.backspace();
	} else if(event.keyCode === 9) { // tab
		this.containerEditor.insertAtCursor('\t');
	} else if(event.keyCode === 13) { // enter
		this.containerEditor.insertAtCursor('\n');		
	} else if(event.keyCode === 32) { // space
		this.containerEditor.insertAtCursor(' ');
	} else if(event.keyCode === 33) { // page up
		this.containerEditor.pageUp(!event.shiftKey);
	} else if(event.keyCode === 34) { // page down
		this.containerEditor.pageDown(!event.shiftKey);
	} else if(event.keyCode === 35) { // end
		this.containerEditor.end(!event.shiftKey);
	} else if(event.keyCode === 36) { // home
		this.containerEditor.home(!event.shiftKey);
	} else if(event.keyCode === 37) { // left
		this.containerEditor.cursorLeft(!event.shiftKey);
	} else if(event.keyCode === 38) { // up
		this.containerEditor.cursorUp(!event.shiftKey);		
	} else if(event.keyCode === 39) { // right
		this.containerEditor.cursorRight(!event.shiftKey);
	} else if(event.keyCode === 40) { // down
		this.containerEditor.cursorDown(!event.shiftKey);
	} else if(event.keyCode === 46) { // del
		this.containerEditor.del();
	} else if(event.keyCode === 67 && event.ctrlKey) { // Ctrl C
		this.containerEditor.copy();
	} else if(event.keyCode === 86 && event.ctrlKey) { // Ctrl V
		this.containerEditor.paste();
	} else if(event.keyCode === 88 && event.ctrlKey) { // Ctrl X
		this.containerEditor.cut();
	}
}

CCUI.InnerTextEditor.prototype.onMousedown = function(event) {
	var cPos = this.mousePosToCursorPos(event.x, event.y);
	this.containerEditor.setCursorPos(cPos.x, cPos.y)._resetCursorBlinkTimer();
	this._mouseSelectInProgress = true;
	this._canvas.mouseLockedTo = this;
	return this;
}

CCUI.InnerTextEditor.prototype.onMousemove = function(event) {
	if(this._mouseSelectInProgress) {
		var cPos = this.mousePosToCursorPos(event.x, event.y);
		this.containerEditor.setCursorPos(cPos.x, cPos.y, false)._resetCursorBlinkTimer();
	}
	return this;
}

CCUI.InnerTextEditor.prototype.onMouseup = function(event) {
	this._mouseSelectInProgress = false;
	this._canvas.mouseLockedTo = null;
	return this;
}

// Returns the upper-left corner or the upper-center point (depending on center) of the character at the cursor in pixel.
CCUI.InnerTextEditor.prototype.cursorPosToMousePos = function (cx, cy, /*bool*/ center/*=false*/) {

	var blocks = this.containerEditor._doc.getBlocks(), padding = this.containerEditor._padding;
	if(blocks.length === 0) { // empty document.
		return {x: padding.left, y: padding.top};
	}

	center = CCUI.dflt(center, false);
	var lineHeight = this.containerEditor.getPixelLineHeight(), line = this.containerEditor._doc.getLineAtY(cy);
	return {x: this._cursorXToMouseX(line, cx, center),  y: cy * lineHeight + padding.top};
}

/*PlainTextPosition*/ CCUI.InnerTextEditor.prototype.mousePosToCursorPos = function (/*num*/ x, /*num*/ y) {
	var blocks = this.containerEditor._doc.getBlocks();
	if(blocks.length === 0) { // empty document.
		return new CCUI.PlainTextPosition(0, 0);
	}
	var numOfLines = this.containerEditor._doc.getNumOfLines(), lineHeight = this.containerEditor.getPixelLineHeight(),
		logicalY = Math.floor((y - this.containerEditor._padding.top) / lineHeight), cY = Math.min(logicalY, numOfLines - 1), line = this.containerEditor._doc.getLineAtY(cY),
		cX = this._mouseXToCursorX(line, x);
	return new CCUI.PlainTextPosition(cX, cY);
}

CCUI.InnerTextEditor.prototype._cursorXToMouseX = function (line, x, /*bool*/ center) {
	var wc = line.getWCPosAtX(x), relX = 0;
	if(!wc.word) {
		return this.containerEditor._padding.left;
	} else if(wc.word instanceof CCUI.PlainTextWord) {
		var text = wc.word.getText();
		var subText = text.slice(0, wc.inWordCharIndex);
		this.containerEditor.applyFontSettings(this._canvas.getRenderCtx());
		relX = this._canvas.getRenderCtx().measureText(subText);
		if(center && subText.length < text.length) {
			var subText2 = text.slice(0, wc.inWordCharIndex + 1);
			relX = Math.floor((relX + this._canvas.getRenderCtx().measureText(subText2)) / 2);
		}
	} else if(wc.word instanceof CCUI.Spaces) {
		var spaceWidth = this.containerEditor._doc.getSpaceWidth();
		relX = Math.floor(spaceWidth * (wc.inWordCharIndex + ( center ? 0.5 : 0)));
	}
	
	return wc.word.x + relX + this.containerEditor._padding.left;
}


CCUI.InnerTextEditor.prototype._mouseXToCursorX = function (line, x) {
	x -= this.containerEditor._padding.left;
	//TODO: now we do this using linear search, but it should be done using logarithmic search.
	var words = line.getWords(), wordsLength = words.length, i, word, nextWord, wordStartCX = 0;
	if(wordsLength === 0) {
		return 0;
	}
	for(i=0; i<wordsLength-1; i++) {
		word = words[i];
		nextWord = words[i+1];
		if(x < nextWord.x) {
			return wordStartCX + this._mouseXToInWordPos(word, x - word.x);
		}
		wordStartCX += word.getLength();
	}
	var lastWord = words[wordsLength-1];
	return wordStartCX + this._mouseXToInWordPos(lastWord, x - lastWord.x);
}

CCUI.InnerTextEditor.prototype._mouseXToInWordPos = function (word, x) {
	if(word instanceof CCUI.PlainTextWord) {
		//TODO: now we do this using linear search, but it should be done using logarithmic search.
		var text = word.getText(), textLength = text.length, i, renderCtx = this._canvas.getRenderCtx();
		for(i=0; i<textLength; i++) {
			this.containerEditor.applyFontSettings(renderCtx);		
			if(x < renderCtx.measureText(text.slice(0, i + 1))) {
				return i;
			}
		}
		return textLength;
	} else if(word instanceof CCUI.Spaces) {
		var spaceWidth = this.containerEditor._doc.getSpaceWidth();
		var w = word.numOfSpaces * spaceWidth;
		if(x >= w) {
			return word.numOfSpaces;
		} else {
			return Math.floor(x / spaceWidth);
		}
	}
}

CCUI.InnerTextEditor.prototype._calcPreferredWidth = function () {
	var padding = this.containerEditor._padding;
	return this.containerEditor._doc.getPreferredWidth() + padding.left + padding.right;
}

CCUI.InnerTextEditor.prototype._calcPreferredHeight = function (/*opt num*/ forWidth) {
	var ln;
	if(forWidth === undefined) {
		ln = this.containerEditor._doc.getBlocks().length;
	} else {
		var law = this.containerEditor._doc.lastAllowedWidth;
		
		this.containerEditor._doc.wrap(forWidth);
		ln = this.containerEditor._doc.getNumOfLines();
		this.containerEditor._doc.wrap(law);
	}
	var padding = this.containerEditor._padding;
	return ln * this.containerEditor.getPixelLineHeight()
		+ padding.top + padding.bottom;
}

CCUI.InnerTextEditor.prototype.layout = function () {
	CCUI.Component.prototype.layout.call(this); // super.layout()
	var padding = this.containerEditor._padding;
	this.containerEditor._doc.wrap(this._width - padding.left - padding.right);
	return this;
}

CCUI.InnerTextEditor.prototype.paint = function (renderCtx) {
	renderCtx.fillRect(0, 0, this._width, this._height, this.containerEditor._backgroundStyle);

	this.containerEditor.applyFontSettings(renderCtx);

	var doc = this.containerEditor._doc, padding = this.containerEditor._padding, blocks = doc.getBlocks(), blocksLength = blocks.length,
		i, block, y = this.containerEditor._fontSize + padding.top, lines, linesLength, j, line, blockStartY = 0;

	if(blocksLength === 0) { // we draw the cursor for an empty document here
		this._drawCursor(renderCtx, padding.left, y - this.containerEditor._fontSize);
	}

	var secp = doc.getStartEndCursorPos(), selXStart, selXEnd, isInside = false;
	for(i=0; i<blocksLength; i++) {
		block = blocks[i];
		lines = block.getWrappedLines();
		linesLength = lines.length;
		for(j=0; j<linesLength; j++) {
			line = lines[j];
			selXStart = 0;
			if(secp.start.y === blockStartY + j) {
				selXStart = secp.start.x;
				isInside = true;
			}
			if(secp.end.y === blockStartY + j) {
				selXEnd = secp.end.x;
				isInside = false;
			} else {
				selXEnd = isInside ? line.getLength() : 0;
			}
			this._paintLine(renderCtx, y, line, doc.getSpaceWidth(), blockStartY + j, selXStart, selXEnd);
			y += this.containerEditor.getPixelLineHeight();
		}
		blockStartY += linesLength;
	}
}

CCUI.InnerTextEditor.prototype._drawCursor = function (renderCtx, x, y) {
	if(this._focused && this.containerEditor._cursorBlinkState) {
		this._drawCursorCore(renderCtx, x, y);
	}
}

CCUI.InnerTextEditor.prototype._drawCursorCore = function (renderCtx, x, y) {
	renderCtx.fillRect(x, y, CCUI.TextEditor.CURSOR_WIDTH + x, Math.ceil(this.containerEditor.getFontSize() * 1.15) + y,
			this.containerEditor._cursorStyle);
}

CCUI.InnerTextEditor.prototype._paintLine = function (renderCtx, y, line, spaceWidth, cy,
		/*int*/ selXStart, /*int*/ selXEnd) {
	var padding = this.containerEditor._padding, cursorPos = this.containerEditor._doc.getCursorPos(),
		words = line.getWords(), wordsLength = words.length, i, word, x, wordStartCX = 0, cursorDrawn = false;
		
		
	// Draw the selection first.
	if(selXStart !== selXEnd) {
		var sx = this._cursorXToMouseX(line, selXStart, false), ex = this._cursorXToMouseX(line, selXEnd, false),
		sy = y - this.containerEditor._fontSize;
		renderCtx.fillRect(sx, sy, ex, sy + Math.ceil(this.containerEditor.getFontSize() * 1.15),
			this.containerEditor._selectedBackgroundStyle);
	}

	// Draw the cursor. 	
	if(wordsLength === 0 && cursorPos.y === cy) {
		this._drawCursor(renderCtx, padding.left, y - this.containerEditor._fontSize);
		return this;
	}

	// Now draw the texts.
	for(i=0; i<wordsLength; i++) {
		word = words[i];
		if(word instanceof CCUI.PlainTextWord) {
			renderCtx.ctx2D.fillStyle = this.containerEditor._textFillStyle;
			renderCtx.fillText(word.getText(), padding.left + word.x, y);
		}
		if(!cursorDrawn && cursorPos.y === cy && (cursorPos.x < wordStartCX + word.getLength() || i == wordsLength - 1)) { // draw cursor here
			if(word instanceof CCUI.PlainTextWord) {
				x = padding.left + word.x + renderCtx.measureText(word.getText().slice(0, cursorPos.x - wordStartCX));
			} else if(word instanceof CCUI.Spaces) {
				x = padding.left + word.x + (cursorPos.x - wordStartCX) * spaceWidth;				
			}
			this._drawCursor(renderCtx, x, y - this.containerEditor._fontSize);
			cursorDrawn = true;
		}
		wordStartCX += word.getLength();
	}
	return this;
}

/*
 * class TextEditor extends Component
 *
 * Single or multiline (plain-text) text editor.
 */
CCUI.TextEditor = function(/*int*/ hChars/*=15*/, /*int*/ vChars/*=1*/,
		/*string*/ hScrollPolicy/*=if vChars===1 then 'without_scrollbar' else 'no_scroll'*/,
		/*string*/ vScrollPolicy/*=if vChars===1 then 'no_scroll' else 'with_scrollbar'*/, /*bool*/ lock/*=true*/) {
	CCUI.Component.call(this); // super constructor
	var that = this;

	/*int*/ this._hChars = CCUI.dflt(hChars, 15); /*Horizontal preferred size in characters*/
	/*int*/ this._vChars = CCUI.dflt(vChars, 1); /*Vertical preferred size in characters*/ 
	/*string*/ this._hScrollPolicy = CCUI.dflt(hScrollPolicy, (this._vChars === 1) ? 'without_scrollbar' : 'no_scroll'); // For the meaning see ScrollPanel's constructor.
	/*string*/ this._vScrollPolicy = CCUI.dflt(vScrollPolicy, (this._vChars === 1) ? 'no_scroll' : 'with_scrollbar'); // For the meaning see ScrollPanel's constructor.
	if(CCUI.dflt(lock, true)) {
		this.lock();
	}

	/*{top: num, bottom: num, left: num, right: num}*/ this._padding = {top: 2, bottom:2, left: 2, right: 2};

	/*fill-style*/ this._textFillStyle = '#000000';
	/*num*/ this._fontSize = 12; // Font size in pixels.
	/*num or string*/ this._lineHeight = 1.5; // The height of a line of text. If a number or a string not ending with the 'px' suffix, this is relative to the font size. If a string ending with 'px', that means absolute pixels.
	/*string*/ this._fontFamily = 'arial,sans-serif'; // Font family as in CSS.
	/*string*/ this._fontStyle = 'normal'; // Can be 'normal', 'italic' or 'oblique'.
	/*num*/ this._fontWeight = 400; // The weight of the font as in CSS.	

	/*fill-style*/ this._borderStyle = "#000000";
	/*fill-style*/ this._activeBorderStyle = '#6060C0';

	/*fill-style*/ this._backgroundStyle = "#FFFFFF";

	/*fill-style*/ this._cursorStyle = "#000000";
	/*fill-style*/ this._selectedBackgroundStyle = "#3399FF";
	
	/*PlainDocument*/ this._doc = new CCUI.PlainDocument('', this._vChars === 1);

	/*InnerTextEditor*/ this._innerTextEditor = new CCUI.InnerTextEditor(this).setId('ite');

	/*ScrollPanel*/ this._scrollPanel = new CCUI.ScrollPanel(this._innerTextEditor, this._hScrollPolicy, this._vScrollPolicy).setId('sp').setZ(1);
	this._addChild(this._scrollPanel);

	this._cursorBlinkState = true;

	this._cursorBlinkFunction = function() {
		that._cursorBlinkState = !that._cursorBlinkState;
		if(that._innerTextEditor.getFocused()) {
			that._makeCursorAreaDirty();
		}
		that._setupCursorBlinkTimer();
	}
	this._setupCursorBlinkTimer();
}
CCUI.TextEditor.prototype = new CCUI.Component();

CCUI.TextEditor.CURSOR_WIDTH = 1; // The width of the cursor in pixels. (TODO: make parametrizable)

CCUI.TextEditor.prototype._makeCursorAreaDirty = function() {
	var cursorPos = this._doc.getCursorPos();
	var pp = this._innerTextEditor.cursorPosToMousePos(cursorPos.x, cursorPos.y);
	this._innerTextEditor.makeAreaDirty(new CCUI.Rectangle(pp.x, pp.y, CCUI.TextEditor.CURSOR_WIDTH, this.getPixelLineHeight()));
}

CCUI.TextEditor.prototype.setPadding = function(/*{top: num, bottom: num, left: num, right: num}*/ padding) {
	this._padding = padding;
	this.setNeedsLayout();
	return this;
}

CCUI.TextEditor.prototype.setFontStyle = function(/*string*/ fontStyle) {
	this._fontStyle = fontStyle;
	this.invalidate();
	return this;
}

CCUI.TextEditor.prototype._setupCursorBlinkTimer = function() {
	this._cursorBlinkTimer = setTimeout(this._cursorBlinkFunction, 400);
	return this;
}

CCUI.TextEditor.prototype._resetCursorBlinkTimer = function() {
	if(this._cursorBlinkTimer) {
		clearTimeout(this._cursorBlinkTimer);
	}
	this._cursorBlinkState = true;
	return this._setupCursorBlinkTimer();
}

CCUI.TextEditor.prototype.setFontWeight = function(/*num*/ fontWeight) {
	this._fontWeight = fontWeight;
	this.invalidate();
	return this;
}

CCUI.TextEditor.prototype.setTextFillStyle = function (/*fill-style*/ textFillStyle) {
	this._textFillStyle = textFillStyle;
	this.invalidate();
	return this;
}

/*num*/ CCUI.TextEditor.prototype.getFontSize = function () {
	return this._fontSize;
}

CCUI.TextEditor.prototype.setFontSize = function (/*num*/ fontSize) {
	this._fontSize = fontSize;
	this.invalidate();
	return this;
}

CCUI.TextEditor.prototype.setLineHeight = function (/*num or string*/ lineHeight) {
	this._lineHeight = lineHeight;
	this.invalidate();
	return this;
}

CCUI.TextEditor.prototype.setFontFamily = function (/*string*/ fontFamily) {
	this._fontFamily = fontFamily;
	this.invalidate();
	return this;
}

CCUI.TextEditor.prototype.setBorderStyle = function (/*fill-style*/ borderStyle) {
	this._borderStyle = borderStyle;
	this.makeAreaDirty();
	return this;
}

CCUI.TextEditor.prototype.setActiveBorderStyle = function (/*fill-style*/ activeBorderStyle) {
	this._activeBorderStyle = activeBorderStyle;
	this.makeAreaDirty();
	return this;
}

CCUI.TextEditor.prototype.setBackgroundStyle = function (/*fill-style*/ backgroundStyle) {
	this._backgroundStyle = backgroundStyle;
	this.makeAreaDirty();
	return this;
}

CCUI.TextEditor.prototype.setCursorStyle = function (/*fill-style*/ cursorStyle) {
	this._cursorStyle = cursorStyle;
	this.makeAreaDirty();
	return this;
}

CCUI.TextEditor.prototype.setSelectedBackgroundStyle = function (/*fill-style*/ selectedBackgroundStyle) {
	this._selectedBackgroundStyle = selectedBackgroundStyle;
	this.makeAreaDirty();
	return this;
}

// Returns the selected text if there is anything selected, null otherwise.
/*string*/ CCUI.TextEditor.prototype.getSelectedText = function() {
	if(this._doc.getCursorPos().compare(this._doc.getSecondaryCursorPos()) !== 0) {
		var secp = this._doc.getStartEndCursorPos(),
			startBc = this._doc.getBCPosAtXY(secp.start.x, secp.start.y),
			endBc = this._doc.getBCPosAtXY(secp.end.x, secp.end.y),
			i, txt, tArr = [];
		if(startBc.blockIndex >= 0 && endBc.blockIndex >= 0) {
			for(i=startBc.blockIndex; i <= endBc.blockIndex; i++) {
				bTxt = this._doc.getBlocks()[i].getText();
				tArr.push(bTxt.slice(
					(i === startBc.blockIndex) ? startBc.inBlockCharIndex : 0,
					(i === endBc.blockIndex) ? endBc.inBlockCharIndex : bTxt.length
				));
			}
			return tArr.join('\n');
		}
	}
	return null;
}

// Performs a 'cut to clipboard' operation.
CCUI.TextEditor.prototype.cut = function() {
	var ret = this.getSelectedText();
	CCUI.setClipboardContent(ret);
	if(ret !== null) {
		this.removeSelected();
	}
	return ret;
}

// Performs a 'copy to clipboard' operation.
CCUI.TextEditor.prototype.copy = function() {
	var ret = this.getSelectedText();
	CCUI.setClipboardContent(ret);
	return ret;
}

// Performs a 'paste from clipboard' operation.
CCUI.TextEditor.prototype.paste = function() {
	return this.insertAtCursor(CCUI.getClipboardContent());	
}

// The content of the text editor.
// Please note that 'preProcess' is not called automatically during setText,
// but style is invalidated, and 'preProcess' must be called at the end of styling.
CCUI.TextEditor.prototype.setText = function (/*string*/ text) {
	this._doc.setText(text);
	this.setNeedsStyling();
	return this;
}

// Does precalculations based on the content, style properties and the render context. Must be called at the end of styling.
CCUI.TextEditor.prototype.preProcess = function () {
	this.applyFontSettings(this._canvas.getRenderCtx());
	this._doc.preProcess(this._canvas.getRenderCtx());
	return this;
}

// Moves the cursor as if 'home' was pressed.
// If 'moveSecondary' is true then it also moves the secondary cursor there.
CCUI.TextEditor.prototype.home = function(/*bool*/ moveSecondary/*=true*/) {
	return this.setCursorPos(0, this._doc.getCursorPos().y, CCUI.dflt(moveSecondary, true))._resetCursorBlinkTimer();
}

// Moves the cursor as if 'end' was pressed.
// If 'moveSecondary' is true then it also moves the secondary cursor there.
CCUI.TextEditor.prototype.end = function(/*bool*/ moveSecondary/*=true*/) {
	var cursorPos = this._doc.getCursorPos(), lineLength = this._doc.getLineAtY(cursorPos.y).getLength();
	return this.setCursorPos(lineLength, cursorPos.y, CCUI.dflt(moveSecondary, true))._resetCursorBlinkTimer();
}

// Moves the cursor as if 'page-up' was pressed.
// If 'moveSecondary' is true then it also moves the secondary cursor there.
CCUI.TextEditor.prototype.pageUp = function(/*bool*/ moveSecondary/*=true*/) {
	return this._setCursorAtSameMouseX(Math.max(this._doc.getCursorPos().y - this._getPageRows(), 0), moveSecondary)._resetCursorBlinkTimer();
}

// Moves the cursor as if 'page-down' was pressed.
// If 'moveSecondary' is true then it also moves the secondary cursor there.
CCUI.TextEditor.prototype.pageDown = function(/*bool*/ moveSecondary/*=true*/) {
	return this._setCursorAtSameMouseX(Math.min(this._doc.getCursorPos().y + this._getPageRows(), this._doc.getNumOfLines() - 1), moveSecondary)._resetCursorBlinkTimer();
}

// Sets the cursor at the same mouse-x coordinate as now, but at the specified cursor-y coordinate.
CCUI.TextEditor.prototype._setCursorAtSameMouseX = function(/*int*/ y, /*bool*/ moveSecondary/*=true*/) {
	var cursorPos = this._doc.getCursorPos();
	var mx = this._innerTextEditor._cursorXToMouseX(this._doc.getLineAtY(cursorPos.y), cursorPos.x, true);
	return this.setCursorPos(this._innerTextEditor._mouseXToCursorX(this._doc.getLineAtY(y), mx), y, CCUI.dflt(moveSecondary, true));	
}

/*int*/ CCUI.TextEditor.prototype._getPageRows = function() {
	return Math.floor(this._scrollPanel.getViewportHeight() / this.getPixelLineHeight());
}

// Moves the cursor as if 'cursor-left' was pressed.
// If 'moveSecondary' is true then it also moves the secondary cursor there.
// Returns whether the cursor has been actually moved.
/*bool*/ CCUI.TextEditor.prototype.cursorLeft = function(/*bool*/ moveSecondary/*=true*/) {
	moveSecondary = CCUI.dflt(moveSecondary, true);
	var cursorPos = this._doc.getCursorPos(), succ = false;
	if(cursorPos.x > 0) {
		this.setCursorPos(cursorPos.x - 1, cursorPos.y, moveSecondary);
		succ = true;
	} else if(cursorPos.y > 0) {
		this.setCursorPos(this._doc.getLineAtY(cursorPos.y - 1).getLength(), cursorPos.y - 1, moveSecondary);
		succ = true;
	}
	this._resetCursorBlinkTimer();
	return succ;
}

// Moves the cursor as if 'cursor-right' was pressed.
// If 'moveSecondary' is true then it also moves the secondary cursor there.
// Returns whether the cursor has been actually moved.
/*bool*/ CCUI.TextEditor.prototype.cursorRight = function(/*bool*/ moveSecondary/*=true*/) {
	moveSecondary = CCUI.dflt(moveSecondary, true);
	var cursorPos = this._doc.getCursorPos(), succ = false;
	var lineLength = this._doc.getLineAtY(cursorPos.y).getLength();
	if(cursorPos.x < lineLength) {
		this.setCursorPos(cursorPos.x + 1, cursorPos.y, moveSecondary);
		succ = true;
	} else if(cursorPos.y < this._doc.getNumOfLines() - 1) {
		this.setCursorPos(0, cursorPos.y + 1, moveSecondary);
		succ = true;
	}
	this._resetCursorBlinkTimer();
	return succ;
}

// Moves the cursor as if 'cursor-up' was pressed.
// If 'moveSecondary' is true then it also moves the secondary cursor there.
// Returns whether the cursor has been actually moved.
/*bool*/ CCUI.TextEditor.prototype.cursorUp = function(/*bool*/ moveSecondary/*=true*/) {
	var cursorPos = this._doc.getCursorPos(), succ = false;
	if(cursorPos.y > 0) {
		this._setCursorAtSameMouseX(this._doc.getCursorPos().y - 1, moveSecondary);
		succ = true;
	}
	this._resetCursorBlinkTimer();
	return succ;
}

// Moves the cursor as if 'cursor-down' was pressed.
// If 'moveSecondary' is true then it also moves the secondary cursor there.
// Returns whether the cursor has been actually moved.
/*bool*/ CCUI.TextEditor.prototype.cursorDown = function(/*bool*/ moveSecondary/*=true*/) {
	var cursorPos = this._doc.getCursorPos(), succ = false;
	if(cursorPos.y < this._doc.getNumOfLines() - 1) {
		this._setCursorAtSameMouseX(cursorPos.y + 1, moveSecondary);
		succ = true;
	}
	this._resetCursorBlinkTimer();
	return succ;
}

// Sets the cursor position and ensures that the cursor is scrolled into the viewport.
// Please note that besides the primary cursor there is also a secondary cursor. The current selected text is always between
// the primary and the secondary cursors.
// If 'moveSecondary' is true it also moves the secondary cursor there.
// If 'makeDirty' is true it makes both the old and new cursor area dirty.
CCUI.TextEditor.prototype.setCursorPos = function(/*num*/ x, /*num*/ y, /*bool*/ moveSecondary/*=true*/,
		/*bool*/ makeDirty/*=true*/) {
	moveSecondary = CCUI.dflt(moveSecondary, true);
	var cursorPos = this._doc.getCursorPos(), secondaryCursorPos = this._doc.getSecondaryCursorPos();
	var cursorWereSame = cursorPos.compare(secondaryCursorPos) === 0;
	
	if(cursorPos.x !== x || cursorPos.y !== y || ((!cursorWereSame) && moveSecondary)) { // There was a cursor position change at all
		makeDirty = CCUI.dflt(makeDirty, true);
		if(makeDirty && moveSecondary && cursorWereSame) {
			this._makeCursorAreaDirty();
		}
		cursorPos.x = x;
		cursorPos.y = y;
		if(moveSecondary) {
			secondaryCursorPos.x = x;
			secondaryCursorPos.y = y;		
		}
		if(makeDirty && moveSecondary && cursorWereSame) {
			this._makeCursorAreaDirty();
		}
		if(makeDirty && ((!moveSecondary) || (!cursorWereSame))) {
			this._innerTextEditor.makeAreaDirty(); // TODO: not the whole area should be made dirty!
		}
	}
	this.ensureCursorInView();
	return this;
}

// Ensures that the cursor is scrolled into the viewport.
CCUI.TextEditor.prototype.ensureCursorInView = function() {
	var cursorPos = this._doc.getCursorPos();
	var plh = this.getPixelLineHeight(), innerPos = this._innerTextEditor.cursorPosToMousePos(cursorPos.x, cursorPos.y);
	this._scrollPanel.ensureRectInView(innerPos.x - this._padding.left, innerPos.y - this._padding.top,
		innerPos.x + 1 + this._padding.right, innerPos.y + plh + this._padding.bottom);
	return this;
}

// Removes the actually selected text and inserts 'txtToInsert' at the actual cursor position.
CCUI.TextEditor.prototype.insertAtCursor = function (/*string*/ txtToInsert) {
	this.removeSelected();
	this._innerTextEditor.makeAreaDirty();
	var ds = this._getDS();
	var lines = CCUI.split(txtToInsert, '\n'),
		numOfLines = (this._vChars === 1 && lines.length > 1) ? 1 : lines.length,
		i, line;
	for(i=0; i<numOfLines; i++) {
		line = lines[i];
		if(line.length > 0) {
			this._insertPartAtCursor(line);
		}
		if(i < numOfLines-1) {
			this._newLineAtCursor();
		}
	}
	this._resetCursorBlinkTimer();
	this._checkDS(ds);
	return this;
}

// Removes the text between the primary and the secondary cursor positions.
// Returns whether there was anything to remove.
/*bool*/ CCUI.TextEditor.prototype.removeSelected = function () {
	var cursorPos = this._doc.getCursorPos(), secondaryCursorPos = this._doc.getSecondaryCursorPos();
	if(cursorPos.compare(secondaryCursorPos) !== 0) {
		var secp = this._doc.getStartEndCursorPos(),
			startBc = this._doc.getBCPosAtXY(secp.start.x, secp.start.y),
			endBc = this._doc.getBCPosAtXY(secp.end.x, secp.end.y),
			i;
		if(startBc.blockIndex >= 0 && endBc.blockIndex >= 0) {
			this._innerTextEditor.makeAreaDirty();
			var ds = this._getDS();
			
			// We delete all the blocks and add a new block, which is made up of two texts.
			var startBlockText = this._doc.getBlocks()[startBc.blockIndex].getText();
			var endBlockText = this._doc.getBlocks()[endBc.blockIndex].getText();
			var t1 = startBlockText.slice(0, startBc.inBlockCharIndex);
			var t2 = endBlockText.slice(endBc.inBlockCharIndex, endBlockText.length);
			this._setBlockText(startBc.blockIndex, t1 + t2);
			for(i=startBc.blockIndex + 1; i <= endBc.blockIndex; i++) {
				this._removeBlock(startBc.blockIndex + 1);
			}
			var newCursorPos = this._doc.getXYAtBC(startBc.blockIndex, t1.length);
			this.setCursorPos(newCursorPos.x, newCursorPos.y, true, false);			
			
			this._resetCursorBlinkTimer();
			this._checkDS(ds);
			return true;			
		}
	}
	return false;
}

// Moves the cursor and edits the content as if 'backspace' was pressed.
CCUI.TextEditor.prototype.backspace = function () {
	if(!this.removeSelected()) {
		this._innerTextEditor.makeAreaDirty();
		var ds = this._getDS();
		var cursorPos = this._doc.getCursorPos();
		var bc = this._getBCAtCursor();
		var b = this._doc.getBlocks()[bc.blockIndex];
		var text = b.getText();
	
		if(bc.inBlockCharIndex > 0) {
			var newText = text.slice(0, bc.inBlockCharIndex - 1) + text.slice(bc.inBlockCharIndex, text.length);
			this._setBlockText(bc.blockIndex, newText);
			var newCursorPos = this._doc.getXYAtBC(bc.blockIndex, bc.inBlockCharIndex - 1);
			this.setCursorPos(newCursorPos.x, newCursorPos.y, true, false);
		} else if(bc.blockIndex > 0) {
			var previousBlock = this._doc.getBlocks()[bc.blockIndex - 1];
			var wrappedLines = previousBlock.getWrappedLines();
			var lastWrappedLine = wrappedLines[wrappedLines.length - 1]; // what if empty
			var prevLineLength = lastWrappedLine.getLength();
			var previousText = previousBlock.getText();
			var newText = previousText + text;
			this._setBlockText(bc.blockIndex - 1, newText);
			this._removeBlock(bc.blockIndex);
			this.setCursorPos(prevLineLength, this._doc.getCursorPos().y - 1, true, false);
		}
		this._resetCursorBlinkTimer();
		this._checkDS(ds);
	}
	return this;
}

// Moves the cursor and edits the content as if 'del' was pressed.
CCUI.TextEditor.prototype.del = function () {
	if(!this.removeSelected()) {
		if(this.cursorRight()) {
			this.backspace();
		}
	}
	return this;
}

CCUI.TextEditor.prototype._getDS = function () {
	return {preferredWidth: this._doc.getPreferredWidth(), numOfLines: this._doc.getNumOfLines()};
}

CCUI.TextEditor.prototype._checkDS = function (ds) {
	if((this._doc.getPreferredWidth() !== ds.preferredWidth) ||( this._doc.getNumOfLines() !== ds.numOfLines)) {
		this._innerTextEditor.setNeedsLayout();
	}
}

CCUI.TextEditor.prototype._newLineAtCursor = function () {
	var bc = this._getBCAtCursor();
	var b = this._doc.getBlocks()[bc.blockIndex];
	var oldText = b.getText();
	
	var line1 = oldText.slice(0, bc.inBlockCharIndex);
	var line2 = oldText.slice(bc.inBlockCharIndex, oldText.length);
	
	this._setBlockText(bc.blockIndex, line1);
	this._doc.getBlockTexts().splice(bc.blockIndex + 1, 0, line2);
	this._doc.getBlocks().splice(bc.blockIndex + 1, 0, new CCUI.PlainTextBlock());
	this._setBlockText(bc.blockIndex + 1, line2);
	
	this.setCursorPos(0, this._doc.getCursorPos().y + 1, true, false);
}

CCUI.TextEditor.prototype._insertPartAtCursor = function (txtToInsert) {
	var bc = this._getBCAtCursor();
	var b = this._doc.getBlocks()[bc.blockIndex];
	var newText = CCUI.stringInsert(b.getText(), bc.inBlockCharIndex, txtToInsert);
	this._setBlockText(bc.blockIndex, newText);
	var newCursorPos = this._doc.getXYAtBC(bc.blockIndex, bc.inBlockCharIndex + CCUI.spacedTextLength(txtToInsert));
	this.setCursorPos(newCursorPos.x, newCursorPos.y, true, false);
	return this;
}

CCUI.TextEditor.prototype._setBlockText = function (blockIndex, newText) {
	this._doc.getBlockTexts()[blockIndex] = newText;
	var b = this._doc.getBlocks()[blockIndex];
	if(this._canvas && this._canvas.getRenderCtx() && this._doc.getSpaceWidth()) {
		this.applyFontSettings(this._canvas.getRenderCtx());
		var oldPreferredWidth = b.getPreferredWidth(this._doc.getSpaceWidth());
		b.setText(newText, this._canvas.getRenderCtx());
		var newPreferredWidth = b.getPreferredWidth(this._doc.getSpaceWidth());
		if(newPreferredWidth > this._doc.getPreferredWidth()) {
			this._doc.setPreferredWidth(newPreferredWidth);
		} else if(oldPreferredWidth === this._doc.getPreferredWidth()) { // in this (rare) case we can do nothing else but recalculate the preferred with.
			this._doc._calcPreferredWidth();
		}
		b.wrap((this._vChars === 1) ? 999999999 : this._doc.lastAllowedWidth, this._doc.getSpaceWidth());
	} else {
		this.setNeedsStyling();
	}
}

CCUI.TextEditor.prototype._removeBlock = function (blockIndex) {
	var oldBlockPW;
	if(this._canvas && this._canvas.getRenderCtx() && this._doc.getSpaceWidth()) {
		oldBlockPW = this._doc.getBlocks()[blockIndex].getPreferredWidth(this._doc.getSpaceWidth());
	}
	this._doc.getBlockTexts().splice(blockIndex, 1);
	this._doc.getBlocks().splice(blockIndex, 1);
	if(this._canvas && this._canvas.getRenderCtx() && this._doc.getSpaceWidth()) {
		if(oldBlockPW === this._doc.getPreferredWidth()) {
			this._doc._calcPreferredWidth();
		}
	} else {
		this.setNeedsStyling();
	}
}

CCUI.TextEditor.prototype._getBCAtCursor = function () {
	var doc = this._doc;
	var bc = doc.getBCPosAtXY(doc.getCursorPos().x, doc.getCursorPos().y), b;
	if(bc.blockIndex === (-1)) {
		b = new CCUI.PlainTextBlock();
		doc.getBlocks().push(b);
		b.wrap(doc.lastAllowedWidth, doc.getSpaceWidth());
		bc.blockIndex = 0;
	}
	return bc;
}

// Apply this TextEditor's font settings to 'renderCtx'.
CCUI.TextEditor.prototype.applyFontSettings = function (/*RenderContext*/ renderCtx) {
	renderCtx.ctx2D.textAlign = 'left';
	renderCtx.ctx2D.textBaseline = 'alphabetic';

	renderCtx.ctx2D.fillStyle = this._textFillStyle;
	renderCtx.setFontSize(this._fontSize);
	renderCtx.setLineHeight(this._lineHeight);
	renderCtx.setFontFamily(this._fontFamily);
	renderCtx.ensureFont();
	return this;
}

CCUI.TextEditor.prototype._calcPreferredWidth = function () {
	return Math.ceil(this._fontSize * this._hChars) + 2;
}

CCUI.TextEditor.prototype._calcPreferredHeight = function (/*opt num*/ forWidth) {
	return this.getPixelLineHeight() * this._vChars + 2;
}

CCUI.TextEditor.prototype.layout = function () {
	CCUI.Component.prototype.layout.call(this); // super.layout()
	this._scrollPanel.setPosition(1, 1, this._width - 2, this._height - 2);
	return this;
}

CCUI.TextEditor.prototype.paint = function (renderCtx) {
	//TODO: is stroke width 1 by default? If yes make it clear in the painting guidelines and make sure to set it when creating a rendercontect if not 1 by default in every browser implementation....
	renderCtx.strokeRect(0.5, 0.5, this._width - 0.5, this._height - 0.5, this._active ? this._activeBorderStyle : this._borderStyle);
}

// Line height in pixels.
/*num*/ CCUI.TextEditor.prototype.getPixelLineHeight = function () {
	return Math.ceil(this._fontSize * this._lineHeight);	
}

/*
 * class AbstractButton extends Component
 * AbstractButton is an ancestor of different kind of buttons.
 * It implements most aspects of a button, but abstracts away 2 things which are handled in child classes:
 * 1. What is drawn on the button's foreground and relatedly how to lay out the button (and what are its min, max and preferred sizes)
 * 2. How the 'action' event is fired.
 */
CCUI.AbstractButton = function(/*bool*/ vertical) {
	var that = this;
	CCUI.Component.call(this); // super constructor	
	
	/*bool*/ this._vertical = vertical;
	/*string*/ this._state = 'active'; // Possible values: 'active', 'hovered', 'pressed', 'disabled'
	// TODO: handle the coloring of the disabled state.

	/*num*/ this._roundRadius = 5;
	
	/*HSLAColor*/ this._color = CCUI.hsla(0, 0, 50, 1); // The base (background) color of the button.
	
	/*array of HSLAColor*/ this._gradientAdditions = [CCUI.hsla(0, 0, 20, 0), CCUI.hsla(0, 0, 12, 0), CCUI.hsla(0, 0, 0, 0), CCUI.hsla(0, 0, -8, 0)];
	// This 4 sized array contains color additions, which are added to the background color, border color, etc. to create gradient. 
	
	/*HSLAColor*/ this._borderColorAddition = null; // The border color addition is added to the base color to gain the border color.
	// If falsy then there is no border/bevel.
	
	/*num*/ this._borderOffset = 0; // If zero then the button will have a border. If non-zero, it will have a bevel.
	/*HSLAColor*/ this._hoveredColorAddition = CCUI.hsla(0, 0, 12, 0); // Added to all colors when the button is hovered.
	/*HSLAColor*/ this._pressedColorAddition = CCUI.hsla(0, 0, 0, 0); // Added to all colors when the button is pressed.
	/*Shadow*/ this._shadow = new CCUI.Shadow('rgba(0,0,0,0.6)', 2, 3, 3); // Specifies the button's shadow.
}
CCUI.AbstractButton.prototype = new CCUI.Component();

/*num*/ CCUI.AbstractButton.prototype.getPaintingX = function() {
	return this._x - (this._shadow ? this._shadow.getMaxAffectedLeft() : 0);
}

/*num*/ CCUI.AbstractButton.prototype.getPaintingY = function() {
	return this._y - (this._shadow ? this._shadow.getMaxAffectedTop() : 0);
}

/*num*/ CCUI.AbstractButton.prototype.getPaintingWidth = function() {
	return this._width + (this._shadow ? this._shadow.getMaxAffectedLeft() + this._shadow.getMaxAffectedRight() : 0);
}

/*num*/ CCUI.AbstractButton.prototype.getPaintingHeight = function() {
	return this._height + (this._shadow ? this._shadow.getMaxAffectedTop() + this._shadow.getMaxAffectedBottom() : 0);
}

CCUI.AbstractButton.prototype.onMouseover = function (event) {
	if(this._state !== 'disabled') {
		this.setState('hovered');
	}
	return this;
}

CCUI.AbstractButton.prototype.onMouseout = function (event) {
	if(this._state !== 'disabled') {
		this.setState('active');
	}	
	return this;
}

CCUI.AbstractButton.prototype.onMousedown = function (event) {
	if(this._state !== 'disabled') {
		this.setState('pressed');
	}
	return this;
}

CCUI.AbstractButton.prototype.onMouseup = function (event) {
	if(this._state !== 'disabled') {
		this.setState('hovered');
	}
	return this;
}

CCUI.AbstractButton.prototype.setState = function (/*state*/ state) {
	this._state = state;
	this.invalidate();
	return this;
}

CCUI.AbstractButton.prototype.setRoundRadius = function (/*num*/ roundRadius) {
	this._roundRadius = roundRadius;
	this.makeAreaDirty();
	return this;
}

CCUI.AbstractButton.prototype.setColor = function (/*HSLAColor*/ color) {
	this._color = color;
	this.makeAreaDirty();
	return this;
}

CCUI.AbstractButton.prototype.setShadow = function (/*Shadow*/ shadow) {
	this._shadow = shadow;
	this.makeAreaDirty();
	return this;
}

CCUI.AbstractButton.prototype.setGradientAdditions = function (/*array of HSLAColor*/ gradientAdditions) {
	this._gradientAdditions = gradientAdditions;
	this.makeAreaDirty();
	return this;
}

CCUI.AbstractButton.prototype.setBorderColorAddition = function (/*HSLAColor*/ borderColorAddition) {
	this._borderColorAddition = borderColorAddition;
	this.makeAreaDirty();
	return this;
}

CCUI.AbstractButton.prototype.setBorderOffset = function (/*num*/ borderOffset) {
	this._borderOffset = borderOffset;
	this.invalidate();
	return this;
}

CCUI.AbstractButton.prototype.setHoveredColorAddition = function (/*HSLAColor*/ hoveredColorAddition) {
	this._hoveredColorAddition = hoveredColorAddition;
	this.makeAreaDirty();
	return this;
}

CCUI.AbstractButton.prototype.setPressedColorAddition = function (/*HSLAColor*/ pressedColorAddition) {
	this._pressedColorAddition = pressedColorAddition;
	this.makeAreaDirty();
	return this;
}

CCUI.AbstractButton.prototype.doesHit = function(x,y) {
	return CCUI.isInsideRoundedRect(x, y, 0, 0, this._width, this._height, this._roundRadius);
}

CCUI.AbstractButton.prototype.paint = function (renderCtx) {
	this._setupShadow(renderCtx);
	this._paintBase(renderCtx);
	renderCtx.clearShadow();
	this._paintBorder(renderCtx);
}

CCUI.AbstractButton.prototype._paintBase = function (renderCtx) {
	var gradient = this._createGradient(renderCtx);
	gradient.addColorStop(0, this._getBaseColor(0).normStr());
	gradient.addColorStop(0.5, this._getBaseColor(1).normStr());	
	gradient.addColorStop(0.5, this._getBaseColor(2).normStr());
	gradient.addColorStop(1, this._getBaseColor(3).normStr());
	renderCtx.ctx2D.fillStyle = gradient;
	renderCtx.fillRoundedRect(0, 0, this._width, this._height, this._roundRadius);
}

CCUI.AbstractButton.prototype._paintBorder = function (renderCtx) {
	if(this._borderColorAddition) {
		var gradient = this._createGradient(renderCtx);
		gradient.addColorStop(0, this._getBorderColor(0).normStr());
		gradient.addColorStop(0.5, this._getBorderColor(1).normStr());	
		gradient.addColorStop(0.5, this._getBorderColor(2).normStr());
		gradient.addColorStop(1, this._getBorderColor(3).normStr());	
		renderCtx.ctx2D.strokeStyle = gradient;
		renderCtx.ctx2D.lineWidth = 1.02;
		renderCtx.strokeRoundedRect(this._borderOffset + 0.5, this._borderOffset + 0.5,
			this._width - this._borderOffset - 0.5, this._height - this._borderOffset - 0.5, this._roundRadius - this._borderOffset);
	}
}

CCUI.AbstractButton.prototype._createGradient = function(renderCtx) {
	return renderCtx.ctx2D.createLinearGradient(0, 0, this._vertical ? this._width : 0, (!this._vertical) ? this._height : 0);
}

CCUI.AbstractButton.prototype._getBaseColor = function(index) {
	var c = this._color.add(this._gradientAdditions[index]);
	if(this._state === 'hovered') {
		return c.add(this._hoveredColorAddition);
	} else if(this._state === 'pressed') {
		return c.add(this._pressedColorAddition);
	} else {
		return c;
	}
}

CCUI.AbstractButton.prototype._getBorderColor = function(index) {
	var c = this._color.add(this._borderColorAddition).add(this._gradientAdditions[index]);
	if(this._state === 'hovered') {
		return c.add(this._hoveredColorAddition);
	} else if(this._state === 'pressed') {
		return c.add(this._pressedColorAddition);
	} else {
		return c;
	}	
}

CCUI.AbstractButton.prototype._setupShadow = function (renderCtx) {
	if(this._state === 'pressed') {
		renderCtx.clearShadow();
	} else {
		renderCtx.setShadow(this._shadow)
	}
}

/*
 * class Button extends AbstractButton
 *
 * Button is an AbstractButton which displays a StaticDoc label and only fires its 'action' event when releasing the mouse button on it.
 */
CCUI.Button = function(/*string or StaticDoc*/ label, /*bool*/ lockLabel/*=true*/) {
	var that = this;
	lockLabel = CCUI.dflt(lockLabel, true);
	CCUI.AbstractButton.call(this, false); // super constructor
	if(label) {
		/*StaticDoc*/ this._label = (typeof label === 'string') ? new CCUI.StaticDoc(label) : label;
		if(lockLabel) {
			this._label.lock();
		}
		this._label.setZ(1);
		this._addChild(this._label);
		this._label.takesClicks = false;		
	}

	/*{top: num, bottom: num, left: num, right: num}*/ this._minPadding = {top: 2, bottom:2, left: 2, right: 2}; // The minimum padding.
	/*{top: num, bottom: num, left: num, right: num}*/ this._preferredPadding = {top: 5, bottom:2, left: 10, right: 10}; // The preferred padding.
}
CCUI.Button.prototype = new CCUI.AbstractButton();

CCUI.Button.prototype.onMouseup = function (event) {
	CCUI.AbstractButton.prototype.onMouseup.call(this, event); // super.onMouseup()
	if(this._state !== 'disabled') {
		this.fire({type: 'action'});
	}	
	return this;
}

CCUI.Button.prototype.setMinPadding = function (/*{top: num, bottom: num, left: num, right: num}*/ minPadding) {
	this._minPadding = minPadding;
	this.invalidate();
	return this;
}

CCUI.Button.prototype.setPreferredPadding = function (/*{top: num, bottom: num, left: num, right: num}*/ preferredPadding) {
	this._preferredPadding = preferredPadding;
	this.invalidate();
	return this;
}

/*StaticDoc*/ CCUI.Button.prototype.getLabel = function () {
	return this._label;
}

CCUI.Button.prototype._calcPreferredWidth = function () {
	return this._label.getPreferredWidth() + this._preferredPadding.left + this._preferredPadding.right;
}

CCUI.Button.prototype._calcPreferredHeight = function (/*opt num*/ forWidth) {
	return this._label.getPreferredHeight() + this._preferredPadding.top + this._preferredPadding.bottom;
}

CCUI.Button.prototype._calcMinWidth = function () {
	return this._label.getMinWidth() + this._minPadding.left + this._minPadding.right;
}

CCUI.Button.prototype._calcMinHeight = function () {
	return this._label.getMinHeight() + this._minPadding.top + this._minPadding.bottom;
}

CCUI.Button.prototype.layout = function () {
	CCUI.Component.prototype.layout.call(this); // super.layout()
	var lpw = this._label.getPreferredWidth();
	if(lpw + this._minPadding.left + this._minPadding.right <= this._width) {
		this._label.setX(Math.floor((this._width - lpw) * this._preferredPadding.left / (this._preferredPadding.left + this._preferredPadding.right)));
	} else {
		this._label.setX(this._minPadding.left); //TODO: what about clipping region?
	}
	this._label.setWidth(lpw);
	
	var lph = this._label.getPreferredHeight();
	if(lph + this._minPadding.top + this._minPadding.bottom <= this._height) {
		this._label.setY(Math.floor((this._height - lph) * this._preferredPadding.top / (this._preferredPadding.top + this._preferredPadding.bottom)));
	} else {
		this._label.setY(this._minPadding.top); //TODO: what about clipping region?
	}	

	this._label.setHeight(lph);
	
	return this;
}


/*
 * class ArrowButton extends AbstractButton
 *
 * ArrowButton is an AbstractButton which displays an arrow and fires its 'action' event repeatedly when holding down the mouse button on it.
 *
 * Constuctor: 'dir' is the direction of the arrow, and can be 'top', 'bottom', 'left', 'right'.
 */
CCUI.ArrowButton = function(/*string*/ dir) {
	CCUI.AbstractButton.call(this, dir === 'top' || dir === 'bottom'); // super constructor
	this._dir = dir;
	/*fill-style*/ this._arrowColor = '#ffffff'; // The color of the arrow.	
	this._stateCounter = 0;

	/*num*/ this.firstActionRepeatTime = 300; // If the user holds the mouse button on this component, the 'action' event will fire again after this amount of time. 
	/*num*/ this.subsequentActionRepeatTime = 20; // If the user holds the mouse button on this component and 'firstActionRepeatTime'
		//is already elapsed then subsequent 'action' events will be fired after every elapsed 'subsequentActionRepeatTime'.
}
CCUI.ArrowButton.prototype = new CCUI.AbstractButton();

CCUI.ArrowButton.prototype.setState = function (/*string*/ state) {
	var that = this;
	CCUI.AbstractButton.prototype.setState.call(this, state); // super.setState()
	this._stateCounter++;
	var sc = this._stateCounter;
	if(state === 'pressed') {
		this.fire({type: 'action'});
		var f = function() {
			if(sc === that._stateCounter) {
				that.fire({type: 'action'});
				setTimeout(f, that.subsequentActionRepeatTime);
			}
		};
		setTimeout(f, this.firstActionRepeatTime);
	}
}

CCUI.ArrowButton.prototype.setArrowColor = function (/*fill-style*/ arrowColor) {
	this._arrowColor = arrowColor;
	this.makeAreaDirty();
	return this;
}

CCUI.ArrowButton.prototype.paint = function (renderCtx) {
	CCUI.AbstractButton.prototype.paint.call(this, renderCtx); // super.paint()

	renderCtx.ctx2D.beginPath();
	if(this._dir === 'top') {
		renderCtx.ctx2D.moveTo(this._width / 5, this._height * 2 / 3);
		renderCtx.ctx2D.lineTo(this._width * 4 / 5, this._height * 2 / 3);
		renderCtx.ctx2D.lineTo(this._width / 2, this._height / 3);
	} else if(this._dir === 'bottom') {
		renderCtx.ctx2D.moveTo(this._width / 5, this._height / 3);
		renderCtx.ctx2D.lineTo(this._width * 4 / 5, this._height / 3);
		renderCtx.ctx2D.lineTo(this._width / 2, this._height * 2 / 3);		
	} else if(this._dir === 'left') {
		renderCtx.ctx2D.moveTo(this._width * 2 / 3, this._height / 5);
		renderCtx.ctx2D.lineTo(this._width * 2 / 3, this._height * 4 / 5);
		renderCtx.ctx2D.lineTo(this._width / 3, this._height / 2);
	} else if(this._dir === 'right') {
		renderCtx.ctx2D.moveTo(this._width / 3, this._height / 5);
		renderCtx.ctx2D.lineTo(this._width / 3, this._height * 4 / 5);
		renderCtx.ctx2D.lineTo(this._width * 2 / 3, this._height / 2);		
	}
	renderCtx.ctx2D.closePath();
	renderCtx.ctx2D.fillStyle = this._arrowColor;
	renderCtx.ctx2D.fill();
}

CCUI.ArrowButton.prototype._calcPreferredWidth = function () {
	return 15;
}

CCUI.ArrowButton.prototype._calcPreferredHeight = function (/*opt num*/ forWidth) {
	return 15;
}

/*
 * class ScrollTrackerButton extends AbstractButton
 */
CCUI.ScrollTrackerButton = function(/*bool*/ vertical) {
	CCUI.AbstractButton.call(this, vertical); // super constructor
	this._vertical = vertical;
}
CCUI.ScrollTrackerButton.prototype = new CCUI.AbstractButton();

CCUI.ScrollTrackerButton.prototype._calcPreferredWidth = function () {
	return 15;
}

CCUI.ScrollTrackerButton.prototype._calcPreferredHeight = function (/*opt num*/ forWidth) {
	return 15;
}

// 'event' is the mousemove event of its parent.
CCUI.ScrollTrackerButton.prototype.dragTrack = function (event) {
	var dragInfo = this._canvas.dragInfo;

	if(this._vertical) {
		var intendedPixelY = event.y - this._canvas.dragInfo.y;
		this._parent.setWindowStartPos(this._parent._toLogicalY(intendedPixelY), true);
	} else {
		var intendedPixelX = event.x - this._canvas.dragInfo.x;
		this._parent.setWindowStartPos(this._parent._toLogicalX(intendedPixelX), true);		
	}
}

/*
 * class ScrollBar extends Component
 *
 * A scroll-bar component.
 * Logically represents a 'window' (interval) of values on a specified 'full-range'.
 */
CCUI.ScrollBar = function(/*bool*/ vertical) {

	var that = this;
	CCUI.Component.call(this); // super constructor
	/*bool*/ this._vertical = vertical;

	/*num*/ this._fullRange = 1;
	/*num*/ this._windowRange = 0.3;
	/*num*/ this._increment = 0.05;
	/*num*/ this._windowStartPos = 0;

	/*fill-style*/ this._backgroundStyle = '#AFAFAF';
	/*fill-style*/ this._borderStyle = '#757575';

	/*ArrowButton*/ this._arrow1 = new CCUI.ArrowButton(vertical ? 'top' : 'left').setZ(1);
	/*ArrowButton*/ this._arrow2 = new CCUI.ArrowButton(vertical ? 'bottom' : 'right').setZ(1);
	this._addChild(this._arrow1);
	this._addChild(this._arrow2);

	this._arrow1.addListener('action', function(event) {
		that.setWindowStartPos(that._windowStartPos - that._increment, true);
		
	});

	this._arrow2.addListener('action', function(event) {
		that.setWindowStartPos(that._windowStartPos + that._increment, true);
	});

	/*ScrollTrackerButton*/ this._scrollTrackerButton = new CCUI.ScrollTrackerButton(vertical).setZ(2);
	this._addChild(this._scrollTrackerButton);

	this._scrollTrackerButton.addListener('mousedown', function(event) {
		var dragInfo;
		if(that._canvas) {
			that._canvas.startDrag(that._scrollTrackerButton, event.x, event.y);
		}
	});
}

CCUI.ScrollBar.prototype = new CCUI.Component();

/*ArrowButton*/ CCUI.ScrollBar.prototype.getArrow1 = function () {
	return this._arrow1;
}

/*ArrowButton*/ CCUI.ScrollBar.prototype.getArrow2 = function () {
	return this._arrow2;
}

/*ScrollTrackerButton*/ CCUI.ScrollBar.prototype.getScrollTrackerButton = function () {
	return this._scrollTrackerButton;
}

// Returns the logical starting position of the 'window'.
/*num*/ CCUI.ScrollBar.prototype.getWindowStartPos = function () {
	return this._windowStartPos;
}

// Sets the logical starting position of the 'window'.
CCUI.ScrollBar.prototype.setWindowStartPos = function (/*num*/ windowStartPos, /*bool*/ userInitiated/*=false*/, /*bool*/ invalidateLayout/*=true*/) {
	userInitiated = CCUI.dflt(userInitiated, false);
	invalidateLayout = CCUI.dflt(invalidateLayout, true);
	this._windowStartPos = windowStartPos;
	if(this._windowStartPos < 0) {
		this._windowStartPos = 0;
	}
	if(this._windowStartPos + this._windowRange > this._fullRange) {
		this._windowStartPos = this._fullRange - this._windowRange;
	}
	if(invalidateLayout) {
		this.setNeedsLayout();
	}
	this.fire({type: 'posChanged', userInitiated: userInitiated});
	return this;
}

// Sets the logical parameters of this ScrollBar.
// 'fullRange': The logical full range of values on which the scroll-bar is based.
// 'windowRange': The range of the logical window.
// 'windowStartPos': The (logical) starting position of the 'window'.
// 'increment': When the arrow is pressed the window start position changes this amount. 
CCUI.ScrollBar.prototype.setParams = function(/*num*/ fullRange, /*num*/ windowRange, /*num*/ increment, /*num*/ windowStartPos,
		/*bool*/ userInitiated/*=false*/, /*bool*/ invalidateLayout/*=true*/) {
	this._fullRange = fullRange;
	this._windowRange = windowRange;
	this._increment = increment;	
	return this.setWindowStartPos(windowStartPos, userInitiated, invalidateLayout);
}

CCUI.ScrollBar.prototype.setBackgroundStyle = function (/*fill-style*/ backgroundStyle) {
	this._backgroundStyle = backgroundStyle;
	this.makeAreaDirty();
	return this;
}

CCUI.ScrollBar.prototype.setBorderStyle = function (/*fill-style*/ borderStyle) {
	this._borderStyle = borderStyle;
	this.makeAreaDirty();
	return this;
}

CCUI.ScrollBar.prototype._calcPreferredWidth = function () {
	return this._vertical ? 17 : 100;
}

CCUI.ScrollBar.prototype._calcPreferredHeight = function (/*opt num*/ forWidth) {
	return this._vertical ? 100 : 17;
}

CCUI.ScrollBar.prototype.layout = function () {
	CCUI.Component.prototype.layout.call(this); // super.layout()
	if(this._vertical) {
		this._arrow1.setPosition(1, 1, this._width - 2, this._width - 2);
		this._arrow2.setWidth(this._width - 2).setHeight(this._width - 2).setX(1).setY(this._height - this._arrow2.getHeight() - 1);
		this._scrollTrackerButton.setPosition(1, this._width - 1 + this._getPixelWindowStartPos(), this._width - 2, this._getPixelWindowRange());		
	} else {
		this._arrow1.setPosition(1, 1, this._height - 2, this._height - 2);
		this._arrow2.setHeight(this._height - 2).setWidth(this._height - 2).setX(this._width - this._arrow2.getWidth() - 1).setY(1);
		this._scrollTrackerButton.setPosition(this._height - 1 + this._getPixelWindowStartPos(), 1, this._getPixelWindowRange(), this._height - 2);		
	}
}

CCUI.ScrollBar.prototype._toLogicalY = function (pixelY) {
	return (pixelY - this._width + 1) * this._fullRange / this._getPixelFullRange();
}

CCUI.ScrollBar.prototype._toLogicalX = function (pixelX) {
	return (pixelX - this._height + 1) * this._fullRange / this._getPixelFullRange();
}

CCUI.ScrollBar.prototype._getPixelWindowRange = function () {
	return Math.floor(Math.max(this._getPixelFullRange() * this._windowRange / this._fullRange, 10));
}

CCUI.ScrollBar.prototype._getPixelFullRange = function () {
	return this._vertical ? this._height - 2 * this._width + 2 : this._width - 2 * this._height + 2;
}

CCUI.ScrollBar.prototype._getPixelWindowStartPos = function () {
	var ret = this._windowStartPos * this._getPixelFullRange() / this._fullRange;
	if(ret < 0) {
		ret = 0;
	}
	if(ret + this._getPixelWindowRange() > this._getPixelFullRange()) {
		ret = this._getPixelFullRange() - this._getPixelWindowRange();
	}
	return Math.round(ret);
}

CCUI.ScrollBar.prototype.paint = function (renderCtx) {
	renderCtx.fillRect(0, 0, this._width, this._height, this._backgroundStyle);
	renderCtx.strokeRect(0.5, 0.5, this._width - 0.5, this._height - 0.5, this._borderStyle);
}

/*
 * class ViewPort extends Component
 */
CCUI.ViewPort = function(/*Component*/ content, /*string*/ hScrollPolicy, /*string*/ vScrollPolicy) {
	CCUI.Component.call(this); // super constructor
	this._hScrollPolicy = hScrollPolicy;
	this._vScrollPolicy = vScrollPolicy;
	this._content = content;
	this._addChild(content);
	content.setZ(1).setW(0);
}
CCUI.ViewPort.prototype = new CCUI.Component();

/*num*/ CCUI.ViewPort.prototype._calcPreferredWidth = function () {
	return this._content.getPreferredWidth();
}

/*num*/ CCUI.ViewPort.prototype._calcPreferredHeight = function (/*opt num*/ forWidth) {
	return this._content.getPreferredHeight(forWidth);
}

/*num*/ CCUI.ViewPort.prototype._calcMaxWidth = function () {
	return this._content.getMaxWidth();
}

/*num*/ CCUI.ViewPort.prototype._calcMaxHeight = function () {
	return this._content.getMaxHeight();
}

CCUI.ViewPort.prototype.layout = function () {
	CCUI.Component.prototype.layout.call(this); // super.layout()

	if(this._content) {
		if(this._content.getX() === undefined || this._content.getX() === null) {
			this._content.setX(0);
		}
		if(this._content.getY() === undefined || this._content.getY() === null) {
			this._content.setY(0);
		}
		this._content.setWidth((this._hScrollPolicy === 'no_scroll') ? this._width : Math.max(this._content.getPreferredWidth(), this._width));
		this._content.setHeight((this._vScrollPolicy === 'no_scroll') ? this._height: Math.max(this._content.getPreferredHeight(this._width), this._height));
	}
	return this;
}

/*num*/ CCUI.ViewPort.prototype.getContentX = function () {
	return this._content.getX();
}

CCUI.ViewPort.prototype.setContentX = function (/*num*/ x) {
	this._content.setX(Math.round(x));
	return this;
}

/*num*/ CCUI.ViewPort.prototype.getContentY = function () {
	return this._content.getY();
}

CCUI.ViewPort.prototype.setContentY = function (/*num*/ y) {
	this._content.setY(Math.round(y));
	return this;
}

/*
 * class ScrollPanel extends Component
 *
 * ScrollPanel is a container component which contains another component (called content), and may employ horizontal and/or vertical scrolling
 * to scroll the content if the space determined by the content's preferred size is not available.
 *
 * Constructor:
 * 'content': The component that is scrolled inside this ScrollPanel.
 * 'hScrollPolicy': Possible values:
 * 		'no_scroll': No scrolling at all: the content is laid out so that its width is set to the ScrollPanel's actual width.
 * 		'without_scrollbar': There is scrolling: the content is laid out so that its width is set to its preferred width
 *			if it is greater than the ScrollPanel's width, and the content's x property can be set programmatically,
 *			but no horizontal scrollbar appears. (Example: one-line TextEditor)
 * 		'with_scrollbar': There is scrolling: the content is laid out so that its width is set to its preferred width
 *			if it is greater than the ScrollPanel's width and a horizontal scrollbar appears when necessary. 
 * 'vScrollPolicy': Possible values: 'no_scroll', 'without_scrollbar', 'with_scrollbar'.
 * 'makesContentCacheable': If true, this constructor makes content automatically cacheable
 * (in other words it does the following: 'content.cacheable = true') (see. the chapter about painting in CCUI). 
 */
CCUI.ScrollPanel = function(/*Component*/ content, /*string*/ hScrollPolicy/*='with_scrollbar'*/, /*string*/ vScrollPolicy/*='with_scrollbar'*/,
		/*bool*/ makesContentCacheable/*=true*/) {
	var that = this;

	hScrollPolicy = CCUI.dflt(hScrollPolicy, 'with_scrollbar');
	vScrollPolicy = CCUI.dflt(vScrollPolicy, 'with_scrollbar');

	CCUI.Component.call(this); // super constructor
	/*Component*/ this._content = content;	

	if(CCUI.dflt(makesContentCacheable, true)) {
		content.cacheable = true;
	}

	if(hScrollPolicy === 'with_scrollbar') {
		this._horizScrollBar = new CCUI.ScrollBar(false).setZ(2);
		this._addChild(this._horizScrollBar);

		this._horizScrollBar.addListener('posChanged', function(event) {
			if(event.userInitiated) {
				that._viewPort.setContentX(-that._horizScrollBar.getWindowStartPos());
			}
		});
	}
	
	if(vScrollPolicy === 'with_scrollbar') {
		this._vertScrollBar = new CCUI.ScrollBar(true).setZ(2);
		this._addChild(this._vertScrollBar);
		
		this._vertScrollBar.addListener('posChanged', function(event) {
			if(event.userInitiated) {
				that._viewPort.setContentY(-that._vertScrollBar.getWindowStartPos());
			}
		});		
	}
	
	this._viewPort = new CCUI.ViewPort(content, hScrollPolicy, vScrollPolicy).setId('viewport').setZ(1);
	this._addChild(this._viewPort);	
}
CCUI.ScrollPanel.prototype = new CCUI.Component();

/*num*/ CCUI.ScrollPanel.prototype.getContentX = function () {
	return this._viewPort.getContentX();
}

CCUI.ScrollPanel.prototype.setContentX = function (/*num*/ x) {
	this._viewPort.setContentX(x);
	this.setNeedsLayout();
	return this;
}

/*num*/ CCUI.ScrollPanel.prototype.getContentY = function () {
	return this._viewPort.getContentY();
}

CCUI.ScrollPanel.prototype.setContentY = function (/*num*/ y) {
	this._viewPort.setContentY(y);
	this.setNeedsLayout();
	return this;
}

/*num*/ CCUI.ScrollPanel.prototype.getViewportWidth = function () {
	return this._viewPort.getWidth();
}

/*num*/ CCUI.ScrollPanel.prototype.getViewportHeight = function () {
	return this._viewPort.getHeight();
}

// Tries to ensure (by moving the content if necessary) that the content is scrolled in such a way
// that rectangle (x1, y1, x2, y2) in the content is fully visible in the viewport.
// It is the caller's responsibility to provide a rectangle so that x1 < x2 and y1 < y2.
// If it is not possible to ensure that the whole rectangle is in view, then it tries to make sure that at least
// the upper left corner is in view.
// Please note that the user can see a different content position than the position set by this method
// as the 'layout' method makes sure that the viewport only contains content area. 
CCUI.ScrollPanel.prototype.ensureRectInView = function (/*num*/ x1, /*num*/ y1, /*num*/ x2, /*num*/ y2) {
	var oldContentX = this.getContentX(), contentX = oldContentX,
		oldContentY = this.getContentY(), contentY = oldContentY,
		vpWidth = this.getViewportWidth(), vpHeight = this.getViewportHeight();

	if(contentX > vpWidth - x2) {
		contentX = vpWidth - x2;
	}
	if(contentY > vpHeight - y2) {
		contentY = vpHeight - y2;
	}		
		
	if(contentX < (-x1)) {
		contentX = (-x1);
	}
	if(contentY < (-y1)) {
		contentY = (-y1);
	}
	
	if(oldContentX !== contentX) {
		this.setContentX(contentX);
	}
	if(oldContentY !== contentY) {
		this.setContentY(contentY);
	}
	return this;
}

// We need to override setNeedsLayout, because of the ScrollPanel 
CCUI.ScrollPanel.prototype.setNeedsLayout = function () {
	CCUI.Component.prototype.setNeedsLayout.call(this); // super.setNeedsLayout()
	if(this._horizScrollBar) {
		this._horizScrollBar.setNeedsLayoutNonRec();
	}
	if(this._vertScrollBar) {
		this._vertScrollBar.setNeedsLayoutNonRec();
	}
	return this;	
}

/*num*/ CCUI.ScrollPanel.prototype._calcPreferredWidth = function () {
	return this._viewPort.getPreferredWidth();
}

/*num*/ CCUI.ScrollPanel.prototype._calcPreferredHeight = function (/*opt num*/ forWidth) {
	return this._viewPort.getPreferredHeight(forWidth);
}

/*num*/ CCUI.ScrollPanel.prototype._calcMinWidth = function () {
	return Math.min(this._getHSBPreferredHeight() * 3,
		this._viewPort.getPreferredWidth());
}

/*num*/ CCUI.ScrollPanel.prototype._calcMinHeight = function () {
	return Math.min(this._getVSBPreferredWidth() * 3,
		this._viewPort.getPreferredHeight());	
}

/*num*/ CCUI.ScrollPanel.prototype._calcMaxWidth = function () {
	var vpmw = this._viewPort.getMaxWidth();
	return vpmw === (-1) ? (-1) : Math.max(vpmw, this.getMinWidth());
}

/*num*/ CCUI.ScrollPanel.prototype._calcMaxHeight = function () {
	var vpmw = this._viewPort.getMaxHeight();
	return vpmw === (-1) ? (-1) : Math.max(vpmw, this.getMinHeight());
}

CCUI.ScrollPanel.prototype.layout = function () {
	CCUI.Component.prototype.layout.call(this); // super.layout()

	var vpPreferredWidth = this._viewPort.getPreferredWidth();
	var horizScrollNeeded = this._width > this._getVSBPreferredWidth() && vpPreferredWidth > this._width;
	var horizScrollBarNeeded = this._horizScrollBar && horizScrollNeeded;	
	var vpPreferredHeight = this._viewPort.getPreferredHeight(horizScrollBarNeeded ? vpPreferredWidth : this._width);
	var vertScrollNeeded = this._height > this._getHSBPreferredHeight() && vpPreferredHeight > this._height;
	var vertScrollBarNeeded = this._vertScrollBar && vertScrollNeeded;

	// As a vertical scrollbar is needed, the available width is smaller, so preferred height must be recalculated.
	if((!this._horizScrollBar) && vertScrollBarNeeded) {
		vpPreferredHeight = this._viewPort.getPreferredHeight(this._width - this._getVSBPreferredWidth());
	}

	var vpWidth = this._width - (vertScrollBarNeeded ? this._getVSBPreferredWidth() : 0);
	var vpHeight = this._height - (horizScrollBarNeeded ? this._getHSBPreferredHeight() : 0);

	this._viewPort.setPosition(0, 0, vpWidth, vpHeight);
	
	// adjust content's vertical position if needed	
	var cy = this._viewPort.getContentY();
	if(vertScrollBarNeeded) {
		if(vpHeight - cy > vpPreferredHeight) {
			this._viewPort.setContentY(vpHeight - vpPreferredHeight);
		}
	}
	if(vertScrollNeeded) {
		if(this._viewPort.getContentY() > 0) {
			this._viewPort.setContentY(0);
		}
	} else {
		if(cy !== 0) {
			this._viewPort.setContentY(0);
		}
	}	

	if(vertScrollBarNeeded) {
		this._vertScrollBar.setVisible(true)
			.setPosition(vpWidth, 0, this._vertScrollBar.getPreferredWidth(), this._height)
			.setParams(vpPreferredHeight, vpHeight, 10, - this._viewPort.getContentY(), false, false);
	} else if(this._vertScrollBar) {
		this._vertScrollBar.setVisible(false);
	}

	// adjust content's horizontal position if needed
	var cx = this._viewPort.getContentX();
	if(horizScrollBarNeeded) {
		if(vpWidth - cx > vpPreferredWidth) {
			this._viewPort.setContentX(vpWidth - vpPreferredWidth);
		}
	}
	if(horizScrollNeeded) {
		if(this._viewPort.getContentX() > 0) {
			this._viewPort.setContentX(0);
		}		
	} else {
		if(cx !== 0) {
			this._viewPort.setContentX(0);
		}
	}

	if(horizScrollBarNeeded) {
		this._horizScrollBar.setVisible(true)
			.setPosition(0, vpHeight, vertScrollBarNeeded ? vpWidth : this._width, this._horizScrollBar.getPreferredHeight())
			.setParams(vpPreferredWidth, vpWidth, 10, - this._viewPort.getContentX(), false, false);
	} else if(this._horizScrollBar) {
		this._horizScrollBar.setVisible(false);
	}
	return this;
}

CCUI.ScrollPanel.prototype._getHSBPreferredHeight = function () {
	return this._horizScrollBar ? this._horizScrollBar.getPreferredHeight() : 0;
}

CCUI.ScrollPanel.prototype._getVSBPreferredWidth = function () {
	return this._vertScrollBar ? this._vertScrollBar.getPreferredWidth() : 0;
}

/*
 * class Window extends Component
 *
 * Represents a window component.
 * Constructor: 'titleLabel' is the label of the title bar.
 * Window is made cacheable in the constructor ('this.cacheable = true' is executed.)
 */
CCUI.Window = function(/*StaticDoc*/ titleLabel) {
	var that = this;
	CCUI.Component.call(this); // super constructor
	if(titleLabel) { // we assume a StaticDoc here.
		titleLabel.setZ(1);
		/*StaticDoc*/ this._titleLabel = titleLabel; // The label of the title bar.
		this._addChild(titleLabel);
		titleLabel.takesClicks = false;		
	}
	/*{top: num, bottom: num, left: num, right: num}*/ this._titlePadding = {top: 5, bottom:2, left: 10, right: 10}; // The padding around 'titleLabel' in the title bar.
	/*fill-style*/ this._strokeStyle = '#000000'; // Stroke style of the window frame.
	/*fill-style*/ this._fillStyle = '#909090'; // Fill style of the window frame when the window is not active.
	/*fill-style*/ this._activeFillStyle = '#6060C0'; // Fill style of the window frame when the window is active.
	/*num*/ this._borderWidth = 5; // Width of the window frame border.
	/*num*/ this._roundRadius = 5; // Round radius of the window frame.
	/*Shadow*/ this._shadow = new CCUI.Shadow('rgba(0,0,0,0.6)', 2, 3, 3);	// The shadow of the window frame.
	/*Component*/ this._content = null; // The content-component of this window.
	this.cacheable = true;
}
CCUI.Window.prototype = new CCUI.Component();


/*num*/ CCUI.Window.prototype.getPaintingX = function() {
	return this._x - (this._shadow ? this._shadow.getMaxAffectedLeft() : 0) - 1;
}

/*num*/ CCUI.Window.prototype.getPaintingY = function() {
	return this._y - (this._shadow ? this._shadow.getMaxAffectedTop() : 0) - 1;
}

/*num*/ CCUI.Window.prototype.getPaintingWidth = function() {
	return this._width + (this._shadow ? this._shadow.getMaxAffectedLeft() + this._shadow.getMaxAffectedRight() : 0) + 2;
}

/*num*/ CCUI.Window.prototype.getPaintingHeight = function() {
	return this._height + (this._shadow ? this._shadow.getMaxAffectedTop() + this._shadow.getMaxAffectedBottom() : 0) + 2;
}

CCUI.Window.prototype.onMousedown = function (event) {
	var dragInfo;
	if(this._canvas) {
		if(event.x < this._borderWidth && event.y < this._borderWidth) {
			dragInfo = this._canvas.startDrag(this, event.x, event.y);
			dragInfo.dragType = 'resize';
			dragInfo.resizeAnchor = 'top-left';
		} else if(event.x < this._borderWidth && event.y >= this._height - this._borderWidth) {
			dragInfo = this._canvas.startDrag(this, event.x, event.y);
			dragInfo.dragType = 'resize';
			dragInfo.resizeAnchor = 'bottom-left';				
		} else if(event.x >= this._width - this._borderWidth && event.y < this._borderWidth) {
			dragInfo = this._canvas.startDrag(this, event.x, event.y);
			dragInfo.dragType = 'resize';
			dragInfo.resizeAnchor = 'top-right';
		} else if(event.x >= this._width - this._borderWidth && event.y >= this._height - this._borderWidth) {
			dragInfo = this._canvas.startDrag(this, event.x, event.y);
			dragInfo.dragType = 'resize';
			dragInfo.resizeAnchor = 'bottom-right';				
		} else if(event.x < this._borderWidth) {
			dragInfo = this._canvas.startDrag(this, event.x, event.y);
			dragInfo.dragType = 'resize';
			dragInfo.resizeAnchor = 'left';			
		} else if(event.y < this._borderWidth) {
			dragInfo = this._canvas.startDrag(this, event.x, event.y);
			dragInfo.dragType = 'resize';
			dragInfo.resizeAnchor = 'top';			
		} else if(event.x >= this._width - this._borderWidth) {
			dragInfo = this._canvas.startDrag(this, event.x, event.y);
			dragInfo.dragType = 'resize';
			dragInfo.resizeAnchor = 'right';			
		} else if(event.y >= this._height - this._borderWidth) {
			dragInfo = this._canvas.startDrag(this, event.x, event.y);
			dragInfo.dragType = 'resize';
			dragInfo.resizeAnchor = 'bottom';			
		} else if(this._isInTitleArea(event.x, event.y)) {
			dragInfo = this._canvas.startDrag(this, event.x, event.y);
			dragInfo.dragType = 'move';
		}
	}
}

/*StaticDoc*/ CCUI.Window.prototype.getTitleLabel = function () {
	return this._titleLabel;
}

//override
CCUI.Window.prototype.setActive = function(/*bool*/ active) {
	var oldActive = this._active;
	CCUI.Component.prototype.setActive.call(this, active); // super.setActive()
	if((!oldActive) && this._active) {
		this.bringToFront();
	}
}

//override
/*string*/ CCUI.Window.prototype.getMouseCursorStyle = function(/*num*/ x, /*num*/ y) {
	if(this._canvas) {
		if(x < this._borderWidth && y < this._borderWidth) {
			return 'nw-resize';
		} else if(x < this._borderWidth && y >= this._height - this._borderWidth) {
			return 'sw-resize';
		} else if(x >= this._width - this._borderWidth && y < this._borderWidth) {
			return 'ne-resize';
		} else if(x >= this._width - this._borderWidth && y >= this._height - this._borderWidth) {
			return 'se-resize';
		} else if(x < this._borderWidth) {
			return 'w-resize';
		} else if(y < this._borderWidth) {
			return 'n-resize';
		} else if(x >= this._width - this._borderWidth) {
			return 'e-resize';
		} else if(y >= this._height - this._borderWidth) {
			return 's-resize';
		} else  {
			return 'default';
		}
	} else {
		return 'default';
	}
}

// Brings this window to front. This means that its 'z' property becomes (the maximum 'z' of the windows with the same 'w') + 1.
CCUI.Window.prototype.bringToFront = function() {
	var p = this._parent, children, childrenLength, i, sibling, maxZ = (-999999);
	if(p) {
		children = p.getChildren();
		childrenLength = children.length;
		for(i=0; i<childrenLength; i++) {
			sibling = children[i];
			if(sibling !== this && sibling.getW() === this._w && (sibling instanceof CCUI.Window)) {
				if(sibling.getZ() > maxZ) {
					maxZ = sibling.getZ();
				}
			}
		}
		if(maxZ >= this._z) {
			this.setZ(maxZ + 1);
		}
	}
	return this;
}

// event is the mousemove event of its parent.
CCUI.Window.prototype.dragTrack = function (event) {
	//CCUI.log('dragTrack x: ' + event.x + ' y: ' + event.y);
	
	var dragInfo = this._canvas.dragInfo;

	if(dragInfo.dragType === 'move') {
		this.setX(event.x - this._canvas.dragInfo.x);
		this.setY(event.y - this._canvas.dragInfo.y);
	} else if(dragInfo.dragType === 'resize') {
		var dx = event.x - this._x - this._canvas.dragInfo.x;
		var dy = event.y - this._y - this._canvas.dragInfo.y;
		
		if(dragInfo.resizeAnchor === 'left') {
			this._resizeLeft(dx);
		} else if(dragInfo.resizeAnchor === 'top') {
			this._resizeTop(dy);
		} else if(dragInfo.resizeAnchor === 'right') {
			this._resizeRight(event);
		} else if(dragInfo.resizeAnchor === 'bottom') {
			this._resizeBottom(event);
		} else if(dragInfo.resizeAnchor === 'top-left') {
			this._resizeTop(dy);
			this._resizeLeft(dx);
		} else if(dragInfo.resizeAnchor === 'top-right') {
			this._resizeTop(dy);
			this._resizeRight(event);
		} else if(dragInfo.resizeAnchor === 'bottom-left') {
			this._resizeBottom(event);
			this._resizeLeft(dx);
		} else if(dragInfo.resizeAnchor === 'bottom-right') {
			this._resizeBottom(event);
			this._resizeRight(event);
		}
	}
	this.setNeedsLayout();
}

CCUI.Window.prototype._resizeLeft = function (dx) {
	if(this.setPreferredWidthChecked(this.getPreferredWidth() - dx)) {
		this.setX(this._x + dx);
	}
}

CCUI.Window.prototype._resizeTop = function (dy) {
	if(this.setPreferredHeightChecked(this.getPreferredHeight() - dy)) {
		this.setY(this._y + dy);
	}
}

CCUI.Window.prototype._resizeRight = function (event) {
	this.setPreferredWidthChecked(this._canvas.dragInfo.width - this._canvas.dragInfo.x + event.x - this._x);
}

CCUI.Window.prototype._resizeBottom = function (event) {
	this.setPreferredHeightChecked(this._canvas.dragInfo.height - this._canvas.dragInfo.y + event.y - this._y);
}

/*
CCUI.Window.prototype.dragStarted = function () {
	CCUI.log('dragStarted');
}

CCUI.Window.prototype.dragEnded = function () {
	CCUI.log('dragEnded');
}
*/

CCUI.Window.prototype.setTitlePadding = function (/*{top: num, bottom: num, left: num, right: num}*/ titlePadding) {
	this._titlePadding = titlePadding;
	this.invalidate();
	return this;
}

CCUI.Window.prototype.setStrokeStyle = function (/*fill-style*/ strokeStyle) {
	this._strokeStyle = strokeStyle;
	this.makeAreaDirty();
	return this;
}

CCUI.Window.prototype.setFillStyle = function (/*fill-style*/ fillStyle) {
	this._fillStyle = fillStyle;
	this.makeAreaDirty();
	return this;
}

CCUI.Window.prototype.setActiveFillStyle = function (/*fill-style*/ activeFillStyle) {
	this._activeFillStyle = activeFillStyle;
	this.makeAreaDirty();
	return this;
}

CCUI.Window.prototype.setBorderWidth = function (/*num*/ borderWidth) {
	this._borderWidth = borderWidth;
	this.invalidate();
	return this;
}

CCUI.Window.prototype.setRoundRadius = function (/*num*/ roundRadius) {
	this._roundRadius = roundRadius;
	this.makeAreaDirty();
	return this;
}

CCUI.Window.prototype.setShadow = function (/*Shadow*/ shadow) {
	this._shadow = shadow;
	this.invalidate();
	return this;
}

CCUI.Window.prototype.setContent = function (/*Component*/ content) {
	if(this._content) {
		this._removeChild(content);
	}
	this._content = content;
	content.setZ(-1).setW(0);
	this._addChild(content);
	this.invalidate();
	return this;
}

//override
CCUI.Window.prototype.doesHit = function(x,y) {
	return CCUI.isInsideRoundedRect(x, y, 0, 0, this._width, this._height, this._roundRadius)
	&& (!CCUI.isInsideRect(x, y, this._content.getX(), this._content.getY(), this._content.getX() + this._content.getWidth(), this._content.getY() + this._content.getHeight()));
}

//override
CCUI.Window.prototype._calcPreferredWidth = function () {
	return this._content ? (this._content.getPreferredWidth() + 2 * this._borderWidth) :
		(this._titleLabel.getPreferredWidth() + this._titlePadding.left + this._titlePadding.right); 
}

//override
CCUI.Window.prototype._calcPreferredHeight = function (/*opt num*/ forWidth) {
	return this._getTitleHeight() + this._borderWidth +
		(this._content ? this._content.getPreferredHeight() : 20);
}

//override
CCUI.Window.prototype._calcMinWidth = function () {
	return 2 * this._borderWidth + (this._content ? this._content.getMinWidth() : 2);
}

//override
CCUI.Window.prototype._calcMinHeight = function () {
	return this._getTitleHeight() + this._borderWidth + (this._content ? this._content.getMinHeight() : 2);
}

//override
CCUI.Window.prototype._calcMaxWidth = function () {
	return (this._content && this._content.getMaxWidth() !== (-1)) ?
		this._content.getMaxWidth() + 2 * this._borderWidth : (-1);
}

//override
CCUI.Window.prototype._calcMaxHeight = function () {
	return (this._content && this._content.getMaxHeight() !== (-1)) ?
		this._getTitleHeight() + this._borderWidth + this._content.getMaxHeight() : (-1);
}

CCUI.Window.prototype._getTitleHeight = function () {
	return this._titleLabel.getPreferredHeight() + this._titlePadding.top + this._titlePadding.bottom;
}

CCUI.Window.prototype._isInTitleArea =  function (x, y) {
	return y < this._getTitleHeight();
}

//override
CCUI.Window.prototype.layout = function () {
	CCUI.Component.prototype.layout.call(this); // super.layout()
	this._titleLabel.setPosition(this._titlePadding.left, this._titlePadding.top,
		this._titleLabel.getPreferredWidth(), this._titleLabel.getPreferredHeight());
	if(this._content) {
		var titleHeight = this._getTitleHeight();
		this._content.setPosition(this._borderWidth, titleHeight, this._width - 2 * this._borderWidth,
			this._height - titleHeight - this._borderWidth);
	}
	return this;
}

//override
CCUI.Window.prototype.paint = function (renderCtx) {
	renderCtx.ctx2D.lineWidth = 1.02;
	renderCtx.drawFrame(0, 0, this._width, this._height, this._roundRadius, this._getTitleHeight(), this._borderWidth,
		this._strokeStyle, this._active ? this._activeFillStyle : this._fillStyle, this._shadow);
}

// TODO: some painting optimization: with the 'OPAQUE' hint a Component can signal to the system that it is fully opaque, so things behind it
// need not be painted...

/*
 * class Canvas
 *
 * CCUI's representation of a canvas. This is in fact a wrapper class around the html5-canvas class.
 *
 * Constructor:
 * The 'browserCanvas' parameter must be a html5-canvas element or the id of it.
 */
CCUI.Canvas = function(/*string or html5-canvas*/ browserCanvas) {
	/*html5-canvas*/ this._browserCanvas = (typeof browserCanvas === 'string') ? document.getElementById(browserCanvas) : browserCanvas;
	/*RenderContext*/ this._renderCtx = new CCUI.RenderContext(this._browserCanvas.getContext('2d'));
	/*Component*/ this._rootComponent = null; // The root component of this canvas. Takes the whole territory of the canvas.
	this._browserCanvas.ccuiCanvas = this;

	/*Component*/ this.mouseLockedTo = null; // When this is not null then the mouse behaves as if it is over this component.

	// Prevent default behaviour in case of some keys.
	function preventDefaultHandler(evt) {
		evt = evt || window.event;
		if ((evt.keyCode === 8 /*backspace*/) || (evt.keyCode === 9 /*tab*/)  || (evt.keyCode === 32 /*space*/) || (evt.keyCode === 13 /*enter*/) ||
				(evt.keyCode === 33 /*page up*/)  || (evt.keyCode === 34 /*page down*/) ||
				(evt.keyCode === 35 /*end*/)  || (evt.keyCode === 36 /*home*/) ||
				(evt.keyCode === 37 /*cursor left*/) || (evt.keyCode === 39 /*cursor right*/) || (evt.keyCode === 38 /*cursor up*/) || (evt.keyCode === 40 /*cursor down*/)) {
			return false;
		}
	}
	this._browserCanvas.onkeydown = preventDefaultHandler;	

	// Prevent the mouse cursor become an I-bar.
	this._browserCanvas.onselectstart = function () { return false; }

	this._browserCanvas.addEventListener('mousemove', CCUI._browserCanvasOnMousemove, false);
	this._browserCanvas.addEventListener('mouseover', CCUI._browserCanvasOnMousemove, false);
	this._browserCanvas.addEventListener('mouseout', CCUI._browserCanvasOnMousemove, false);

	this._browserCanvas.addEventListener('mousedown', CCUI._browserCanvasOnMousedown, false);
	this._browserCanvas.addEventListener('mouseup', CCUI._browserCanvasOnMouseup, false);
	this._browserCanvas.addEventListener('click', CCUI._browserCanvasOnclick, false);
	this._browserCanvas.addEventListener('dblclick', CCUI._browserCanvasOnDblclick, false);

	this._browserCanvas.addEventListener('keydown', CCUI._browserCanvasOnKeydown, true);
	this._browserCanvas.addEventListener('keyup', CCUI._browserCanvasOnKeyup, true);
	this._browserCanvas.addEventListener('keypress', CCUI._browserCanvasOnKeypress, true);

	this._lastMouseMoveStack = [];
	this._lastTakenMouseDown = null; // The component which have taken mousedown event last time.

	/*Component*/ this._focusedComponent = null; // The currently focused component. 'null' if no component is focused currently.

	this._mouseCursorStyle = 'default';
	this._browserCanvas.style.cursor = this._mouseCursorStyle;

	/*function(Component) or {style: function(Component)}*/ this._styleSheet = new CCUI.DefaultStyleSheet(); // The stylesheet of the whole canvas.

	this._renderCtx.ctx2D.save();
}

/*function(Component) or {style: function(Component)}*/ CCUI.Canvas.prototype.getStyleSheet = function() {
	return this._styleSheet;
}

CCUI.Canvas.prototype.setStyleSheet = function(/*function(Component) or {style: function(Component)}*/ styleSheet) {
	this._styleSheet = styleSheet;
	if(this._rootComponent) {
		this._rootComponent.parentStyleSheetChanged();
	}
}

/*RenderContext*/ CCUI.Canvas.prototype.getRenderCtx = function() {
	return this._renderCtx;
}

// This function implements a heuristic: it tells whether 'component' is too crowded with 'dirtyRects' dirty rectangles or not,
// so that if it is too crowded, the painting system will just replace 'dirtyRects' with their bounding rectangle.
// You can override this method.
// The default implementation will say that the situation is too crowded if there are more than 100 elements in 'dirtyRects'.
// The default implementation will say that the situation is NOT too crowded if there are less than 5 elements in 'dirtyRects'.
// Between 5 and 100 elements the result depends on the territory of the component's painting bounds.
/*bool*/ CCUI.Canvas.prototype.isTooCrowded = function(/*Component*/ component, /*array of Rectangle*/ dirtyRects) {
	var length = dirtyRects.length;
	if(length < 5) return false;
	if(length > 100) return true;
	return length > (component.getPaintingWidth() * component.getPaintingHeight() / 100 + 4);
}

// Starts the dragging of component 'comp'.
// 'x' and 'y' are the coordinates of the mouse when the drag was initiated (in comp's coordinate system).
// Typically this method is called by components in a mousedown listener: they pass themselves as 'comp'.
// A drag-info object is created, which (among others) contains the following members:
// 'comp', 'x', 'y'. Components can put any other members into this object.
// Returns the created drag-info object, which also can be accessed as the 'dragInfo' member of the canvas during
// dragging. (When there is no dragging in progress 'dragInfo' is falsy.) 
/*{comp: Component, x: num, y: num}*/ CCUI.Canvas.prototype.startDrag = function(/*Component*/ comp, /*num*/ x, /*num*/ y) {
	if(this.dragInfo) {
		this.endDrag();
	}
	this.dragInfo = {comp: comp, x: x, y: y, width: comp.getWidth(), height: comp.getHeight(), listener: function(event) {
		if(comp.dragTrack) {
			comp.dragTrack(event); // comp's dragTrack method is called with parent's mousemove event...
		}
	}};
	// this.dragInfo is truthy now; this means that a drag is happening now.	
	var p = comp.getParent();
	if(p) {
		p.addListener('mousemove', this.dragInfo.listener);
	}
	if(comp.dragStarted) {
		comp.dragStarted(comp, x, y);
	}
	return this.dragInfo;
}

// Ends the dragging. Called by Canvas when the mouse is released and a drag is in progress (dragInfo is truthy),
// so typically there is no need to call it from outside.
CCUI.Canvas.prototype.endDrag = function() {
	var p = this.dragInfo.comp.getParent();
	if(p) {
		p.removeListener('mousemove', this.dragInfo.listener);
	}
	if(this.dragInfo.comp.dragEnded) {
		this.dragInfo.comp.dragEnded();
	}
	this.dragInfo = null;
	return this;
}

// This function is called with 'this' set to the appropriate browser canvas.
CCUI._browserCanvasOnMousemove = function(domEvent) {
	domEvent = domEvent || window.event;
	this.ccuiCanvas.onMousemove(domEvent);
}

// This function is called with 'this' set to the appropriate browser canvas.
CCUI._browserCanvasOnMousedown = function(domEvent) {
	domEvent = domEvent || window.event;
	this.ccuiCanvas.onMousedown(domEvent);
}

CCUI._browserCanvasOnMouseup = function(domEvent) {
	domEvent = domEvent || window.event;
	this.ccuiCanvas.onMouseup(domEvent);
}

CCUI._browserCanvasOnClick = function(domEvent) {
	domEvent = domEvent || window.event;
	this.ccuiCanvas.onClick(domEvent);
}

CCUI._browserCanvasOnDblclick = function(domEvent) {
	domEvent = domEvent || window.event;
	this.ccuiCanvas.onDblclick(domEvent);
}

CCUI._browserCanvasOnKeyup = function(domEvent) {
	domEvent = domEvent || window.event;
	this.ccuiCanvas.onKeyup(domEvent);
}

CCUI._browserCanvasOnKeydown = function(domEvent) {
	domEvent = domEvent || window.event;
	this.ccuiCanvas.onKeydown(domEvent);
}

CCUI._browserCanvasOnKeypress = function(domEvent) {
	domEvent = domEvent || window.event;
	this.ccuiCanvas.onKeypress(domEvent);
}

CCUI.Canvas.prototype.onMousemove = function(domEvent) {
	var pos, hit, currentMouseMoveStack, sameCount, i, lastMouseMoveStackLength, currentMouseMoveStackLength, cHit;
	if(this._rootComponent) {
		pos = this._getCursorPosition(domEvent);
		hit = this._getHit(pos);
		currentMouseMoveStack = hit ? hit.getAncestorStack() : [];
		sameCount = CCUI.sameStartLength(currentMouseMoveStack, this._lastMouseMoveStack);
		for(i=0; i<sameCount; i++) {
			this._fireMouseEvent(this._lastMouseMoveStack[i], 'mousemove', pos);
		}
		lastMouseMoveStackLength = this._lastMouseMoveStack.length;
		for(i=sameCount; i<lastMouseMoveStackLength; i++) {
			this._fireMouseEvent(this._lastMouseMoveStack[i], 'mouseout', pos);
		}
		currentMouseMoveStackLength = currentMouseMoveStack.length;
		for(i=sameCount; i<currentMouseMoveStackLength; i++) {
			this._fireMouseEvent(currentMouseMoveStack[i], 'mouseover', pos);
		}
		this._lastMouseMoveStack = currentMouseMoveStack;
		
		cHit = this._getClickableHit(pos);
		if(cHit) {
			var relPos = cHit.translateRootCoords(pos.x, pos.y);
			this._setMouseCursorStyle(cHit.getMouseCursorStyle(relPos.x, relPos.y));
		} else {
			this._setMouseCursorStyle('default');
		}
	} else {
		this._lastMouseMoveStack = [];
	}
}

CCUI.Canvas.prototype._fireMouseEvent = function(comp, eventType, rootPos) {
	var relCoords = comp.translateRootCoords(rootPos.x, rootPos.y);
	comp.fire({type: eventType, x: relCoords.x, y: relCoords.y});
}

CCUI.Canvas.prototype.onMousedown = function(domEvent) {
	this.onMousemove(domEvent);
	var pos, comp;
	if(this._rootComponent) {
		pos = this._getCursorPosition(domEvent);
		comp = this._getClickableHit(pos);
		if(comp) {
			this.setFocusedComponent(comp);
			this._fireMouseEvent(comp, 'mousedown', pos);
			this._lastTakenMouseDown = comp;
		}
	}
}

CCUI.Canvas.prototype.onMouseup = function(domEvent) {
	this.onMousemove(domEvent);
	var pos, comp;
	if(this._rootComponent) {
		pos = this._getCursorPosition(domEvent);
		comp = this._getClickableHit(pos);
		if(this.dragInfo) {
			this.endDrag();
		}
		if(comp) {
			this._fireMouseEvent(comp, 'mouseup', pos);		
		}
	}
}

CCUI.Canvas.prototype.onClick = function(domEvent) {
	var pos, comp;
	if(this._rootComponent) {
		pos = this._getCursorPosition(domEvent);
		comp = this._getClickableHit(pos);
		if(comp) {
			if(this._lastTakenMouseDown === comp) {
				this._fireMouseEvent(comp, 'click', pos);
			}
		}
	}
}

CCUI.Canvas.prototype.onDblclick = function(domEvent) {
	var pos, comp;
	if(this._rootComponent) {
		pos = this._getCursorPosition(domEvent);
		comp = this._getClickableHit(pos);
		if(comp) {
			if(this._lastTakenMouseDown === comp) {
				this._fireMouseEvent(comp, 'dblclick', pos);
			}
		}
	}
}

CCUI.Canvas.prototype.onKeyup = function(domEvent) {
	if(this._focusedComponent) {
		this._focusedComponent.fire({type: 'keyup', keyCode: domEvent.keyCode,
			altKey: domEvent.altKey, ctrlKey: domEvent.ctrlKey, shiftKey: domEvent.shiftKey});		
	}
}

CCUI.Canvas.prototype.onKeydown = function(domEvent) {
	if(this._focusedComponent) {
		this._focusedComponent.fire({type: 'keydown', keyCode: domEvent.keyCode,
			altKey: domEvent.altKey, ctrlKey: domEvent.ctrlKey, shiftKey: domEvent.shiftKey});		
	}
}

CCUI.Canvas.prototype.onKeypress = function(domEvent) {
	if(this._focusedComponent && (domEvent.charCode !== 0) && (domEvent.charCode !== 32) && (domEvent.charCode !== 13)) {
		var charCode = domEvent.charCode, chr = String.fromCharCode(charCode);
		this._focusedComponent.fire({type: 'keypress', charCode: charCode, chr: chr,
			altKey: domEvent.altKey, ctrlKey: domEvent.ctrlKey, shiftKey: domEvent.shiftKey});
	}
}

CCUI.Canvas.prototype.setFocusedComponent = function(/*Component*/ focusedComponent) {

	var oldStack, oldStackLength, newStack, newStackLength, sameCount, i;

	if(this._focusedComponent !== focusedComponent) {

		if(this._focusedComponent) {
			this._focusedComponent.setFocused(false);
		}

		oldStack = this._focusedComponent ? this._focusedComponent.getAncestorStack() : [];
		newStack = focusedComponent ? focusedComponent.getAncestorStack() : [];		
		sameCount = CCUI.sameStartLength(oldStack, newStack);

		oldStackLength = oldStack.length;
		for(i=sameCount; i<oldStackLength; i++) {
			oldStack[i].setActive(false);
		}
		
		newStackLength = newStack.length;
		for(i=sameCount; i<newStackLength; i++) {
			newStack[i].setActive(true);
		}		
		
		this._focusedComponent = focusedComponent;
		
		focusedComponent.setFocused(true);
	}
	return this;
}

CCUI.Canvas.prototype._getClickableHit = function(pos) {
	var comp = this._getHit(pos);
	while(comp && (!comp.takesClicks)) {
		comp = comp.getParent();
	}
	return comp;
}

CCUI.Canvas.prototype._getHit = function(pos) {
	return this.mouseLockedTo ?
		this.mouseLockedTo :
		(this._rootComponent.isPointInside(pos.x, pos.y) ? this._rootComponent.castRay(pos.x, pos.y) : null);
}

// Currently only correct if canvas border is 0.
CCUI.Canvas.prototype._getCursorPosition = function(domEvent) {
	// TODO: determine border, and calculate with it...
	var x,y;
	if(domEvent.pageX !== undefined && domEvent.pageY !== undefined) {
		x = domEvent.pageX;
		y = domEvent.pageY;
	} else {
		x = domEvent.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
		y = domEvent.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }
	
	
	var style = window.getComputedStyle(this._browserCanvas, null),
	leftBorder = parseInt(style.getPropertyValue('border-left-width')),
	topBorder = parseInt(style.getPropertyValue('border-top-width'));
	
	if(!leftBorder) {
		leftBorder = 0;
	}
	if(!topBorder) {
		topBorder = 0;
	}	
	
	var totalOffsetX = 0, totalOffsetY = 0, currentElement = this._browserCanvas;
    do {
        totalOffsetX += currentElement.offsetLeft;
        totalOffsetY += currentElement.offsetTop;
    }
    while(currentElement = currentElement.offsetParent)	

	return {x: x - totalOffsetX - leftBorder, y: y - totalOffsetY - topBorder};
}

CCUI.Canvas.prototype.setRootComponent = function (/*Component*/ rootComponent) {
	this._rootComponent = rootComponent;
	rootComponent.setPosition(0, 0, this._browserCanvas.width, this._browserCanvas.height);
	//TODO: do we want to respect min or max sizes here?
	if(!rootComponent._canvas) {
		rootComponent.recSetCanvas(this);
	}
	this.setFocusedComponent(rootComponent);
	// TODO: what if canvas is resized? do we allow this? maybe we reset the gui???
	return this;
}

CCUI.Canvas.prototype._setMouseCursorStyle = function (mouseCursorStyle) {
	if(mouseCursorStyle !== this._mouseCursorStyle) {
		this._browserCanvas.style.cursor = mouseCursorStyle;
		this._mouseCursorStyle = mouseCursorStyle;
	}
}

// One cycle of the 'display loop'. Does styling, layout and painting.
// Must be called regularly to make the UI appear living.
CCUI.Canvas.prototype.display = function () {
	// nothing to do if the rootComponent is null.
	if(this._rootComponent) {
		this._rootComponent.styleComponent(this._styleSheet);
		this._rootComponent.layoutComponent();
		this._paint();
		this._renderCtx.clearCr();
	}
}

//TODO: make a list of all the heuristics in the system in a separate file called heuristics.txt (and maybe a section in the documentation).

CCUI.Canvas.prototype._paint = function () {
	var dirtyRects = this._rootComponent.determineCausedDirtyRectangles();
	this._rootComponent.paintComponent(this._renderCtx, dirtyRects);
}

} // end of 'if CCUI not defined'
