import time
from datetime import datetime, timedelta

#	A critical counter to manage API Calls, if it determines that the limit
#		has been reached it will inform at calltime and indicate so.  
#		
class critical_count():

	# All times are in seconds.  
	# 	time.time() returns a float of time in secodns
	__init__(self, name, limit_per_60_sec):
	 	self._created_time = time.time()
		self._counter = 0
		self._identifer = name
		self._limit = limit_per_60_sec
		self._hit_limit = False 
	
	def increment(self):
		self._counter = self._counter + 1
		time_delta = time.time() - self._created_time
		current_avg = self.counter/(time_delta)
		self._hit_limit = current_avg >= self._limit