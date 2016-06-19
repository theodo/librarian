#!/usr/bin/python3

from soco import SoCo
from random import randint
print(randint(0,3))

sono = SoCo('192.168.12.34')

quiet_urls = [
'http://picosong.com/ZvGL/',
'http://picosong.com/ZvGu/',
'http://picosong.com/ZvGb/',
'http://picosong.com/ZvGN/'
]
quiet_url = quiet_urls[randint(0,3)]

import subprocess, time, os, sys
cmd = ["tessel", "run", "tessel/ambient.js"]

p = subprocess.Popen(cmd,
                     stdout=subprocess.PIPE,
                     stderr=subprocess.STDOUT)
lineCount = 0;
for line in iter(p.stdout.readline, b''):
    lineCount = lineCount + 1;
    if lineCount == 3:
        print('Ready to listen')
    if sono and lineCount > 4:
        print(line)
        sono.play_uri(quiet_url)
