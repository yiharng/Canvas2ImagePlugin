//
//  Canvas2ImagePlugin.js
//  Canvas2ImagePlugin PhoneGap/Cordova plugin
//
//  Created by Tommy-Carlos Williams on 29/03/12.
//  Copyright (c) 2012 Tommy-Carlos Williams. All rights reserved.
//  MIT Licensed
//

module.exports = {
	saveImageDataToLibrary: function(
		successCallback,
		failureCallback,
		canvasId,
		format,
		directory,
		filename
	) {
		format = typeof format !== "undefined" ? format : "png"; // default value
		directory = typeof directory !== "undefined" ? directory : ""; // default value
		filename = typeof filename !== "undefined" ? filename : ""; // default value

		// successCallback required
		if (typeof successCallback != "function") {
			console.log(
				"Canvas2ImagePlugin Error: successCallback is not a function"
			);
		} else if (typeof failureCallback != "function") {
			console.log(
				"Canvas2ImagePlugin Error: failureCallback is not a function"
			);
		} else {
			var imageData;

			if (canvasId.indexOf("data:image/")>=0)
			{
				format=canvasId.match("^data:image/(.*);base")[1];
				imageData = canvasId
					.replace("data:image/" + format + ";base64,", "");
				if (format=="jpeg") format="jpg";
			}
			else
			{
				var canvas =
					typeof canvasId === "string"
						? document.getElementById(canvasId)
						: canvasId;
				imageData = canvas
					.toDataURL("image/" + format, 1)
					.replace("data:image/" + format + ";base64,", "");
			}
			return cordova.exec(
				successCallback,
				failureCallback,
				"Canvas2ImagePlugin",
				"saveImageDataToLibrary",
				[imageData, format, directory,filename]
			);
		}
	}
};
