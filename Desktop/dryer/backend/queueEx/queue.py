from rq import Queue
from redis import Redis

redis_conn = Redis(host='localhost', port=6379, db=0)
queue = Queue('my_queue', connection=redis_conn)
