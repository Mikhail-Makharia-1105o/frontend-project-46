setup:
	npm ci
lint:
	npx eslint .
test-coverage:
	npx test -- --coverage --coverageProvider=v8