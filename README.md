# ccui.js

CCUI is an experimental project I have implemented in the christmas season in 2011.
HTML5 and canvas was relatively new at the time, and I wanted to create a javascript ui library which does not use the DOM at all: all the ui library is implemented in Javascript using components that paint themselves to the canvas.
I have the test html files on my hard drive which include `ccui.js` and a sample javascript code. I was astonished that after almost 10 years it runs in Google chrome: browser APIs seem to be pretty backward compatible!

The whole library is implemented in one single javascript file: `ccui.js`.

Nowadays I would use ES6 modules and would use the class syntax of ES6. In this code I put all the source code into one file and used the class convention of old javascript (using prototypes).

I am a programmer who like strong typing in most cases, so nowadays I would probably use typescript too. At that time I used comments to 'type annotate' method arguments. This is not checked by the compiler, but at least documents the methods. It had the advantage that I can use a quite sophisitcated type system :) (I could write anything into the type annotation comments, for example things like (object or string).)

## How to run

The most interesting sample is `sample.html` which includes `sample.js` (and of course `ccui.js`). Just open `sample.html` in google chrome for example, an the code is running.

## Documentation

The API is relatively well documented in the source code itself. Search for comments like: class ... (for example class GridPanel, class StaticDoc, etc...) For learning about the project I suggest to start from (index.html, sample.js) and do small modifications, and see the used classes and methods in ccui.js, most of them, especially the complex ones are documented there in detail. 

I am just giving a very quick overview here.

## Components

The components you can add to the ui are the following:

### RectComponent

This is one of the simplest components, which is excellent for learning or testing purposes.
This component simply represents a filled rectangle, which is filled with a specified fillStyle.

### GridPanel

`GridPanel` is a container component which lays out its children in a dynamic grid.
It is a quite featureful, relatively complex component. Supports alignment, rowspan, colspan, options for cell content sizing, etc... Check out its documentation inside `ccui.js` for more details.

### StaticDoc

A non-editable rich text component. (Can be also used as a label.)
You specify its content either as a (semantically) marked up text (XML) or plain text. I will write about how this XML is styled in the stying chapter: this is probably the most interesting part of the project.

### TextEditor

Single or multiline (plain-text) text editor. Not very complex API-wise, but probably the most complex component inside: I had to implement all the text positioning logic of a text editor by hand...

### Window

Represents a window component.

## Styling

ccui have the concept of stylesheet. This is an application-wide concept, which I should have called theme: you just set the stylesheet of the canvas, and the stylesheet will style all the components. This is pretty simple stuff.

A little more interesting, is the concept of the *Doc style injector*. It is a bit mind-bending concept, but extremely powerful: you can set the doc style injector of a stylesheet. The doc style injector of a stylesheet is used on all the semantic xml elemnts of a StaticDoc: the injector inject `onStart` and `onEnd` methods into components, which are run at the start and end of rendering of these elements. These `onStart` and `onEnd` methods can do anything with the rendering context: this simple mechanism can be used to achive very complex styling. (In fact what I described is just *simple doc style injector*. The most generic form is capable to inject not just `onStart` and `onEnd` methods, but other stuff as well...)
