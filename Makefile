unicode-data:
	wget http://unicode.org/Public/cldr/26.0.1/json.zip
	touch json.zip
	unzip json.zip -d unicode-data
	node process.js
