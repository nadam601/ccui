function sample1_main() {
	try {
		var canvas = new CCUI.Canvas('samplecanvas');
		var root = new CCUI.RectComponent('#ffffff').setId('root');
		root.addFreeChild(new CCUI.RectComponent('#ff0000', 70, 70).setId('r'), 10, 10, 1);
		root.addFreeChild(new CCUI.RectComponent('rgba(0, 255, 0, 0.6)', 70, 70).setId('g'), 45, 30, 2);

		var title = new CCUI.StaticDoc('Title');
		var window = new CCUI.Window(title);
		var sd1 = new CCUI.StaticDoc('This is the first line.<br/><bigger diff=\"5\">This</bigger> is the <em>second</em>.<br/>Here <bigger>comes</bigger> the <strong>third</strong>.').setId('sd1');
		window.setContent(sd1);
		root.addFreeChild(window, 240, 240, 1, 1);		

		var sd2 = new CCUI.StaticDoc('Cancellation').setId('sd2');
		var button = new CCUI.Button(sd2).setId('bt');		
		root.addFreeChild(button, 210, 210, 1, 1);

		var eWTitle = new CCUI.StaticDoc('Editor Window Title');
		var eWindow = new CCUI.Window(eWTitle).setId('eWindow');
		var editor = new CCUI.TextEditor(20, 5, true).setId('editor');
		editor._innerTextEditor.setId('ite');
		editor.setText('This is a text inside this editor. This block is wrapped into multiple lines.');
		eWindow.setContent(editor);
		root.addFreeChild(eWindow, 10, 140, 1, 1);

		//root.addFreeChild(new CCUI.ScrollBar(false), 110, 160, 2, 2);		

		var gpWindow = new CCUI.Window(new CCUI.StaticDoc('Grid Panel Window Title')).setId('gpWindow');
		var gPanel = new CCUI.GridPanel(1, 1);
		gPanel.setCell(0, 0, new CCUI.RectComponent('#ff00ff', 200, 140).setId('myrect'));
		gPanel.force('backgroundStyle', '#E0E040');
		gpWindow.setContent(gPanel);
		root.addFreeChild(gpWindow, 100, 240, 1, 1);

		canvas.setRootComponent(root);

		var f = function() {
			canvas.display();
			setTimeout(f, 20);
		}
		setTimeout(f, 20);
		
		CCUI.log("Sample started.");
	} catch(e) {
		CCUI.log(e.stack);
	}
}
