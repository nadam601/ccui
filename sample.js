function sample_main() {
	try {
		var canvas = new CCUI.Canvas('samplecanvas');
		
		// Adding a stylesheet is not needed in a simple case: the default stylesheet is added to the canvas by default.
		// Here we create a stylesheet, just because we want to demonstrate the styling of StaticDoc components using a docStyleInjector.
		// We could create a completely custom stlyesheet (similar to DefaultStylesheet, see its implementation), but we just create a DegfaultStylesheet and modify it only slightly.
		var stylesheet = new CCUI.DefaultStyleSheet();
		// this is an very generic way of styling: we inject onStart and onEnd methods that are injected into the xml element, and so are called during rendering. this is Turing complete styling.
		stylesheet.docStyleInjector.addOnElement('semantic', {
			onStart: function(renderCtx) {
				this._savedFontWeight = renderCtx.getFontWeight(); 
				renderCtx.setFontWeight(700);
			},
			onEnd: function(renderCtx) {
				renderCtx.setFontWeight(this._savedFontWeight);
			}	
		});
		canvas.setStyleSheet(stylesheet);
		
		
		var root = new CCUI.RectComponent('#ffffff');

		var gpWindow = new CCUI.Window(new CCUI.StaticDoc('Grid Panel Window Title')).setId('gpw');
		
		// 2 columns and 4 rows
		var gPanel = new CCUI.GridPanel(2, 4).setId('gp');
		
		gPanel.setColumnSpecs([new CCUI.CRSpec(2, 1), new CCUI.CRSpec(1, 1)]);
		gPanel.setRowSpecs([new CCUI.CRSpec(2, 1), new CCUI.CRSpec(2, 1), new CCUI.CRSpec(1, 1), new CCUI.CRSpec(2, 1)]);
		
		gPanel.setCell(0, 0, new CCUI.StaticDoc('First name:').lock(), "r");
		
		gPanel.setCell(1, 0, new CCUI.TextEditor(10), "l");
		//gPanel.setCell(1, 0, new CCUI.TextEditor(10), "L");
		
		// comment out the first name label, and all previous text editors, and do this:
		//gPanel.setCell(1, 0, new CCUI.TextEditor(10), "1L");
		
		gPanel.setCell(0, 1, new CCUI.StaticDoc('Last name:').lock(), "r");
		gPanel.setCell(1, 1, new CCUI.TextEditor(10), "");
		gPanel.setCell(0, 2, new CCUI.StaticDoc('Description:').lock(), "r");
		gPanel.setCell(1, 2, new CCUI.TextEditor(20, 6), "L T");

		gPanel.setCell(0, 3, new CCUI.Button('Ok'), "r");
		gPanel.setCell(1, 3, new CCUI.Button('Cancel'), "");		

		gpWindow.setContent(gPanel);
		root.addFreeChild(gpWindow, 100, 140, 1, 1);

		var window = new CCUI.Window(new CCUI.StaticDoc('Title'));
		
		
		
		
		
		var panel = new CCUI.GridPanel(1, 1);
		var staticDoc = new CCUI.StaticDoc('This is the first line.<br/><bigger diff=\"5\">This</bigger> is the <em>second</em>.<br/>Here <bigger>comes</bigger> the <strong>third</strong><br/><semantic>semantic</semantic>.');

		panel.setCell(0, 0, staticDoc);
		window.setContent(panel);
		root.addFreeChild(window, 460, 240, 1, 1);		

		canvas.setRootComponent(root);

		var f = function() {
			canvas.display();
			setTimeout(f, 20);
		}
		setTimeout(f, 20);		
	} catch(e) {
		CCUI.log(e.stack);
	}
}