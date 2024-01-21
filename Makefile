install:
	npm ci

lint:
	npx eslint

test:
	npx jest

build:
	npx webpack

build_prod:
	npx webpack --mode production

dev:
	npx webpack serve --no-stats