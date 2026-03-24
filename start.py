import http.server
import socketserver
import webbrowser
import socket
import threading
import sys
import time
import subprocess
import os

# Fix stdout encoding for Windows
sys.stdout.reconfigure(encoding='utf-8')

FRONTEND_PORT = 8000
BACKEND_PORT = 8001

def is_port_in_use(port):
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        return s.connect_ex(('localhost', port)) == 0

def start_browser():
    # Wait for the servers to start
    time.sleep(3)
    print(f"\n[🚀] Opening website at http://localhost:{FRONTEND_PORT}")
    webbrowser.open(f"http://localhost:{FRONTEND_PORT}")

class CustomHandler(http.server.SimpleHTTPRequestHandler):
    def log_message(self, format, *args):
        # Silence annoying server logs
        return

if __name__ == "__main__":
    print("-" * 50)
    print("      UDBHAV MEHTA - LEGAL INFRASTRUCTURE & ADVISORY")
    print("            MAXIMIZED EVOLUTION STACK v1.1")
    print("-" * 50)

    # 1. Start Frontend

    # 2. Check/Start Frontend
    if is_port_in_use(FRONTEND_PORT):
        print(f"[!] Frontend port {FRONTEND_PORT} is already active.")
        webbrowser.open(f"http://localhost:{FRONTEND_PORT}")
        sys.exit(0)

    print(f"[*] Starting local portfolio server on port {FRONTEND_PORT}...")
    
    # Start browser thread
    threading.Thread(target=start_browser, daemon=True).start()

    try:
        with socketserver.TCPServer(("", FRONTEND_PORT), CustomHandler) as httpd:
            print(f"[✓] ALL SYSTEMS ONLINE. (Press Ctrl+C in this terminal to stop the frontend)")
            httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n\n[👋] Orchestrator stopped. Goodbye!")
    except Exception as e:
        print(f"\n[❌] ERROR: {e}")
