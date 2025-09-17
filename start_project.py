import os
import sys
import subprocess
import webbrowser
from pathlib import Path

ROOT = Path("/Users/piyushyadav/Downloads/JalSaathi V1.02/app1 3")

# Helper to run a command and stream output
def run(cmd, cwd=None):
    proc = subprocess.Popen(cmd, cwd=cwd or ROOT, shell=True)
    return proc

# Detect package manager
def detect_pm():
    if (ROOT / 'pnpm-lock.yaml').exists():
        return 'pnpm'
    if (ROOT / 'yarn.lock').exists():
        return 'yarn'
    return 'npm'

def main():
    pm = detect_pm()
    print(f"Using package manager: {pm}")

    # 1) Install deps (server + client)
    install_cmd = {
        'npm': 'npm install',
        'yarn': 'yarn install',
        'pnpm': 'pnpm install',
    }[pm]

    print('\nInstalling dependencies (this may take a minute)...')
    code = subprocess.call(install_cmd, cwd=ROOT, shell=True)
    if code != 0:
        print('Dependency installation failed. Aborting.')
        sys.exit(code)

    # 2) Start local upload server
    print('\nStarting local upload server on http://localhost:5001 ...')
    server_proc = run(f"{pm} run server")

    # 3) Start Vite dev server
    print('Starting Vite dev server on http://localhost:5000 ...')
    dev_proc = run(f"{pm} run dev")

    # 4) Open browser
    try:
        webbrowser.open('http://localhost:5000')
    except Exception:
        pass

    print('\nBoth processes are running. Press Ctrl+C in this console to stop them.')

    try:
        # Wait for child processes
        server_proc.wait()
        dev_proc.wait()
    except KeyboardInterrupt:
        print('\nStopping...')
        try:
            server_proc.terminate()
        except Exception:
            pass
        try:
            dev_proc.terminate()
        except Exception:
            pass

if __name__ == '__main__':
    main()