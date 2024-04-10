setup:
	npm ci
lint:
	npm eslint .
test-coverage:
	npm test -- --coverage --coverageProvider=v8