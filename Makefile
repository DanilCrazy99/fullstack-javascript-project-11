install:
	npm ci

lint:
	npx eslint

test:
	npx jest

build:
	npx webpack

dev:
	npx webpack serve