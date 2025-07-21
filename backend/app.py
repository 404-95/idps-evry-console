from flask import Flask, jsonify, request
from services import get_service_status, control_service
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

SERVICES = ["suricata", "zeek", "wazuh-manager"]

@app.route('/api/services', methods=['GET'])
def get_services():
    status = {s: get_service_status(s) for s in SERVICES}
    return jsonify(status)

@app.route('/api/service/<service_name>/<action>', methods=['POST'])
def service_action(service_name, action):
    if service_name not in SERVICES:
        return jsonify({"error": "Unknown service"}), 404
    if action not in ["start", "stop", "restart"]:
        return jsonify({"error": "Invalid action"}), 400
    result = control_service(service_name, action)
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)
