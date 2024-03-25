install:
	npm i

build:
	npx webpack

serve:
	npx webpack serve --mode development
	
proxy:
	npm run proxy
