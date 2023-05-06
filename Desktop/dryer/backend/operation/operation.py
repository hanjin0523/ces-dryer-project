
import threading
import time
from socketSet import socketModule

class Monitor:
    def __init__(self, setTemperature, setHumidity, setDuration):
        self.setTemperature = setTemperature
        self.setHumidity = setHumidity
        self.setDuration = setDuration
        self.socket_control = socketModule.SocketControl()

    def monitor_condition(self):
        start_time = time.time()
        end_time = start_time + self.setDuration

        while time.time() < end_time:
            test = socketModule.SocketControl().start_server(['senser1','senser2'])
            insideTemperature = test[0][0]
            insideHumidty = test[0][1]
            print(insideTemperature,"insideTemperature")
            print(insideHumidty,"insideHumidty")

            if self.setTemperature > insideTemperature:
                socketModule.SocketControl().start_server(['h1_on','h2_on','h3_on','fan1_on'])
                print("# 열선가동, 송풍가동")
            else:
                socketModule.SocketControl().start_server(['h1_off','h2_off','h3_off','fan1_on'])
                print("# 열선정지, 송풍가동")

            if self.setHumidity > insideHumidty:
                socketModule.SocketControl().start_server(['fan2_on',])
                print("# 배습가동")
            else:
                socketModule.SocketControl().start_server(['fan2_off',])
                print("# 배습종료")

            time.sleep(10)
        socketModule.SocketControl().start_server(['h1_off','h2_off','h3_off','fan1_off','fan2_off'])
        print("# 모든 기기 정지")

def start_monitoring(setTemperature, setHumidity, setDuration):
    monitor = Monitor(setTemperature, setHumidity, setDuration)
    t = threading.Thread(target=monitor.monitor_condition)
    t.start()
