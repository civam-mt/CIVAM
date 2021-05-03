import time
from datetime import datetime, timedelta

#	A critical counter to manage API Calls, if it determines that the limit
#		has been reached it will inform at calltime and indicate so.  
#		
class Critical_Count():

	# All times are in seconds.  
	# 	time.time() returns a float of time in secodns
	def __init__(self, name, limit_per_60_sec):
		self._created_time = time.time()
		self._counter = 0
		self._identifer = name
		self._limit = limit_per_60_sec
		self._hit_limit = False 
	
	def __str__(self):
		time_delta = time.time() - self._created_time
		current_avg = self._counter/(time_delta)
		return "{}\t Current Count: {}\n{}\t Current Averg: {}".format(datetime.now().strftime('[%d/%b/%Y %H:%M:%S]'), self._counter, datetime.now().strftime('[%d/%b/%Y %H:%M:%S]'), current_avg)

	def increment(self):
		self._counter = self._counter + 1
		time_delta = time.time() - self._created_time
		current_avg = self._counter/(time_delta)
		self._hit_limit = current_avg >= self._limit

	def reset(self):
		self._created_time = time.time()
		self._counter = 0
		self._hit_limit = False 

	def hit_limit(self):
		return self._hit_limit