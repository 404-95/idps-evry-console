import subprocess

def get_service_status(service_name):
    try:
        status = subprocess.check_output(["systemctl", "is-active", service_name], text=True).strip()
        return {"status": status}
    except Exception as e:
        return {"status": "unknown", "error": str(e)}

def control_service(service_name, action):
    try:
        subprocess.check_call(["sudo", "systemctl", action, service_name])
        return {"result": f"{service_name} {action} executed"}
    except subprocess.CalledProcessError as e:
        return {"result": "error", "error": str(e)}
