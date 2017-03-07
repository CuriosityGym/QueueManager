from flask import Response, Flask, request, current_app as app


errorText="Error In Parsing"
newUploadPath=""
processedUploadPath=""

app = Flask(__name__,  static_url_path='/static')


#print($apiResponse);

@app.route("/")
def indexPage():       	
        return app.send_static_file('index.html')

@app.route('/<path:path>')
def static_file(path):
    return app.send_static_file(path)




	   

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8080))
    app.run(host='0.0.0.0', port=port, debug=True)
