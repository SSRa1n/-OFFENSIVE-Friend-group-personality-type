# How to setup and host a server
### Setting up
1.  [Download python](https://www.python.org/downloads/)
2.  Open terminal
3.  Enter these commands :<br>
    `pip install fastapi`<br>
    `pip install nltk`<br>
    `pip install pandas`<br>
    `pip install uvicorn`
### Hosting a Server
1.  Download the file and put it in `[Directory]`
2.  Open terminal
3.  Enter these commands :<br>
    `cd [Directory]` <br>
    `python api.py`
4.  Open another terminal without closing the first one
5.  Enter these commands :<br>
    `cd [Directory]` <br>
    `python -m http.server [port]` <br>
    port 5000 is recommended
7. Access the website via `http://localhost:[port]/`
