import threading
import time
import queue

from socketSet import socketModule
from database import graphiteDB
import dto

s = socketModule.SocketControl().get_instance()
graphite = graphiteDB.TransmissionOperating(thermic_rays=0, blowing=0, dehumidify=0)
oper_value = dto.Operating(thermic_rays=0, blowing=0, dehumidify=0)
q = queue.Queue()

class Monitor:

    def __init__(self, setTemperature , setHumidity , setDuration):
        self.setTemperature = setTemperature
        self.setHumidity = setHumidity
        self.setDuration = setDuration
        self.sensor_thread = threading.Thread(target=self.monitor_condition, args=(setTemperature, setHumidity, setDuration), daemon=True)
        self.sensor_thread.start()
        self.is_running = False

    def monitor_condition(self, setTemperature, setHumidity, setDuration):

        start_time = time.time()
        end_time = start_time + setDuration

        while time.time() < end_time:

            senser_data = s.start_server(['senser1'])
            insideTemperature, insideHumidity = senser_data[0]

            print(setTemperature,"setTemp")
            if setTemperature > insideTemperature:
                h_commands = ['h1_on', 'h2_on', 'h3_on']
                fan1_command = 'fan1_on'
                oper_value.set_thermic_rays(1)
                oper_value.set_blowing(1)
                print("# 열선가동, 송풍가동")
            else:
                h_commands = ['h1_off', 'h2_off', 'h3_off']
                fan1_command = 'fan1_on'
                oper_value.set_thermic_rays(0)
                oper_value.set_blowing(1)
                print("# 열선정지, 송풍가동")

            if setHumidity < insideHumidity: ## 출력제어(0~100%)값으로 출력제어가능함
                fan2_command = 'fan2_on'
                oper_value.set_dehumidify(1)
                print("# 배습가동")
            else:
                fan2_command = 'fan2_off'
                oper_value.set_dehumidify(0)
                print("# 배습종료")#####

            s.start_server(h_commands + [fan1_command, fan2_command])
            thermic_rays = oper_value.get_thermic_rays()
            blowing = oper_value.get_blowing()
            dehumidify = oper_value.get_dehumidify()
            graphite.sendData(thermic_rays, blowing, dehumidify)
            if self.is_running:
                s.start_server(['h1_off', 'h2_off', 'h3_off', 'fan1_off', 'fan2_off'])
                print("# 모든 기기 정지")
            time.sleep(10)
        s.start_server(['h1_off', 'h2_off', 'h3_off', 'fan1_off', 'fan2_off'])
        print("# 모든 기기 정지")
        return True

    
    def stop(self):
        self.is_running = True

monitor = None


def start_monitoring(data):
    global monitor
    print(data,"ddd")
    for item in data:
    # while data:
    #     item = data.pop(0)
        # if monitor is None or monitor.monitor_condition(float(item[0]), float(item[1]), item[2]):
        monitor = Monitor(float(item[0]), float(item[1]), item[2])
        # else:
        print("---작업실패---")
        continue

def stop_monitoring():
    global monitor
    print("멈춰!!!")
    if monitor is not None:
        monitor.stop()
        monitor = None
