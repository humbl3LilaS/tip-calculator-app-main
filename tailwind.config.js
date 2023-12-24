/** @type {import("tailwindcss").Config} */
module.exports = {
  content: ["./*html", "./js/*js"],
  theme  : {
	extend: {
	  colors: {
		primary : "hsl(172, 67%, 45%)",
		darkCyan: "hsl(183, 100%, 15%)",
		grayishCyan : {
		  normal : "hsl(186, 14%, 43%)",
		  light : "hsl(185, 41%, 84%)",
		  veryLight : "hsl(189, 41%, 97%)"
		},
	  },
	  fontFamily : {
		spaceMono : ["'Space Mono'", "monospace"]
	  }
	},
  },
  plugins: [],
};

