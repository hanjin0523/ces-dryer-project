import threading
import time
import socket
import pickle
import struct
import random

import config


class CarbonIface(object):

    def __init__(self, host, port, event_url=None):
        self.host = host
        self.port = port
        self.event_url = event_url
        self.__data = []
        self.__data_lock = threading.Lock()

    def add_data(self, metric, value, ts=None):
        if not ts:
            ts = time.time()
        if self.__data_lock.acquire():
            self.__data.append((metric, (ts, value)))
            self.__data_lock.release()
            return True
        return False

    def add_data_dict(self, dd):
        if self.__data_lock.acquire():
            for k, v in dd.items():
                ts = v.get("ts", time.time())
                value = v.get("value")
                self.__data.append((k, (ts, value)))
            self.__data_lock.release()
            return True
        return False

    def add_data_list(self, dl):
        if self.__data_lock.acquire():
            self.__data.extend(dl)
            self.__data_lock.release()
            return True
        return False

    def send_data(self, data=None):
        save_in_error = False

        if not data:
            if self.__data_lock.acquire():
                data = self.__data
                self.__data = []
                save_in_error = True
                self.__data_lock.release()
            else:
                return False

        s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

        payload = pickle.dumps(data)
        header = struct.pack("!L", len(payload))
        message = header + payload

        s.connect((self.host, self.port))

        try:
            s.send(message)
        except:
            print("Error when sending data to carbon")
            if save_in_error:
                self.__data.extend(data)
            return False
        else:
            print('DB저장성공 Sent data to {host}:{port}: {0} metrics, {1} bytes'.format(len(data), len(message), host = self.host, port=self.port))
            return True
        finally:
            s.close()

class Transmission:
    def __init__(self, temperature, humidity):
        self.temperature = temperature
        self.humidity = humidity

    def sendData(self, temp, hum):
        fields = ['temperature', 'humidity']
        carbon = CarbonIface(config.BACKEND_CONFIG['ip'], 2004)
        datas= [temp, hum]
        ts = time.time()
        for i in range(len(fields)):
            carbon.add_data(config.BACKEND_CONFIG['metric'] + fields[i], datas[i], ts)
        carbon.send_data()

class TransmissionOperating:
    def __init__(self, thermic_rays, blowing, dehumidify):
        self.thermic_rays = thermic_rays
        self.blowing = blowing
        self.dehumidify = dehumidify

    def sendData(self, thermic_rays, blowing, dehumidify):
        print(thermic_rays, blowing, dehumidify)
        fields = ['thermic_rays', 'blowing','dehumidify']
        carbon = CarbonIface(config.BACKEND_CONFIG['ip'], 2004)
        datas= [thermic_rays, blowing, dehumidify]
        ts = time.time()
        for i in range(len(fields)):
            carbon.add_data(config.BACKEND_CONFIG['metric'] + fields[i], datas[i], ts)
        carbon.send_data()