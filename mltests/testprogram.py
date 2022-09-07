from jerooapi import *

jeroo = Jeroo(19, 0)
while not jeroo.isFlower(HERE):
    if jeroo.isClear(RIGHT):
        jeroo.turn(RIGHT)
        jeroo.hop()
    elif jeroo.isClear(AHEAD):
        jeroo.hop()
    elif jeroo.isClear(LEFT):
        jeroo.turn(LEFT)
        jeroo.hop()
    elif jeroo.isFlower(AHEAD):
        jeroo.hop()
    else:
        jeroo.turn(LEFT)
        jeroo.turn(LEFT)
