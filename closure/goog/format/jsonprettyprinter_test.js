// Copyright 2010 The Closure Library Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

goog.module('goog.format.JsonPrettyPrinterTest');
goog.setTestOnly();

const JsonPrettyPrinter = goog.require('goog.format.JsonPrettyPrinter');
const testSuite = goog.require('goog.testing.testSuite');

let formatter;

testSuite({
  setUp() {
    formatter = new JsonPrettyPrinter();
  },

  testUndefined() {
    assertEquals('', formatter.format());
  },

  testNull() {
    assertEquals('', formatter.format(null));
  },

  testBoolean() {
    assertEquals('true', formatter.format(true));
  },

  testNumber() {
    assertEquals('1', formatter.format(1));
  },

  testEmptyString() {
    assertEquals('', formatter.format(''));
  },

  testWhitespaceString() {
    assertEquals('', formatter.format('   '));
  },

  testString() {
    assertEquals('{}', formatter.format('{}'));
  },

  testEmptyArray() {
    assertEquals('[]', formatter.format([]));
  },

  testArrayOneElement() {
    assertEquals('[\n  1\n]', formatter.format([1]));
  },

  testArrayMultipleElements() {
    assertEquals('[\n  1,\n  2,\n  3\n]', formatter.format([1, 2, 3]));
  },

  testFunction() {
    assertEquals('{\n  "a": "1",\n  "b": ""\n}', formatter.format({
      'a': '1',
      'b': function() {
        return null;
      }
    }));
  },

  testObject() {
    assertEquals('{}', formatter.format({}));
  },

  testObjectMultipleProperties() {
    assertEquals(
        '{\n  "a": null,\n  "b": true,\n  "c": 1,\n  "d": "d",\n  "e":' +
            ' [\n    1,\n    2,\n    3\n  ],\n  "f": {\n    "g": 1,\n    "h": "h"\n' +
            '  }\n}',
        formatter.format({
          'a': null,
          'b': true,
          'c': 1,
          'd': 'd',
          'e': [1, 2, 3],
          'f': {'g': 1, 'h': 'h'},
        }));
  },

  testSafeHtmlDelimiters() {
    const htmlFormatter =
        new JsonPrettyPrinter(new JsonPrettyPrinter.SafeHtmlDelimiters());
    assertEquals(
        '{\n  <span class="goog-jsonprettyprinter-propertyname">&quot;' +
            'a&lt;b&quot;</span>: <span class="goog-jsonprettyprinter-propertyvalue' +
            '-string">&quot;&gt;&quot;</span>\n}',
        htmlFormatter.formatSafeHtml({'a<b': '>'}).getTypedStringValue());
  },
});
