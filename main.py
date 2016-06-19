#!/usr/bin/python3

from soco import SoCo

sono = SoCo('192.168.12.34')

quiet_url = 'https://d1490khl9dq1ow.cloudfront.net/sfx/mp3preview/male-shouting-asking-for-silence_MyK2tB4_.mp3'

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
