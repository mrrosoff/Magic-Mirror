# Garage-Pi

### A Custom Website For A Garage Door Opener

## About Project

After viewing the button on my family's garage wall for enough years, I decided to finally do something about it. I 
imagined a world where there was a central database for important information about family endeavors, where one could go
for quick information at a glance, but also for more detailed info.

Thus, the Garage-Pi was born.

A Raspberry Pi runs a custom express webserver out of our garage. Linked to our custom domain, one can access all garage
controls from their mobile device, anytime, anywhere. A hashed login page provides a measure of security when 
communicating with the API. 

With widget support, users can control what elements oof the site they wish to view, from weather and tide support to 
local surf stats to family member locations.

## Installation

Clone the repository and run the following command to build and boot the server.

```bash
npm run prod
```

To link to a custom domain of your own, you will need to establish port forwarding to the device hosting the server on 
the ports specified in the Express config. You will also need to forward your domain to your IP address.
