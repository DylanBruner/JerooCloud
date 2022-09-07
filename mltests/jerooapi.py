import random

LEFT  = -1
RIGHT = 1
AHEAD = 0
HERE  = -2
EAST  = 0
NORTH = 1
WEST  = 2
SOUTH = 3

class Jeroo(object):
    def __init__(self, x: int = 0, y: int = 0, facing: int = 0, flowers: int = 0):
        self._x       = 0
        self._y       = 0
        self._facing  = 0
        self._flowers = 0

    def _is_clear(self) -> bool: return random.randint(0, 1) == 0

    def hop(self, n: int = 1):
        """
        Hop n spaces ahead
        """
        while n > 0 and self._is_clear():
            self._x += 1
            n -= 1
    def pick(self):
        """
        Pick a flower from the current space
        """ 
        self._flowers += 1
    def plant(self):
        """
        Plant a flower one the current space
        """ 
        self._flowers -= 1
    def toss(self):
        """
        Toss a flower one space ahead
        """
    def give(self, direction: int = 0):
        """
        Give a flower to a Jeroo one space ahead
        """
        self._flowers -= 1
    
    def turn(self, direction: int = 1):
        """
        Turn left or right
        """
        self._facing += direction
    def hasFlower(self) -> bool:
        """
        Return True if Jeroo has a flower
        """
        return self._flowers > 0
    def isFacing(self, direction: int = 0) -> bool:
        """
        Return True if Jeroo is facing a direction
        """
        return self._facing == direction
    def isFlower(self,  direction: int = 0) -> bool:
        """
        Return True if Jeroo is facing a flower
        """
        return self._flowers > 0
    def isClear(self,  relative_direction: int = 0) -> bool:
        """
        Return True if Jeroo is facing a clear space
        """
        return self._is_clear()
    def isNet(self) -> bool:
        """
        Return True if Jeroo is facing a net
        """
        return False
    def isWater(self) -> bool:
        """
        Return True if Jeroo is facing water
        """
        return False
    def isClear(self) -> bool:
        """
        Return True if Jeroo is facing a clear space
        """
        return self._is_clear()
