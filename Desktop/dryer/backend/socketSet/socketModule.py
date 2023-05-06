import socket
import threading
import queue

class SocketControl:

    def __init__(self, host='192.168.0.62', port=8111):
        self.host = host
        self.port = port
        self.socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        self.socket.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
        self.socket.bind((self.host, self.port))
        print(f'Server started on {self.host}:{self.port}')
        self.socket.listen(2)
        print("Listening for incoming connections...")
        

    @staticmethod
    def handle_request(conn, data):
        received_data = []
        for i in data:
            conn.sendall(i.encode())
            data = conn.recv(1024)
            received_data.append(data)
        return received_data
    
    @staticmethod
    def handle_connection(conn, addr, data, data_queue):
        print(f'Connected by {addr}')
        result = []
        try:
            if any("on" in s or "off" in s for s in data):
                result = SocketControl.handle_request(conn, data)
            else:
                received_data = SocketControl.handle_request(conn, data)
                for data in received_data:
                    result.append([float(data.decode().split(',')[6][3:6]), float(data.decode().split(',')[5][3:6])])
                print(result, "데이타")
        except Exception as e:
            print(f"Socket error occurred: {e}")
            result = []
        finally:
            conn.close()
            data_queue.put(result)
            print(f'Connection closed by {addr}')

    def start_server(self, data):
        print("server작동")
        conn, addr = self.socket.accept()
        data_queue = queue.Queue()
        client_thread = threading.Thread(target=self.handle_connection, args=(conn, addr, data, data_queue))
        client_thread.start()
        client_thread.join()  # 클라이언트 스레드가 종료될 때까지 기다림
        result = data_queue.get()  # 처리 결과를 꺼내서 리턴
        return result

    def __del__(self):
        self.socket.close()
