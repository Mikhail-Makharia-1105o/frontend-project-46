### Hexlet tests and linter status:
[![Actions Status](https://github.com/Mikhail-Makharia-1105o/frontend-project-46/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/Mikhail-Makharia-1105o/frontend-project-46/actions)

<a href="https://codeclimate.com/github/Mikhail-Makharia-1105o/frontend-project-46/maintainability"><img src="https://api.codeclimate.com/v1/badges/af84823b83cb3d3df30f/maintainability" /></a>

<a href="https://codeclimate.com/github/Mikhail-Makharia-1105o/frontend-project-46/test_coverage"><img src="https://api.codeclimate.com/v1/badges/af84823b83cb3d3df30f/test_coverage" /></a>

<a href="reports/mutation/mutation.html">stryker report</a>


<h1>Overview:</h1>

<code>gendiff < filename1 > < filename2 > --format[output type]</code>

outputs differences between two yaml(yml)/json files in a specified format.

<h1>Output Formats:</h1>

<h3>Stylish</h3>

Default output format.

![stylish diff](fixtures/image.png)

'+' for added elements.
'-' for deleted elements.

<h3>Plain</h3>

Plain format.

![plain diff](fixtures/image-1.png)

[complex value] for objects.

<h3>JSON</h3>

JSON object notation.

![JSON diff](fixtures/image-2.png)