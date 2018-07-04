![Logo](admin/homee.png)
# ioBroker homee Adapter
=================

## Description
This adapter connects ioBroker to homee and provides the following features:
* allows connection via IP or homee-ID and username/password
* read all devices(nodes) and states (attributes) and show their values including updates in ioBroker
* allow changing values in ioBroker and send them back to homee to control devices
* acts as a ioBroker History provider for all states devices where history is enabled in homee. This means you can use the history values stored in homee to display in ioBroker using flot, Admin or also JavaScript including all aggregations on data level as known from e.g. History adapter

## Known issues
* Also when history is disabled in homee the ioBroker Admin shows as it is active  in Objects screen.
* maybe not all error cases are catched

## TODO
* Homeegramme support?
* More detailed documentation?

## Changelog

### 0.1.0 (2018.07.04)
* (Apollon77) initial version

## License
The MIT License (MIT)

Copyright (c) 2018 Apollon77 <ingo@fischer-ka.de>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
