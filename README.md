# info-pi
Info pi is a info display we ([@trondkla](http://github.com/trondkla), [@elisasol](http://github.com/elisasol)) have in our hallway, that displays bus, weather and calender info.

![Screenshot](/images/screenshot-december2015.png?raw=true "Screenshot!")

##Hardware
- Raspberry pi 1B
- Wifi usb dongle
- 3.5" touch screen [3.5 inch B/B+LCD Touch Screen Display Module 320 x 480 for Raspberry Pi V3.0 E2](http://cgi.ebay.com/ws/eBayISAPI.dll?ViewItemVersion&item=221869966195&view=all&tid=1626999772012)
- Two way mirror

##Technology
- [omniscient (immutable react framework)](https://github.com/omniscientjs/omniscient)
- Webpack
- [lots of shell scripts](http://github.com/trondkla/info-pi-client)

## APIs
- Bus api is AtB (Bus in Trondheim, Norway)
- Weather is from yr.no (Norwegian Meteorological Institute ++)
- Calendar will be through Google Calendar
