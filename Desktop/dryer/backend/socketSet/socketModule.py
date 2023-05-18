import socket
import threading
import queue
import time



class SocketControl:
    __instance = None

    @staticmethod
    def get_instance():
        if SocketControl.__instance is None:
            SocketControl.__instance = SocketControl()
        return SocketControl.__instance

    def __init__(self):
        self.socket = None
        self.stopped = False
        self.socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        self.socket.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
        self.socket.bind(('',8111))
        print(f'Server started on : {8111}')
        self.socket.listen(2)
        print("접속대기..")

    def close_socket(self):
        if self.socket is not None:
            self.socket.close()
            print("Socket closed.")

    def stop(self):
        self.stopped = True
    
    def handle_request(self, conn, data):
        received_data = []
        try:
            for i in data:
                conn.send(i.encode())
                data = conn.recv(1024)
                received_data.append(data)
                if self.stopped:  # 중지 요청이 있을 경우
                    break
            return received_data
        except Exception as e:
            print(e)
            return None
    
    def handle_connection(self, conn, addr, data, data_queue):
        print(f'Connected by {addr}')
        result = []
        try:
            if any("on" in s or "off" in s for s in data):
                self.handle_request(conn, data)
            else: 
                received_data = self.handle_request(conn, data)
                for data in received_data:
                    result.append([float(data.decode().split(',')[6][3:6]), float(data.decode().split(',')[5][3:6])])
        except Exception as e:
            print(f"Socket error occurred: {e}")
        finally:
            data_queue.put(result)
            print(f'Connection closed by {addr}')
            conn.close()

    def start_server(self, data):
            try:
                conn, addr = self.socket.accept()
                data_queue = queue.Queue()
                t = threading.Thread(target=self.handle_connection, args=(conn, addr, data, data_queue))
                t.start()
                result = data_queue.get()  # 처리 결과를 꺼내서 리턴
            except Exception as e:
                print(f"Error occurred while processing request: {e}")
                result = []
            return result

        
    def __del__(self):
        if hasattr(self, "socket") and self.socket is not None:
            self.close_socket()


