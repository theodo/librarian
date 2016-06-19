#!/usr/bin/python3

from soco import SoCo

sono = SoCo('192.168.12.34')

quiet_url = 'https://d1490khl9dq1ow.cloudfront.net/sfx/mp3preview/male-shouting-asking-for-silence_MyK2tB4_.mp3'

if sono:
    sono.play_uri(quiet_url)
