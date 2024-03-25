install:
	npm i

build:
	npx webpack

serve:
	npx webpack serve --mode development
	
proxy:
	npm run proxy &

buildproxy: 
	make -j 2 build proxy

serveproxy:
	make -j 2 serve proxy